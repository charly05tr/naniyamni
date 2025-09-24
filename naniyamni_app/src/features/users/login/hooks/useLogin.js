import { useState, useContext } from "react";
import { obtenerToken } from "../services/auth-token";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "@authContext";
import { usePerfil } from "../../perfil/hooks/usePerfil";

export const useLogin = () => {
    const { login, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { refetch, perfilData } = usePerfil();

    const handleLogin = async (usuario) => {
        setLoading(true);
        setError("");
        try {
            const token = await obtenerToken(usuario);
            login(token);
            navigate("/oferta-turistica");
            refetch(token)
            setUser(perfilData);
        }
        catch(e) {
            setError("correo o contraseña inválidos");
            throw new error(e);
        }
        finally {
            window.location.reload();
            setLoading(false);
        }
    };

    return {handleLogin, loading, error};
};  