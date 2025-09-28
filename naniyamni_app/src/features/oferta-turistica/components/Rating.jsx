
// Componente para una estrella completa
const FullStar = () => (
    <svg className="w-3 h-3 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
);

// Componente para una estrella vacía (o no rellenada)
const EmptyStar = () => (
    <svg className="w-3 h-3 ms-1 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
);

// Componente para una media estrella
// Esto es una simplificación; en un caso real, podrías usar un SVG diferente
// o superponer dos SVG para un efecto de "media estrella" más preciso.
const HalfStar = () => (
    <svg className="w-3 h-3 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        {/* La mitad izquierda de la estrella - simulación */}
        <path d="M11 17.033l-4.518 2.375a1.534 1.534 0 0 1-2.226-1.617l.863-5.03L1.463 9.2a1.523 1.523 0 0 1 .387-1.575L7.365 5.847l2.259-4.577a1.534 1.534 0 0 1 2.752 0L11 5.847v11.186Z" />
        {/* La mitad derecha se deja sin rellenar o se usa un color de fondo para simular */}
        <path className="text-gray-300 dark:text-gray-500" d="M11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575L15.865 5.847l-2.259-4.577a1.534 1.534 0 0 0-2.752 0L11 5.847v11.186Z" />
    </svg>
);


export const Rating = () => {
    // Genera un número aleatorio entre 3 y 4.5
    // Math.random() * (max - min) + min
    const rating = Math.random() * (4.7 - 3) + 3;
    const fullStars = Math.floor(rating); // Número de estrellas completas
    const hasHalfStar = rating - fullStars >= 0.5; // ¿Hay media estrella?
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Número de estrellas vacías

    return (
        <div className="flex items-center">
            {/* Renderizar estrellas completas */}
            {[...Array(fullStars)].map((_, i) => (
                <FullStar key={`full-${i}`} />
            ))}

            {/* Renderizar media estrella si es necesario */}
            {hasHalfStar && <HalfStar />}

            {/* Renderizar estrellas vacías */}
            {[...Array(emptyStars)].map((_, i) => (
                <EmptyStar key={`empty-${i}`} />
            ))}
        </div>
    );
};