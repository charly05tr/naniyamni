import { useState, useEffect, useCallback } from "react";
import { getMisProveedores } from "../services/getMisProveedores";

export const useMisProveedores = () => {
    const [proveedores, setProveedores] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGetServicio = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const data = await getMisProveedores();
            setProveedores(data);
            console.log(data)

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

    return { error, loading, proveedores, refetch: handleGetServicio, setProveedores }
}