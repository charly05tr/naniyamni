from celery import shared_task
from datetime import datetime
from .models import ReservaHabitacion, ReservaAtraccion, ReservaVehiculo

@shared_task
def desactivar_reservas_vencidas():
    now = datetime.now()

    hab_actualizadas = ReservaHabitacion.objects.filter(fecha_hora_salida__lt=now, estado=True).update(estado=False)

    atr_actualizadas = ReservaAtraccion.objects.filter(fecha_llegada__lt=now, estado=True).update(estado=False)

    veh_actualizadas = ReservaVehiculo.objects.filter(fecha_hora_devolucion__lt=now, estado=True).update(estado=False)

    print(f'Habitaciones desactivadas: {hab_actualizadas}')
    print(f'Atracciones desactivadas: {atr_actualizadas}')
    print(f'Vehículos desactivados: {veh_actualizadas}')
