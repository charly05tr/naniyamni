import { useMemo } from "react";

export const useFiltros = (servicios = [], filtro = "all", tipo) => {
    const serviciosFiltrados = useMemo(() => {
        const lista = Array.isArray(servicios) ? servicios : [];
        console.log(servicios);
        if (filtro === "all" || (Array.isArray(filtro) && filtro.length === 0)) {
            return lista;
        }

        if (tipo === "H") {
            if (Array.isArray(filtro)) {
                return lista.filter((servicio) => filtro.includes(servicio.tipo));
            }
    
            return lista.filter((servicio) => servicio.tipo === filtro);
        }
        else if (tipo === "AV") {
            return lista.filter((servicio) => servicio.categoria.nombre === filtro);
        }

    }, [servicios, filtro, tipo]);

    return { serviciosFiltrados };
};
