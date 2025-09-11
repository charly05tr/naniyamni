import { Input } from "@FormStyled";

export const ArrendamientoVehiculoForm = ({formData, handleChange}) => {

    return (
        <>
            <div>
                <Input name="marca" value={formData.marca} onChange={handleChange} placeholder="Marca"/>
            </div>
            <div>
                <Input name="modelo" value={formData.modelo} onChange={handleChange} placeholder="Modelo"/>
            </div>
        </>
    );
}