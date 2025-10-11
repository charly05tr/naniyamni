import { Alert } from "@Alert";
import { Error } from "@Error";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@authContext";
import { Percent, DollarSign, Coins, X } from "lucide-react";
import { useReserva } from "../hooks/useReserva";
import { tiposServicios, convertirHora } from "@config";

export const ReservaHabitacion = ({ reserva, crearReserva, loading, error, handleClose, inTour=false }) => {

    const { noches, total, iva, TotalConIVA, startDate, endDate } = useReserva({reserva, startDate:reserva.fechaInicio, endDate:reserva.fechaDevolucion });

    const buildReservaPayload = () => {
        const formatISODate = (date) => date.toISOString();

        return {
            fecha_hora_llegada: formatISODate(startDate),
            fecha_hora_salida: formatISODate(endDate),
            servicio_id: reserva.servicio.id, 
            cant_adultos: reserva.cantAdultos,
            cant_ninos: reserva.cantNinos,
            cant_habitaciones: reserva.cantHabitaciones,
            noches: noches,
            total: TotalConIVA,
        };
    };

    const navigate = useNavigate();

    const irADetalle = () => {
        navigate("/MiTour/");
        // window.location.reload();
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

    return (
        <div onClick={(e) => e.stopPropagation()} className="z-70 flex flex-wrap md:gap-4 gap-2 w-fit  p-1 md:p-4 md:border rounded-xl border-[#F4B731] bg-[#F9FAFB] text-zinc-800 dark:text-[#F9FAFB] dark:bg-[#181818] dark:border-[#AAAAAA]/5 md:w-fit max-w-220">
                <button
                    className="md:hidden  right-4 text-zinc-700 px-1 py-1 absolute rounded-full cursor-pointer"
                    onClick={handleClose}
                >
                    <X className="w-8 h-8"/> 
                </button>  
            <div className="text-zinc-800 flex flex-shrink flex-1 flex-col gap-2 md:border border-gray-300 md:p-4 p-2 rounded-lg w-fit md:min-w-100 min-w-90 dark:border-[#AAAAAA]/30 dark:text-[#F9FAFB]">
                <h1 className="text-3xl font-semibold tracking-wide my-2">Tu reserva</h1>
                <div className="flex gap-2 px-2 py-4 border border-gray-200 rounded dark:border-[#AAAAAA]/30">
                    <div className="flex flex-col gap-1 p-2 border-r pr-4 border-gray-300 dark:border-[#AAAAAA]/30">
                        <p className="text-sm">Entrada</p>
                        <strong>{reserva.entrada.split("\n")[0]}</strong>
                        <p>{convertirHora(reserva.servicio.hora_check_in)}</p>
                    </div>
                    <div className="flex flex-col gap-1 p-2">
                        <p className="text-sm">Salida</p>
                        <strong>{reserva.salida.split("\n")[0]}</strong>
                        <p>{convertirHora(reserva.servicio.hora_check_out)}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2 mt-2 p-4 border border-gray-200 rounded dark:border-[#AAAAAA]/30">
                    <p className="text-sm">Has seleccionado</p>
                    <strong className="flex gap-2 mb-3 flex-wrap">
                        {noches} {noches === 1 ? "noche, " : "noches, "}
                        {reserva.cantHabitaciones}{" "}
                        {reserva.cantHabitaciones === 1 ? "habitación " : "habitaciones "}
                        para {reserva.cantAdultos} {reserva.cantAdultos === 1 ? "adulto " : "adultos "}
                        {(reserva.cantNinos)?"y":""} {(reserva.cantNinos)?reserva.cantNinos:""} {(reserva.cantNinos)?(reserva.cantNinos> 1)?"niños":"niño":""}
                    </strong>
                    <p className="text-sm">1 x {reserva.servicio.nombre}</p>
                </div>
            </div>
            <div className="flex-shrink flex-1 md:p-4 p-2 md:border min-w-96 gap-4 border-gray-300 flex flex-col rounded-lg justify-between dark:border-[#AAAAAA]/30">
                <div className="flex gap-3 flex-col">
                    <div className="border-b border-gray-300 p-2 px-4 md:text-2xl text-xl bg-gray-200/60 rounded-t font-semibold text-gray-800/95 flex justify-between dark:text-[#F9FAFB] dark:border-[#AAAAAA]/30 dark:bg-[#AAAAAA]/10">
                            <p>{(noches > 1)?"Noches":"Noche"} ({noches})</p>
                        <p>
                            C$ {total}
                        </p>
                    </div>
                    <div className="text-zinc-800 flex flex-col gap-4 p-4 border border-gray-200 rounded dark:text-[#F9FAFB] dark:border-[#AAAAAA]/30">
                        <p className="text-lg border-b border-gray-200 pb-2 lg:text-center dark:border-[#AAAAAA]/30">Información sobre el precio final</p>
                        <div>
                            <div className="flex gap-1 items-center justify-between">
                                <div className="flex gap-1 items-center">
                                    <Coins className="w-6 h-4 text-indigo-600" />
                                    <p>Precio por noche</p>
                                </div>
                                    <p>C$ {reserva.servicio.precio}</p>
                            </div>
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
                {(!inTour) &&
                <div className="flex flex-col gap-2">
                    {!token && (
                        <Alert size="sm">Para agregar servicios a tu Tour tienes que iniciar sesión</Alert>
                    )}
                 <div className="self-end w-fit h-fit bg-gradient-to-r hover:from-[#2CA6A4]/50 hover:to-[#F4B731] p-[2px] rounded-full shadow-md hover:shadow-xl transition-all duration-300 bg-[#2CA6A4]">
                    <button 
                        className="bg-[#2CA6A4] py-3 px-4 rounded-full cursor-pointer text-white/95 font-bold tracking-tight"
                        onClick={async () => {
                            if (token) {
                              const payload = buildReservaPayload();
                              try {
                                await crearReserva(payload, tiposServicios[reserva.servicio.tipo_servicio]);
                                // si no lanza error, continuamos
                                irADetalle();
                              } catch (err) {
                                // Aquí se detiene si hay error
                                console.error("Error al crear reserva:", err);
                              }
                              return;
                            }
                            navigate("/login");
                        }}
                     >{(!loading)?"Agregar a mi Tour":"Agregando..."}</button>
                </div>
                {error && (
                    <Error>{error}</Error>
                )}
                </div>}
            </div>
        </div>
    )
}