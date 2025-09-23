import { useEffect, useState } from "react"
import { differenceInDays } from "date-fns";

export const useReserva = ({reserva, startDate, endDate}) => {
    const [total, setTotal] = useState((reserva.total / (1+0.15)) || 0);
    const [iva, setIva] = useState(0);
    const [TotalConIVA, setTotalConIVA] = useState(reserva.total || 0);
    const noches = differenceInDays(endDate, startDate) || reserva.noches || 0;

    useEffect(() => {
        setTotal(noches * reserva.servicio.precio);
    }, [noches, reserva.servicio]);

    useEffect(() => {
        setIva((total * 0.15).toFixed(2));
    },[total]);

    useEffect(() => {
        setTotalConIVA((total + iva * 1).toFixed(2));
    },[total, iva]);

    return { TotalConIVA, startDate, endDate, noches, total, iva };
}