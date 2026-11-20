import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { HomePage } from './components/HomePage';
import { ShopPage } from './components/ShopPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutPage } from './components/CheckoutPage';
import { CustomerDashboard } from './components/CustomerDashboard';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { AdminLayout } from './components/admin/AdminLayout';

const MainContent: React.FC = () => {
  const { currentView } = useApp();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-amber-500 selection:text-zinc-950">
      {currentView !== 'admin' && <Navbar onOpenCart={() => setIsCartOpen(true)} />}

      <main className="flex-1">
        {currentView === 'home' && <HomePage />}
        {currentView === 'shop' && <ShopPage />}
        {currentView === 'product-detail' && <ProductDetailPage />}
        {currentView === 'checkout' && <CheckoutPage />}
        {currentView === 'dashboard' && <CustomerDashboard />}
        {currentView === 'about' && <AboutPage />}
        {currentView === 'contact' && <ContactPage />}
        {currentView === 'admin' && <AdminLayout />}
      </main>

      {currentView !== 'admin' && <Footer />}

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <ToastContainer />
      <WhatsAppWidget />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
