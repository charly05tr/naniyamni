import { useState, useEffect, useCallback } from "react";
import { getMiTour } from "../services/getMiTour";

export const useGetMiTour = () => {
    const [reservas, setReservas] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGetMiTour = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const data = await getMiTour();
            setReservas(data);

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
    }, []);

    useEffect(() => {
        handleGetMiTour();

    }, [handleGetMiTour]);

    return { error, loading, reservas, setReservas, refetch: handleGetMiTour }    
}