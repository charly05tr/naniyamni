from .views import *
from . import views
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
    
    #Endpoints para la conexion de una cuenta en stripe 
    path('proveedor/stripe/', views.proveedor_stripe, name='proveedor_stripe'),
    path('<int:seller_id>/onboard', views.crear_account_link, name='crear_account_link'), 

    #Endpoints de las reservas
    path("<int:servicio_id/reshabitacion>",views.ResHabitacion,name="ReservaHabitacion"), 
    path("<int:servicio_id/resVehiculo>",views.ResVehiculo,name="ReservaVehiculo"),
    path("<int:servicio_id/resvViaje>",views.ResViaje,name="ReservaViaje"),
    path("<int:servicio_id/resvAtraccion>",views.ResAtraccion,name="ReservaAtraccion"),
    
    #Endpoint para realizar un pago
    path('<int:stripe_id>/checkout',views.crear_checkout_session, name='crear_checkout'),
]