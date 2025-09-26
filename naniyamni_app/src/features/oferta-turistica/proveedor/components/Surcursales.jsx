import { Select } from "@FormStyled";
import { useEffect } from "react";

export const SelectLugarInicio = ({ sucursales, setLugarInicio, lugarInicio }) => {
    if (!sucursales || sucursales.length === 0)  {
        return (
            <Select><option>No hay sucursales</option></Select>
        );
    } 

    return (
        <Select 
            name="Sucursal" 
            onChange={(e) => setLugarInicio(e.target.value)}
            value={lugarInicio}   
        >
            <option>Sucursal</option>
            {sucursales?.map(sucursal => (
                <option key={sucursal.id}>{sucursal.direccion}</option>
            ))}
        </Select>
    );
};

export const SelectLugarDevolucion = ({reserva = [], sucursales, setLugarDevolucion, lugarDevolucion }) => {
    useEffect(() => {
        if (reserva?.estado) {
            return;
        }
        setLugarDevolucion(sucursales[0].direccion)
    }, []);
    if (reserva?.estado) {
        return;
    }

    return (
        <select 
            name="Sucursal" 
            className="py-1 font-bold focus:outline-none cursor-pointer max-w-83 dark:bg-[#181818]"
            onChange={(e) => setLugarDevolucion(e.target.value)}
            value={lugarDevolucion}
        >
        {sucursales?.map(sucursal => (
            <option key={sucursal?.id}>{sucursal?.direccion}</option>
        ))}
    </select>
    );
};