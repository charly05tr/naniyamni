export const API_URL = "https://api.naniyamni.app";

export const actividades = [
    // { value: "HF", label: "Hostal-familiar" },
    { value: "H", label: "Hotel" },
    // { value: "R", label: "Restaurante" },
    // { value: "B", label: "Bar" },
    { value: "CR", label: "Centro turístico" },
    // { value: "C", label: "Cafetería" },
    { value: "TTT", label: "Transporte" },
    // { value: "OV", label: "Operadora de viaje" },
    { value: "AV", label: "Renting de Vehículos" },
    { value: "CH", label: "Casa de Huésped" },
    // { value: "D", label: "Discoteca" },
    // { value: "CP", label: "Canopy" },
    // { value: "CDN", label: "Centro de Diversión Nocturna" },
    // { value: "AL", label: "Albergue" },
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
      timeRange = convertirHora("14:00");
    } else if (type === "salida") {
      timeRange = convertirHora("12:00");
    }
  
    return `${formatter.format(date)}\n${timeRange}`;
  };


  export const API_KEY = "a7104ef1a4314122976b32b3f589f44b";
  export const formatDate = (dateTimeString, type = null, puntito=true) => {
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
      timeText= convertirHora(timePartRaw);
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
    const separador = (puntito)?" • ":" ";
    return `${formatter.format(d)}${timeText ? separador + timeText : ""}`;
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

export const DAYS = [
  { key: "mon", label: "Lunes" },
  { key: "tue", label: "Martes" },
  { key: "wed", label: "Miércoles" },
  { key: "thu", label: "Jueves" },
  { key: "fri", label: "Viernes" },
  { key: "sat", label: "Sábado" },
  { key: "sun", label: "Domingo" },
];


export const convertirHora = (horaMilitar) => {
  // separar horas y minutos (ignorando los segundos)
  let [hora, minutos] = horaMilitar.split(":").map(Number);

  // determinar AM o PM
  let sufijo = hora >= 12 ? "PM" : "AM";

  // convertir a formato de 12 horas
  hora = hora % 12;
  hora = hora ? hora : 12; // si es 0 se convierte en 12

  return `${hora}:${minutos.toString().padStart(2, "0")} ${sufijo}`;
}

export const diasSemanaIndice = {
  Domingo: 0,
  Lunes: 1,
  Martes: 2,
  Miércoles: 3,
  Jueves: 4,
  Viernes: 5,
  Sábado: 6
};

export const esDiaPermitido = (fecha, diasPermitidos) => {
  // fecha puede ser un string tipo "2025-09-21" o un Date
  let date = new Date(fecha);

  // obtener el día (0 = domingo ... 6 = sábado)
  let dia = date.getDay();

  // verificar si está en los días permitidos
  return diasPermitidos.includes(dia);
}

export const formatearFechaParaDjango = (inputValue) => {
  if (!inputValue) return null; // si está vacío

  // convertir a objeto Date
  const fecha = new Date(inputValue);

  // obtener año, mes y día con padding
  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, "0"); // meses base 0
  const day = String(fecha.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`; // formato YYYY-MM-DD
}


export const separarFechaHora = (fecha_hora_salida) =>  {
  const fechaObj = new Date(fecha_hora_salida);

  // Extraer fecha en formato YYYY-MM-DD
  const fecha = fechaObj.toISOString().split("T")[0];

  // Extraer hora en formato HH:MM
  const hora = fechaObj.toISOString().split("T")[1].slice(0, 5);

  return { fecha, hora };
}


export const convertirAMPMaMilitar = (horaAMPM) => {
  // horaAMPM: por ejemplo "03:45 PM" o "12:10 AM"
  const [horaMin, periodo] = horaAMPM.trim().split(" ");
  let [hora, minutos] = horaMin.split(":").map(Number);

  if (periodo.toUpperCase() === "AM") {
    if (hora === 12) hora = 0; // 12 AM → 00
  } else if (periodo.toUpperCase() === "PM") {
    if (hora !== 12) hora += 12; // 1 PM → 13, 2 PM → 14, etc.
  }

  // Asegurar siempre 2 dígitos
  const horaStr = hora.toString().padStart(2, "0");
  const minutosStr = minutos.toString().padStart(2, "0");

  return `${horaStr}:${minutosStr}`;
}


export const quitarSegundos = (hora) => {
  // Si viene en formato HH:MM:SS
  if (!hora) return "";
  return hora.split(":").slice(0, 2).join(":"); // Devuelve HH:MM
}