import { Title, Text } from "@TextStyled"; 

export const ProveedorCard = ({ proveedor }) => {
    const imgURL = ( proveedor.imagenes.length > 0 ) ? proveedor.imagenes[0].image_url: "/src/assets/placeholder.png"
    return (
        <div className="bg-gradient-to-r border-gray-100 rounded p-[1px] hover:from-blue-200 hover:to-yellow-200 hover:cursor-pointer">
            <div className="border p-2 bg-white flex gap-2 rounded border-gray-200">
                <img src={imgURL} alt={proveedor.nombre} className="h-60 w-60 rounded"/>
                <div className="p-2">
                    <Title text={proveedor.nombre} margin={false}/>
                    <small className="text-shadow-zinc-600">{proveedor.ciudad}</small>
                    <Text>{proveedor.descripcion}</Text>
                </div>
            </div>
        </div>
    );
}