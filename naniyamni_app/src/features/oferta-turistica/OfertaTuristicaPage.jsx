import { useProveedor } from "./hooks/useProveedor";
import { ProveedorCard } from "./components/ProveedorCard";
import { Error } from "@Error";

const OfertaTuristica = () => {
    const { proveedores, loading } = useProveedor();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4 lg:m-4 m-2 gap-2">
            {(!loading)
            ?
                (proveedores[0])
                ? proveedores.map(proveedor => (
                    <ProveedorCard key={proveedor.id} proveedor={proveedor}/>)
                )
                :<div className="flex items-center w-full col-span-2  justify-center"> <Error>No hay ofertas que mostrar.</Error></div>
            :<h1 className="col-span-6 m-[40dvh] text-center">Cargando...</h1>}
        </div>                                               
    );
}

export default OfertaTuristica;