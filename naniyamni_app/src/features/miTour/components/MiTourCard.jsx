import { ReservaVehiculoCard } from "./ReservaVehiculoCard";
import { useEliminarDeTour } from "../hooks/useEliminarDeMiTour";
import { useNavigate } from "react-router-dom";
import { Error } from "@Error";
import { ReservaCard } from "../../oferta-turistica/proveedor/components/ReservaCard";
import { ReservaHabitacionCard } from "./ReservaHabitacionCard";
import { ReservaTransporteCard } from "./ReservaTransporteCard";
export const MiTourCard  = ({ reserva, setReservas, handleOpen }) => {
    const { eliminarDeTour, loading, error } = useEliminarDeTour();
    const navigate = useNavigate();

    const irAProveedor = (id) => {
        navigate(`/proveedor/${id}`);
    };

    const handleEliminarDeTour = async (reserva_id, tipo) => {
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
            <ReservaVehiculoCard irAProveedor={irAProveedor} reserva={reserva} eliminar={handleEliminarDeTour} handleOpen={handleOpen}/>
        :(reserva.polymorphic_ctype !== "reservaviaje")?
            (!loading) &&
            <ReservaHabitacionCard irAProveedor={irAProveedor} reserva={reserva} eliminar={handleEliminarDeTour} handleOpen={handleOpen}/>
        :(!loading) &&
        <ReservaTransporteCard irAProveedor={irAProveedor} reserva={reserva} eliminar={handleEliminarDeTour} handleOpen={handleOpen}/>}
        {(error)&&<Error>{error}</Error>}
        </div>
    )
}