import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
      { name: 'Blog', href: '/blog' },
    ],
    services: [
      { name: 'Quantum Computing', href: '/services#quantum' },
      { name: 'AI Integration', href: '/services#ai' },
      { name: 'Cybersecurity', href: '/services#security' },
      { name: 'Cloud Solutions', href: '/services#cloud' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Documentation', href: '/docs' },
      { name: 'API Reference', href: '/api' },
      { name: 'Status', href: '/status' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR', href: '/gdpr' },
    ],
  };

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: '𝕏' },
    { name: 'LinkedIn', href: '#', icon: '💼' },
    { name: 'GitHub', href: '#', icon: '🐙' },
    { name: 'Discord', href: '#', icon: '🎮' },
    { name: 'YouTube', href: '#', icon: '📺' },
  ];

  return (
    <footer className="relative bg-dark-100 border-t border-dark-400 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-200/50 to-dark-100"></div>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center space-x-3 mb-6 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-cyber rounded-xl flex items-center justify-center text-2xl font-cyber font-black text-dark-50 shadow-glow-cyan group-hover:shadow-glow-purple transition-all duration-300">
                  C
                </div>
                <div className="absolute -inset-1 bg-gradient-cyber rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
              <div>
                <h3 className="text-2xl font-cyber font-black text-gradient-cyber">
                  CYBER<span className="text-neon-cyan">TECH</span>
                </h3>
                <p className="text-sm text-neon-cyan/70 font-mono">FUTURE IS NOW</p>
              </div>
            </Link>
            
            <p className="text-white/70 mb-6 max-w-md leading-relaxed">
              Pushing the boundaries of technology with quantum computing, AI, and cyberpunk innovation. 
              Building the future, one breakthrough at a time.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-dark-300 rounded-xl flex items-center justify-center text-neon-cyan border border-dark-400 hover:border-neon-cyan hover:shadow-glow-cyan transition-all duration-300 group"
                  aria-label={social.name}
                >
                  <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-neon-cyan transition-colors duration-300 font-mono text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-neon-cyan transition-colors duration-300 font-mono text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-neon-cyan transition-colors duration-300 font-mono text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-dark-400 pt-8 mb-8">
          <div className="max-w-md">
            <h4 className="text-lg font-bold text-white mb-4">Stay Updated</h4>
            <p className="text-white/70 mb-4 font-mono text-sm">
              Get the latest updates on quantum computing and AI breakthroughs
            </p>
            <div className="flex space-x-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-dark-300 border border-dark-400 rounded-xl text-white placeholder-dark-600 focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-cyan/20 transition-all duration-300"
              />
              <button className="px-6 py-3 bg-gradient-cyber text-dark-50 font-bold rounded-xl hover:shadow-glow-cyan transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-400 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <p className="text-white/60 font-mono text-sm">
                © {currentYear} CyberTech. All rights reserved.
              </p>
              <div className="flex space-x-4">
                {footerLinks.legal.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-white/60 hover:text-neon-cyan transition-colors duration-300 font-mono text-xs"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                <span className="text-white/60 font-mono text-xs">System Online</span>
              </div>
              <div className="text-white/40 font-mono text-xs">
                v2.0.1 | Quantum Core
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
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
    </footer>
  );
};

export default Footer; 