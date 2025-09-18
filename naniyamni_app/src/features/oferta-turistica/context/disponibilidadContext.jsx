import React, { createContext, useContext } from "react";
import { useDisponibilidad as useDisponibilidadHook } from "../proveedor/hooks/useDisponibilidadHook";

export const DisponibilidadContext = createContext(null);

export const DisponibilidadProvider = ({ children }) => {
  const disponibilidad = useDisponibilidadHook();

  return (
    <DisponibilidadContext.Provider value={disponibilidad}>
      {children}
    </DisponibilidadContext.Provider>
  );
};

export const useDisponibilidad = () => {
  const ctx = useContext(DisponibilidadContext);
  if (!ctx) {
    throw new Error(
      "useDisponibilidad debe usarse dentro de DisponibilidadProvider"
    );
  }
  return ctx;
};