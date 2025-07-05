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
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#18102a] via-[#3a186b] to-[#18102a]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
        transition={{ duration: 1 }}
        className="relative z-10 mt-24 mb-8 text-center"
      >
        <button className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold shadow-lg mb-8 text-base">
          <span role="img" aria-label="briefcase">💼</span> Careers at DreamWorld
        </button>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6">
          <span className="text-purple-300 block">Innovate.</span>
          <span className="text-white block">Grow.</span>
          <span className="text-blue-300 block">Belong.</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed">
          Join our passionate team and help us create cutting-edge solutions that shape the future of technology.
        </p>
      </motion.div>
    </section>
  );
}

export default Hero; 