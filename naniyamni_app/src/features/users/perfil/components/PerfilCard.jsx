import { usePerfil } from "../hooks/usePerfil";
import { Title } from "@TextStyled";
import { ErrorText } from "@FormStyled";
import { Avatar } from "@Avatar";

export const PerfilCard = () => {
    const { loading, error, perfilData } = usePerfil();
    localStorage.setItem("nombre_turista", perfilData.first_name);
    localStorage.setItem("apellido_turista", perfilData.last_name);

    return (
        <div className="p-2 text-center border border-gray-200 m-2">
            {(!loading) 
                ?
                    <>
                        <Title text={`${perfilData.first_name} ${perfilData.last_name}`}/>
                        <div className="flex justify-center m-5">
                            <Avatar imageUrl={perfilData.imagen} size="w-25 h-25" textSize="text-5xl"/>
                        </div>
                        <div>
                            <p className="text-gray-800">{perfilData.email}</p>
                        </div>
                        <div className="w-full flex flex-col text-gray-800 items-start bg-amber-50 mt-5 p-2 rounded border-gray-200">
                            <div>
                                {(perfilData.telefono != 0)?<p className="m-2">Teléfono: {perfilData.telefono}</p>:""}
                            </div>
                            <div>
                                <p className="m-2">Rol: {perfilData.rol}</p>
                            </div>
                            <div>
                                <p className="m-2">Ciudad: {perfilData.ciudad}, {perfilData.pais}</p>
                            </div>
                        </div>
                    </>    
                :
                    <Title text="Cargando..." />
            }
            {error && <ErrorText>{error}</ErrorText>}
        </div>
   );
};
