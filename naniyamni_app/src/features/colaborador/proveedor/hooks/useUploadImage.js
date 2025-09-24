import { useState } from "react";
import { postImage } from "../services/postImage";

export function useUploadImage() {
    const [loading2, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
  
    const uploadImage = async (imageFile, proveedorId, title = "Sin título") => {
      setLoading(true);
      setError(null);
      try {
        const result = await postImage(imageFile, proveedorId, title);
        setData(result);
        return result;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
        window.location.reload();
      }
    };
  
    return { uploadImage, loading2, error, data };
  }