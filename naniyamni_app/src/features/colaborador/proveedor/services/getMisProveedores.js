import { API_URL } from "@config";

export const getMisProveedores = async () => {
    const response = await fetch(`${API_URL}oferta-turistica/mis-proveedores/`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem('token')}`
        }
    });

    if(!response.ok) {
        throw new Error("Error al cargar los proveedores");
    }
    const data = await response.json();
    return data;
}