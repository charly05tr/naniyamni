import { useState, useContext } from "react";
import { createUser } from "../services/createUser";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "@authContext";

export const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError]= useState(""); 
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const register = async (usuario) => {
        setLoading(true);
        setError("");
        try {
            const token = await createUser(usuario);
            login(token);
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