import { usePostProveedor } from "../proveedor/hooks/usePostProveedor";
import { FormCard } from "@FormStyled";
import { ProveedorForm } from "../proveedor/components/ProveedorForm";
import { Title } from "@TextStyled";
import { SubirImagen } from "../proveedor/components/SubirImagen";
import { useState } from "react";
import { useUploadImage } from "../proveedor/hooks/useUploadImage";
import { ProgressBar } from "../styled-components/ProgressBar";
import { useNavigate } from "react-router-dom";
import { useCreateSucursales } from "../proveedor/hooks/useCreateSucursal";
import Cargando from "@Cargando";
import { Error } from "@Error";
import { SucursalesForm } from "../proveedor/components/SucursalesForm";
import { useEffect } from "react";
import UbicacionForm from "../proveedor/components/UbicacionForm";

const WizardNuevoProveedor = () => {
    const { create, loading, error } = usePostProveedor();
    const { uploadImage, loading2 } = useUploadImage();
    const [proveedorId, setProveedorId] = useState();
    const [proveedorTipo, setProveedorTipo] = useState();
    const [step, setStep] = useState(0);
    const navigate = useNavigate();
    const { createSucursales, loading3, error2 } = useCreateSucursales(proveedorId);
  
    const handleCreate = async (proveedor) => {
      const data = await create(proveedor);
      if (data) {
        setProveedorId(data.id);
        setProveedorTipo(data.tipo);
        setStep(1); 
      }
    };
  
    useEffect(() => {
      if (step === 3 && proveedorTipo !== "AV") {
        navigate(`/colaborador`);
      }
      if (step === 4) {
        navigate(`/colaborador`);
      }
    }, [step, proveedorTipo, navigate, proveedorId]);
  
    if (loading || loading2 || loading3) {
      return <Cargando>Cargando...</Cargando>;
    }
  
    if (error || error2) {
        return <Error>{error || error2}</Error>;
      }
  
    const handleCreateSucursales = async (sucursales) => {
      await createSucursales(sucursales);
      setStep(3);
    };
  
    const handleUploadImage = async (file) => {
      await uploadImage(file, proveedorId, "Mi imagen");
      setStep((proveedorTipo !== "AV")?3:4);
    };
  
    return (
      <>
        <ProgressBar step={step} totalSteps={proveedorTipo !== "AV" ? 3 : 4} />
        <div className="flex items-center justify-center m-5 flex-col">
          {step === 0 && (
            <FormCard>
              <Title text="Crea un proveedor de servicios turísticos" />
              <ProveedorForm onCreateProveedor={handleCreate} loading={loading} error={error} />
            </FormCard>
          )}
  
          {step === 1 && (
            <FormCard className="mt-4">
              <h1 className="md:p-4 text-2xl text-zinc-800 font-bold dark:text-[#F9FAFB]">Selecciona la ubicación de tu local</h1>
              <UbicacionForm idProveedor={proveedorId} onSuccess={() => setStep(2)} />
            </FormCard>
          )}
  
          {step === 2 && proveedorTipo === "AV" && (
            <FormCard>
              <Title text="Ingresa las sucursales" />
              <SucursalesForm onCreateSucursales={handleCreateSucursales} loading={loading3} error={error2} />
            </FormCard>
          )}
  
          {step === 2 && proveedorTipo !== "AV" && (
            <FormCard className="mt-4">
              <Title text="Seleccione las imágenes que quiere que se muestren en su página." />
              <hr className="text-gray-200" />
              <Title text="La primera imagen será la que se muestre como la de perfil." />
              <SubirImagen onUploadImage={handleUploadImage} loading2={loading2} />
            </FormCard>
          )}
  
          {step === 3 && proveedorTipo === "AV" && (
            <FormCard className="mt-4">
              <Title text="Seleccione las imágenes que quiere que se muestren en su página." />
              <hr className="text-gray-200" />
              <Title text="La primera imagen será la que se muestre como la de perfil." />
              <SubirImagen onUploadImage={handleUploadImage} loading2={loading2} />
            </FormCard>
          )}
        </div>
      </>
    );
  };
  
  export default WizardNuevoProveedor;