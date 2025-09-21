import { useState } from "react";
import { transformDataForAPI } from "../../utils/transformDataForAPI";

export const useServicioForm = (onSubmit, tipo) => {
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
        if (tipo === "TTT") {
            setFormData({
              ...formData,
            });
            onSubmit(transformDataForAPI(formData));
            return;
        }
        else if (tipo === "CR") {
          const newData = {
            ...formData,
            hora_apertura: `${formData.hora_apertura}`,
            hora_cierre: `${formData.hora_cierre}`,
            guia_incluido: (formData.guia_incluido)?formData.guia_incluido:false,
            cupo_maximo:parseInt(formData.cupo_maximo)
          };
          console.log(newData);
          setFormData(newData);
          onSubmit(newData);
          return;
        }
        onSubmit(formData);
    };

    return { handleChange, handleSubmit, formData, setFormData }
}