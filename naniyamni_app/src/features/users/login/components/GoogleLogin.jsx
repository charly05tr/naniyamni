import { GoogleButton, Form, ErrorText } from "@FormStyled";

export const GoogleLogin = ({ onLoginWithGoogle, loading, error }) => {
    const handleLoginWithGoogle = (e) => {
        e.preventDefault();
        onLoginWithGoogle();
    };

    return (
        <Form onSubmit={handleLoginWithGoogle}>
            <GoogleButton text={(!loading)?"Iniciar sesión con Google":"Cargando"}/>
            {error && <ErrorText>{error}</ErrorText>}
        </Form>
    );
}