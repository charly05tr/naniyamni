import { useState } from "react";
import {Input, Form, Button, ErrorText} from "@FormStyled";

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
                <label>Email</label>
                <Input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    required 
                />
            </div>
            <div className="flex flex-col">
                <label>Password</label>
                <Input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    required 
                />
            </div>
            <Button type="submit" disabled={loading}>
                {loading ? "Cargando...": "Iniciar sesión"}
            </Button>
            {error && <ErrorText>{error}</ErrorText>}
        </Form>
    );
};