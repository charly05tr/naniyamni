import { Input, Select } from "@FormStyled";
import { generarOpcionesHoras } from "@config";
import DaysSeleccionForm from "./DaySelectionForm";
import InputErrorMessage from "@InputErrorMessage";

export const AtraccionesForm = ({ formData, handleChange, setFormData, errorValidacion }) => {
    
    const opciones =generarOpcionesHoras();
    
    return (
        <>
            <div className="my-2">
                <label className="text-gray-800/90 dark:text-[#F9FAFB]">Hora de apertura</label>
                <Select
                    name="hora_apertura"
                    value={formData.hora_apertura}
                    onChange={handleChange}
                >
                    {opciones.map((op) => (
                        <option key={op} value={op}>
                        {op} hrs
                        </option>
                    ))}
                </Select>
                {errorValidacion.hora_apertura && <InputErrorMessage>{errorValidacion.hora_apertura}</InputErrorMessage>}
            </div>
            <div className="mb-2">
                <label className="text-gray-800/90 dark:text-[#F9FAFB]">Hora de cierre</label>
                <Select
                    name="hora_cierre"
                    value={formData.hora_cierre}
                    onChange={handleChange}
                >
                    {opciones.map((op) => (
                        <option key={op} value={op}>
                        {op} hrs
                        </option>
                    ))}
                </Select>
                {errorValidacion.hora_cierre && <InputErrorMessage>{errorValidacion.hora_cierre}</InputErrorMessage>}
            </div>
            <div className="flex mt-2 items-center gap-2">
                <input
                    type="checkbox"
                    id="incluyeGuia"
                    checked={formData.guia_incluido}
                    onChange={(e) =>
                    setFormData({ ...formData, guia_incluido: e.target.checked })
                    }
                    className="h-5 w-5 rounded-lg border-gray-100"
                />
                <label htmlFor="incluyeGuia" className="text-gray-800/95 dark:text-[#F9FAFB]">Incluye Guía turístico</label>
            </div>
            <div>
                <DaysSeleccionForm formData={formData} setFormData={setFormData} errorValidacion={errorValidacion}/>
            </div>
            <div className="mb-2">
                <Input type="number" name="cupo_maximo" value={formData.cupo_maximo} onChange={handleChange} placeholder="Capacidad" />
                {errorValidacion.cupo_maximo && <InputErrorMessage>{errorValidacion.cupo_maximo}</InputErrorMessage>}
            </div>
            <div className="mb-2">
            <label className="text-gray-800/90 dark:text-[#F9FAFB]">Duración de la reserva</label>
                <Select
                    name="duracion"
                    value={formData.duracion}
                    onChange={handleChange}
                >
                    {opciones.map((op) => (
                        <option key={op} value={op}>
                        {op} hrs
                        </option>
                    ))}
                </Select>
                {errorValidacion.duracion && <InputErrorMessage>{errorValidacion.duracion}</InputErrorMessage>}
            </div>
        </>
    );
}