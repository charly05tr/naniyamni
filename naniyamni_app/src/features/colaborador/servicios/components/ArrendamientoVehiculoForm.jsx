import { Input, Select } from "@FormStyled";
import InputList  from "@InputList";
import InputErrorMessage from "@InputErrorMessage";

export const ArrendamientoVehiculoForm = ({formData, handleChange, errorValidacion}) => {
    return (
        <>
            <div>
                <Input name="marca" value={formData.marca} onChange={handleChange} placeholder="Marca (de referencia)" error={errorValidacion.marca}/>
                {errorValidacion.marca && (<InputErrorMessage>{errorValidacion.marca}</InputErrorMessage>)}
            </div>
            <div>
                <Input name="modelo" value={formData.modelo} onChange={handleChange} placeholder="Modelo (de referencia)" error={errorValidacion.modelo}/>
                {errorValidacion.modelo && (<InputErrorMessage>{errorValidacion.modelo}</InputErrorMessage>)}
            </div>
            <div>
                <Select
                    name="transmision"
                    value={formData.transmision}
                    onChange={handleChange}
                    error={errorValidacion.transmision}
                >
                    <option value="">Tipo de transmisión</option>
                    <option value="M">Mecánico</option>
                    <option value="A">Automático</option>
                    <option value="E">Eléctrico</option>
                </Select>
                {errorValidacion.transmision && (<InputErrorMessage>{errorValidacion.transmision}</InputErrorMessage>)}
            </div>
            <div>
                <Input error={errorValidacion.cant_asientos} type="number" name="cant_asientos" value={formData.cant_asientos} onChange={handleChange} placeholder="Cantidad de asientos"/>
                {errorValidacion.cant_asientos && (<InputErrorMessage>{errorValidacion.cant_asientos}</InputErrorMessage>)}
            </div>
            <div>
                <Input error={errorValidacion.cant_vehiculos} type="number" name="cant_vehiculos" value={formData.cant_vehiculos} onChange={handleChange} placeholder="Cantidad de vehículos de está categoría"/>
                {errorValidacion.cant_asientos && (<InputErrorMessage>{errorValidacion.cant_vehiculos}</InputErrorMessage>)}
            </div>
            <InputList
                name="sucursales"
                listObject="sucursalesOptions"  
                placeholderText="Sucursal"
                labelText="Escribe las sucursales en las que está disponible este vehículo."
                buttonText="Agregar otra sucursal"
                ValoresIniciales={formData.sucursales || ['']} 
                opcionesSugeridas={formData.sucursalesDisponibles || ['']}
                handleChange={handleChange}
                error={errorValidacion.sucursales}
            />
            {errorValidacion.sucursales && (<InputErrorMessage>{errorValidacion.sucursales}</InputErrorMessage>)}
        </>
    );
}