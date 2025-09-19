import { useGetMiTour } from "./hooks/useGetMiTour";
import { MiTourCard } from "./components/MiTourCard";
import { useMiTour } from "./hooks/useMiTour";
import { useNavigate } from "react-router-dom";

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
            <div className="flex flex-col gap-2 mt-5">
                <h1 className="py-3 text-2xl text-zinc-800 font-bold">Mi Tour</h1>
                <div className="flex">
                    <div className="flex flex-col gap-2 rounded max-w-200">
                        {(!loading && reservas)?
                            <div className="flex flex-wrap gap-4">
                                {reservas?.map(reserva => (
                                        <MiTourCard key={reserva.id} reserva={reserva} setReservas={setReservas} handleClose={handleClose} handleOpen={handleOpen} ReservaCardOpen={ReservaCardOpen}/>
                                ))}
                            </div>
                            :<h1 className="text-center text-2xl text-zinc-700 tracking-wide font-semibold">Cargando...</h1>
                        }
                        {error && <div className="p-4 text-center border border-red-600 rounded-sm text-red-900 w-full bg-red-300">{error}</div>}
                    </div>
                    <div className="p-4 bg-gray-200/40 h-fit rounded-xl min-w-80">
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
                        <div className="flex justify-between border-t pt-4 border-gray-300">
                            <p>Subtotal</p>
                            C$ {subTotal}
                        </div>
                        <div className="flex justify-center mt-5">
                            <button onClick={irAPagar} className="w-full py-3 text-sm rounded-full bg-blue-600 text-white/95 font-extrabold cursor-pointer hover:bg-blue-600/90 tracking-tight">Completar la transacción</button>
                        </div>
                    </div>
                </div>
            </div>
            <div></div>
        </div>
    )
}

export default MiTourPage;