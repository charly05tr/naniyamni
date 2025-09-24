import { actividades } from "@config";
  
  export const SelectActividad = ({ value, onChange }) => {
    return (
        
            <select
            value={value}
            onChange={onChange}
            className="bg-gray-50 w-full dark:border-[#AAAAAA]/30 px-4 py-3 border dark:text-[#F9FAFB] dark:bg-[#181818] border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#AAAAAA]/50 transition-all duration-200"
            >
            <option value="">Seleccione una categoría</option>
            {actividades.map((act) => (
                <option key={act.value} value={act.value}>
                {act.label}
                </option>
            ))}
            </select>
    );
  };