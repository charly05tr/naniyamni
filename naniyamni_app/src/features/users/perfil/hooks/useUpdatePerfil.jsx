import { useState } from "react";
import { createUser } from "../../register/services/createUser";

export const useUpdatePerfil = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(""); 
    const [newData, setNewData] = useState({}); 
    const updatePerfil = async (usuario) => {
        setLoading(true);
        setError("");
        try {
            const data = await createUser(usuario);
            setNewData(data);
        } catch(e) {
            throw new Error(e);
        }
        finally {
            setLoading(false);
        };
    };


    return {updatePerfil, loading, error , newData};
};