import { API_URL } from "@config";

export const postReserva = async (reserva, tipo) => {
    console.log(tipo);
    console.log(reserva);
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}reservas/?tipo=${tipo}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(reserva)
    });

    if (!response.ok) {
        const errorData = await response.json();  
        throw errorData;
    }
    const data = await response.json();
    return data;
};