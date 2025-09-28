import { useState } from "react";
import { actualizarVisibilidad } from "../services/actualizarVisibilidad";

export const useActualizarVisibilidad = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(""); 

    const patch = async (id, visibilidad) => {
        setLoading(true);
        setError("");
        try {
            const data = await actualizarVisibilidad(id, visibilidad);
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

    return {patch, loading, error};
};