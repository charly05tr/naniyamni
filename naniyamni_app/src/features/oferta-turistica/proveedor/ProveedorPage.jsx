import { Title, Text } from "@TextStyled"; 
import { ProveedorDetailCard } from "./components/ProveedorDetailCard";
import { useParams } from "react-router-dom";
import { useProveedorDetail } from "./hooks/useProveedorDetail";

const ProveedorPage = () => {
    const { id } = useParams();
    
    const {proveedor, loading, error} = useProveedorDetail(id);

    return (
        <>
            {(!loading)
            ?
                <ProveedorDetailCard proveedor={proveedor} loading={loading} error={error}/>
            :
                <h1>Cargando...</h1>}
        </>
    )
}

export default ProveedorPage;