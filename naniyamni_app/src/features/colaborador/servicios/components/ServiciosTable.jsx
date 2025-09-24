import { Error } from "@Error";
import MenuAcciones from "../../components/menuAcciones"; 
import Cargando from "@Cargando";

export const ServiciosTable = ({proveedor, loading, error}) => {

    if (proveedor?.servicios?.length < 1) {
        return (
            <div className="p-4 border border-[#AAAAAA]/30 rounded-lg">No tienes servicios creados</div>
        )
    }   
    console.log(proveedor)


    return (
        <div className="relative shadow-md sm:rounded-lg w-full flex items-center">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#181818] dark:text-[#F9FAFB]/90">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombre
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
                  {item.precio}
                </td>
                <td className="px-6 py-4">
                  {item.total_reservas || 0}
                </td>
                <td className="px-6 py-4">
                  {item.total_vendido || 0}
                </td>
                <td className="px-6 py-4">
                    <MenuAcciones />
                </td>
              </tr>
            ))}
          </tbody>:<Cargando />}
        </table>
        {(error)&&<Error>{error}</Error>}
      </div>
    )
}