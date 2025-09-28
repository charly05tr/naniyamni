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
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import Cargando from "@Cargando";
import { FaCheck } from "react-icons/fa";

const ProveedorPage = () => {
    const { id } = useParams();
    const [filtro, setFiltro] = useState("all");
    const { proveedor, loading, error } = useProveedorDetail(id);
    const { serviciosFiltrados } = useFiltros(proveedor.servicios, filtro, proveedor.tipo);
    const todasLasImagenes = [
        ...(proveedor?.imagenes || []),
        ...((proveedor?.servicios || []).map(s => s?.imagenes || []).flat())
      ];
    
    if (loading) {
        return (
          <Cargando>Cargando...</Cargando>
        );
      }
      console.log(proveedor)

    return (
        <>
            {(!loading)
            ?
            <div className="p-2 flex flex-col m-2 gap-2 rounded">
                <div className="flex flex-col gap-2">
                    <div className="gap-2 lg:gap-4 grid lg:grid-rows-1 md:grid-rows-1 lg:grid-cols-[4fr_1fr] md:grid-cols-[4fr_2fr] justify-between min-h-80 max-h-300 mb-5">
                        <ProveedorDetailCard proveedor={proveedor} loading={loading} error={error}/>
                        <MapWithMarket proveedor={proveedor}/>
                    </div>
                    {(proveedor.tipo !== "TTT")&&
                    <div>
                        <GaleriaImagenes imagenes={todasLasImagenes} tamSel={(proveedor.tipo === 'AV')?"md":"lg"}/>    
                    </div>}
                </div>
                <div>
                    <div className="gap-2 md:gap-4 grid grid-cols-1 grid-rows-1  lg:grid-rows-1 md:grid-rows-1 lg:grid-cols-[1fr_1fr] mb-14 mt-12">
                        {(proveedor.tipo !== "TTT" && proveedor.tipo !== "CR")&&
                        <>
                            <DisponibilidadForm tipo={proveedor.tipo} setFiltro={setFiltro} sucursales={proveedor?.sucursales}/>
                            <div className="rounded-xl border dark:border-[#AAAAAA]/10 border-gray-200 p-4  shadow-sm transition-transform transform  hover:shadow-md duration-300">
                            <h2 className="tracking-wide text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 flex-1 dark:text-[#F9FAFB] mb-5">Información del local</h2>
                                <div className="flex flex-col gap-10">
                                    <div className="py-2">
                                        <h3 className="text-xl mb-4 font-semibold text-gray-800 dark:text-[#F9FAFB]">Comentarios Destacados</h3>
                                        <div>
                                                    No hay comentarios.
                                        </div>
                                    </div>
                                {proveedor?.amenidades && proveedor?.amenidades?.length > 0 && (
                                    <div>
                                        <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-[#F9FAFB]">Amenidades</h3>
                                        <div className="flex gap-5 max-h-20 overflow-y-hidden">
                                        {proveedor?.amenidades?.map((c) => (
                                            <div key={c.id} className="flex items-center gap-2 text-gray-600 dark:text-[#F9FAFB]/80">
                                            <FaCheck className="text-green-300" />
                                            <span>{c}</span>
                                            </div>
                                        ))}
                                        </div>
                                    </div>
                                )}
                                {proveedor?.reglas && proveedor?.reglas?.length > 0 && (
                                    <div>
                                        <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-[#F9FAFB]">Normas</h3>
                                        <div className="flex max-h-20 gap-5 overflow-y-hidden">
                                        {proveedor?.reglas?.map((c) => (
                                            <div key={c.id} className="flex items-center gap-2 text-gray-600 dark:text-[#F9FAFB]/80">
                                            <ArrowRightIcon className="h-4 w-4 max-w-4 max-h-4 min-w-4 min-h-4" />
                                            <span>{c}</span>
                                            </div>
                                        ))}
                                        </div>
                                    </div>
                                )}
                                </div>
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
                                <div className="flex lg:justify-between gap-4 lg:gap-1 flex-wrap lg:flex-nowrap w-full justify-center mt-15">
                                    <div className="h-fit lg:w-1/4 flex flex-col gap-2 w-fit flex-wrap p-6 lg:min-w-50 max-w-100  rounded-xl shadow">
                                        <h1 className="text-gray-800/90 font-bold text-xl mb-2 dark:text-[#F9FAFB]">Comentarios Destacados</h1>
                                        <div className="text-center p-4 border rounded-full border-gray-200 dark:border-[#AAAAAA]/30">
                                            No hay comentarios.
                                        </div>
                                    </div>
                                    <div className="lg:min-w-120 flex md:justify-center items-center max-w-200 flex-col gap-2">
                                    {proveedor.servicios?.map(servicio =>
                                        <TransporteCard key={servicio.id} servicio={servicio}/>
                                    )}
                                    </div>
                                     {(proveedor?.reglas.length > 0)?
                                    <div className="h-fit lg:w-1/4 flex flex-col gap-3 w-fit flex-wrap p-6 lg:min-w-50 max-w-100 rounded-xl shadow">
                                        <h1 className="text-gray-800/90 font-bold text-xl mb-4 dark:text-[#F9FAFB] flex flex-col gap-2">Normas</h1>
                                        {proveedor.reglas?.map((regla, index) => (
                                            <p key={index} className="tracking-tight text-gray-800/95 text-sm dark:text-[#F9FAFB]/90 flex gap-2"><ArrowRightIcon className="h-4 w-4 max-w-4 max-h-4 min-w-4 min-h-4" /> {regla}</p>
                                        ))}
                                    </div>
                                    :
                                    (proveedor?.amenidades.length > 0)?
                                        <div className="h-fit lg:w-1/4 flex flex-col gap-3 w-fit flex-wrap p-6 lg:min-w-50 max-w-100 rounded-xl shadow">
                                            <h1 className="text-gray-800/90 font-bold text-xl mb-4 dark:text-[#F9FAFB] flex flex-col gap-2">Amenidades</h1>
                                            {proveedor.amenidades?.map((regla, index) => (
                                                <p key={index} className="tracking-tight text-gray-800/95 text-sm dark:text-[#F9FAFB]/90 flex gap-2"><ArrowRightIcon className="h-4 w-4 max-w-4 max-h-4 min-w-4 min-h-4" /> {regla}</p>
                                            ))}
                                        </div>:<div className="min-w-100"></div>
                                    }
                                </div>
                                :
                                <div className="flex lg:justify-between gap-4 lg:gap-1 flex-wrap lg:flex-nowrap w-full justify-center mt-15">
                                    <div className="h-fit lg:w-1/4 flex flex-col gap-2 w-fit flex-wrap p-6 lg:min-w-50 max-w-100  rounded-xl shadow">
                                        <h1 className="text-gray-800/90 font-bold text-xl mb-2 dark:text-[#F9FAFB]">Comentarios Destacados</h1>
                                        <div className="text-center p-4 border rounded-full border-gray-200 dark:border-[#AAAAAA]/30">
                                            No hay comentarios.
                                        </div>
                                    </div>
                                    <div className="lg:min-w-120 flex md:justify-center items-center max-w-200 flex-col gap-2">
                                        {proveedor.servicios?.map(servicio =>
                                            <AtraccionCard key={servicio.id} servicio={servicio}/>
                                        )}
                                    </div>
                                    {(proveedor?.reglas.length > 0)?
                                    <div className="h-fit lg:w-1/4 flex flex-col gap-3 w-fit flex-wrap p-6 lg:min-w-50 max-w-100 rounded-xl shadow">
                                        <h1 className="text-gray-800/90 font-bold text-xl mb-4 dark:text-[#F9FAFB] flex flex-col gap-2">Normas</h1>
                                        {proveedor.reglas?.map((regla, index) => (
                                            <p key={index} className="tracking-tight text-gray-800/95 text-sm dark:text-[#F9FAFB]/90 flex gap-2"><ArrowRightIcon className="h-4 w-4 max-w-4 max-h-4 min-w-4 min-h-4" /> {regla}</p>
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