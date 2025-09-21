import { ProveedorDetailCard } from "./components/ProveedorDetailCard";
import { useParams } from "react-router-dom";
import { useProveedorDetail } from "./hooks/useProveedorDetail";
import { GaleriaImagenes } from "./components/GaleriaImagenes";
import { ServicioCard } from "./components/ServicioCard";
import MapWithMarket from "./components/MapaProveedores";
import { DisponibilidadForm } from "./components/DisponibilidadForm";
import { Error } from "@Error";
import { useFiltros } from "./hooks/useFiltros";
import { useState } from "react";
import { TransporteCard } from "./components/TransporteCard";
import { AtraccionCard } from "./components/AtraccionCard";

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
            <div className="p-2 bg-white/10 flex flex-col m-2 gap-2 rounded border-gray-200">
                <div className="bg-white flex flex-col gap-2">
                    <div className="bg-white gap-2 lg:gap-4 grid lg:grid-rows-1 md:grid-rows-1 lg:grid-cols-[4fr_1fr] md:grid-cols-[4fr_2fr] justify-between min-h-80 max-h-300">
                        <ProveedorDetailCard proveedor={proveedor} loading={loading} error={error}/>
                        <MapWithMarket proveedor={proveedor}/>
                    </div>
                    {(proveedor.tipo !== "TTT")&&
                    <div>
                        <GaleriaImagenes imagenes={todasLasImagenes} duplicar={false} tamSel={(proveedor.tipo === 'AV')?"md":"lg"}/>    
                    </div>}
                </div>
                <div>
                    <div className="gap-2 md:gap-4 grid grid-cols-1 grid-rows-1  lg:grid-rows-1 md:grid-rows-1 lg:grid-cols-[1fr_1fr] md:mb-4 mb-2 ">
                        {(proveedor.tipo !== "TTT" && proveedor.tipo !== "CR")&&
                        <>
                            <DisponibilidadForm tipo={proveedor.tipo} setFiltro={setFiltro} sucursales={proveedor?.sucursales}/>
                            <div className="rounded-xl bg-white border border-gray-200 p-4  shadow-sm transition-transform transform  hover:shadow-md duration-300">
                            <h1 className="tracking-wide text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 flex-1">Comentarios Destacados</h1>
                            </div>
                        </>}
                    </div>
                    {(serviciosFiltrados.length > 0)
                        ?
                        (proveedor.tipo !== "TTT" && proveedor.tipo !== "CR") 
                            ?
                            <ServicioCard servicios={serviciosFiltrados} tipo={proveedor.tipo} sucursales={proveedor.sucursales}/>
                            :
                            (proveedor.tipo !== "CR")
                                ?
                                <div>
                                    {proveedor.servicios?.map(servicio =>
                                        <TransporteCard key={servicio.id} servicio={servicio}/>
                                    )}
                                </div>
                                :
                                <div className="flex lg:justify-between gap-4 lg:gap-1 flex-wrap lg:flex-nowrap w-full justify-center mt-15">
                                    <div className="h-fit lg:w-1/4 flex flex-col gap-2 w-fit flex-wrap p-6 lg:min-w-50 max-w-100  rounded-xl shadow">
                                        <h1 className="text-gray-800/90 font-bold text-xl mb-2">Comentarios Destacados</h1>
                                        <div className="text-center p-4 border rounded-full border-gray-200">
                                            No hay comentarios.
                                        </div>
                                    </div>
                                    <div className="lg:min-w-120 flex md:justify-center items-center  max-w-200">
                                        {proveedor.servicios?.map(servicio =>
                                            <AtraccionCard key={servicio.id} servicio={servicio}/>
                                        )}
                                    </div>
                                    {(proveedor?.reglas.length > 0)?
                                    <div className="h-fit lg:w-1/4 flex flex-col gap-2 w-fit flex-wrap p-6 lg:min-w-50 max-w-100 rounded-xl shadow">
                                        <h1 className="text-gray-800/90 font-bold text-xl mb-4">Normas</h1>
                                        {proveedor.reglas?.map(regla => (
                                            <li className="tracking-tight text-gray-800/95 text-sm">{regla}</li>
                                        ))}
                                    </div>
                                    :<div></div>}
                                </div>
                        :
                        <Error>No hay servicios disponibles</Error>}
                </div>
            </div>
            :
            <h1>Cargando...</h1>}
        </>
    )
}

export default ProveedorPage;