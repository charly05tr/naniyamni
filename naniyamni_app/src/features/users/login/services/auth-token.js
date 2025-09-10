import { API_URL } from "@config";

export const obtenerToken = async (usuario) => {
    const {email, password}  = usuario;
    const response = await fetch(`${API_URL}token-auth/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify({
              "username": email,
              "password": password,
          }
          ),
    });

    if (!response.ok) {
        throw new Error("Error al enviar los datos de sesión");
    };

    const data = await response.json();

    if (!data.token) {
        throw new Error("correo o contraseña inválidos");
    };

    return data.token;
};
