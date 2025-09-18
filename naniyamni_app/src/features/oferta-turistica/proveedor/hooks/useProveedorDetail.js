import { useState, useEffect, useCallback } from "react";
import { getProveedorDetail } from "../services/getProveedorDetail";

export const useProveedorDetail = (id) => {
    const [proveedor, setProveedor] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGetProveedor = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const data = await getProveedorDetail(id);
            if (data.latitud) data.latitud = parseFloat(data.latitud);
            if (data.longitud) data.longitud = parseFloat(data.longitud);   
            setProveedor(data);

        } catch(e) {
            setError(e);
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