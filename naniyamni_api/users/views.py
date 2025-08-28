from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.test import APIRequestFactory
from .models import *
from rest_framework import viewsets, permissions, authentication, status
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
        

class UserViewSet(viewsets.ModelViewSet):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer
    
    def get_queryset(self):
        if self.request.user.is_staff:
            return User.objects.all()
        return User.objects.filter(username=self.request.user.username) 
    
    
class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            # Preparar una solicitud para obtener el token
            factory = APIRequestFactory()
            token_request = factory.post('/api/token-auth/', {
                "username": request.data.get("username"),
                "password": request.data.get("password")
            })
            
            # Llamar directamente a la vista de obtain_auth_token
            response = obtain_auth_token(token_request)
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
        
class ChangePasswordView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    
    def put(self, request):
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.update(request.user, serializer.validated_data)
            return Response({"message": "Contraseña actualizada correctamente."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class ResetPasswordRequestView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    
    def post(self, request):
        serializer = ResetPasswordRequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.send_reset_email(serializer.validated_data['email'])
            return Response({"message": "Se ha enviado un correo con instrucciones para restablecer la contraseña."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class ResetPasswordConfirmView(APIView):

    def post(self, request):
        serializer = ResetPasswordConfirmSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()  
            return Response({"message": "Contraseña restablecida correctamente."}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

