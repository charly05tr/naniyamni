import { useContext } from "react";
import { DisponibilidadContext } from "../context/disponibilidadContext"

export const useDisponibilidad = () => {
    const ctx = useContext(DisponibilidadContext);
    if (!ctx) {
      throw new Error(
        "useDisponibilidad debe usarse dentro de DisponibilidadProvider. Envuelve tu árbol con <DisponibilidadProvider>."
      );
    }
    return ctx;
  };
  