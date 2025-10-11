import { API_URL } from "@config";

export const crearCuentaStripe = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}reservas/proveedor/stripe/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`,
        },
    });
    console.log(response.status)
    if (response.status !== 400 && response.status !== 200 && response.status !== 201) {
        throw new Error("No se pudo crear la cuenta.");
    }
    const data = await response.json();
    await crearAccountLink(data.id);

    return data;
};

const crearAccountLink = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}reservas/onboard`, {
        method: "GET", 
        headers: {
            "Authorization": `Token ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("No se pudo crear el link.");
    }
    const data = await response.json();
    window.location.href = data.account_link;
};