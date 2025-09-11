import { API_URL } from "@config";

export const postProveedor = async (proveedor) => {
    const token = localStorage.getItem('token');
    console.log(proveedor);
    const response = await fetch(`${API_URL}oferta-turistica/proveedores/`, {
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
    console.log(data)
    return data;
};