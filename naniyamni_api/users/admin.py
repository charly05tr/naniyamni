from django.contrib import admin
from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("id","email", "last_name", "first_name", "rol", "ciudad", "pais", "longitud", "latitud")
    list_filter = ("rol","email")