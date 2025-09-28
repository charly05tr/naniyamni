import { useEffect, useState } from "react";

const daysOfWeek = ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA'];
const getDayAbbreviation = (date) => daysOfWeek[date.getDay()];

export const useTransporteCard = (itinerarios) => {
    //reserva
    const [ReservaCardOpen, setReservaCardOpen] = useState(false);

    const handleClose = () => {
        setReservaCardOpen(false);
    }
    
    const handleOpen = () => {
        setReservaCardOpen(true);
    }
    //Itinerario del turista
    const [selectedDate, setSelectedDate] = useState(null);
    const [availableHours, setAvailableHours] = useState([]);
    const [selectedHour, setSelectedHour] = useState(null);
    const [selectedHourIndex, setSelectedDHourIndex] = useState(null);

    useEffect(() => {
        if (!selectedDate) return;
        
        const dayAbbreviation = getDayAbbreviation(selectedDate);
        const dayItinerary = itinerarios.find((it) => it.dia === dayAbbreviation);
        setAvailableHours(dayItinerary?.horas_salida || []);
    }, [selectedDate, itinerarios]);
    
    const handleDateSelect = (e) => {
        const [year, month, day] = e.target.value.split("-");
        const newDate = new Date(year, month - 1, day);
        setSelectedDate(newDate);
    };
    
    
    useEffect(() => {
        if (ReservaCardOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [ReservaCardOpen]);

    return { ReservaCardOpen, selectedDate, selectedHour, selectedHourIndex, handleDateSelect, handleClose, handleOpen, availableHours, setSelectedDHourIndex, setSelectedHour }
}