import { useState } from "react";
import { Select } from "@FormStyled";

export const Filtros = ({ tipo, setFiltro }) => {
    const [seleccionados, setSeleccionados] = useState([]);

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;

        let nuevosSeleccionados;
        if (checked) {
            nuevosSeleccionados = [...seleccionados, value];
        } else {
            nuevosSeleccionados = seleccionados.filter((item) => item !== value);
        }

        setSeleccionados(nuevosSeleccionados);

        if (nuevosSeleccionados.length === 0) {
            setFiltro("all");
        } else {
            setFiltro(nuevosSeleccionados);
        }
    };

    return (
        <div className="w-full h-fit bg-gradient-to-r shadow-md rounded-sm border-none p-[1px] hover:from-[#2CA6A4]/40 hover:to-[#F4B731]/40">
            <div className="bg-gray-50 flex-shrink flex flex-col flex-wrap gap-4 justify-between rounded p-4 dark:text-[#F9FAFB] dark:bg-[#181818] dark:border dark:border-[#AAAAAA]/10">
                <h1 className="flex-shrink text-xl text-gray-800/95 font-semibold dark:text-[#F9FAFB]">Filtrar por:</h1>
                <div className="flex gap-4 flex-2 flex-wrap">
                    {(tipo === "H" || tipo === "HF" || tipo === "CH") && (
                        <>
                            <div className="flex-shrink flex items-center gap-2 text-zinc-600"> 
                                <input
                                    type="checkbox"
                                    className="h-5 w-5 rounded border-gray-300"
                                    value="SU"
                                    checked={seleccionados.includes("SU")}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="text-gray-800/95 font-medium dark:text-[#F9FAFB]">Suite</label>
                            </div>
                            <div className="flex-shrink flex items-center gap-2 text-zinc-600"> 
                                <input
                                    type="checkbox"
                                    value="S"
                                    className="h-5 w-5 rounded border-gray-300"
                                    checked={seleccionados.includes("S")}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="text-gray-800/95 font-medium dark:text-[#F9FAFB]">Single</label>
                            </div>
                            <div className="flex-shrink flex items-center gap-2 text-zinc-600 dark:text-[#F9FAFB]"> 
                                <input
                                    type="checkbox"
                                    value="D"
                                    className="h-5 w-5 rounded border-gray-300"
                                    checked={seleccionados.includes("D")}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="text-gray-800/95 font-medium dark:text-[#F9FAFB]">Double</label>
                            </div>
                        </>
                    )}
                    {(tipo === "AV") && (
                        <Select 
                            name="categoria" 
                            onChange={(e) => setFiltro(e.target.value || "all")}
                        >
                            <option value="">Categoría</option>
                            <option value="Económico 4x2">Económico 4x2</option>
                            <option value="Mini Manual">Mini Manual</option>
                            <option value="Grande">Grande</option>
                            <option value="Van Grande">Van Grande</option>
                        </Select>
                    )}
                </div>
            </div>
        </div>
    )
}
