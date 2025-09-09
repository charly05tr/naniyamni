import { useLogin } from "./hooks/useLogin";
import { LoginForm } from "./components/LoginForm";
import { FormCard, Hr } from "@FormStyled";
import { Title } from "@TextStyled";
import { GoogleLogin } from "./components/GoogleLogin";

const LoginPage = () => {
    const {handleLogin, loading, error} = useLogin();

    const handleSubmit = async (username, password) => {
        await handleLogin(username, password);
    }

    return (
        <div className="flex items-center justify-center h-[80dvh] flex-col">
            <FormCard>
                <Title text="Bienvenido"/>
                <LoginForm onLogin={handleSubmit} loading={loading} error={error}/>
                <Hr/>
                <GoogleLogin/>
            </FormCard>
        </div>
    );
};

export default LoginPage;