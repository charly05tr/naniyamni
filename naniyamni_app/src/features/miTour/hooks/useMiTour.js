import { useState, useEffect, useCallback } from "react";

export const useMiTour = (reservas) => {
    const [ReservaCardOpen, setReservaCardOpen] = useState(null);
    const [total, setTotal] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [descuento, setDescuento] = useState(0);

    const handleClose = () => {
        setReservaCardOpen(null);
    };

    const handleOpen = (reserva) => {
        setReservaCardOpen(reserva);
    }

    const calTotal = useCallback(() => {
        const sum = reservas?.reduce((acc, reserva) => acc + parseFloat(reserva.total), 0) || 0;
        setTotal(sum.toFixed(2));
      }, [reservas]);         
    
    const calDescuento = useCallback(() => {
        setDescuento((total*0.1).toFixed(2));
        if (reservas.length < 3) {
            setDescuento(0);
        }
    }, [total, reservas.length]);

    const calSubTotal = useCallback(() => {
        setSubTotal((total-descuento).toFixed(2));
    }, [total, descuento]);

    useEffect(() => {
        calTotal();
        calDescuento();
        calSubTotal();
    },[calTotal, calSubTotal, calDescuento]);

    return { ReservaCardOpen, handleClose, handleOpen, total, subTotal, descuento };
};