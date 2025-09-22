import { useReservar } from "../hooks/useCrearReserva";
import { Alert } from "@Alert";
import { Error } from "@Error";
import { useNavigate } from "react-router-dom";
import { Percent, DollarSign, Coins, X } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "@authContext";
import { useReservarTransporte } from "../hooks/useReservarTransporte";
import { tiposServicios, formatLocalDateTime, formatDateOld } from "@config";
import { generarOpcionesNumeros, convertirHora } from "@config"; 

export const ReservaTransporte = ({ servicio, fechaSalida, horaSalida, handleClose }) => {
    const { crearReserva, loading, error } = useReservar();
    const { total, cantPersonas, IVA, TotalConIVA, setCantPersonas } = useReservarTransporte({servicio});
    const navigate = useNavigate();
    
    const irADetalle = () => {
        navigate("/MiTour/");
    };
    const { token } = useContext(AuthContext);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (fechaSalida === null || horaSalida === null) {
        return (
            <Alert>Para reservar debe seleccionar una fecha y una hora de salida.</Alert>
        );
    }
    else if (fechaSalida < today) {
        return (
            <Alert>Para reservar debe seleccionar una fecha válida.</Alert>
        );
    }

    const buildReservaPayload = () => {
        return {
            servicio_id: servicio.id, 
            cant_personas: cantPersonas,
            total: TotalConIVA,
            fecha_hora_salida: formatLocalDateTime(fechaSalida, horaSalida),
            //hacer que la persona pueda seleccionar el destino
            destino: servicio.destinos[0].id
        };
    };

    const opciones = generarOpcionesNumeros(10);

    return (
        <div className="bg-gray-50 dark:bg-[#181818]/90 flex gap-4 p-4 flex-wrap">
            <button
                    className="md:hidden right-4 text-zinc-700 px-1 py-1 absolute rounded-full cursor-pointer"
                    onClick={handleClose}
                >
                    <X className="w-8 h-8"/> 
                </button>  
            <div className="text-zinc-800 flex flex-shrink flex-1 flex-col gap-2 md:border border-gray-200 md:p-4 p-2 rounded-lg w-fit md:min-w-100 min-w-90 dark:border-[#AAAAAA]/30 dark:text-[#F9FAFB]">
                <h1 className="text-3xl font-semibold tracking-wide my-2">Tu reserva</h1>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 px-2 py-4 border border-gray-200 rounded dark:border-[#AAAAAA]/30">
                        <div className="flex flex-col gap-1 p-2 border-r pr-4 border-gray-300 dark:border-[#AAAAAA]/30">
                            <p className="text-sm">Sale</p>
                                <strong>{formatDateOld(fechaSalida)}</strong> 
                                <p>a las {convertirHora(horaSalida)}</p>
                        </div>
                        <div className="flex flex-col gap-1 p-2">
                            <p className="text-sm">Origen</p>
                            <strong>{servicio.origen}</strong>
                        </div>
                    </div>
                    <div className="flex gap-2 px-2 py-4 border border-gray-200 rounded dark:border-[#AAAAAA]/30">
                        <div className="flex flex-col gap-1 p-2">
                            <p className="mt-3 text-sm">Cantidad de personas</p>
                            <select
                                value={cantPersonas}
                                onChange={(e) => setCantPersonas(e.target.value)}
                                className="w-fit py-1 font-bold focus:outline-none cursor-pointer dark:border-[#AAAAAA]/30 dark:bg-[#181818]"
                            >
                                {opciones.map((op) => (
                                    <option key={op} value={op}>
                                    {op} 
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 p-4 border border-gray-200 rounded dark:border-[#AAAAAA]/30">
                        <p className="text-sm">Has seleccionado</p>
                        <strong className="flex gap-2 mb-3 flex-wrap">
                        Un viaje a {servicio.destinos.at(-1).nombre}
                        </strong>
                        <p className="text-sm">1 x {servicio.nombre}</p>
                    </div>
                </div>
            </div>
            <div className="flex-shrink flex-1 md:p-4 p-2 md:border min-w-90 gap-4 border-gray-200 flex flex-col rounded-lg justify-between dark:border-[#AAAAAA]/30 dark:text-[#F9FAFB]">
                <div className="flex gap-3 flex-col">
                    <div className="border-b border-gray-300 p-2 px-4 md:text-2xl text-xl bg-gray-200/60 rounded-t font-semibold text-gray-800/95 flex justify-between dark:border-[#AAAAAA]/30 dark:bg-[#AAAAAA]/10 dark:text-[#F9FAFB]">
                        <p>{(cantPersonas > 1)?"Personas":"Persona"} ({cantPersonas})</p>
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
                                        <p>Precio por persona</p>
                                    </div>
                                        <p>C$ {servicio.precio}</p>
                                </div>
                            <div className="flex gap-1 items-center mt-2 justify-between">
                                <div className="flex gap-1 items-center">
                                    <Percent className="w-6 h-4 text-yellow-600" />
                                    <p>IVA</p>
                                </div>
                                <p>C$ {IVA}</p>
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
    )
}