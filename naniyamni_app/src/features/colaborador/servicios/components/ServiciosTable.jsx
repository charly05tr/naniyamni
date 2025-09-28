import { Error } from "@Error";
import MenuAcciones from "../../components/menuAcciones"; 
import Cargando from "@Cargando";
import { useNavigate } from "react-router-dom";
import { useActualizarVisibilidad } from "../hooks/useActualizarVisibilidad";

export const ServiciosTable = ({proveedor, loading, error, setProveedor }) => {
console.log(proveedor)
    const navigate = useNavigate();
    const { patch } = useActualizarVisibilidad();

    if (proveedor?.servicios?.length < 1) {
        return (
            <div className="p-4 border border-[#AAAAAA]/30 rounded-lg">No tienes servicios creados</div>
        )
    }   

    const handleVerPreview = (id) => {
      navigate(`/proveedor/${id}/`);
    }

    const handleEdit = (id) => {
      navigate(`/proveedor/${proveedor.id}/admin/servicio/${id}/actualizar/`);
    }

    const handlePrivate = (id, servicio) => { 
      setProveedor((prev) => ({
        ...prev,
        servicios: prev.servicios.map((s) =>
          s.id === servicio.id ? { ...s, disponible: !s.disponible } : s
        ),
      }));
    
      patch(id, !servicio.disponible, proveedor.tipo);
    };

    return (
        <div className="relative shadow-md sm:rounded-lg w-full flex items-center">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#181818] dark:text-[#F9FAFB]/90">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Total en Tours
              </th>
              <th scope="col" className="px-6 py-3">
                Precio
              </th>
              <th scope="col" className="px-6 py-3">
                Cantidad de reservas
              </th>
              <th scope="col" className="px-6 py-3">
                Total vendido
              </th>
              <th scope="col" className="px-6 py-3">
                Disponibilidad
              </th>
              <th scope="col" className="px-6 py-3">
                Acción
              </th>
            </tr>
          </thead>
          {(!loading)?
          <tbody>
            {proveedor.servicios?.map((item, index) => (
              <tr 
                key={index} 
                className="odd:bg-[#F9FAFB] odd:dark:bg-[#AAAAAA]/10 even:bg-gray-50 even:dark:bg-[#181819] border-b dark:border-[#AAAAAA]/30 border-gray-200"
              >
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-[#F9FAFB]">
                  {item.nombre}
                </th>
                <td className="px-6 py-4">
                  {item.total_en_tour}
                </td>
                <td className="px-6 py-4">
                  C$ {item.precio}
                </td>
                <td className="px-6 py-4">
                  {item.total_reservas || 0}
                </td>
                <td className="px-6 py-4">
                  C$ {item.total_vendido || 0}
                </td>
                <td className="px-6 py-4">
                  {item.disponible?"Disponible":"No disponible"}
                </td>
                <td className="px-6 py-4">
                    <MenuAcciones onEdit={handleEdit} onDelete={handlePrivate} onPreview={handleVerPreview} id={item.id} textOnDelete={"disponibilidad"} proveedor={item} />
                </td>
              </tr>
            ))}
          </tbody>:<Cargando />}
        </table>
        {(error)&&<Error>{error}</Error>}
      </div>
    )
}