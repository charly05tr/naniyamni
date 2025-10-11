import { useProveedor } from "./hooks/useProveedor";
import { ProveedorCard } from "./components/ProveedorCard";
import { Search } from "./components/Search";
import Cargando from "@Cargando";
import CarruselDepartamentos from "./components/Departamentos";
const OfertaTuristica = () => {
    const { proveedores, loading, refetch } = useProveedor();
    
    if (loading) {
          return (
            <Cargando>Cargando...</Cargando>
          );
    }

    return (
        <>
            <div className="md:p-4 py-4 px-2">
                <Search refetch={refetch} categories={["Hoteles", "Rent a car", "Transporte", "Museos", "Parques", "Centros turísticos"]}/>
            </div>
            <div>
                <CarruselDepartamentos refetch={refetch} />
            </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4 lg:m-4 m-2 gap-2">
            {(!loading)
            ?
                (proveedores[0])
                ? proveedores.map(proveedor => (
                    <ProveedorCard key={proveedor.id} proveedor={proveedor}/>)
                )
                :<div className="flex items-center w-full col-span-2  justify-center"> No hay ofertas que mostrar.</div>
            :<h1 className="col-span-6 m-[40dvh] text-center">Cargando...</h1>}
        </div>     
        </>                                          
    );
}

export default OfertaTuristica;