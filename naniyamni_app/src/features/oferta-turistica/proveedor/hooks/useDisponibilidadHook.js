import { useState, useEffect } from "react";

export const useDisponibilidad = () => {
  const [disponibilidad, setDisponibilidad] = useState({
    range: [
      { startDate: new Date(), endDate: new Date(), key: "selection" }
    ],
    cantAdultos: 1,
    cantNinos: 0,
    cantHabitaciones: 1,
    //AV
    lugarInicio: "",
    lugarDevolucion: "",
    horaInicio: "",
    horaDevolucion: "",
  });

  useEffect(() => {
    sessionStorage.setItem("range", JSON.stringify(disponibilidad.range));
  }, [disponibilidad.range]);

  const setRange = (range) =>
    setDisponibilidad((prev) => ({ ...prev, range }));

  const setCantAdultos = (cantAdultos) =>
    setDisponibilidad((prev) => ({ ...prev, cantAdultos }));

  const setCantNinos = (cantNinos) =>
    setDisponibilidad((prev) => ({ ...prev, cantNinos }));

  const setCantHabitaciones = (cantHabitaciones) =>
    setDisponibilidad((prev) => ({ ...prev, cantHabitaciones }));

  //AV
  const setLugarInicio = (lugarInicio) =>
    setDisponibilidad((prev) => ({ ...prev, lugarInicio }));
  
  const setLugarDevolucion = (lugarDevolucion) =>
    setDisponibilidad((prev) => ({ ...prev, lugarDevolucion }));
  
  const setHoraInicio = (horaInicio) =>
    setDisponibilidad((prev) => ({ ...prev, horaInicio }));
  
  const setHoraDevolucion = (horaDevolucion) =>
    setDisponibilidad((prev) => ({ ...prev, horaDevolucion })); 

  return {
    ...disponibilidad,
    setRange,
    setCantAdultos,
    setCantNinos,
    setCantHabitaciones,
    //AV
    setLugarInicio,
    setLugarDevolucion,
    setHoraInicio,
    setHoraDevolucion,
  };
};