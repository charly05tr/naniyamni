import { tiposServicios, formatDate } from "@config"
import { useNavigate } from "react-router-dom";

export const ReservaHabitacionCard = ({ reserva, eliminar, irAProveedor, handleOpen, inPay }) => {
  const {
    id,
    servicio,
    // cant_adultos,
    // cant_ninos,
    noches,
    fecha_hora_llegada,
    fecha_hora_salida,
    proveedor_nombre, 
    total,
    estado,
  } = reserva;



  const navigate = useNavigate();

  const irAPagar = (descuentoPedido, totalPedido, subtotal, reservasPedido) => {
      navigate("/pay", {
          state: {
              subtotal,
              totalPedido,
              descuentoPedido,
              reservasPedido
          }
      });
  };

  const imageUrl = servicio.imagenes && servicio.imagenes.length > 0 ? servicio.imagenes[0].image_url : 'https://via.placeholder.com/150';
  
  return (
    <div className="flex flex-col md:flex-row rounded-xl shadow-lg overflow-hidden max-w-3xl  mx-auto transform transition-transform duration-200 hover:scale-101 hover:shadow-2xl dark:border-[#AAAAAA]/10 dark:border">
      <div className="flex-shrink-0 w-full md:w-1/3 bg-gray-100 flex items-center justify-center p-4 md:p-0">
        <img
          src={imageUrl}
          alt={`${servicio.nombre}`}
          className="w-full h-48 md:h-full object-cover rounded-md md:rounded-l-xl md:rounded-r-none"
        />
      </div>
      <div className="p-6 md:p-8 flex-1">
        <div className="flex gap-2 justify-between items-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-1 dark:text-[#F9FAFB]/90">{`${servicio.nombre}`}</h3>
            <span className="text-gray-600/80 text-nowrap ml-2 dark:text-[#F9FAFB]/60">{noches} {(noches > 1)?"noches":"noche"}</span>
        </div>
        <p className="text-xl font-bold dark:text-[#00BFFF]/90 text-[#007bff]/90 mb-2">C$ {total}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 mb-4">
          <div className="flex items-start flex-col gap-1">
            <span className="text-sm font-medium text-gray-500 mr-2 dark:text-[#F9FAFB]/60">Llegada:</span>
            <span className="text-sm text-gray-800 line-clamp-1 dark:text-[#F9FAFB]/90">{formatDate(fecha_hora_llegada)}</span>
            {/* <span className="text-sm text-gray-700">{fecha_hora_recogida}</span> */}
          </div>
          <div className="flex items-start flex-col gap-1">
            <span className="text-sm font-medium text-gray-500 mr-2 dark:text-[#F9FAFB]/60">Salida:</span>
            <span className="text-sm text-gray-800 line-clamp-1 dark:text-[#F9FAFB]/90">{formatDate(fecha_hora_salida)}</span>
            {/* <span className="text-sm text-gray-700">{fecha_hora_entrega}</span> */}
          </div>
          <div className="flex items-start">
            <span className="text-sm font-medium text-gray-500 mr-2 dark:text-[#F9FAFB]/60">Proveedor:</span>
            <a onClick={() => (!inPay)&&irAProveedor(servicio.proveedor)} className={`" dark:text-[#F9FAFB]/90 text-nowrap text-sm text-gray-800 " ${(!inPay)?"underline hover:text-gray-700 cursor-pointer dark:hover:text-gray-400 ":""}`}>{proveedor_nombre}</a>
          </div>
        </div>
        {(!inPay)&&
        <div className='flex gap-2'>
          <span onClick={() => eliminar(id, tiposServicios[servicio.tipo_servicio])} className='hover:text-gray-700 dark:hover:text-gray-400 text-sm underline cursor-pointer self-end border-r pr-2 border-gray-400'>{(!estado)?"Eliminar":"Cancelar"}</span>
          {(!estado)&&<span onClick={() => irAPagar(0, total, total, reserva)} className='hover:text-gray-700 text-sm underline cursor-pointer self-end border-r pr-2 border-gray-400 dark:hover:text-gray-400'>Pagar solo este</span>}
          <span onClick={() => handleOpen(reserva)} className='hover:text-gray-700 text-sm underline cursor-pointer self-end dark:hover:text-gray-400'>Ver detalle reserva</span>
        </div>}
      </div>
    </div>
  );
};