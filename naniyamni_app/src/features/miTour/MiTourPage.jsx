import { useGetMiTour } from "./hooks/useGetMiTour";
import { MiTourCard } from "./components/MiTourCard";
import { useMiTour } from "./hooks/useMiTour";
import { useNavigate } from "react-router-dom";
import { Error } from "@Error";

const MiTourPage = () => {
    const { loading, error, reservas, setReservas } = useGetMiTour();
    const { ReservaCardOpen, handleClose, handleOpen, total, subTotal, descuento } = useMiTour(reservas);
    const navigate = useNavigate();

    const irAPagar = () => {
        navigate("/pay/");
    };

    return (
        <div className="flex justify-between mb-5">
            <div></div>
            <div className="flex flex-col gap-2 mt-5  px-4">
                <h1 className="md:p-4 text-2xl text-zinc-800 font-bold dark:text-[#F9FAFB]">Mi Tour</h1>
                <div className="flex gap-5 flex-wrap-reverse md:flex-nowrap">
                    <div className="flex flex-col gap-2 rounded max-w-200">
                        {(!loading && reservas)?
                            <div className="flex flex-wrap gap-4 justify-center">
                                {reservas?.map(reserva => (
                                        <MiTourCard 
                                            key={reserva.id}
                                            reserva={reserva} 
                                            setReservas={setReservas} 
                                            handleClose={handleClose} 
                                            handleOpen={handleOpen} 
                                            ReservaCardOpen={ReservaCardOpen}
                                        />
                                ))}
                            </div>
                            :<h1 className="text-center text-2xl text-zinc-700 tracking-wide font-semibold">Cargando...</h1>
                        }
                        {error &&<Error>{error}</Error>}
                    </div>
                    {(reservas.length > 0) 
                        ?
                    <div className="p-4 md:bg-gray-200/40 h-fit bg-white rounded-xl lg:min-w-90 md:min-w-63 sticky md:top-17 md:w-fit w-full dark:bg-[#AAAAAA]/10 ">
                        <div className="flex justify-between mb-2 text-sm">
                            <p>Servicios ({reservas.length})</p>
                            C$ {total}
                        </div>
                        {(reservas.length > 2) &&
                            <div className="flex justify-between mb-4 text-sm">
                                <p>Descuento 10%</p>
                            - C$ {descuento}
                            </div>
                        }
                        <div className="flex justify-between border-t pt-4 border-gray-300 dark:border-[#AAAAAA]/80">
                            <p>Subtotal</p>
                            C$ {subTotal}
                        </div>
                        <div className="flex justify-center mt-5">
                            <button onClick={irAPagar} className="w-full py-3 text-sm rounded-full  text-white/95 bg-[#007bff]/90 font-extrabold cursor-pointer hover:bg-[#007bff]/80 tracking-tight">Completar la transacción</button>
                        </div>
                    </div>
                    :
                    <div className="p-4 bg-gray-200/40 h-fit rounded-xl min-w-80">
                        No tenes nada en tu Tour
                    </div>
                    }
                </div>
            </div>
            <div></div>
        </div>
    )
}

export default MiTourPage;