import { useAtraccionCard } from "../hooks/useAtraccionCard";
import { convertirHora, formatDateOld } from "@config";
import { ReservaAtraccion } from "./ReservaAtraccion";
import { Alert } from "@Alert";
import { quitarSegundos } from "@config";

export const AtraccionCard = ({ servicio }) => {
    const {
        nombre,
        precio,
        dias_abierto,
        duracion,
        imagenes,
        disponible,
        hora_cierre,
        hora_apertura,
        total_reservas
    } = servicio;

    const { selectedDate, 
            handleDateSelect, handleClose,
            handleOpen,
            ReservaCardOpen, noPuedeReservar
    } = useAtraccionCard(dias_abierto);

    if (!disponible) return null;



    const imageUrl =
        imagenes.length > 0
        ? imagenes[0].image_url
        : 'https://via.placeholder.com/600x400.png?text=Imagen+no+disponible';

    const payloadRerserva = () => {
        return {
            servicio: servicio,
            fecha_llegada: formatDateOld(selectedDate)
        }
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (
        <>
        <div className="rounded-2xl shadow-md overflow-hidden w-[92dvw] md:max-w-3xl md:p-6 py-1 transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 md:min-w-2xl">
            <div className="relative">
                <img
                className="rounded-xl object-cover w-full h-64"
                src={imageUrl}
                alt={`Imagen de ${nombre}`}
                />
            </div>
            <div className="mt-6 space-y-4">
                <div className='flex gap-6 justify-between'>
                    <h2 className="lg:text-3xl md:text-2xl text-xl font-bold text-gray-900 dark:text-[#F9FAFB]">{nombre}</h2>
                    <div className="w-fit h-fit bg-gradient-to-r hover:from-[#2CA6A4] dark:bg-[#F9FAFB] hover:to-[#F4B731] p-[2px] rounded-full shadow-md hover:shadow-xl transition-all duration-300 bg-[#2CA6A4]">
                        <button
                            onClick={handleOpen}
                            className="bg-[#2CA6A4]/90 dark:bg-[#F9FAFB] dark:text-[#181818] py-2 px-5 rounded-full cursor-pointer text-white/95 font-bold tracking-tight"
                        >
                            Reservar
                        </button>
                    </div>
                </div>
                <div className="">
                    <p className="text-sm font-semibold text-gray-500 dark:text-[#F9FAFB]/70">
                        Abrimos:{' '}
                        <span className="font-bold text-gray-900/90 dark:text-[#F9FAFB]">{dias_abierto}</span>
                    </p>
                </div>                           
                <div className="">
                    <p className="text-sm font-semibold text-gray-500 dark:text-[#F9FAFB]/70">
                        De{' '}
                        <span className="font-bold text-gray-900/90 dark:text-[#F9FAFB]">{convertirHora(hora_apertura)}</span> hasta{' '}
                        <span className="font-bold text-gray-900/90 dark:text-[#F9FAFB]">{convertirHora(hora_cierre)}</span>
                    </p>
                </div>    
                <div className="flex items-center flex-wrap gap-2 justify-between text-lg font-medium text-gray-900 border-t pt-4 border-gray-100 dark:border-[#AAAAAA]/50">
                    <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-gray-500 dark:text-[#F9FAFB]/70">Duración reserva:</span>
                        <span className="text-gray-900/90 font-semibold text-nowrap dark:text-[#F9FAFB]">{(duracion === "23:30:00")?"Todo el día":`${quitarSegundos(duracion)} hrs`}</span>
                    </div>
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-gray-500 dark:text-[#F9FAFB]/70">Precio:</span>
                    <span className="text-gray-900/90 font-semibold dark:text-[#F9FAFB]">C$ {parseFloat(precio).toFixed(2)}</span>
                </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-4 border-gray-100 dark:border-[#AAAAAA]/50">
                    <div className="space-y-4">
                        <h3 className="text-base font-semibold text-gray-700 dark:text-[#F9FAFB]/70">Selecciona una fecha:</h3>
                        <input
                            type="date"
                            className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 dark:text-[#F9FAFB]/90 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={handleDateSelect}
                        />
                    </div>
                </div>
            </div>
        </div>
        {(ReservaCardOpen) && (
        <div onClick={handleClose} className="fixed inset-0 backdrop-blur-sm bg-[#181818]/90 flex items-center justify-center z-50">
            <button
                className="absolute top-4 right-4 text-white hidden md:block"
                onClick={handleClose}
            >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            </button>
            <div onClick={(e) => e.stopPropagation()} className=" bg-[#181818]/90 md:rounded-xl m-2 shadow-2xl md:max-h-[80dvh] max-h-[100dvh] w-full md:w-fit overflow-y-auto  overflow-x-clip dark:border-[#AAAAAA]/5 dark:border">
            {(selectedDate <  today) ?
                <Alert>Seleccione una fecha válida.</Alert>:
                <ReservaAtraccion reserva={payloadRerserva()}  handleClose={handleClose} noPuedeReservar={noPuedeReservar}/>}
            </div>
        </div>
        )}
        </>
    );
}