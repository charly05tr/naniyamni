import { FaBus, FaMapMarkerAlt } from 'react-icons/fa';
import { ReservaTransporte } from './ReservaTransporte';
import { useTransporteCard } from '../hooks/useTransporteCard';
import { convertirHora } from '@config';

export const TransporteCard = ({ servicio }) => {
    
    const {
        nombre,
        precio,
        origen,
        destinos,
        itinerarios,
        imagenes,
        asientos_disponibles,
    } = servicio;
    
    const { selectedDate, selectedHour, selectedHourIndex, 
            handleDateSelect, handleClose, availableHours,
            setSelectedDHourIndex, setSelectedHour, handleOpen,
            ReservaCardOpen, 
    } = useTransporteCard(itinerarios);

    const formatTime = (time) => time.slice(0, 5);

    const imageUrl =
        imagenes.length > 0
        ? imagenes[0].image_url
        : 'https://via.placeholder.com/600x400.png?text=Imagen+no+disponible';
    
    servicio.destinos = [...destinos].sort((a, b) => {
        const [hA, mA] = a.duracion.split(':').map(Number);
        const [hB, mB] = b.duracion.split(':').map(Number);
        return hA * 60 + mA - (hB * 60 + mB);
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (
        <>
        <div className="bg-white rounded-2xl shadow-md overflow-hidden max-w-2xl mx-auto p-6 transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="relative">
                <img
                className="rounded-xl object-cover w-full h-64"
                src={imageUrl}
                alt={`Imagen de ${nombre}`}
                />
            </div>
            <div className="mt-6 space-y-4">
                <div className='flex gap-2 justify-between'>
                    <h2 className="text-3xl font-bold text-gray-900">{nombre}</h2>
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
                    <p className="text-sm font-semibold text-gray-700">
                        Asientos disponibles:{' '}
                        <span className="font-bold text-gray-700">{asientos_disponibles}</span>
                    </p>
                </div>                              
                <div className="flex items-center justify-between text-lg font-medium text-gray-900 border-t pt-4 border-gray-100">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-gray-500">Origen:</span>
                        <span className='font-bold text-gray-900/90'>{origen}</span>
                    </div>
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-gray-500">Precio:</span>
                    <span className='font-bold text-gray-900/90'>C$ {parseFloat(precio).toFixed(2)}</span>
                </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-4 border-gray-100">
                    <div className="space-y-4">
                        <h3 className="text-base font-semibold text-gray-700">Ruta del viaje:</h3>
                        <div className="relative pl-6">
                            <div className="absolute left-1.5 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                            <div className="relative flex items-center mb-4">
                                <FaBus className="absolute -left-3.5 text-blue-500 bg-white rounded-full p-1 text-2xl z-10 shadow" />
                                <div className="ml-4">
                                    <p className="font-semibold text-gray-800">Origen</p>
                                    <p className="text-sm text-gray-600">{origen}</p>
                                </div>
                            </div>
                            {servicio?.destinos.map((destino, index) => (
                                <div
                                    key={index}
                                    className="relative flex items-center mb-4 last:mb-0 hover:bg-gray-50 rounded-md p-2 transition-colors duration-200"
                                >
                                    <FaMapMarkerAlt className="absolute -left-3.5 text-gray-500 bg-white rounded-full p-1 text-2xl z-10 shadow" />
                                    <div className="ml-4">
                                        <p className="font-semibold text-gray-800">{destino.nombre}</p>
                                        <p className="text-sm text-gray-600">
                                            Duración: {destino.duracion.slice(0, 5)} hora(s)
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-base font-semibold text-gray-700">Selecciona una fecha:</h3>
                        <input
                            type="date"
                            className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onChange={handleDateSelect}
                        />
                        {selectedDate && (
                        <div className="mt-4 border-t pt-4 border-gray-100">
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">
                            Horarios para el{' '}
                            {selectedDate.toLocaleDateString('es-ES', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                            })}
                            </h4>
                            {availableHours.length > 0 && selectedDate >= today ? (
                            <div className="flex flex-wrap gap-2">
                                {availableHours.map((hora, index) => (
                                <span
                                    onClick={() => {setSelectedHour(formatTime(hora.hora)); setSelectedDHourIndex(index)}}
                                    key={index}
                                    className={`py-1 px-3 text-gray-800 text-sm rounded-lg font-semibold cursor-pointer transition-colors ${(selectedHourIndex === index)?"bg-green-600 hover:bg-green-700/80 text-white/95":"bg-gray-200 hover:bg-gray-300/80"}`}
                                >
                                    {convertirHora(formatTime(hora.hora))} 
                                </span>
                                ))}
                            </div>
                            ) : (
                            <p className="text-sm text-gray-500">
                                No hay horarios disponibles para este día.
                            </p>
                            )}
                        </div>
                        )}
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
                <ReservaTransporte servicio={servicio} fechaSalida={selectedDate} horaSalida={selectedHour} handleClose={handleClose}/>
            </div>
        </div>
        )}
        </>
    );
};
