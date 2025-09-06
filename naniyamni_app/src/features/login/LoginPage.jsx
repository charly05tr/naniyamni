import { useLogin } from "./hooks/useLogin";
import { LoginForm } from "./components/LoginForm";
import { Title } from "@TextStyled";

const LoginPage = () => {
    const {login, loading, error} = useLogin();

    const handleSubmit = async (username, password) => {
        await login(username, password);
    }
    return (
        <div className="flex items-center justify-center h-[80dvh] flex-col">
        <Title>Login</Title>
        <LoginForm onLogin={handleSubmit} loading={loading} error={error}/>
        </div>
    );
};

export default LoginPage;