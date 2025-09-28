import { ReservaVehiculoCard } from "./ReservaVehiculoCard";
import { useEliminarDeTour } from "../hooks/useEliminarDeMiTour";
import { useNavigate } from "react-router-dom";
import { Error } from "@Error";
import { ReservaHabitacionCard } from "./ReservaHabitacionCard";
import { ReservaTransporteCard } from "./ReservaTransporteCard";
import { ReservaAtraccionCard } from "./ReservaAtraccionCard";

export const MiTourCard  = ({ reserva, setReservas, handleOpen, inPay=false }) => {
    const { eliminarDeTour, loading, error } = useEliminarDeTour();
    const navigate = useNavigate();

    const irAProveedor = (id) => {
        navigate(`/proveedor/${id}`);
    };

    const handleEliminarDeTour = async (reserva_id, tipo) => {
        if (reserva.estado) {
            alert("El reembolso es únicamente el 20% de la compra.");
        }
        try {
            await eliminarDeTour(reserva_id, tipo);
            setReservas(prev => prev.filter(r => r.id !== reserva_id));
          } catch (e) {
            console.error("Error al eliminar", e);
          }
    }
    
    return (
        <div>
        {(reserva.polymorphic_ctype === "reservavehiculo")?
            (!loading) &&
            <ReservaVehiculoCard  irAProveedor={irAProveedor} reserva={reserva} eliminar={handleEliminarDeTour} handleOpen={handleOpen} inPay={inPay}/>
        :(reserva.polymorphic_ctype === "reservahabitacion")?
            (!loading) &&
            <ReservaHabitacionCard  irAProveedor={irAProveedor} reserva={reserva} eliminar={handleEliminarDeTour} handleOpen={handleOpen} inPay={inPay}/>
        :(reserva.polymorphic_ctype === "reservaviaje")?
            (!loading) &&
            <ReservaTransporteCard  irAProveedor={irAProveedor} reserva={reserva} eliminar={handleEliminarDeTour} handleOpen={handleOpen} inPay={inPay}/>
        :(!loading) &&
            <ReservaAtraccionCard  irAProveedor={irAProveedor} reserva={reserva} eliminar={handleEliminarDeTour} handleOpen={handleOpen} inPay={inPay}/>}
        {(error)&&<Error>{error}</Error>}
        </div>
    )
}