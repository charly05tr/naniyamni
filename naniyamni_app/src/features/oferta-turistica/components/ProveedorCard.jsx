import { Title, Text } from "@TextStyled"; 
import { useNavigate } from "react-router-dom";

export const ProveedorCard = ({ proveedor }) => {
    const navigate = useNavigate();

    const irADetalle = () => {
        navigate(`/proveedor/${proveedor.id}`);
    };

    const imgURL = ( proveedor.imagen ) ? proveedor.imagen.image_url: "/src/assets/placeholder.png"
    return (
        <button onClick={irADetalle} className="text-start bg-gradient-to-r border-gray-100 rounded p-[1px] hover:from-blue-200 hover:to-yellow-200 hover:cursor-pointer">
            <div className="border p-2 bg-white flex gap-2 rounded border-gray-200 max-h-65">
                <img src={imgURL} alt={proveedor.nombre} className="h-60 w-60 rounded object-cover"/>
                <div className="p-2">
                    <Title text={proveedor.nombre} margin={false}/>
                    <small className="text-zinc-600">{proveedor.ciudad}</small>
                    <p className="line-clamp-4 text-zinc-700 mt-3">{proveedor.descripcion}</p>
                </div>
            </div>
        </button>
    );
}