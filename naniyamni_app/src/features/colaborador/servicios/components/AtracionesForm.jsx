import { Input, Select } from "@FormStyled";
import { generarOpcionesHoras } from "@config";
import DaysSeleccionForm from "./DaySelectionForm";

export const AtraccionesForm = ({ formData, handleChange, setFormData }) => {
    
    const opciones =generarOpcionesHoras();
    
    return (
        <>
            <div className="my-2">
                <label className="text-gray-800/90">Hora de apertura</label>
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
            </div>
            <div className="mb-2">
                <label className="text-gray-800/90">Hora de cierre</label>
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
                <label htmlFor="incluyeGuia" className="text-gray-800/95">Incluye Guía turístico</label>
            </div>
            <div>
                <DaysSeleccionForm formData={formData} setFormData={setFormData}/>
            </div>
            <div className="mb-2">
                <Input type="number" name="cupo_maximo" value={formData.cupo_maximo} onChange={handleChange} placeholder="Capacidad" />
            </div>
            <div className="mb-2">
            <label className="text-gray-800/90">Duración de la reserva</label>
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
            </div>
        </>
    );
}