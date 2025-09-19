import { API_URL } from "@config";

export const getProveedorDetail = async (id) => {
    const response = await fetch(`${API_URL}oferta-turistica/proveedores/${id}/`);

    if (!response.ok) {
        const errorData = await response.json();  
        throw errorData;
    }

    const data = await response.json();
    return data;
}