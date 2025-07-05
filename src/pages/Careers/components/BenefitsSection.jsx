import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function BenefitsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const benefits = [
    {
      icon: '🏠',
      title: 'Remote Work',
      description: 'Work from anywhere in the world with our flexible remote work policy.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '💰',
      title: 'Competitive Salary',
      description: 'We offer competitive salaries and comprehensive benefits packages.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '📈',
      title: 'Career Growth',
      description: 'Continuous learning opportunities and clear career progression paths.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '🏥',
      title: 'Health Benefits',
      description: 'Comprehensive health, dental, and vision insurance coverage.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: '🎓',
      title: 'Learning Budget',
      description: 'Annual budget for courses, conferences, and professional development.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: '🏖️',
      title: 'Unlimited PTO',
      description: 'Take time off when you need it with our unlimited vacation policy.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: '💻',
      title: 'Latest Tech',
      description: 'Work with cutting-edge technologies and tools.',
      color: 'from-gray-600 to-gray-700'
    },
    {
      icon: '🤝',
      title: 'Team Events',
      description: 'Regular team building activities and company events.',
      color: 'from-teal-500 to-cyan-500'
    }
  ];

  return (
    <section ref={ref} className="py-20 px-4 relative z-10 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Why Work <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">With Us</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We believe in taking care of our team with comprehensive benefits and a supportive work environment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200">
                <div className={`text-5xl mb-4 group-hover:scale-110 transition-transform bg-gradient-to-r ${benefit.color} bg-clip-text text-transparent`}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BenefitsSection; 