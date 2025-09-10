import { Title, Text } from "@TextStyled"; 
import { actividades } from "@config";
import { GaleriaImagenes } from "./GaleriaImagenes";

export const ProveedorDetailCard = ({ proveedor }) => {

    return (
        <div className="border p-2 bg-white flex flex-col m-2 gap-2 rounded border-gray-200">
            <div className="p-2">
                <div className="flex items-center">
                    <div>
                        <img src ={proveedor.imagen?.image_url || "/src/assets/placeholder.png"} alt={proveedor.imagen?.title} className="h-20 w-20 m-2 rounded-full object-cover"/>
                    </div>
                    <div className="mb-2">
                        <Title text={proveedor.nombre} margin={false}/>
                        <small className="text-shadow-zinc-600">{proveedor.ciudad}</small>
                    </div>
                </div>
                <div className="w-full flex flex-col text-gray-800 items-start bg-amber-50 mt-5 p-2 rounded border-gray-200">
                    <div>
                        <p className="m-2">{proveedor.descripcion}</p>
                    </div>
                    <div className="pt-3 pb-3">
                        <p className="m-2"><strong>Dirección:</strong> {proveedor.direccion}</p>
                        <p className="m-2"><strong>Categoría:</strong> {actividades.filter(item => item.value === proveedor.tipo)[0]?.label}</p>
                    </div>
                </div>

            </div>
            <GaleriaImagenes proveedor={proveedor}/>    
        </div>
    );
}