export const API_URL = "http://127.0.0.1:8000/";

export const actividades = [
    { value: "HF", label: "Hostal-familiar" },
    { value: "H", label: "Hotel" },
    { value: "R", label: "Restaurante" },
    { value: "B", label: "Bar" },
    { value: "CR", label: "Centro recreativo" },
    { value: "C", label: "Cafetería" },
    { value: "TTT", label: "Transporte turístico terrestre" },
    { value: "OV", label: "Operadora de viaje" },
    { value: "AV", label: "Arrendamiento de Vehículos" },
    { value: "CH", label: "Casa de Huésped" },
    { value: "D", label: "Discoteca" },
    { value: "CP", label: "Canopy" },
    { value: "CDN", label: "Centro de Diversión Nocturna" },
    { value: "AL", label: "Albergue" },
  ];

export const tiposServicios = {
    H: "habitacion",
    V: "vehiculo",
    A: "atraccion",
    VI: "viaje",
    G: "generico"
}

export const iconMap = {
    HF: "home",        // Hostal-familiar
    H: "hotel",        // Hotel
    R: "utensils",     // Restaurante
    B: "beer",         // Bar
    CR: "tree",        // Centro recreativo
    C: "coffee",       // Cafetería
    TTT: "bus",        // Transporte turístico terrestre
    OV: "plane",       // Operadora de viaje
    AV: "car",         // Arrendamiento de Vehículos
    CH: "bed",         // Casa de Huésped
    D: "music",        // Discoteca
    CP: "mountain",    // Canopy
    CDN: "glass-martini-alt", // Centro de Diversión Nocturna
    AL: "campground",  // Albergue
  };

export const formatDate = (date, type) => {
    if (!(date instanceof Date) || isNaN(date)) return "Fecha no válida";
  
    const formatter = new Intl.DateTimeFormat("es-ES", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  
    let timeRange = "";
    if (type === "entrada") {
      timeRange = "14:00 - 23:30";
    } else if (type === "salida") {
      timeRange = "7:30 - 12:00";
    }
  
    return `${formatter.format(date)}\n${timeRange}`;
  };