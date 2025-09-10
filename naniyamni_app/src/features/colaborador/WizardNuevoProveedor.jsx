import { usePostProveedor } from "./hooks/usePostProveedor";
import { FormCard } from "@FormStyled";
import { ProveedorForm } from "./components/ProveedorForm";
import { Title } from "@TextStyled";
import { SubirImagen } from "./components/SubirImagen";
import { useState } from "react";
import { useUploadImage } from "./hooks/useUploadImage";

const WizardNuevoProveedor = () => {
    const { create, loading, error } = usePostProveedor();
    const { uploadImage } = useUploadImage();
    const [proveedorId, setProveedorId] = useState(0);
    const [step, setStep] = useState(0);

    const handleCreate = async (proveedor) => {
            const data = await create(proveedor);
            setProveedorId(data);
            setStep(1);
    }

    const handleUploadImage = async (file) => {
        await uploadImage(file, proveedorId, "Mi imagen"); 
        setStep(2);
    }

    return (
        <>
            <div className="w-full sticky top-0 z-49 flex flex-col items-center justify-center mt-5">
                <div className="w-1/2 bg-gray-200 rounded-full h-3">
                    <div
                        className={`h-3 rounded-full transition-all duration-300 ${
                            step === 0 ? "w-0": (step === 1)?"w-1/2 bg-blue-500" : "w-full bg-green-500"}
                        }`}
                    />
                </div>
                <p className="mt-2 text-center">{(step+1 === 3)?"Proveedor creado exitosamente!":`Paso ${step+1} de 2`}</p>
             </div>
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