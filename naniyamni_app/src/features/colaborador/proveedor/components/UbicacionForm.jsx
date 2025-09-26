import { useCoordenadas } from "../hooks/useCoordenadas";

const UbicacionForm = ({ idProveedor, onSuccess }) => {
    const {
        busqueda,
        sugerencias,
        latitud,
        longitud,
        obtenerSugerencias,
        seleccionarLugar,
        actualizarProveedorCoords,
        loading,
        error,
    } = useCoordenadas();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await actualizarProveedorCoords(idProveedor);
        console.log(result);
        if (onSuccess) onSuccess(); 
    };


    return (
        <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4  rounded-lg shadow border-[#AAAAAA]/30"
        >
        <label className="block mb-2 font-semibold">Buscar local</label>
        <input
            type="text"
            value={busqueda}
            onChange={(e) => obtenerSugerencias(e.target.value)}
            placeholder="Escribe el nombre del local"
            className="w-full p-3 border rounded-lg mb-2 border-[#AAAAAA]/30"
        />

        {sugerencias.length > 0 && (
            <ul className="border rounded bg-[#F9FAFB] dark:bg-[#181818] shadow-md max-h-40 overflow-y-auto mb-2">
            {sugerencias.map((s, index) => (
                <li
                key={index}
                onClick={() => seleccionarLugar(s)}
                className="p-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-[#AAAAAA]/10"
                >
                {s.properties.formatted}
                </li>
            ))}
            </ul>
        )}

        {/* <div className="mb-2">
            <p><strong>Latitud:</strong> {latitud ?? "No seleccionada"}</p>
            <p><strong>Longitud:</strong> {longitud ?? "No seleccionada"}</p>
        </div> */}

        {error && <p className="text-red-500">{error}</p>}
        {loading && <p className="text-blue-500">Actualizando proveedor...</p>}

        <button
            type="submit"
            className="w-full bg-[#007bff]/90 text-[#F9FAFB] py-2 rounded hover:bg-[#007bff] tracking-tight font-extrabold mt-2"
        >
            Guardar ubicación
        </button>
        </form>
    );
};

export default UbicacionForm;