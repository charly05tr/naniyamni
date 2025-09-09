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
    numeroLegal = models.CharField(unique=True)
    telefono = models.CharField(max_length=20)
    correo = models.CharField(unique=True, max_length=100)
    direccion = models.CharField(max_length=255)
    ciudad = models.CharField(max_length=255)
    tipo = models.CharField(max_length=3, choices=actividades)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)
    activo = models.BooleanField(default=True)
    administrador = models.ForeignKey(User, on_delete=models.PROTECT, related_name='proveedor')


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


class ReservaVehiculo(AlquilerVehiculo):
       fecha_reserva =  models.DateTimeField(auto_now=True)
       fecha_recogida = models.DateTimeField()
       fecha_devolucion = models.DateTimeField()
       hora_recogida = models.DateTimeField()
       hora_entrega  = models.DateTimeField()
       turista = models.ForeignKey(User,on_delete=models.PROTECT,related_name="vehiculo_alquilado")
       lugar_recogida = models.CharField(max_length=255)
       lugar_devolucion = models.CharField(blank=True)

class ViajeDirecto(Servicio):
    origen = models.CharField(max_length=255)
    destino = models.CharField(max_length=255)
    asientos_disponibles = models.IntegerField()

class ReservaViaje(ViajeDirecto):
       turista = models.ForeignKey(User,on_delete=models.PROTECT)
       fecha_reserva = models.DateTimeField(auto_now=True)
       fecha_salida = models.DateTimeField()

class Habitacion(Servicio):
    tipos = (('S', 'single'), ('D', 'double'), ('SU', 'suite'))
    tipo = models.CharField(choices=tipos, max_length=2)
    capacidad = models.IntegerField()

class ReservaHabitacion(Habitacion):
       turista = models.ForeignKey(User,on_delete=models.PROTECT)
       fecha_reserva = models.DateTimeField(auto_now=True)
       fecha_llegada = models.DateTimeField()
       fecha_salida = models.DateTimeField()
       hora_llegada = models.DateTimeField()
       hora_salida  = models.DateTimeField()


class Atracciones(Servicio):
    cupo_maximo = models.IntegerField(null=True, blank=True)      
    guia_incluido = models.BooleanField(default=True)  

class ReservaAtracciones(Atracciones):
    turista = models.ForeignKey(User,on_delete=models.PROTECT)
    fecha_reserva = models.DateTimeField()
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