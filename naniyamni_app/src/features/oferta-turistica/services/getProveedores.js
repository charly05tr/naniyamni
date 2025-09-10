import { API_URL } from "@config";

export const getProveedores = async () => {
    const response = await fetch(`${API_URL}oferta-turistica/proveedores/`);

    if(!response.ok) {
        throw new Error("Error al cargar la oferta turistica");
    }

    const data = await response.json();
    return data;
}