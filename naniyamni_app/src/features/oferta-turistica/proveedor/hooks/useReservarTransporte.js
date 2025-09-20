import { useEffect, useState } from "react"

export const useReservarTransporte = ({ servicio = [] }) => {
    const [total, setTotal] = useState(0);
    const [IVA, setIVA] = useState(0);
    const [TotalConIVA, setTotalConIVA] = useState(0);
    const [cantPersonas, setCantPersonas] = useState(1);

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