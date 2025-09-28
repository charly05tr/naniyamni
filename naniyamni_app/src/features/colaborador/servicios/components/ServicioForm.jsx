import { Input, Button, TextArea, Form } from "@FormStyled"
import { HotelForm } from "./HotelForm";
import { ArrendamientoVehiculoForm } from "./ArrendamientoVehiculoForm";
import ParentComponent from "./TransporteForm";
import { AtraccionesForm } from "./AtracionesForm";
import { useServicioForm } from "../hooks/useServicioForm";
import InputList  from "@InputList";
import { useEffect } from "react";
import { quitarSegundos } from "@config"
import InputErrorMessage from "@InputErrorMessage";
import ProveedorImageManager from "../../proveedor/components/ActualizarImage";

export const ServicioForm = ({ tipo, onSubmit, onUpdate, servicioOld, proveedorOld=true, refetch, loading4 }) => {
    const { handleChange, handleSubmit, formData, setFormData, errorValidacion } = useServicioForm(
        servicioOld ? onUpdate : onSubmit, 
        tipo
    );

    // Cargar datos antiguos si existen
    useEffect(() => {
        if (servicioOld) {
            setFormData({
                nombre: servicioOld.nombre || "",
                descripcion: servicioOld.descripcion || "",
                precio: servicioOld.precio || 0,
                disponible: servicioOld.disponible || false,
                caracteristicas: (servicioOld.caracteristicas_data || []).map(s => s.nombre),
                ...servicioOld.tipo_servicio === "V" ? {
                    marca: servicioOld.marca || "",
                    modelo: servicioOld.modelo || "",
                    transmision: servicioOld.transmision || "",
                    cant_asientos: servicioOld.cant_asientos || 0,
                    cant_vehiculos: servicioOld.categoria.cant_vehiculos || 0,
                    sucursales: (servicioOld.sucursales_data || []).map(s => s.direccion),
                    sucuralesDisponibles: (proveedorOld.sucursales || []).map(s=> s.direccion)
                } : {},
                 ...servicioOld.tipo_servicio === "H" ? {
                    capacidad: servicioOld.capacidad || "",
                    tipo: servicioOld.tipo || "",
                    hora_check_in: quitarSegundos(servicioOld.hora_check_in) || "",
                    hora_check_out: quitarSegundos(servicioOld.hora_check_out) || "",
                } : {},
                ...servicioOld.tipo_servicio === "A" ? {
                    cupo_maximo: servicioOld.cupo_maximo || "",
                    hora_apertura: quitarSegundos(servicioOld.hora_apertura) || "",
                    hora_cierre: quitarSegundos(servicioOld.hora_cierre) || "",
                    duracion: quitarSegundos(servicioOld.duracion) || "",
                    guia_incluido: servicioOld.guia_incluido || false,
                    dias_abierto: servicioOld.dias_abierto || ['']
                } : {},
                ...servicioOld.tipo_servicio === "VI" ? {
                    asientos_disponibles: servicioOld.asientos_disponibles || "",
                    origen: servicioOld.origen || "",   
                    destinos: servicioOld.destinos || [],
                    itinerarios: servicioOld.itinerarios || [{}]
                } : {}
            });
        }
    }, [servicioOld, setFormData, proveedorOld]);

    return (
        <>
        <Form onSubmit={handleSubmit}>
            <div>
                <Input 
                    name="nombre" 
                    value={formData.nombre} 
                    onChange={handleChange} 
                    placeholder={`${tipo === "AV" ? "Categoría" : "Título"}`} 
                    required 
                />
                {errorValidacion.nombre && (<InputErrorMessage>{errorValidacion.nombre}</InputErrorMessage>)}
            </div>
            <div>
                <TextArea 
                    name="descripcion" 
                    value={formData.descripcion} 
                    onChange={handleChange} 
                    placeholder="Descripción"
                />
            </div>
            <div>
                <Input 
                    type="number" 
                    step="0.01" 
                    name="precio" 
                    value={formData.precio} 
                    onChange={handleChange} 
                    placeholder="Precio" 
                    required 
                />
                {errorValidacion.precio && (<InputErrorMessage>{errorValidacion.precio}</InputErrorMessage>)}
            </div>
            <div className="flex mt-2 items-center gap-2">
                <input
                    type="checkbox"
                    id="disponible"
                    checked={formData.disponible}
                    onChange={(e) =>
                        setFormData({ ...formData, disponible: e.target.checked })
                    }
                    className="h-5 w-5 rounded-lg border-gray-100"
                />
                <label htmlFor="disponible" className="text-gray-800/95 dark:text-[#F9FAFB]">
                    Disponible
                </label>
            </div>

            {tipo === "H" && (
                <HotelForm handleChange={handleChange} formData={formData} errorValidacion={errorValidacion}/>
            )}
            {tipo === "AV" && (
                <ArrendamientoVehiculoForm handleChange={handleChange} formData={formData} errorValidacion={errorValidacion} />
            )}
            {(tipo === "TTT" || tipo === "OV") && (
                <ParentComponent 
                    handleChange={handleChange} 
                    formDataTrans={formData} 
                    setFormDataTrans={setFormData}
                    esNuevo={!servicioOld} 
                    errorValidacion={errorValidacion}
                />
            )}
            {tipo === "CR" && (
                <AtraccionesForm handleChange={handleChange} formData={formData} setFormData={setFormData} errorValidacion={errorValidacion} />
            )}

            <InputList
                name="caracteristicas"
                listObject="caracteristicas-list"
                placeholderText="Característica"
                labelText="Agrega características adicionales o servicios extras."
                buttonText="Agregar otra característica"
                ValoresIniciales={formData.caracteristicas || ['']}
                OpcionesSugeridas={["GPS", "Aire acondicionado"]}
                handleChange={handleChange}
            />
            <div className="w-full flex justify-center">
                <div className="w-fit">
                    <Button type="submit" text={servicioOld ? "Actualizar servicio" : "Guardar servicio"} />
                </div>
            </div>
        </Form>
            {Object.keys(servicioOld || {})?.length > 0 
            &&
            <div className="mt-10">
                <ProveedorImageManager initialImages={servicioOld?.imagenes} proveedorId={servicioOld?.id} esServicio={true} refetch={refetch} loading4={loading4}/>
                </div>}
    </>
    );
};