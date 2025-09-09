import React, { useState } from "react";
import { useUploadImage } from "../hooks/useUploadImage";
import { Button, Input, ErrorText, Form} from "@FormStyled";

export const SubirImagen = ({ proveedorId }) => {
  const [file, setFile] = useState(null);
  const { uploadImage, loading, error, data } = useUploadImage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    await uploadImage(file, proveedorId, "Mi imagen"); 
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <Button type="submit" disabled={loading} text={loading ? "Subiendo..." : "Subir imagen"} />
      {error && <ErrorText>{error}</ErrorText>}
      {data && <p>Imagen subida: {data.title}</p>}
    </Form>
  );
}