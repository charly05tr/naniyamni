import { useState, useEffect, useCallback } from "react";
import { getProveedores } from "../services/getProveedores";

export const useProveedor = (initialSearch = "") => {
    const [proveedores, setProveedores] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGetServicio = useCallback(async (search = "") => {
        setLoading(true);
        setError("");

        try {
            const data = await getProveedores(search);
            setProveedores(data);
            
        } catch(e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        handleGetServicio(initialSearch);
    }, [handleGetServicio, initialSearch]);

    return { error, loading, proveedores, refetch: handleGetServicio };
}