import { useState } from "react";
import { Input, Form, Button, ErrorText, TextArea } from "@FormStyled";
import { SelectActividad } from "./SelectActividad";
import { Error } from "@Error";
import Cargando from "@Cargando";
import ProveedorImageManager from "./ActualizarImage";
import { useNavigate } from "react-router-dom";

const reglasPredeterminadas = [
    'No fumar',
    'No se permiten mascotas',
    'Silencio después de las 10 PM',
    'No apto para niños',
];

const amenidadesPredeterminadas = [
    'Wi-Fi',
    'Estacionamiento',
    'Piscina',
    'Gimnasio',
    'Aire acondicionado',
];

export const ProveedorForm = ({onCreateProveedor, loading, error, proveedorOldData = {}, oldReglas = [''], oldAmenidades = [''] , onUpdate}) => {
    const [proveedor, setProveedor] = useState(proveedorOldData);
    const [reglas, setReglas] = useState(oldReglas); 
    const [amenidades, setAmenidades] = useState(oldAmenidades); 
    const navigate = useNavigate();
    const handleAgregarRegla = () => {
        setReglas([...reglas, '']);
    };

    const handleEliminarRegla = (index) => {
        const nuevasReglas = [...reglas];
        nuevasReglas.splice(index, 1);
        setReglas(nuevasReglas);
    };


    const handleCambiarRegla = (e, index) => {
        const nuevasReglas = [...reglas];
        nuevasReglas[index] = e.target.value;
        setReglas(nuevasReglas);
    };
    
    const handleAgregarAmenidad = () => {
        setAmenidades([...amenidades, '']);
    };

    const handleEliminarAmenidad = (index) => {
        const nuevasAmenidades = [...amenidades];
        nuevasAmenidades.splice(index, 1);
        setAmenidades(nuevasAmenidades);
    };

    const handleCambiarAmenidad = (e, index) => {
        const nuevasAmenidades = [...amenidades];
        nuevasAmenidades[index] = e.target.value;
        setAmenidades(nuevasAmenidades);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const proveedorData = {
            ...proveedor,
            reglas: reglas.filter(r => r.trim() !== ''),
            amenidades: amenidades.filter(a => a.trim() !== ''),
        };
        if (Object.keys(proveedorOldData).length <= 0) {
            onCreateProveedor(proveedorData);
        } else {
            onUpdate(proveedorData, proveedorOldData.id);
            navigate(`/colaborador`);
        }
    }

    if (loading) {
        return (
            <div>
                <Cargando>Enviando...</Cargando>
            </div>
        )
    }

    return (
        <div>
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
                    value={proveedor.direccion || ""}
                    type="text"
                    required
                    placeholder="Dirección"
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
            <div className="flex flex-col mt-4">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Reglas</label>
                {reglas.map((regla, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                        <Input
                            list="reglas-list"
                            value={regla}
                            onChange={(e) => handleCambiarRegla(e, index)}
                            placeholder="Escribe una regla o selecciona una"
                        />
                        <datalist id="reglas-list">
                            {reglasPredeterminadas.map((opcion, i) => (
                                <option key={i} value={opcion} />
                            ))}
                        </datalist>
                        {reglas.length > 1 && (
                            <button
                                type="button"
                                onClick={() => handleEliminarRegla(index)}
                                className="p-2 text-[#E53935]/70 hover:text-[#E53935]/80"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                                </svg>
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAgregarRegla}
                    className="mt-2 text-indigo-600 hover:text-indigo-800 font-medium text-sm text-left w-fit"
                >
                    + Agregar otra regla
                </button>
            </div>
            <div className="flex flex-col mt-4">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amenidades</label>
                {amenidades.map((amenidad, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                        <Input
                            list="amenidades-list"
                            value={amenidad}
                            onChange={(e) => handleCambiarAmenidad(e, index)}
                            placeholder="Escribe una amenidad o selecciona una"
                        />
                        <datalist id="amenidades-list">
                            {amenidadesPredeterminadas.map((opcion, i) => (
                                <option key={i} value={opcion} />
                            ))}
                        </datalist>
                        {amenidades.length > 1 && (
                            <button
                                type="button"
                                onClick={() => handleEliminarAmenidad(index)}
                                className="p-2 text-[#E53935]/70 hover:text-[#E53935]/80"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                                </svg>
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAgregarAmenidad}
                    className="mt-2 text-indigo-600 hover:text-indigo-800 font-medium text-sm text-left w-fit"
                >
                    + Agregar otra amenidad
                </button>
            </div>
            {Object.keys(proveedorOldData).length <= 0 
            ?
            <div className="flex flex-col items-center mt-5 gap-5">
                <Button text={(!loading)? "Crear": "Cargando..."}/>
                {(error)&&<Error>{error}</Error>}
            </div>
            :
            <div className="flex w-full items-center justify-center">
                <div className="flex flex-col items-center mt-5 gap-5 w-fit">
                    <Button text={(!loading)? "Actualizar": "Cargando..."}/>
                    {(error)&&<Error>{error}</Error>}
                </div>
            </div>}
        </Form>
        {Object.keys(proveedorOldData).length > 0 
            &&
            <div className="mt-10">
                <ProveedorImageManager initialImages={proveedorOldData.imagenes} proveedorId={proveedorOldData.id} />
                </div>}
        </div>
    )
}