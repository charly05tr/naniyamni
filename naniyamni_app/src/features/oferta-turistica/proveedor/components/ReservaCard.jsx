import { differenceInDays } from "date-fns";
import { useDisponibilidad } from "../../context/disponibilidadContext";
import { formatDate, tiposServicios } from "@config";
import { useState, useEffect } from "react";
import { ReservaHabitacion } from "./ReservaHabitacion";
import { ReservaVehiculo } from "./ReservaVehiculo";
import { Percent, DollarSign, Coins, X } from "lucide-react";
import { useReservar } from "../hooks/useCrearReserva";

export const ReservaCard = ({servicio, handleClose}) => {
    const { range, cantAdultos, cantNinos, cantHabitaciones } = useDisponibilidad();
    const [total, setTotal] = useState(0);
    const [iva, setIva] = useState(0);
    const [TotalConIVA, setTotalConIVA] = useState(0);
    const entrada = formatDate(range[0].startDate, "entrada");
    const salida = formatDate(range[0].endDate, "salida");
    const startDate = range[0].startDate;
    const endDate = range[0].endDate;
    const noches = differenceInDays(endDate, startDate) || 0;
    
    const { crearReserva, loading, error } = useReservar();
    useEffect(() => {
        setTotal(noches * servicio.precio);
    }, [noches, servicio]);

    useEffect(() => {
        setIva((total * 0.15).toFixed(2));
    },[total]);

    useEffect(() => {
        setTotalConIVA((total + iva * 1).toFixed(2));
    },[total, iva]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (noches < 1) {
        return (
            <div className="flex flex-col mx-4 md:p-18 p-10 md:text-xl bg-white/90 rounded-xl text-center tracking-wid text-zinc-800">
                    ⚠ Para reservar tiene que seleccionar un rango de fechas.
            </div>
        )
    }
    else if (startDate < today) {
        return (
            <div className="mx-4 p-18 text-2xl bg-white/90 rounded text-center tracking-wide text-zinc-800">
                ⚠ No puedes reservar en esas fechas.
            </div>
        )
    }

    const formatISODate = (date) => date.toISOString();

    const buildReservaPayload = () => {
        if (servicio.tipo_servicio === "H") {
            // Reserva de habitación
            return {
                fecha_hora_llegada: formatISODate(startDate),
                fecha_hora_salida: formatISODate(endDate),
                servicio_id: servicio.id, // ID de la habitación
                cant_adultos: cantAdultos,
                cant_ninos: cantNinos,
                cant_habitaciones: cantHabitaciones,
                noches: noches,
                total: TotalConIVA,
            };
        } else if (servicio.tipo_servicio === "A") {
            // Reserva de atracción
            return {
                duracion_minutos: noches * 60 * 24, 
                cant_personas: cantAdultos + cantNinos,
                servicio: servicio.id, // ID de la atracción
                total: total,
                iva: iva,
                total_con_iva: TotalConIVA,
            };
        }
    };

    return (
            <div onClick={(e) => e.stopPropagation()} className="z-70 flex flex-wrap md:gap-4 gap-2 w-fit m-2 p-1 md:p-4 border rounded-xl border-gray-200 bg-white/95 text-zinc-700">
                <button
                    className="md:hidden  right-4 text-zinc-700 px-1 py-1 absolute rounded-full cursor-pointer"
                    onClick={handleClose}
                >
                    <X className="w-8 h-8"/> 
                </button>  
            {(servicio.tipo_servicio === "H")?
                <ReservaHabitacion cantAdultos={cantAdultos} cantHabitaciones={cantHabitaciones} cantNinos={cantNinos} servicio={servicio} entrada={entrada} salida={salida} noches={noches}/>
            :
                <ReservaVehiculo servicio={servicio} entrada={entrada} salida={salida} dias={noches} cantVehiculos={cantHabitaciones} />
            }
            <div className="flex-shrink flex-1 md:p-4 p-2 border min-w-90 gap-4 border-gray-200 flex flex-col rounded-lg justify-between">
                <div className="flex gap-4 flex-col">
                    <p className="border-b border-gray-400 p-2 pt-1 md:text-2xl lg:text-3 xl text-xl bg-green-50 rounded-t font-semibold">Precio: NIO {total}</p>
                    <div className="flex flex-col gap-4 p-4 border border-gray-200">
                        <p className="text-lg border-b border-gray-200 pb-2">Información sobre el precio final</p>
                        <div>
                            <div className="flex gap-1 items-center">
                                <Coins className="w-6 h-4 text-indigo-600" />
                                {(servicio.tipo_servicio === "H")?
                                    <p>Precio por noche: NIO {servicio.precio}</p>
                                :
                                    <p>Precio por día: NIO {servicio.precio}</p>   
                                }
                            </div>
                            <div className="flex gap-1 items-center mt-2">
                                <Percent className="w-6 h-4 text-yellow-600" />
                                <p>IVA: NIO {iva}</p>
                            </div>
                            <div className="flex gap-1 items-center mt-5 font-semibold">
                                <DollarSign className="w-6 h-4 text-emerald-600" />
                                <p>Total: NIO {TotalConIVA}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-nowrap self-end w-fit h-fit bg-gradient-to-r rounded-sm border-none p-[1.5px] hover:from-blue-400 hover:to-yellow-200 shadow-yellow-100 shadow-sm">
                    <button 
                        className="bg-blue-300 p-2 rounded tracking-wide cursor-pointer text-black"
                        onClick={() => {
                            const payload = buildReservaPayload();
                            console.log("Payload listo:", payload);
                            crearReserva(payload, tiposServicios[servicio.tipo_servicio]);
                          }} 
                     >{(!loading)?"Agregar a mi Tour":"Agregando..."}</button>
                </div>
                     {error && <div className="p-4 text-center border border-red-600 rounded-sm text-red-900 w-full bg-red-300">{error}</div>}
            </div>
        </div>
    );
};


  