export const validateForm = (formData, tipo) => {
    const errors = {};
  
    if (!formData.nombre?.trim()) {
      errors.nombre = "El nombre es obligatorio";
    }
  
    if (!formData.precio || isNaN(formData.precio) || formData.precio <= 0) {
      errors.precio = "El precio debe ser un número mayor a 0";
    }
  
    switch (tipo) {
      case "AV":
        if (!formData.marca?.trim()) errors.marca = "La marca es obligatoria";
        if (!formData.modelo?.trim()) errors.modelo = "El modelo es obligatorio";
        if (!formData.transmision?.trim())
          errors.transmision = "Debe especificar la transmisión";
        if (!formData.cant_asientos || formData.cant_asientos <= 0)
          errors.cant_asientos = "Debe ingresar la cantidad de asientos";
        if (!formData.cant_vehiculos || formData.cant_vehiculos <= 0)
          errors.cant_vehiculos = "Debe ingresar la cantidad de vehículos";
        if (!formData.sucursales?.length)
          errors.sucursales = "Debe seleccionar al menos una sucursal";
        break;
  
      case "H": 
        if (!formData.capacidad || formData.capacidad <= 0)
          errors.capacidad = "Debe indicar la capacidad";
        if (!formData.tipo?.trim()) errors.tipo = "Debe especificar el tipo de habitación";
  
        if (!formData.hora_check_in || formData.hora_check_in === "00:00")
          errors.hora_check_in = "Debe indicar la hora de check-in";
        if (!formData.hora_check_out || formData.hora_check_out === "00:00")
          errors.hora_check_out = "Debe indicar la hora de check-out";
        break;
  
      case "CR": 
        if (!formData.cupo_maximo || formData.cupo_maximo <= 0)
          errors.cupo_maximo = "Debe indicar el cupo máximo";
  
        if (!formData.hora_apertura || formData.hora_apertura === "00:00")
          errors.hora_apertura = "Debe indicar la hora de apertura";
        if (!formData.hora_cierre || formData.hora_cierre === "00:00")
          errors.hora_cierre = "Debe indicar la hora de cierre";
  
        if (!formData.duracion || formData.duracion === "00:00")
          errors.duracion = "Debe indicar la duración";
  
        if (!formData.dias_abierto || !formData.dias_abierto.length)
          errors.dias_abierto = "Debe seleccionar al menos un día de apertura";
        break;
  
      case "TTT": 
        if (!formData.origen?.trim()) errors.origen = "Debe especificar el origen";
  
        if (
          !formData.asientos_disponibles ||
          parseInt(formData.asientos_disponibles, 10) <= 0
        ) {
          errors.asientos_disponibles = "Debe indicar los asientos disponibles";
        }
  
        // if (!formData.itinerario?.length) {
        //   errors.destinos = "Debe agregar al menos un destino";
        // } else {
        //   formData.destinos.forEach((d, i) => {
        //     if (!d.nombre?.trim()) {
        //       errors[`destino_${i}`] = "Debe indicar el nombre del destino";
        //     }
        //     if (!d.duracion || d.duracion === "00:00")
        //       errors[`duracion_${i}`] = "Debe indicar la duración";
        //   });
        // }
  
        // if (!formData.itinerarios?.length) {
        //   errors.itinerarios = "Debe agregar al menos un itinerario";
        // } else {
        //   formData.itinerarios.forEach((it, i) => {
        //     if (!it.dia) errors[`itinerario_dia_${i}`] = "Debe indicar el día";
        //     if (!it.horas_salida?.length)
        //       errors[`itinerario_horas_${i}`] = "Debe indicar al menos una hora de salida";
        //   });
        // }
        break;
  
      default:
        break;
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };
  