import { useEffect, useRef, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch"
import { Avatar } from "../styled-components/Avatar";
import { AuthContext } from "@authContext";
import Cargando from "@Cargando";

const Navbar = ({ brandName = "Naniyamni", logoSrc = "/public/logo.png", user, loading}) => {
  const { token } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileRef = useRef(null);
  const buttonRef = useRef(null);
  const dashboard = (user?.rol === "Proveedor")?{ name: "Dashboard", path: "/colaborador"}:{ name: "Mi Tour", path: "/MiTour" };
  const NAV_LINKS = [
    { name: "Inicio", path: "/" },
    { name: "Oferta Turística", path: "/oferta-turistica" },
    dashboard,
  ];
  
  useEffect(() => {
    function onDocClick(e) {
      if (
        mobileRef.current &&
        !mobileRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setMobileOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);
  
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      if (mobileOpen) {
        return;
      }
      if (window.scrollY > lastScrollY) {
        // scrolling hacia abajo
        setVisible(false);
      } else {
        // scrolling hacia arriba
        setVisible(true);
      }
      setLastScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, mobileOpen]);
  
  if (loading) {
    return (
      <Cargando></Cargando>
    )
  }
  return (
    <header className={`sticky top-0 z-50 bg-gray-50/80 backdrop-blur-sm border-b border-gray-200/80 transition-transform duration-300 dark:bg-[#202124]/50 dark:border-[#AAAAAA]/30 dark:text-[#F9FAFB] ${
      visible ? "translate-y-0" : "-translate-y-full"
    }`}>
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          <NavLink to="/" className="flex items-center gap-3 cursor-pointer lg:w-70">                                                                                             
            <img src={logoSrc} alt={`${brandName} logo`} className="h-10 w-10 transition-transform duration-300 hover:scale-105" />
            <span className="hidden sm:inline font-semibold">{brandName}</span>
          </NavLink>
          <nav aria-label="Primary" className="hidden md:flex md:items-center md:gap-2 w-fit">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({isActive}) =>
                      "px-3 py-2 rounded-md text-sm font-medium cursor-pointer" +
                      ( 
                        (isActive)
                      ? "text-blue-700 bg-blue-50 dark:bg-[#AAAAAA]/10"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-[#AAAAFF]/10 dark:hover:text-white")
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-end lg:gap-3 lg:w-70 w-fit">
            {/* <ThemeSwitch /> */}
            {(!token)
              ?<div className="flex gap-2 items-center">
                  <NavLink to="/login" className={ ({isActive}) => 
                          (isActive
                              ? "text-[#007bff] bg-blue-50 px-3 py-2 rounded-md text-sm font-medium cursor-pointer text-nowrap dark:text-[#F9FAFB] dark:bg-[#AAAA]"
                              : "text-zinc-700 bg-gray-100 hover:text-gray-900 hover:bg-gray-200 dark:hover:text-[#F9FAFB] dark:hover:bg-[#AAAA] px-3 py-2 rounded-md text-sm font-medium cursor-pointer text-nowrap dark:text-[#F9FAFB] dark:bg-[#181818]")
                          }
                  >
                      Log In
                  </NavLink>
                  <div className="h-9 w-px bg-gray-300"></div>
                  <NavLink to="/register" className="w-30">
                      <button className=  "text-zinc-700 rounded text-sm font-medium cursor-pointer p-2 border border-gray-300 hover:border-gray-400 dark:text-[#F9FAFB] dark:border-gray-500">Registrarse</button>
                  </NavLink>
             </div>
            :<NavLink to="/profile" className="">
                <Avatar uApellido={user.last_name} uNombre={user.first_name} />
              </NavLink>
            }
            <button
              ref={buttonRef}
              onClick={() => setMobileOpen((s) => !s)}
              className="ml-3 inline-flex md:hidden items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none dark:text-[#F9FAFB] dark:border-gray-500 dark:hover:text-[#F9FAFB] dark:hover:bg-[#AAAA]/10"
              aria-controls="mobile-menu"
              aria-expanded={mobileOpen}
              aria-label="Abrir menú de navegación"
            >
              {mobileOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      <div
        id="mobile-menu"
        ref={mobileRef}
        className={`md:hidden transition-[max-height] duration-200 ease-out overflow-hidden ${mobileOpen ? "max-h-[400px]" : "max-h-0"}`}
        aria-hidden={!mobileOpen}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={ ({isActive}) =>
                "block px-3 py-2 rounded-md text-base font-medium " +
                (isActive
                  ? "text-blue-700 bg-blue-50 dark:hover:text-[#F9FAFB] dark:text-[#F9FAFB] dark:bg-[#AAAA]/30"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-[#F9FAFB] dark:text-[#F9FAFB] dark:hover:bg-[#AAAA]/10")
              }
              onClick={() => setMobileOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Navbar;