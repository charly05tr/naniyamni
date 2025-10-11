import { useState, useEffect, useCallback } from "react";
import { getPerfil } from "../services/getPerfil";
import { LogOut } from "lucide-react";

export const usePerfil = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [perfilData, setPerfilData] = useState({});

    const handlePerfil = useCallback(async (token) => {
        setLoading(true);
        setError("");
        
        try {
            const data = await getPerfil(token);
            setPerfilData(data[0]);

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
        } finally {
            setLoading(false);
        }
    }, [])

    useEffect(() => {
        
        handlePerfil();
        }, [handlePerfil]);


    return { loading, error, perfilData, LogOut, setPerfilData, refetch:handlePerfil };
}