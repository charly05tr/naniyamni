import { Title } from "@TextStyled"; 
import { useNavigate } from "react-router-dom";

export const ProveedorCard = ({ proveedor }) => {
    const navigate = useNavigate();

    const irADetalle = () => {
        navigate(`/proveedor/${proveedor.id}`);
    };

    const imgURL = ( proveedor.imagen ) ? proveedor.imagen.image_url: "/src/assets/placeholder.png"
    return (
        <button onClick={irADetalle} className="text-start bg-gradient-to-r bg-gray-200 rounded p-[1.5px] hover:from-blue-200 hover:to-yellow-200 hover:cursor-pointer">
            <div className="p-2 bg-white flex flex-col gap-2 rounded max-h-65">
                <div className="flex flex-row items-center md:items-start md:gap-2">
                    <img src={imgURL} alt={proveedor.nombre} className="lg:h-60 lg:w-60 md:h-44 md:w-44 w-20 h-20 lg:rounded md:rounded object-cover rounded-full"/>
                    <div className="p-2">
                        <Title text={proveedor.nombre} margin={false}/>
                        <small className="text-zinc-600">{proveedor.ciudad}</small>
                        <div>
                            <p className="hidden  md:line-clamp-2 lg:line-clam-3  text-zinc-700 mt-3">{proveedor.descripcion}</p>
                        </div>
                    </div>
                </div>
                    <p className="md:hidden md:line-clamp-2 lg:line-clamp-3 line-clamp-2 text-zinc-700 lg:mt-3 m-2">{proveedor.descripcion}</p>
            </div>
        </button>
    );
}