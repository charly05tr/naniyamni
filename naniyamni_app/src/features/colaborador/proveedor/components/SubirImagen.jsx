import React, { useState } from "react";
import { useUploadImage } from "../hooks/useUploadImage";
import { Button, Input, ErrorText, Form } from "@FormStyled";
import { RemoveButton } from "@RemoveButton";
import Cargando  from "@Cargando";

export const SubirImagen = ({ onUploadImage, loading2 }) => {
  const [imagenes, setImagenes] = useState([]); 
  const { loading, error } = useUploadImage();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagenes((prev) => [...prev, file]);
    }
    e.target.value = ""; 
  };

  const handleRemove = (index) => {
    setImagenes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const file of imagenes) {
      try {
        onUploadImage(file);
      } catch (err) {
        console.error("Error subiendo imagen:", err);
      }
    }
    setImagenes([]); 
  };

  if (loading2) {
    return(
      <div>
        <Cargando>Enviando</Cargando>
      </div>
    )
  }

  return (
    <div className="w-full">
      <Form onSubmit={handleSubmit}>
        <Input type="file" onChange={handleFileChange} />
        <div className="mt-4 grid grid-cols-2 gap-4">
          {imagenes.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt={`preview-${index}`}
                className="h-40 w-full object-cover rounded"
              />
              <RemoveButton onClick={() => handleRemove(index)}/>
            </div>
          ))}
        </div>
        {imagenes.length > 0 && (
          <div className="flex w-full justify-center">
              <div className="w-xs">
                <Button
                  type="submit"
                  disabled={loading}
                  text={loading ? "Subiendo..." : "Enviar"}
                  className="mt-4"
                />
            </div>
          </div>
        )}

        {error && <ErrorText>{error}</ErrorText>}
      </Form>
    </div>
  );
};