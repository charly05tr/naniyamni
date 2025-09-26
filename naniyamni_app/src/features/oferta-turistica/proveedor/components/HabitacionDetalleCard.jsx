import { quitarSegundos }  from "@config";
import { useState, useEffect } from "react";
import { FaUser, FaCheck, FaTimes, FaCalendarAlt, FaDollarSign, FaRegImage, FaStar } from "react-icons/fa";
import { X } from "lucide-react";

const tipoHabitacion = {
    "D": "Double",
    "S": "Single",
    "SU": "Suite"
}

export const HabitacionDetalle = ({ habitacion, handleClose }) => {
  const [imagenPrincipal, setImagenPrincipal] = useState(null);

  useEffect(() => {
    // Establece la primera imagen como principal al cargar el componente
    if (habitacion?.imagenes?.length > 0) {
      setImagenPrincipal(habitacion.imagenes[0]);
    } else {
      setImagenPrincipal(null); // Limpia si no hay imágenes
    }

    if (habitacion) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [habitacion]);

  if (!habitacion) return null;

  const {
    nombre,
    descripcion,
    capacidad,
    caracteristicas_data,
    precio,
    hora_check_in,
    hora_check_out,
    imagenes,
    tipo,
  } = habitacion;

  return (
    <div className="bg-[#F9FAFB]/90 dark:bg-[#181818] rounded-xl shadow-2xl overflow-hidden max-w-6xl mx-auto my-8 animate-slideUp">
        <div className="flex w-full items-end justify-end">
            <button
                className="md:hidden  dark:text-#F9FAFB]/90 px-1 py-1 self-end rounded-full cursor-pointer"
                onClick={handleClose}
            >
                <X className="w-8 h-8"/> 
            </button>  
        </div>
      <div className="flex flex-col md:flex-row h-full">
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div> 
            <div className="flex items-center gap-2 dark:text-[#F9FAFB]/90 mb-2">
              <FaStar size={20} />
              <span className="font-semibold text-xl">{tipoHabitacion[tipo]}</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">{nombre}</h2>
            <p className="text-gray-600 dark:text-[#F9FAFB]/90 mb-6">{descripcion}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <FaUser className="text-[#007bff]/70" />
                <span>Capacidad: {capacidad} personas</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <FaDollarSign className="text-[#007bff]/70" />
                <span>Precio: ${precio}</span>
              </div>
              {hora_check_in && (
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <FaCalendarAlt className="text-[#007bff]/70" />
                  <span>Check-in: {quitarSegundos(hora_check_in)}</span>
                </div>
              )}
              {hora_check_out && (
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <FaCalendarAlt className="text-[#007bff]/70" />
                  <span>Check-out: {quitarSegundos(hora_check_out)}</span>
                </div>
              )}
            </div>
          </div>
          
          {caracteristicas_data && caracteristicas_data.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-[#F9FAFB]">Amenidades</h3>
              <div className="flex flex-wrap gap-5">
                {caracteristicas_data.map((c) => (
                  <div key={c.id} className="flex items-center gap-2 text-gray-600 dark:text-[#F9FAFB]/80">
                    <FaCheck className="text-green-300" />
                    <span>{c.nombre}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="md:w-1/2 p-4  bg-gray-50 dark:bg-[#181818] flex flex-col gap-4">
          
          <div className="w-full flex-shrink-0">
            {imagenPrincipal ? (
              <img
                src={imagenPrincipal.image_url}
                alt={imagenPrincipal.title}
                className="w-full h-80 object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-80 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg">
                <FaRegImage size={64} className="text-gray-500" />
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-3 gap-2 overflow-y-auto">
            {imagenes.length > 0 ? (
              imagenes.map((img, index) => (
                <img
                  key={index}
                  src={img.image_url}
                  alt={img.title}
                  onClick={() => setImagenPrincipal(img)}
                  className={`w-full h-24 object-cover rounded-lg cursor-pointer transition-all duration-300 
                    ${imagenPrincipal?.image_url === img.image_url ? 'ring-2 ring-teal-500' : 'hover:opacity-80'}`}
                />
              ))
            ) : (
              <div className="col-span-3 text-center text-sm text-gray-500">
                No hay imágenes disponibles.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};