import { useState, useContext } from "react";
import { obtenerToken } from "../services/auth-token";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "@authContext";

export const useLogin = () => {
    const { login } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (usuario) => {
        setLoading(true);
        setError("");
        try {
            const token = await obtenerToken(usuario);
            login(token);
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

    return {handleLogin, loading, error};
};  