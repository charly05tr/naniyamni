import { useDisponibilidad } from "../../context/disponibilidadContext";
import { formatDateOld } from "@config";
import { ReservaHabitacion } from "./ReservaHabitacion";
import { ReservaVehiculo } from "./ReservaVehiculo";
import { useReservar } from "../hooks/useCrearReserva";


export const ReservaCard = ({ servicio, handleClose  }) => {
    const { range, cantAdultos, cantNinos, cantHabitaciones, lugarInicio, lugarDevolucion, setLugarDevolucion, setHoraInicio, setHoraDevolucion, horaInicio, horaDevolucion } = useDisponibilidad();
    const entrada = formatDateOld(range[0].startDate, "entrada");
    const salida = formatDateOld(range[0].endDate, "salida");
    
    const { crearReserva, loading, error } = useReservar();

    return (
            <>
            {(servicio.tipo_servicio === "H")?
                <ReservaHabitacion 
                    reserva={{
                        entrada,
                        salida,
                        cantHabitaciones,
                        cantNinos,
                        cantAdultos,
                        servicio,
                        fechaInicio:range[0].startDate,
                        fechaDevolucion:range[0].endDate,
                    }}
                    handleClose={handleClose}
                    error={error}
                    loading={loading}
                    crearReserva={crearReserva}
                />
            :(servicio.tipo_servicio === "V")&&
                <ReservaVehiculo
                    setLugarDevolucion={setLugarDevolucion} 
                    setHoraDevolucion={setHoraDevolucion} 
                    setHoraInicio={setHoraInicio}
                    reserva={{
                        entrada,
                        salida,
                        cantVehiculos:cantHabitaciones,
                        horaDevolucion,
                        horaInicio,
                        lugarDevolucion,
                        lugarInicio,
                        servicio,
                        fechaInicio:range[0].startDate,
                        fechaDevolucion:range[0].endDate,
                    }} 
                    handleClose={handleClose}
                    error={error}
                    loading={loading}
                    crearReserva={crearReserva}
                />
            }
        </>
    );
};  