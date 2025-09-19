import { useEffect, useState } from "react"
import { differenceInDays } from "date-fns";

export const useReserva = ({servicio, startDate, endDate}) => {
    const [total, setTotal] = useState(0);
    const [iva, setIva] = useState(0);
    const [TotalConIVA, setTotalConIVA] = useState(0);
    const noches = differenceInDays(endDate, startDate) || 0;

    useEffect(() => {
        setTotal(noches * servicio.precio);
    }, [noches, servicio]);

    useEffect(() => {
        setIva((total * 0.15).toFixed(2));
    },[total]);

    useEffect(() => {
        setTotalConIVA((total + iva * 1).toFixed(2));
    },[total, iva]);

    return { TotalConIVA, startDate, endDate, noches, total, iva };
}