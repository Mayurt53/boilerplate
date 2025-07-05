import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { addApplicant } from '../../../services/api';

function JobApplicationModal({ isOpen, onClose, jobTitle }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    coverLetter: '',
    resume: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Send applicant to mock API
    const applicantData = {
      name: formData.firstName + ' ' + formData.lastName,
      email: formData.email,
      phone: formData.phone,
      education: formData.education,
      experience: formData.experience,
      resume: formData.resume,
      status: 'Applied',
      meet: '',
      selection: '',
    };
    await addApplicant(applicantData);

    setIsSubmitting(false);
    setSubmitSuccess(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        education: '',
        experience: '',
        coverLetter: '',
        resume: ''
      });
      // Safety check for onClose function
      if (typeof onClose === 'function') {
        onClose();
      }
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Apply for {jobTitle}</h2>
            <button
              onClick={() => {
                if (typeof onClose === 'function') {
                  onClose();
                }
              }}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="p-6 bg-green-50 border-b border-green-200">
            <div className="flex items-center">
              <div className="text-green-500 text-2xl mr-3">✅</div>
              <div>
                <h3 className="text-green-800 font-semibold">Application Submitted!</h3>
                <p className="text-green-600 text-sm">Thank you for your interest. We'll review your application and get back to you soon.</p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        {!submitSuccess && (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Education & Experience */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Education & Experience</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Education *
                  </label>
                  <select
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                  >
                    <option value="">Select your education level</option>
                    <option value="High School">High School</option>
                    <option value="Associate's Degree">Associate's Degree</option>
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Master's Degree">Master's Degree</option>
                    <option value="PhD">PhD</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience *
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                  >
                    <option value="">Select years of experience</option>
                    <option value="0-1 years">0-1 years</option>
                    <option value="2-3 years">2-3 years</option>
                    <option value="4-5 years">4-5 years</option>
                    <option value="6-8 years">6-8 years</option>
                    <option value="9+ years">9+ years</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Resume Upload */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume & Cover Letter</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resume/CV *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                    <input
                      type="url"
                      name="resume"
                      value={formData.resume || ''}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                      placeholder="Link to your resume (Google Drive, Dropbox, etc.)"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Letter
                  </label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors resize-none"
                    placeholder="Tell us why you're interested in this position and why you'd be a great fit..."
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Submitting...
                  </div>
                ) : (
                  'Submit Application'
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (typeof onClose === 'function') {
                    onClose();
                  }
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}

function JobListings() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ['All', 'Engineering', 'Design', 'Product', 'Marketing', 'Sales'];

  const jobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      category: 'Engineering',
      location: 'Remote / San Francisco',
      type: 'Full-time',
      experience: '5+ years',
      description: 'We\'re looking for a Senior Frontend Developer to join our team and help build amazing user experiences.',
      skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      salary: '$120k - $180k'
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      category: 'Design',
      location: 'New York / Remote',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Join our design team to create beautiful and intuitive user interfaces for our products.',
      skills: ['Figma', 'Sketch', 'Adobe Creative Suite', 'Prototyping'],
      salary: '$90k - $140k'
    },
    {
      id: 3,
      title: 'Product Manager',
      category: 'Product',
      location: 'San Francisco',
      type: 'Full-time',
      experience: '4+ years',
      description: 'Lead product strategy and execution for our flagship products.',
      skills: ['Product Strategy', 'User Research', 'Agile', 'Analytics'],
      salary: '$130k - $200k'
    },
    {
      id: 4,
      title: 'Backend Engineer',
      category: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      experience: '4+ years',
      description: 'Build scalable backend services and APIs that power our applications.',
      skills: ['Node.js', 'Python', 'PostgreSQL', 'AWS'],
      salary: '$110k - $170k'
    },
    {
      id: 5,
      title: 'Marketing Manager',
      category: 'Marketing',
      location: 'Los Angeles / Remote',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Develop and execute marketing strategies to grow our brand and customer base.',
      skills: ['Digital Marketing', 'Content Strategy', 'Analytics', 'SEO'],
      salary: '$80k - $130k'
    },
    {
      id: 6,
      title: 'Sales Representative',
      category: 'Sales',
      location: 'Chicago',
      type: 'Full-time',
      experience: '2+ years',
      description: 'Drive sales growth by building relationships with potential clients.',
      skills: ['B2B Sales', 'CRM', 'Negotiation', 'Relationship Building'],
      salary: '$70k - $120k + Commission'
    }
  ];

  const filteredJobs = selectedCategory === 'All' 
    ? jobs 
    : jobs.filter(job => job.category === selectedCategory);

  const handleApplyNow = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <section ref={ref} className="py-20 px-4 relative z-10 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Open <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Positions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our current job openings and find the perfect role for your next career move.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Job Listings */}
        <div className="space-y-6">
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        {job.type}
                      </span>
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        {job.experience}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 lg:mt-0 lg:text-right">
                    <div className="text-lg font-semibold text-purple-600 mb-1">{job.salary}</div>
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
                      {job.category}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">{job.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {job.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full border border-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                <button 
                  onClick={() => handleApplyNow(job)}
                  className="group/btn relative px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-600/25 overflow-hidden"
                >
                  <span className="relative z-10">Apply Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">No positions available in this category at the moment.</p>
            <p className="text-gray-400 mt-2">Check back later or contact us for future opportunities.</p>
          </motion.div>
        )}
      </div>

      {/* Job Application Modal */}
      <JobApplicationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        jobTitle={selectedJob?.title}
      />
    </section>
  );
}

export default JobListings; 