from rest_framework import serializers 
from .models import *
from reservas.models import *
from django.db.models import Sum

class ProveedorImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProveedorImage
        fields = ["id", "title", "image_url"]


class SucursalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sucursal
        fields = ["id", "direccion"]

class ProveedorDetailSerializer(serializers.ModelSerializer):
    imagenes = serializers.SerializerMethodField()
    imagen = serializers.SerializerMethodField()
    servicios = serializers.SerializerMethodField()
    sucursales = SucursalSerializer(many=True, read_only=True)

    class Meta:
        model = Proveedor
        fields = ["id", "nombre", "descripcion", "direccion",
                "imagenes", "ciudad", "activo", "tipo", "administrador",
                "imagen", "servicios", "longitud", "latitud", "reglas", 
                "amenidades", "sucursales"]


    def get_imagen(self, obj):
        primera = obj.imagenes.first()
        if primera:
            return ProveedorImageSerializer(primera).data
        return None

    def get_imagenes(self, obj):
        imagenes = obj.imagenes.all()[1:]
        return ProveedorImageSerializer(imagenes, many=True).data

    def get_servicios(self, obj):
        if obj.tipo in ["H", "HF"]: 
            return HabitacionSerializer(Habitacion.objects.filter(proveedor=obj), many=True).data
        elif obj.tipo == "AV":  
            return AlquilerVehiculoSerializer(AlquilerVehiculo.objects.filter(proveedor=obj), many=True).data
        elif obj.tipo in ["TTT", "OV"]: 
            return ViajeDirectoSerializer(ViajeDirecto.objects.filter(proveedor=obj), many=True).data
        elif obj.tipo in ["CR", "CP", "AL"]:  
            return AtraccionSerializer(Atraccion.objects.filter(proveedor=obj), many=True).data
        else: 
            return ServicioSerializer(Servicio.objects.filter(proveedor=obj), many=True).data


class ProveedorListSerializer(serializers.ModelSerializer):
    imagen = serializers.SerializerMethodField()
    cantidad_servicios = serializers.SerializerMethodField()

    class Meta:
        model = Proveedor
        fields = ["id", "nombre", "descripcion", "imagen","ciudad", "activo", "tipo", "latitud", "longitud", "amenidades", "reglas", "cantidad_servicios", "direccion"]

    def get_imagen(self, obj):
        primera = obj.imagenes.first()
        if primera:
            return ProveedorImageSerializer(primera).data
        return None

    def get_cantidad_servicios(self, obj):
        """Devuelve un desglose polimórfico de servicios disponibles"""
        servicios = obj.servicios.filter(disponible=True)

        if obj.tipo in ["H", "HF", "CH", "AL"]:
            resumen = {
                "total": servicios.count(),
                "habitaciones": {
                    "single": servicios.filter(habitacion__tipo="S").count(),
                    "double": servicios.filter(habitacion__tipo="D").count(),
                    "suite": servicios.filter(habitacion__tipo="SU").count(),
                },
            }
            return resumen
            
        elif obj.tipo == "AV":
            resumen = {
                "total": servicios.count(),
                "vehiculos_por_marca": dict(
                    servicios.values_list("alquilervehiculo__marca")
                    .order_by()
                    .annotate(cantidad=models.Count("id"))
                ),
            }
            return resumen

        elif obj.tipo in ["TTT", "OV"]:
            resumen = {
                "total": servicios.count(),
                "viajes": {
                    "origenes": list(
                        servicios.values_list("viajedirecto__origen", flat=True).distinct()
                    ),
                    "con_asientos": servicios.filter(
                        viajedirecto__asientos_disponibles__gt=0
                    ).count(),
                },
            }
            return resumen

        else:
            return {
                "total": servicios.count()
            }


class ProveedorListAdminSerializer(serializers.ModelSerializer):
    imagen = serializers.SerializerMethodField()
    cantidad_servicios = serializers.SerializerMethodField()
    total_vendido = serializers.SerializerMethodField()
    reservas = serializers.SerializerMethodField()
    total_en_tour = serializers.SerializerMethodField()
    imagenes = serializers.SerializerMethodField()
    servicios = serializers.SerializerMethodField()
    sucursales = SucursalSerializer(many=True, read_only=True)

    class Meta:
        model = Proveedor
        fields = ["id", "nombre", "descripcion", "imagen", "servicios", "ciudad", "activo", "tipo", "latitud", "longitud", "amenidades", "reglas", "cantidad_servicios", "total_vendido", "reservas", "direccion", "total_en_tour", "administrador", "imagenes", "sucursales"]
        read_only_fields = ["administrador"]

    def create(self, validated_data):
        validated_data['administrador'] = self.context['request'].user
        return super().create(validated_data)

    def get_servicios(self, obj):
        if obj.tipo in ["H", "HF"]:  
            return HabitacionSerializer(Habitacion.objects.filter(proveedor=obj), many=True).data
        elif obj.tipo == "AV":  
            return AlquilerVehiculoSerializer(AlquilerVehiculo.objects.filter(proveedor=obj), many=True).data
        elif obj.tipo in ["TTT", "OV"]:  
            return ViajeDirectoSerializer(ViajeDirecto.objects.filter(proveedor=obj), many=True).data
        elif obj.tipo in ["CR", "CP", "AL"]:  
            return AtraccionSerializer(Atraccion.objects.filter(proveedor=obj), many=True).data
        else: 
            return ServicioSerializer(Servicio.objects.filter(proveedor=obj), many=True).data

    def get_total_vendido(self, obj):
        total = 0
        total += ReservaAtraccion.objects.filter(servicio__proveedor=obj, estado=True).aggregate(s=Sum("total"))["s"] or 0
        total += ReservaVehiculo.objects.filter(servicio__proveedor=obj, estado=True).aggregate(s=Sum("total"))["s"] or 0
        total += ReservaHabitacion.objects.filter(servicio__proveedor=obj, estado=True).aggregate(s=Sum("total"))["s"] or 0
        total += ReservaViaje.objects.filter(servicio__proveedor=obj, estado=True).aggregate(s=Sum("total"))["s"] or 0
        return total

    def get_reservas(self, obj):
        reservas = []

        for r in ReservaAtraccion.objects.filter(servicio__proveedor=obj, estado=True):
            reservas.append({
                "id": r.id,
                "tipo": "atraccion",
                "total": r.total,
                "fecha": r.fecha_reserva,
                "cant_personas": r.cant_personas,
                "servicio": r.servicio.nombre,
                "turista": {"first_name":r.turista.first_name,
                            "last_name":r.turista.last_name,
                            "id":r.turista.id,
                            "telefono":r.turista.telefono,
                            "email":r.turista.email,
                            }
            })

        for r in ReservaVehiculo.objects.filter(servicio__proveedor=obj, estado=True):
            reservas.append({
                "id": r.id,
                "tipo": "vehiculo",
                "total": r.total,
                "fecha": r.fecha_reserva,
                "inicio": r.fecha_hora_recogida,
                "fin": r.fecha_hora_entrega,
                "servicio": r.servicio.nombre,
                "turista": {"first_name":r.turista.first_name,
                            "last_name":r.turista.last_name,
                            "id":r.turista.id,
                            "telefono":r.turista.telefono,
                            "email":r.turista.email,
                            }
            })

        for r in ReservaHabitacion.objects.filter(servicio__proveedor=obj, estado=True):
            reservas.append({
                "id": r.id,
                "tipo": "habitacion",
                "total": r.total,
                "fecha": r.fecha_reserva,
                "inicio": r.fecha_hora_llegada,
                "fin": r.fecha_hora_salida,
                "servicio": r.servicio.nombre,
                "turista": {"first_name":r.turista.first_name,
                            "last_name":r.turista.last_name,
                            "id":r.turista.id,
                            "telefono":r.turista.telefono,
                            "email":r.turista.email,
                            }
            })

        for r in ReservaViaje.objects.filter(servicio__proveedor=obj, estado=True):
            reservas.append({
                "id": r.id,
                "tipo": "viaje",
                "total": r.total,
                "fecha": r.fecha_reserva,
                "salida": r.fecha_hora_salida,
                "cant_personas": r.cant_personas,
                "servicio": r.servicio.nombre,
                "turista": {"first_name":r.turista.first_name,
                            "last_name":r.turista.last_name,
                            "id":r.turista.id,
                            "telefono":r.turista.telefono,
                            "email":r.turista.email,
                            }
            })

        return reservas

    def get_total_en_tour(self, obj):
        en_tour = []

        for r in ReservaAtraccion.objects.filter(servicio__proveedor=obj):
            en_tour.append({
                "id": r.id,
                "tipo": "atraccion",
                "total": r.total,
                "fecha": r.fecha_reserva,
                "cant_personas": r.cant_personas,
                "servicio": r.servicio.nombre,
                "turista": {"first_name":r.turista.first_name,
                            "last_name":r.turista.last_name,
                            "id":r.turista.id,
                            "telefono":r.turista.telefono,
                            "email":r.turista.email,
                            }
            })

        for r in ReservaVehiculo.objects.filter(servicio__proveedor=obj):
            en_tour.append({
                "id": r.id,
                "tipo": "vehiculo",
                "total": r.total,
                "fecha": r.fecha_reserva,
                "inicio": r.fecha_hora_recogida,
                "fin": r.fecha_hora_entrega,
                "servicio": r.servicio.nombre,
                "turista": {"first_name":r.turista.first_name,
                            "last_name":r.turista.last_name,
                            "id":r.turista.id,
                            "telefono":r.turista.telefono,
                            "email":r.turista.email,
                            }
            })

        for r in ReservaHabitacion.objects.filter(servicio__proveedor=obj):
            en_tour.append({
                "id": r.id,
                "tipo": "habitacion",
                "total": r.total,
                "fecha": r.fecha_reserva,
                "inicio": r.fecha_hora_llegada,
                "fin": r.fecha_hora_salida,
                "servicio": r.servicio.nombre,
                "turista": {"first_name":r.turista.first_name,
                            "last_name":r.turista.last_name,
                            "id":r.turista.id,
                            "telefono":r.turista.telefono,
                            "email":r.turista.email,
                            }
            })

        for r in ReservaViaje.objects.filter(servicio__proveedor=obj):
            en_tour.append({
                "id": r.id,
                "tipo": "viaje",
                "total": r.total,
                "fecha": r.fecha_reserva,
                "salida": r.fecha_hora_salida,
                "cant_personas": r.cant_personas,
                "servicio": r.servicio.nombre,
                "turista": {"first_name":r.turista.first_name,
                            "last_name":r.turista.last_name,
                            "id":r.turista.id,
                            "telefono":r.turista.telefono,
                            "email":r.turista.email,
                            }
            })

        return en_tour

    def get_imagen(self, obj):
        primera = obj.imagenes.first()
        if primera:
            return ProveedorImageSerializer(primera).data
        return None
    
    def get_imagenes(self, obj):
        imagenes = obj.imagenes.all()[1:]
        return ProveedorImageSerializer(imagenes, many=True).data

    def get_cantidad_servicios(self, obj):
        """Devuelve un desglose polimórfico de servicios disponibles"""
        servicios = obj.servicios.filter(disponible=True)

        if obj.tipo in ["H", "HF", "CH", "AL"]:
            resumen = {
                "total": servicios.count(),
                "habitaciones": {
                    "single": servicios.filter(habitacion__tipo="S").count(),
                    "double": servicios.filter(habitacion__tipo="D").count(),
                    "suite": servicios.filter(habitacion__tipo="SU").count(),
                },

            }
            return resumen

        elif obj.tipo == "AV":
            resumen = {
                "total": servicios.count(),
                "vehiculos_por_marca": dict(
                    servicios.values_list("alquilervehiculo__marca")
                    .order_by()
                    .annotate(cantidad=models.Count("id"))
                ),
            }
            return resumen

        elif obj.tipo in ["TTT", "OV"]:
            resumen = {
                "total": servicios.count(),
                "viajes": {
                    "origenes": list(
                        servicios.values_list("viajedirecto__origen", flat=True).distinct()
                    ),
                    "con_asientos": servicios.filter(
                        viajedirecto__asientos_disponibles__gt=0
                    ).count(),
                },
            }
            return resumen
        else:
            return {
                "total": servicios.count()
            }


class ServicioImageSerializer(serializers.ModelSerializer):
    class Meta:
        model =  ServicioImage
        fields = ["id", "title", "image_url"]


class CaracteristicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Caracteristica
        fields = ["id","nombre"]


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ["id","nombre", "cant_vehiculos"]


#serializer padre
class ServicioSerializer(serializers.ModelSerializer):
    imagenes = ServicioImageSerializer(many=True, read_only=True)
    caracteristicas = CaracteristicaSerializer(many=True,)

    class Meta:
        model = Servicio
        fields = ["id", "nombre", "descripcion", "precio", 
                "disponible", "proveedor", "imagenes", 
                "caracteristicas", "tipo_servicio"]

    def create(self, validated_data):
        caracteristicas_data = validated_data.pop("caracteristicas", [])
        servicio = super().create(validated_data)
        car_objs = []
        for car in caracteristicas_data:
            caracteristica, _ = Caracteristica.objects.get_or_create(nombre=car)
            car_objs.append(caracteristica)
        servicio.caracteristicas.set(car_objs)
        return servicio

    def update(self, instance, validated_data):
        caracteristicas_data = validated_data.pop("caracteristicas", None)
        instance = super().update(instance, validated_data)
        if caracteristicas_data is not None:
            car_objs = []
            for car in caracteristicas_data:
                caracteristica, _ = Caracteristica.objects.get_or_create(nombre=car)
                car_objs.append(caracteristica)
            instance.caracteristicas.set(car_objs)
        return instance


class AlquilerVehiculoSerializer(ServicioSerializer):
    marca = serializers.CharField()
    modelo = serializers.CharField()
    transmision = serializers.CharField()
    cant_asientos = serializers.IntegerField()
    cant_vehiculos = serializers.IntegerField(required=False)

    sucursales = serializers.ListField(
        child=serializers.CharField(),
        write_only=True,
        required=False
    )
    caracteristicas = serializers.ListField(
        child=serializers.CharField(),
        write_only=True,
        required=False
    )

    sucursales_data = SucursalSerializer(many=True, read_only=True, source="sucursales")
    caracteristicas_data = CaracteristicaSerializer(many=True, read_only=True, source="caracteristicas")

    categoria = CategoriaSerializer(read_only=True)
    imagenes = ServicioImageSerializer(many=True, read_only=True)
    reservas_ocupadas = serializers.SerializerMethodField()
    total_reservas = serializers.SerializerMethodField()
    total_vendido = serializers.SerializerMethodField()
    total_en_tour = serializers.SerializerMethodField()

    class Meta(ServicioSerializer.Meta):
        model = AlquilerVehiculo
        fields = ServicioSerializer.Meta.fields + [
            "modelo", "marca", "transmision", "cant_asientos", "cant_vehiculos",
            "reservas_ocupadas", "sucursales", "sucursales_data",
            "categoria", "caracteristicas", "caracteristicas_data",
            "total_reservas", "total_vendido", "total_en_tour", "tipo_servicio",
        ]

    def create(self, validated_data):
        sucursales_data = validated_data.pop("sucursales", [])
        caracteristicas_data = validated_data.pop("caracteristicas", [])
        cant_vehiculos = validated_data.pop("cant_vehiculos", 0)
        nombre_categoria = validated_data.get("nombre")

        categoria, created = Categoria.objects.get_or_create(
            nombre=nombre_categoria,
            defaults={"cant_vehiculos": cant_vehiculos}
        )
        if not created:
            categoria.cant_vehiculos = cant_vehiculos
            categoria.save()

        validated_data["categoria"] = categoria

        alquiler = super().create(validated_data)

        car_objs = [Caracteristica.objects.get_or_create(nombre=car)[0] for car in caracteristicas_data]
        alquiler.caracteristicas.set(car_objs)

        suc_objs = [Sucursal.objects.get_or_create(direccion=d)[0] for d in sucursales_data]
        alquiler.sucursales.set(suc_objs)

        return alquiler

    def update(self, instance, validated_data):
        sucursales_data = validated_data.pop("sucursales", None)
        caracteristicas_data = validated_data.pop("caracteristicas", None)
        cant_vehiculos = validated_data.pop("cant_vehiculos", instance.categoria.cant_vehiculos)
        nombre_categoria = validated_data.get("nombre", instance.nombre)

        categoria, created = Categoria.objects.get_or_create(
            nombre=nombre_categoria,
            defaults={"cant_vehiculos": cant_vehiculos}
        )
        if not created:
            categoria.cant_vehiculos = cant_vehiculos
            categoria.save()

        instance.categoria = categoria

        instance = super().update(instance, validated_data)

        if caracteristicas_data is not None:
            car_objs = [Caracteristica.objects.get_or_create(nombre=car)[0] for car in caracteristicas_data]
            instance.caracteristicas.set(car_objs)

        if sucursales_data is not None:
            suc_objs = [Sucursal.objects.get_or_create(direccion=d)[0] for d in sucursales_data]
            instance.sucursales.set(suc_objs)

        return instance


    def get_reservas_ocupadas(self, obj):
        reservas = obj.reservas.filter(estado=True)
        return [
            {
                "inicio": r.fecha_hora_recogida,
                "fin": r.fecha_hora_entrega
            } for r in reservas
        ]

    def get_total_reservas(self, obj):
        return obj.reservas.filter(estado=True).count()

    def get_total_en_tour(self, obj):
        return obj.reservas.count()

    def get_total_vendido(self, obj):
        return sum(r.total for r in obj.reservas.filter(estado=True))

class HoraSalidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hora_salida
        fields = ["id", "hora"]


class ItinerarioSerializer(serializers.ModelSerializer):
    horas_salida = HoraSalidaSerializer(many=True)

    class Meta:
        model = Itinerario
        fields = ["dia", "horas_salida"]

    def create(self, validated_data):
        horas_data = validated_data.pop("horas_salida", [])
        horas_objs = [Hora_salida.objects.create(**hora) for hora in horas_data]

        itinerario = Itinerario.objects.create(**validated_data)
        itinerario.horas_salida.set(horas_objs)

        return itinerario


class DestinoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destino 
        fields = ["nombre", "duracion"]


class ViajeDirectoSerializer(serializers.ModelSerializer):
    destinos = DestinoSerializer(many=True, read_only=False)
    itinerarios = ItinerarioSerializer(many=True, read_only=False)
    reservas_ocupadas = serializers.SerializerMethodField()
    imagenes = ServicioImageSerializer(many=True, read_only=True)
    total_reservas = serializers.SerializerMethodField()
    total_vendido = serializers.SerializerMethodField()
    total_en_tour = serializers.SerializerMethodField()
    caracteristicas = serializers.ListField(
        child=serializers.CharField(),
        write_only=True,
        required=False
    )

    caracteristicas_data = CaracteristicaSerializer(many=True, read_only=True, source="caracteristicas")

    class Meta(ServicioSerializer.Meta):
        model = ViajeDirecto
        fields = ServicioSerializer.Meta.fields + [
            "origen", 
            "asientos_disponibles", 
            "destinos", 
            "reservas_ocupadas", 
            "itinerarios",
            "imagenes",
            "total_reservas", "total_vendido",
            "total_en_tour",
            "tipo_servicio",
            "caracteristicas",
            "caracteristicas_data"
        ]

    def get_total_reservas(self, obj):
        return obj.reservas.filter(estado=True).count()

    def get_total_en_tour(self, obj):
        return obj.reservas.count()

    def get_total_vendido(self, obj):
        return sum(r.total for r in obj.reservas.filter(estado=True))

    def get_reservas_ocupadas(self, obj):
        reservas = obj.reservas.filter(estado=True)
        return [
            {"inicio": r.fecha_reserva, "fin": r.fecha_reserva} for r in reservas
        ]

    def create(self, validated_data):
        destinos_data = validated_data.pop("destinos", [])
        itinerarios_data = validated_data.pop("itinerarios", [])
        caracteristicas_data = validated_data.pop("caracteristicas", [])
        viaje = ViajeDirecto.objects.create(**validated_data)

        if caracteristicas_data:
            car_objs = [Caracteristica.objects.get_or_create(nombre=car)[0] for car in caracteristicas_data]
            viaje.caracteristicas.set(car_objs)

        for destino_data in destinos_data:
            Destino.objects.create(viaje=viaje, **destino_data)

        for itinerario_data in itinerarios_data:
            horas_data = itinerario_data.pop("horas_salida", [])
            itinerario = Itinerario.objects.create(viaje=viaje, **itinerario_data)
            horas_objs = [Hora_salida.objects.create(**hora) for hora in horas_data]
            itinerario.horas_salida.set(horas_objs)
        

        return viaje

    def update(self, instance, validated_data):
        destinos_data = validated_data.pop("destinos", [])
        itinerarios_data = validated_data.pop("itinerarios", [])
        caracteristicas_data = validated_data.pop("caracteristicas", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        destinos_map = {d.id: d for d in instance.destinos.all()}

        for destino_data in destinos_data:
            destino_id = destino_data.get("id", None)
            if destino_id and destino_id in destinos_map:
                for attr, value in destino_data.items():
                    setattr(destinos_map[destino_id], attr, value)
                destinos_map[destino_id].save()
                destinos_map.pop(destino_id)
            else:
                Destino.objects.create(viaje=instance, **destino_data)
      
        for d in destinos_map.values():
            d.delete()

        itinerarios_map = {i.id: i for i in instance.itinerarios.all()}

        for itinerario_data in itinerarios_data:
            horas_data = itinerario_data.pop("horas_salida", [])
            itinerario_id = itinerario_data.get("id", None)

            if itinerario_id and itinerario_id in itinerarios_map:
                itinerario = itinerarios_map[itinerario_id]
                for attr, value in itinerario_data.items():
                    setattr(itinerario, attr, value)
                itinerario.save()
                itinerarios_map.pop(itinerario_id)
            else:
                itinerario = Itinerario.objects.create(viaje=instance, **itinerario_data)

            horas_objs = [Hora_salida.objects.create(**hora) for hora in horas_data]
            itinerario.horas_salida.set(horas_objs)

        for i in itinerarios_map.values():
            i.delete()
        
        if caracteristicas_data is not None:
            car_objs = [Caracteristica.objects.get_or_create(nombre=car)[0] for car in caracteristicas_data]
            instance.caracteristicas.set(car_objs)

        return instance

class AtraccionSerializer(serializers.ModelSerializer):
    imagenes = ServicioImageSerializer(many=True, read_only=True)
    reservas_ocupadas = serializers.SerializerMethodField()
    total_reservas = serializers.SerializerMethodField()
    total_vendido = serializers.SerializerMethodField()
    total_en_tour = serializers.SerializerMethodField()
    caracteristicas = serializers.ListField(
        child=serializers.CharField(),
        write_only=True,
        required=False
    )

    caracteristicas_data = CaracteristicaSerializer(many=True, read_only=True, source="caracteristicas")

    class Meta(ServicioSerializer.Meta):
        model = Atraccion
        fields = ServicioSerializer.Meta.fields + ["guia_incluido", "cupo_maximo", "reservas_ocupadas",
         "hora_cierre", "hora_apertura", "dias_abierto", "duracion", "total_reservas", "total_vendido", 
         "total_en_tour", "tipo_servicio", "caracteristicas_data"]

    def get_reservas_ocupadas(self, obj):
        reservas = obj.reservas.filter(estado=True)
        return [
            {"inicio": r.fecha_reserva, "fin": r.fecha_reserva} for r in reservas
        ]

    def get_total_reservas(self, obj):
        return obj.reservas.filter(estado=True).count()

    def get_total_en_tour(self, obj):
        return obj.reservas.count()

    def get_total_vendido(self, obj):
        return sum(r.total for r in obj.reservas.filter(estado=True))

    def create(self, validated_data):
        caracteristicas_data = validated_data.pop("caracteristicas", [])
        habitacion = super().create(validated_data)

        # Asignar ManyToMany Caracteristicas
        car_objs = [Caracteristica.objects.get_or_create(nombre=c)[0] for c in caracteristicas_data]
        habitacion.caracteristicas.set(car_objs)

        return habitacion

    def update(self, instance, validated_data):
        caracteristicas_data = validated_data.pop("caracteristicas", None)
        servicios_data = validated_data.pop("servicios", None)

        instance = super().update(instance, validated_data)

        if caracteristicas_data is not None:
            car_objs = [Caracteristica.objects.get_or_create(nombre=c)[0] for c in caracteristicas_data]
            instance.caracteristicas.set(car_objs)

        instance = super().update(instance, validated_data)

        return instance


class GastronomicoSerializer(serializers.ModelSerializer):
    imagenes = ServicioImageSerializer(many=True, read_only=True)
    caracteristicas = CaracteristicaSerializer(many=True, read_only=True)

    class Meta(ServicioSerializer.Meta):
        model = Gastronomico
        fields = ServicioSerializer.Meta.fields + ["tipo_comida"]


class HabitacionSerializer(serializers.ModelSerializer):
    imagenes = ServicioImageSerializer(many=True, read_only=True)
    reservas_ocupadas = serializers.SerializerMethodField()
    total_reservas = serializers.SerializerMethodField()
    total_vendido = serializers.SerializerMethodField()
    total_en_tour = serializers.SerializerMethodField()
    caracteristicas = serializers.ListField(
        child=serializers.CharField(),
        write_only=True,
        required=False
    )

    caracteristicas_data = CaracteristicaSerializer(many=True, read_only=True, source="caracteristicas")

    class Meta:
        model = Habitacion
        fields = ServicioSerializer.Meta.fields + ["capacidad", "tipo", "reservas_ocupadas",
                                                "total_reservas", "total_vendido", "total_en_tour", 
                                                "tipo_servicio", "hora_check_in", "hora_check_out", "caracteristicas_data"]

    def create(self, validated_data):
        caracteristicas_data = validated_data.pop("caracteristicas", [])
        habitacion = super().create(validated_data)

        car_objs = [Caracteristica.objects.get_or_create(nombre=c)[0] for c in caracteristicas_data]
        habitacion.caracteristicas.set(car_objs)

        return habitacion

    def update(self, instance, validated_data):
        caracteristicas_data = validated_data.pop("caracteristicas", None)
        servicios_data = validated_data.pop("servicios", None)

        instance = super().update(instance, validated_data)

        if caracteristicas_data is not None:
            car_objs = [Caracteristica.objects.get_or_create(nombre=c)[0] for c in caracteristicas_data]
            instance.caracteristicas.set(car_objs)

        instance = super().update(instance, validated_data)

        return instance

    def get_reservas_ocupadas(self, obj):
        reservas = obj.reservas.filter(estado=True)
        return [
            {
                "inicio": r.fecha_hora_llegada,
                "fin": r.fecha_hora_salida
            } for r in reservas
        ]

    def get_total_reservas(self, obj):
        return obj.reservas.filter(estado=True).count()

    def get_total_en_tour(self, obj):
        return obj.reservas.count()

    def get_total_vendido(self, obj):
        return sum(r.total for r in obj.reservas.filter(estado=True))


class BulkSucursalSerializer(serializers.Serializer):
    proveedor_id = serializers.IntegerField()
    sucursales = serializers.ListField(
        child=serializers.DictField(child=serializers.CharField())
    )

    def create(self, validated_data):
        proveedor_id = validated_data["proveedor_id"]
        sucursales_data = validated_data["sucursales"]

        try:
            proveedor = Proveedor.objects.get(id=proveedor_id)
        except Proveedor.DoesNotExist:
            raise serializers.ValidationError("Proveedor no encontrado.")

        sucursales_objs = []
        for sucursal in sucursales_data:
            obj, _ = Sucursal.objects.get_or_create(
                direccion=sucursal["direccion"],
                proveedor=proveedor
            )
            sucursales_objs.append(obj)

        return sucursales_objs

    def update(self, instance, validated_data):
        proveedor_id = validated_data.pop("proveedor_id")
        sucursales_data = validated_data.pop("sucursales", [])

        try:
            proveedor = Proveedor.objects.get(id=proveedor_id)
        except Proveedor.DoesNotExist:
            raise serializers.ValidationError("Proveedor no encontrado.")

        proveedor.sucursales.clear()

        sucursales_objs = []
        for sucursal in sucursales_data:
            obj, _ = Sucursal.objects.get_or_create(direccion=sucursal["direccion"], proveedor=proveedor)
            sucursales_objs.append(obj)

        return sucursales_objs
