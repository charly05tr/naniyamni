import { useState } from 'react';
const actividadMap = {
    "Hoteles": "H",
    "Rent a car": "AV",
    "Transporte": "TTT",
    "Museos": "CR",
    "Parques": "CR",
    "Centros turísticos": "CR",
  };

export const Search = ({ categories = [], refetch }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("Categorías"); 
    const [param, setParam] = useState("");

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setIsDropdownOpen(false); 
        refetch(actividadMap[category]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(param);
        refetch(param);
    }

    return (
        <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
        <div className="flex">
            <button
            id="dropdown-button"
            data-dropdown-toggle="dropdown"
            className="max-w-40 md:max-w-100 tracking-tight md:tracking-normal text-nowrap shrink-0 z-10 inline-flex items-center py-2.5 md:px-4 px-2 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-4xl dark:text-[#F9FAFB] dark:bg-[#181818] dark:border-[#AAAAAA]/30 focus:outline-none"
            type="button"
            onClick={toggleDropdown}
            >
            {selectedCategory}
            <svg className="dark:hover:text-gray-300 transition-transform transform hover:scale-120 duration-300 w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
            </button>

            <div
            id="dropdown"
            className={`z-10 ${isDropdownOpen ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-xl shadow-sm w-44 dark:bg-[#181818] absolute mt-12`}
            >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                {categories.map((category, index) => (
                <li key={index}>
                    <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:text-[#F9FAFB] dark:bg-[#181818] dark:hover:bg-[#AAAAAA]/10  dark:hover:text-white"
                    onClick={() => handleCategorySelect(category)}
                    >
                    {category}
                    </button>
                </li>
                ))}
            </ul>
            </div>

            <div className="relative w-full">
            <input
                type="text"
                id="search-dropdown"
                className="decoration-none block p-2.5 w-full z-20  text-gray-900 bg-gray-50 rounded-r-4xl border-s-gray-50 border-s-2 border border-gray-300 dark:text-[#F9FAFB] dark:bg-[#181818] dark:border-[#AAAAAA]/30 dark:border-l-[#AAAAAA]/5 focus:outline-none lg:min-w-100 min-w-50"
                placeholder="Buscar"
                value={param}
                spellCheck={false}
                onChange={(e) => {setParam(e.target.value)}}
            />
            <button
                type="submit"
                className="pr-3.5 absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#007bff]/90 hover:bg-[#007bff]/80 rounded-r-4xl focus:outline-none dark:bg-transparent dark:hover:bg-transparent cursor-pointer dark:hover:text-gray-200"
            >
                <svg className="w-4 h-4 transition-transform transform hover:scale-110 duration-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span className="sr-only">Search</span>
            </button>
            </div>
        </div>
        </form>
    );
};