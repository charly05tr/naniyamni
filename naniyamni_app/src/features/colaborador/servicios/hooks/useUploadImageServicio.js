import { useState } from "react";
import { postImageServicio } from "../services/postImageServicio";

export function useUploadImageServicio() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
  
    const uploadImageServicio = async (imageFile, servicioId, title = "Sin título") => {
      setLoading(true);
      setError(null);
      try {
        const result = await postImageServicio(imageFile, servicioId, title);
        setData(result);
        return result;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    };
  
    return { uploadImageServicio, loading, error, data };
  }