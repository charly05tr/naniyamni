import { useState, useEffect, useRef  } from "react";
import { useLocation } from "react-router-dom";
import { Error } from "@Error";
import { MiTourCard } from "./MiTourCard";
import { usePerfil } from "../../users/perfil/hooks/usePerfil"; 
import { UpdatePerfilForm } from "../../users/register/components/UpdatePerfilForm";
import { Info } from "lucide-react";
import Cargando from "@Cargando";
import { useActualizarReserva } from "../hooks/useActualizarReserva";
import { tiposServicios } from "@config";
import { useNavigate } from "react-router-dom";
import { useActualizarDatos } from "../../users/perfil/hooks/useActualizarDatos";

const Pagos = () => {
    const [message, setMessage] = useState(""); 
    const { perfilData, loading, error } = usePerfil();
    const { updatePerfil, loading3, error3 } = useActualizarDatos();
    const { state } = useLocation();
    const { subtotal, totalPedido, descuentoPedido, reservasPedido } = state || {};
    const { patch, loading2, error2 } = useActualizarReserva();
    const [idReservas, setIdReservas] = useState([]);
    const formRef = useRef();
    const navigate = useNavigate();
    
    useEffect(() => {
      if (reservasPedido && Array.isArray(reservasPedido)) {
        const ids = reservasPedido.map(r => ({ id: r.id, tipo: tiposServicios[r.servicio.tipo_servicio] }));
        setIdReservas(ids);
      }
      else if (reservasPedido) {
        setIdReservas([{id:reservasPedido.id, tipo: tiposServicios[reservasPedido.servicio.tipo_servicio] }]);
      }
    }, [reservasPedido]);

    const handleTerminarTransaccion = async () => {
      try {
        if (!idReservas || idReservas.length === 0) return;
        await Promise.all(
          idReservas.map(({ id, tipo }) => {
            let reserva;
            if (Array.isArray(reservasPedido)) {
              reserva = reservasPedido.find(r => r.id === id);
              if (!reserva) return null;
            }
            else {
              reserva = reservasPedido;
            }
    
            // Payload mínimo según tipo
            const payload = { estado: true, servicio_id: reserva.servicio.id };
    
            switch (tipo) {
              case "habitacion":
                if (reserva.fecha_hora_llegada) payload.fecha_hora_llegada = reserva.fecha_hora_llegada;
                if (reserva.fecha_hora_salida) payload.fecha_hora_salida = reserva.fecha_hora_salida;
                if (reserva.cant_adultos !== undefined) payload.cant_adultos = reserva.cant_adultos;
                if (reserva.cant_ninos !== undefined) payload.cant_ninos = reserva.cant_ninos;
                if (reserva.cant_habitaciones !== undefined) payload.cant_habitaciones = reserva.cant_habitaciones;
                if (reserva.noches !== undefined) payload.noches = reserva.noches;
                break;
    
              case "atraccion":
                if (reserva.fecha_hora_llegada) payload.fecha_hora_llegada = reserva.fecha_hora_llegada;
                if (reserva.fecha_llegada) payload.fecha_llegada = reserva.fecha_llegada;
                if (reserva.cant_personas !== undefined) payload.cant_personas = reserva.cant_personas;
                break;
    
              case "vehiculo":
                if (reserva.fecha_hora_recogida) payload.fecha_hora_recogida = reserva.fecha_hora_recogida;
                if (reserva.fecha_hora_devolucion) payload.fecha_hora_devolucion = reserva.fecha_hora_devolucion;
                if (reserva.cant_personas !== undefined) payload.cant_personas = reserva.cant_personas;
                break;
    
              default:
                break;
            }
    
            return patch(id, payload, tipo);
          })
        );
      } catch (err) {
      }
    };                                                            
    
    const pagar = async () => {
      formRef.current.submit();
      await handleTerminarTransaccion();
      if (error) {
        return;
      }
      navigate("/reservas-activas");
    }
  
    useEffect(() => {
      const query = new URLSearchParams(window.location.search);
      
      if (query.get("success")) {
        setMessage("Order placed! You will receive an email confirmation.");
      }
      
      if (query.get("canceled")) {
        setMessage(
          "Order canceled -- continue to shop around and checkout when you're ready."
        );
      }
    }, []);
    
    if (state == {} || subtotal === 0 || totalPedido === 0 || reservasPedido == undefined) {
      return (
        <div className="flex items-center w-full justify-center h-[80dvh]">
          <Error>No puedes acceder sin un pedido</Error>
        </div>
      )
    }
  

    if (loading || loading2 || loading3) {
      return (
        <Cargando>Cargando...</Cargando>
      );
    }

    if (error || error2 || error3) {
      return (
        <Error>{error || error2 || error3 }</Error>
      );
    }

    const reservas = Array.isArray(reservasPedido) ? reservasPedido : [reservasPedido];
    const reservasPendientes = reservas.filter(reserva => reserva.estado === false);

    const handleUpdatePerfil = async (usuario) => {
      await updatePerfil(usuario);
    } 

    const ProductDisplay = () => (
      <div className="flex justify-between my-5">
          <div></div>
          <div className="flex flex-col gap-2 mt-5  px-4">
              <div className="flex gap-5 flex-wrap-reverse md:flex-nowrap">
                <div>
                  <h1 className="p-4 mb-3 text-2xl text-zinc-800 font-bold dark:text-[#F9FAFB] md:text-start text-center">Confirmar pedido</h1>
                  {reservas ?
                    <div className="flex flex-col gap-2 rounded max-w-200">
                        {(reservasPendientes.length > 1)?
                            <div className="flex flex-wrap gap-4 justify-center">
                                {reservasPendientes?.map(reserva => (
                                  <MiTourCard 
                                    key={reserva.id}
                                    reserva={reserva} 
                                    inPay={true}
                                  />
                                ))}
                            </div>
                            :
                              <MiTourCard 
                                key={reservasPedido[0]?.id}
                                reserva={reservasPendientes[0]} 
                                inPay={true}
                            />
                        }
                    </div>:"Loading..."}
                  </div>
                  <div className="flex flex-col flex-wrap md:flex-nowrap gap-5 lg:min-w-90 md:min-w-63 sticky md:top-17 md:w-fit w-full  h-fit">
                    <div className="p-4 md:bg-gray-200/40 h-fit bg-white rounded-xl  dark:bg-[#AAAAAA]/10 ">
                        <h1 className="pb-4 text-2xl text-zinc-800 font-bold dark:text-[#F9FAFB]">Resumen pedido</h1>
                        <div className="flex justify-between mb-2 text-sm">
                            <p>Servicios ({reservasPendientes.length || 1})</p>
                            C$ {totalPedido}
                        </div>
                        {(reservasPendientes.length > 2) &&
                            <div className="flex justify-between mb-4 text-sm">
                                <p>Descuento 10%</p>
                            - C$ {descuentoPedido}
                            </div>
                        }
                        <div className="flex justify-between border-t pt-4 border-gray-300 dark:border-[#AAAAAA]/80">
                            <p>Total</p>
                            C$ {subtotal}
                        </div>
                          <button onClick={pagar} type="submit" className="mt-5 w-full py-3 text-sm rounded-full  text-white/95 dark:bg-[#2CA6A4]/90 bg-[#153B57]/90 hover:bg-[#153B57]/80 font-extrabold cursor-pointer dark:hover:bg-[#2CA6A4]/80 tracking-tight">
                            Pagar
                          </button>
                    </div>
                    <div className="py-5 flex flex-col gap-5 border px-4 rounded-xl border-[#AAAAAA]/30">
                      <h1 className="text-2xl text-zinc-800 font-bold dark:text-[#F9FAFB]">Confirmar datos personales</h1>
                      <p className="dark:text-[#F9FAFB]/60 flex gap-2"><Info className="w-6 h-6" /> Estos datos se registrarán en la reserva.</p>
                      <UpdatePerfilForm usuario={perfilData} onSave={handleUpdatePerfil} ref={formRef} />
                    </div>
                  </div>  
              </div>
          </div>
          <div></div>
      </div>
    );
      
    const Message = ({ message }) => (
      <section>
        <p>{message}</p>
      </section>
    );

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay />
  );
}

export default Pagos;