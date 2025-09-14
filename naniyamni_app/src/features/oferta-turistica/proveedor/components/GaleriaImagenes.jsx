import React, { useState, useEffect, useRef } from "react";

export const GaleriaImagenes = ({ imagenes = [], duplicar=true }) => {
  const galeriaRef = useRef(null);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  const handleClick = (imagen) => setImagenSeleccionada(imagen);
  const handleClose = () => setImagenSeleccionada(null);

  useEffect(() => {
    const galeria = galeriaRef.current;
    if (!galeria || imagenes.length < 2) return;

    // duplicar lista para loop
    const anchoOriginal = galeria.scrollWidth / 2;
    const imagenWidth = galeria.firstChild?.offsetWidth + 8|| 250; // ancho de cada imagen
    const intervalMs = 5000; // duración de la animación por imagen

    // CSS smooth scroll
    galeria.style.scrollBehavior = "smooth";

    const interval = setInterval(() => {
      galeria.scrollLeft += imagenWidth;

      if (galeria.scrollLeft >= anchoOriginal) {
        // saltar al inicio sin animación para loop continuo
        galeria.style.scrollBehavior = "auto";
        galeria.scrollLeft -= anchoOriginal;
        galeria.style.scrollBehavior = "smooth";
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [imagenes]);

  // duplicar la lista para loop continuo
  const dobleLista = (duplicar)?[...imagenes, ...imagenes]:[...imagenes];

  return (
    <div>
      <div
        ref={galeriaRef}
        className="flex gap-2 flex-nowrap overflow-x-auto scrollbar-hide rounded"
      >
        {dobleLista.map((imagen, idx) => (
          <img
            key={`${imagen.id}-${idx}`}
            src={imagen.image_url}
            alt={imagen.title}
            className="h-60 w-60 rounded cursor-pointer object-cover flex-shrink-0 hover:opacity-90"
            onClick={() => handleClick(imagen)}
            draggable={false}
          />
        ))}
      </div>

      {imagenSeleccionada && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50"
          onClick={handleClose}
        >
          <img
            src={imagenSeleccionada.image_url}
            alt={imagenSeleccionada.title}
            className="max-h-[90vh] max-w-[90vw] rounded shadow-lg object-cover"
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
