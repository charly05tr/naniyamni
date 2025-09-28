import { useState } from "react";
import { postSucursales } from "../services/postSucursales";

export const useCreateSucursales = (id) => {
    const [loading3, setLoading] = useState(false);
    const [error2, setError] = useState("");

    const createSucursales = async (sucursales) => {
        setLoading(true);
        setError("");
        try {
            const data = await postSucursales(sucursales, id);
            return data; 
        } catch (e) {
            setError("Error al subir el formulario");
        } finally {
            setLoading(false);
        }
    };

    return { createSucursales, loading3, error2 };
};