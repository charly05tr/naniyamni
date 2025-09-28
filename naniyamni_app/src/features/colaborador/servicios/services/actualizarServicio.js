import { API_URL } from "@config";
const tipoServicio = {
    TTT: 'viajes',
    AV: 'alquileres',
    H: 'habitaciones',
    CR: 'Atracciones'
}

export const actualizarServicio = async (servicio,  proveedorId, tipo, id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}oferta-turistica/${tipoServicio[tipo]}/${id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify({...servicio, "proveedor": parseInt(proveedorId)})
    });

    if (!response.ok) {
        throw new Error("No se pudo actualizar el servicio.");
    }
    const data = await response.json();
    return data;
};