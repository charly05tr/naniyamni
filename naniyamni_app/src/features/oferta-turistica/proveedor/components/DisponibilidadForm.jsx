import { Title } from "@TextStyled";
import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { NumericInput } from "@NumericInput"; 

export const DisponibilidadForm = () => {
    const [range, setRange] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
        },
      ]);
    
    return (
        <div className="flex flex-col items-start p-4 pr-1 rounded border border-gray-200">
            <div className="flex gap-2 items-start justify-between w-full">
                <Title text="Disponibilidad"/>
            </div>
            <div className="flex flex-wrap w-full gap-2">
            <div className="w-fit h-fit bg-gradient-to-r from-blue-200 to-yellow-100 rounded-sm border-none p-[1px] hover:from-blue-300 hover:to-yellow-200">
                <DateRange
                    ranges={range}
                    onChange={(item) => setRange([item.selection])}
                    moveRangeOnFirstSelection={false}
                /> 
                </div>
                <div className="flex flex-2 flex-wrap items-center h-fit gap-2 min-w-36 w-full">
                    <NumericInput min={1} max={10} step={1} initial={1} text="Cantidad adultos"/>
                    <NumericInput min={0} max={10} step={1} initial={0} text="Cantidad niños"/>
                    <NumericInput min={1} max={10} step={1} initial={1} text="Habitaciones"/>
                </div>
            </div>
        </div>
    )
}