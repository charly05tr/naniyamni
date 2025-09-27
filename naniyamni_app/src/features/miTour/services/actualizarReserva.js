import { API_URL } from "@config";

export const actualizarReserva = async (id, reserva, tipo) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}reservas/${id}/?tipo=${tipo}`, {

        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(reserva)
    });

    if (!response.ok) {
        throw new Error("No se pudo actualizar la reserva.");
    }

    const data = await response.json();
    return data;
};