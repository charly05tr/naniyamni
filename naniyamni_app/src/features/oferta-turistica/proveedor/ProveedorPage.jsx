import { ProveedorDetailCard } from "./components/ProveedorDetailCard";
import { useParams } from "react-router-dom";
import { useProveedorDetail } from "./hooks/useProveedorDetail";
import { GaleriaImagenes } from "./components/GaleriaImagenes";
import { ServicioCard } from "./components/ServicioCard";
import MapWithMarket from "./components/MapaProveedores";
import { DisponibilidadForm } from "./components/DisponibilidadForm";
import { Title } from "@TextStyled";
import { useFiltros } from "./hooks/useFiltros";
import { useState } from "react";

const ProveedorPage = () => {
    const { id } = useParams();
    const [filtro, setFiltro] = useState("all");
    const { proveedor, loading, error } = useProveedorDetail(id);
    const { serviciosFiltrados } = useFiltros(proveedor.servicios, filtro, proveedor.tipo);
    const todasLasImagenes = [
        ...(proveedor?.imagenes || []),
        ...((proveedor?.servicios || []).map(s => s?.imagenes || []).flat())
      ];
    return (
        <>
            {(!loading)
            ?
                <div className="border p-2 bg-white/10 flex flex-col m-2 gap-2 rounded border-gray-200">
                    <div className="bg-white flex flex-col gap-2">
                        <div className="bg-white gap-2 lg:gap-4 grid lg:grid-rows-1 md:grid-rows-1 lg:grid-cols-[4fr_1fr] md:grid-cols-[4fr_2fr] justify-between min-h-80 max-h-300">
                            <ProveedorDetailCard proveedor={proveedor} loading={loading} error={error}/>
                            <MapWithMarket proveedor={proveedor}/>
                        </div>
                        <div>
                            <GaleriaImagenes imagenes={todasLasImagenes} duplicar={false} tamSel={(proveedor.tipo === 'AV')?"md":"lg"}/>    
                        </div>
                    </div>
                    <div>
                        <div className="gap-2 md:gap-4 grid grid-cols-1 grid-rows-1  lg:grid-rows-1 md:grid-rows-1 lg:grid-cols-[1fr_1fr] md:mb-4 mb-2 ">
                            <DisponibilidadForm tipo={proveedor.tipo} setFiltro={setFiltro}/>
                            <div className="bg-white border border-gray-200 p-4 rounded-xl">
                                <Title text="Comentarios Destacados"/> 
                            </div>
                        </div>
                        {(serviciosFiltrados.length > 0)
                        ?
                            <ServicioCard servicios={serviciosFiltrados} tipo={proveedor.tipo} reglas={proveedor.reglas}/>
                        :   <div className="p-4 border rounded bg-red-200 border-red-600 text-red-900 text-center">No hay Servicios disponibles</div>}
                    </div>
                </div>
            :
                <h1>Cargando...</h1>}
        </>
    )
}

export default ProveedorPage;