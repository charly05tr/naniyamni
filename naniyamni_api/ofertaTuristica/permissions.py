from rest_framework import permissions

class IsProveedor(permissions.BasePermission):
    """
    Permite acceso solo a usuarios con rol 'proveedor'.
    """

    def has_permission(self, request, view):
        # Permite GET para todos, pero protege POST/PUT/PATCH/DELETE
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated and getattr(request.user, 'rol', None) == 'Proveedor'


class IsProveedorOwner(permissions.BasePermission):
    """
    Permite modificar solo al proveedor propietario del servicio.
    """
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        user = request.user

        # Primero intenta usar 'administrador' directo
        propietario = getattr(obj, 'administrador', None)

        # Si no existe, intenta obtener de 'proveedor'
        if propietario is None:
            proveedor_obj = getattr(obj, 'proveedor', None)
            if proveedor_obj:
                propietario = getattr(proveedor_obj, 'administrador', None)

        return (
            user.is_authenticated and
            getattr(user, 'rol', None) == 'Proveedor' and
            propietario == user
        )