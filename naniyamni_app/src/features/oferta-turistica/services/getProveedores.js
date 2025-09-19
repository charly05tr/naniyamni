import { API_URL } from "@config";

export const getProveedores = async (search) => {
    const response = await fetch(`${API_URL}oferta-turistica/proveedores/?${search}`);

    if (!response.ok) {
        const errorData = await response.json();  
        throw errorData;
    }

    const data = await response.json();
    return data;
}