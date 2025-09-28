import { useEffect, useState } from "react";
import { esDiaPermitido, diasSemanaIndice } from "@config";

export const useAtraccionCard = (dias_abierto) => {
    //reserva
    const [ReservaCardOpen, setReservaCardOpen] = useState(false);
    const [noPuedeReservar, setNoPuedeReservar] =useState(false);

    const handleClose = () => {
        setReservaCardOpen(false);
    }

    const handleOpen = () => {
        setReservaCardOpen(true);
    }
    
    //Itinerario del turista
    const [selectedDate, setSelectedDate] = useState(null);
    
    const handleDateSelect = (e) => {
        const diasPermitidos = dias_abierto
        .split(",")
        .map((dia) => diasSemanaIndice[dia.trim()]);
        
        const [year, month, day] = e.target.value.split("-");
        const newDate = new Date(year, month - 1, day);
        if (esDiaPermitido(newDate, diasPermitidos)) {
            setSelectedDate(newDate);
            setNoPuedeReservar(false);
        }
        else {
            setSelectedDate(newDate);
            setNoPuedeReservar(true);
        }
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

    return { selectedDate, handleDateSelect, handleClose, handleOpen, ReservaCardOpen, noPuedeReservar }
}