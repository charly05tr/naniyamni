import { useState } from "react";
import { Input, Button, TextArea, Form } from "@FormStyled"
import { HotelForm } from "./HotelForm";
import { ArrendamientoVehiculoForm } from "./ArrendamientoVehiculoForm";
import { TransporteForm } from "./TransporteForm";

export const ServicioForm = ({ tipo, onSubmit }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <Input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Título" required />
      </div>
      <div>
        <TextArea name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Descripción" required />
      </div>
      <div>
        <Input type="number" step="0.01" name="precio" value={formData.precio} onChange={handleChange} placeholder="Precio" required />
      </div>
      <div className="flex items-center gap-2">
        <input
            type="checkbox"
            id="disponible"
            checked={formData.disponible}
            onChange={(e) =>
            setFormData({ ...formData, disponible: e.target.checked })
            }
            className="h-5 w-5 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
        <label htmlFor="disponible">Disponible</label>
      </div>
      {tipo === "H" && (
        <HotelForm handleChange={handleChange} formData={formData}/>
      )}
      {tipo === "AV" && (
        <ArrendamientoVehiculoForm handleChange={handleChange} formData={formData}/>
      )}
      {(tipo === "TTT" || tipo === "OV") && (
        <TransporteForm handleChange={handleChange} formData={formData}/>
      )}
      <Button type="submit" className="w-full" text="Guardar servicio"/>
    </Form>
  );
}