import { useState, useEffect, useCallback } from "react";
import { getProveedores } from "../services/getProveedores";

export const useProveedor = () => {
    const [proveedores, setProveedores] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGetServicio = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const data = await getProveedores();
            setProveedores(data);
            console.log(data);

        } catch(e) {
            setError(e);
        }
        finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        handleGetServicio();

    }, [handleGetServicio]);

    return { error, loading, proveedores, refetch: handleGetServicio}
}