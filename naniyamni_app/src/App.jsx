import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from "./features/users/login/LoginPage"
import RegisterPage from "./features/users/register/RegisterPage"
import Navbar from "./shared/components/Navbar";
import OfertaTuristica from './features/oferta-turistica/OfertaTuristicaPage';
import ColaboradorPage from './features/colaborador/pages/ColaboradorPage';
import Perfil from './features/users/perfil/perfilPage';
import ProveedorPage from './features/oferta-turistica/proveedor/ProveedorPage';
import { AuthProvider } from "@authContext";
import WizardNuevoProveedor from './features/colaborador/pages/WizardNuevoProveedor';
import WizardServicios from './features/colaborador/pages/WizardServicios';
import ProveedorAdmin from './features/colaborador/pages/ProveedorAdmin';

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
            <Route path="/proveedor/:id" element={<ProveedorPage/>}/>
            <Route path="/new-proveedor" element={<WizardNuevoProveedor/>}/>
            <Route path="/proveedor/:id/new-servicio/tipo/:tipo/" element={<WizardServicios/>}/>
            <Route path="/proveedor/:id/admin" element={<ProveedorAdmin/>}/>
          </Routes>
        </BrowserRouter>
    </AuthProvider>
  )
}

export default App;

