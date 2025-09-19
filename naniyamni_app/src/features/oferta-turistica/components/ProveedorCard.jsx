import { Title } from "@TextStyled"; 
import { useNavigate } from "react-router-dom";

export const ProveedorCard = ({ proveedor }) => {
    const navigate = useNavigate();

    const irADetalle = () => {
        navigate(`/proveedor/${proveedor.id}`);
    };

    const imgURL = ( proveedor.imagen ) ? proveedor.imagen.image_url: "/src/assets/placeholder.png"
    return (
        <button onClick={irADetalle} className="text-start bg-gradient-to-r   p-[1.5px] hover:from-blue-200 hover:to-yellow-200 hover:cursor-pointer group block w-full rounded-xl shadow-lg transition-transform transform hover:-translate-y-1 hover:shadow-2xl duration-300">
            <div className=" bg-white flex flex-col gap-2 rounded-xl max-h-60">
                <div className="flex flex-row items-center md:items-start md:gap-2">
                    <img src={imgURL} alt={proveedor.nombre} className="lg:h-60 lg:w-60 md:h-44 md:w-44 w-20 h-20 object-cover md:rounded-l-xl"/>
                    <div className="p-4">
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