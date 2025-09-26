import { API_URL } from "@config";
const tipoServicio = {
    TTT: 'viajes',
    AV: 'alquileres',
    H: 'habitaciones',
    CR: 'Atracciones'
}

export const actualizarVisibilidad = async (id, visibilidad, tipo) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}oferta-turistica/${tipoServicio[tipo]}/${id}/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify({
            disponible: visibilidad
        })
    });

    if (!response.ok) {
        throw new Error("No se pudo cambiar la visibilidad.");
    }

    const data = await response.json();
    return data;
};