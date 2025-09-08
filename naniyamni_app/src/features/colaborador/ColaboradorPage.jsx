import { usePostProveedor } from "./hooks/usePostProveedor";
import { Hr, FormCard } from "@FormStyled";
import { ProveedorForm } from "./components/ProveedorForm";
import { Title } from "@TextStyled";

const ColaboradorPage = () => {
    const { create, loading, error } = usePostProveedor();

     const handleCreate = async (proveedor) => {
            await create(proveedor);
        }

    return (
            <div className="flex items-center justify-center h-[80dvh] flex-col">
                <FormCard>
                    <Title text="Crea un proveedor de servicios turísticos"/>
                    <ProveedorForm onCreateProveedor={handleCreate} loading={loading} error={error}/>    
                </FormCard>
            </div>
        );
} 

export default ColaboradorPage;