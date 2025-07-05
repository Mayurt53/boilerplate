import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function TechnologiesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const technologies = [
    { name: 'React', icon: '⚛️' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Python', icon: '🐍' },
    { name: 'AWS', icon: '☁️' },
    { name: 'Docker', icon: '🐳' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'GraphQL', icon: '🔷' },
    { name: 'Kubernetes', icon: '⚓' },
    { name: 'Redis', icon: '🔴' },
    { name: 'Elasticsearch', icon: '🔍' }
  ];

  return (
    <section ref={ref} className="py-20 px-4 relative z-10 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Technologies We <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Use</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We leverage cutting-edge technologies to build robust, scalable, and modern solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 hover:shadow-xl border border-gray-100 hover:border-purple-200">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                  {tech.icon}
                </div>
                <h3 className="text-gray-900 font-semibold">{tech.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechnologiesSection; 