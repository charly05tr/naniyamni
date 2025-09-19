from django.db import models
from users.models import User
from django.contrib.postgres.fields import ArrayField

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
    telefono = models.CharField(max_length=20, default="")
    # correo = models.CharField(unique=True, max_length=100)
    direccion = models.CharField(max_length=255)
    ciudad = models.CharField(max_length=255)
    tipo = models.CharField(max_length=3, choices=actividades)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)
    activo = models.BooleanField(default=True)
    latitud = models.DecimalField(default=0.0, max_digits=10, decimal_places=5)
    longitud = models.DecimalField(default=0.0, max_digits=10, decimal_places=5)      
    administrador = models.ForeignKey(User, on_delete=models.PROTECT, related_name='proveedor')
    reglas = ArrayField(
        models.CharField(max_length=255),
        blank=True,
        default=list
    )

    AMENIDADES = [
        ("piscina", "Piscina al aire libre"),
        ("traslado", "Traslado aeropuerto"),
        ("movilidad", "Adaptado personas movilidad reducida"),
        ("restaurante", "Restaurante"),
        ("gimnasio", "Gimnasio"),
        ("no_fumadores", "Habitaciones sin humo"),
        ("wifi", "WiFi gratis"),
        ("parking", "Parking gratis"),
        ("bar", "Bar"),
        ("desayuno", "Muy buen desayuno"),
    ]

    amenidades = ArrayField(
        models.CharField(max_length=50, choices=AMENIDADES),
        blank=True,
        default=list
    )

#servicios
class Caracteristica(models.Model):
    nombre = models.CharField(max_length=255)


class Servicio(models.Model):
    TIPOS = (
        ("H", "habitacion"),
        ("V", "vehiculo"),
        ("A", "atraccion"),
        ("VI", "viaje"),
        ("G", "generico")
    )

    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    disponible = models.BooleanField(default=True)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)
    proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE, related_name='servicios')
    caracteristicas = models.ManyToManyField(Caracteristica, related_name="servicios", blank=True)
    tipo_servicio = models.CharField(choices=TIPOS, default="G")

class Habitacion(Servicio):
    tipos = (('S', 'single'), ('D', 'double'), ('SU', 'suite'))
    tipo = models.CharField(choices=tipos, max_length=2)
    capacidad = models.IntegerField()


class Categoria(models.Model):
    nombre = models.CharField(max_length=255)
    cant_vehiculos = models.CharField(max_length=255)


class Sucursal(models.Model):
    latitud = models.DecimalField(default=0.0, max_digits=10, decimal_places=5)
    longitud = models.DecimalField(default=0.0, max_digits=10, decimal_places=5)     
    direccion = models.CharField(max_length=255)
    proveedor = models.ForeignKey(Proveedor, related_name="sucursales", on_delete=models.CASCADE, null=True)


class AlquilerVehiculo(Servicio):
    TIPO_TRANSMISION = (('A', 'Automatico'), ('M', 'Mecanico'), ('E', 'Electrico'))
    modelo = models.CharField(max_length=255)
    marca = models.CharField(max_length=255)
    transmision = models.CharField(choices=TIPO_TRANSMISION, default='A')
    cant_asientos = models.IntegerField(default=5)
    sucursales = models.ForeignKey(Sucursal, on_delete=models.CASCADE, related_name="vehiculos", null=True)
    categoria  = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name="vehiculos", null=True)

class ViajeDirecto(Servicio):
    origen = models.CharField(max_length=255)
    fecha_salida = models.DateTimeField()
    asientos_disponibles = models.IntegerField()


class Destino(models.Model):
    viaje = models.ForeignKey(ViajeDirecto, on_delete=models.CASCADE, related_name="destinos")
    nombre = models.CharField(max_length=100)
       

class Atraccion(Servicio):
    cupo_maximo = models.IntegerField(null=True, blank=True)      
    guia_incluido = models.BooleanField(default=True)          


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

#imagenes
class ProveedorImage(models.Model):
    title = models.CharField(max_length=255)
    image_url = models.URLField()
    proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE, related_name='imagenes')


class ServicioImage(models.Model):  
    title = models.CharField(max_length=255)
    image_url = models.URLField()
    servicio = models.ForeignKey(Servicio, on_delete=models.CASCADE, related_name='imagenes')