import { useState, useEffect, useCallback } from "react";
import { getReservasActivas } from "../services/getReservasActivas";

export const useGetReservasActivas = () => {
    const [reservas, setReservas] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGetReservasActivas = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const data = await getReservasActivas();
            setReservas(data);

        } catch(e) {
            if (typeof e === "object") {
                const firstKey = Object.keys(e)[0];
                const firstMessage = e[firstKey];
                if (firstMessage === "Invalid token.") {
                    setError("Tienes que iniciar sesión para crear un Tour");
                } else {
                    setError(firstMessage);
                }
            }
            else {
                setError("Ocurrió un error inesperado.");
            }
            throw e;
        }
        finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        handleGetReservasActivas();

    }, [handleGetReservasActivas]);

    return { error, loading, reservas, setReservas, refetch: handleGetReservasActivas }    
}