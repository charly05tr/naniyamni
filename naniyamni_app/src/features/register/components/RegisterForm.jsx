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
            <div className="flex gap-2"> 
                <div className="flex flex-col">
                    <Input
                        onChange={(e) => setUsuario(prev => {
                            return {...prev, "first_name": e.target.value}
                        })}
                        value={usuario.first_name || ""}
                        type="text"
                        required
                        placeholder="Nombre"
                    />
                </div>
                <div className="flex flex-col">
                    <Input
                        onChange={(e) => setUsuario(prev => {
                            return {...prev, "last_name": e.target.value}
                        })}
                        value={usuario.last_name || ""}
                        type="text"
                        required
                        placeholder="Apellido"
                    />
                </div>
            </div>
            <div className="flex flex-col">
                <Input
                    onChange={(e) => setUsuario(prev => {
                        return {...prev, "email": e.target.value, "username": e.target.value}
                    })}
                    value={usuario.email || ""}
                    type="email"
                    required
                    placeholder="Email"
                />
            </div>
            <div className="flex flex-col">
                <Input
                    onChange={(e) => setUsuario(prev => {
                        return {...prev, "password": e.target.value}
                    })}
                    value={usuario.password || ""}
                    type="password"
                    required
                    placeholder="Contraseña"
                />                                                                                                         
            </div>
            <div className="flex flex-col">
                <Input
                    onChange={(e) => setUsuario(prev => {
                        return {...prev, "password2": e.target.value}
                    })}
                    value={usuario.password2 || ""}
                    type="password"
                    required
                    placeholder="Confirmar contraseña"
                />
            </div>
            <Button text={(!loading)? "Registrarse": "Cargando..."}/>
            {error && <ErrorText>{error}</ErrorText>}
        </Form>
    );
}