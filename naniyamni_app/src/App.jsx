import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./shared/components/Navbar";
//paginas turistas
import LoginPage from "./features/users/login/LoginPage"
import RegisterPage from "./features/users/register/RegisterPage"
import OfertaTuristica from './features/oferta-turistica/OfertaTuristicaPage';
import Perfil from './features/users/perfil/perfilPage';
import ProveedorPage from './features/oferta-turistica/proveedor/ProveedorPage';
import MiTourPage from './features/miTour/MiTourPage';
import ReservasActivasPage from './features/miTour/ReservasActivasPage';
import Pagos from './features/miTour/components/Pago';
//contextos
import { DisponibilidadProvider } from "././features/oferta-turistica/context/disponibilidadContext";
import { AuthProvider } from "@authContext";
import { usePerfil } from './features/users/perfil/hooks/usePerfil';
//paginas colaborador
import ColaboradorPage from './features/colaborador/pages/ColaboradorPage';
import WizardNuevoProveedor from './features/colaborador/pages/WizardNuevoProveedor';
import WizardServicios from './features/colaborador/pages/WizardServicios';
import ProveedorAdmin from './features/colaborador/pages/ProveedorAdmin';
import ActualizarProveedor from './features/colaborador/proveedor/components/ActualizarProveedor';
import ActualizarServicio from './features/colaborador/servicios/components/ActualizarServicio';
import LandingPage from './shared/LandingPage';
import ChatComponent from './shared/components/ChatIAComponent'; 

function App() {

  const { perfilData, loading } = usePerfil();
  
  return (
    <AuthProvider>
      <DisponibilidadProvider>
        <BrowserRouter>
          <Navbar user={perfilData} loading={loading}/>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            //turista
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<Perfil />} />
            <Route path="/oferta-turistica" element={<OfertaTuristica />} />
            <Route path="/proveedor/:id" element={<ProveedorPage />} />
            <Route path="/MiTour/" element={<MiTourPage/>} />
            <Route path="/reservas-activas/" element={<ReservasActivasPage />} />
            <Route path="/pay/" element={<Pagos />} />
            //colaborador
            <Route path="/new-proveedor" element={<WizardNuevoProveedor />} />
            <Route path="/proveedor/:id/new-servicio/tipo/:tipo/" element={<WizardServicios />} />
            <Route path="/proveedor/:id/admin" element={<ProveedorAdmin />} />
            <Route path="/colaborador" element={<ColaboradorPage />} />
            <Route path="/proveedor/:id/admin/actualizar/" element={<ActualizarProveedor />} />
            <Route path="/proveedor/:id/admin/servicio/:servicioId/actualizar/" element={<ActualizarServicio />} />
          </Routes>
          <ChatComponent/>
        </BrowserRouter>
      </DisponibilidadProvider>
    </AuthProvider>
  );
}

export default App;

