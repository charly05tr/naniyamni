import { useContext } from "react";
import { AuthContext } from "@authContext";
import { Button } from "@FormStyled";
import { PerfilCard } from "./components/PerfilCard";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
    const { token, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleClick = () => {
        logout();
        navigate("/");
    };
    
    return (
        <div className="flex justify-center mt-4">
        {token? (
            <div className="flex w-2xl flex-col shadow rounded-xl justify-between">
                    <div className="w-40 m-2 self-end">
                        <a href="/">
                            <Button text="Cerrar sesión" color="red" onClick={handleClick}/>
                        </a>
                    </div>
                    <PerfilCard />
            </div>
        ) : (
            <h2 className="mt-[40dvh]">No has iniciado sesión</h2>  
        )}
        </div>
    );
};

export default Perfil;