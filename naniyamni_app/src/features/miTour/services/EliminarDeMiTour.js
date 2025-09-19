import { API_URL } from "@config";

export const eliminarDeMiTour = async (reserva_id, tipo) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}reservas/${reserva_id}/?tipo=${tipo}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Token ${token}`
        },
    });

    if (response.status !== 204) {
        const errorData = await response.json();  
        throw errorData;
    }
};