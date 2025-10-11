import { API_URL } from "@config";

export const getReservasActivas = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}reservas/reservas-activas-usuario/`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${token}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();  
        throw errorData;
    }

    const data = await response.json();
    return data;
}