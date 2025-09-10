import { Button } from "@FormStyled";
import { Title } from "@TextStyled";
import { useNavigate } from "react-router-dom";

const ColaboradorPage = () => {
    const navigate = useNavigate();

    const handleNewProveedor = () => {
        navigate("/new-proveedor");
    }
    return (
        <div className="flex flex-col justify-center items-center m-2 border rounded border-gray-200 p-2">
        <Title text="Panel de colaborador"/>
        <div className="w-50">
            <Button text="Crear proveedor" onClick={handleNewProveedor}/>
        </div>
        </div>
    );
} 

export default ColaboradorPage;