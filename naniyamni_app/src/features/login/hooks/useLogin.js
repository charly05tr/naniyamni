import { useState } from "react";
import { obtenerToken } from "../services/auth-token";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const login = async (usuario) => {
        setLoading(true);
        setError("");
        try {
            const token = await obtenerToken(usuario);
            localStorage.setItem('token', token);
        }
        catch(e) {
            setError(e.message);
        }
        finally {
            setLoading(false);
        }
    };

    return {login, loading, error};
};  