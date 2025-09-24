import React from 'react';

const Cargando = ({ mensaje }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="flex flex-col items-center">
        {/* Contenedor del spinner */}
        <div className="relative w-16 h-16 animate-spin">
          {/* Círculo base con el degradado */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-yellow-300"></div>

          {/* Círculo interior de color sólido para crear el efecto de borde */}
          <div className="absolute inset-1 rounded-full bg-gray-900"></div>
        </div>

        {/* Mensaje de estado */}
        <p className="mt-4 text-white text-lg font-semibold">
          {mensaje || 'Cargando...'}
        </p>
      </div>
    </div>
  );
};

export default Cargando;