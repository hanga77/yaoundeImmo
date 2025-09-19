
import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import LegalPage from './pages/LegalPage';
import PropertyListingsPage from './pages/PropertyListingsPage';
import { PropertyType } from './types';
import ServiceDetailPage from './pages/ServiceDetailPage';
import { useEffect } from 'react';
import { DataProvider } from './DataContext';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPropertiesPage from './pages/admin/AdminPropertiesPage';
import PropertyFormPage from './pages/admin/PropertyFormPage';
import PropertyDetailPage from './pages/PropertyDetailPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};


function App() {
  return (
    <DataProvider>
      <HashRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Site Routes */}
          <Route path="/*" element={<MainSite />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="properties" element={<AdminPropertiesPage />} />
            <Route path="properties/new" element={<PropertyFormPage />} />
            <Route path="properties/edit/:propertyId" element={<PropertyFormPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </DataProvider>
  );
}

// Main site layout with Header and Footer
const MainSite = () => (
  <div className="bg-brand-light min-h-screen flex flex-col font-sans text-brand-dark">
    <Header />
    <main className="flex-grow">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bien/:propertyId" element={<PropertyDetailPage />} />
        <Route path="/a-propos" element={<AboutPage />} />
        <Route path="/a-vendre" element={<PropertyListingsPage key="sale" title="Nos biens à vendre" propertyType={PropertyType.SALE} />} />
        <Route path="/a-louer" element={<PropertyListingsPage key="rent" title="Nos biens à louer" propertyType={PropertyType.RENT} />} />
        <Route path="/meuble" element={<PropertyListingsPage key="furnished" title="Nos biens meublés" propertyType={PropertyType.FURNISHED} />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/mentions-legales" element={<LegalPage />} />
      </Routes>
    </main>
    <Footer />
  </div>
);

export default App;