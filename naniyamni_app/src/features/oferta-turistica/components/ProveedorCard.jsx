import { Title } from "@TextStyled"; 
import { useNavigate } from "react-router-dom";
import { Rating } from "./Rating";
import { FaMapMarkerAlt } from 'react-icons/fa';

export const ProveedorCard = ({ proveedor }) => {
    const navigate = useNavigate();

    const irADetalle = () => {
        navigate(`/proveedor/${proveedor.id}`);
    };

    const imgURL = ( proveedor.imagen ) ? proveedor.imagen.image_url: "/src/assets/placeholder.png"
    return (
        <button onClick={irADetalle} className="text-start bg-gradient-to-r p-[1px] dark:bg-transparent  hover:to-[#2CA6A4] hover:from-[#F4B731] hover:cursor-pointer group block w-full rounded-xl shadow-lg transition-transform transform hover:-translate-y-1 hover:shadow-2xl duration-300">
            <div className="bg-gray-50 flex flex-col gap-2 rounded-xl max-h-60  dark:bg-[#181818] dark:border-[#AAAAAA]/30 dark:border">
                <div className="flex flex-row items-center md:items-start md:gap-2">
                    <img src={imgURL} alt={proveedor.nombre} className="lg:h-60 lg:w-60 md:h-44 md:w-44 w-20 h-20 rounded-full md:rounded-none object-cover md:rounded-l-xl dark:opacity-85 ml-2 md:ml-0"/>
                    <div className="p-4 w-full">
                        <div className="flex justify-between items-start w-full flex-col">
                            <Title text={proveedor.nombre} margin={false}/>
                            <Rating />
                        </div>
                        <small className="text-zinc-600 dark:text-[#F9FAFB]/60 flex gap-1 mt-1 items-center"><FaMapMarkerAlt className="" />{proveedor.ciudad}</small>
                        <div>
                            <p className="hidden  md:line-clamp-2 lg:line-clam-3  text-zinc-700 dark:text-[#F9FAFB]/80 md:mt-3">{proveedor.descripcion}</p>
                        </div>
                    </div>
                </div>
                    <p className="md:hidden md:line-clamp-2 lg:line-clamp-3 line-clamp-2 text-zinc-700 dark:text-[#F9FAFB]/80 lg:mt-3 m-2">{proveedor.descripcion}</p>
            </div>
        </button>
    );
}