import { useState } from "react";

export const useN8nChat = (webhookUrl) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const sendMessage = async (sessionId, chatInput) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, chatInput }),
      });

      if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

      const data = await res.json();
      setResponse(data);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.error("Error al enviar mensaje:", err);
      return null;
    }
  };

  return { sendMessage, response, loading, error };
};
