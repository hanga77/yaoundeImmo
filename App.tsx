

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
import ServiceDetailPage from './pages/ServiceDetailPage';
import { useEffect } from 'react';
import { DataProvider } from './DataContext';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPropertiesPage from './pages/admin/AdminPropertiesPage';
import PropertyFormPage from './pages/admin/PropertyFormPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminSeoPage from './pages/admin/AdminSeoPage';
import SeoManager from './components/SeoManager';
import AdminFooterPage from './pages/admin/AdminFooterPage';
import AdminServicesPage from './pages/admin/AdminServicesPage';
import ServiceFormPage from './pages/admin/ServiceFormPage';
import BlogPostDetailPage from './pages/BlogPostDetailPage';
import AdminAboutPage from './pages/admin/AdminAboutPage';
import AdminBlogPage from './pages/admin/AdminBlogPage';
import AgentFormPage from './pages/admin/AgentFormPage';
import BlogPostFormPage from './pages/admin/BlogPostFormPage';

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
          
          <Route path="/login" element={<LoginPage />} />

          {/* Admin Routes (Protected) */}
          <Route path="/admin/*" element={
            <ProtectedRoute>
              <Routes>
                <Route element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="properties" element={<AdminPropertiesPage />} />
                  <Route path="properties/new" element={<PropertyFormPage />} />
                  <Route path="properties/edit/:propertyId" element={<PropertyFormPage />} />
                  <Route path="services" element={<AdminServicesPage />} />
                  <Route path="services/new" element={<ServiceFormPage />} />
                  <Route path="services/edit/:serviceId" element={<ServiceFormPage />} />
                  <Route path="about" element={<AdminAboutPage />} />
                  <Route path="agents/new" element={<AgentFormPage />} />
                  <Route path="agents/edit/:agentId" element={<AgentFormPage />} />
                  <Route path="blog" element={<AdminBlogPage />} />
                  <Route path="blog/new" element={<BlogPostFormPage />} />
                  <Route path="blog/edit/:postId" element={<BlogPostFormPage />} />
                  <Route path="seo" element={<AdminSeoPage />} />
                  <Route path="footer" element={<AdminFooterPage />} />
                </Route>
              </Routes>
            </ProtectedRoute>
          } />
        </Routes>
      </HashRouter>
    </DataProvider>
  );
}

// Main site layout with Header and Footer
const MainSite = () => (
  <div className="bg-brand-light min-h-screen flex flex-col font-sans text-brand-dark">
    <SeoManager />
    <Header />
    <main className="flex-grow">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bien/:propertyId" element={<PropertyDetailPage />} />
        <Route path="/a-propos" element={<AboutPage />} />
        <Route path="/biens" element={<PropertyListingsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:postId" element={<BlogPostDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/mentions-legales" element={<LegalPage />} />
      </Routes>
    </main>
    <Footer />
  </div>
);

export default App;