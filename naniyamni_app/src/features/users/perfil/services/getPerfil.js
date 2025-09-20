import { API_URL } from "@config";

export const getPerfil = async () => {
    const res = await fetch(`${API_URL}users/`, {
        "headers": {
            'Content-Type': 'application/json',
            "Authorization": `Token ${localStorage.getItem('token')}`,
        }
    });
        
    if (!res.ok) {
        const errorData = await res.json();  
        throw errorData;
    }

    const data = await res.json();
    return data;
}  