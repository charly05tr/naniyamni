import { useState } from "react";
import { obtenerToken } from "../services/auth-token";
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const login = async (usuario) => {
        setLoading(true);
        setError("");
        try {
            const token = await obtenerToken(usuario);
            localStorage.setItem('token', token);
            navigate("/");
        }
        catch(e) {
            setError("correo o contraseña inválidos");
            throw new error(e);
        }
        finally {
            setLoading(false);
        }
    };

    return {login, loading, error};
};  