from django.db import models

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
    telefono = models.CharField(unique=True)
    correo = models.CharField(unique=True)
    direccion = models.CharField()
    ciudad = models.CharField()
    tipo = models.CharField(max_length=3, choices=actividades)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)
    activo = models.BooleanField(default=True)
    administrador = models.ForeignKey('User', on_delete=models.PROTECT, related_name='proveedor')


class Servicio(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField()
    precio = models.DecimalField()
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)
    disponible = models.BooleanField(default=True)

    class Meta: abstract = True


class AlquilerVehiculo(Servicio):
    proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE, related_name="alquilerVehiculo")
    modelo = models.CharField()
    marca = models.CharField()


class ViajeDirecto(Servicio):
    proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE, related_name="viajeDirecto")
    origen = models.CharField()
    destinos = models.CharField()
    fechaSalida = models.DateTimeField()
    asientosDisponibles = models.IntegerField()


class Habitacion(Servicio):
    tipo = (('S', 'single'), ('D', 'double'), ('SU', 'suite'))
    proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE, related_name="viajeDirecto")
    tipo = models.CharField(choices=tipo, max_length=2)
    capacidad = models.IntegerField()


class Visita(Servicio):
    proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE, related_name="visita")
    fecha = models.DateTimeField()


class gastronomico(Servicio):
     proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE, related_name="gastronomico")