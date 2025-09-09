import { useState } from "react";
import { Input, Form, Button, ErrorText } from "@FormStyled";

export const LoginForm = ({onLogin, loading, error}) => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({email, password});
    };

    return (
        <Form onSubmit={handleSubmit} >
            <div className="flex flex-col">
                <Input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    required 
                    placeholder="Email"
                />
            </div>
            <div className="flex flex-col">
                <Input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    required 
                    placeholder="Contraseña"
                />
            </div>
            <Button type="submit" disabled={loading} text={loading ? "Cargando...": "Iniciar sesión"}/>
            {error && <ErrorText>{error}</ErrorText>}
        </Form>
    );
};