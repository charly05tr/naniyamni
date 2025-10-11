import { API_URL } from "@config";

export const actualizarUser = async (usuario) => {
    console.log(usuario)
    const response = await fetch(`${API_URL}users/${usuario.id}/`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Token ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(usuario)
    });

    if (!response.ok) {
        throw new Error("No se pudo actualizar el usuario.");
    }

    const data = await response.json();

    return data.token;
};