import { useContext } from "react";
import { AuthContext } from "@authContext";
import { Button } from "@FormStyled";
import { PerfilCard } from "./components/PerfilCard";
import { usePerfil } from "./hooks/usePerfil";

const Perfil = () => {
    const { token, logout } = useContext(AuthContext);
    const { handleLogout } = usePerfil();

    const handleClick = () => {
        handleLogout(logout);
    };
    
    return (
        <div className="flex justify-center mt-4">
        {token? (
            <div className="flex w-150 flex-col rounded border border-gray-200 bg-white justify-between">
                    <div className="w-40 mt-4 mr-2 mb-2 self-end">
                        <Button text="Cerrar sesión" color="red" onClick={handleClick}/>
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