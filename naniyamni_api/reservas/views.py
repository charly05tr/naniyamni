#django
from django.shortcuts import get_object_or_404
import logging
#DRF
from rest_framework import permissions, authentication, status, viewsets, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
#local modules
from .serializers import *
from .models import *
from ofertaTuristica.permissions import IsProveedor, IsProveedorOwner
from ofertaTuristica.filters import ProveedorFilter
from ofertaTuristica.models import *


logger = logging.getLogger(__name__)


class ReservaUsuarioListView(viewsets.ReadOnlyModelViewSet):
    """
    Devuelve todas las reservas del usuario autenticado,
    sin importar si son Atracción, Vehículo, Habitación o Viaje.
    """
    serializer_class = ReservaPolymorphicSerializer
    authentication_classes = [authentication.TokenAuthentication]

    def get_queryset(self):
        user = self.request.user
        return Reserva.objects.filter(turista=user).order_by("-fecha_reserva")


class ReservaViewSet(viewsets.ModelViewSet):
    authentication_classes = [authentication.TokenAuthentication]

    serializer_classes = {
        "atraccion": ReservaAtraccionSerializer,
        "vehiculo": ReservaVehiculoSerializer,
        "habitacion": ReservaHabitacionSerializer,
        "viaje": ReservaViajeSerializer,
        "generico": ReservaSerializer,
    }

    queryset_map = {
        "atraccion": ReservaAtraccion.objects.all(),
        "vehiculo": ReservaVehiculo.objects.all(),
        "habitacion": ReservaHabitacion.objects.all(),
        "viaje": ReservaViaje.objects.all(),
        "generico": Reserva.objects.all(),
    }

    def get_serializer_class(self):
        tipo = self.request.query_params.get("tipo") or self.kwargs.get("tipo")
        if tipo not in self.serializer_classes:
            raise ValueError("Tipo de reserva no válido")
        return self.serializer_classes[tipo]

    def get_queryset(self):
        tipo = self.request.query_params.get("tipo") or self.kwargs.get("tipo")
        if tipo not in self.queryset_map:
            raise ValueError("Tipo de reserva no válido")
        return self.queryset_map[tipo]  

    def perform_create(self, serializer):
        serializer.save(turista=self.request.user)

    def create(self, request, *args, **kwargs):
        logger.debug("CREATE Reserva payload: %s", request.data)
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except serializers.ValidationError:
            logger.error("Validation errors: %s ; payload: %s", serializer.errors, request.data)
            raise
        return super().create(request, *args, **kwargs) 