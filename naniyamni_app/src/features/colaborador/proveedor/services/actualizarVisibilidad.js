import { API_URL } from "@config";

export const actualizarVisibilidad = async (id, visibilidad) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}oferta-turistica/mis-proveedores/${id}/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify({
            activo: visibilidad
        })
    });

    if (!response.ok) {
        throw new Error("No se pudo cambiar la visibilidad.");
    }

    const data = await response.json();
    return data;
};