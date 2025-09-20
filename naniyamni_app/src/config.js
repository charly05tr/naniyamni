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

export const formatDateOld = (date, type) => {
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


  export const formatDate = (dateTimeString, type = null) => {
    if (!dateTimeString || typeof dateTimeString !== "string") {
      return "Fecha no válida";
    }
  
    // Dividir en fecha y hora
    const [datePart, timePartRaw] = dateTimeString.split("T");
    if (!datePart) return "Fecha no válida";
  
    // Procesar fecha
    const [year, month, day] = datePart.split("-").map(Number);
    const d = new Date(year, month - 1, day);
  
    // Procesar hora
    let timeText = "";
    if (timePartRaw) {
      const [hh, mm] = timePartRaw.replace("Z", "").split(":");
      timeText = `${hh.padStart(2, "0")}:${mm.padStart(2, "0")}`;
    }
  
    // Formatear fecha en español
    const formatter = new Intl.DateTimeFormat("es-ES", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  
    // Determinar si usar rango por type o la hora del string
    if (type === "entrada") {
      timeText = "14:00 - 23:30";
    } else if (type === "salida") {
      timeText = "07:30 - 12:00";
    }
  
    return `${formatter.format(d)}${timeText ? " • " + timeText : ""}`;
  };

  
  export const formatLocalDateTime = (date, time) => {
    const pad = (n) => n.toString().padStart(2, "0");

    const [hours, minutes] = time ? time.split(":").map(Number) : [0, 0];
    const d = new Date(date);
    d.setHours(hours, minutes, 0, 0);
  
    const y = d.getFullYear();
    const m = pad(d.getMonth() + 1);
    const day = pad(d.getDate());
    const h = pad(d.getHours());
    const min = pad(d.getMinutes());
  
    return `${y}-${m}-${day}T${h}:${min}`;
};

export const generarOpcionesHoras = () => {
  const opciones = [];
  for (let h = 0; h < 24; h++) {
      for (let m of [0, 30]) {
          const hora = String(h).padStart(2, "0");
          const minutos = String(m).padStart(2, "0");
          opciones.push(`${hora}:${minutos}`);
      }
  }
  return opciones;
};


export const generarOpcionesNumeros = (n) => {
  const opciones = [];
  for (let i = 1; i <= n; i++) {
    opciones.push(i);
  }
  return opciones;
};


export const diasSemana = {
  "LU": "Lunes",
  "MA": "Martes",
  "MI": "Miércoles",
  "JU": "Jueves",
  "VI": "Viernes",
  "SA": "Sábado",
  "DO": "Domingo"
}