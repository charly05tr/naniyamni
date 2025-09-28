import { useState } from "react";
import { actualizarReserva } from "../services/actualizarReserva";

export const useActualizarReserva = () => {
    const [loading2, setLoading] = useState(false);
    const [error2, setError] = useState(""); 

    const patch = async (id, reserva, tipo) => {
        setLoading(true);
        setError("");
        try {
            const data = await actualizarReserva(id, reserva, tipo);
            return data;
        } catch(e) {
            if (typeof e === "object") {
                const firstKey = Object.keys(e);
                const firstMessage = e[firstKey];
                setError(firstMessage);
            }
            setError("Error al actualizar");
        }
        finally {
            setLoading(false);
        };
    };

    return {patch, loading2, error2};
};