import { ProveedorDetailCard } from "./components/ProveedorDetailCard";
import { useParams } from "react-router-dom";
import { useProveedorDetail } from "./hooks/useProveedorDetail";
import { GaleriaImagenes } from "./components/GaleriaImagenes";
import { ServicioCard } from "./components/ServicioCard";
import MapWithMarket from "./components/MapaProveedores";

const ProveedorPage = () => {
    const { id } = useParams();
    
    const { proveedor, loading, error } = useProveedorDetail(id);

    return (
        <>
            {(!loading)
            ?
                <div className="border p-2 bg-white flex flex-col m-2 gap-2 rounded border-gray-200">
                    <div className="gap-2 grid grid-cols-1 md:grid-cols-[3fr_1fr] justify-between p-2">
                        <ProveedorDetailCard proveedor={proveedor} loading={loading} error={error}/>
                        <MapWithMarket proveedor={proveedor}/>
                    </div>
                    <GaleriaImagenes proveedor={proveedor}/>    
                    <ServicioCard servicios={proveedor.servicios}/>
                </div>
            :
                <h1>Cargando...</h1>}
        </>
    )
}

export default ProveedorPage;