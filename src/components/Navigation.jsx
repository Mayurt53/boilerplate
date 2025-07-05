import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import Button from './Button';
import ProfileDropdown from './ProfileDropdown';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useUser();
  const { cart = [] } = useCart();
  const { showToast } = useToast();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully', 'success');
  };

  const navLinks = [
    { to: '/', label: 'Home', icon: '🏠' },
    { to: '/about', label: 'About', icon: '⚡' },
    { to: '/services', label: 'Services', icon: '🚀' },
    { to: '/products', label: 'Products', icon: '💎' },
    { to: '/careers', label: 'Careers', icon: '🎯' },
    { to: '/contact', label: 'Contact', icon: '📡' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-dark-200/80 backdrop-blur-xl border-b border-neon-cyan/20 shadow-glow-cyan' 
        : 'bg-transparent'
    }`}>
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/10 via-transparent to-neon-purple/10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-cyber rounded-xl flex items-center justify-center text-2xl font-cyber font-black text-dark-50 shadow-glow-cyan group-hover:shadow-glow-purple transition-all duration-300 group-hover:scale-110">
                C
              </div>
              <div className="absolute -inset-1 bg-gradient-cyber rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-cyber font-black text-gradient-cyber">
                CYBER<span className="text-neon-cyan">TECH</span>
              </h1>
              <p className="text-xs text-neon-cyan/70 font-mono">FUTURE IS NOW</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-3 rounded-xl font-medium transition-all duration-300 group ${
                  isActive(link.to)
                    ? 'text-neon-cyan bg-glass-white border border-neon-cyan shadow-glow-cyan'
                    : 'text-white hover:text-neon-cyan hover:bg-glass-white'
                }`}
              >
                <span className="absolute inset-0 rounded-xl bg-gradient-cyber opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                <span className="relative flex items-center space-x-2">
                  <span className="text-lg">{link.icon}</span>
                  <span>{link.label}</span>
                </span>
                {isActive(link.to) && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-neon-cyan rounded-full animate-pulse"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <Link to="/cart" className="relative group">
              <div className="w-10 h-10 bg-dark-300 rounded-xl flex items-center justify-center text-neon-cyan border border-dark-400 hover:border-neon-cyan hover:shadow-glow-cyan transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-neon-pink text-dark-50 text-xs font-bold rounded-full flex items-center justify-center animate-pulse-glow">
                    {cart.length}
                  </span>
                )}
              </div>
            </Link>

            {/* User Menu */}
            {user ? (
              <ProfileDropdown user={user} onLogout={handleLogout} />
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-white hover:text-neon-cyan">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="cyber" size="sm">
                    Join Us
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-10 h-10 bg-dark-300 rounded-xl flex items-center justify-center text-neon-cyan border border-dark-400 hover:border-neon-cyan hover:shadow-glow-cyan transition-all duration-300"
            >
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-500 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-2 border-t border-dark-400">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isActive(link.to)
                    ? 'text-neon-cyan bg-glass-white border border-neon-cyan shadow-glow-cyan'
                    : 'text-white hover:text-neon-cyan hover:bg-glass-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{link.icon}</span>
                  <span>{link.label}</span>
                  {isActive(link.to) && (
                    <div className="ml-auto w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></div>
                  )}
                </div>
              </Link>
            ))}
            
            {!user && (
              <div className="pt-4 space-y-3 border-t border-dark-400">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-center">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="cyber" className="w-full justify-center">
                    Join Us
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-neon-cyan rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </nav>
  );
};

export default Navigation; 