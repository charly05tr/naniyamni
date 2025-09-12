import { Title } from "@TextStyled";

export const ServicioCard = ({ servicios }) => {

    const tipo = {
        "D": "Double",
        "S": "Single",
        "SU": "Suite"
    }

    return (
        <div className="border p-4 bg-white columns-1 md:columns-2 rounded border-gray-200">
            {servicios?.map(servicio => (
                <div key={servicio.id} className="text-zinc-800 p-4 mb-4 border rounded border-gray-200 min-w-100 h-fit">
                    <Title text={servicio.nombre}/>
                    <p>{servicio.descripcion}</p>
                    <div className="w-full flex flex-col text-gray-800 items-start bg-blue-50 mt-5 p-4 rounded border-gray-200">
                        <p className="mb-2"><strong>Precio por noche:</strong> NIO {servicio.precio}$</p>
                        <p className="mb-2"><strong>Tipo: </strong>{tipo[servicio.tipo]}</p>
                        <p className="mb-2"><strong>Capacidad: </strong>{servicio.capacidad} personas</p>
                    </div>
                    <div className="flex gap-2 my-4 overflow-x-scroll">
                        {servicio.imagenes.map(imagen => (
                            <img className="w-40 h-40 rounded object-cover" key={imagen.id} src={imagen.image_url} alt={imagen.title}></img>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}