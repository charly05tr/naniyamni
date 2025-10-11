#django
from django.shortcuts import get_object_or_404
import logging
#DRF
from rest_framework import permissions, authentication, status, viewsets, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
#external modules
import cloudinary.uploader
#local modules
from .serializers import *
from .models import *
from .permissions import IsProveedor, IsProveedorOwner
from django.db.models import Q
from .filters import ProveedorFilter    
from django.contrib.postgres.search import SearchVector, SearchRank, SearchQuery
from rest_framework.filters import SearchFilter
from django.contrib.postgres.search import TrigramSimilarity

logger = logging.getLogger(__name__)

class ProveedorViewSet(viewsets.ReadOnlyModelViewSet):
    authentication_classes = [authentication.TokenAuthentication]

    def get_queryset(self):
        queryset = Proveedor.objects.filter(activo=True)
        q = self.request.GET.get('search')
        if q:
            # Vector de búsqueda combinando varios campos
            vector = (
                SearchVector('nombre', weight='A') +
                SearchVector('descripcion', weight='B') +
                SearchVector('tipo', weight='C') +
                SearchVector('ciudad', weight='C')
            )
            query = SearchQuery(q)

            # Anotar ranking de relevancia
            queryset = queryset.annotate(rank=SearchRank(vector, query)) \
                               .filter(rank__gte=0.1) \
                               .order_by('-rank')
        return queryset

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated(), IsProveedor(), IsProveedorOwner()]

    def get_serializer_class(self):
        if self.action == 'list':
            return ProveedorListSerializer
        return ProveedorDetailSerializer

class MisProveedoresViewSet(viewsets.ModelViewSet):
    serializer_class = ProveedorListAdminSerializer
    authentication_classes = [authentication.TokenAuthentication]
    
    def get_queryset(self):
        return Proveedor.objects.filter(administrador=self.request.user)

    def create(self, request, *args, **kwargs):
        logger.debug("CREATE Reserva payload: %s", request.data)
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except serializers.ValidationError:
            logger.error("Validation errors: %s ; payload: %s", serializer.errors, request.data)
            raise
        return super().create(request, *args, **kwargs) 

    def get_permissions(self):
        return [IsAuthenticated(), IsProveedor(), IsProveedorOwner()]

class ServicioViewSet(viewsets.ModelViewSet):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer
    authentication_classes = [authentication.TokenAuthentication]

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated(), IsProveedor(), IsProveedorOwner()]


class HabitacionViewSet(viewsets.ModelViewSet):
    queryset = Habitacion.objects.all()
    serializer_class = HabitacionSerializer
    authentication_classes = [authentication.TokenAuthentication]

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated(), IsProveedor(), IsProveedorOwner()]

    def create(self, request, *args, **kwargs):
        logger.debug("CREATE Reserva payload: %s", request.data)
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except serializers.ValidationError:
            logger.error("Validation errors: %s ; payload: %s", serializer.errors, request.data)
            raise
        return super().create(request, *args, **kwargs) 

        
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()  # obtiene la habitación según pk
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)
        

class AlquilerVehiculoViewSet(viewsets.ModelViewSet):
    queryset = AlquilerVehiculo.objects.all()
    serializer_class = AlquilerVehiculoSerializer
    authentication_classes = [authentication.TokenAuthentication]
    
    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated(), IsProveedor(), IsProveedorOwner()]

    def create(self, request, *args, **kwargs):
        logger.debug("CREATE Reserva payload: %s", request.data)
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except serializers.ValidationError:
            logger.error("Validation errors: %s ; payload: %s", serializer.errors, request.data)
            raise
        return super().create(request, *args, **kwargs) 
        

class ViajeDirectoViewSet(viewsets.ModelViewSet):
    queryset = ViajeDirecto.objects.all()
    authentication_classes = [authentication.TokenAuthentication]
    serializer_class = ViajeDirectoSerializer
    
    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated(), IsProveedor(), IsProveedorOwner()]

    def create(self, request, *args, **kwargs):
        logger.debug("CREATE Reserva payload: %s", request.data)
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except serializers.ValidationError:
            logger.error("Validation errors: %s ; payload: %s", serializer.errors, request.data)
            raise
        return super().create(request, *args, **kwargs) 


class AtraccionViewSet(viewsets.ModelViewSet):
    queryset = Atraccion.objects.all()
    authentication_classes = [authentication.TokenAuthentication]
    serializer_class = AtraccionSerializer
    
    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated(), IsProveedor(), IsProveedorOwner()]

    def create(self, request, *args, **kwargs):
        logger.debug("CREATE Reserva payload: %s", request.data)
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except serializers.ValidationError:
            logger.error("Validation errors: %s ; payload: %s", serializer.errors, request.data)
            raise
        return super().create(request, *args, **kwargs) 


class GastronomicoViewSet(viewsets.ModelViewSet):
    queryset = Gastronomico.objects.all()
    authentication_classes = [authentication.TokenAuthentication]
    serializer_class = GastronomicoSerializer
    
    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated(), IsProveedor(), IsProveedorOwner()]


class SucursalViewSet(viewsets.ModelViewSet):
    serializer_class = SucursalSerializer
    authentication_classes = [authentication.TokenAuthentication]
    queryset = Sucursal.objects.all()
    
    def get_permissions(self):  
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated(), IsProveedor(), IsProveedorOwner()]

    def get_queryset(self):
        proveedor_id = self.request.query_params.get("proveedor_id")
        if proveedor_id:
            return Sucursal.objects.filter(proveedor_id=proveedor_id)
        return Sucursal.objects.none() 

    def create(self, request, *args, **kwargs):
        if "sucursales" in request.data:
            bulk_serializer = BulkSucursalSerializer(data=request.data)
            bulk_serializer.is_valid(raise_exception=True)
            sucursales_objs = bulk_serializer.save()
            return Response(
                SucursalSerializer(sucursales_objs, many=True).data,
                status=status.HTTP_201_CREATED
            )

        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        # Bulk update para sucursales de un proveedor
        proveedor_id = request.data.get("proveedor_id")
        if "sucursales" in request.data and proveedor_id:
            try:
                proveedor = request.user.proveedor.get(id=proveedor_id)
            except:
                return Response({"error": "Proveedor no encontrado."}, status=status.HTTP_404_NOT_FOUND)

            sucursales_data = request.data["sucursales"]

            # Limpiar sucursales actuales
            proveedor.sucursales.clear()

            sucursales_objs = []
            for sucursal in sucursales_data:
                obj, _ = Sucursal.objects.get_or_create(direccion=sucursal["direccion"])
                obj.proveedor.add(proveedor)
                sucursales_objs.append(obj)

            return Response(
                SucursalSerializer(sucursales_objs, many=True).data,
                status=status.HTTP_200_OK
            )

        return super().update(request, *args, **kwargs)


class ProveedorImageView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    parser_classes = [MultiPartParser]

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated(), IsProveedor(), IsProveedorOwner()]

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
            public_id = image.image_url.split('/')[-1].split('.')[0]
            cloudinary.uploader.destroy(public_id)
            upload_result = cloudinary.uploader.upload(new_image_file)
            image.image_url = upload_result.get('secure_url')

        image.title = title
        image.save()

        serializer = ProveedorImageSerializer(image)
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
    authentication_classes = [authentication.TokenAuthentication]
    parser_classes = [MultiPartParser]

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated(), IsProveedor(), IsProveedorOwner()]

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