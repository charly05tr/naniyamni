import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginPage from "./features/login/LoginPage"
import RegisterPage from "./features/register/RegisterPage"

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/login">Iniciar Sesión</Link>
        <Link to="/register">Registrarse</Link>
      </nav>

      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

