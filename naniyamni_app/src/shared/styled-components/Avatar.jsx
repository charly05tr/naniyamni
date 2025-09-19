import React from 'react';

export const Avatar = ({ imageUrl, size = "w-9 h-9", textSize = "text-sm", onClick = null }) => {

  const nombre = localStorage.getItem('nombre_turista');
  const apellido = localStorage.getItem('apellido_turista');

  const iniciales =
    (nombre?.charAt(0) || "") +
    (apellido?.charAt(0) || "");

  const baseClasses = `flex items-center justify-center rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${size}`;
  const clickClasses = onClick ? 'cursor-pointer' : '';

  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${clickClasses} ${imageUrl ? '' : 'bg-blue-600/80 shadow-lg hover:bg-blue-700'}`}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`${nombre} ${apellido}`}
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <span className={`text-white uppercase  ${textSize}`}>
          {iniciales}
        </span>
      )}
    </div>
  );
};