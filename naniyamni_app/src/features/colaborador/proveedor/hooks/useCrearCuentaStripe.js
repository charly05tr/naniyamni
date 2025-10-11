import { useState } from "react";
import { crearCuentaStripe } from "../services/crearCuentaStripe";

export const useCrearCuentaStripe = () => {
    const [loading3, setLoading] = useState(false);
    const [error2, setError] = useState("");

    const create = async (proveedor) => {
        setLoading(true);
        setError("");
        try {
            const data = await crearCuentaStripe(proveedor);
            return data; 
        } catch(e) {
            if (typeof e === "object") {
                const firstKey = Object.keys(e);
                const firstMessage = e[firstKey];
                setError(firstMessage);
            }
            setError("Ya tienes una cuenta en stripe");
        } finally {
            setLoading(false);
        }
    };

    return { create, loading3, error2 };
};