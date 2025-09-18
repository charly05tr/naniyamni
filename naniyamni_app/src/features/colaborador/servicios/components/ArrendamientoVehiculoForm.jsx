import { Input, Select } from "@FormStyled";
import { NumericInput } from "@NumericInput";
export const ArrendamientoVehiculoForm = ({formData, handleChange}) => {

    return (
        <>
            <div>
                <Input name="marca" value={formData.marca} onChange={handleChange} placeholder="Marca"/>
            </div>
            <div>
                <Input name="modelo" value={formData.modelo} onChange={handleChange} placeholder="Modelo"/>
            </div>
            <NumericInput min={1} max={50} step={1} initial={formData.cant_asientos} onChange={handleChange} text="Cantidad asientos"/>
            <div>
                <Select
                    name="transmision"
                    value={formData.transmision}
                    onChange={handleChange}
                >
                    <option value="">Tipo de transmisión</option>
                    <option value="M">Mecánico</option>
                    <option value="A">Automático</option>
                    <option value="E">Eléctrico</option>
                </Select>
            </div>
            {/* <div>
                <Input type="number" name="cantAsientos" value={formData.cant_asientos} onChange={handleChange} placeholder="Cantidad de asientos"/>
            </div> */}
        </>
    );
}