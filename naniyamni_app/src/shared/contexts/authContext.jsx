import { createContext, useState, useEffect } from "react";                                                 

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [user, setUser] = useState({});
  const [rol, setRol] = useState(() => localStorage.getItem("rol") || null);

  useEffect( () => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect( () => {
    if (rol) {
      localStorage.setItem("rol", rol);
    } else {
      localStorage.removeItem("rol");
    }
  }, [rol]);

  const newInfo = (newToken, newRol) => {
    setToken(newToken);
    setRol(newRol);
  }
  
  const login = (newToken, newRol) => newInfo(newToken, newRol);
  const logout = () => setToken(null);

  return (
    <AuthContext.Provider value={{ token, login, logout, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
