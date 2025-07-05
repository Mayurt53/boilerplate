import React from 'react';
import Button from '../../components/Button';
import Card from '../../components/Card';

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'Software Development',
      description: 'Custom software solutions tailored to your business needs. From web applications to enterprise systems.',
      icon: '💻',
      features: ['Web Development', 'Mobile Apps', 'Desktop Applications', 'API Development'],
      price: 'From $5,000',
      category: 'development'
    },
    {
      id: 2,
      title: 'Artificial Intelligence & Machine Learning',
      description: 'Cutting-edge AI and ML solutions to automate processes and gain valuable insights from your data.',
      icon: '🧠',
      features: ['Predictive Analytics', 'Computer Vision', 'Natural Language Processing', 'Chatbots'],
      price: 'From $10,000',
      category: 'ai'
    },
    {
      id: 3,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and migration services to optimize your business operations.',
      icon: '☁️',
      features: ['Cloud Migration', 'DevOps', 'Serverless Architecture', 'Microservices'],
      price: 'From $3,000',
      category: 'cloud'
    },
    {
      id: 4,
      title: 'Cybersecurity',
      description: 'Comprehensive security solutions to protect your digital assets and ensure compliance.',
      icon: '🛡️',
      features: ['Penetration Testing', 'Security Audits', 'Incident Response', 'Compliance'],
      price: 'From $7,500',
      category: 'security'
    },
    {
      id: 5,
      title: 'Data Analytics',
      description: 'Transform your data into actionable insights with advanced analytics and visualization.',
      icon: '📊',
      features: ['Business Intelligence', 'Data Warehousing', 'Real-time Analytics', 'Dashboard Creation'],
      price: 'From $6,000',
      category: 'analytics'
    },
    {
      id: 6,
      title: 'Blockchain Development',
      description: 'Innovative blockchain solutions for secure, transparent, and decentralized applications.',
      icon: '⛓️',
      features: ['Smart Contracts', 'DeFi Applications', 'NFT Development', 'DApp Creation'],
      price: 'From $15,000',
      category: 'blockchain'
    },
    {
      id: 7,
      title: 'UI/UX Design',
      description: 'User-centered design solutions that create engaging and intuitive digital experiences.',
      icon: '🎨',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Usability Testing'],
      price: 'From $4,000',
      category: 'design'
    },
    {
      id: 8,
      title: 'Digital Transformation',
      description: 'End-to-end digital transformation services to modernize your business processes.',
      icon: '🚀',
      features: ['Process Automation', 'Legacy System Modernization', 'Digital Strategy', 'Change Management'],
      price: 'From $20,000',
      category: 'transformation'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Discovery & Planning',
      description: 'We analyze your requirements and create a comprehensive project plan.',
      icon: '🔍'
    },
    {
      step: '02',
      title: 'Design & Architecture',
      description: 'Our team designs the solution architecture and creates detailed specifications.',
      icon: '📐'
    },
    {
      step: '03',
      title: 'Development & Testing',
      description: 'We build your solution using agile methodologies with continuous testing.',
      icon: '⚙️'
    },
    {
      step: '04',
      title: 'Deployment & Support',
      description: 'We deploy your solution and provide ongoing support and maintenance.',
      icon: '🚀'
    }
  ];

  const technologies = [
    { name: 'React', icon: '⚛️', category: 'frontend' },
    { name: 'Node.js', icon: '🟢', category: 'backend' },
    { name: 'Python', icon: '🐍', category: 'backend' },
    { name: 'TensorFlow', icon: '🧠', category: 'ai' },
    { name: 'AWS', icon: '☁️', category: 'cloud' },
    { name: 'Docker', icon: '🐳', category: 'devops' },
    { name: 'MongoDB', icon: '🍃', category: 'database' },
    { name: 'Kubernetes', icon: '⚓', category: 'devops' },
    { name: 'Flutter', icon: '📱', category: 'mobile' },
    { name: 'GraphQL', icon: '🔗', category: 'api' },
    { name: 'Redis', icon: '🔴', category: 'cache' },
    { name: 'PostgreSQL', icon: '🐘', category: 'database' }
  ];

  return (
    <div className="min-h-screen bg-dark-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-radial from-neon-cyan/10 via-transparent to-neon-purple/10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-dark-100 via-dark-200 to-dark-300"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-cyber font-black mb-8">
              <span className="text-gradient-cyber">OUR</span>
              <br />
              <span className="text-neon-cyan">SERVICES</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto font-mono leading-relaxed">
              Comprehensive technology services to drive your business forward in the digital age.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cyber" size="lg" icon="🚀">
                Get Started
              </Button>
              <Button variant="ghost" size="lg" icon="📞">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-cyber font-bold mb-6">
              <span className="text-gradient-neon">What We</span>
              <br />
              <span className="text-white">Offer</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              From software development to AI solutions, we provide end-to-end technology services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card
                key={service.id}
                variant="glass"
                className="group p-8 hover:border-neon-cyan transition-all duration-500 hover:shadow-glow-cyan hover:-translate-y-2"
              >
                <div className="relative z-10">
                  {/* Service Icon */}
                  <div className="text-6xl mb-6 text-center group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>

                  {/* Service Info */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon-cyan transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-white/70 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-neon-cyan mb-3 uppercase tracking-wider">Key Features</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <span className="text-neon-cyan">•</span>
                          <span className="text-white/80 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price and Action */}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-cyber font-bold text-neon-cyan">
                      {service.price}
                    </span>
                    <Button variant="neon" size="sm" icon="🚀">
                      Learn More
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 relative bg-dark-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-cyber font-bold mb-6">
              <span className="text-gradient-cyber">Our</span>
              <br />
              <span className="text-white">Process</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              A proven methodology that ensures successful project delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-cyber rounded-full flex items-center justify-center text-2xl font-bold text-dark-50">
                    {step.step}
                  </div>
                  <div className="text-4xl absolute -top-2 -right-2 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-neon-cyan transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-cyber font-bold mb-6">
              <span className="text-gradient-neon">Technologies</span>
              <br />
              <span className="text-white">We Use</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Cutting-edge technologies to build robust and scalable solutions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="bg-dark-200 rounded-xl p-6 text-center hover:bg-dark-300 hover:border-neon-cyan border border-dark-400 transition-all duration-300 group"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>
                <h3 className="text-white font-medium group-hover:text-neon-cyan transition-colors duration-300">
                  {tech.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative p-12 rounded-3xl bg-gradient-cyber overflow-hidden">
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
                Ready to Start Your Project?
              </h2>
              <p className="text-xl text-dark-50/80 mb-8 max-w-2xl mx-auto">
                Let's discuss how we can help transform your business with our technology services
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="neon" size="lg" icon="🚀">
                  Get Free Consultation
                </Button>
                <Button variant="ghost" size="lg" className="text-dark-50 border-dark-50 hover:bg-dark-50/10">
                  View Portfolio
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services; 