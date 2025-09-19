import { useDisponibilidad } from "../../context/disponibilidadContext";
import { formatDate, tiposServicios, formatLocalDateTime } from "@config";
import { ReservaHabitacion } from "./ReservaHabitacion";
import { ReservaVehiculo } from "./ReservaVehiculo";
import { Percent, DollarSign, Coins, X } from "lucide-react";
import { useReservar } from "../hooks/useCrearReserva";
import { useReserva } from "../hooks/useReserva";
import { Alert } from "@Alert";
import { Error } from "@Error";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@authContext";

export const ReservaCard = ({ servicio, handleClose, sucursales }) => {
    const { range, cantAdultos, cantNinos, cantHabitaciones, lugarInicio, lugarDevolucion, setLugarDevolucion, setHoraInicio, setHoraDevolucion, horaInicio, horaDevolucion } = useDisponibilidad();
    const entrada = formatDate(range[0].startDate, "entrada");
    const salida = formatDate(range[0].endDate, "salida");
    
    const { crearReserva, loading, error } = useReservar();
    const { noches, total, iva, TotalConIVA, startDate, endDate } = useReserva({servicio, startDate:range[0].startDate, endDate:range[0].endDate});
    const navigate = useNavigate();

    const irADetalle = () => {
        navigate("/MiTour/");
    };
    const { token } = useContext(AuthContext);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (noches < 1) {
        return (
            <Alert>Para reservar debe seleccionar un rango de fechas.</Alert>
        )
    } else if (startDate < today) {
        return (
            <Alert>Fechas no válidas para reservar.</Alert>
        )
    }; 
    if ((lugarInicio === "Sucursal" || lugarInicio === "")&& servicio.tipo_servicio === "V") {
        return (
          <Alert>Para reservar debe seleccionar una sucursal.</Alert>
        )
    }

    const formatISODate = (date) => date.toISOString();

    const buildReservaPayload = () => {
        if (servicio.tipo_servicio === "H") {
            // Reserva de habitación
            return {
                fecha_hora_llegada: formatISODate(startDate),
                fecha_hora_salida: formatISODate(endDate),
                servicio_id: servicio.id, 
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
                servicio_id: servicio.id,
                total: total,
                iva: iva,
                total_con_iva: TotalConIVA,
            };
        } else if (servicio.tipo_servicio === "V") {
            // Reserva de vehiculo
            return {
                fecha_hora_recogida: formatLocalDateTime(startDate, horaInicio),
                fecha_hora_entrega: formatLocalDateTime(endDate, horaDevolucion),
                lugar_recogida: lugarInicio,
                lugar_devolucion: lugarDevolucion,
                servicio_id: servicio.id,
                total: TotalConIVA,
            }
        }
    };

    return (
            <div onClick={(e) => e.stopPropagation()} className="z-70 flex flex-wrap md:gap-4 gap-2 w-fit  p-1 md:p-4 md:border rounded-xl border-gray-200 bg-white/95 text-zinc-800">
                <button
                    className="md:hidden  right-4 text-zinc-700 px-1 py-1 absolute rounded-full cursor-pointer"
                    onClick={handleClose}
                >
                    <X className="w-8 h-8"/> 
                </button>  
            {(servicio.tipo_servicio === "H")?
                <ReservaHabitacion cantAdultos={cantAdultos} cantHabitaciones={cantHabitaciones} cantNinos={cantNinos} servicio={servicio} entrada={entrada} salida={salida} noches={noches}/>
            :
                <ReservaVehiculo servicio={servicio} 
                    setLugarDevolucion={setLugarDevolucion} 
                    setHoraDevolucion={setHoraDevolucion} setHoraInicio={setHoraInicio}
                    sucursales={sucursales}
                    reserva={{
                        entrada,
                        salida,
                        cantVehiculos:cantHabitaciones,
                        dias:noches,
                        horaDevolucion,
                        horaInicio,
                        lugarDevolucion,
                        lugarInicio,}}
                />
            }
            <div className="flex-shrink flex-1 md:p-4 p-2 md:border min-w-90 gap-4 border-gray-200 flex flex-col rounded-lg justify-between">
                <div className="flex gap-3 flex-col">
                    <div className="border-b border-gray-300 p-2 px-4 md:text-2xl text-xl bg-gray-200/60 rounded-t font-semibold text-gray-800/95 flex justify-between">
                        {(servicio.tipo_servicio === "V")?
                            <p>{(noches > 1)?"Días":"Día"} ({noches})</p>:<p>{(noches > 1)?"Noches":"Noche"} ({noches})</p>}
                        <p>
                            C$ {total}
                        </p>
                    </div>
                    <div className="text-zinc-800 flex flex-col gap-4 p-4 border border-gray-200 rounded">
                        <p className="text-lg border-b border-gray-200 pb-2 lg:text-center">Información sobre el precio final</p>
                        <div>
                            {(servicio.tipo_servicio === "H")?
                                <div className="flex gap-1 items-center justify-between">
                                    <div className="flex gap-1 items-center">
                                        <Coins className="w-6 h-4 text-indigo-600" />
                                        <p>Precio por noche</p>
                                    </div>
                                        <p>C$ {servicio.precio}</p>
                                </div>
                                :
                                <div className="flex gap-1 items-center justify-between">
                                    <div className="flex gap-1 items-center">
                                        <Coins className="w-6 h-4 text-indigo-600" />
                                        <p>Precio por día</p>   
                                    </div>
                                    <p>C$ {servicio.precio}</p>
                                </div>    
                                }
                            <div className="flex gap-1 items-center mt-2 justify-between">
                                <div className="flex gap-1 items-center">
                                    <Percent className="w-6 h-4 text-yellow-600" />
                                    <p>IVA</p>
                                </div>
                                <p>C$ {iva}</p>
                            </div>
                            <div className="flex gap-1 items-center mt-5 font-bold justify-between">
                                <div className="flex gap-1 items-center">
                                    <DollarSign className="w-6 h-4 text-emerald-600" />
                                    <p>Total</p>
                                </div>
                                <p>C$ {TotalConIVA}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="self-end w-fit h-fit bg-gradient-to-r hover:from-blue-400 hover:to-yellow-200 p-[2px] rounded-full shadow-md hover:shadow-xl transition-all duration-300 bg-blue-500">
                    <button 
                        className="bg-blue-500 py-3 px-4 rounded-full cursor-pointer text-white/95 font-bold tracking-tight"
                        onClick={() => {
                            if (token){
                                const payload = buildReservaPayload();
                                crearReserva(payload, tiposServicios[servicio.tipo_servicio]);
                                irADetalle();
                                return;
                            }
                            navigate("/login")
                          }} 
                     >{(!loading)?"Agregar a mi Tour":"Agregando..."}</button>
                </div>
                {!token && (
                    <Alert size="sm">Para agregar servicios a tu Tour tienes que iniciar sesión</Alert>
                )}
                {error && (
                    <Error>{error}</Error>
                )}

            </div>
        </div>
    );
};  