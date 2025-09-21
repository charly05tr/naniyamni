from django.contrib import admin

from django.contrib import admin
from polymorphic.admin import (
    PolymorphicParentModelAdmin,
    PolymorphicChildModelAdmin,
    PolymorphicChildModelFilter,
)
from .models import (
    Reserva,
    ReservaAtraccion,
    ReservaVehiculo,
    ReservaHabitacion,
    ReservaViaje,
)

# --- Admins hijos ---

@admin.register(ReservaAtraccion)
class ReservaAtraccionAdmin(PolymorphicChildModelAdmin):
    base_model = ReservaAtraccion
    show_in_index = True  # para que aparezca en el menú lateral
    list_display = ("id", "turista", "servicio", "cant_personas", "total", "estado", "fecha_reserva")


@admin.register(ReservaVehiculo)
class ReservaVehiculoAdmin(PolymorphicChildModelAdmin):
    base_model = ReservaVehiculo
    show_in_index = True
    list_display = (
        "id", "turista", "servicio",
        "fecha_hora_recogida", "fecha_hora_entrega",
        "lugar_recogida", "lugar_devolucion",
        "total", "estado", "fecha_reserva"
    )


@admin.register(ReservaHabitacion)
class ReservaHabitacionAdmin(PolymorphicChildModelAdmin):
    base_model = ReservaHabitacion
    show_in_index = True
    list_display = (
        "id", "turista", "servicio",
        "cant_adultos", "cant_ninos", "cant_habitaciones", "noches",
        "fecha_hora_llegada", "fecha_hora_salida",
        "total", "estado", "fecha_reserva"
    )


@admin.register(ReservaViaje)
class ReservaViajeAdmin(PolymorphicChildModelAdmin):
    base_model = ReservaViaje
    show_in_index = True
    list_display = ("id", "turista", "servicio", "total", "estado", "fecha_reserva")


# --- Admin padre ---

@admin.register(Reserva)
class ReservaAdmin(PolymorphicParentModelAdmin):
    """Admin polimórfico principal de Reservas"""
    base_model = Reserva
    child_models = (ReservaAtraccion, ReservaVehiculo, ReservaHabitacion, ReservaViaje)

    list_filter = (PolymorphicChildModelFilter,)
    list_display = ("id", "turista", "total", "estado", "fecha_reserva", "polymorphic_ctype")

