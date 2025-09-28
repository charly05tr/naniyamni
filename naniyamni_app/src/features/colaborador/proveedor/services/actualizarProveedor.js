import { API_URL } from "@config";

export const actualizarProveedor = async (proveedor, id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}oferta-turistica/mis-proveedores/${id}/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(proveedor)
    });

    if (!response.ok) {
        throw new Error("No se pudo actualizar el proveedor.");
    }

    const data = await response.json();
    return data;
};