import { useState } from "react";
import { transformDataForAPI } from "../../utils/transformDataForAPI";
import { validateForm } from "../../utils/validaciones";


export const useServicioForm = (onSubmit, tipo) => {
    const [formData, setFormData] = useState({});
    const [errorValidacion, setErrorValidacion] = useState({});
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };  

    const handleSubmit = (e) => {
        e.preventDefault();

        const { isValid, errors } = validateForm(formData, tipo);

        if (!isValid) {
          console.log("Errores de validación:", errors);
          setErrorValidacion(errors);
          return;
        }

        if (tipo === "TTT") {
          const newData = {
            ...formData,
            tipo_servicio:"VI"
          }
          const { data, errors } = transformDataForAPI(newData);
          if (Object.keys(errors).length > 0) {
            setErrorValidacion(errors);
            return; 
          }
            setFormData(data);
            onSubmit(data);
            return;
        }
        else if (tipo === "CR") {
          const newData = {
            ...formData,
            hora_apertura: `${formData.hora_apertura}`,
            hora_cierre: `${formData.hora_cierre}`,
            guia_incluido: (formData.guia_incluido)?formData.guia_incluido:false,
            cupo_maximo:parseInt(formData.cupo_maximo),
            tipo_servicio:"A"
          }
          setFormData(newData);
          
          onSubmit(newData);
          return;
        }
        else if (tipo === "H") {
          const newData = {
               ...formData,
            tipo_servicio:"H"
          }
          setFormData(newData);
          
          onSubmit(newData);
          return;
        }
        else if (tipo === "AV") {
          const newData = {
            ...formData,
            tipo_servicio:"V",
          }
          setFormData(newData);
          
          onSubmit(newData);
          return;
        }
    };

    return { handleChange, handleSubmit, formData, setFormData, errorValidacion }
}