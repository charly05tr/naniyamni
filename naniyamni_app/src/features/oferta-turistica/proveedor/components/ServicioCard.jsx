import { Title } from "@TextStyled";
import { GaleriaImagenes } from "./GaleriaImagenes";
import { useState } from "react";
import { ReservaCard } from "./ReservaCard";
import { X } from "lucide-react";
import { Check } from "lucide-react";

export const ServicioCard = ({ servicios, tipo, reglas }) => {

    const tipoHabitacion = {
        "D": "Double",
        "S": "Single",
        "SU": "Suite"
    }

    const tipoTransmision = {
        "M": "Mecánica",
        "A": "Automática",
        "E": "Eléctric"
    }

    const [ReservaCardOpen, setReservaCardOpen] = useState(null);
    const [servicioReserva, setServicioReserva] = useState(null);
    const handleReserva = (servicio) => {
        setReservaCardOpen(servicio);
        setServicioReserva(servicio);
    } 
    
    const handleClose = () => {
        setReservaCardOpen(null);
    }

    return (
        <>
        <div className="md:columns-1 lg:columns-2 h-full text-zinc-800">
            {servicios?.map(servicio => (
                <div key={servicio.id} className="bg-white p-4 md:mb-4 mb-2 border rounded-xl border-gray-200  h-full break-inside-avoid">
                    <div className="flex justify-between items-start gap-2">
                        <Title text={servicio.nombre}/>
                        <div className="w-fit h-fit bg-gradient-to-r shadow-yellow-100 shadow-sm rounded-sm border-none p-[1.5px] hover:from-blue-400 hover:to-yellow-200">
                            <button onClick={() => handleReserva(servicio)} className="bg-blue-300 p-2 rounded tracking-wide cursor-pointer text-black text-lg">Reservar</button>
                        </div>
                    </div>
                    {/* <p className="tracking-wide text-md pt-2">{servicio.descripcion}</p>    */}
                    <div className="w-full flex flex-col text-gray-900 items-start bg-gradient-to-br from-blue-400/20 to-blue-100/20 mb-2 mt-2 p-4 rounded">
                        {(tipo === "H" || tipo === "OF" || tipo === "CH") && (
                            <>
                                <div className="flex gap-2 mb-5 text-xl border-b border-gray-300 pb-1"><strong className="text-nowrap">Precio por noche: </strong> <p> NIO </p> {servicio.precio}</div>
                                <p className="mb-2"><strong>Tipo: </strong>{tipoHabitacion[servicio.tipo]}</p>
                                <p className="mb-2"><strong>Capacidad: </strong>{servicio.capacidad} personas</p>
                            </>
                        )}
                        {(tipo === "AV") && (
                            <>
                                <p className="mb-5 text-xl border-b border-gray-300 pb-1"><strong>Precio por día:</strong> NIO {servicio.precio}</p>
                                <div className="flex gap-1 items-end">
                                    <strong className="mb-2 text-xl"> {servicio.marca} {servicio.modelo}</strong>
                                    <p className="mb-2">o similares</p>
                                </div>
                                <p className="mb-2"><strong>Transmisión:</strong> {tipoTransmision[servicio.transmision]}</p>
                                <p className="mb-2"><strong>Asientos:</strong> {servicio.cant_asientos}</p>
                            </>
                        )}
                    </div>
                    <GaleriaImagenes imagenes={servicio?.imagenes}/>
                    <div className="my-2 flex items-center overflow-x-hidden flex-wrap max-h-23 scrollbar-hide gap-2">{servicio?.caracteristicas.sort((a,b)=> b.length -a.length).map(caracteristica => (
                        <span className="flex items-center gap-1 py-2 px-4 rounded-full border border-gray-500 hover:bg-blue-50 h-fit text-nowrap" key={caracteristica.id}><Check className="w-4 h-5 text-green-600" /> {caracteristica.nombre}</span>
                    ))}
                    </div>
                </div>
            ))}
        </div>
        {(ReservaCardOpen) &&
            (
                <div  onClick={handleClose} className="overflow-y-scroll scrollbar-hide fixed inset-0 backdrop-blur-sm bg-black/60 flex items-center justify-center z-50">
                    <button
                        className="md:absolute md:block top-4 right-4 text-white px-1 py-1 hidden rounded-full cursor-pointer"
                        onClick={handleClose}
                    >
                        <X className="w-8 h-8"/> 
                    </button>     
                    <ReservaCard servicio={servicioReserva} reglas={reglas} handleClose={handleClose}/>
                </div>
                )}
        </>
    );
}