import { useState, useEffect } from "react";
import { Input } from "../styled-components/FormStyled";

const InputList = ({ 
    name,
    listObject, 
    placeholderText, 
    labelText,
    buttonText, 
    ValoresIniciales = [''], 
    OpcionesSugeridas = [], 
    handleChange, 
}) => {
    const [list, setList] = useState(ValoresIniciales);
    useEffect(() => {
        if (ValoresIniciales && ValoresIniciales.length > 0) {
            setList(ValoresIniciales);
        }
        else {
            return;
        }
    }, [ValoresIniciales]);
    const actualizarLista = (nuevasList) => {
        setList(nuevasList);
        if (handleChange) {
            handleChange({
                target: {
                    name: name,
                    value: nuevasList,
                },
            });
        }
    };

    const handleAgregar = () => {
        actualizarLista([...list, '']);
    };

    const handleCambiar = (value, index) => {
        const nuevasList = [...list];
        nuevasList[index] = value;
        actualizarLista(nuevasList);
    };

    const handleEliminar = (index) => {
        const nuevasList = list.filter((_, i) => i !== index);
        actualizarLista(nuevasList);
    };

    return (
        <div className="flex flex-col mt-4">
            {labelText && (
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {labelText}
                </label>
            )}
            {list.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                    <Input
                        name={name}
                        list={listObject}
                        value={item}
                        onChange={(e) => handleCambiar(e.target.value, index)}
                        placeholder={placeholderText}
                    />
                    <datalist id={listObject}>
                        {OpcionesSugeridas.map((opcion, i) => (
                            <option key={i} value={opcion} />
                        ))}
                    </datalist>
                    {list.length >= 1 && (
                        <button
                            type="button"
                            onClick={() => handleEliminar(index)}
                            className="p-2 text-[#E53935]/70 hover:text-[#E53935]/80"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 012 0v6a1 1 0 11-2 0V8z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    )}
                </div>
            ))}
            <button
                type="button"
                onClick={handleAgregar}
                className="mt-2 text-indigo-600 hover:text-indigo-800 font-medium text-sm text-left w-fit"
            >
                + {buttonText}
            </button>
        </div>
    );
};

export default InputList;
