import { Select } from "@FormStyled";
import { useEffect } from "react";

export const SelectLugarInicio = ({ sucursales, setLugarInicio, lugarInicio }) => {
    if (sucursales == [])  {
        return (
            <Select><option>No hay sucursales</option></Select>
        );
    }   else if (sucursales.direccion) {
        return (
            <Select>
                <option>{sucursales.direccion}</option>
            </Select>
        );
    };  

    return (
        <Select 
            name="Sucursal" 
            onChange={(e) => setLugarInicio(e.target.value)}
            value={lugarInicio}   
        >
            <option>Sucursal</option>
            {sucursales.map(sucursal => (
                <option key={sucursal.id}>{sucursal.direccion.toLowerCase()}</option>
            ))}
        </Select>
    );
};

export const SelectLugarDevolucion = ({ sucursales, setLugarDevolucion, lugarDevolucion }) => {
    
    useEffect(() => {
            setLugarDevolucion(sucursales[0].direccion.toLowerCase() || "")
    }, []);
    if (sucursales == [])  {
        return (
            <p>No hay sucursales</p>
        );
    } else if (sucursales == {}) {
        return (
            <select className="w-fit py-1 font-bold focus:outline-none cursor-pointer">
                <option>{sucursales.direccion.toLowerCase()}</option>
            </select>
        );
    };
    return (
        <select 
            name="Sucursal" 
            className="py-1 font-bold focus:outline-none cursor-pointer max-w-83"
            onChange={(e) => setLugarDevolucion(e.target.value)}
            value={lugarDevolucion}
        >
        {sucursales.map(sucursal => (
            <option key={sucursal.id}>{sucursal.direccion.toLowerCase()}</option>
        ))}
    </select>
    );
};