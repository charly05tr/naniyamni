import { useState } from "react";
import { actualizarUser } from "../services/actualizarUser";

export const useActualizarDatos = () => {
    const [loading3, setLoading] = useState(false);
    const [error3, setError] = useState(""); 
    const [newData, setNewData] = useState({}); 

    const updatePerfil = async (usuario) => {
        setLoading(true);
        setError("");
        try {
            const data = await actualizarUser(usuario);
            setNewData(data);
        } catch(e) {
            throw new Error(e);
        }
        finally {
            setLoading(false);
        };
    };

    return {updatePerfil, loading3, error3, newData};
};