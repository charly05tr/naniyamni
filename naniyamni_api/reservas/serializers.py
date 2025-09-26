from rest_framework import serializers 
from drf_polymorphic.serializers import PolymorphicSerializer
from ofertaTuristica.serializers import * 
from .models import *
from django.db.models.functions import TruncDate


class ReservaAtraccionSerializer(serializers.ModelSerializer):
    servicio = AtraccionSerializer(read_only=True)
    servicio_id = serializers.PrimaryKeyRelatedField(
        queryset= Atraccion.objects.all(),
        source="servicio",
        write_only=True
    )

    class Meta:
        model = ReservaAtraccion
        fields = ["id", "servicio", "servicio_id", "total",
            "cant_personas", "turista", "tipo", "fecha_llegada", "estado"
        ]
        extra_kwargs = {
            "turista": {"read_only": True}  
        }

class ReservaVehiculoSerializer(serializers.ModelSerializer):
    servicio = AlquilerVehiculoSerializer(read_only=True)
    servicio_id = serializers.PrimaryKeyRelatedField(
        queryset= AlquilerVehiculo.objects.all(),
        source="servicio",
        write_only=True
    )

    class Meta:
        model = ReservaVehiculo
        fields = [
            "id", "turista", "servicio", "servicio_id", "total",
            "fecha_hora_entrega", "fecha_hora_recogida",
            "lugar_recogida", "lugar_devolucion", "tipo", "dias", "estado"
        ]
        extra_kwargs = {
            "turista": {"read_only": True}  
        }


class ReservaHabitacionSerializer(serializers.ModelSerializer):
    servicio = HabitacionSerializer(read_only=True)
    servicio_id = serializers.PrimaryKeyRelatedField(
        queryset=Habitacion.objects.all(),
        source="servicio",
        write_only=True
    )

    class Meta:
        model = ReservaHabitacion
        fields = [
            "id", "turista", "fecha_hora_llegada", "fecha_hora_salida",
            "servicio", "cant_adultos", "cant_ninos", "cant_habitaciones",
            "noches", "total", "servicio_id", "tipo", "estado"
        ]
        extra_kwargs = {
            "turista": {"read_only": True}
        }

    def validate(self, data):
        fecha_inicio = data.get("fecha_hora_llegada") or getattr(self.instance, "fecha_hora_llegada", None)
        fecha_fin = data.get("fecha_hora_salida") or getattr(self.instance, "fecha_hora_salida", None)
        servicio = data.get("servicio") or getattr(self.instance, "servicio", None)

        request = self.context.get("request")
        user = getattr(request, "user", None)

        if fecha_inicio and fecha_fin and fecha_inicio >= fecha_fin:
            raise serializers.ValidationError(
                {"fecha_hora_salida": "La fecha de salida debe ser posterior a la de llegada."}
            )

        # Excluir la reserva actual al buscar overlaps
        reservas_existentes = ReservaHabitacion.objects.filter(servicio=servicio, estado=True).exclude(id=getattr(self.instance, 'id', None))
        overlap = reservas_existentes.filter(
            fecha_hora_llegada__date__lt=fecha_fin.date(),
            fecha_hora_salida__date__gt=fecha_inicio.date(),
        ).exists()

        dentro_de_un_tour = ReservaHabitacion.objects.filter(servicio=servicio).exclude(id=getattr(self.instance, 'id', None))
        ya_lo_agrego = dentro_de_un_tour.filter(turista=user)

        if overlap:
            raise serializers.ValidationError(
                {"servicio": "La habitación ya está reservada en el rango de fechas seleccionado."}
            )
        
        if ya_lo_agrego:
            raise serializers.ValidationError(
                {"servicio": "La habitación ya la agregaste a tu Tour."}
            )

        return data


class ReservaViajeSerializer(serializers.ModelSerializer):
    servicio = ViajeDirectoSerializer(read_only=True)
    servicio_id = serializers.PrimaryKeyRelatedField(
        queryset=ViajeDirecto.objects.all(),
        source="servicio",
        write_only=True
    )

    class Meta:
        model = ReservaViaje
        fields = [
            "id", "servicio", "servicio_id", "tipo", "total", "cant_personas", "fecha_hora_salida", "estado"
        ]
        extra_kwargs = {
            "turista": {"read_only": True}  
        }


class ReservaPolymorphicSerializer(PolymorphicSerializer):
    object_type = serializers.CharField(read_only=True)
    discriminator_field = 'polymorphic_ctype'
    
    polymorphic_ctype = serializers.ReadOnlyField(source='polymorphic_ctype.model') 
    proveedor_nombre = serializers.CharField(
        source="servicio.proveedor.nombre", read_only=True
    )
    
    serializer_mapping = { 
        'reservaatraccion': ReservaAtraccionSerializer,
        'reservavehiculo': ReservaVehiculoSerializer,
        'reservahabitacion': ReservaHabitacionSerializer,
        'reservaviaje': ReservaViajeSerializer,
    }

    model_serializer_mapping = {
        ReservaAtraccion: ReservaAtraccionSerializer,
        ReservaVehiculo: ReservaVehiculoSerializer,
        ReservaHabitacion: ReservaHabitacionSerializer,
        ReservaViaje: ReservaViajeSerializer,
    }


class ReservaSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Reserva
        fields = "__all__"  
        extra_kwargs = {
            "turista": {"read_only": True}  
        }   