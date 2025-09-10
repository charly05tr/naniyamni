import React, { useState } from "react";

export const GaleriaImagenes = ({ proveedor }) => {
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  const handleClick = (imagen) => {
    setImagenSeleccionada(imagen);
  };

  const handleClose = () => {
    setImagenSeleccionada(null);
  };

  return (
    <div>
      <div className="flex m-2 gap-2 flex-wrap">
        {proveedor.imagenes?.map((imagen) => (
          <img
            key={imagen.id}
            src={imagen.image_url}
            alt={imagen.title}
            className="h-60 w-60 rounded cursor-pointer hover:opacity-80"
            onClick={() => handleClick(imagen)}
          />
        ))}
      </div>

      {imagenSeleccionada && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={handleClose}
        >
          <img
            src={imagenSeleccionada.image_url}
            alt={imagenSeleccionada.title}
            className="max-h-[90vh] max-w-[90vw] rounded shadow-lg"
          />
          <button
            className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded"
            onClick={handleClose}
          >
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
};
