import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Select from 'react-select';
import {
  useGetApplicantsQuery,
  useAddApplicantMutation,
  useUpdateApplicantMutation,
  useDeleteApplicantMutation,
} from '../../../services/apiSlice';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import DataTable from '../../../components/DataTable';
import Modal from '../../../components/Modal';

function AdminApplicants() {
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ date: '', time: '', notes: '', meet: '', selection: '' });
  const [search, setSearch] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showApplicantModal, setShowApplicantModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    date: '',
    time: '',
    googleMeetLink: '',
    notes: '',
    duration: '60'
  });

  // RTK Query hooks
  const {
    data: applicants = [],
    isLoading: isLoadingApplicants,
    isError,
    refetch,
  } = useGetApplicantsQuery();
  const [addApplicant, { isLoading: isAdding }] = useAddApplicantMutation();
  const [updateApplicant, { isLoading: isUpdating }] = useUpdateApplicantMutation();
  const [deleteApplicant, { isLoading: isDeleting }] = useDeleteApplicantMutation();

  const filtered = applicants.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase())
  );

  const openSchedule = (applicant) => {
    setSelected(applicant);
    setScheduleForm({
      date: applicant.interview?.date || '',
      time: applicant.interview?.time || '',
      googleMeetLink: applicant.interview?.googleMeetLink || '',
      notes: applicant.interview?.notes || '',
      duration: applicant.interview?.duration || '60'
    });
    setShowScheduleModal(true);
  };

  const handleViewApplicant = (applicant) => {
    setSelectedApplicant(applicant);
    setShowApplicantModal(true);
  };

  const handleExportApplicants = () => {
    const csvContent = [
      ['Name', 'Email', 'Position', 'Experience', 'Skills', 'Status', 'Applied Date'],
      ...applicants.map(applicant => [
        applicant.name,
        applicant.email,
        applicant.position,
        applicant.experience,
        applicant.skills.join(', '),
        applicant.status,
        applicant.appliedDate
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `applicants-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handlePostJob = () => {
    // Simulate posting a job
    alert('Job posting feature coming soon! This would open a form to create a new job posting.');
  };

  const handleSchedule = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Update the applicant with interview details
      const updatedApplicant = await updateApplicant({
      ...selected,
      status: 'Interview Scheduled',
        interview: {
          date: scheduleForm.date,
          time: scheduleForm.time,
          googleMeetLink: scheduleForm.googleMeetLink,
          notes: scheduleForm.notes,
          duration: scheduleForm.duration
        }
      });

      // Update the applicants list
      refetch();
      
      setInfoMessage(`Interview scheduled for ${selected.name} on ${scheduleForm.date} at ${scheduleForm.time}`);
      setTimeout(() => setInfoMessage(''), 3000);
      
      // Close modal and reset form
      setShowScheduleModal(false);
    setSelected(null);
      setScheduleForm({
        date: '',
        time: '',
        googleMeetLink: '',
        notes: '',
        duration: '60'
      });
    } catch (error) {
      console.error('Error scheduling interview:', error);
      setInfoMessage('Error scheduling interview. Please try again.');
      setTimeout(() => setInfoMessage(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const selectionOptions = [
    {
      value: '',
      label: <span style={{ color: '#6b7280' }}>-- Select Status --</span>,
      isDisabled: true
    },
    {
      value: 'Selected',
      label: <span style={{ color: 'green', fontWeight: 600 }}>✅ Selected - Move to Staff</span>
    },
    {
      value: 'Not Selected',
      label: <span style={{ color: 'red', fontWeight: 600 }}>❌ Not Selected - Delete Permanently</span>
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'reviewing': return 'neon-orange';
      case 'interviewed': return 'neon-cyan';
      case 'hired': return 'neon-green';
      case 'rejected': return 'neon-red';
      case 'pending': return 'neon-purple';
      default: return 'neon-gray';
    }
  };

  const getStatusText = (status) => {
    if (!status) return 'Unknown';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const handleStatusUpdate = async (applicantId, newStatus) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    refetch();
    setIsLoading(false);
  };

  const filteredApplicants = selectedStatus === 'all' 
    ? applicants 
    : applicants.filter(applicant => applicant.status === selectedStatus);

  const columns = [
    {
      key: 'name',
      label: 'Applicant',
      render: (applicant) => (
        <div>
          <div className="font-bold text-white">{applicant.name}</div>
          <div className="text-white/70 text-sm">{applicant.email}</div>
        </div>
      )
    },
    {
      key: 'position',
      label: 'Position',
      render: (applicant) => (
        <span className="text-neon-cyan font-medium">{applicant.position ?? 'Unknown'}</span>
      )
    },
    {
      key: 'experience',
      label: 'Experience',
      render: (applicant) => (
        <span className="text-white/80">{applicant.experience ?? 'Not specified'}</span>
      )
    },
    {
      key: 'skills',
      label: 'Skills',
      render: (applicant) => (
        <div className="flex flex-wrap gap-1">
          {(applicant.skills ?? []).slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-dark-300 text-white text-xs rounded-full border border-dark-400"
            >
              {skill}
            </span>
          ))}
          {(applicant.skills ?? []).length > 3 && (
            <span className="px-2 py-1 bg-dark-300 text-white text-xs rounded-full border border-dark-400">
              +{(applicant.skills ?? []).length - 3}
            </span>
          )}
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (applicant) => (
        <span className={`px-2 py-1 rounded-full text-xs font-bold bg-${getStatusColor(applicant.status)}/20 text-${getStatusColor(applicant.status)} border border-${getStatusColor(applicant.status)}`}>
          {getStatusText(applicant.status)}
        </span>
      )
    },
    {
      key: 'appliedDate',
      label: 'Applied',
      render: (applicant) => (
        <span className="text-white/70 text-sm">{applicant.appliedDate ?? 'Unknown'}</span>
      )
    },
    {
      key: 'interview',
      label: 'Interview',
      render: (applicant) => (
        <div>
          {applicant.interview ? (
            <div className="space-y-1">
              <div className="text-white text-sm font-medium">
                {applicant.interview.date} at {applicant.interview.time}
              </div>
              <div className="text-neon-cyan text-xs">
                {applicant.interview.duration} min
              </div>
              {applicant.interview.googleMeetLink && (
                <a
                  href={applicant.interview.googleMeetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-purple text-xs hover:underline"
                >
                  Join Meeting
                </a>
              )}
            </div>
          ) : (
            <span className="text-white/50 text-sm">Not scheduled</span>
          )}
        </div>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (applicant) => (
        <div className="flex space-x-2">
          <Button
            variant="neon"
            size="sm"
            icon="👁️"
            onClick={() => handleViewApplicant(applicant)}
          >
            View
          </Button>
          <Button
            variant="cyber"
            size="sm"
            icon="📅"
            onClick={() => openSchedule(applicant)}
          >
            Schedule
          </Button>
          <div className="relative">
            <select
              value={applicant.status}
              onChange={(e) => handleStatusUpdate(applicant.id, e.target.value)}
              className="bg-dark-300 border border-dark-400 text-white text-sm rounded-lg px-3 py-1 focus:outline-none focus:border-neon-cyan"
            >
              <option value="reviewing">Reviewing</option>
              <option value="interviewed">Interviewed</option>
              <option value="hired">Hired</option>
              <option value="rejected">Rejected</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => deleteApplicant(applicant.id)}
            icon="🗑️"
            className="text-neon-red hover:text-neon-red/80"
          >
            Delete
          </Button>
        </div>
      )
    }
  ];

  const stats = [
    {
      label: 'Total Applicants',
      value: applicants.length,
      icon: '👥',
      color: 'neon-cyan'
    },
    {
      label: 'Under Review',
      value: applicants.filter(a => a.status === 'reviewing').length,
      icon: '📋',
      color: 'neon-orange'
    },
    {
      label: 'Scheduled Interviews',
      value: applicants.filter(a => a.interview && a.interview.date).length,
      icon: '📅',
      color: 'neon-purple'
    },
    {
      label: 'Hired',
      value: applicants.filter(a => a.status === 'hired').length,
      icon: '✅',
      color: 'neon-green'
    }
  ];

  const positions = [
    'Senior AI Engineer',
    'Quantum Computing Specialist',
    'Cybersecurity Analyst',
    'Full Stack Developer',
    'Data Scientist',
    'DevOps Engineer',
    'Product Manager',
    'UX Designer'
  ];

  return (
    <div className="min-h-screen bg-dark-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-cyber font-bold text-white mb-2">
            Applicant Management
          </h1>
          <p className="text-white/70">
            Review and manage job applications
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} variant="glass" className="p-6">
              <div className="flex items-center justify-between">
    <div>
                  <p className="text-white/70 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <div className="text-4xl">{stat.icon}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Filters and Actions */}
        <Card variant="glass" className="p-6 mb-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Applications</h3>
            <div className="flex space-x-4">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-dark-300 border border-dark-400 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-neon-cyan"
              >
                <option value="all">All Applications</option>
                <option value="reviewing">Under Review</option>
                <option value="interviewed">Interviewed</option>
                <option value="hired">Hired</option>
                <option value="rejected">Rejected</option>
                <option value="pending">Pending</option>
              </select>
              <Button variant="neon" size="sm" icon="📊" onClick={handleExportApplicants}>
                Export
              </Button>
              <Button variant="cyber" size="sm" icon="➕" onClick={handlePostJob}>
                Post Job
              </Button>
            </div>
          </div>
        </Card>

        {/* Applicants Table */}
        <Card variant="glass" className="p-6">
          <DataTable
            data={filteredApplicants}
            columns={columns}
            loading={isLoading}
            emptyMessage="No applicants found."
            searchable={true}
            sortable={true}
            pagination={true}
            itemsPerPage={5}
          />
        </Card>

        {/* Open Positions */}
        <Card variant="glass" className="p-6 mt-8">
          <h3 className="text-xl font-bold text-white mb-6">Open Positions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {positions.map((position, index) => (
              <div
                key={index}
                className="p-4 bg-dark-300 rounded-xl border border-dark-400 hover:border-neon-cyan transition-all duration-300 cursor-pointer"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">💼</div>
                  <h4 className="text-white font-medium text-sm">{position}</h4>
                  <p className="text-white/50 text-xs mt-1">
                    {Math.floor(Math.random() * 10) + 1} applicants
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card variant="glass" className="p-6 mt-8">
          <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {applicants.slice(0, 5).map((applicant) => (
              <div
                key={applicant.id}
                className="flex items-center justify-between p-4 bg-dark-300 rounded-xl border border-dark-400"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full bg-${getStatusColor(applicant.status)}`}></div>
                  <div>
                    <p className="text-white font-medium">
                      {applicant.name} applied for {applicant.position ?? 'Unknown'}
                    </p>
                    <p className="text-white/70 text-sm">
                      {applicant.appliedDate} • {applicant.experience ?? 0} experience
                    </p>
                  </div>
      </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold bg-${getStatusColor(applicant.status)}/20 text-${getStatusColor(applicant.status)} border border-${getStatusColor(applicant.status)}`}>
                    {getStatusText(applicant.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Applicant Detail Modal */}
      {selectedApplicant && (
        <Modal
          isOpen={showApplicantModal}
          onClose={() => setShowApplicantModal(false)}
          title={`${selectedApplicant.name} - Application Details`}
        >
          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h4 className="text-lg font-bold text-white mb-3">Personal Information</h4>
              <div className="bg-dark-300 rounded-xl p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/70">Name:</span>
                  <span className="text-white font-medium">{selectedApplicant.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Email:</span>
                  <span className="text-white">{selectedApplicant.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Phone:</span>
                  <span className="text-white">{selectedApplicant.phone || 'Not provided'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Applied Date:</span>
                  <span className="text-white">{selectedApplicant.appliedDate}</span>
                </div>
              </div>
            </div>

            {/* Application Details */}
            <div>
              <h4 className="text-lg font-bold text-white mb-3">Application Details</h4>
              <div className="bg-dark-300 rounded-xl p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/70">Position:</span>
                  <span className="text-neon-cyan font-medium">{selectedApplicant.position ?? 'Unknown'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Experience:</span>
                  <span className="text-white">{selectedApplicant.experience ?? 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Education:</span>
                  <span className="text-white">{selectedApplicant.education || 'Not provided'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold bg-${getStatusColor(selectedApplicant.status)}/20 text-${getStatusColor(selectedApplicant.status)} border border-${getStatusColor(selectedApplicant.status)}`}>
                    {getStatusText(selectedApplicant.status)}
                  </span>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h4 className="text-lg font-bold text-white mb-3">Skills</h4>
              <div className="bg-dark-300 rounded-xl p-4">
                <div className="flex flex-wrap gap-2">
                  {(selectedApplicant.skills ?? []).map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-neon-cyan/20 text-neon-cyan text-sm rounded-full border border-neon-cyan"
                    >
                      {skill}
                    </span>
                  ))}
                  {(selectedApplicant.skills ?? []).length === 0 && (
                    <span className="text-white/50 text-sm">No skills listed</span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
              <Button
                variant="cyber"
                size="lg"
                icon="📧"
                className="flex-1"
                onClick={() => {
                  // Simulate sending email
                  alert(`Email sent to ${selectedApplicant.email}`);
                }}
              >
                Send Email
              </Button>
              <Button
                variant="neon"
                size="lg"
                icon="📅"
                className="flex-1"
                onClick={() => {
                  openSchedule(selectedApplicant);
                  setShowApplicantModal(false);
                }}
              >
                Schedule Interview
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Info Message */}
      {infoMessage && (
        <div className="fixed top-4 right-4 bg-neon-green text-dark-50 px-4 py-2 rounded-lg shadow-lg z-50">
          {infoMessage}
        </div>
      )}

      {/* Schedule Interview Modal */}
      {selected && (
        <Modal
          isOpen={showScheduleModal}
          onClose={() => {
            setShowScheduleModal(false);
            setSelected(null);
            setScheduleForm({
              date: '',
              time: '',
              googleMeetLink: '',
              notes: '',
              duration: '60'
            });
          }}
          title={`Schedule Interview - ${selected.name}`}
        >
          <form onSubmit={handleSchedule} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">Interview Date</label>
                <input
                  type="date"
                  name="date"
                  value={scheduleForm.date}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })}
                  className="input"
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Interview Time</label>
                <input
                  type="time"
                  name="time"
                  value={scheduleForm.time}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
                  className="input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Google Meet Link</label>
                <input
                  type="url"
                name="googleMeetLink"
                value={scheduleForm.googleMeetLink}
                onChange={(e) => setScheduleForm({ ...scheduleForm, googleMeetLink: e.target.value })}
                placeholder="https://meet.google.com/xxx-xxxx-xxx"
                className="input"
                required
              />
              <p className="text-white/50 text-sm mt-1">
                Create a Google Meet link and paste it here
              </p>
            </div>

            <div className="form-group">
              <label className="form-label">Duration (minutes)</label>
              <select
                name="duration"
                value={scheduleForm.duration}
                onChange={(e) => setScheduleForm({ ...scheduleForm, duration: e.target.value })}
                className="input"
                required
              >
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">1 hour</option>
                <option value="90">1.5 hours</option>
                <option value="120">2 hours</option>
              </select>
              </div>

            <div className="form-group">
              <label className="form-label">Notes</label>
                <textarea
                name="notes"
                value={scheduleForm.notes}
                onChange={(e) => setScheduleForm({ ...scheduleForm, notes: e.target.value })}
                placeholder="Any additional notes for the interview..."
                rows={3}
                className="input resize-none"
                />
              </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                variant="cyber"
                loading={isLoading}
                icon="📅"
                className="flex-1"
              >
                {isLoading ? 'Scheduling...' : 'Schedule Interview'}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setShowScheduleModal(false);
                  setSelected(null);
                  setScheduleForm({
                    date: '',
                    time: '',
                    googleMeetLink: '',
                    notes: '',
                    duration: '60'
                  });
                }}
                icon="❌"
              >
                Cancel
              </Button>
              </div>
            </form>
        </Modal>
      )}
    </div>
  );
}

export default AdminApplicants; 