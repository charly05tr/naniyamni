import { usePostProveedor } from "./hooks/usePostProveedor";
import { FormCard, Hr } from "@FormStyled";
import { ProveedorForm } from "./components/ProveedorForm";
import { Title } from "@TextStyled";
import { SubirImagen } from "./components/SubirImagen";
import { useState } from "react";

const ColaboradorPage = () => {
    const { create, loading, error } = usePostProveedor();
    const [proveedorId, setProveedorId] = useState(0);

     const handleCreate = async (proveedor) => {
            const data = await create(proveedor);
            setProveedorId(data);
        }

    return (
            <div className="flex items-center justify-center h-[80dvh] flex-col">
                <FormCard>
                    <Title text="Crea un proveedor de servicios turísticos"/>
                    <ProveedorForm onCreateProveedor={handleCreate} loading={loading} error={error}/>   
                </FormCard>
                <FormCard className="mt-4">
                    <SubirImagen  proveedorId={proveedorId} />
                </FormCard>
            </div>
        );
} 

export default ColaboradorPage;