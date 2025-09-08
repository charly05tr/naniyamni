import { Title, Text } from "@TextStyled"; 

export const ProveedorCard = ({ proveedor }) => {
    const imgURL = ( proveedor.imagenes.length > 0 ) ? proveedor.imagenes[0].image_url: "/src/assets/placeholder.png"
    return (
        <div className="border p-2 bg-white flex gap-2 rounded border-gray-200">
            <img src={imgURL} alt={proveedor.nombre}/>
            <div className="p-2">
                <Title text={proveedor.nombre} margin={false}/>
                <small>{proveedor.ciudad}</small>
                <Text>{proveedor.descripcion}</Text> 
            </div>
        </div>
    );
}