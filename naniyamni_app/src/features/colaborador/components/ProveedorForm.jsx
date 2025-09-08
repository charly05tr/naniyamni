import { useState } from "react";
import { Input, Form, Button, ErrorText, TextArea } from "@FormStyled";
import { SelectActividad } from "./SelectActividad";

export const ProveedorForm = ({onCreateProveedor, loading, error}) => {
    const [proveedor, setProveedor] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreateProveedor(proveedor);
    }

    return (
        <Form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <Input
                        onChange={(e) => setProveedor(prev => {
                            return {...prev, "nombre": e.target.value}
                        })}
                        value={proveedor.nombre || ""}
                        type="text"
                        required
                        placeholder="Nombre"
                    />
                </div>
                <div className="flex flex-col">
                    <TextArea
                        onChange={(e) => setProveedor(prev => {
                            return {...prev, "descripcion": e.target.value}
                        })}
                        value={proveedor.descripcion || ""}
                        placeholder="Descripción"
                    />
                </div>
                <div className="flex flex-col">
                    <Input
                        onChange={(e) => setProveedor(prev => {
                            return {...prev, "ciudad": e.target.value}
                        })}
                        value={proveedor.ciudad|| ""}
                        type="text"
                        required
                        placeholder="Ciudad"
                    />
                </div>
                <div className="flex flex-col">
                    <Input
                        onChange={(e) => setProveedor(prev => {
                            return {...prev, "direccion": e.target.value}
                        })}
                        value={proveedor.direccion|| ""}
                        type="text"
                        required
                        placeholder="Direccion"
                    />
                </div>
                <div className="flex flex-col">
                    <SelectActividad 
                        onChange={(e) => setProveedor(prev => {
                            return {...prev, "tipo": e.target.value}
                        })}
                        value={proveedor.tipo|| ""}
                    />
                </div>
            <Button text={(!loading)? "Crear": "Cargando..."}/>
            {error && <ErrorText>{error}</ErrorText>}
        </Form>
    )
}