import { ProveedorForm } from "./ProveedorForm"
import { useParams } from "react-router-dom";
import { useActualizarProveedor } from "../hooks/useActualizarProveedor";
import { useProveedorDetailAdmin } from "../hooks/useProveedorDetailAdmin";
import Cargando from "@Cargando";
import { useEffect } from "react";
import { SucursalesForm } from "./SucursalesForm";
import { useUpdateSucursales } from "../hooks/useUpdateSucursales";
import { useCreateSucursales } from "../hooks/useCreateSucursal";

const ActualizarProveedor = () => {
    const {update, loading2, error2} = useActualizarProveedor()
    const { id } = useParams();
    const { updateSucursales, loading3 } = useUpdateSucursales(id);
    const { createSucursales } = useCreateSucursales(id);
    const { proveedor, loading, refetch } = useProveedorDetailAdmin(id);
    const handleUpdate = (formData, id) => {
        update(formData, id);
    }

    const handleUpdateSucursales = async (sucursales) => {
        await updateSucursales(sucursales);
    }

    const handleCreateSucursales = async (sucursales) => {
        await createSucursales(sucursales);
    }

    useEffect(()=>{
        refetch();
    }, [refetch]);

    if (loading) {
        return (
            <div>
                <Cargando></Cargando>
            </div>
        )
    }
    return (
        <div className="w-full flex justify-center flex-col items-center">
            <h1 className="my-5 md:p-4 p-2 text-2xl text-zinc-800 font-bold dark:text-[#F9FAFB]">Actualizar proveedor {proveedor.nombre}</h1>
            <div className="lg:min-w-4xl md:min-w-2xl min-w-sm lg:max-w-4xl md:max-w-2xl max-w-sm">
                <ProveedorForm proveedorOldData={proveedor} oldAmenidades={proveedor.amenidades} oldReglas={proveedor.reglas} onUpdate={handleUpdate} loading={loading2} error={error2}/>
            </div>
            {(proveedor.tipo === "AV") && 
            <div>
                <h1 className="my-5 md:p-4 p-2 text-2xl text-zinc-800 font-bold dark:text-[#F9FAFB]">Actualizar Sucursales</h1>
                <SucursalesForm onCreateSucursales={handleCreateSucursales} onUpdateSurcursales={handleUpdateSucursales} loading={loading3} sucursalesOld={proveedor.sucursales.map(sucursal=>sucursal.direccion)}/>
            </div>
            }
        </div>
    )
}

export default ActualizarProveedor;