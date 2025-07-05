import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { CartProvider } from './contexts/CartContext';
import { ToastProvider } from './contexts/ToastContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Toast from './components/Toast';

// Pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import Products from './pages/Products/Products';
import Careers from './pages/Careers/Careers';
import Contact from './pages/Contact/Contact';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Profile from './pages/Profile/Profile';
import Cart from './pages/Cart/Cart';
import Payment from './pages/Payment/Payment';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';

// Admin Pages
import AdminLogin from './pages/AdminSide/AdminLogin/AdminLogin';
import AdminDashboard from './pages/AdminSide/AdminDashboard/AdminDashboard';
import AdminProducts from './pages/AdminSide/AdminProducts/AdminProducts';
import AdminOrders from './pages/AdminSide/AdminOrders/AdminOrders';
import AdminApplicants from './pages/AdminSide/AdminApplicants/AdminApplicants';
import AdminProjects from './pages/AdminSide/AdminProjects/AdminProjects';
import AdminSettings from './pages/AdminSide/AdminSettings/AdminSettings';
import AdminProfile from './pages/AdminSide/AdminProfile/AdminProfile';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';

// ScrollToTop component to handle scroll behavior
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <ToastProvider>
          <div className="min-h-screen bg-dark-50 flex flex-col">
            <ScrollToTop />
            <Navigation />
            <main className="flex-1 pt-20">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/products" element={<Products />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                
                {/* Protected User Routes */}
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/cart" element={<Cart />} />
                <Route path="/payment" element={
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                } />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={
                  <ProtectedRoute adminOnly>
                    <AdminLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<AdminDashboard />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="applicants" element={<AdminApplicants />} />
                  <Route path="projects" element={<AdminProjects />} />
                  <Route path="settings" element={<AdminSettings />} />
                  <Route path="profile" element={<AdminProfile />} />
                </Route>
                
                {/* 404 Route */}
                <Route path="*" element={
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-6xl font-cyber font-black text-gradient-cyber mb-4">404</h1>
                      <p className="text-xl text-white/70 mb-8 font-mono">Page Not Found</p>
                      <a 
                        href="/" 
                        className="inline-flex items-center px-6 py-3 bg-gradient-cyber text-dark-50 font-bold rounded-xl hover:shadow-glow-cyan transition-all duration-300"
                      >
                        Return Home
                      </a>
                    </div>
                  </div>
                } />
              </Routes>
            </main>
            <Footer />
            <Toast />
          </div>
        </ToastProvider>
      </CartProvider>
    </UserProvider>
  );
}

export default App; 