import React, { useState, useEffect } from "react";
import { generarOpcionesHoras, quitarSegundos} from "@config";
import InputErrorMessage from "@InputErrorMessage";

const BusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a4 4 0 0 0-4 4v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-14a4 4 0 0 0-4-4z" />
    <path d="M12 18h.01" />
    <path d="M12 12h.01" />
    <path d="M8 8h8" />
  </svg>
);

const LocationPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);


const ParentComponent = ({ formDataTrans, setFormDataTrans, esNuevo=true, errorValidacion }) => {
    const [formData, setFormData] = useState({
        asientos_disponibles: "",
        origen: "",
        itinerario: [{ destino: "", duracion: "" }],
        horario: { lunes: [], martes: [], miercoles: [], jueves: [], viernes: [], sabado: [], domingo: [] },
      });

      
      useEffect(() => {
        if (!formDataTrans || esNuevo) return;
      
        if (formData.origen === "" && formData.itinerario.length === 1) {
          const diaMap = { LU:"lunes", MA:"martes", MI:"miercoles", JU:"jueves", VI:"viernes", SA:"sabado", DO:"domingo" };
          const horarioInicial = { lunes:[], martes:[], miercoles:[], jueves:[], viernes:[], sabado:[], domingo:[] };
      
          formDataTrans.itinerarios?.forEach(({ dia, horas_salida }) => {
            const key = diaMap[dia];
            horarioInicial[key] = horas_salida.map(h => h.hora);
          });
      
          setFormData({
            asientos_disponibles: formDataTrans.asientos_disponibles || "",
            origen: formDataTrans.origen || "",
            itinerario: formDataTrans.destinos?.length
              ? formDataTrans.destinos.map(d => ({ destino: d.nombre, duracion: quitarSegundos(d.duracion) }))
              : [{ destino: "", duracion: "" }],
            horario: horarioInicial,
          });
        }
      }, [formDataTrans]);


      useEffect(() => {
        if (!formDataTrans) return;
        
        setFormDataTrans(prev => ({
          ...prev,
          asientos_disponibles: formData.asientos_disponibles,
          origen: formData.origen,
          itinerario: formData.itinerario,
          horario: formData.horario,
        }));
      }, [formData]);

    return (
        <div className="flex flex-col items-center  min-h-screen pt-12 sm:px-6 lg:px-4 font-sans antialiased">
            <div className="w-full max-w-4xl">
                <p className="text-center text-gray-500 mb-10 text-2xl dark:text-[#F9FAFB]/70">
                    Completa la información para crear una nueva ruta de autobús.
                </p>
                <TransporteForm formData={formData} setFormData={setFormData} errorValidacion={errorValidacion} />
            </div>
        </div>
    );
};

const TransporteForm = ({ formData, setFormData, errorValidacion }) => {
    const handleItineraryChange = (index, event) => {
        const { name, value } = event.target;
        const newItinerary = [...formData.itinerario];
        if (name === "duracion") {
          newItinerary[index][name] = value; 
        } else {
          newItinerary[index][name] = value;
        }
        setFormData({ ...formData, itinerario: newItinerary });
      };

    const addItineraryItem = () => {
        setFormData({
            ...formData,
            itinerario: [...formData.itinerario, { destino: "", duracion: "" }],
        });
    };

    const removeItineraryItem = (index) => {
        const newItinerary = formData.itinerario.filter((_, i) => i !== index);
        setFormData({ ...formData, itinerario: newItinerary });
    };

    const handleGenericChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const dias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];
    const [selectedDay, setSelectedDay] = useState(dias[0]);
    const [showCopyOptions, setShowCopyOptions] = useState(false);
    const [daysToCopyTo, setDaysToCopyTo] = useState([]);
    // Manejo de horarios
    const addHora = (dia) => {
      const nuevaHora = "";
      setFormData({
        ...formData,
        horario: {
          ...formData.horario,
          [dia]: [...formData.horario[dia], nuevaHora],
        },
      });
    };

    const removeHora = (dia, index) => {
      const nuevasHoras = formData.horario[dia].filter((_, i) => i !== index);
      setFormData({
        ...formData,
        horario: { ...formData.horario, [dia]: nuevasHoras },
      });
    };

    const updateHora = (dia, index, value) => {
      const nuevasHoras = [...formData.horario[dia]];
      nuevasHoras[index] = value;
      setFormData({
        ...formData,
        horario: { ...formData.horario, [dia]: nuevasHoras },
      });
    };

    const handleCopyHours = () => {
        if (daysToCopyTo.length === 0) return;
        
        const horasACopiar = formData.horario[selectedDay];
        const newHorario = { ...formData.horario };
  
        daysToCopyTo.forEach(dia => {
          newHorario[dia] = [...horasACopiar];
        });
  
        setFormData({ ...formData, horario: newHorario });
        setShowCopyOptions(false);
        setDaysToCopyTo([]); 
      };
      
      const handleDaySelection = (dia) => {
        setDaysToCopyTo(prev => 
          prev.includes(dia) ? prev.filter(d => d !== dia) : [...prev, dia]
        );
      };

    const etiquetasDias = {
        lunes: "Lunes",
        martes: "Martes",
        miercoles: "Miércoles",
        jueves: "Jueves",
        viernes: "Viernes",
        sabado: "Sábado",
        domingo: "Domingo",
    };

    
      
    return (
        <div className="bg-white rounded-2xl px-4 lg:p-6 dark:bg-[#181818] dark:text-[#F9FAFB]">
            <div className="space-y-2">
                <div className="flex items-center text-gray-900 dark:text-[#F9FAFB]">
                    <BusIcon />
                    <h2 className="text-xl font-bold ml-2">Datos Generales</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        <label htmlFor="origen" className="text-sm font-medium text-gray-700 mb-1 dark:text-[#F9FAFB]">
                            Origen
                        </label>
                        <input
                            id="origen"
                            type="text"
                            name="origen"
                            value={formData.origen}
                            onChange={handleGenericChange}
                            placeholder="Ej. Managua"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#AAAAAA] transition-all duration-200 dark:text-[#F9FAFB] dark:border-[#AAAAAA]/30"
                        />
                    {errorValidacion.origen && <InputErrorMessage>{errorValidacion.origen}</InputErrorMessage>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="asientos_disponibles" className="text-sm font-medium text-gray-700 mb-1 dark:text-[#F9FAFB]">
                            Asientos disponibles
                        </label>
                        <input
                            id="asientos_disponibles"
                            type="number"
                            name="asientos_disponibles"
                            value={formData.asientos_disponibles}
                            onChange={handleGenericChange}
                            placeholder="Número de asientos"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 dark:border-[#AAAAAA]/30 focus:outline-none focus:ring-2 focus:ring-[#AAAAAA] transition-all duration-200 dark:text-[#F9FAFB]"
                        />
                        {errorValidacion.asientos_disponibles && <InputErrorMessage>{errorValidacion.asientos_disponibles}</InputErrorMessage>}
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-200 pt-5 space-y-6 dark:border-[#AAAAAA]/30 mt-5">
                <div className="flex items-center text-gray-900 dark:text-[#F9FAFB]">
                    <LocationPinIcon />
                    <h2 className="text-xl font-bold ml-2">Paradas del Itinerario</h2>
                </div>
                <p className="text-sm text-gray-500 -mt-4 dark:text-[#F9FAFB]">
                    Agrega cada destino adicional del trayecto.
                </p>
                <div className="space-y-6">
                    {formData.itinerario?.map((item, index) => (
                        <div key={index} className="flex flex-col  gap-4 p-5 bg-gray-50 rounded-lg border border-gray-200 shadow-sm dark:bg-[#AAAAAA]/10 dark:border-none">
                            <div className="flex-1 space-y-1">
                                <label className="text-sm font-medium text-gray-700 dark:text-[#F9FAFB]">Destino</label>
                                <input
                                    name="destino"
                                    value={item.destino}
                                    onChange={(e) => handleItineraryChange(index, e)}
                                    placeholder="Ej. Granada"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-[#AAAAAA]/30 rounded-lg text-gray-800 focus:outline-none focus:ring-1 focus:ring-in[#AAAAAA] dark:text-[#F9FAFB]"
                                />
                                {errorValidacion[`destino_${index}`] && <InputErrorMessage>{errorValidacion[`destino_${index}`]}</InputErrorMessage>}
                            </div>
                            <div className="flex-1 space-y-1 flex flex-col">
                                <label className="text-sm font-medium text-gray-700 dark:text-[#F9FAFB]">Tiempo de viaje (aproximado)</label>
                                <select
                                    name="duracion"
                                    value={item.duracion}
                                    onChange={(e) => handleItineraryChange(index, e)}
                                    className="w-fit px-4 py-2 border  border-gray-300 dark:border-[#AAAAAA]/30 rounded-lg text-gray-800 focus:outline-none focus:ring-1 focus:ring-in[#AAAAAA] dark:text-[#F9FAFB]"
                                >
                                    {generarOpcionesHoras().map((op) => (
                                        <option key={op} value={op} className="dark:bg-[#181818]">
                                        {op} hrs
                                        </option>
                                    ))}
                                </select>
                                {errorValidacion[`duracion_${index}`] && <InputErrorMessage>{errorValidacion[`duracion_${index}`]}</InputErrorMessage>}
                            </div>
                            {formData.itinerario.length > 1 && (
                                <div className="md:self-end">
                                    <button
                                        type="button"
                                        onClick={() => removeItineraryItem(index)}
                                        className="w-full md:w-auto px-4 py-2 text-sm font-bold text-red-600/70 bg-red-50 rounded-lg hover:bg-red-100 transition-colors tracking-tight duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            )}
                             {errorValidacion.destinos && <InputErrorMessage>{errorValidacion.destinos}</InputErrorMessage>}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addItineraryItem}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-[#F9FAFB] bg-[#007bff]/90 rounded-lg hover:bg-[#007bff] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#AAAAAA]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                        Agregar Destino
                    </button>
                </div>
            </div>

            <div className="border-t border-gray-200 pt-5 space-y-6 dark:border-[#AAAAAA]/30 mt-5">
                <div className="flex items-center text-gray-900 dark:text-[#F9FAFB]">
                    <CalendarIcon />
                    <h2 className="text-xl font-bold ml-2">Horario de Salidas Recurrentes</h2>
                </div>
                <p className="text-sm text-gray-500 -mt-4 dark:text-[#F9FAFB]/80">
                    Selecciona los días y agrega las horas de salida programadas.
                </p>
                <div className="flex flex-wrap gap-2">
                    {dias.map((dia, index) => (
                        <div key={index}>
                    <button
                        key={dia}
                        type="button"
                        onClick={() => setSelectedDay(dia)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 focus:outline-none ${
                            selectedDay === dia
                            ? "bg-[#007bff]/90 text-[#F9FAFB] shadow-md"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                    >
                        {etiquetasDias[dia]}
                    </button>
                    {errorValidacion[`itinerario_dia_${index}`] && <InputErrorMessage>{errorValidacion[`itinerario_dia_${index}`]}</InputErrorMessage>}
                    </div>
                    ))}
                </div>
                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 dark:bg-[#AAAAAA]/10 dark:border-[#181818]">
                    <div className="flex flex-col gap-4">
                        {formData.horario[selectedDay].length === 0 && (
                            <p className="text-gray-500 text-center text-sm italic dark:text-[#F9FAFB]/80">
                                No hay horarios programados para este día.
                            </p>
                        )}
                        {formData.horario[selectedDay].map((hora, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <input
                                    type="time"
                                    value={hora}
                                    onChange={(e) => updateHora(selectedDay, index, e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#AAAAAA] dark:border-[#AAAAAA]/30 dark:text-[#F9FAFB]"
                                    required
                                    />
                                <button
                                    type="button"
                                    onClick={() => removeHora(selectedDay, index)}
                                    className="px-4 py-2 text-sm font-bold text-red-600/95 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200"
                                    >
                                    Eliminar
                                </button>
                                {errorValidacion[`itinerario_horas_${index}`] && <InputErrorMessage>{errorValidacion[`itinerario_horas_${index}`]}</InputErrorMessage>}
                            </div>
                        ))}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                type="button"
                                onClick={() => addHora(selectedDay)}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-[#F9FAFB] bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                                Agregar hora
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowCopyOptions(!showCopyOptions)}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200 dark:bg-[#AAAAAA]/10 dark:text-[#F9FAFB] dark:hover:text-[#181818]"
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                                Copiar Horas
                            </button>
                        </div>
                        {showCopyOptions && (
                            <div className="mt-4 p-4 bg-white rounded-lg border border-gray-300 shadow-inner dark:bg-[#181818] dark:border-[#AAAAAA]/30">
                                <p className="font-semibold mb-2">Copiar horarios de {etiquetasDias[selectedDay]} a:</p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {dias.filter(d => d !== selectedDay).map(dia => (
                                        <label key={dia} className="flex items-center gap-2 text-sm text-gray-700 dark:text-[#F9FAFB]">
                                            <input
                                                type="checkbox"
                                                checked={daysToCopyTo.includes(dia)}
                                                onChange={() => handleDaySelection(dia)}
                                                className="form-checkbox text-blue-600 rounded focus:ring-[#AAAAAA]"
                                                />
                                            {etiquetasDias[dia]}
                                        </label>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    onClick={handleCopyHours}
                                    disabled={daysToCopyTo.length === 0}
                                    className="mt-4 w-full px-6 py-2 text-sm font-bold text-[#F9FAFB] bg-[#007bff]/90 rounded-lg hover:bg-[#007bff] disabled:bg-gray-400 dark:disabled:bg-[#AAAAAA]/30 disabled:cursor-not-allowed transition-colors duration-200"
                                    >
                                    Confirmar Copia
                                </button>
                                {errorValidacion.itinerarios && <InputErrorMessage>{errorValidacion.itineriarios}</InputErrorMessage>}
                            </div>
                        )}
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default ParentComponent;
