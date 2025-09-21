import { GaleriaImagenes } from "./GaleriaImagenes";
import { useState, useEffect } from "react";
import { ReservaCard } from "./ReservaCard";
import { Sliders, Users, Tag  } from "lucide-react";

export const ServicioCard = ({ servicios, tipo, sucursales }) => {

    const tipoHabitacion = {
        "D": "Double",
        "S": "Single",
        "SU": "Suite"
    }

    const tipoTransmision = {
        "M": "Mecánica",
        "A": "Automática",
        "E": "Eléctrica"
    }

    const [ReservaCardOpen, setReservaCardOpen] = useState(null);
    const [servicioReserva, setServicioReserva] = useState(null);
    const handleReserva = (servicio) => {
        setReservaCardOpen(servicio);
        setServicioReserva(servicio);
    } 
    useEffect(() => {
      if (ReservaCardOpen) {
        // Desactiva scroll del fondo
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
  
      // Limpieza cuando el componente se desmonta
      return () => {
        document.body.style.overflow = "auto";
      };
    }, [ReservaCardOpen]);

    const handleClose = () => {
        setReservaCardOpen(null);
    }

    return (
        <>
  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-zinc-800 ">
    {servicios?.map(servicio => (
      <div key={servicio.id} className="bg-white p-4 border border-gray-200 rounded-2xl  transition-transform transform  shadow-sm  duration-200 flex flex-col hover:shadow-xl">
        <div className="flex justify-between items-start gap-4 mb-2">
          <h2 className=" text-xl md:text-2xl font-semibold text-gray-800 flex-1">{servicio.nombre}</h2>
          <div className="w-fit h-fit bg-gradient-to-r hover:from-blue-400 hover:to-yellow-200 p-[2px] rounded-full shadow-md hover:shadow-xl transition-all duration-300 bg-blue-500">
            <button
              onClick={() => handleReserva(servicio)}
              className="bg-blue-500 py-2 px-5 rounded-full cursor-pointer text-white/95 font-bold tracking-tight"
            >
              Reservar
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col text-gray-900 items-start bg-blue-50/50 p-5 rounded-xl">
          {(tipo === "H" || tipo === "OF" || tipo === "CH") && (
            <>
              <div className="flex gap-2 mb-4 text-2xl font-bold text-gray-700">
                <p>C$</p>
                <p>{servicio.precio}</p>
              </div>
              <div className="mb-2 text-sm text-gray-600 flex gap-1 items-center"><Tag className="w-6 h-6 text-blue-300" /> {tipoHabitacion[servicio.tipo]}</div>
              <div className="mb-2 text-sm text-gray-600 flex gap-2 items-center"><Users className="w-6 h-6 text-blue-300" />{servicio.capacidad}</div>
            </>
          )}
          {(tipo === "AV") && (
            <>
              <div className="flex gap-2 mb-4 text-2xl font-bold text-gray-700">
                <p>C$</p>
                <p>{servicio.precio}</p>
              </div>
              <p className="mb-4  text-gray-600"><strong className="text-gray-800">{servicio.marca} {servicio.modelo}</strong> o similares</p>
              <div className="mb-2 text-sm text-gray-600 flex gap-2 items-center"><Sliders className="w-6 h-6 text-blue-300" />{tipoTransmision[servicio.transmision]}</div>
              <div className="mb-2 text-sm text-gray-600 flex gap-2 items-center"><Users className="w-6 h-6 text-blue-300" />{servicio.cant_asientos}</div>
            </>
          )}
        </div>
            <GaleriaImagenes imagenes={servicio?.imagenes} className="my-4"/>
        {/* <div className="my-2 mt-2 flex flex-wrap gap-2  max-h-18 scrollbar-hide overflow-y-hidden">
          {/* {servicio?.caracteristicas.sort((a,b)=> a.nombre.length - b.nombre.length).map(caracteristica => (
            <span 
              className="flex items-center gap-1 py-1.5 px-3 rounded-full border border-gray-300 bg-gray-100 text-gray-700 text-xs font-medium" 
              key={caracteristica.id}
            >
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              {caracteristica.nombre}
            </span>
          ))} */}
      </div>
    ))}
  </div>

  {(ReservaCardOpen) && (
    <div onClick={handleClose} className="fixed inset-0 backdrop-blur-sm bg-black/60 flex items-center justify-center z-50">
        <button
          className="absolute top-4 right-4 text-white hidden md:block"
          onClick={handleClose}
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      <div onClick={(e) => e.stopPropagation()} className="bg-white md:rounded-xl md:m-2 shadow-2xl m-2 md:max-h-[80dvh] max-h-[100dvh] w-full md:w-fit overflow-y-auto  overflow-x-clip">
        <ReservaCard servicio={servicioReserva} handleClose={handleClose} sucursales={sucursales}/>
      </div>
    </div>
  )}
</>
    );
}