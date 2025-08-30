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
    Solo el proveedor que creó el servicio puede modificarlo
    """
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated and getattr(request.user, 'rol', None) == 'Proveedor' and obj.administrador == request.user