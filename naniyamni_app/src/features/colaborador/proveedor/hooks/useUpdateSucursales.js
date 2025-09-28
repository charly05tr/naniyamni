import { useState } from "react";
import { updateSucursales } from "../services/updateSucursales";

export const useUpdateSucursales = (id) => {
    const [loading3, setLoading] = useState(false);
    const [error2, setError] = useState("");

    const updateSucursal = async (sucursales) => {
        setLoading(true);
        setError("");
        try {
            const data = await updateSucursales(sucursales, id);
            return data; 
        } catch (e) {
            setError("Error al subir el formulario");
        } finally {
            setLoading(false);
        }
    };

    return { updateSucursal, loading3, error2 };
};