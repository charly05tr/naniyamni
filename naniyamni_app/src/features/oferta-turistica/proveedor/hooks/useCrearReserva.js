import { useState } from "react";
import { postReserva } from "../services/postReserva";

export const useReservar = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(""); 

    const crearReserva = async (reserva, tipo) => {
        setLoading(true);
        setError("");
        try {
            const data = await postReserva(reserva, tipo);    
            return data;
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
        };
    };

    return {crearReserva, loading, error};
};