import { Button } from "@FormStyled";
import { Title } from "@TextStyled";
import { useNavigate } from "react-router-dom";
import { ProveedoresTable } from "../proveedor/components/ProveedoresTable";
import { AuthContext } from "@authContext";
import { useContext } from "react";
import { Alert } from "@Alert";
import { useMisProveedores } from "../proveedor/hooks/useMisProveedores";

const ColaboradorPage = () => {
    const { user, token } = useContext(AuthContext);

    const { error, loading, proveedores, setProveedores } = useMisProveedores();
    
    const navigate = useNavigate();
    const handleNewProveedor = () => {
        navigate("/new-proveedor");
    }

    if (!token) {
        return (
            <div className="h-[80dvh] flex items-center justify-center">
                <Alert>Tienes que crear una cuenta de proveedor</Alert>
            </div>
        )
    }

    if (user?.rol === "Turista") {
        return (
            <div className="h-[80dvh] flex items-center                     ">
                <Alert>Crea una cuenta de proveedor para tener acceso.</Alert>
            </div>
        )
    }
    return (
        <div className="flex flex-col justify-center items-center m-2 border rounded border-gray-200 dark:border-none p-2">
            <Title text="Panel de colaborador"/>
            <div className="p-4">
                <ProveedoresTable error={error} loading={loading} proveedores={proveedores} setProveedores={setProveedores}/>
            </div>
            <div className="w-50">
                <Button text="Crear proveedor" onClick={handleNewProveedor}/>
            </div>
        </div>
    );
} 

export default ColaboradorPage;