from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('cliente', 'Cliente'),
        ('Proveedor', 'Proveedor'),
    )
    rol = models.CharField(max_length=20, choices=ROLE_CHOICES, default='cliente')