import { GoogleButton, Form, ErrorText } from "@FormStyled";

export const RegisterGoogle = ({ onRegisterWithGoogle, loading, error }) => {
    const handleRegisterWithGoogle = (e) => {
        e.preventDefault();
        onRegisterWithGoogle();
    };

    return (
        <Form onSubmit={handleRegisterWithGoogle}>
            <GoogleButton text={(!loading)?"Registrarse con Google":"Cargando"}/>
            {error && <ErrorText>{error}</ErrorText>}
        </Form>
    );
}