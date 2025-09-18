import { Title } from "@TextStyled";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { NumericInput } from "@NumericInput"; 
import { Filtros } from "./Filtros";
import { useDisponibilidad } from "../../context/disponibilidadContext";

export const DisponibilidadForm = ({ tipo, setFiltro }) => {
    const {
        range,
        setRange,
        setCantAdultos,
        setCantHabitaciones,
        setCantNinos, 
        cantAdultos,
        cantHabitaciones,
        cantNinos,
      } = useDisponibilidad();
 
    return (
        <div className="bg-white h-full flex w-full flex-col items-start p-4 rounded-xl border border-gray-200">
            <div className="flex gap-2 items-start justify-between w-full">
                <Title text="Disponibilidad"/>
            </div>
            <div className="h-full flex-wrap flex w-full gap-4">
                <div className="flex-shrink flex-1 md:min-w-87 min-w-80  h-fit bg-gradient-to-r bg-zinc-200 rounded-sm border-none p-[1px] hover:from-blue-300 hover:to-yellow-200">
                    <DateRange
                        ranges={range}
                        onChange={(item) => setRange([item.selection])}
                        moveRangeOnFirstSelection={false}
                    /> 
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
                            <>
                                 <NumericInput value={cantAdultos} onChange={setCantAdultos} min={1} max={10} step={1} text="Cantidad personas" />
                                 <NumericInput value={cantHabitaciones} onChange={setCantHabitaciones} min={1} max={1} step={1} text="Vehículos" />
                            </>
                        )}
                    </div>
                    <Filtros tipo={tipo} setFiltro={setFiltro}/>
                        {/* <div className="text-sm md:text-base text-nowrap flex-shrink self-end w-fit h-fit bg-gradient-to-r from-blue-200 to-yellow-100 rounded-sm border-none p-[1px] hover:from-blue-300 hover:to-yellow-200">
                            <button onClick={() => {}} className="bg-blue-200 p-2 rounded tracking-wide cursor-pointer hover:bg-blue-300 text-zinc-800">Ver disponibilidad</button>
                        </div> */}
                </div>
            </div>
        </div>
    )
}