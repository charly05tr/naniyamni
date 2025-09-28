import { API_URL } from "@config";

export const updateSucursales = async (sucursales, id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}oferta-turistica/sucursales/${id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify({
            proveedor_id: id,
            sucursales: sucursales.map(s => ({ direccion: s }))
        })
    });

    if (!response.ok) {
        throw new Error("No se pudo actualizar las sucursales.");
    }

    const data = await response.json();
    return data;
};