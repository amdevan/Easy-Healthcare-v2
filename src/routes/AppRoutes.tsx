import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import Contact from '@/pages/Contact/Contact';
import FindDoctors from '@/pages/FindDoctors/FindDoctors';
import VideoConsult from '@/pages/VideoConsult/VideoConsult';
import LabTests from '@/pages/LabTests/LabTests';
import Pharmacy from '@/pages/Pharmacy/Pharmacy';
import Services from '@/pages/Services/Services';
import NEMT from '@/pages/NEMT/NEMT';
import ClinicsLocations from '@/pages/ClinicsLocations/ClinicsLocations';
import Login from '@/pages/Auth/Login';
import Register from '@/pages/Auth/Register';
import Dashboard from '@/pages/Dashboard/Dashboard';
import Products from '@/pages/Products/Products';
import Membership from '@/pages/Membership/Membership';
import AboutPage from '@/views/pages/AboutPage';
import AboutBoard from '@/views/pages/AboutBoard';
import ManagementTeam from '@/views/pages/ManagementTeam';
import { AuthProvider } from '@/context/AuthContext';
import { AdminProvider } from '@/context/AdminContext';
import ProtectedRoute from '@/routes/ProtectedRoute';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AdminProvider>
          <Header />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/find-doctors" element={<FindDoctors />} />
          <Route path="/video-consult" element={<VideoConsult />} />
          <Route path="/lab-tests" element={<LabTests />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/services" element={<Services />} />
          <Route path="/nemt" element={<NEMT />} />
          <Route path="/products" element={<Products />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about/board-of-director" element={<AboutBoard />} />
          <Route path="/about/management-team" element={<ManagementTeam />} />
          <Route path="/clinics-locations" element={<ClinicsLocations />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          </Routes>
          {/* Global AI Assistant */}
          <AIAssistant />
          <Footer />
        </AdminProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
import AIAssistant from '../../vendor/amdevan-package/components/AIAssistant';