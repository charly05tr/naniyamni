import { useState, useEffect } from "react";
import { getPerfil } from "../services/getPerfil";
import { useNavigate } from 'react-router-dom';

export const usePerfil = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [perfilData, setPerfilData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const handlePerfil = async () => {
            setLoading(true);
            setError("");
            
            try {
                const data = await getPerfil();
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
        } 
        handlePerfil();
        }, []);

        const handleLogout = (logout) => {
            logout();
            navigate("/");
        }

    return { loading, error, perfilData, handleLogout };
}