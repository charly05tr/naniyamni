import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from "./features/login/LoginPage"
import RegisterPage from "./features/register/RegisterPage"
import Navbar from "./shared/components/Navbar";
import OfertaTuristica from './features/oferta-turistica/OfertaTuristicaPage';
import ColaboradorPage from './features/colaborador/ColaboradorPage';
import Perfil from './features/perfil/perfilPage';
import { AuthProvider } from "@authContext";


function App() {
  return (
    <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/oferta-turistica" element={<OfertaTuristica/>}/>
            <Route path="/colaborador" element={<ColaboradorPage/>}/>
            <Route path="/profile" element={<Perfil/>}/>
          </Routes>
        </BrowserRouter>
    </AuthProvider>
  )
}

export default App;

