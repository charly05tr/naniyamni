from rest_framework import serializers 
from .models import *

class ProveedorImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProveedorImage
        fields = ["id", "title", "image_url"]


class SucursalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sucursal
        fields = ["id", "direccion"]

class ProveedorDetailSerializer(serializers.ModelSerializer):
    imagenes = serializers.SerializerMethodField()
    imagen = serializers.SerializerMethodField()
    servicios = serializers.SerializerMethodField()
    sucursales = SucursalSerializer(many=True)

    class Meta:
        model = Proveedor
        fields = ["id", "nombre", "descripcion", "direccion", "imagenes", "ciudad", "activo", "tipo", "administrador", "imagen", "servicios", "longitud", "latitud", "reglas", "sucursales"]
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
        if obj.tipo in ["H", "HF"]:  # Hotel
            return HabitacionSerializer(Habitacion.objects.filter(proveedor=obj), many=True).data
        elif obj.tipo == "AV":  # Arrendamiento de Vehículos
            return AlquilerVehiculoSerializer(AlquilerVehiculo.objects.filter(proveedor=obj), many=True).data
        elif obj.tipo in ["TTT", "OV"]:  # Transporte o Tour
            return ViajeDirectoSerializer(ViajeDirecto.objects.filter(proveedor=obj), many=True).data
        elif obj.tipo in ["CR", "CP", "AL"]:  # Centro recreativo, canopy o albergue
            return AtraccionSerializer(Atraccion.objects.filter(proveedor=obj), many=True).data
        else:  # Restaurante, Bar, etc.
            return ServicioSerializer(Servicio.objects.filter(proveedor=obj), many=True).data


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


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ["id","nombre", "cant_vehiculos"]


#serializer padre
class ServicioSerializer(serializers.ModelSerializer):
    imagenes = ServicioImageSerializer(many=True, read_only=True)
    caracteristicas = CaracteristicaSerializer(many=True, read_only=True)

    class Meta:
        model = Servicio
        fields = ["id", "nombre", "descripcion", "precio", "disponible", "proveedor", "imagenes", "caracteristicas", "tipo_servicio"]


class AlquilerVehiculoSerializer(serializers.ModelSerializer):
    categoria = CategoriaSerializer(many=False)
    imagenes = ServicioImageSerializer(many=True, read_only=True)
    caracteristicas = CaracteristicaSerializer(many=True)
    reservas_ocupadas = serializers.SerializerMethodField()
    sucursales = SucursalSerializer(many=False)

    class Meta(ServicioSerializer.Meta):
        model = AlquilerVehiculo
        fields = ServicioSerializer.Meta.fields + ["modelo", "marca", "transmision", "cant_asientos", "reservas_ocupadas", "sucursales", "categoria"]

    def get_reservas_ocupadas(self, obj):
        reservas = obj.reservas.all()
        return [
            {
                "inicio": r.fecha_hora_recogida,
                "fin": r.fecha_hora_entrega
            } for r in reservas
        ]

#serializers transporte
class HoraSalidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hora_salida
        fields = ["id", "hora"]


class ItinerarioSerializer(serializers.ModelSerializer):
    horas_salida = HoraSalidaSerializer(many=True)

    class Meta:
        model = Itinerario
        fields = ["dia", "horas_salida"]

    def create(self, validated_data):
        horas_data = validated_data.pop("horas_salida", [])
        # Crear horas de salida
        horas_objs = [Hora_salida.objects.create(**hora) for hora in horas_data]

        # Crear itinerario
        itinerario = Itinerario.objects.create(**validated_data)
        # Asociar las horas al itinerario (ManyToMany)
        itinerario.horas_salida.set(horas_objs)

        return itinerario


class DestinoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destino 
        fields = ["nombre", "duracion"]


class ViajeDirectoSerializer(serializers.ModelSerializer):
    destinos = DestinoSerializer(many=True, read_only=False)
    itinerarios = ItinerarioSerializer(many=True, read_only=False)
    reservas_ocupadas = serializers.SerializerMethodField()
    imagenes = ServicioImageSerializer(many=True, read_only=True)

    class Meta(ServicioSerializer.Meta):
        model = ViajeDirecto
        fields = ServicioSerializer.Meta.fields + [
            "origen", 
            "asientos_disponibles", 
            "destinos", 
            "reservas_ocupadas", 
            "itinerarios",
            "imagenes",
        ]

    def create(self, validated_data):
        destinos_data = validated_data.pop("destinos", [])
        itinerarios_data = validated_data.pop("itinerarios", [])

        # Crear viaje
        viaje = ViajeDirecto.objects.create(**validated_data)

        # Crear destinos
        for destino_data in destinos_data:
            Destino.objects.create(viaje=viaje, **destino_data)

        # Crear itinerarios
        for itinerario_data in itinerarios_data:
            horas_data = itinerario_data.pop("horas_salida", [])
            itinerario = Itinerario.objects.create(viaje=viaje, **itinerario_data)
            
            # Crear horas de salida y asociarlas al itinerario
            horas_objs = [Hora_salida.objects.create(**hora) for hora in horas_data]
            itinerario.horas_salida.set(horas_objs)

        return viaje

    def get_reservas_ocupadas(self, obj):
        reservas = obj.reservas.all()
        return [
            {"inicio": r.fecha_reserva, "fin": r.fecha_reserva} for r in reservas
        ]

class AtraccionSerializer(serializers.ModelSerializer):
    imagenes = ServicioImageSerializer(many=True, read_only=True)
    caracteristicas = CaracteristicaSerializer(many=True, read_only=True)
    reservas_ocupadas = serializers.SerializerMethodField()

    class Meta(ServicioSerializer.Meta):
        model = Atraccion
        fields = ServicioSerializer.Meta.fields + ["guia_incluido", "cupo_maximo", "reservas_ocupadas", "hora_cierre", "hora_apertura", "dias_abierto", "duracion"]

    def get_reservas_ocupadas(self, obj):
        reservas = obj.reservas.all()
        return [
            {"inicio": r.fecha_reserva, "fin": r.fecha_reserva} for r in reservas
        ]


class GastronomicoSerializer(serializers.ModelSerializer):
    imagenes = ServicioImageSerializer(many=True, read_only=True)
    caracteristicas = CaracteristicaSerializer(many=True, read_only=True)

    class Meta(ServicioSerializer.Meta):
        model = Gastronomico
        fields = ServicioSerializer.Meta.fields + ["tipo_comida"]


class HabitacionSerializer(serializers.ModelSerializer):
    imagenes = ServicioImageSerializer(many=True, read_only=True)
    caracteristicas = CaracteristicaSerializer(many=True, read_only=True)
    reservas_ocupadas = serializers.SerializerMethodField()

    class Meta:
        model = Habitacion
        fields = ServicioSerializer.Meta.fields + ["capacidad", "tipo", "reservas_ocupadas"]

    def get_reservas_ocupadas(self, obj):
        reservas = obj.reservas.all()
        return [
            {
                "inicio": r.fecha_hora_llegada,
                "fin": r.fecha_hora_salida
            } for r in reservas
        ]