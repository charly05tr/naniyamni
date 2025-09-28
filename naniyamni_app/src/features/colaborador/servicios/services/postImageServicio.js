import { API_URL } from "@config";

export const postImageServicio = async (imageFile, servicioId, title="imagen-servicio") => {
    const token = localStorage.getItem('token');
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", imageFile); 
  
    const response = await fetch(`${API_URL}oferta-turistica/servicio/${servicioId}/imagen/`, {
      method: "POST",
      headers: {
        "Authorization": `Token ${token}`,
      },
      body: formData,
    });
  
    if (response.status !== 201) {
      throw new Error("Error al subir la imagen");
    }
  }