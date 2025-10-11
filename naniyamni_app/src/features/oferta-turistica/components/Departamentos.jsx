import React, { useState, useEffect, useRef } from "react";

// Carrusel tipo slider mostrando varios departamentos a la vez a pantalla completa
// Ideal para página principal como filtros, capa difuminada encima de la imagen

const DEPARTAMENTOS = [
  { id: 1, name: "Madriz", image: "https://res.cloudinary.com/drxgsb2ez/image/upload/v1760170250/tx6bnrr67j22pqfaslsh.jpg" },
  { id: 2, name: "Jinotega", image: "https://res.cloudinary.com/drxgsb2ez/image/upload/v1760170250/heoiqjvbq8962wchj32l.jpg" },
  { id: 3, name: "León", image: "https://res.cloudinary.com/drxgsb2ez/image/upload/v1760170251/wkyhrdv1vgztczrzffh5.jpg" },
  { id: 4, name: "Managua", image: "https://res.cloudinary.com/drxgsb2ez/image/upload/v1760170251/lwzntic5y5kwbppadher.jpg" },
  { id: 5, name: "Corn Island", image: "https://res.cloudinary.com/drxgsb2ez/image/upload/v1760170251/c7j5epjh6hzmlaopqwug.jpg" },
  { id: 6, name: "Masaya", image: "https://res.cloudinary.com/drxgsb2ez/image/upload/v1760170253/umlvk0nuxndyn6beqhq7.jpg" },
  { id: 7, name: "Granada", image: "https://res.cloudinary.com/drxgsb2ez/image/upload/v1760170255/kxvuuavqmcj4ujwqljix.jpg" },
  { id: 8, name: "Estelí", image: "https://res.cloudinary.com/drxgsb2ez/image/upload/v1760170255/j7vnyog3vcbbnt4lf9uv.jpg" },
  { id: 9, name: "Matagalpa", image: "https://res.cloudinary.com/drxgsb2ez/image/upload/v1760170257/ghsf8m3xya8wu1r5heec.jpg" },
  { id: 10, name: "Rivas", image: "https://res.cloudinary.com/drxgsb2ez/image/upload/v1760170335/prxnt4nqfaqamrgc8mhl.jpg" }
];

export default function CarruselDepartamentosFullWidth({ className = "", refetch, autoPlay = true, autoPlayInterval = 8000, visibleItems = 3 }) {
  const [startIndex, setStartIndex] = useState(0);
  const length = DEPARTAMENTOS.length;
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!autoPlay) return;

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setStartIndex((prev) => (prev + 1) % length);
    }, autoPlayInterval);

    return () => clearTimeout(timeoutRef.current);
  }, [startIndex, autoPlay, autoPlayInterval, length]);

  const goPrev = () => setStartIndex((prev) => (prev - 1 + length) % length);
  const goNext = () => setStartIndex((prev) => (prev + 1) % length);

  // Obtener los elementos visibles
  const visibleDepartments = [];
  for (let i = 0; i < visibleItems; i++) {
    visibleDepartments.push(DEPARTAMENTOS[(startIndex + i) % length]);
  }

  const handleSelect = (departamento) => {
    refetch(departamento);
  }

  return (
    <div className={`m-5 relative mb-10 ${className}`}> 
      <div className="flex overflow-hidden gap-2 w-full">
        {visibleDepartments.map((dept) => (
          <div
            key={dept.id}
            onClick={() => handleSelect(dept.name)}
            className="relative flex-1 h-48 sm:h-56 w-full cursor-pointer rounded-xl shadow-md overflow-hidden dark:hover:opacity-90 transition-all duration-200 transform hover:scale-101"
          >
            {/* Imagen de fondo */}
            <img
              src={dept.image}
              alt={dept.name}
              className="shadow absolute inset-0 w-full h-full object-cover text-white"
            />

            {/* Capa solapada encima */}
            <div className="absolute inset-0 dark:bg-black/30 flex items-end bg-black/5">
              <div className="bg-gradient-to-t from-[#2CA6A4]/40 to-transparent rounded-md p-2 w-full text-center">
                <h3 className="text-[#F9FAFB] text-sm sm:text-base font-bold text-shadow-xl">{dept.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controles */}
      <button
        onClick={goPrev}
        aria-label="Anterior"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-1 rounded-full shadow transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.293 16.293a1 1 0 010 1.414l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L8.414 10l5.293 5.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
      </button>

      <button
        onClick={goNext}
        aria-label="Siguiente"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-1 rounded-full shadow transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.707 3.707a1 1 0 010-1.414l6 6a1 1 0 010 1.414l-6 6A1 1 0 016.293 14.293L11.586 9 6.293 3.707a1 1 0 011.414-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}