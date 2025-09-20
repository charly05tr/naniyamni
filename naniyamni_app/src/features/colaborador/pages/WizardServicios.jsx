import { usePostServicios } from "../servicios/hooks/usePostServicios";
import { ServicioForm } from "../servicios/components/ServicioForm";
import { ProgressBar } from "../styled-components/ProgressBar";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { FormCard } from "@FormStyled";
import { Title } from "@TextStyled";
import { useUploadImageServicio } from "../servicios/hooks/useUploadImageServicio";
import { SubirImagen } from "../proveedor/components/SubirImagen";

const WizardServicios = () => {
    const { id, tipo } = useParams();
    const { createServicios } = usePostServicios();
    const [step, setStep] = useState(0);
    const { uploadImageServicio } = useUploadImageServicio();
    const [servicioId, setServicioId] = useState();

    const handlePostServicios = async (servicios) => {
        const data = await createServicios(servicios, id, tipo);
        setServicioId(data);
        setStep(1);
    }

    const handleUploadImageServicio = async (file) => {
        await uploadImageServicio(file, servicioId, "Mi imagen"); 
        setStep(2);
    }

    return(
        <div className="flex items-center justify-center flex-col">
            <ProgressBar step={step} totalSteps={2} label="Servicio"/>
            {step === 0 &&
                <FormCard>
                    <Title text="Ingrese los datos del servicio"/>
                    <ServicioForm tipo={tipo} onSubmit={handlePostServicios}/>
                </FormCard>}    
            {step === 1 &&
                <FormCard className="mt-4">
                    <Title text="Seleccione las imágenes que describan el servicio."/>
                    <SubirImagen  onUploadImage={handleUploadImageServicio} />
                </FormCard>}
        </div>
    )
}

export default WizardServicios;