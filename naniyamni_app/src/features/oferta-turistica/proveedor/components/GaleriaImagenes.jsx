import React, { useState, useEffect, useRef, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export const GaleriaImagenes = ({ imagenes = [], duplicar = true, tamSel="lg" }) => {
  const galeriaRef = useRef(null);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [indiceSeleccionado, setIndiceSeleccionado] = useState(null);

  const tamSelOpciones = {
    md: "max-w-[70vw]",
    lg: "max-w-[95vw]",
  };

  const handleClick = (imagen, idx) => {
    setImagenSeleccionada(imagen);
    setIndiceSeleccionado(idx);
  };
  const handleClose = () => {
    setImagenSeleccionada(null);
    setIndiceSeleccionado(null);
  };

  const handleAnterior = useCallback(() => {
    if (indiceSeleccionado === null) return;
    const nuevoIndice = (indiceSeleccionado - 1 + imagenes.length) % imagenes.length;
    setIndiceSeleccionado(nuevoIndice);
    setImagenSeleccionada(imagenes[nuevoIndice]);
  }, [imagenes, indiceSeleccionado]);

  const handleSiguiente = useCallback(() => {
    if (indiceSeleccionado === null) return;
    const nuevoIndice = (indiceSeleccionado + 1) % imagenes.length;
    setIndiceSeleccionado(nuevoIndice);
    setImagenSeleccionada(imagenes[nuevoIndice]);
  }, [imagenes, indiceSeleccionado]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        handleSiguiente();
      }
      if (e.key === "ArrowLeft") {
        handleAnterior();
      }
      if (e.key === "Escape") {
        handleClose();
      }
    };
  
    document.addEventListener("keydown", handleKeyDown);
  
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleAnterior, handleSiguiente]);

  useEffect(() => {
    const galeria = galeriaRef.current;
    if (!galeria || imagenes.length < 2) return;

    const anchoOriginal = galeria.scrollWidth / 2;
    const intervalMs = 5000;

    galeria.style.scrollBehavior = "smooth";

    const interval = setInterval(() => {
      const idxActual = Math.round(
        galeria.scrollLeft / (galeria.firstChild?.offsetWidth || 1)
      );
      const imagenActual = galeria.children[idxActual];
      const imagenWidth = imagenActual?.offsetWidth + 8 || 250;

      galeria.scrollLeft += imagenWidth;

      if (galeria.scrollLeft >= anchoOriginal) {
        galeria.style.scrollBehavior = "auto";
        galeria.scrollLeft -= anchoOriginal;
        galeria.style.scrollBehavior = "smooth";
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [imagenes]);

  const listaFinal =
    imagenes.length > 3 && duplicar
      ? [...imagenes, ...imagenes]
      : [...imagenes];

  return (
    <div>
      <div
        ref={galeriaRef}
        className="flex gap-2 flex-nowrap overflow-x-auto scrollbar-hide rounded bg-white"
      >
        {listaFinal.map((imagen, idx) => (
          <img
            key={`${imagen.id}-${idx}`}
            src={imagen.image_url}
            alt={imagen.title}
            className="h-60 rounded cursor-pointer flex-shrink-0 hover:opacity-90"
            onClick={() => handleClick(imagen, idx % imagenes.length)}
            draggable={false}
          />
        ))}
      </div>

      {imagenSeleccionada && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-between z-50"
          onClick={handleClose}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            >
            <div className="h-[100vh] w-12 left-4 flex lg:items-center absolute items-start lg:relative justify-center">
            {(imagenes.length > 2)? (
            <button
                className="cursor-pointer md:bg-black/50 bg-black/20 text-white text-2xl px-1 py-1 rounded-full hover:bg-black/70"
                onClick={handleAnterior}
              >
              <ChevronLeft className="w-8 h-8" />
              </button>
              ):""}
              </div>
          </div>
          <img
            src={imagenSeleccionada.image_url}
            alt={imagenSeleccionada.title}
            className={`max-h-[90vh] md:max-w-[90vw] ${tamSelOpciones[tamSel]} rounded object-cover`}
          />
          <button
              className="absolute top-4 right-4  text-white px-1 py-1 rounded-full cursor-pointer z-100"
              onClick={handleClose}
            >
              <X className="w-8 h-8"/> 
            </button>     
              <div
                onClick={(e) => e.stopPropagation()}
                >
                <div className="h-[100vh] w-12 right-4 flex items-start lg:items-center justify-center absolute lg:relative">
                {(imagenes.length > 2)? (
                  <button
                    className="cursor-pointer md:bg-black/50 bg-black/20 text-white text-2xl px-1 py-1 rounded-full hover:bg-black/70"
                    onClick={handleSiguiente}
                  >
                    <ChevronRight className="w-8 h-8"/>
                  </button>
                  ):""}                                                                                    
                </div>
              </div>
        </div>
      )}
    </div>
  );
};
