import { useGetReservasActivas } from "./hooks/useGetReservasActivas";
import { MiTourCard } from "./components/MiTourCard";
import { useMiTour } from "./hooks/useMiTour";
import { Error } from "@Error";
import { useContext } from "react";
import { AuthContext } from "@authContext";
import { ReservaAtraccion } from "../oferta-turistica/proveedor/components/ReservaAtraccion";
import { ReservaTransporte } from "../oferta-turistica/proveedor/components/ReservaTransporte";
import { formatDate, separarFechaHora, convertirHora } from "@config";
import { ReservaHabitacion } from "../oferta-turistica/proveedor/components/ReservaHabitacion";
import { ReservaVehiculo } from "../oferta-turistica/proveedor/components/ReservaVehiculo";
import Cargando from "@Cargando";
import { useDisponibilidad } from "../oferta-turistica/context/disponibilidadContext";

const ReservasActivasPage = () => {
    const { loading, error, reservas, setReservas } = useGetReservasActivas();
    const { ReservaCardOpen, handleClose, handleOpen } = useMiTour(reservas);
      
    const { setLugarDevolucion, setHoraInicio, setHoraDevolucion } = useDisponibilidad();

    const { token } = useContext(AuthContext);

    if (!token) {
        return (
            <div className="p-10">
                <Error>{error}</Error>
            </div>
        )
    }

    if (loading) {
        return (
            <Cargando>Cargando...</Cargando>
        )
    }

    return (
        <div className="flex justify-between mb-5">
            <div></div>
            <div className="flex flex-col gap-2 mt-5  px-4">
            <h1 class="md:p-4 mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-2xl lg:text-3xl"><span class="text-transparent bg-clip-text bg-gradient-to-r from-[#153B57] to-[#2CA6A4]">Reservas Activas</span></h1>
                <div className="flex gap-5 flex-wrap-reverse md:flex-nowrap">
                    <div className="flex flex-col gap-2 rounded max-w-200">
                        {(!loading && reservas)?
                            <div className="flex flex-wrap gap-4 justify-center w-full">
                                {reservas?.map(reserva => (
                                        <MiTourCard 
                                            key={reserva.id}
                                            reserva={reserva} 
                                            setReservas={setReservas} 
                                            handleClose={handleClose} 
                                            handleOpen={handleOpen} 
                                            ReservaCardOpen={ReservaCardOpen}
                                        />
                                ))}
                            </div>
                            :<h1 className="text-center text-2xl text-zinc-700 tracking-wide font-semibold">Cargando...</h1>
                        }
                        {error &&<Error>{error}</Error>}
                    </div>
                    {(reservas.length > 0) 
                        ?
                    <div className="p-4 md:bg-gray-200/40 h-fit bg-white rounded-xl lg:min-w-90 md:min-w-63 sticky md:top-17 md:w-fit w-full dark:bg-[#AAAAAA]/10 ">
                        TODO:Mostrar mapa
                    </div> 
                        :
                    <div className="p-4 bg-gray-200/40 h-fit rounded-xl min-w-80">
                        No tienes reservas activas
                    </div>
                    }
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
                      <div onClick={(e) => e.stopPropagation()} className=" md:rounded-xl md:m-2 shadow-2xl m-2 md:max-h-[90dvh] max-h-[100dvh] w-full md:w-fit overflow-y-auto  overflow-x-clip">
                        {(ReservaCardOpen.polymorphic_ctype === "reservaatraccion")
                            ?
                                <ReservaAtraccion reserva={{...ReservaCardOpen, fecha_llegada:formatDate(ReservaCardOpen.fecha_llegada)}} handleClose={handleClose} inTour={true}/>
                            :(ReservaCardOpen.polymorphic_ctype === "reservaviaje")?
                                <ReservaTransporte reserva={{...ReservaCardOpen, fecha_salida:formatDate(separarFechaHora(ReservaCardOpen.fecha_hora_salida).fecha), hora_salida:convertirHora(separarFechaHora(ReservaCardOpen.fecha_hora_salida).hora)}} handleClose={handleClose} inTour={true}/>
                            :(ReservaCardOpen.polymorphic_ctype === "reservahabitacion")?
                                <ReservaHabitacion 
                                    handleClose={handleClose} inTour={true}
                                    reserva={{
                                        entrada:formatDate(separarFechaHora(ReservaCardOpen.fecha_hora_llegada, null, false).fecha),
                                        salida:formatDate(separarFechaHora(ReservaCardOpen.fecha_hora_salida, null, false).fecha),
                                        cantHabitaciones:ReservaCardOpen.cant_habitaciones,
                                        cantNinos:ReservaCardOpen.cant_ninos,
                                        cantAdultos:ReservaCardOpen.cant_adultos,
                                        servicio:ReservaCardOpen.servicio,
                                        noches:ReservaCardOpen.noches,
                                        total:ReservaCardOpen.total
                                    }}
                                />:
                            <ReservaVehiculo 
                                handleClose={handleClose} inTour={true}
                                reserva={{
                                    entrada: formatDate(separarFechaHora(ReservaCardOpen.fecha_hora_recogida).fecha),
                                    salida:formatDate(separarFechaHora(ReservaCardOpen.fecha_hora_entrega).fecha),
                                    lugarInicio:ReservaCardOpen.lugar_recogida,
                                    lugarDevolucion:ReservaCardOpen.lugar_devolucion,
                                    servicio:ReservaCardOpen.servicio,
                                    cantVehiculos:ReservaCardOpen.cant_vehiculos,
                                    noches: ReservaCardOpen.dias,
                                    horaInicio:separarFechaHora(ReservaCardOpen.fecha_hora_recogida).hora,
                                    horaDevolucion:separarFechaHora(ReservaCardOpen.fecha_hora_entrega).hora,
                                    sucursales:[ReservaCardOpen.servicio.sucursales],
                                }}
                                setHoraDevolucion={setHoraDevolucion}
                                setLugarDevolucion={setLugarDevolucion}
                                setHoraInicio={setHoraInicio}
                            />
                        }
                      </div>
                    </div>
                  )}
            </div>
            <div></div>
        </div>
    )
}

export default ReservasActivasPage;