import { API_URL } from "@config";

export const getProveedorDetail = async (id) => {
    const response = await fetch(`${API_URL}oferta-turistica/proveedores/${id}/`);

    if(!response.ok) {
        throw new Error("Error al cargar el detalle del proveedor");
    }

    const data = await response.json();
    console.log(data);
    return data;
}