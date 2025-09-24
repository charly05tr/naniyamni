import { useState } from 'react';
import Cargando from "@Cargando";
import { SubirImagen } from './SubirImagen';
import { useUploadImage } from '../hooks/useUploadImage';
import { deleteImage } from '../services/deleteImage';

const ProveedorImageManager = ({ initialImages, proveedorId }) => {
    const [images, setImages] = useState(initialImages);
    const [loading2, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { uploadImage, loading } = useUploadImage();

    const handleUploadImage = async (file) => {
        await uploadImage(file, proveedorId, "Mi imagen"); 
    }
    
    const handleDeleteImage = async (imageId) => {
        setLoading(true);
        setError(null);
        try {
        await deleteImage(imageId);
        setImages(images.filter(image => image.id !== imageId));
        } 
        finally {
        setLoading(false);
        window.location.reload();
        }
    };

    return (
        <div className="py-4 md:px-10 px-4  bg-gray-100 dark:bg-[#18181818] rounded-lg shadow-md">
        <h1 className="py-5 text-2xl text-zinc-800 font-bold dark:text-[#F9FAFB]">Actualizar imágenes</h1>

        {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
            </div>
        )}
        
        {loading2 && (
            <div className="text-center text-blue-500 mb-4">
            <Cargando>Cargando...</Cargando>
            </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images?.map((image) => (
            <div key={image.id} className="relative group overflow-hidden rounded-lg shadow-lg">
                <img 
                src={image.image_url} 
                alt={image.title} 
                className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-[#181818]/70 bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                    onClick={() => handleDeleteImage(image.id)}
                    className="p-2 bg-[#E53935]/80 text-white rounded-full hover:bg-red-700 transition-colors"
                    title="Eliminar imagen"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
                </div>
            </div>
            ))}
        </div>
        <div className='my-5'>
        <h1 className="pb-5 pt-10 text-2xl text-zinc-800 font-bold dark:text-[#F9FAFB]">Agrega nuevas imágenes</h1>
            <SubirImagen onUploadImage={handleUploadImage} loading2={loading}/>
        </div>
        </div>
    );
};

export default ProveedorImageManager;