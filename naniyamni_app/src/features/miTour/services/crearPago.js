import { API_URL } from "@config";

export const crearPago = async (reserva) => {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_URL}reservas/checkout/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify({
            reserva: {
                id: reserva.id
            }
        })
    });

    if (!response.ok) {
        throw new Error("No se pudo crear el pago.");
    }

    const data = await response.json();
    console.log(data);
    return data;
};