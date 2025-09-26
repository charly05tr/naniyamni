import { Title } from "@TextStyled";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { NumericInput } from "@NumericInput"; 
import { Filtros } from "./Filtros";
import { useDisponibilidad } from "../../context/disponibilidadContext";
import { SelectLugarInicio } from "./Surcursales";

export const DisponibilidadForm = ({ tipo, setFiltro, sucursales }) => {
    const {
        range,
        setRange,
        setCantAdultos,
        setCantHabitaciones,
        setCantNinos, 
        cantAdultos,
        cantHabitaciones,
        cantNinos,
        lugarInicio,
        setLugarInicio,
      } = useDisponibilidad();
 
    return (
        <div className="dark:text-[#F9FAFB] gap-4 h-full flex w-full flex-col items-start p-4 rounded-xl border dark:border-[#AAAAAA]/10 border-gray-200 shadow-sm transition-transform transform  hover:shadow-md duration-300">
            <div className="flex gap-2 items-start justify-between w-full">
                <h2 className="tracking-wide text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 flex-1 dark:text-[#F9FAFB] ">Disponibilidad</h2>
            </div>
            <div className="h-full flex-wrap flex w-full gap-4">
                <div className=" text-gray-900 flex-shrink rounded flex-1  h-fit bg-gradient-to-r shadow-md border-none p-[1px] hover:from-blue-300/40 hover:to-yellow-200/40">
                    <div className="dark:bg-[#181818] dark:text-[#F9FAFB] dark:border-[#AAAAAA]/10 dark:border rounded dark:hover:text-[#F9FAFB] bg-[#F9FAFB] text-[#181818]">
                        <DateRange
                            ranges={range}
                            onChange={(item) => setRange([item.selection])}
                            moveRangeOnFirstSelection={false}
                        /> 
                    </div>
                </div>
                <div className="items-center justify-between flex-shrink flex-1 flex-wrap gap-4 flex flex-col min-w-36">
                    <div className="justify-between flex-shrink flex flex-wrap h-auto gap-4 min-w-36 w-full">
                        {(tipo === "H" || tipo === "OF" || tipo === "CH") && (
                            <>
                                   <NumericInput value={cantAdultos} onChange={setCantAdultos} min={1} max={10} step={1} text="Cantidad adultos" />
                                    <NumericInput value={cantNinos} onChange={setCantNinos} min={0} max={10} step={1} text="Cantidad niños" />
                                    <NumericInput value={cantHabitaciones} onChange={setCantHabitaciones} min={1} max={1} step={1} text="Habitaciones" />
                            </>
                        )}
                        {(tipo === "AV") && (
                            <div className="w-full flex  gap-4 flex-1 flex-wrap justify-between">
                                <>
                                    <NumericInput value={cantAdultos} onChange={setCantAdultos} min={1} max={10} step={1} text="Cantidad personas" />
                                    <NumericInput value={cantHabitaciones} onChange={setCantHabitaciones} min={1} max={1} step={1} text="Vehículos" />
                                </>
                                <div className="w-full">
                                    <SelectLugarInicio sucursales={sucursales} setLugarInicio={setLugarInicio} lugarInicio={lugarInicio}/>
                                </div>
                            </div>
                        )}
                    </div>
                    {(tipo === "H" || tipo === "AV")&&
                    <Filtros tipo={tipo} setFiltro={setFiltro}/>}
                </div>
            </div>
        </div>
    )
}