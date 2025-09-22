import { useState, useEffect } from "react";

export default function ThemeSwitch() {
    const [darkMode, setDarkMode] = useState(false);
  
    useEffect(() => {
      // Cargar preferencia guardada o la del sistema
      if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        setDarkMode(true);
        document.documentElement.classList.add("dark");
      } else {
        setDarkMode(false);
        document.documentElement.classList.remove("dark");
      }
    }, []);
  
    const toggleTheme = () => {
      const newTheme = !darkMode;
      setDarkMode(newTheme);
  
      if (newTheme) {
        document.documentElement.classList.add("dark");
        localStorage.theme = "dark";
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.theme = "light";
      }
    };
  
    return (
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={darkMode}
          onChange={toggleTheme}
        />
        <div
          className="w-12 h-6 bg-gray-200 peer-focus:outline-none dark:bg-gray-700
                     rounded-full peer peer-checked:bg-blue-500
                     transition-colors duration-300"
        ></div>
        <span
          className="absolute left-0.5 top-0.5 w-5 h-5 bg-white border border-gray-300 
                     rounded-full transition-transform duration-300
                     peer-checked:translate-x-6 dark:border-gray-600"
        ></span>
      </label>
    );
  }