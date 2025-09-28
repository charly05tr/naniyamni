import { Error } from "@Error";
import MenuAcciones from "../../components/menuAcciones"; 
import { useNavigate } from "react-router-dom";
import { useActualizarVisibilidad } from "../hooks/actualizarVisibilidad";

export const ProveedoresTable = ({proveedores, loading, error, setProveedores}) => {

    const { patch } = useActualizarVisibilidad();

    const navigate = useNavigate();

    const handleProveedorAdmin = (id) => {
        navigate(`/proveedor/${id}/admin`);
    }

    if (proveedores < 1) {
        return (
            <div>No tienes proveedores creados</div>
        )
    }

    const handleVerPreview = (id) => {
      navigate(`/proveedor/${id}/`);
    }

    const handleEdit = (id, proveedor) => {
      navigate(`/proveedor/${id}/admin/actualizar/`, {
        state: {
          proveedor
        }
      });
    }

    const handlePrivate = (id, proveedor) => {
      patch(id, !proveedor.activo);
      setProveedores((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, activo: !p.activo } : p
        )
      );
    };
    const proveedoresFiltrados = proveedores?.filter(proveedor => proveedor?.activo === true);


    return (
        <div className="relative shadow-md sm:rounded-lg w-full flex items-center">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#181818] dark:text-[#F9FAFB]/90">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Cantidad de servicios
              </th>
              <th scope="col" className="px-6 py-3">
                Cantidad en Tours
              </th>
              <th scope="col" className="px-6 py-3">
                Cantidad de reservas
              </th>
              <th scope="col" className="px-6 py-3">
                Total vendido
              </th>
              <th scope="col" className="px-6 py-3">
                Visibilidad
              </th>
              <th scope="col" className="px-6 py-3">
                Acción
              </th>
            </tr>
          </thead>
          {(!loading)?
          <tbody>
            {proveedoresFiltrados?.map((item, index) => (
              
              <tr 
              key={index} 
              className="odd:bg-[#F9FAFB] odd:dark:bg-[#AAAAAA]/10 even:bg-gray-50 even:dark:bg-[#181819] border-b dark:border-[#AAAAAA]/30 border-gray-200"
              >
                <th onClick={() => handleProveedorAdmin(item.id)} scope="row" className="underline cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-[#F9FAFB] dark:hover:text-[#F9FAFB]/80">
                 {item?.nombre} 
                </th>
                <td className="px-6 py-4">
                  {item?.cantidad_servicios?.total}
                </td>
                <td className="px-6 py-4">
                  {item?.total_en_tour?.length || 0}
                </td>
                <td className="px-6 py-4">
                  {item?.reservas?.length || 0}
                </td>
                <td className="px-6 py-4">
                 C$ {(item?.total_vendido) || 0}
                </td>
                <td className="px-6 py-4">
                {item?.activo?"público":"privado"}
                </td>
                <td className="px-6 py-4">
                <MenuAcciones onEdit={handleEdit} onDelete={handlePrivate} onPreview={handleVerPreview} id={item.id} proveedor={item}/>
                </td>
              </tr>
            ))}
          </tbody>:"Cargando..."}
        </table>
        {(error)&&<Error>{error}</Error>}
      </div>
    )
}