import { API_URL } from "@config";

export const createUser = async (usuario) => {

    const response = await fetch(`${API_URL}users/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });

    if (!response.ok) {
        throw new Error("No se pudo crear el usuario.");
    }

    const data = await response.json();

    return data.token;
};