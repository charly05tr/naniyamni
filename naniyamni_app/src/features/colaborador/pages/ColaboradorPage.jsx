import { Button } from "@FormStyled";
import { Title } from "@TextStyled";
import { useNavigate } from "react-router-dom";
import { MiProveedorCard } from "../proveedor/components/MiProveedor";
import { useMisProveedores } from "../proveedor/hooks/useMisProveedores";

const ColaboradorPage = () => {
    const navigate = useNavigate();
    const { proveedores, loading } = useMisProveedores();
    const handleNewProveedor = () => {
        navigate("/new-proveedor");
    }

    return (
        <div className="flex flex-col justify-center items-center m-2 border rounded border-gray-200 p-2">
        <Title text="Panel de colaborador"/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-4">
            {(!loading)
                ?
                    (proveedores[0])
                    ? proveedores.map(proveedor => (
                        <MiProveedorCard key={proveedor.id} proveedor={proveedor}/>)
                    )
                    : <h1 className="col-span-6 m-[40dvh] text-center">No hay ofertas que mostrar.</h1>
                :<h1 className="col-span-6 m-[40dvh] text-center">Cargando...</h1>}
        </div>  
        <div className="w-50">
            <Button text="Crear proveedor" onClick={handleNewProveedor}/>
        </div>
        </div>
    );
} 

export default ColaboradorPage;