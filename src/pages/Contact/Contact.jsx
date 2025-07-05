import React, { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      subject: '',
      message: ''
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: '📍',
      title: 'Address',
      content: '123 Cyber Street, Tech District, Future City, FC 12345',
      color: 'neon-cyan'
    },
    {
      icon: '📧',
      title: 'Email',
      content: 'hello@cybertech.com',
      color: 'neon-purple'
    },
    {
      icon: '📱',
      title: 'Phone',
      content: '+1 (555) 123-4567',
      color: 'neon-pink'
    },
    {
      icon: '🌐',
      title: 'Website',
      content: 'www.cybertech.com',
      color: 'neon-green'
    }
  ];

  const socialLinks = [
    { name: 'Twitter', icon: '𝕏', url: '#' },
    { name: 'LinkedIn', icon: '💼', url: '#' },
    { name: 'GitHub', icon: '🐙', url: '#' },
    { name: 'Discord', icon: '🎮', url: '#' }
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
              <span className="text-gradient-cyber">GET IN</span>
              <br />
              <span className="text-neon-cyan">TOUCH</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto font-mono leading-relaxed">
              Ready to start your next project? Let's discuss how we can help bring your vision to life.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-dark-200 rounded-2xl p-8 border border-dark-400">
              <h2 className="text-3xl font-cyber font-bold text-white mb-8">
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    icon="👤"
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    icon="📧"
                  />
                </div>
                
                <Input
                  label="Company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company name"
                  icon="🏢"
                />
                
                <Input
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  required
                  icon="📝"
                />
                
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    required
                    rows={6}
                    className="input resize-none"
                  />
                </div>
                
                <Button
                  type="submit"
                  variant="cyber"
                  size="lg"
                  loading={isSubmitting}
                  icon="🚀"
                  className="w-full"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-cyber font-bold text-white mb-8">
                  Contact Information
                </h2>
                <p className="text-white/70 mb-8 leading-relaxed">
                  Get in touch with our team of experts. We're here to help you bring your ideas to life and answer any questions you might have.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-6 bg-dark-200 rounded-xl border border-dark-400 hover:border-neon-cyan transition-all duration-300"
                  >
                    <div className={`text-2xl p-3 rounded-lg bg-${info.color}/20 border border-${info.color}`}>
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{info.title}</h3>
                      <p className="text-white/70">{info.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className="w-12 h-12 bg-dark-300 rounded-xl flex items-center justify-center text-neon-cyan border border-dark-400 hover:border-neon-cyan hover:shadow-glow-cyan transition-all duration-300 group"
                      aria-label={social.name}
                    >
                      <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                        {social.icon}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 relative bg-dark-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-cyber font-bold mb-6">
              <span className="text-gradient-neon">Find Us</span>
            </h2>
            <p className="text-xl text-white/70">
              Visit our headquarters in the heart of the tech district
            </p>
          </div>

          <div className="bg-dark-200 rounded-2xl p-8 border border-dark-400">
            <div className="aspect-video bg-gradient-cyber rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <p className="text-dark-50 font-mono">Interactive Map Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-cyber font-bold mb-6">
              <span className="text-gradient-cyber">Frequently Asked</span>
              <br />
              <span className="text-white">Questions</span>
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: 'What technologies do you specialize in?',
                answer: 'We specialize in cutting-edge technologies including AI, quantum computing, cybersecurity, cloud solutions, and modern web development frameworks.'
              },
              {
                question: 'How long does a typical project take?',
                answer: 'Project timelines vary depending on complexity and scope. Simple projects can take 2-4 weeks, while complex enterprise solutions may take 3-6 months or more.'
              },
              {
                question: 'Do you provide ongoing support?',
                answer: 'Yes, we offer comprehensive support and maintenance packages to ensure your solutions continue to perform optimally after launch.'
              },
              {
                question: 'What is your pricing structure?',
                answer: 'Our pricing is project-based and depends on the scope, complexity, and requirements. We provide detailed quotes after understanding your specific needs.'
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-dark-200 rounded-xl p-6 border border-dark-400 hover:border-neon-cyan transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-white mb-3">{faq.question}</h3>
                <p className="text-white/70 leading-relaxed">{faq.answer}</p>
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
                Ready to Get Started?
              </h2>
              <p className="text-xl text-dark-50/80 mb-8 max-w-2xl mx-auto">
                Let's discuss your project and explore how we can help bring your vision to life
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="neon" size="lg" icon="🚀">
                  Start Your Project
                </Button>
                <Button variant="ghost" size="lg" className="text-dark-50 border-dark-50 hover:bg-dark-50/10">
                  Schedule Call
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 