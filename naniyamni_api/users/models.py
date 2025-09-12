from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('Turista', 'Turista'),
        ('Proveedor', 'Proveedor'),
    )
    rol = models.CharField(max_length=20, choices=ROLE_CHOICES, default='Turista')
    telefono = models.CharField(max_length=20, default='0')
    ciudad = models.CharField(max_length=50, default='Managua')
    latitud = models.DecimalField(default=0.0, max_digits=10, decimal_places=5)
    longitud = models.DecimalField(default=0.0, max_digits=10, decimal_places=5)        
    pais = models.CharField(max_length=50, default='Nicaragua')