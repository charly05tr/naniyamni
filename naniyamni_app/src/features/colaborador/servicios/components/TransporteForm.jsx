import React, { useState, useEffect } from "react";
import { generarOpcionesHoras } from "@config";

// --- SVG Icons ---
// Reemplazamos los emojis con iconos SVG para un look más profesional y minimalista.
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


// --- Componente principal ---
const ParentComponent = ({ formDataTrans, setFormDataTrans }) => {
    const [formData, setFormData] = useState({
        asientos_disponibles: "",
        origen: "",
        itinerario: [{ destino: "", duracion: "" }],
        horario: {
            lunes: [],
            martes: [],
            miercoles: [],
            jueves: [],
            viernes: [],
            sabado: [],
            domingo: [],
        },
    });

    useEffect(() => {
        setFormDataTrans({
          ...formDataTrans,
          ...formData,
        });
      }, [formData]);

    return (
        <div className="flex flex-col items-center  min-h-screen py-12 px-2 sm:px-6 lg:px-4 font-sans antialiased">
            <div className="w-full max-w-4xl">
                <p className="text-center text-gray-500 mb-10 text-2xl">
                    Completa la información para crear una nueva ruta de autobús.
                </p>
                <TransporteForm formData={formData} setFormData={setFormData} />
            </div>
        </div>
    );
};

// --- Formulario de Transporte ---
const TransporteForm = ({ formData, setFormData }) => {
    // Manejo de cambios para itinerario
    const handleItineraryChange = (index, event) => {
        const { name, value } = event.target;
        const newItinerary = [...formData.itinerario];
        if (name === "duracion") {
          newItinerary[index][name] = value; // guardar "HH:MM"
        } else {
          newItinerary[index][name] = value;
        }
        setFormData({ ...formData, itinerario: newItinerary });
      };

    // Agregar un nuevo destino al itinerario
    const addItineraryItem = () => {
        setFormData({
            ...formData,
            itinerario: [...formData.itinerario, { destino: "", duracion: "" }],
        });
    };

    // Eliminar un destino del itinerario
    const removeItineraryItem = (index) => {
        const newItinerary = formData.itinerario.filter((_, i) => i !== index);
        setFormData({ ...formData, itinerario: newItinerary });
    };

    // Manejo de cambios para campos generales
    const handleGenericChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    
    // Estados para la sección de horario
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
        setShowCopyOptions(false); // Cierra el menú después de copiar
        setDaysToCopyTo([]); // Limpia la selección
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
        <div className="bg-white rounded-2xl  p-8 lg:p-10">
            {/* Sección de información básica */}
            <div className="space-y-2">
                <div className="flex items-center text-gray-900">
                    <BusIcon />
                    <h2 className="text-xl font-bold ml-2">Datos Generales</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Campo Origen */}
                    <div className="flex flex-col">
                        <label htmlFor="origen" className="text-sm font-medium text-gray-700 mb-1">
                            Origen
                        </label>
                        <input
                            id="origen"
                            type="text"
                            name="origen"
                            value={formData.origen}
                            onChange={handleGenericChange}
                            placeholder="Ej. Managua"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        />
                    </div>
                    {/* Campo Asientos */}
                    <div className="flex flex-col">
                        <label htmlFor="asientos_disponibles" className="text-sm font-medium text-gray-700 mb-1">
                            Asientos disponibles
                        </label>
                        <input
                            id="asientos_disponibles"
                            type="number"
                            name="asientos_disponibles"
                            value={formData.asientos_disponibles}
                            onChange={handleGenericChange}
                            placeholder="Número de asientos"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        />
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-200 pt-8 space-y-6">
                <div className="flex items-center text-gray-900">
                    <LocationPinIcon />
                    <h2 className="text-xl font-bold ml-2">Paradas del Itinerario</h2>
                </div>
                <p className="text-sm text-gray-500 -mt-4">
                    Agrega cada destino adicional del trayecto.
                </p>
                
                {/* Contenedor de itinerario dinámico */}
                <div className="space-y-6">
                    {formData.itinerario?.map((item, index) => (
                        <div key={index} className="flex flex-col  gap-4 p-5 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                            <div className="flex-1 space-y-1">
                                <label className="text-sm font-medium text-gray-700">Destino</label>
                                <input
                                    name="destino"
                                    value={item.destino}
                                    onChange={(e) => handleItineraryChange(index, e)}
                                    placeholder="Ej. Granada"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                                />
                            </div>
                            <div className="flex-1 space-y-1 flex flex-col">
                                <label className="text-sm font-medium text-gray-700">Tiempo de viaje (aproximado)</label>
                                <select
                                    name="duracion"
                                    value={item.duracion}
                                    onChange={(e) => handleItineraryChange(index, e)}
                                    className="w-fit px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                                >
                                    {generarOpcionesHoras().map((op) => (
                                        <option key={op} value={op}>
                                        {op} hrs
                                        </option>
                                    ))}
                                </select>
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
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addItineraryItem}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                        Agregar Destino
                    </button>
                </div>
            </div>

            <div className="border-t border-gray-200 pt-8 space-y-6">
                <div className="flex items-center text-gray-900">
                    <CalendarIcon />
                    <h2 className="text-xl font-bold ml-2">Horario de Salidas Recurrentes</h2>
                </div>
                <p className="text-sm text-gray-500 -mt-4">
                    Selecciona los días y agrega las horas de salida programadas.
                </p>

                {/* Navegación por días */}
                <div className="flex flex-wrap gap-2">
                    {dias.map(dia => (
                    <button
                        key={dia}
                        type="button"
                        onClick={() => setSelectedDay(dia)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 focus:outline-none ${
                            selectedDay === dia
                            ? "bg-blue-600 text-white shadow-md"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                    >
                        {etiquetasDias[dia]}
                    </button>
                    ))}
                </div>

                {/* Contenido del día seleccionado */}
                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex flex-col gap-4">
                        {formData.horario[selectedDay].length === 0 && (
                            <p className="text-gray-500 text-center text-sm italic">
                                No hay horarios programados para este día.
                            </p>
                        )}
                        {formData.horario[selectedDay].map((hora, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <input
                                    type="time"
                                    value={hora}
                                    onChange={(e) => updateHora(selectedDay, index, e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                <button
                                    type="button"
                                    onClick={() => removeHora(selectedDay, index)}
                                    className="px-4 py-2 text-sm font-bold text-red-600/95 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200"
                                    >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                type="button"
                                onClick={() => addHora(selectedDay)}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                                Agregar hora
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowCopyOptions(!showCopyOptions)}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                                Copiar Horas
                            </button>
                        </div>
                        {showCopyOptions && (
                            <div className="mt-4 p-4 bg-white rounded-lg border border-gray-300 shadow-inner">
                                <p className="font-semibold mb-2">Copiar horarios de {etiquetasDias[selectedDay]} a:</p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {dias.filter(d => d !== selectedDay).map(dia => (
                                        <label key={dia} className="flex items-center gap-2 text-sm text-gray-700">
                                            <input
                                                type="checkbox"
                                                checked={daysToCopyTo.includes(dia)}
                                                onChange={() => handleDaySelection(dia)}
                                                className="form-checkbox text-blue-600 rounded focus:ring-blue-500"
                                                />
                                            {etiquetasDias[dia]}
                                        </label>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    onClick={handleCopyHours}
                                    disabled={daysToCopyTo.length === 0}
                                    className="mt-4 w-full px-6 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors duration-200"
                                    >
                                    Confirmar Copia
                                </button>
                            </div>
                        )}
                        </div>
                    </div>
                
            </div>
        </div>
    );
};

export default ParentComponent;
