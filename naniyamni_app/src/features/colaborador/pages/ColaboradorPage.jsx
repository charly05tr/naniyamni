import { Button, FormCard } from "@FormStyled";
import { Title } from "@TextStyled";
import { useNavigate } from "react-router-dom";
import { ProveedoresTable } from "../proveedor/components/ProveedoresTable";
import { AuthContext } from "@authContext";
import { useContext } from "react";
import { Alert } from "@Alert";
import { useMisProveedores } from "../proveedor/hooks/useMisProveedores";
import { RegisterForm } from "../../users/register/components/RegisterForm";
import { Info } from "lucide-react";
import { useRegister } from "../../users/register/hooks/useRegister";

const ColaboradorPage = () => {
    const { user, token } = useContext(AuthContext);
    const { register } = useRegister();
    
    const handleRegister = async (usuario) => {
        await register({...usuario, rol:"Proveedor"});
    }
    const { error, loading, proveedores, setProveedores } = useMisProveedores();
    
    const navigate = useNavigate();
    const handleNewProveedor = () => {
        navigate("/new-proveedor");
    }

    if (!token) {
        return (
            <div className="h-[100dvh] items-center justify-center flex flex-col gap-2">
                <FormCard>
                    <h1 className="md:py-4 text-2xl text-zinc-800 font-bold dark:text-[#F9FAFB]">Registra tus datos personales</h1>
                    <p className="dark:text-[#F9FAFB]/60 flex gap-2 mb-5"><Info className="w-6 h-6" /> Estos datos se mostrarán a tus clientes.</p>
                    <RegisterForm colaborador={true} usuarioData={false} onRegister={handleRegister}/>
                </FormCard>
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