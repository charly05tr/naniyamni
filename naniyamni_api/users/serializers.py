from rest_framework import serializers
from .models import *
from django.core.mail import send_mail
from django.conf import settings
from django.utils.crypto import get_random_string
from django.contrib.auth.tokens import PasswordResetTokenGenerator


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'is_superuser', 'rol', 'first_name', 'last_name', 'telefono', 'pais', 'ciudad', 'longitud', 'latitud', 'stripe_account_id')
        extra_kwargs = {'password': {'write_only': True}}
        

class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2', 'first_name', 'last_name', 'ciudad', 'pais', 'latitud', 'longitud', 'rol', 'telefono', 'stripe_account_id']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        print(data)
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Passwords don't match")
        return data

    def create(self, validated_data):
        print(validated_data)
        validated_data.pop('password2')
        email = validated_data.get('email')
        if not validated_data['username']:
            validated_data['username'] = email  
        user = User.objects.create_user(**validated_data)
        return user
    

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True)
    new_password2 = serializers.CharField(write_only=True)

    def validate(self, data):
        user = self.context['request'].user

        # Verificar la contraseña actual
        if not user.check_password(data['old_password']):
            raise serializers.ValidationError({"old_password": "La contraseña actual es incorrecta."})

        # Verificar que las contraseñas nuevas coincidan
        if data['new_password'] != data['new_password2']:
            raise serializers.ValidationError({"new_password": "Las contraseñas nuevas no coinciden."})

        return data

    def update(self, instance, validated_data):
        instance.set_password(validated_data['new_password'])
        instance.save()
        return instance
    

class ResetPasswordRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("No existe un usuario con este correo.")
        return value

    def send_reset_email(self, email):
        user = User.objects.get(email=email)
        token =   PasswordResetTokenGenerator().make_token(user)
        reset_link = f"http://localhost:8000/reset-password-confirm/{user.pk}/{token}/"

        send_mail(
            "Restablecimiento de contraseña",
            f"Haz clic en el siguiente enlace para restablecer tu contraseña: {reset_link}",
            settings.EMAIL_HOST_USER,
            [email],
            fail_silently=False,
        )
        
        
class ResetPasswordConfirmSerializer(serializers.Serializer):
    token = serializers.CharField()
    new_password = serializers.CharField(write_only=True)
    new_password2 = serializers.CharField(write_only=True)

    def validate(self, data):
        if data['new_password'] != data['new_password2']:
            raise serializers.ValidationError({"new_password": "Las contraseñas no coinciden."})

        # Buscar usuario por el token
        user = self.get_user_from_token(data['token'])
        if not user:
            raise serializers.ValidationError("Token inválido o expirado.")

        data["user"] = user  # Guardar usuario en los datos validados
        return data

    def get_user_from_token(self, token):
        """Decodifica el token y obtiene al usuario."""
        for user in User.objects.all():
            if PasswordResetTokenGenerator().check_token(user, token):
                return user
        return None  # Si ningún usuario tiene el token, es inválido

    def save(self):
        """Restablece la contraseña del usuario validado."""
        user = self.validated_data["user"]
        user.set_password(self.validated_data["new_password"])
        user.save()