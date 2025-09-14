import { Title } from "@TextStyled";
import { GaleriaImagenes } from "./GaleriaImagenes";

export const ServicioCard = ({ servicios }) => {

    const tipo = {
        "D": "Double",
        "S": "Single",
        "SU": "Suite"
    }

    return (
        <div className="md:columns-1 lg:columns-2 h-full">
            {servicios?.map(servicio => (
                <div key={servicio.id} className="text-gray-700 p-4 md:mb-4 mb-2 border rounded border-gray-200 min-w-100 h-full break-inside-avoid">
                    <div className="flex justify-between items-start gap-2">
                        <Title text={servicio.nombre}/>
                        <div className="w-fit h-fit bg-gradient-to-r from-blue-200 to-yellow-100 rounded-sm border-none p-[1px] hover:from-blue-300 hover:to-yellow-200">
                            <button className="bg-emerald-200 p-2 rounded tracking-wide cursor-pointer hover:bg-emerald-300 text-zinc-800">Reservar</button>
                        </div>
                    </div>
                    <p>{servicio.descripcion}</p>
                    <div className="w-full flex flex-col text-gray-800 items-start bg-blue-100 mb-2 mt-5 p-4 rounded">
                        <p className="mb-2"><strong>Precio por noche:</strong> NIO {servicio.precio}$</p>
                        <p className="mb-2"><strong>Tipo: </strong>{tipo[servicio.tipo]}</p>
                        <p className="mb-2"><strong>Capacidad: </strong>{servicio.capacidad} personas</p>
                    </div>
                    <GaleriaImagenes imagenes={servicio?.imagenes} />
                    <div className="my-2 flex items-center overflow-x-hidden flex-wrap max-h-23 scrollbar-hide gap-2">{servicio?.caracteristicas.sort((a,b)=> b.length -a.length).map(caracteristica => (
                        <span className="py-2 px-4 rounded-full bg-amber-100 hover:bg-amber-100 h-fit text-nowrap" key={caracteristica.id}>{caracteristica.nombre}</span>
                    ))}
                    </div>
                </div>
            ))}
        </div>
    );
}