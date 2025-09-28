import React, { useState } from 'react';

const MenuAcciones = ({ onEdit, onDelete, onPreview, id, proveedor, textOnDelete = "Eliminar" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          className="flex items-center justify-center w-8 h-8 rounded-full text-gray-500 hover:text-gray-900 focus:outline-none"
        >
          {/* SVG para los tres puntos */}
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
            <path d="M2 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>
          </svg>
          <span className="sr-only">Abrir menú de acciones</span>
        </button>
      </div>

      {/* Menú desplegable */}
      <div
        className={`absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-[#181818] ${isMenuOpen ? '' : 'hidden'}`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <div className="py-1" role="none">
          <button
            onClick={() => { onEdit(id, proveedor); setIsMenuOpen(false); }}
            className="text-gray-700 dark:text-gray-200 block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-[#AAAAAA]/10"
            role="menuitem"
          >
            Editar
          </button>
          <button
            onClick={() => { onDelete(id, proveedor); setIsMenuOpen(false); }}
            className="text-gray-700 dark:text-gray-200 block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-[#AAAAAA]/10"
            role="menuitem"
          >
            {textOnDelete}
          </button>
          <button
            onClick={() => { onPreview(id); setIsMenuOpen(false); }}
            className="text-gray-700 dark:text-gray-200 block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-[#AAAAAA]/10"
            role="menuitem"
          >
            Vista previa
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuAcciones;