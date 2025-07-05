import React from 'react';
import Button from '../../components/Button';

const About = () => {
  const coreValues = [
    {
      icon: '🚀',
      title: 'Innovation First',
      description: 'We push the boundaries of what\'s possible, constantly exploring new technologies and methodologies to deliver cutting-edge solutions.',
      color: 'neon-cyan'
    },
    {
      icon: '🎯',
      title: 'Excellence in Execution',
      description: 'Every project is delivered with precision, attention to detail, and a commitment to exceeding expectations.',
      color: 'neon-purple'
    },
    {
      icon: '🤝',
      title: 'Partnership Approach',
      description: 'We work as an extension of your team, building long-term relationships based on trust, transparency, and mutual success.',
      color: 'neon-pink'
    },
    {
      icon: '⚡',
      title: 'Agile & Adaptive',
      description: 'We embrace change and adapt quickly to evolving requirements, ensuring your solutions remain relevant and effective.',
      color: 'neon-green'
    }
  ];

  const roadmap = [
    {
      year: '2024',
      title: 'Quantum Computing Integration',
      description: 'Launching our quantum computing platform for advanced problem-solving',
      status: 'completed'
    },
    {
      year: '2025',
      title: 'AI-Powered Analytics',
      description: 'Advanced machine learning algorithms for predictive insights',
      status: 'in-progress'
    },
    {
      year: '2026',
      title: 'Neural Network Expansion',
      description: 'Scaling our neural network infrastructure globally',
      status: 'planned'
    },
    {
      year: '2027',
      title: 'Quantum AI Fusion',
      description: 'Merging quantum computing with artificial intelligence',
      status: 'planned'
    }
  ];

  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief Technology Officer',
      avatar: '👩‍💻',
      expertise: 'Quantum Computing, AI'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Chief Executive Officer',
      avatar: '👨‍💼',
      expertise: 'Strategic Vision, Innovation'
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Head of Research',
      avatar: '👩‍🔬',
      expertise: 'Machine Learning, Data Science'
    },
    {
      name: 'Alex Thompson',
      role: 'Lead Architect',
      avatar: '👨‍💻',
      expertise: 'System Design, Cloud Infrastructure'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-radial from-neon-cyan/10 via-transparent to-neon-purple/10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-dark-100 via-dark-200 to-dark-300"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-cyber font-black mb-8">
              <span className="text-gradient-cyber">ABOUT</span>
              <br />
              <span className="text-neon-cyan">CYBERTECH</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto font-mono leading-relaxed">
              We are pioneers in the digital frontier, pushing the boundaries of technology to create solutions that shape the future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cyber" size="lg" icon="🚀">
                Our Mission
              </Button>
              <Button variant="ghost" size="lg" icon="📡">
                Join Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-cyber font-bold mb-8">
                <span className="text-gradient-neon">Our Mission</span>
              </h2>
              <p className="text-xl text-white/70 mb-6 leading-relaxed">
                To revolutionize the digital landscape through cutting-edge technology, innovative solutions, and unwavering commitment to excellence.
              </p>
              <p className="text-lg text-white/60 mb-8 leading-relaxed">
                We believe in the power of technology to transform businesses, enhance human capabilities, and create a better future for all. Our team of experts works tirelessly to push the boundaries of what's possible.
              </p>
              <Button variant="neon" size="lg" icon="🎯">
                Learn More
              </Button>
            </div>
            <div className="relative">
              <div className="bg-gradient-cyber p-1 rounded-2xl">
                <div className="bg-dark-200 rounded-2xl p-8">
                  <div className="text-6xl mb-4">🤖</div>
                  <h3 className="text-2xl font-bold text-white mb-4">Quantum Innovation</h3>
                  <p className="text-white/70">
                    Leading the charge in quantum computing and AI integration for tomorrow's challenges.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 relative bg-dark-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-cyber font-bold mb-6">
              <span className="text-gradient-cyber">Core</span>
              <br />
              <span className="text-white">Values</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              The principles that guide our every decision and drive our success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-dark-200/50 backdrop-blur-sm border border-dark-400 hover:border-neon-cyan transition-all duration-500 hover:shadow-glow-cyan hover:-translate-y-2"
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-${value.color}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon-cyan transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-cyber font-bold mb-6">
              <span className="text-gradient-neon">Technology</span>
              <br />
              <span className="text-white">Roadmap</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Our journey into the future of technology
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-neon-cyan via-neon-purple to-neon-pink"></div>
            
            <div className="space-y-12">
              {roadmap.map((item, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-neon-cyan rounded-full border-4 border-dark-200 shadow-glow-cyan"></div>
                  
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div className="bg-dark-200 rounded-2xl p-6 border border-dark-400 hover:border-neon-cyan transition-all duration-300">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl font-cyber font-bold text-neon-cyan">{item.year}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.status === 'completed' ? 'bg-neon-green/20 text-neon-green border border-neon-green' :
                          item.status === 'in-progress' ? 'bg-neon-orange/20 text-neon-orange border border-neon-orange' :
                          'bg-dark-400 text-white/60 border border-dark-500'
                        }`}>
                          {item.status.toUpperCase()}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-white/70">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 relative bg-dark-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-cyber font-bold mb-6">
              <span className="text-gradient-cyber">Meet Our</span>
              <br />
              <span className="text-white">Team</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              The brilliant minds behind our technological innovations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-dark-200/50 backdrop-blur-sm border border-dark-400 hover:border-neon-purple transition-all duration-500 hover:shadow-glow-purple hover:-translate-y-2"
              >
                <div className="text-center">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {member.avatar}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-purple transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-neon-purple font-mono text-sm mb-2">{member.role}</p>
                  <p className="text-white/60 text-sm">{member.expertise}</p>
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
                Ready to Build the Future?
              </h2>
              <p className="text-xl text-dark-50/80 mb-8 max-w-2xl mx-auto">
                Join us in creating the next generation of technological innovations
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="neon" size="lg" icon="🚀">
                  Start Your Project
                </Button>
                <Button variant="ghost" size="lg" className="text-dark-50 border-dark-50 hover:bg-dark-50/10">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 