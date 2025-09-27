# Naniyamni
Proyecto del Hackathon 2025  Nica Turismo.

Naniyamni es una plataforma turística integral que conecta viajeros con proveedores locales de servicios, ofreciendo un sistema completo de búsqueda, reserva, pago y gestión de experiencias.

El objetivo es potenciar el turismo en Nicaragua mediante una experiencia digital segura, escalable y fácil de usar, tanto para turistas como para proveedores.

## Características principales:

API REST para gestión de proveedores y servicios turísticos
Sistema polimórfico de servicios especializados (hoteles, transporte, atracciones, alquiler de vehículos)
Integración con Cloudinary para gestión de imágenes
Búsqueda avanzada con PostgreSQL full-text search
Sistema de permisos basado en roles
Frontend - Aplicación React
La aplicación frontend está desarrollada en React 19 con Vite como herramienta de construcción. 

## Roles en la plataforma

### Proveedor:

Registra servicios turísticos (nombre, descripción, precios, imágenes, disponibilidad).
Administra reservas realizadas por los turistas.

### Turista:

Explora los servicios turísticos disponibles.
Selecciona y agrega servicios a Mi Tour (carrito de reservas).
Completa la reserva simulando un pago mediante Stripe.

## Demo y pruebas

Cuenta Turista de prueba:

Usuario: test@gmail.com
Contraseña: 1234

Cuenta Proveedor de prueba:

Usuario: Juan@gmail.com
Contraseña: 123

Stripe está configurado en modo prueba, por lo que se pueden usar tarjetas de prueba oficiales de Stripe.
Ejemplo: 4242 4242 4242 4242 con cualquier fecha y cualquier CVC.

## Instalación y Configuración
### Backend:
```
cd naniyamni_api  
pip install -r requirements.txt  
python manage.py migrate  
python manage.py runserver
```

### Frontend:
```
cd naniyamni_app  
npm install  
npm run dev
```

## Autores
Equipo multidisciplinario Synexia conformado por:
- Yasser Yiosvanny Rugama Matamoros
- Elian Josue Calix Montalvan
- Karla Valeska Lopez Rojas
- Carlos Eduardo Torres Manzanares
- Carlos Eduardo Alfaro Sanchez
