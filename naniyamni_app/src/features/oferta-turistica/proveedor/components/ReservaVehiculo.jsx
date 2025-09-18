import { useState } from "react";

export const ReservaVehiculo = ({entrada, salida, servicio, dias, cantVehiculos, lugarInicio, LugarDevolucion}) => {
    const [horaInicio, setHoraInicio] = useState(entrada.split("\n")[1]);
    const [horaDevolucion, setHoraDevolucion] = useState(salida.split("\n")[1]);

    const generarOpcionesHoras = () => {
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
    
    const opciones = generarOpcionesHoras();

  const tarifaDiaria = servicio.precio; 
  const recargoPorHora = 0.15; 
    const horasExtras =
    horaInicio !== horaDevolucion
      ? calcularHorasExtras(horaInicio, horaDevolucion)
      : 0;

    const recargo = horasExtras > 0 ? Math.min(horasExtras * recargoPorHora * tarifaDiaria, tarifaDiaria) : 0;

    const handleChangeHoraInicio = (hora) => {
        setHoraInicio(hora);
        if (horaDevolucion === salida.split("\n")[1]) {
            setHoraDevolucion(hora);
        }
    }

    return (
        <>
            <div className="flex flex-shrink flex-1 flex-col gap-2 border border-gray-200 md:p-4 p-2 rounded-lg w-fit md:min-w-100 min-w-90">
                <h1 className="text-3xl font-semibold tracking-wide my-2">Tu reserva</h1>
                <div className="flex gap-2 px-2 py-4 border border-gray-200">
                    <div className="flex flex-col gap-1 p-2 border-r pr-4 border-gray-300">
                        <p className="text-sm">Fecha Inicio</p>
                        <p className="font-bold">{entrada.split("\n")[0]}</p>
                        <p className="mt-3 text-sm">Hora Inicio</p>
                        <select
                            value={horaInicio}
                            onChange={(e) => handleChangeHoraInicio(e.target.value)}
                            className="w-fit py-1 font-bold focus:outline-none cursor-pointer"
                        >
                            {opciones.map((op) => (
                                <option key={op} value={op}>
                                {op} hrs
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-1 p-2">
                        <p className="text-sm">Fecha Devolución</p>
                        <p className="font-bold">{salida.split("\n")[0]}</p>
                        <p className="mt-3 text-sm">Hora Devolución</p>
                        <select
                            value={horaDevolucion}
                            onChange={(e) => setHoraDevolucion(e.target.value)}
                            className="w-fit py-1 font-bold focus:outline-none cursor-pointer"
                        >
                            {opciones.map((op) => (
                                <option key={op} value={op}>
                                {op} hrs
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex flex-col gap-2 mt-2 p-4 border border-gray-200">
                    <p className="text-sm">Has seleccionado</p>
                    <strong className="flex gap-2 mb-3 flex-wrap">
                            {cantVehiculos} {(cantVehiculos > 1)?"vehículos":"vehículo"} para {dias} {(dias > 1)?"días":"día"}
                    </strong>
                    <p className="text-sm">1 x {servicio.nombre}</p>
                </div>
            {horasExtras > 0 && (
                <div className="p-2 bg-yellow-100 text-yellow-800 rounded text-sm text-wrap w-fit max-w-100">
                ⚠ Tu hora de devolución no coincide con la de inicio.  
                Se aplicará un recargo de <strong>NIO {recargo.toFixed(2)}$</strong>  
                ({horasExtras} hora(s) extra).
                </div>
            )}
            </div>
        </>
    )
} 


function calcularHorasExtras(horaInicio, horaDevolucion) {
    const [h1, m1] = horaInicio.split(":").map(Number);
    const [h2, m2] = horaDevolucion.split(":").map(Number);
  
    const inicioMin = h1 * 60 + m1;
    const finMin = h2 * 60 + m2;
  
    const diff = (finMin - inicioMin) / 60;
  
    return diff > 0 ? diff : 0;
  }