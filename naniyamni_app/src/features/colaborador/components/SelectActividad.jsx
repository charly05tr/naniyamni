import { actividades } from "@config";
  
  export const SelectActividad = ({ value, onChange }) => {
    return (
        <div className="bg-gradient-to-r from-blue-200 to-yellow-100 rounded-sm border-none p-[1px] hover:from-blue-300 hover:to-yellow-200">
            <select
            value={value}
            onChange={onChange}
            className="bg-white w-full border p-2 border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
            >
            <option value="">Seleccione una categoría</option>
            {actividades.map((act) => (
                <option key={act.value} value={act.value}>
                {act.label}
                </option>
            ))}
            </select>
      </div>
    );
  };