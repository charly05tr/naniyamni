import { useState } from "react";
import { postProveedor } from "../services/postProveedor";

export const usePostProveedor = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(""); 

    const create = async (proveedor) => {
        setLoading(true);
        setError("");
        try {
            const data = await postProveedor(proveedor);
            return data;
        } catch(e) {
            if (typeof e === "object") {
                const firstKey = Object.keys(e);
                const firstMessage = e[firstKey];
                setError(firstMessage);
            }
            setError("Error al subir el formulario");
        }
        finally {
            setLoading(false);
        };
    };

    return {create, loading, error};
};