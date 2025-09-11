import { Input } from "@FormStyled";

export const TransporteForm = ({formData, handleChange}) => {
    
    return (
         <>
            <div>
                <Input name="origen" value={formData.origen} onChange={handleChange} placeholder="Origen"/>
            </div>
            <div>
                <Input type="datetime-local" name="fecha_salida" value={formData.fecha_salida} onChange={handleChange} placeholder="Fecha de salida"/>
            </div>
            <div>
                <Input type="number" name="asientos_disponibles" value={formData.asientos_disponibles} onChange={handleChange} placeholder="Asientos disponibles"/>
            </div>
        </>
    );
}