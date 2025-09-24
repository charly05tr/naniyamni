import { usePerfil } from "../hooks/usePerfil";
import { Title } from "@TextStyled";
import { Error } from "@Error";
import { Avatar } from "@Avatar";
import Cargando from "@Cargando";

export const PerfilCard = () => {
    const { loading, error, perfilData } = usePerfil();

    const cardBaseClasses = "relative rounded-3xl shadow-md overflow-hidden p-6 md:p-8 transform transition-transform duration-300";

    if (loading) {
        return (
          <Cargando>Cargando...</Cargando>
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
        <div className="md:w-2/3 w-full mx-auto my-10">
            {(!error)?
            <div className={cardBaseClasses}>   
                <div className="absolute inset-x-0 top-0 h-52 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-[#181818] dark:to-[#AAAAAA]/40"></div>
                <div className="relative z-10 flex flex-col items-center -mt-4">
                    <Avatar imageUrl={perfilData.imagen} size="w-34 h-34" textSize="text-6xl" />
                    <Title 
                        text={`${perfilData.first_name} ${perfilData.last_name}`} 
                        className="text-2xl md:text-3xl font-bold mt-4 mb-1 text-gray-800 dark:text-[#F9FAFB]"
                        />
                    <p className="text-gray-500 font-medium mt-6 dark:text-[#F9FAFB]">{perfilData.rol}</p>
                    <p className="text-gray-500 text-sm mt-1 dark:text-[#F9FAFB]">{perfilData.email}</p>
                </div>
                <div className="border-t border-gray-200 mt-6 pt-6 dark:border-[#AAAAAA]/30">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                        {perfilData.telefono !== 0 && (
                            <div className="flex flex-col items-start">
                                <span className="font-semibold text-gray-500 text-sm dark:text-[#F9FAFB]/80">Teléfono</span>
                                <p className="text-base font-medium dark:text-[#F9FAFB]">{perfilData.telefono}</p>
                            </div>
                        )}
                        <div className="flex flex-col items-start">
                            <span className="font-semibold text-gray-500 text-sm dark:text-[#F9FAFB]/80">Ubicación</span>
                            <p className="text-base font-medium dark:text-[#F9FAFB]">{perfilData.ciudad}, {perfilData.pais}</p>
                        </div>
                    </div>
                </div>
            </div>:<Error>No se pudo cargar tu perfil</Error>}
        </div>
   );
};