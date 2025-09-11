import { useState } from "react";
import { postServicios } from "../services/postServicios";

export const usePostServicios = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(""); 

    const createServicios = async (servicios, proveedorId) => {
        setLoading(true);
        setError("");

        try {
            const data = await postServicios(servicios, proveedorId);    
            return data.id;
        } catch(e) {
            throw new Error(e);
        }
        finally {
            setLoading(false);
        };
    };

    return {createServicios, loading, error};
};