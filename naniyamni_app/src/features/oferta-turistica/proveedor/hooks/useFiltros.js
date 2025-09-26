import { useMemo } from "react";

export const useFiltros = (servicios = [], filtro = "all", tipo) => {
  const serviciosFiltrados = useMemo(() => {
    const lista = Array.isArray(servicios) ? servicios : [];

    // Filtrar solo los disponibles
    const disponibles = lista.filter(servicio => servicio.disponible === true);

    if (filtro === "all" || (Array.isArray(filtro) && filtro.length === 0)) {
      return disponibles;
    }

    if (tipo === "H") {
      if (Array.isArray(filtro)) {
        return disponibles.filter(servicio => filtro.includes(servicio.tipo));
      }
      return disponibles.filter(servicio => servicio.tipo === filtro);
    } else if (tipo === "AV") {
      return disponibles.filter(servicio => servicio.categoria?.nombre === filtro);
    }

    return disponibles;
  }, [servicios, filtro, tipo]);

  return { serviciosFiltrados };
};
