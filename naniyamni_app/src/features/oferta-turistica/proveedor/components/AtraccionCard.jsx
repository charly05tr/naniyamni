import { useAtraccionCard } from "../hooks/useAtraccionCard";
import { convertirHora } from "@config";
import { ReservaAtraccion } from "./ReservaAtraccion";

export const AtraccionCard = ({ servicio }) => {
    const {
        nombre,
        precio,
        dias_abierto,
        duracion,
        imagenes,
        // cupo_maximo,
        hora_cierre,
        hora_apertura,
    } = servicio;
        
    const { selectedDate, 
            handleDateSelect, handleClose,
            handleOpen,
            ReservaCardOpen, noPuedeReservar
    } = useAtraccionCard(dias_abierto,);

    const imageUrl =
        imagenes.length > 0
        ? imagenes[0].image_url
        : 'https://via.placeholder.com/600x400.png?text=Imagen+no+disponible';

    return (
        <>
        <div className="bg-white rounded-2xl shadow-md overflow-hidden max-w-3xl p-6 transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="relative">
                <img
                className="rounded-xl object-cover w-full h-64"
                src={imageUrl}
                alt={`Imagen de ${nombre}`}
                />
            </div>
            <div className="mt-6 space-y-4">
                <div className='flex gap-6 justify-around'>
                    <h2 className="lg:text-3xl md:text-2xl text-xl font-bold text-gray-900">{nombre}</h2>
                    <div className="w-fit h-fit bg-gradient-to-r hover:from-blue-400 hover:to-yellow-200 p-[2px] rounded-full shadow-md hover:shadow-xl transition-all duration-300 bg-blue-500">
                        <button
                            onClick={handleOpen}
                            className="bg-blue-500 py-2 px-5 rounded-full cursor-pointer text-white/95 font-bold tracking-tight"
                        >
                            Reservar
                        </button>
                    </div>
                </div>
                <div className="">
                    <p className="text-sm font-semibold text-gray-500">
                        Abrimos:{' '}
                        <span className="font-bold text-gray-900/90">{dias_abierto}</span>
                    </p>
                </div>                           
                <div className="">
                    <p className="text-sm font-semibold text-gray-500">
                        De{' '}
                        <span className="font-bold text-gray-900/90">{convertirHora(hora_apertura)}</span> hasta{' '}
                        <span className="font-bold text-gray-900/90">{convertirHora(hora_cierre)}</span>
                    </p>
                </div>    
                <div className="flex items-center flex-wrap gap-2 justify-between text-lg font-medium text-gray-900 border-t pt-4 border-gray-100">
                    <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-gray-500">Duración estadía:</span>
                        <span className="text-gray-900/90 font-semibold text-nowrap">{(duracion === "23:30:00")?"Todo el día":`${duracion} hrs`}</span>
                    </div>
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-gray-500">Precio:</span>
                    <span className="text-gray-900/90 font-semibold">C$ {parseFloat(precio).toFixed(2)}</span>
                </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-4 border-gray-100">
                    <div className="space-y-4">
                        <h3 className="text-base font-semibold text-gray-700">Selecciona una fecha:</h3>
                        <input
                            type="date"
                            className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={handleDateSelect}
                        />
                    </div>
                </div>
            </div>
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
            <div onClick={(e) => e.stopPropagation()} className=" bg-white md:rounded-xl m-2 shadow-2xl md:max-h-[80dvh] max-h-[100dvh] w-full md:w-fit overflow-y-auto  overflow-x-clip">
                <ReservaAtraccion servicio={servicio} fecha_llegada={selectedDate}  handleClose={handleClose} noPuedeReservar={noPuedeReservar}/>
            </div>
        </div>
        )}
        </>
    );
}