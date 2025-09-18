import { API_URL } from "@config";

export const getProveedores = async (search) => {
    const response = await fetch(`${API_URL}oferta-turistica/proveedores/?${search}`);

    if(!response.ok) {
        throw new Error("Error al cargar la oferta turistica");
    }

    const data = await response.json();
    return data;
}