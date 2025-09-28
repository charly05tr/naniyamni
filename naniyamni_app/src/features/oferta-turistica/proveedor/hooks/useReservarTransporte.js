import { useEffect, useState } from "react"

export const useReservarTransporte = ({ servicio = [], reserva }) => {
    const [total, setTotal] = useState((reserva.total / (1+0.15)) || 0);
    const [IVA, setIVA] = useState(0);
    const [TotalConIVA, setTotalConIVA] = useState(reserva.total || 0);
    const [cantPersonas, setCantPersonas] = useState(reserva.cant_personas || 1);

    useEffect(() => {
        setTotal(cantPersonas * parseFloat(servicio.precio));
    }, [cantPersonas, servicio]);

    useEffect(() => {
        setIVA((total * 0.15).toFixed(2));
    },[total]);

    useEffect(() => {
        setTotalConIVA((total + IVA * 1).toFixed(2));
    },[total, IVA]);

    return { TotalConIVA, cantPersonas, setCantPersonas, total, IVA };
}