import { SelectLugarDevolucion } from "./Surcursales";
import { tiposServicios, formatLocalDateTime, generarOpcionesHoras  } from "@config";
import { Error } from "@Error";
import { Alert } from "@Alert";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@authContext";
import { useReserva } from "../hooks/useReserva";
import { Percent, DollarSign, Coins, X } from "lucide-react";

export const ReservaVehiculo = ({ reserva, setHoraInicio, setHoraDevolucion, setLugarDevolucion, crearReserva, error, loading, handleClose, inTour=false }) => {

    const { noches, total, iva, TotalConIVA, startDate, endDate } = useReserva({reserva, startDate:reserva.fechaInicio, endDate:reserva.fechaDevolucion});
    const dias = noches;

    const { token } = useContext(AuthContext);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const opciones = generarOpcionesHoras();

    const tarifaDiaria = reserva.servicio.precio; 
    const recargoPorHora = 0.15; 
    const horasExtras = !reserva.estado &&
    reserva.horaInicio !== reserva.horaDevolucion
      ? calcularHorasExtras(reserva.horaInicio, reserva.horaDevolucion)
      : 0;

    const recargo = horasExtras > 0 ? Math.min(horasExtras * recargoPorHora * tarifaDiaria, tarifaDiaria) : 0;

    const handleChangeHoraInicio = (hora) => {
        if (reserva.estado) {
            return;
        }
        setHoraInicio(hora);
        if (reserva.horaDevolucion === "") {
            setHoraDevolucion(hora);
        }
    };

    const navigate = useNavigate();
    const irADetalle = () => {
        navigate("/MiTour/");
        // window.location.reload();
    };

    const buildReservaPayload = () => {
        return {
            fecha_hora_recogida: formatLocalDateTime(startDate, reserva.horaInicio),
            fecha_hora_entrega: formatLocalDateTime(endDate, reserva.horaDevolucion),
            lugar_recogida: reserva.lugarInicio,
            lugar_devolucion: reserva.lugarDevolucion,
            servicio_id: reserva.servicio.id,
            total: TotalConIVA,
            dias: dias,
        }
    }

    if (noches < 1) {
        return (
            <Alert>Para reservar debe seleccionar un rango de fechas.</Alert>
        )
    } else if (startDate < today) {
        return (
            <Alert>Fechas no válidas para reservar.</Alert>
        )
    }; 
    if ((reserva.lugarInicio === "Sucursal" || reserva.lugarInicio === "")) {
        return (
          <Alert>Para reservar debe seleccionar una sucursal.</Alert>
        )
    }

    return (
        <div onClick={(e) => e.stopPropagation()} className="z-70 flex flex-wrap md:gap-4 gap-2 w-fit  p-1 md:p-4 md:border rounded-xl border-gray-300 bg-gray-50/95 text-zinc-800 dark:text-[#F9FAFB] dark:bg-[#181818] dark:border-[#AAAAAA]/5">
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
                        <p className="text-sm">Fecha Inicio</p>
                        <p className="font-bold">{reserva.entrada.split("\n")[0]}</p>
                        <p className="mt-3 text-sm">Hora Inicio</p>
                        {!reserva.estado?<select
                            value={reserva.horaInicio}
                            onChange={(e) => handleChangeHoraInicio(e.target.value)}
                            className="w-fit py-1 font-bold focus:outline-none cursor-pointer dark:bg-[#181818]"
                        >
                            {opciones.map((op) => (
                                <option key={op} value={op}>
                                {op} hrs
                                </option>
                            ))}
                        </select>:<p className="font-bold">{reserva.horaInicio}</p>}
                    </div>
                    <div className="flex flex-col gap-1 p-2">
                        <p className="text-sm">Fecha Devolución</p>
                        <p className="font-bold">{reserva.salida.split("\n")[0]}</p>
                        <p className="mt-3 text-sm">Hora Devolución</p>
                        {!reserva.estado?
                        <select
                            value={reserva.horaDevolucion}
                            onChange={(e) => setHoraDevolucion(e.target.value)}
                            className="w-fit py-1 font-bold focus:outline-none cursor-pointer dark:bg-[#181818]"
                        >
                            {opciones.map((op) => (
                                <option key={op} value={op}>
                                {op} hrs
                                </option>
                            ))}
                        </select>:<p className="font-bold">{reserva.horaDevolucion}</p>}
                    </div>
                </div>
                <div className="flex flex-col gap-2 p-2 border border-gray-200 items-start rounded dark:border-[#AAAAAA]/30">
                    <div className="flex flex-col gap-1 p-2 border-gray-300">
                        <p className="text-sm">Lugar Inicio</p>
                        <p className="font-bold">{reserva.lugarInicio.toLowerCase()}</p>
                    </div>
                    <div className="flex flex-col gap-1 p-2">
                        <p className="text-sm">Lugar Devolución</p>
                        {!reserva.estado?
                        <SelectLugarDevolucion reserva={reserva} sucursales={reserva?.servicio?.sucursales_data} setLugarDevolucion={setLugarDevolucion} lugarDevolucion={reserva.lugarDevolucion || ""}/>
                        :<p className="font-bold">{reserva.lugarDevolucion.toLowerCase()}</p>}
                    </div>
                </div>
                <div className="flex flex-col gap-2 p-4 border border-gray-200 rounded dark:border-[#AAAAAA]/30">
                    <p className="text-sm">Has seleccionado</p>
                    <strong className="flex gap-2 mb-3 flex-wrap">
                            {reserva.cantVehiculos} {(reserva.cantVehiculos > 1)?"vehículos":"vehículo"} para { dias} {( dias > 1)?"días":"día"}
                    </strong>
                    <p className="text-sm">1 x {reserva.servicio.nombre}</p>
                </div>
                {horasExtras > 0 && (
                    <div className="p-2 bg-yellow-100 text-yellow-800 rounded text-sm text-wrap w-fit max-w-100">
                        ⚠ Tu hora de devolución no coincide con la de inicio.  
                        Se aplicará un recargo de <strong>NIO {recargo.toFixed(2)}$</strong>  
                        ({horasExtras} hora(s) extra).
                    </div>
                )}
            </div>
            <div className="flex-shrink flex-1 md:p-4 p-2 md:border min-w-96 gap-4 border-gray-300 flex flex-col rounded-lg justify-between dark:border-[#AAAAAA]/30">
                <div className="flex gap-3 flex-col">
                    <div className="border-b border-gray-300 p-2 px-4 md:text-2xl text-xl bg-gray-200/60 rounded-t font-semibold text-gray-800/95 flex justify-between dark:text-[#F9FAFB] dark:border-[#AAAAAA]/30 dark:bg-[#AAAAAA]/10">
                            <p>{( dias > 1)?"Días":"Día"} ({ dias})</p>
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
                                    <p>Precio por día</p>   
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
                        onClick={() => {
                            if (token){
                                const payload = buildReservaPayload();
                                crearReserva(payload, tiposServicios[reserva.servicio.tipo_servicio]);
                                irADetalle();
                                return;
                            }
                            navigate("/login")
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


function calcularHorasExtras(horaInicio, horaDevolucion) {
    const [h1, m1] = horaInicio.split(":").map(Number);
    const [h2, m2] = horaDevolucion.split(":").map(Number);
  
    const inicioMin = h1 * 60 + m1;
    const finMin = h2 * 60 + m2;
  
    const diff = (finMin - inicioMin) / 60;
  
    return diff > 0 ? diff : 0;
  }