import { useState } from "react";
import { eliminarDeMiTour } from "../services/EliminarDeMiTour";

export const useEliminarDeTour = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(""); 

    const eliminarDeTour = async (reserva_id, tipo) => {
        setLoading(true);
        setError("");
        try {
            await eliminarDeMiTour(reserva_id, tipo);  
        } catch(e) {
            if (typeof e === "object") {
                const firstKey = Object.keys(e)[0];
                const firstMessage = e[firstKey];
                setError(firstMessage);
            }
            else {
                setError("Ocurrió un error inesperado.");
            }
            throw e;
        }
        finally {
            setLoading(false);
        };
    };

    return {eliminarDeTour, loading, error};
};