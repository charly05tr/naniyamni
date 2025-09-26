from django import forms
from django.contrib import admin
from django.contrib.postgres.forms import SimpleArrayField


from .models import (
    Proveedor, Servicio, AlquilerVehiculo, ViajeDirecto, Destino,
    Habitacion, Atraccion, Gastronomico, ProveedorImage, ServicioImage,
    Caracteristica, Sucursal, Categoria, Itinerario, Hora_salida
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
class ProveedorForm(forms.ModelForm):
    reglas = SimpleArrayField(
        forms.CharField(max_length=255),
        delimiter=',',
        required=False
    )

    class Meta:
        model = Proveedor
        fields = '__all__'


@admin.register(Proveedor)
class ProveedorAdmin(admin.ModelAdmin):
    form = ProveedorForm
    list_display = ("nombre", "tipo", "ciudad", "activo", "creado_en", "latitud", "longitud", "direccion", "amenidades", "reglas")
    list_filter = ("tipo", "activo", "ciudad")
    search_fields = ("nombre", "ciudad")
    inlines = [ProveedorImageInline]


# ======================
# Servicio base
# ======================
@admin.register(Servicio)
class ServicioAdmin(admin.ModelAdmin):
    list_display = ("nombre", "proveedor", "precio", "disponible", "creado_en", "tipo_servicio")
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
    list_display = (
        "nombre",
        "marca",
        "modelo",
        "precio",
        "proveedor",
        "mostrar_categorias",
    )

    # def mostrar_sucursales(self, obj):
    #     return obj.sucursales.direccion if obj.sucursales else "-"
    # mostrar_sucursales.short_description = "Sucursal"

    def mostrar_categorias(self, obj):
        return {"nombre":obj.categoria.nombre, "cant_vehiculos":obj.cant_vehiculos} if obj.categoria else "-"
    mostrar_categorias.short_description = "Categoría"


@admin.register(Sucursal)
class SucursalAdmin(admin.ModelAdmin):
    list_display = ("direccion", "latitud", "longitud")


@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ("id","nombre", "cant_vehiculos")


@admin.register(ViajeDirecto)
class ViajeDirectoAdmin(admin.ModelAdmin):
    list_display = ("nombre", "origen", "asientos_disponibles", "precio", "descripcion")
    inlines = [ServicioImageInline]


@admin.register(Itinerario)
class ItinerarioAdmin(admin.ModelAdmin):
    list_display = ("dia", "viaje")


@admin.register(Hora_salida)
class ItinerarioAdmin(admin.ModelAdmin):
    list_display = ("id", "hora")


@admin.register(Destino)
class DestinoAdmin(admin.ModelAdmin):
    list_display = ("nombre", "viaje")
    search_fields = ("nombre", "viaje__nombre")


@admin.register(Habitacion)
class HabitacionAdmin(admin.ModelAdmin):
    list_display = ("nombre", "tipo", "capacidad", "precio", "proveedor")
    list_filter = ("tipo",)


@admin.register(Atraccion)
class AtraccionAdmin(admin.ModelAdmin):
    list_display = ("nombre", "cupo_maximo", "proveedor", "guia_incluido")


@admin.register(Gastronomico)
class GastronomicoAdmin(admin.ModelAdmin):
    list_display = ("nombre", "tipo_comida", "precio", "proveedor")
    list_filter = ("tipo_comida",)
