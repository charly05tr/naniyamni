import { ProveedorDetailCard } from "../proveedor/components/ProveedorDetailAdmin";
import { useParams } from "react-router-dom";
import { useProveedorDetail } from "../../oferta-turistica/proveedor/hooks/useProveedorDetail";
import { useNavigate } from "react-router-dom";
import { Button } from "@FormStyled";

const ProveedorAdmin = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const {proveedor, loading, error} = useProveedorDetail(id);

    const handleNewServicio = () => {
        navigate(`/proveedor/${proveedor.id}/new-servicio/tipo/${proveedor.tipo}/`);
    }

    return (
        <>
            {(!loading)
            ?
                <div>
                    <ProveedorDetailCard proveedor={proveedor} loading={loading} error={error}/>
                    <div className="w-50">
                        <Button onClick={handleNewServicio} text="Crear servicio"/>
                    </div>
                </div>
            :
                <h1>Cargando...</h1>}
        </>
    )
}

export default ProveedorAdmin;