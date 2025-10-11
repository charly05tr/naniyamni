import { useEffect, useState } from "react";

export const ChatButton = ({ handleOpen }) => {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    let timeoutId;

    const startRandomRotation = () => {
      // Genera ángulo entre -20° y +20°, excluyendo cercanos a 0
      let randomAngle = (Math.random() * 40 - 20).toFixed(1);
      if (Math.abs(randomAngle) < 5) {
        // Evita giros casi imperceptibles
        randomAngle = randomAngle > 0 ? 10 : -10;
      }

      // Tiempo aleatorio entre 4 y 8 segundos
      const randomDelay = Math.random() * 4000 + 6000;

      // Gira al ángulo elegido
      setAngle(randomAngle);

      // Regresa a 0 después de 0.5 s (suave)
      setTimeout(() => setAngle(0), 500);

      // Programa el siguiente giro
      timeoutId = setTimeout(startRandomRotation, randomDelay);
    };

    startRandomRotation();

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <button
      className="fixed md:right-2 right-0 md:bottom-3 bottom-2 rounded-full cursor-pointer outline-none"
      onClick={handleOpen}
    >
      <img
        src="/gueguense.png"
        alt="Chat"
        className="w-12 h-12 object-cover rounded-full flex items-center justify-center mr-2 shadow transition-transform duration-500 ease-in-out hover:scale-105"
        style={{ transform: `rotate(${angle}deg)` }}
      />
    </button>
  );
};
