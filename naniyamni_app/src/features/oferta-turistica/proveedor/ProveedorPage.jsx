import { ProveedorDetailCard } from "./components/ProveedorDetailCard";
import { useParams } from "react-router-dom";
import { useProveedorDetail } from "./hooks/useProveedorDetail";
import { GaleriaImagenes } from "./components/GaleriaImagenes";
import { ServicioCard } from "./components/ServicioCard";
import MapWithMarket from "./components/MapaProveedores";
import { DisponibilidadForm } from "./components/DisponibilidadForm";
import { Title } from "@TextStyled";

const ProveedorPage = () => {
    const { id } = useParams();
    
    const { proveedor, loading, error } = useProveedorDetail(id);
    console.log(proveedor.imagenes)
    return (
        <>
            {(!loading)
            ?
                <div className="border p-2 bg-white flex flex-col m-2 gap-2 rounded border-gray-200">
                    <div className="gap-2 lg:gap-4 grid grid-cols-1 grid-rows-2 sm:grid-rows-2 lg:grid-rows-1 md:grid-rows-1 lg:grid-cols-[3fr_1fr] md:grid-cols-[3fr_2fr] justify-between lg:p-2">
                        <ProveedorDetailCard proveedor={proveedor} loading={loading} error={error}/>
                        <MapWithMarket proveedor={proveedor}/>
                    </div>
                    <div className="md:mx-2">
                        <GaleriaImagenes imagenes={proveedor?.imagenes} duplicar={false}/>    
                    </div>
                    <div className="md:m-2 md:p-4 border-0 rounded border-gray-200 lg:border-1 md:border-1">
                            <div className="gap-2 md:gap-4 grid grid-cols-1 grid-rows-1  lg:grid-rows-1 md:grid-rows-1 lg:grid-cols-[1fr_1fr] md:mb-4 mb-2 ">
                            <DisponibilidadForm />
                            <div className="border border-gray-200 p-4 rounded">
                                <Title text="Comentarios Destacados"/> 
                            </div>
                        </div>
                        <ServicioCard servicios={proveedor.servicios}/>
                    </div>
                </div>
            :
                <h1>Cargando...</h1>}
        </>
    )
}

export default ProveedorPage;