import { useState } from "react";
import { API_KEY } from "@config";
import { actualizarProveedor } from "../services/actualizarProveedor";

export const useCoordenadas = () => {
  const [busqueda, setBusqueda] = useState("");
  const [sugerencias, setSugerencias] = useState([]);
  const [latitud, setLatitud] = useState(null);
  const [longitud, setLongitud] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const obtenerSugerencias = async (texto) => {
    setBusqueda(texto);
    if (texto.length < 3) return; 

    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${texto}&apiKey=${API_KEY}`
      );
      const data = await response.json();
      setSugerencias(data.features || []);
    } catch (error) {
      console.error("Error al obtener sugerencias:", error);
    }
  };

  const seleccionarLugar = (lugar) => {
    const coords = lugar.geometry.coordinates; 
    setLatitud(coords[1]);
    setLongitud(coords[0]);
    setBusqueda(lugar.properties.formatted);
    setSugerencias([]);
  };

  const actualizarProveedorCoords = async (idProveedor) => {
    if (!latitud || !longitud) {
      setError("Debes seleccionar un lugar primero.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const proveedor = {
        latitud: latitud.toFixed(5),
        longitud: longitud.toFixed(5),
      };

      const data = await actualizarProveedor(proveedor, idProveedor);
      return data;
    } catch (err) {
      setError(err.message);
      console.error("Error al actualizar proveedor:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    busqueda,
    setBusqueda,
    sugerencias,
    latitud,
    longitud,
    obtenerSugerencias,
    seleccionarLugar,
    loading,
    error,
    actualizarProveedorCoords
  };
};
