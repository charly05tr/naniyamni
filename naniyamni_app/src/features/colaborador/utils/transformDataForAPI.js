export const transformDataForAPI = (formData) => {
    const diasMap = {
        lunes: "LU",
        martes: "MA",
        miercoles: "MI",
        jueves: "JU",
        viernes: "VI",
        sabado: "SA",
        domingo: "DO",
    };

    // Mapea los destinos y extrae la hora de llegada del campo 'fecha_llegada'
    const destinos = formData.itinerario?.map(item => {
        let duracion = null;
        if (item.duracion) {
            // Extraer solo la parte de la hora y agregar segundos
            const timePart = item.duracion;
            duracion = `${timePart}:00`;
        }
        return {
            nombre: item.destino,
            duracion: duracion,
        };
    });

    // Agrupa las horas de salida por día para la sección de itinerarios
    const itinerarios = [];
    Object.entries(formData.horario).forEach(([dia, horas]) => {
        // Solo agregar días que tengan al menos una hora programada
        if (horas && horas.length > 0) {
            const horasSalida = horas.map(hora => ({
                hora: `${hora}:00`,
            }));
            itinerarios.push({
                dia: diasMap[dia],
                horas_salida: horasSalida,
            });
        }
    });

    return {
        nombre:formData.nombre,
        descripcion:formData.descripcion,
        precio:formData.precio,
        disponible:formData.disponible,
        origen: formData.origen,
        asientos_disponibles: parseInt(formData.asientos_disponibles, 10) || 0,
        destinos,
        itinerarios,
    };
  };
  