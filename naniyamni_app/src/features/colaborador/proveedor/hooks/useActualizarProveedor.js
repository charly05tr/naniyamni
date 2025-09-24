import { useState } from "react";
import { actualizarProveedor } from "../services/actualizarProveedor";

export const useActualizarProveedor = () => {
    const [loading2, setLoading] = useState(false);
    const [error2, setError] = useState(""); 

    const update = async (proveedor, id) => {
        setLoading(true);
        setError("");
        try {
            const data = await actualizarProveedor(proveedor, id);
            return data;
        } catch(e) {
            if (typeof e === "object") {
                const firstKey = Object.keys(e);
                const firstMessage = e[firstKey];
                setError(firstMessage);
            }
            setError("Error al actualizar proveedor");
        }
        finally {
            setLoading(false);
        };
    };

    return {update, loading2, error2};
};