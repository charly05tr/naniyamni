from rest_framework import serializers 
from .models import ProveedorImage, Proveedor, ServicioImage, AlquilerVehiculo, ViajeDirecto, Gastronomico, Atracciones, Habitacion, Destino, Servicio, Caracteristica


class ProveedorImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProveedorImage
        fields = ["id", "title", "image_url"]


class ProveedorDetailSerializer(serializers.ModelSerializer):
    imagenes = serializers.SerializerMethodField()
    imagen = serializers.SerializerMethodField()
    servicios = serializers.SerializerMethodField()

    class Meta:
        model = Proveedor
        fields = ["id", "nombre", "descripcion", "direccion", "imagenes", "ciudad", "activo", "tipo", "administrador", "imagen", "servicios", "longitud", "latitud"]
        read_only_fields = ["administrador"]

    def create(self, validated_data):
        # Asignar el usuario autenticado como administrador
        validated_data['administrador'] = self.context['request'].user
        return super().create(validated_data)

    def get_imagen(self, obj):
        primera = obj.imagenes.first()
        if primera:
            return ProveedorImageSerializer(primera).data
        return None

    def get_imagenes(self, obj):
        imagenes = obj.imagenes.all()[1:]
        return ProveedorImageSerializer(imagenes, many=True).data

    def get_servicios(self, obj):
        if obj.tipo == "H":  # Hotel
            return HabitacionSerializer(Habitacion.objects.filter(proveedor=obj), many=True).data
        elif obj.tipo == "AV":  # Arrendamiento de Vehículos
            return AlquilerVehiculoSerializer(obj.servicios.all(), many=True).data
        elif obj.tipo in ["TTT", "OV"]:  # Transporte o Tour
            return ViajeDirectoSerializer(obj.servicios.all(), many=True).data
        else:  # Restaurante, Bar, etc.
            return ServicioSerializer(obj.servicios.all(), many=True).data


class ProveedorListSerializer(serializers.ModelSerializer):
    imagen = serializers.SerializerMethodField()
    class Meta:
        model = Proveedor
        fields = ["id", "nombre", "descripcion", "imagen", "ciudad", "activo", "tipo", "latitud", "longitud", "amenidades", "reglas"]

    def get_imagen(self, obj):
        primera = obj.imagenes.first()
        if primera:
            return ProveedorImageSerializer(primera).data
        return None
    
    def get_cantidad_servicios(self, obj):
        """Devuelve un desglose polimórfico de servicios disponibles"""
        servicios = obj.servicios.filter(disponible=True)

        # Hotel, Hostal, Casa de Huésped, Albergue → Habitaciones
        if obj.tipo in ["H", "HF", "CH", "AL"]:
            resumen = {
                "total": servicios.count(),
                "habitaciones": {
                    "single": servicios.filter(habitacion__tipo="S").count(),
                    "double": servicios.filter(habitacion__tipo="D").count(),
                    "suite": servicios.filter(habitacion__tipo="SU").count(),
                },
            }
            return resumen

        # Arrendamiento de Vehículos
        elif obj.tipo == "AV":
            resumen = {
                "total": servicios.count(),
                "vehiculos_por_marca": dict(
                    servicios.values_list("alquilervehiculo__marca")
                    .order_by()
                    .annotate(cantidad=models.Count("id"))
                ),
            }
            return resumen

        # Transporte turístico terrestre / Operadora de viaje → Viajes directos
        elif obj.tipo in ["TTT", "OV"]:
            resumen = {
                "total": servicios.count(),
                "viajes": {
                    "origenes": list(
                        servicios.values_list("viajedirecto__origen", flat=True).distinct()
                    ),
                    "con_asientos": servicios.filter(
                        viajedirecto__asientos_disponibles__gt=0
                    ).count(),
                },
            }
            return resumen

        # Resto de tipos (Restaurante, Bar, etc.)
        else:
            return {
                "total": servicios.count()
            }


class ServicioImageSerializer(serializers.ModelSerializer):
    class Meta:
        model =  ServicioImage
        fields = ["id", "title", "image_url"]


class CaracteristicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Caracteristica
        fields = ["id","nombre"]


#serializer padre
class ServicioSerializer(serializers.ModelSerializer):
    imagenes = ServicioImageSerializer(many=True, read_only=True)
    caracteristicas = CaracteristicaSerializer(many=True, read_only=True)

    class Meta:
        model = Servicio
        fields = ["id", "nombre", "descripcion", "precio", "disponible", "proveedor", "imagenes", "caracteristicas"]


class AlquilerVehiculoSerializer(serializers.ModelSerializer):
    imagenes = ServicioImageSerializer(many=True, read_only=True)
    caracteristicas = CaracteristicaSerializer(many=True, read_only=True)

    class Meta(ServicioSerializer.Meta):
        model = AlquilerVehiculo
        fields = ServicioSerializer.Meta.fields + ["modelo", "marca", "transmision", "cant_asientos"]


class DestinoSerialiazer(serializers.ModelSerializer):
    class Meta:
        model: Destino 
        fields = ["nombre"]


class ViajeDirectoSerializer(serializers.ModelSerializer):
    destinos = DestinoSerialiazer(many=True, read_only=True)
    imagenes = ServicioImageSerializer(many=True, read_only=True)
    caracteristicas = CaracteristicaSerializer(many=True, read_only=True)

    class Meta(ServicioSerializer.Meta):
        model = ViajeDirecto
        fields = ServicioSerializer.Meta.fields + ["origen", "fecha_salida", "asientos_disponibles", "destinos"]


class AtraccionesSerializer(serializers.ModelSerializer):
    imagenes = ServicioImageSerializer(many=True, read_only=True)
    caracteristicas = CaracteristicaSerializer(many=True, read_only=True)

    class Meta(ServicioSerializer.Meta):
        model = Atracciones
        fields = ServicioSerializer.Meta.fields + ["guia_incluido", "cupo_maximo"]


class GastronomicoSerializer(serializers.ModelSerializer):
    imagenes = ServicioImageSerializer(many=True, read_only=True)
    caracteristicas = CaracteristicaSerializer(many=True, read_only=True)

    class Meta(ServicioSerializer.Meta):
        model = Gastronomico
        fields = ServicioSerializer.Meta.fields + ["tipo_comida"]


class HabitacionSerializer(serializers.ModelSerializer):
    imagenes = ServicioImageSerializer(many=True, read_only=True)
    caracteristicas = CaracteristicaSerializer(many=True, read_only=True)

    class Meta(ServicioSerializer.Meta):
        model = Habitacion
        fields = ServicioSerializer.Meta.fields + ["capacidad", "tipo"]
