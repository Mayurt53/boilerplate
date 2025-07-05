import React, { useState } from 'react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Modal from '../../components/Modal';

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationForm, setApplicationForm] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: '',
    portfolio: ''
  });

  const jobOpenings = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'Remote / San Francisco',
      type: 'Full-time',
      experience: '5+ years',
      salary: '$120,000 - $180,000',
      description: 'We are looking for a Senior Software Engineer to join our team and help build cutting-edge applications.',
      requirements: [
        'Strong experience with React, Node.js, and TypeScript',
        'Experience with cloud platforms (AWS, Azure, or GCP)',
        'Knowledge of microservices architecture',
        'Experience with CI/CD pipelines',
        'Strong problem-solving and communication skills'
      ],
      responsibilities: [
        'Design and implement scalable software solutions',
        'Collaborate with cross-functional teams',
        'Mentor junior developers',
        'Participate in code reviews and technical discussions',
        'Contribute to architectural decisions'
      ],
      benefits: [
        'Competitive salary and equity',
        'Flexible work hours and remote work',
        'Health, dental, and vision insurance',
        'Professional development budget',
        'Unlimited PTO'
      ],
      postedDate: '2024-01-15',
      applications: 24
    },
    {
      id: 2,
      title: 'AI/ML Engineer',
      department: 'AI Research',
      location: 'Remote / New York',
      type: 'Full-time',
      experience: '3+ years',
      salary: '$100,000 - $150,000',
      description: 'Join our AI team to develop innovative machine learning solutions and push the boundaries of what\'s possible.',
      requirements: [
        'Strong background in machine learning and deep learning',
        'Experience with Python, TensorFlow, and PyTorch',
        'Knowledge of computer vision or NLP',
        'Experience with MLOps and model deployment',
        'Published research or open-source contributions preferred'
      ],
      responsibilities: [
        'Develop and implement ML models',
        'Optimize model performance and scalability',
        'Collaborate with data scientists and engineers',
        'Stay current with latest AI/ML research',
        'Present findings to stakeholders'
      ],
      benefits: [
        'Competitive salary and equity',
        'Access to cutting-edge AI infrastructure',
        'Conference and research budget',
        'Flexible work arrangements',
        'Health and wellness benefits'
      ],
      postedDate: '2024-01-10',
      applications: 18
    },
    {
      id: 3,
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Remote / Austin',
      type: 'Full-time',
      experience: '4+ years',
      salary: '$90,000 - $130,000',
      description: 'Create beautiful and intuitive user experiences that delight our customers and drive business growth.',
      requirements: [
        'Strong portfolio demonstrating UX/UI skills',
        'Experience with Figma, Sketch, or similar tools',
        'Understanding of user research and testing',
        'Knowledge of design systems and accessibility',
        'Experience with prototyping and user flows'
      ],
      responsibilities: [
        'Design user interfaces and experiences',
        'Conduct user research and usability testing',
        'Create design systems and component libraries',
        'Collaborate with product and engineering teams',
        'Present design solutions to stakeholders'
      ],
      benefits: [
        'Competitive salary and equity',
        'Latest design tools and software',
        'Professional development opportunities',
        'Flexible work schedule',
        'Health and wellness benefits'
      ],
      postedDate: '2024-01-08',
      applications: 32
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      department: 'Operations',
      location: 'Remote / Seattle',
      type: 'Full-time',
      experience: '3+ years',
      salary: '$110,000 - $160,000',
      description: 'Help us build and maintain robust, scalable infrastructure that powers our applications.',
      requirements: [
        'Experience with AWS, Docker, and Kubernetes',
        'Knowledge of CI/CD pipelines and automation',
        'Experience with monitoring and logging tools',
        'Understanding of security best practices',
        'Experience with infrastructure as code'
      ],
      responsibilities: [
        'Design and implement cloud infrastructure',
        'Automate deployment and scaling processes',
        'Monitor system performance and reliability',
        'Implement security measures and compliance',
        'Collaborate with development teams'
      ],
      benefits: [
        'Competitive salary and equity',
        'Latest cloud and DevOps tools',
        'Professional certification support',
        'Flexible work arrangements',
        'Health and wellness benefits'
      ],
      postedDate: '2024-01-05',
      applications: 15
    },
    {
      id: 5,
      title: 'Product Manager',
      department: 'Product',
      location: 'Remote / Boston',
      type: 'Full-time',
      experience: '5+ years',
      salary: '$130,000 - $180,000',
      description: 'Lead product strategy and execution to deliver exceptional value to our customers.',
      requirements: [
        'Experience in B2B SaaS product management',
        'Strong analytical and strategic thinking',
        'Experience with agile methodologies',
        'Excellent communication and leadership skills',
        'Technical background preferred'
      ],
      responsibilities: [
        'Define product vision and strategy',
        'Gather and prioritize product requirements',
        'Work with engineering and design teams',
        'Analyze market trends and competition',
        'Drive product launches and go-to-market'
      ],
      benefits: [
        'Competitive salary and equity',
        'Professional development opportunities',
        'Flexible work arrangements',
        'Health and wellness benefits',
        'Travel and conference budget'
      ],
      postedDate: '2024-01-03',
      applications: 28
    },
    {
      id: 6,
      title: 'Data Scientist',
      department: 'Data Science',
      location: 'Remote / Chicago',
      type: 'Full-time',
      experience: '3+ years',
      salary: '$95,000 - $140,000',
      description: 'Transform data into actionable insights that drive business decisions and product improvements.',
      requirements: [
        'Strong statistical and analytical skills',
        'Experience with Python, R, and SQL',
        'Knowledge of machine learning algorithms',
        'Experience with data visualization tools',
        'Strong business acumen and communication skills'
      ],
      responsibilities: [
        'Analyze large datasets to extract insights',
        'Build predictive models and algorithms',
        'Create data visualizations and reports',
        'Collaborate with product and business teams',
        'Present findings to stakeholders'
      ],
      benefits: [
        'Competitive salary and equity',
        'Access to cutting-edge data tools',
        'Professional development opportunities',
        'Flexible work arrangements',
        'Health and wellness benefits'
      ],
      postedDate: '2024-01-01',
      applications: 22
    }
  ];

  const handleApply = (job) => {
    setSelectedJob(job);
    setShowApplicationModal(true);
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    // Here you would typically submit the application to your backend
    console.log('Application submitted:', { job: selectedJob, form: applicationForm });
    alert('Application submitted successfully! We\'ll get back to you soon.');
    setShowApplicationModal(false);
    setApplicationForm({
      name: '',
      email: '',
      phone: '',
      resume: null,
      coverLetter: '',
      portfolio: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setApplicationForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

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
              <span className="text-gradient-cyber">JOIN</span>
              <br />
              <span className="text-neon-cyan">OUR TEAM</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto font-mono leading-relaxed">
              Build the future with us. We're looking for passionate individuals who want to make a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cyber" size="lg" icon="🚀">
                View Openings
              </Button>
              <Button variant="ghost" size="lg" icon="📧">
                Contact HR
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-cyber font-bold mb-6">
              <span className="text-gradient-neon">Open</span>
              <br />
              <span className="text-white">Positions</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Explore our current job openings and find your next career opportunity
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {jobOpenings.map((job) => (
              <Card
                key={job.id}
                variant="glass"
                className="p-8 hover:border-neon-cyan transition-all duration-500 hover:shadow-glow-cyan hover:-translate-y-2"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{job.title}</h3>
                    <p className="text-neon-cyan font-medium">{job.department}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 bg-neon-green/20 text-neon-green text-sm rounded-full mb-2">
                      {job.type}
                    </span>
                    <p className="text-white/70 text-sm">{job.applications} applications</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-4 text-sm text-white/70">
                    <span>📍 {job.location}</span>
                    <span>💼 {job.experience}</span>
                    <span>💰 {job.salary}</span>
                  </div>
                  <p className="text-white/80 leading-relaxed">{job.description}</p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-white/50">
                    Posted: {new Date(job.postedDate).toLocaleDateString()}
                  </div>
                  <Button
                    variant="cyber"
                    size="sm"
                    onClick={() => handleApply(job)}
                    icon="📝"
                  >
                    Apply Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 relative bg-dark-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-cyber font-bold mb-6">
              <span className="text-gradient-cyber">Why Work</span>
              <br />
              <span className="text-white">With Us</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              We offer competitive benefits and a culture that fosters growth and innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '💎',
                title: 'Competitive Benefits',
                description: 'Health insurance, 401k matching, unlimited PTO, and equity options.'
              },
              {
                icon: '🏠',
                title: 'Remote First',
                description: 'Work from anywhere with flexible hours and a supportive remote culture.'
              },
              {
                icon: '🚀',
                title: 'Growth Opportunities',
                description: 'Continuous learning, mentorship programs, and career development paths.'
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-neon-cyan transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      <Modal
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
        title={`Apply for ${selectedJob?.title}`}
        size="lg"
      >
        <form onSubmit={handleSubmitApplication} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              name="name"
              value={applicationForm.name}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={applicationForm.email}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <Input
            label="Phone Number"
            name="phone"
            value={applicationForm.phone}
            onChange={handleInputChange}
            required
          />

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Resume/CV
            </label>
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-dark-200 border border-dark-400 rounded-xl text-white focus:border-neon-cyan focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Cover Letter
            </label>
            <textarea
              name="coverLetter"
              value={applicationForm.coverLetter}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 bg-dark-200 border border-dark-400 rounded-xl text-white focus:border-neon-cyan focus:outline-none resize-none"
              placeholder="Tell us why you're interested in this position..."
            />
          </div>

          <Input
            label="Portfolio/Website (Optional)"
            name="portfolio"
            value={applicationForm.portfolio}
            onChange={handleInputChange}
            placeholder="https://your-portfolio.com"
          />

          <div className="flex justify-end space-x-4 pt-6">
            <Button
              variant="ghost"
              onClick={() => setShowApplicationModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="cyber"
              type="submit"
              icon="📤"
            >
              Submit Application
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Careers; 