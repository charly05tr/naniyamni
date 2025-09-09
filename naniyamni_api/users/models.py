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