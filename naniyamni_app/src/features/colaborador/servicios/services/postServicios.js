import { API_URL } from "@config";
const tipoServicio = {
    TTT: 'viajes',
    AV: 'alquileres',
    H: 'habitaciones',
    CR: 'Atracciones'
}

export const postServicios = async (servicios,  proveedorId, tipo) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}oferta-turistica/${tipoServicio[tipo]}/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify({...servicios, "proveedor": parseInt(proveedorId)})
    });

    if (!response.ok) {
        throw new Error("No se pudo crear el servicio.");
    }
    const data = await response.json();
    return data;
};