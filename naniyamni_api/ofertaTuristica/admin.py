from django.contrib import admin

from .models import (
    Proveedor, Servicio, AlquilerVehiculo, ViajeDirecto, Destino,
    Habitacion, Atracciones, Gastronomico, ProveedorImage, ServicioImage,
    Caracteristica
)

# ======================
# Inline para imágenes
# ======================
class ProveedorImageInline(admin.TabularInline):
    model = ProveedorImage
    extra = 1


class ServicioImageInline(admin.TabularInline):
    model = ServicioImage
    extra = 1


# ======================
# Proveedor
# ======================
@admin.register(Proveedor)
class ProveedorAdmin(admin.ModelAdmin):
    list_display = ("nombre", "tipo", "ciudad", "activo", "creado_en", "latitud", "longitud", "direccion", "amenidades", "reglas")
    list_filter = ("tipo", "activo", "ciudad")
    search_fields = ("nombre", "ciudad")
    inlines = [ProveedorImageInline]


# ======================
# Servicio base
# ======================
@admin.register(Servicio)
class ServicioAdmin(admin.ModelAdmin):
    list_display = ("nombre", "proveedor", "precio", "disponible", "creado_en")
    list_filter = ("disponible", "creado_en", "actualizado_en")
    search_fields = ("nombre", "descripcion", "proveedor__nombre")
    inlines = [ServicioImageInline]

@admin.register(Caracteristica)
class CaracteristicaAdmin(admin.ModelAdmin):
    list_display = ("nombre", "id")


# ======================
# Especializaciones
# ======================
@admin.register(AlquilerVehiculo)
class AlquilerVehiculoAdmin(admin.ModelAdmin):
    list_display = ("nombre", "marca", "modelo", "precio", "proveedor")


@admin.register(ViajeDirecto)
class ViajeDirectoAdmin(admin.ModelAdmin):
    list_display = ("nombre", "origen", "fecha_salida", "asientos_disponibles", "proveedor")
    inlines = [ServicioImageInline]


@admin.register(Destino)
class DestinoAdmin(admin.ModelAdmin):
    list_display = ("nombre", "viaje")
    search_fields = ("nombre", "viaje__nombre")


@admin.register(Habitacion)
class HabitacionAdmin(admin.ModelAdmin):
    list_display = ("nombre", "tipo", "capacidad", "precio", "proveedor")
    list_filter = ("tipo",)


@admin.register(Atracciones)
class AtraccionesAdmin(admin.ModelAdmin):
    list_display = ("nombre", "cupo_maximo", "proveedor", "guia_incluido")


@admin.register(Gastronomico)
class GastronomicoAdmin(admin.ModelAdmin):
    list_display = ("nombre", "tipo_comida", "precio", "proveedor")
    list_filter = ("tipo_comida",)
