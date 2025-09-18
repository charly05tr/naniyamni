import { Title } from "@TextStyled"; 
import { actividades } from "@config";
import { ReadMoreText } from "@ReadMoreText";

export const ProveedorDetailCard = ({ proveedor, loading, error }) => {

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (  
        <div>
            <div className="flex items-center bg-white gap-2 tracking-wide text-zinc-800">
                <div>
                    <img src ={proveedor.imagen?.image_url || "/src/assets/placeholder.png"} alt={proveedor.imagen?.title} className="h-18 w-18 md:h-20 md:w-20 m-2 rounded-full"/>
                </div>
                <div className="mb-2">
                    <Title text={proveedor.nombre} margin={false}/>
                    <small className="text-zinc-600">{proveedor.ciudad}</small>
                </div>
            </div>
            <div className="w-full flex flex-col items-start pb-2 pt-4 px-4 rounded">   
                <ReadMoreText text={proveedor.descripcion || ""}/>
                <div className="py-6">
                    <p className="mb-4"><strong>Dirección:</strong> {proveedor.direccion}</p>
                    <p className=""><strong>Categoría:</strong> {actividades.filter(item => item.value === proveedor.tipo)[0]?.label}</p>
                </div>
            </div>
        </div>
    );
}