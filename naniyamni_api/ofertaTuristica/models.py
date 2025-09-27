from django.db import models
from users.models import User
class Proveedor(models.Model):

    actividades = (
        ('HF', 'Hostal-familiar'),
        ('H', 'Hotel'),
        ('R', 'Restaurante'),
        ('B', 'Bar'),
        ('CR', 'Centro recreativo'),
        ('C', 'Cafetería'),
        ('TTT', 'Transporte turístico terrestre'),
        ('OV', 'Operadora de viaje'),
        ('AV', 'Arrendamiento de Vehículos'),
        ('CH', 'Casa de Huésped'),
        ('D', 'Discoteca'),
        ('CP', 'Canopy'),
        ('CDN', 'Centro de Diversión Nocturna'),
        ('AL', 'Albergue'),
    )

    nombre = models.CharField(max_length=50)
    descripcion = models.TextField()
    # numeroLegal = models.CharField(unique=True)
    # telefono = models.CharField(max_length=20)
    # correo = models.CharField(unique=True, max_length=100)
    direccion = models.CharField(max_length=255)
    ciudad = models.CharField(max_length=255)
    tipo = models.CharField(max_length=3, choices=actividades)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)
    activo = models.BooleanField(default=True)
    administrador = models.ForeignKey(User, on_delete=models.PROTECT, related_name='proveedor')
    stripe_account_id = models.CharField(max_length=100, blank=True, null=True)



class Servicio(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)
    disponible = models.BooleanField(default=True)
    proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE, related_name='servicios')

class AlquilerVehiculo(Servicio):
    modelo = models.CharField(max_length=255)
    marca = models.CharField(max_length=255)

class Reserva(models.Model):
     turista = models.ForeignKey(User,on_delete=models.PROTECT,related_name="reservas")
     servicio_rel = models.ForeignKey(AlquilerVehiculo,on_delete=models.PROTECT,related_name="servicio_reservado")
     fecha_reserva =  models.DateTimeField(auto_now=True)
     cantidad = models.IntegerField()
     estado_reserva  = models.BooleanField(default=False)  # True: Confirmada, False: Pendiente de pago

class ReservaVehiculo(Reserva):
       fecha_recogida = models.DateTimeField()
       fecha_devolucion = models.DateTimeField()
       hora_recogida = models.DateTimeField()
       hora_entrega  = models.DateTimeField()
       lugar_recogida = models.CharField(max_length=255)
       lugar_devolucion = models.CharField(max_length=255)

class ViajeDirecto(Servicio):
    asientos_disponibles = models.IntegerField()

class ReservaViaje(Reserva):
       origen = models.CharField(max_length=255)
       destino = models.CharField(max_length=255)
       fecha_salida = models.DateTimeField()
       n_pasajeros = models.IntegerField()
       

class Habitacion(Servicio):
    tipos = (('S', 'single'), ('D', 'double'), ('SU', 'suite'))
    tipo = models.CharField(choices=tipos, max_length=2)
    capacidad = models.IntegerField()

class ReservaHabitacion(Reserva):
       fecha_llegada = models.DateTimeField()
       fecha_salida = models.DateTimeField()
       hora_llegada = models.DateTimeField()
       hora_salida  = models.DateTimeField()
       n_habitaciones = models.IntegerField()
       peticiones_especiales = models.CharField(max_length=255,blank=True)

class Atracciones(Servicio):
    cupo_maximo = models.IntegerField(null=True, blank=True)      
    guia_incluido = models.BooleanField(default=True)  

class ReservaAtracciones(Reserva):
     duracion_minutos = models.IntegerField(null=True, blank=True)
                 
class Gastronomico(Servicio):
    tipo_comida = models.CharField(
        max_length=50,
        choices=[
            ('A', 'Almuerzo'),
            ('C', 'Cena'),
            ('D', 'Desayuno'),
            ('B', 'Bebidas'),
            ('T', 'Tour gastronómico')
        ],
        default='A'
    )

class ProveedorImage(models.Model):
    title = models.CharField(max_length=255)
    image_url = models.URLField()
    proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE, related_name='imagenes')
    
class ServicioImage(models.Model):  
    title = models.CharField(max_length=255)
    image_url = models.URLField()
    servicio = models.ForeignKey(Servicio, on_delete=models.CASCADE, related_name='imagenes')