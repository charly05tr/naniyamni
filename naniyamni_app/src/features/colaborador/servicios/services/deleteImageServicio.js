import { API_URL } from "@config";

export const deleteImageServicio = async (imageId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}oferta-turistica/servicio/imagen/${imageId}/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${token}`
        },
    });

    if (response.status !== 204) {
        const errorData = await response.json();  
        throw errorData;
    }

    const data = await response.json();
    return data;
};