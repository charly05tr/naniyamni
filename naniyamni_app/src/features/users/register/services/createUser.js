import { API_URL } from "@config";
import { getGeoDatos } from "@getGeoDatos";


export const createUser = async (usuario) => {
    const geoDatos = await getGeoDatos();
    console.log({...usuario, 
        "pais": geoDatos.pais,
        "ciudad": geoDatos.ciudad,
        "longitud": geoDatos.longitud.toFixed(2),
        "latitud": geoDatos.latitud.toFixed(2) 
    });
    const response = await fetch(`${API_URL}users/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({...usuario, 
            "pais": geoDatos.pais,
            "ciudad": geoDatos.ciudad,
            "longitud": geoDatos.longitud.toFixed(5),
            "latitud": geoDatos.latitud.toFixed(5) 
        })
    });

    if (!response.ok) {
        throw new Error("No se pudo crear el usuario.");
    }

    const data = await response.json();

    return data.token;
};