import { useRegister } from "./hooks/useRegister";
import { RegisterForm } from "./components/RegisterForm";
import { Title } from "@TextStyled";

const RegisterPage = () => {
    const {register, loading, error,} = useRegister();

    const handleRegister = async (usuario) => {
        await register(usuario);
    }
    return (
        <div className="flex items-center justify-center h-[80dvh] flex-col">
            <Title>Registrate</Title>
            <RegisterForm onRegister={handleRegister} loading={loading} error={error}/>       
        </div>
    );
};

export default RegisterPage;    