import { Input, Select } from "@FormStyled";
import { generarOpcionesHoras } from "@config";
import InputErrorMessage from "@InputErrorMessage";

export const HotelForm = ({formData, handleChange, errorValidacion}) => {
    console.log(errorValidacion)
    const opciones =generarOpcionesHoras();

    return (
        <>
            <div>
                <Select
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    error={errorValidacion.tipo}
                    >
                    <option value="">Tipo de habitación</option>
                    <option value="S">Single</option>
                    <option value="D">Double</option>
                    <option value="SU">Suite</option>
                </Select>
                {errorValidacion.tipo && <InputErrorMessage>{errorValidacion.tipo}</InputErrorMessage>}
            </div>
            <div>
                <Input type="number" name="capacidad" value={formData.capacidad} onChange={handleChange} placeholder="Capacidad" error={errorValidacion.capacidad}/>
                {errorValidacion.capacidad && (<InputErrorMessage>{errorValidacion.capacidad}</InputErrorMessage>)}
            </div>
            <div className="mb-2">
                <label className="text-gray-800/90 dark:text-[#F9FAFB]">Hora check-in</label>
                <Select
                    name="hora_check_in"
                    value={formData.hora_check_in}
                    onChange={handleChange}
                    error={errorValidacion.hora_check_in}
                >
                    {opciones.map((op) => (
                        <option key={op} value={op}>
                        {op} hrs
                        </option>
                    ))}
                </Select>
                {errorValidacion.hora_check_in && (<InputErrorMessage>{errorValidacion.hora_check_in}</InputErrorMessage>)}
            </div>
            <div className="mb-2">
                <label className="text-gray-800/90 dark:text-[#F9FAFB]">Hora check-out</label>
                <Select
                    name="hora_check_out"
                    value={formData.hora_check_out}
                    onChange={handleChange}
                    error={errorValidacion.hora_check_out}
                >
                    {opciones.map((op) => (
                        <option key={op} value={op}>
                        {op} hrs
                        </option>
                    ))}
                </Select>
                {errorValidacion.hora_check_out && (<InputErrorMessage>{errorValidacion.hora_check_out}</InputErrorMessage>)}
            </div>
        </>
    );
}