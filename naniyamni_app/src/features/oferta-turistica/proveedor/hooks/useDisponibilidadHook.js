import { useState, useEffect } from "react";

export const useDisponibilidad = () => {
  const [disponibilidad, setDisponibilidad] = useState({
    range: [
      { startDate: new Date(), endDate: new Date(), key: "selection" }
    ],
    cantAdultos: 1,
    cantNinos: 0,
    cantHabitaciones: 1,
  });

  // Persistir solo las fechas en sessionStorage
  useEffect(() => {
    sessionStorage.setItem("range", JSON.stringify(disponibilidad.range));
  }, [disponibilidad.range]);

  // Funciones para actualizar cada valor
  const setRange = (range) =>
    setDisponibilidad((prev) => ({ ...prev, range }));

  const setCantAdultos = (cantAdultos) =>
    setDisponibilidad((prev) => ({ ...prev, cantAdultos }));

  const setCantNinos = (cantNinos) =>
    setDisponibilidad((prev) => ({ ...prev, cantNinos }));

  const setCantHabitaciones = (cantHabitaciones) =>
    setDisponibilidad((prev) => ({ ...prev, cantHabitaciones }));

  return {
    ...disponibilidad,
    setRange,
    setCantAdultos,
    setCantNinos,
    setCantHabitaciones,
  };
};