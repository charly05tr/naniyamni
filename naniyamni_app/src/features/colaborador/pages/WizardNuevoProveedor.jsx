import { usePostProveedor } from "../proveedor/hooks/usePostProveedor";
import { FormCard } from "@FormStyled";
import { ProveedorForm } from "../proveedor/components/ProveedorForm";
import { Title } from "@TextStyled";
import { SubirImagen } from "../proveedor/components/SubirImagen";
import { useState } from "react";
import { useUploadImage } from "../proveedor/hooks/useUploadImage";
import { ProgressBar } from "../styled-components/ProgressBar";

const WizardNuevoProveedor = () => {
    const { create, loading, error } = usePostProveedor();
    const { uploadImage } = useUploadImage();
    const [proveedorId, setProveedorId] = useState();
    const [step, setStep] = useState(1);

    const handleCreate = async (proveedor) => {
            const data = await create(proveedor);
            setProveedorId(data.id);
            setStep(1);
    }

    const handleUploadImage = async (file) => {
        await uploadImage(file, proveedorId, "Mi imagen"); 
        setStep(2);
    }


    return (
        <>
            <ProgressBar step={step} totalSteps={2}/>
            <div className="flex items-center justify-center m-5 flex-col">
                {step === 0 &&
                <FormCard>
                    <Title text="Crea un proveedor de servicios turísticos"/>
                    <ProveedorForm onCreateProveedor={handleCreate} loading={loading} error={error}/>   
                </FormCard>}
                {step === 1 &&
                <FormCard className="mt-4">
                    <Title text="Seleccione las imágenes que quiere que se muestren en su página."/>
                    <hr className="text-gray-200"></hr>
                    <Title text="La primera imagen será la que se muestre como la de perfil."/>
                    <SubirImagen  onUploadImage={handleUploadImage} />
                </FormCard>}
            </div>
        </>
    );
}

export default WizardNuevoProveedor;