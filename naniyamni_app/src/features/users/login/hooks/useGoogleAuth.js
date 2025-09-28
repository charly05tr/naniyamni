import { useGoogleLogin } from "@react-oauth/google";

export const useGoogleLoginDRF = () => {
  const loginGoogle = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      // ✅ El `code` de autorización viene en `credentialResponse.code`
      const authorizationCode = credentialResponse.code; 

      if (!authorizationCode) {
        console.error("No se recibió el código de autorización.");
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/api/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // ✅ Envía el `code` de autorización al backend
          body: JSON.stringify({ code: authorizationCode }), 
        });

        const data = await response.json();

        localStorage.setItem("token", data.token);

        console.log("Usuario:", data.user);
        console.log("Token DRF:", data.token);
      } catch (error) {
        console.error("Error al autenticar con DRF:", error);
      }
    },
    onError: () => {
      console.log("Error al iniciar sesión con Google");
    },
    // ✅ Cambia el flujo a 'auth-code' para que devuelva el código de autorización
    flow: 'auth-code', 
  });

  return loginGoogle;
};