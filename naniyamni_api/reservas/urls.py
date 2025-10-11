from .views import *
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"reservas-usuario", ReservaUsuarioListView, basename="reservas-usuario")
router.register(r"reservas-activas-usuario", ReservasActivasUsuarioListView, basename="reservas-usuario-activas")
router.register(r"", ReservaViewSet, basename="reservas")

urlpatterns = [
     #Endpoints para la conexion de una cuenta en stripe 
    path('proveedor/stripe/', Crear_cuenta.as_view(), name='proveedor_stripe'),
    path('onboard', Crear_account_link.as_view(), name='crear_account_link'), 
    #Endpoint para realizar un pago
    path('checkout/', Crear_checkout_session.as_view(), name='crear_checkout'),
    path('', include(router.urls)),
]