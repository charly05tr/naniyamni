from .views import *
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'proveedores', ProveedorViewSet)
router.register(r'servicios', ServicioViewSet)
router.register(r'habitaciones', HabitacionViewSet)
router.register(r'alquileres', AlquilerVehiculoViewSet)
router.register(r'viajes', ViajeDirectoViewSet)
router.register(r'visitas', VisitaViewSet)
router.register(r'gastronomicos', GastronomicoViewSet)

urlpatterns = [
    path('', include(router.urls)),

    # Endpoints de ProveedorImage
    path('proveedor/<int:proveedor_id>/imagen/', ProveedorImageView.as_view(), name='proveedor-upload-image'),
    path('proveedor/imagen/<int:image_id>/', ProveedorImageView.as_view(), name='proveedor-image-detail'),

    # Endpoints de ServicioImage
    path('servicio/<int:servicio_id>/imagen/', ServicioImageView.as_view(), name='servicio-upload-image'),
    path('servicio/imagen/<int:image_id>/', ServicioImageView.as_view(), name='servicio-image-detail'),
]