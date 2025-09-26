import { useState, useEffect } from "react";
import { Form, Button } from "@FormStyled";
import { Error } from "@Error";
import Cargando from "@Cargando";
import InputList from "@InputList";

export const SucursalesForm = ({
    onCreateSucursales,
    onUpdateSucursales,
    loading,
    error,
    sucursalesOld = [], // Array de sucursales existentes
}) => {
    // Inicializamos con las sucursales existentes si las hay
    const [sucursales, setSucursales] = useState(sucursalesOld.length ? sucursalesOld : [""]);
    console.log(sucursalesOld || 0);
    useEffect(() => {
        if (sucursalesOld.length) {
            setSucursales(sucursalesOld);
        }
    }, [sucursalesOld]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (sucursalesOld.length && onUpdateSucursales) {
            onUpdateSucursales(sucursales);
        } else if (onCreateSucursales) {
            onCreateSucursales(sucursales);
        }
    };

    const handleChange = (e) => {
        setSucursales(e.target.value);                                     
    };

    if (loading) return <Cargando>Enviando...</Cargando>;
    if (error) return <Error>{error}</Error>;

    return (
        <Form onSubmit={handleSubmit}>
            <InputList
                name="sucursales"
                listObject="sucursales-list"
                placeholderText="Sucursal"
                labelText="Escribe las sucursales que tienes disponibles"
                buttonText="Agregar otra sucursal"
                ValoresIniciales={sucursales}
                OpcionesSugeridas={["Sucursal Central", "Sucursal Norte"]}
                handleChange={handleChange}
            />
            <Button type="submit" className="w-full" text="Guardar sucursales" />
        </Form>
    );
};
