import { useState } from "react";
import {Input, Form, Button, ErrorText} from "@FormStyled";

export const RegisterForm = ({onRegister, loading, error}) => {
    const [usuario, setUsuario] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(usuario);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <div className="flex flex-col">
                <label>Email</label>
                <Input
                    onChange={(e) => setUsuario(prev => {
                        return {...prev, "email": e.target.value, "username": e.target.value}
                    })}
                    value={usuario.email || ""}
                    type="email"
                    required
                />
            </div>
            <div className="flex flex-col">
                <label>Contraseña</label>
                <Input
                    onChange={(e) => setUsuario(prev => {
                        return {...prev, "password": e.target.value}
                    })}
                    value={usuario.password || ""}
                    type="password"
                    required
                />
            </div>
            <div className="flex flex-col">
                <label>Confirmar contraseña</label>
                <Input
                    onChange={(e) => setUsuario(prev => {
                        return {...prev, "password2": e.target.value}
                    })}
                    value={usuario.password2 || ""}
                    type="password"
                    required
                />
            </div>
            <div className="flex flex-col">
                <label>Nombre</label>
                <Input
                    onChange={(e) => setUsuario(prev => {
                        return {...prev, "first_name": e.target.value}
                    })}
                    value={usuario.first_name || ""}
                    type="text"
                    required
                />
            </div>
            <div className="flex flex-col">
                <label>Apellido</label>
                <Input
                    onChange={(e) => setUsuario(prev => {
                        return {...prev, "last_name": e.target.value}
                    })}
                    value={usuario.last_name || ""}
                    type="text"
                    required
                />
            </div>
            <Button>{(!loading)? "Registrarse": "Cargando..."}</Button>
            {error && <ErrorText>{error}</ErrorText>}
        </Form>
    );
}