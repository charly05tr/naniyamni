import { useState } from "react";
import { Input, Button, TextArea, Form } from "@FormStyled"
import { HotelForm } from "./HotelForm";
import { ArrendamientoVehiculoForm } from "./ArrendamientoVehiculoForm";
import ParentComponent from "./TransporteForm";
import { transformDataForAPI } from "../../utils/transformDataForAPI";

export const ServicioForm = ({ tipo, onSubmit }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(formData)
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tipo === "TTT") {
      setFormData({
        ...formData,
      });
      console.log(transformDataForAPI(formData))
      onSubmit(transformDataForAPI(formData));
      return;
    }
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
      <div className="flex mt-2 items-center gap-2">
        <input
            type="checkbox"
            id="disponible"
            checked={formData.disponible}
            onChange={(e) =>
            setFormData({ ...formData, disponible: e.target.checked })
            }
            className="h-5 w-5 rounded-lg border-gray-100"
            />
        <label htmlFor="disponible" className="text-gray-800/95">Disponible</label>
      </div>
      {tipo === "H" && (
        <HotelForm handleChange={handleChange} formData={formData}/>
      )}
      {tipo === "AV" && (
        <ArrendamientoVehiculoForm handleChange={handleChange} formData={formData}/>
      )}
      {(tipo === "TTT" || tipo === "OV") && (
        <ParentComponent handleChange={handleChange} formDataTrans={formData} setFormDataTrans={setFormData}/>
      )}
      <Button type="submit" className="w-full" text="Guardar servicio"/>
    </Form>
  );
}