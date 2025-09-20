import React from 'react';
import { usePerfil } from "../hooks/usePerfil";
import { Title } from "@TextStyled";
import { Error } from "@Error";
import { Avatar } from "@Avatar";

export const PerfilCard = () => {
    const { loading, error, perfilData } = usePerfil();

    // Nota: Es mejor almacenar en localStorage dentro de un useEffect para evitar re-renders innecesarios.
    // Aunque para este ejemplo lo mantendremos aquí por simplicidad.
    if (perfilData) {
        localStorage.setItem("nombre_turista", perfilData.first_name);
        localStorage.setItem("apellido_turista", perfilData.last_name);
    }
    
    // Clases base para el contenedor principal
    const cardBaseClasses = "relative bg-white rounded-3xl shadow-md overflow-hidden p-6 md:p-8 transform transition-transform duration-300";

    if (loading) {
        return (
            <div className={`${cardBaseClasses} flex items-center justify-center h-64`}>
                <Title text="Cargando..." className="text-xl font-semibold text-gray-700"/>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`${cardBaseClasses} flex items-center justify-center h-64`}>
                <Error>{error}</Error>
            </div>
        );
    }
    
    return (
        <div className="max-w-md mx-auto my-10">
            {(!error)?
            <div className={cardBaseClasses}>
                {/* Background degradado para un toque de estilo */}
                <div className="absolute inset-x-0 top-0 h-52 bg-gradient-to-br from-blue-50 to-cyan-50"></div>

                {/* Contenedor del avatar */}
                <div className="relative z-10 flex flex-col items-center -mt-4">
                    <Avatar imageUrl={perfilData.imagen} size="w-34 h-34" textSize="text-6xl" />
                    <Title 
                        text={`${perfilData.first_name} ${perfilData.last_name}`} 
                        className="text-2xl md:text-3xl font-bold mt-4 mb-1 text-gray-800"
                        />
                    <p className="text-gray-500 font-medium mt-6">{perfilData.rol}</p>
                    <p className="text-gray-500 text-sm mt-1">{perfilData.email}</p>
                </div>
                
                {/* Separador de contenido */}
                <div className="border-t border-gray-200 mt-6 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                        {perfilData.telefono !== 0 && (
                            <div className="flex flex-col items-start">
                                <span className="font-semibold text-gray-500 text-sm">Teléfono</span>
                                <p className="text-base font-medium">{perfilData.telefono}</p>
                            </div>
                        )}
                        <div className="flex flex-col items-start">
                            <span className="font-semibold text-gray-500 text-sm">Ubicación</span>
                            <p className="text-base font-medium">{perfilData.ciudad}, {perfilData.pais}</p>
                        </div>
                    </div>
                </div>
            </div>:<Error>No se pudo cargar tu perfil</Error>}
        </div>
   );
};