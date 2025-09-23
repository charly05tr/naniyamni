from django.db import models
from django.contrib.postgres.fields import ArrayField
from polymorphic.models import PolymorphicModel
from users.models import User
from ofertaTuristica.models import *

#Reservas
class Reserva(PolymorphicModel):
    turista = models.ForeignKey(User,on_delete=models.PROTECT, db_index=True)
    fecha_reserva = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.BooleanField(default=False) 
    tipo = models.CharField(max_length=50, default='reserva')
    

class ReservaAtraccion(Reserva):
    cant_personas = models.IntegerField(default=1)
    servicio = models.ForeignKey(
        Atraccion, related_name="reservas", on_delete=models.PROTECT
    )
    fecha_llegada = models.DateField(blank=True, null=True)


class ReservaVehiculo(Reserva):
    fecha_hora_recogida = models.DateTimeField(max_length=50, null=True, blank=True)
    fecha_hora_entrega  = models.DateTimeField(max_length=50, null=True, blank=True)
    lugar_recogida = models.CharField(max_length=255)
    lugar_devolucion = models.CharField(blank=True)
    latitud_recogida = models.DecimalField(default=0.0, max_digits=10, decimal_places=5)
    longitud_recogida = models.DecimalField(default=0.0, max_digits=10, decimal_places=5)  
    latitud_devolucion = models.DecimalField(default=0.0, max_digits=10, decimal_places=5)
    longitud_devolucion = models.DecimalField(default=0.0, max_digits=10, decimal_places=5)  
    servicio = models.ForeignKey(
        AlquilerVehiculo, related_name="reservas", on_delete=models.PROTECT
    )
    dias = models.IntegerField(default=1)

class ReservaHabitacion(Reserva):
    fecha_hora_llegada = models.DateTimeField()
    fecha_hora_salida = models.DateTimeField()
    servicio = models.ForeignKey(
        Habitacion, related_name="reservas", on_delete=models.PROTECT
    )
    cant_adultos = models.IntegerField(default=1)
    cant_ninos = models.IntegerField(default=0)
    cant_habitaciones = models.IntegerField(default=1)
    noches = models.IntegerField(default=1)


class ReservaViaje(Reserva):
    servicio = models.ForeignKey(
        ViajeDirecto, related_name="reservas", on_delete=models.PROTECT
    )
    fecha_hora_salida = models.DateTimeField(null=True, blank=True)
    cant_personas = models.IntegerField(default=1)

