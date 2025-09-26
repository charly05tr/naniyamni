import { ServicioForm } from "./ServicioForm";
import { useParams } from "react-router-dom";
import { useActualizarServicio } from "../hooks/useActualizarServicio";
import { useProveedorDetailAdmin } from "../../proveedor/hooks/useProveedorDetailAdmin";
import Cargando from "@Cargando";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ActualizarServicio = () => {
    const {update, loading2, error2} = useActualizarServicio()
    const { id, servicioId } = useParams();
    const { proveedor, loading, refetch } = useProveedorDetailAdmin(id);
    const navigate = useNavigate();
    
    const handleUpdate = (formData) => {
        update(formData, proveedor.id, proveedor.tipo, servicioId);
        navigate(`/proveedor/${id}/admin/`);
    }
    const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
    
    useEffect(() => {
        if (proveedor?.servicios && servicioId) {
            const servicio = proveedor.servicios.find(
                (s) => s.id === parseInt(servicioId)
            );
            setServicioSeleccionado(servicio || null);
        }
    }, [proveedor, servicioId]);
    
    if (loading) {
        return (
            <div>
                <Cargando></Cargando>
            </div>
        )
    }
    return (
        <div className="w-full flex justify-center flex-col items-center">
            <h1 className="my-5 md:p-4 p-2 text-2xl text-zinc-800 font-bold dark:text-[#F9FAFB]">Actualizar servicio {}</h1>
            <div className="lg:min-w-4xl md:min-w-2xl min-w-sm lg:max-w-4xl md:max-w-2xl max-w-sm">
                <ServicioForm tipo={proveedor.tipo} onUpdate={handleUpdate} loading={loading2} error={error2} servicioOld={servicioSeleccionado} proveedorOld={proveedor} refetch={refetch} loading4={loading}/>
            </div>
        </div>
        
    )
}

export default ActualizarServicio;