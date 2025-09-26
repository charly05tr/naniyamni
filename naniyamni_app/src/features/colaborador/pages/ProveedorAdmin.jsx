import { useParams } from "react-router-dom";
import { useProveedorDetailAdmin } from "../proveedor/hooks/useProveedorDetailAdmin";
import { useNavigate } from "react-router-dom";
import { Button } from "@FormStyled";
import { ServiciosTable } from "../servicios/components/ServiciosTable";
import Cargando from "@Cargando";
import { EnTourCard } from "../proveedor/components/EnTourCard";

const ProveedorAdmin = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {proveedor, loading, error, setProveedor } = useProveedorDetailAdmin(id);

    const handleNewServicio = () => {
        navigate(`/proveedor/${proveedor.id}/new-servicio/tipo/${proveedor.tipo}/`);
    }

    return (
        <>
            {(!loading)
            ?
                <div>
                    <div className="flex flex-col gap-5 items-center w-full">
                        <h1 className="mt-5 md:p-4 text-2xl text-zinc-800 font-bold dark:text-[#F9FAFB]">Servicios de {proveedor.nombre}</h1>
                        <div className="flex p-4 items-center">
                            <ServiciosTable  proveedor={proveedor} error={error} loading={loading} setProveedor={setProveedor}/>
                        </div>
                        <div>
                            <Button onClick={handleNewServicio} text="Crear servicio"/>
                        </div>
                        <div>
                            <EnTourCard proveedor={proveedor}/>
                        </div>
                    </div>
                </div>
            :
                <Cargando />}
        </>
    )
}

export default ProveedorAdmin;