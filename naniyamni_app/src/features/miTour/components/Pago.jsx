import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Error } from "@Error";
import { MiTourCard } from "./MiTourCard";
import { usePerfil } from "../../users/perfil/hooks/usePerfil"; 
import { RegisterForm } from "../../users/register/components/RegisterForm";
import { Info } from "lucide-react";
import Cargando from "@Cargando";

const Pagos = () => {
    const [message, setMessage] = useState(""); 
    const { perfilData, loading, error } = usePerfil();
    const { state } = useLocation();
    const { subtotal, totalPedido, descuentoPedido, reservasPedido } = state || {};

    useEffect(() => {
      // Check to see if this is a redirect back from Checkout
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
  

    if (loading) {
      return (
        <Cargando>Cargando...</Cargando>
      );
    }

    if (error) {
      return (
        <Error>{error}</Error>
      );
    }

    const reservas = Array.isArray(reservasPedido) ? reservasPedido : [reservasPedido];

    const ProductDisplay = () => (
      <div className="flex justify-between my-5">
          <div></div>
          <div className="flex flex-col gap-2 mt-5  px-4">
              <div className="flex gap-5 flex-wrap-reverse md:flex-nowrap">
                <div>
                  <h1 className="md:p-4 mb-3 text-2xl text-zinc-800 font-bold dark:text-[#F9FAFB]">Confirmar pedido</h1>
                  {reservas ?
                    <div className="flex flex-col gap-2 rounded max-w-200">
                        {(reservas.length > 1)?
                            <div className="flex flex-wrap gap-4 justify-center">
                                {reservas?.map(reserva => (
                                  <MiTourCard 
                                    key={reserva.id}
                                    reserva={reserva} 
                                    inPay={true}
                                  />
                                ))}
                            </div>
                            :
                              <MiTourCard 
                                key={reservas[0].id}
                                reserva={reservas[0]} 
                                inPay={true}
                            />
                        }
                    </div>:"Loading..."}
                  </div>
                  <div className="flex flex-col flex-wrap md:flex-nowrap gap-5 lg:min-w-90 md:min-w-63 sticky md:top-17 md:w-fit w-full  h-fit">
                    <div className="p-4 md:bg-gray-200/40 h-fit bg-white rounded-xl  dark:bg-[#AAAAAA]/10 ">
                        <h1 className="pb-4 text-2xl text-zinc-800 font-bold dark:text-[#F9FAFB]">Resumen pedido</h1>
                        <div className="flex justify-between mb-2 text-sm">
                            <p>Servicios ({reservasPedido.length || 1})</p>
                            C$ {totalPedido}
                        </div>
                        {(reservasPedido.length > 2) &&
                            <div className="flex justify-between mb-4 text-sm">
                                <p>Descuento 10%</p>
                            - C$ {descuentoPedido}
                            </div>
                        }
                        <div className="flex justify-between border-t pt-4 border-gray-300 dark:border-[#AAAAAA]/80">
                            <p>Subtotal</p>
                            C$ {subtotal}
                        </div>
                        <form className="mt-5" action="/create-checkout-session" method="POST">
                          <button type="submit" className="w-full py-3 text-sm rounded-full  text-white/95 bg-[#007bff]/90 font-extrabold cursor-pointer hover:bg-[#007bff]/80 tracking-tight">
                            Pagar
                          </button>
                        </form>
                    </div>
                    <div className="py-5 flex flex-col gap-5 border px-4 rounded-xl border-[#AAAAAA]/30">
                      <h1 className="text-2xl text-zinc-800 font-bold dark:text-[#F9FAFB]">Confirmar datos personales</h1>
                      <p className="dark:text-[#F9FAFB]/60 flex gap-2"><Info className="w-6 h-6" /> Estos datos se registrarán en la reserva.</p>
                      <RegisterForm usuarioData={perfilData}/>
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