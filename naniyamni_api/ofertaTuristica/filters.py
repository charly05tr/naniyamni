import django_filters
from .models import Proveedor

class ProveedorFilter(django_filters.FilterSet):
    class Meta:
        model = Proveedor
        fields = ["ciudad", "tipo"]