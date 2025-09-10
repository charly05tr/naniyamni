#django
from django.shortcuts import get_object_or_404
#DRF
from rest_framework import permissions, authentication, status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import AllowAny, IsAuthenticated
#external modules
import cloudinary.uploader
#local modules
from .serializers import *
from .models import *
from .permissions import IsProveedor, IsProveedorOwner

class ProveedorViewSet(viewsets.ModelViewSet):
    queryset = Proveedor.objects.all()
    authentication_classes = [authentication.TokenAuthentication]

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated(), IsProveedor(), IsProveedorOwner()]

    def get_serializer_class(self):
        if self.action == 'list':
            return ProveedorListSerializer
        return ProveedorDetailSerializer


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