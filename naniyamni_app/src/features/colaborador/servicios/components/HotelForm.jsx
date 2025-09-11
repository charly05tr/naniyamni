import { Input, Select } from "@FormStyled";

export const HotelForm = ({formData, handleChange}) => {
    
    return (
        <>
            <div>
                <Select
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                >
                    <option value="">Tipo de habitación</option>
                    <option value="S">Single</option>
                    <option value="D">Double</option>
                    <option value="SU">Suite</option>
                </Select>
            </div>
            <div>
                <Input type="number" name="capacidad" value={formData.capacidad} onChange={handleChange} placeholder="Capacidad" />
            </div>
        </>
    );
}