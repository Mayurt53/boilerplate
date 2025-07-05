import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function CTASection() {
  return (
    <section className="py-20 px-4 relative z-10 bg-gradient-to-br from-purple-600 to-blue-600">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Start Your <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Project</span>?
          </h2>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto mb-8">
            Let's discuss how we can help bring your vision to life with our comprehensive digital solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              🚀 Get Started
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-purple-600 transition-all duration-300 hover:scale-105"
            >
              💡 Learn More
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTASection; 