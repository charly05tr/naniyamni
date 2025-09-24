import { API_URL } from "@config";

export const postImage = async (imageFile, proveedorId, title="imagen-proveedor") => {
    const token = localStorage.getItem('token');
    console.log(token)
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", imageFile); 
  
    const response = await fetch(`${API_URL}oferta-turistica/proveedor/${proveedorId}/imagen/`, {
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