import { API_URL } from "@config";
import { getGeoDatos } from "@getGeoDatos";

export const updateUser = async (usuario) => {
    const geoDatos = await getGeoDatos();
    const response = await fetch(`${API_URL}users/${usuario.id}/`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Token ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({...usuario, 
            "pais": geoDatos.pais,
            "ciudad": geoDatos.ciudad,
            "longitud": geoDatos.longitud.toFixed(2),
            "latitud": geoDatos.latitud.toFixed(2) 
        })
    });

    if (!response.ok) {
        throw new Error("No se pudo actualizar el usuario.");
    }

    const data = await response.json();

    return data.token;
};