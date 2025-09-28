import { API_URL } from "@config";

export const postProveedor = async (proveedor) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}oferta-turistica/mis-proveedores/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(proveedor)
    });

    if (!response.ok) {
        throw new Error("No se pudo crear el proveedor.");
    }

    const data = await response.json();
    return data;
};