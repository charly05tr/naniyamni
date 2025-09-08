import { useState } from "react";
import { createUser } from "../services/createUser";
import { useNavigate } from 'react-router-dom';

export const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError]= useState(""); 
    const navigate = useNavigate();

    const register = async (usuario) => {
        setLoading(true);
        setError("");
        try {
            const token = await createUser(usuario);
            localStorage.setItem('token', token);
            navigate("/");
        } catch(e) {
            throw new Error(e);
        }
        finally {
            setLoading(false);
        };
    };


    return {register, loading, error};
};