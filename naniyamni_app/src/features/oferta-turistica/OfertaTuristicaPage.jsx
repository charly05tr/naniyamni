import { useProveedor } from "./hooks/useProveedor";
import { ProveedorCard } from "./components/ProveedorCard";

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
                : <h1 className="col-span-6 m-[40dvh] text-center">No hay ofertas que mostrar.</h1>
            :<h1 className="col-span-6 m-[40dvh] text-center">Cargando...</h1>}
        </div>                                               
    );
}

export default OfertaTuristica;