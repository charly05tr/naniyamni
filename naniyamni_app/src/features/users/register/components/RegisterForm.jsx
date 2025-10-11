import { useState } from "react";
import {Input, Form, Button, ErrorText} from "@FormStyled";

export const RegisterForm = ({onRegister, loading, error, usuarioData = {}, colaborador = false}) => {
    const [usuario, setUsuario] = useState(usuarioData);

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
            {(colaborador)?
            <div className="flex flex-col">
                    {/* <label className="dark:text-[#F9FAFB]">Teléfono</label> */}
                    <Input
                        onChange={(e) => setUsuario(prev => {
                            return {...prev, "telefono": e.target.value}
                        })}
                        value={(usuario.telefono !== "0")?usuario.telefono:""}
                        type="text"
                        required
                        placeholder="Teléfono"
                        />                                                                                                         
                </div>:""}
            {(!usuarioData)?
            <div className="flex flex-col gap-4">
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
            </div>
            :
            <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                    {/* <label className="dark:text-[#F9FAFB]">Teléfono</label> */}
                    <Input
                        onChange={(e) => setUsuario(prev => {
                            return {...prev, "telefono": e.target.value}
                        })}
                        value={(usuario.telefono !== "0")?usuario.telefono:""}
                        type="text"
                        required
                        placeholder="Teléfono"
                        />                                                                                                         
                </div>
                {/* <button className="w-full py-3 text-sm rounded-full  text-white/95 bg-[#007bff]/80 font-extrabold cursor-pointer hover:bg-[#007bff]/80 tracking-tight">{(!loading)? "Actualizar": "Cargando..."}</button> */}
                {error && <ErrorText>{error}</ErrorText>}
            </div>}
        </Form>
    );
}