import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Animated Background Component
function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-800/20 via-transparent to-gray-700/20 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute inset-0 bg-gradient-to-bl from-gray-600/10 via-transparent to-gray-800/10 animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-700/5 via-transparent to-gray-600/5 animate-pulse" style={{ animationDelay: '3s' }} />
    </div>
  );
}

// Floating Elements
function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full opacity-10 floating blur-xl" style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full opacity-10 floating blur-xl" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-20 w-20 h-20 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full opacity-10 floating blur-xl" style={{ animationDelay: '4s' }} />
      <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full opacity-10 floating blur-xl" style={{ animationDelay: '1s' }} />
    </div>
  );
}

function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <AnimatedBackground />
      <FloatingElements />
      
      <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 1 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-gray-700/20 to-gray-600/20 text-gray-300 border border-gray-600/30 backdrop-blur-sm">
            🚀 Our Services
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-black mb-6 leading-tight tracking-tight"
        >
          <span className="gradient-text neon-glow">Comprehensive</span>
          <br />
          <span className="text-white">Digital</span>
          <br />
          <span className="gradient-text neon-glow">Solutions</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto font-light leading-relaxed"
        >
          From concept to deployment, we provide end-to-end digital solutions that drive growth and innovation for your business.
        </motion.p>
      </div>
    </section>
  );
}

export default Hero; 