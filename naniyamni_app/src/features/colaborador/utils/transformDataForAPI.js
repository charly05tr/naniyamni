export const transformDataForAPI = (formData) => {
    if (!formData) return { data: {}, errors: { general: "No hay datos del formulario" } };
  
    const errors = {};
    const diasMap = {
      lunes: "LU",
      martes: "MA",
      miercoles: "MI",
      jueves: "JU",
      viernes: "VI",
      sabado: "SA",
      domingo: "DO",
    };
  
    const destinos = (formData.destinos?.length ?? 0) < (formData.itinerario?.length ?? 0)
      ? formData.itinerario.map(({ destino, duracion }, i) => {
          if (!destino?.trim()) errors[`destino_${i}`] = "Debe indicar el nombre del destino";
          if (!duracion || duracion === "00:00") errors[`duracion_${i}`] = "Debe indicar la duración";
  
          return {
            nombre: destino || "",
            duracion: duracion ? `${duracion}:00` : null,
          };
        })
      : formData.destinos.map((d, i) => {
          if (!d.nombre?.trim()) errors[`destino_${i}`] = "Debe indicar el nombre del destino";
          if (!d.duracion || d.duracion === "00:00") errors[`duracion_${i}`] = "Debe indicar la duración";
  
          return {
            nombre: d.nombre,
            duracion: d.duracion ?? null,
          };
        });
  
    let itinerarios = [];
    if (formData.horario) {
      itinerarios = Object.entries(formData.horario)
        .filter(([_, horas]) => Array.isArray(horas) && horas.length > 0)
        .map(([dia, horas]) => {
          if (!diasMap[dia]) errors[`horario_${dia}`] = "El día no es válido";
          if (!horas || horas.length === 0) errors[`horario_${dia}`] = "Debe indicar al menos una hora";
  
          const horasSalida = horas.map((hora, j) => {
            if (!hora || hora === "00:00") errors[`hora_${dia}_${j}`] = "La hora no puede ser vacía ni 00:00";
            return { hora: `${hora}:00` };
          });
  
          return {
            dia: diasMap[dia],
            horas_salida: horasSalida,
          };
        });
    } else {
      itinerarios = formData.itinerarios || [];
      if (itinerarios.length === 0) {
        errors.itinerarios = "Debe indicar al menos un itinerario";
      }
    }
  
    return {
      data: {
        nombre: formData.nombre || "",
        tipo_servicio: formData.tipo_servicio || "",
        descripcion: formData.descripcion || "",
        precio: formData.precio ?? 0,
        disponible: formData.disponible ?? true,
        origen: formData.origen || "",
        asientos_disponibles: parseInt(formData.asientos_disponibles, 10) || 0,
        destinos,
        itinerarios,
        caracteristicas: formData.caracteristicas || [],
      },
      errors,
    };
  };