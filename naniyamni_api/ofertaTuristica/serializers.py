from rest_framework import serializers 
from .models import ProveedorImage, Proveedor, ServicioImage, AlquilerVehiculo, ViajeDirecto, Gastronomico, Visita, Habitacion, Destino, Servicio


class ProveedorImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProveedorImage
        fields = ["id", "title", "image_url"]


class ProveedorSerializer(serializers.ModelSerializer):
    imagenes = ProveedorImageSerializer(many=True, read_only=True)
    class Meta:
        model = Proveedor
        fields = ["id", "nombre", "descripcion", "direccion", "imagenes", "ciudad", "activo", "tipo", "administrador"]
        read_only_fields = ["administrador"]

    def create(self, validated_data):
        # Asignar el usuario autenticado como administrador
        validated_data['administrador'] = self.context['request'].user
        return super().create(validated_data)

class ServicioImageSerializer(serializers.ModelSerializer):
    class Meta:
        model =  ServicioImage
        fields = ["id", "title", "image_url"]

#serializer padre
class ServicioSerializer(serializers.ModelSerializer):
    imagenes = ServicioImageSerializer(many=True, read_only=True)

    class Meta:
        model = Servicio
        fields = ["id", "nombre", "descripcion", "precio", "disponible", "proveedor", "imagenes"]


class AlquilerVehiculoSerializer(serializers.ModelSerializer):
     class Meta(ServicioSerializer.Meta):
        model = AlquilerVehiculo
        fields = ServicioSerializer.Meta.fields + ["modelo", "marca"]


class DestinoSerialiazer(serializers.ModelSerializer):
    class Meta:
        model: Destino 
        fields = ["nombre"]


class ViajeDirectoSerializer(serializers.ModelSerializer):
    destinos = DestinoSerialiazer(many=True, read_only=True)

    class Meta(ServicioSerializer.Meta):
        model = ViajeDirecto
        fields = ServicioSerializer.Meta.fields + ["origen", "fecha_salida", "asientos_disponibles", "destinos"]


class VisitaSerializer(serializers.ModelSerializer):
    class Meta(ServicioSerializer.Meta):
        model = Visita
        fields = ServicioSerializer.Meta.fields + ["fecha", "duracion_minutos", "guia_incluido", "cupo_maximo"]


class GastronomicoSerializer(serializers.ModelSerializer):
    class Meta(ServicioSerializer.Meta):
        model = Gastronomico
        fields = ServicioSerializer.Meta.fields + ["tipo_comida"]


class HabitacionSerializer(serializers.ModelSerializer):
    class Meta(ServicioSerializer.Meta):
        model = Habitacion
        fields = ServicioSerializer.Meta.fields + ["capacidad", "tipo"]
