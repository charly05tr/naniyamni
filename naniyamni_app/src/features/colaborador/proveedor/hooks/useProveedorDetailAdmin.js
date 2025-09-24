import { useState, useEffect, useCallback } from "react";
import { getProveedorDetailAdmin } from "../services/getProveedorDetailAdmin";

export const useProveedorDetailAdmin = (id) => {
    const [proveedor, setProveedor] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGetProveedor = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const data = await getProveedorDetailAdmin(id);
            if (data.latitud) data.latitud = parseFloat(data.latitud);
            if (data.longitud) data.longitud = parseFloat(data.longitud);   
            setProveedor(data);

        } catch(e) {
            if (typeof e === "object") {
                const firstKey = Object.keys(e)[0];
                const firstMessage = e[firstKey][0];
                setError(firstMessage);
            }
            else {
                setError("Ocurrió un error inesperado.");
            }
            throw e;
        }
        finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        handleGetProveedor();

    }, [handleGetProveedor]);

    return { error, loading, proveedor, refetch: handleGetProveedor }    
}