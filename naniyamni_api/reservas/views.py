#django
from django.shortcuts import get_object_or_404, redirect
from django.urls import reverse
#external modules
import logging
from datetime import datetime
import pytz
import stripe
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
from users.models import *
from config.settings.base import STRIPE_SECRET_KEY, SITE_URL

stripe.api_key = STRIPE_SECRET_KEY


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
        return Reserva.objects.filter(turista=user, estado=False).order_by("-fecha_reserva")



class ReservasActivasUsuarioListView(viewsets.ReadOnlyModelViewSet):
    """
    Devuelve todas las reservas activas del usuario autenticado,
    sin importar si son Atracción, Vehículo, Habitación o Viaje.
    """
    serializer_class = ReservaPolymorphicSerializer
    authentication_classes = [authentication.TokenAuthentication]

    def get_queryset(self):
        user = self.request.user
        tz = pytz.timezone("America/Managua")
        ahora = datetime.now(tz)

        ReservaHabitacion.objects.filter(
            turista=user,
            estado=True,
            fecha_hora_salida__lt=ahora
        ).update(estado=False)

        ReservaViaje.objects.filter(
            turista=user,
            estado=True,
            fecha_hora_salida__lt=ahora
        ).update(estado=False)

        ReservaVehiculo.objects.filter(
            turista=user,
            estado=True,
            fecha_hora_entrega__lt=ahora
        ).update(estado=False)

        ReservaAtraccion.objects.filter(
            turista=user,
            estado=True,
            fecha_llegada__lt=ahora
        ).update(estado=False)

        # Devuelve todas las reservas aún activas (sin importar el tipo)
        return Reserva.objects.filter(
            turista=user,
            estado=True
        ).order_by("-fecha_reserva")


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
    
    def partial_update(self, request, *args, **kwargs):
        print("=== PATCH request ===")
        print("User:", request.user)
        print("Query params:", request.query_params)
        print("Data recibida:", request.data)
        return super().partial_update(request, *args, **kwargs)


#pagos
class Crear_cuenta(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        proveedor = get_object_or_404(User,pk=request.user.id)
        # Crear cuenta Express en Stripe
        if proveedor.stripe_account_id is not None:
            return Response({"error": "Ya tienes una cuenta de Stripe."}, status=400)
        account = stripe.Account.create(
            type='express',
            country='US',
            email=proveedor.email,
        )
        proveedor.stripe_account_id = account.id
        proveedor.save()
        return Response({"id": proveedor.id}, status=status.HTTP_201_CREATED)

    def get_permissions(self):
        if self.request.method == "POST":
            return [AllowAny()]
        return [IsAuthenticated(), IsProveedor(), IsProveedorOwner()]


class Crear_account_link(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        proveedor = get_object_or_404(User, pk=request.user.id)
        account_id = proveedor.stripe_account_id
        # Generar Account Link (onboarding)
        account_link = stripe.AccountLink.create(
            account=account_id,
            refresh_url= SITE_URL + reverse('crear_account_link'),
            return_url= "http://localhost:5173/colaborador",    
            type='account_onboarding',
        )
        return Response({"account_link": account_link.url}, status=status.HTTP_200_OK)

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated(), IsProveedor(), IsProveedorOwner()]


# Vista para la realizacion del pago
class Crear_checkout_session(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        reserva_data = request.data.get('reserva')
        
        if not reserva_data or 'id' not in reserva_data:
            return Response({"error": "No se proporcionó una reserva válida"}, status=status.HTTP_400_BAD_REQUEST)
        
        reserva_id = reserva_data.get('id')
        
        try:
            reserva = Reserva.objects.get(id=reserva_id, turista=user)
            servicio = reserva.servicio
            proveedor = servicio.proveedor
            
            # Obtener stripe_account_id del administrador del proveedor
            if not proveedor.administrador.stripe_account_id:
                return Response(
                    {"error": f"El proveedor {proveedor.nombre} no tiene configurado Stripe"}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            stripe_account_id = proveedor.administrador.stripe_account_id
            
            # Crear line_item para la reserva
            line_item = {
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': servicio.nombre,
                        'description': servicio.descripcion,
                    },
                    'unit_amount': int(float(reserva.total) * 100),  # Convertir a centavos
                },
                'quantity': 1,
            }
                
        except Reserva.DoesNotExist:
            return Response(
                {"error": f"Reserva {reserva_id} no encontrada"}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Crear sesión de pago                                                      
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[line_item],
            mode='payment',
            payment_intent_data={
                'application_fee_amount': 200,
                'transfer_data': {'destination': stripe_account_id},
            },
            success_url= "http://localhost:5173/reservas-activas",
            cancel_url= "http://localhost:5173/miTour",
        )
        
        return Response({"account_link": session.url}, status=status.HTTP_200_OK)

    def get_permissions(self):
        if self.request.method == "POST":
            return [AllowAny()]
        return [IsAuthenticated(), IsProveedor(), IsProveedorOwner()]