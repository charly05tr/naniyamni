import { useState } from "react";
import { postProveedor } from "../services/postProveedor";

export const usePostProveedor = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(""); 

    const create = async (proveedor) => {
        setLoading(true);
        setError("");

        try {
            await postProveedor(proveedor);       
        } catch(e) {
            throw new Error(e);
        }
        finally {
            setLoading(false);
        };
    };

    return {create, loading, error};
};