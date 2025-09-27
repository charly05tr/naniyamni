#django
from django.shortcuts import get_object_or_404,redirect
from django.conf import settings
from django.urls import reverse
#DRF
from rest_framework import permissions, authentication, status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import AllowAny, IsAuthenticated
#external modules
import cloudinary.uploader
import stripe
#local modules
from .serializers import *
from .models import *
from .permissions import IsProveedor, IsProveedorOwner
# Variables globales
stripe.api_key = settings.STRIPE_SECRET_KEY

class ProveedorViewSet(viewsets.ModelViewSet):
    queryset = Proveedor.objects.all()
    serializer_class = ProveedorSerializer
    authentication_classes = [authentication.TokenAuthentication]

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated(), IsProveedor(), IsProveedorOwner()]


class ServicioViewSet(viewsets.ModelViewSet):
    permission_classes = [IsProveedor, IsProveedorOwner]
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer


class HabitacionViewSet(viewsets.ModelViewSet):
    queryset = Habitacion.objects.all()
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, IsProveedor, IsProveedorOwner]
    serializer_class = HabitacionSerializer


class AlquilerVehiculoViewSet(viewsets.ModelViewSet):
    queryset = AlquilerVehiculo.objects.all()
    permission_classes = [permissions.IsAuthenticated, IsProveedor, IsProveedorOwner]
    serializer_class = AlquilerVehiculoSerializer


class ViajeDirectoViewSet(viewsets.ModelViewSet):
    queryset = ViajeDirecto.objects.all()
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, IsProveedor, IsProveedorOwner]
    serializer_class = ViajeDirectoSerializer


class VisitaViewSet(viewsets.ModelViewSet):
    queryset = Visita.objects.all()
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, IsProveedor, IsProveedorOwner]
    serializer_class = VisitaSerializer


class GastronomicoViewSet(viewsets.ModelViewSet):
    queryset = Gastronomico.objects.all()
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, IsProveedor, IsProveedorOwner]
    serializer_class = GastronomicoSerializer


class ProveedorImageView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, IsProveedor, IsProveedorOwner]
    parser_classes = [MultiPartParser]

    def get_object(self, image_id):
        try:
            return ProveedorImage.objects.get(id=image_id)
        except ProveedorImage.DoesNotExist:
            return None

    def get(self, request, image_id, format=None):
        image = self.get_object(image_id)
        if not image:
            return Response({"error": "Imagen no encontrada"}, status=404)
        serializer = ProveedorImageSerializer(image)
        return Response(serializer.data)

    def post(self, request, proveedor_id, format=None):
        image = request.FILES.get('image')
        title = request.data.get('title', 'Sin título')

        if not image:
            return Response({"error": "Se requiere una imagen"}, status=400)

        try:
            proveedor = Proveedor.objects.get(id=proveedor_id)
        except Proveedor.DoesNotExist:
            return Response({"error": "proveedor no encontrado"}, status=404)

        # Subida a Cloudinary
        upload_result = cloudinary.uploader.upload(image)
        image_url = upload_result.get('secure_url')

        # Guardar en la base de datos
        uploaded = ProveedorImage.objects.create(
            title=title,
            image_url=image_url,
            proveedor=proveedor
        )

        return Response(ProveedorImageSerializer(uploaded).data, status=status.HTTP_201_CREATED)

    def put(self, request, image_id, format=None):
        image = self.get_object(image_id)
        if not image:
            return Response({"error": "Imagen no encontrada"}, status=404)

        title = request.data.get('title', image.title)
        new_image_file = request.FILES.get('image')

        # Si se sube una nueva imagen, la reemplazamos
        if new_image_file:
            # Extrae el public_id de Cloudinary desde la URL
            public_id = imagen.image_url.split('/')[-1].split('.')[0]
            cloudinary.uploader.destroy(public_id)
            upload_result = cloudinary.uploader.upload(new_image_file)
            imagen.image_url = upload_result.get('secure_url')

        image.title = title
        image.save()

        serializer = ProveedorImageSerializer(imagen)
        return Response(serializer.data)

    def delete(self, request, image_id, format=None):
        image = self.get_object(image_id)
        if not image:
            return Response({"error": "Imagen no encontrada"}, status=404)

        # Eliminar imagen de Cloudinary
        public_id = image.image_url.split('/')[-1].split('.')[0]
        cloudinary.uploader.destroy(public_id)

        # Eliminar de la base de datos
        image.delete()
        return Response({"message": "Imagen eliminada correctamente"}, status=204)


class ServicioImageView(APIView):
    parser_classes = [MultiPartParser]
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, IsProveedor, IsProveedorOwner]

    def get_object(self, image_id):
        try:
            return ServicioImage.objects.get(id=image_id)
        except ServicioImage.DoesNotExist:
            return None

    def get(self, request, image_id, format=None):
        image = self.get_object(image_id)
        if not image:
            return Response({"error": "Imagen no encontrada"}, status=404)
        serializer = ServicioImageSerializer(image)
        return Response(serializer.data)

    def post(self, request, servicio_id, format=None):
        image = request.FILES.get('image')
        title = request.data.get('title', 'Sin título')

        if not image:
            return Response({"error": "Se requiere una imagen"}, status=400)

        try:
            servicio = Servicio.objects.get(id=servicio_id)
        except Servicio.DoesNotExist:
            return Response({"error": "Servicio no encontrado"}, status=404)

        # Subida a Cloudinary
        upload_result = cloudinary.uploader.upload(image)
        image_url = upload_result.get('secure_url')

        # Guardar en la base de datos
        uploaded = ServicioImage.objects.create(
            title=title,
            image_url=image_url,
            servicio=servicio
        )
        return Response(ServicioImageSerializer(uploaded).data, status=status.HTTP_201_CREATED)

    def put(self, request, image_id, format=None):
        image = self.get_object(image_id)
        if not image:
            return Response({"error": "Imagen no encontrada"}, status=404)

        title = request.data.get('title', image.title)
        new_image_file = request.FILES.get('image')

        # Si se sube una nueva imagen, la reemplazamos
        if new_image_file:
            # Extrae el public_id de Cloudinary desde la URL
            public_id = imagen.image_url.split('/')[-1].split('.')[0]
            cloudinary.uploader.destroy(public_id)
            upload_result = cloudinary.uploader.upload(new_image_file)
            imagen.image_url = upload_result.get('secure_url')

        image.title = title
        image.save()

        serializer = ServicioImageSerializer(imagen)
        return Response(serializer.data)

    def delete(self, request, image_id, format=None):
        image = self.get_object(image_id)
        if not image:
            return Response({"error": "Imagen no encontrada"}, status=404)

        # Eliminar imagen de Cloudinary
        public_id = image.image_url.split('/')[-1].split('.')[0]
        cloudinary.uploader.destroy(public_id)

        # Eliminar de la base de datos
        image.delete()
        return Response({"message": "Imagen eliminada correctamente"}, status=204)

#Vistas de las reservas
def ResHabitacion(request,servicio_id):
    if request.method == "POST":
        user = request.user.username
        user = User.objects.get(username = user)
        serv_rel = Habitacion.objects.get(pk = servicio_id)
        n_habitaciones = request.POST["n_habitacioneds"]
        fecha_llegada  = request.POST["fecha_llegada"]
        fecha_salida = request.POST["fecha_salida"]
        hora_llegada = request.POST["hora_llegada"]
        hora_salida =  request.POST["hora_salida "]        
        if not(n_habitaciones or fecha_llegada or fecha_salida or hora_llegada or hora_salida):
             return Response({"error": "Se deben rellenar los campos"}, status=400)
        reservaH = ReservaHabitacion(servicio_rel = serv_rel,fecha_llegada = fecha_llegada,fecha_salida = fecha_salida
        ,hora_llegada=hora_llegada,hora_salida = hora_salida
        ,n_habitaciones = n_habitaciones)
        reserva = Reserva(turista = user)
        reserva.save()
        reservaH.save()        
        
def ResVehiculo(request,servicio_id):
     if request.method == "POST":
        serv_rel = AlquilerVehiculo.objects.get(pk = servicio_id)
        user = request.user.username
        user = User.objects.get(username = user)
        fecha_recogida =  request.POST["fecha_recogida"]
        fecha_devolucion = request.POST[" fecha_devolucion"]
        hora_recogida = request.POST["hora_recogida"]
        hora_entrega  = request.POST["hora_entrega "]
        lugar_recogida = request.POST["lugar_recogida "]
        lugar_devolucion = request.POST["lugar_devolucion "]
        if not(fecha_recogida or fecha_devolucion or hora_recogida or hora_entrega or lugar_recogida or lugar_devolucion):
             return Response({"error": "Se deben rellenar los campos"}, status=400)
        reservaV = ReservaVehiculo(servicio_rel = serv_rel,fecha_recogida = fecha_recogida,fecha_devolucion = fecha_devolucion
        ,hora_recogida = hora_recogida,hora_entrega = hora_entrega,lugar_recogida = lugar_recogida,
        lugar_devolucion = lugar_devolucion)
        reserva = Reserva(turista = user)
        reserva.save()
        reservaV.save()      

def ResViaje(request,servicio_id):
    if request.method == "POST":
        user = request.user.username
        user = User.objects.get(username = user)
        serv_rel = ViajeDirecto.objects.get(pk = servicio_id)
        origen = request.POST["origen"]
        destino = request.POST["destino"]
        fecha_salida = request.POST["fecha_salida"]
        n_pasajeros = request.POST["n_pasajeros"]
        if not(origen or destino or  fecha_salida or n_pasajeros):
             return Response({"error": "Se deben rellenar los campos"}, status=400)
        reservaViaje = ReservaViaje(serv_rel = serv_rel,origen = origen, destino =  destino,
        fecha_salida = fecha_salida,n_pasajeros = n_pasajeros)
        reserva = Reserva(turista = user)
        reserva.save()
        reservaViaje.save()    
     
def ResAtraccion(request,servicio_id):
   if request.method == "POST":
        user = request.user.username
        user = User.objects.get(username = user)
        serv_rel = ViajeDirecto.objects.get(pk = servicio_id)
        duracion_minutos = request.POST["duracion_minutos"]
        if not (duracion_minutos):
            return Response({"error": "Se deben rellenar los campos"}, status=400)
        reservaAtracciones = ReservaAtracciones(serv_rel = serv_rel,duracion_minutos = duracion_minutos)
        reserva = Reserva(turista  = user)
        reserva.save()
        reservaAtracciones.save()

#Vista para la creacion del connect en stripe
def proveedor_stripe(request):
    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        email = request.POST.get('email')
        proveedor = get_object_or_404(Proveedor,nombre=nombre,email = email)
        # Crear cuenta Express en Stripe
        account = stripe.Account.create(
            type='express',
            country='US',
            email=email,
        )
        proveedor.stripe_account_id = account.id
        proveedor.save()
        return redirect('crear_account_link',stripe_id=proveedor.stripe_account_id)

def crear_account_link(request, stripe_id):
    proveedor = get_object_or_404(Proveedor, id=stripe_id)
    account_id = proveedor.stripe_account_id
    # Generar Account Link (onboarding)
    account_link = stripe.AccountLink.create(
        account=account_id,
        refresh_url=settings.SITE_URL + reverse('crear_account_link', args=[proveedor.id]),
        return_url=settings.SITE_URL + reverse('', args=[proveedor.id]),
        type='account_onboarding',
    )
    return redirect(account_link.url)

# Vista para la realizacion del pago
def crear_checkout_session(request,stripe_id):
    proveedor = get_object_or_404(Proveedor,stripe_account_id = stripe_id)
    user = request.user.username
    user = User.objects.get(username = user)
    carrito_items = Reserva.objects.filter(turista = user,estado_reserva = False)
    line_items = []
    for item in carrito_items:
         line_items.append({
            'price_data': {
                'currency': 'usd',
                'product_data': {
                    'name': item.servicio_rel.nombre,
                    'description': item.servicio_rel.descripcion,
                },
                'unit_amount': (item.servicio_rel.precio)*100,
            },
            'quantity':item.cantidad,
        })
    if request.method == 'POST':
        domain = settings.SITE_URL
        # crear sesión de Checkout que transfiere a la cuenta conectada
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=line_items,
            mode='payment',
            payment_intent_data={
                'application_fee_amount': 200,
                'transfer_data': {'destination': proveedor.stripe_account_id},
            },
            success_url=domain + reverse('success'),
            cancel_url=domain + reverse('cancel'),
        )
        return redirect(session.url)