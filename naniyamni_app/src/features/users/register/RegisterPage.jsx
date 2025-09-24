import { useRegister } from "./hooks/useRegister";
import { RegisterForm } from "./components/RegisterForm";
import { Title } from "@TextStyled";
import { RegisterGoogle } from "./components/RegisterGoogle";
import { Hr, FormCard } from "@FormStyled";

const RegisterPage = () => {
    const {register, loading, error,} = useRegister();

    const handleRegister = async (usuario) => {
        await register(usuario);
    }
    return (
        <div className="flex items-center justify-center h-[80dvh] flex-col">
            <FormCard>
                <Title text="Regístrate"/>
                <RegisterForm onRegister={handleRegister} loading={loading} error={error} usuarioData={false}/>    
                <Hr/>
                <RegisterGoogle/>   
            </FormCard>
        </div>
    );
};

export default RegisterPage;    