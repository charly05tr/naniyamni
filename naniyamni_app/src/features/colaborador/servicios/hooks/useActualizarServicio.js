import { useState } from "react";
import { actualizarServicio } from "../services/actualizarServicio";

export const useActualizarServicio = () => {
    const [loading2, setLoading] = useState(false);
    const [error2, setError] = useState(""); 

    const update = async (servicio, proveedorId, tipo, id) => {
        setLoading(true);
        setError("");
        try {
            const data = await actualizarServicio(servicio, proveedorId, tipo, id);
            return data;
        } catch(e) {
            if (typeof e === "object") {
                const firstKey = Object.keys(e);
                const firstMessage = e[firstKey];
                setError(firstMessage);
            }
            setError("Error al actualizar servicio");
        }
        finally {
            setLoading(false);
        };
    };

    return {update, loading2, error2};
};