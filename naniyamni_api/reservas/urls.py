from .views import *
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"reservas-usuario", ReservaUsuarioListView, basename="reservas-usuario")
router.register(r"", ReservaViewSet, basename="reservas")

urlpatterns = [
    path('', include(router.urls)),
]