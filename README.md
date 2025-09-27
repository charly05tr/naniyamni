# naniyamni
Proyecto del Hackathon 2025 Nica Turismo.

Naniyamni es una plataforma completa de reservas turísticas que conecta proveedores de servicios turísticos con viajeros, ofreciendo una experiencia integral de búsqueda, reserva y gestión de servicios turísticos.

Arquitectura del Sistema
Backend - API REST con Django
El backend está construido con Django REST Framework y proporciona una API completa para la gestión de servicios turísticos. admin.py:1-10

Características principales:

API REST para gestión de proveedores y servicios turísticos
Sistema polimórfico de servicios especializados (hoteles, transporte, atracciones, alquiler de vehículos)
Integración con Cloudinary para gestión de imágenes
Búsqueda avanzada con PostgreSQL full-text search
Sistema de permisos basado en roles
Frontend - Aplicación React
La aplicación frontend está desarrollada en React 19 con Vite como herramienta de construcción. App.jsx:26-32

Estructura de Rutas
La aplicación define rutas específicas para diferentes tipos de usuarios:

Rutas públicas:
/ - Página de inicio
/login - Autenticación
/register - Registro de usuarios
/oferta-turistica - Exploración de ofertas
Rutas de turistas:

/profile - Gestión de perfil
/MiTour - Tours personales
/reservas-activas - Reservas activas
/pay - Procesamiento de pagos
Rutas de proveedores:

/colaborador - Dashboard de colaborador
/new-proveedor - Creación de nuevo proveedor
/proveedor/:id/admin - Administración de proveedor

Instalación y Configuración
Backend
cd naniyamni_api  
pip install -r requirements.txt  
python manage.py migrate  
python manage.py runserver
Frontend
cd naniyamni_app  
npm install  
npm run dev
Tecnologías Utilizadas

Frontend:
React 19 con hooks y context
Vite para desarrollo y build
Tailwind CSS para estilos utilitarios
React Router para navegación SPA
Leaflet para mapas interactivos
Contribución
El proyecto sigue una arquitectura modular que facilita la extensión y mantenimiento del código, con separación clara entre la lógica de negocio del backend y la interfaz de usuario del frontend.

Notes

El proyecto Naniyamni implementa una arquitectura completa de microservicios para turismo, con un backend Django que maneja la lógica de negocio y un frontend React que proporciona una interfaz moderna y responsiva. La documentación del wiki proporciona detalles técnicos exhaustivos sobre la implementación de cada componente del sistema.

Wiki pages you might want to explore:

Frontend Architecture (charly05tr/naniyamni)
Tourism Domain API (charly05tr/naniyamni)