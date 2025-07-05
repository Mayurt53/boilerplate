import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const Home = () => {
  const features = [
    {
      icon: '🚀',
      title: 'Quantum Computing',
      description: 'Next-generation quantum processors for unprecedented computational power',
      color: 'neon-cyan'
    },
    {
      icon: '🧠',
      title: 'AI Integration',
      description: 'Advanced artificial intelligence systems for intelligent automation',
      color: 'neon-purple'
    },
    {
      icon: '🔮',
      title: 'Predictive Analytics',
      description: 'Machine learning algorithms that predict future trends and patterns',
      color: 'neon-pink'
    },
    {
      icon: '⚡',
      title: 'Real-time Processing',
      description: 'Ultra-fast data processing with minimal latency',
      color: 'neon-green'
    },
    {
      icon: '🛡️',
      title: 'Cybersecurity',
      description: 'Advanced security protocols to protect your digital assets',
      color: 'neon-orange'
    },
    {
      icon: '🌐',
      title: 'Global Network',
      description: 'Worldwide infrastructure for seamless connectivity',
      color: 'neon-red'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Chen',
      role: 'CTO, TechCorp',
      content: 'CyberTech revolutionized our entire infrastructure. The quantum computing capabilities are mind-blowing.',
      avatar: '👩‍💻'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'CEO, FutureSystems',
      content: 'The AI integration has increased our productivity by 300%. Absolutely game-changing technology.',
      avatar: '👨‍💼'
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Research Director, Quantum Labs',
      content: 'Their predictive analytics helped us discover patterns we never knew existed. Revolutionary.',
      avatar: '👩‍🔬'
    }
  ];

  const stats = [
    { number: '99.9%', label: 'Uptime Guarantee' },
    { number: '50M+', label: 'Active Users' },
    { number: '150+', label: 'Countries Served' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <div className="min-h-screen bg-dark-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-radial from-neon-cyan/20 via-transparent to-neon-purple/20"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-dark-100 via-dark-200 to-dark-300"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}></div>
          
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-neon-cyan rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            {/* Main Heading */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-cyber font-black mb-8">
              <span className="text-gradient-cyber">CYBER</span>
              <br />
              <span className="text-neon-cyan">TECH</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto font-mono">
              Pushing the boundaries of technology with quantum computing, AI, and cyberpunk innovation
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link to="/services">
                <Button variant="cyber" size="lg" icon="🚀">
                  Explore Services
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="ghost" size="lg" icon="📡">
                  Get Started
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-3xl md:text-4xl font-cyber font-bold text-neon-cyan mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-sm text-white/60 font-mono uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-neon-cyan rounded-full flex justify-center">
            <div className="w-1 h-3 bg-neon-cyan rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-cyber font-bold mb-6">
              <span className="text-gradient-neon">Cutting-Edge</span>
              <br />
              <span className="text-white">Technology</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Experience the future with our revolutionary technology stack designed for tomorrow's challenges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-dark-200/50 backdrop-blur-sm border border-dark-400 hover:border-neon-cyan transition-all duration-500 hover:shadow-glow-cyan hover:-translate-y-2"
              >
                {/* Background Glow */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-${feature.color}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className={`text-4xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon-cyan transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative bg-dark-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-cyber font-bold mb-6">
              <span className="text-gradient-cyber">Trusted by</span>
              <br />
              <span className="text-white">Innovators</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative p-8 rounded-2xl bg-dark-200/50 backdrop-blur-sm border border-dark-400 hover:border-neon-purple transition-all duration-500 hover:shadow-glow-purple"
              >
                <div className="text-4xl mb-4">{testimonial.avatar}</div>
                <p className="text-white/80 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-sm text-neon-purple font-mono">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative p-12 rounded-3xl bg-gradient-cyber overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 80%, rgba(0, 255, 255, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 40% 40%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)
                `
              }}></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-cyber font-bold mb-6 text-dark-50">
                Ready to Transform Your Future?
              </h2>
              <p className="text-xl text-dark-50/80 mb-8 max-w-2xl mx-auto">
                Join thousands of innovators who are already experiencing the power of CyberTech
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button variant="neon" size="lg" icon="⚡">
                    Start Your Journey
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="ghost" size="lg" className="text-dark-50 border-dark-50 hover:bg-dark-50/10">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 