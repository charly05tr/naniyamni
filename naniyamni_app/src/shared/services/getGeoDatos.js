export const getGeoDatos = async () => {
    const response = await fetch("https://api.geoapify.com/v1/ipinfo?&apiKey=a7104ef1a4314122976b32b3f589f44b");
    if (!response.ok) 
      throw new Error("Error al obtener datos geograficos del usuario");
    const data = await response.json();
    const geoDatos = {
      "pais": data.country.name,
      "ciudad": data.city.name,
      "latitud": data.location.latitude,
      "longitud": data.location.longitude
    };

    return geoDatos;
};