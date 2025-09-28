import React, { useState, useEffect, useRef, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export const GaleriaImagenes = ({ imagenes = [], duplicar = true, tamSel="lg" }) => {
  const galeriaRef = useRef(null);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [indiceSeleccionado, setIndiceSeleccionado] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false); 
  
  useEffect(() => {
    if (imagenSeleccionada) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [imagenSeleccionada]);

  const tamSelOpciones = {
    sm: "max-w-[60vw]",
    md: "max-w-[70vw]",
    lg: "max-w-[95vw]",
  };

  const handleClick = (imagen, idx) => {
    setImagenSeleccionada(imagen);
    setIndiceSeleccionado(idx);
    // document.body.classList.add('overflow-hidden'); // Descomentar si quieres evitar el scroll de fondo
  };
  const handleClose = useCallback(() => {
    setImagenSeleccionada(null);
    setIndiceSeleccionado(null);
    // document.body.classList.remove('overflow-hidden'); // Descomentar si quieres evitar el scroll de fondo
  }, []);

  const startAnimation = useCallback(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 150); // Duración de la animación de flash (ajusta a tu gusto)
    return () => clearTimeout(timer);
  }, []);

  const handleAnterior = useCallback(() => {
    if (indiceSeleccionado === null || !imagenes.length) return;
    startAnimation(); // Inicia la animación antes de cambiar la imagen
    const nuevoIndice = (indiceSeleccionado - 1 + imagenes.length) % imagenes.length;
    setIndiceSeleccionado(nuevoIndice);
    setImagenSeleccionada(imagenes[nuevoIndice]);
  }, [imagenes, indiceSeleccionado, startAnimation]);

  const handleSiguiente = useCallback(() => {
    if (indiceSeleccionado === null || !imagenes.length) return;
    startAnimation(); // Inicia la animación antes de cambiar la imagen
    const nuevoIndice = (indiceSeleccionado + 1) % imagenes.length;
    setIndiceSeleccionado(nuevoIndice);
    setImagenSeleccionada(imagenes[nuevoIndice]);
  }, [imagenes, indiceSeleccionado, startAnimation]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (imagenSeleccionada) { // Solo si el modal está abierto
        if (e.key === "ArrowRight") {
          handleSiguiente();
        }
        if (e.key === "ArrowLeft") {
          handleAnterior();
        }
        if (e.key === "Escape") {
          handleClose();
        }
      }
    };
  
    document.addEventListener("keydown", handleKeyDown);
  
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleAnterior, handleSiguiente, handleClose, imagenSeleccionada]); // Añadido imagenSeleccionada para que el efecto solo ocurra si el modal está abierto

  useEffect(() => {
    const galeria = galeriaRef.current;
    if (!galeria || imagenes.length < 2 || !duplicar) return;

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
  }, [imagenes, duplicar]);

  const listaFinal =
    imagenes.length > 3 && duplicar
      ? [...imagenes, ...imagenes]
      : [...imagenes];

  return (
    <div>
      <div
        ref={galeriaRef}
        className="flex gap-2 flex-nowrap overflow-x-auto overflow-y-clip scrollbar-hide rounded"
      >
        {listaFinal.map((imagen, idx) => (
          <img
            key={`${imagen.id}-${idx}`}
            src={imagen.image_url}
            alt={imagen.title}
            className="h-60 rounded cursor-pointer flex-shrink-0 hover:opacity-90 transition-all duration-200 transform hover:scale-101"
            onClick={() => handleClick(imagen, idx % imagenes.length)}
            draggable={false}
          />
        ))}
      </div>

      {imagenSeleccionada && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-[#181818]/90 flex items-center justify-between z-100"
          onClick={handleClose}
        >
          {/* Superposición de flash blanco */}
          {isAnimating && (
            <div className="absolute inset-0 bg-white opacity-0 animate-flash-white z-50"></div>
          )}

          <div
            onClick={(e) => e.stopPropagation()}
            >
            <div className="h-[100vh] w-12 left-4 flex lg:items-center absolute items-start lg:relative justify-center">
            {(imagenes.length > 2)? (
            <button
                className="cursor-pointer md:bg-black/50 bg-black/20 text-white text-2xl px-1 py-1 rounded-full md:hover:bg-black/60 hover:bg-black/50"
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
            className={`max-h-[90vh]  md:max-w-[90vw] ${tamSelOpciones[tamSel]} rounded object-contain transition-all duration-500 ease-in-out`}
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
                    className="cursor-pointer md:bg-black/50 bg-black/20 text-white text-2xl px-1 py-1 rounded-full md:hover:bg-black/60 hover:bg-black/50 z-100"
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