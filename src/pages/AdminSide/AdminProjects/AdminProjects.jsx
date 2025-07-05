import React, { useState, useEffect } from 'react';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Modal from '../../../components/Modal';
import DataTable from '../../../components/DataTable';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    client: '',
    startDate: '',
    endDate: '',
    budget: '',
    status: 'planning',
    priority: 'medium',
    team: []
  });

  useEffect(() => {
    // Simulate loading projects
    setTimeout(() => {
      setProjects([
  {
    id: 1,
          name: 'Quantum Computing Platform',
          description: 'Development of a next-generation quantum computing platform for research institutions.',
          client: 'TechCorp Research',
          startDate: '2024-01-01',
          endDate: '2024-06-30',
          budget: 500000,
          status: 'in-progress',
          priority: 'high',
          team: ['Dr. Sarah Chen', 'Alex Thompson', 'Emily Watson'],
          progress: 65
  },
  {
    id: 2,
          name: 'AI-Powered Analytics Dashboard',
          description: 'Creating an intelligent analytics dashboard for enterprise clients.',
          client: 'DataFlow Inc.',
          startDate: '2024-02-01',
          endDate: '2024-05-31',
          budget: 250000,
          status: 'planning',
          priority: 'medium',
          team: ['Marcus Rodriguez', 'Lisa Park'],
          progress: 15
  },
  {
    id: 3,
          name: 'Cybersecurity Framework',
          description: 'Building a comprehensive cybersecurity framework for financial institutions.',
          client: 'SecureBank',
          startDate: '2023-11-01',
          endDate: '2024-04-30',
          budget: 350000,
          status: 'completed',
          priority: 'high',
          team: ['David Kim', 'Sarah Wilson', 'Mike Johnson'],
          progress: 100
        },
        {
          id: 4,
          name: 'Cloud Migration Solution',
          description: 'Migrating legacy systems to modern cloud infrastructure.',
          client: 'CloudTech Solutions',
          startDate: '2024-03-01',
          endDate: '2024-08-31',
          budget: 400000,
          status: 'planning',
          priority: 'low',
          team: ['John Smith', 'Anna Lee'],
          progress: 5
        }
      ]);
    }, 1000);
  }, []);

  const statuses = [
    { id: 'planning', name: 'Planning', color: 'neon-orange' },
    { id: 'in-progress', name: 'In Progress', color: 'neon-cyan' },
    { id: 'review', name: 'Review', color: 'neon-purple' },
    { id: 'completed', name: 'Completed', color: 'neon-green' },
    { id: 'on-hold', name: 'On Hold', color: 'neon-red' }
  ];

  const priorities = [
    { id: 'low', name: 'Low', color: 'neon-green' },
    { id: 'medium', name: 'Medium', color: 'neon-orange' },
    { id: 'high', name: 'High', color: 'neon-red' }
  ];

  const teamMembers = [
    'Dr. Sarah Chen',
    'Alex Thompson',
    'Emily Watson',
    'Marcus Rodriguez',
    'Lisa Park',
    'David Kim',
    'Sarah Wilson',
    'Mike Johnson',
    'John Smith',
    'Anna Lee'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (editingProject) {
      setProjects(projects.map(p => p.id === editingProject.id ? { ...formData, id: p.id, progress: p.progress } : p));
    } else {
      setProjects([...projects, { ...formData, id: Date.now(), progress: 0 }]);
    }
    
    setIsModalOpen(false);
    setEditingProject(null);
    setFormData({
      name: '',
      description: '',
      client: '',
      startDate: '',
      endDate: '',
      budget: '',
      status: 'planning',
      priority: 'medium',
      team: []
    });
    setIsLoading(false);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData(project);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setProjects(projects.filter(p => p.id !== id));
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const statusObj = statuses.find(s => s.id === status);
    return statusObj ? statusObj.color : 'neon-gray';
  };

  const getPriorityColor = (priority) => {
    const priorityObj = priorities.find(p => p.id === priority);
    return priorityObj ? priorityObj.color : 'neon-gray';
  };

  const columns = [
    {
      key: 'name',
      label: 'Project Name',
      render: (project) => (
        <div>
          <div className="font-bold text-white">{project.name}</div>
          <div className="text-white/70 text-sm">{project.description}</div>
        </div>
      )
    },
    {
      key: 'client',
      label: 'Client',
      render: (project) => (
        <span className="text-white font-medium">{project.client}</span>
      )
    },
    {
      key: 'startDate',
      label: 'Timeline',
      render: (project) => (
        <div className="text-white/70 text-sm">
          <div>{project.startDate} - {project.endDate}</div>
        </div>
      )
    },
    {
      key: 'budget',
      label: 'Budget',
      render: (project) => (
        <span className="text-neon-cyan font-bold">${project.budget.toLocaleString()}</span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (project) => (
        <span className={`px-2 py-1 rounded-full text-xs font-bold bg-${getStatusColor(project.status)}/20 text-${getStatusColor(project.status)} border border-${getStatusColor(project.status)}`}>
          {statuses.find(s => s.id === project.status)?.name}
        </span>
      )
    },
    {
      key: 'priority',
      label: 'Priority',
      render: (project) => (
        <span className={`px-2 py-1 rounded-full text-xs font-bold bg-${getPriorityColor(project.priority)}/20 text-${getPriorityColor(project.priority)} border border-${getPriorityColor(project.priority)}`}>
          {priorities.find(p => p.id === project.priority)?.name}
        </span>
      )
    },
    {
      key: 'progress',
      label: 'Progress',
      render: (project) => (
        <div className="w-full">
          <div className="flex justify-between text-xs text-white/70 mb-1">
            <span>{project.progress}%</span>
          </div>
          <div className="w-full bg-dark-400 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-neon-cyan to-neon-purple h-2 rounded-full transition-all duration-300"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (project) => (
        <div className="flex space-x-2">
          <Button
            variant="neon"
            size="sm"
            onClick={() => handleEdit(project)}
            icon="✏️"
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(project.id)}
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
      label: 'Total Projects',
      value: projects.length,
      icon: '🚀',
      color: 'neon-cyan'
    },
    {
      label: 'In Progress',
      value: projects.filter(p => p.status === 'in-progress').length,
      icon: '⚙️',
      color: 'neon-purple'
    },
    {
      label: 'Completed',
      value: projects.filter(p => p.status === 'completed').length,
      icon: '✅',
      color: 'neon-green'
    },
    {
      label: 'Total Budget',
      value: `$${projects.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}`,
      icon: '💰',
      color: 'neon-orange'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
    <div>
            <h1 className="text-4xl font-cyber font-bold text-white mb-2">
              Project Management
            </h1>
            <p className="text-white/70">
              Track and manage all ongoing projects
            </p>
          </div>
          <Button
            variant="cyber"
            size="lg"
            onClick={() => setIsModalOpen(true)}
            icon="➕"
          >
            Add Project
          </Button>
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

        {/* Projects Table */}
        <Card variant="glass" className="p-6">
          <DataTable
            data={projects}
            columns={columns}
            loading={isLoading}
            emptyMessage="No projects found. Add your first project to get started."
          />
        </Card>

        {/* Add/Edit Project Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingProject(null);
            setFormData({
              name: '',
              description: '',
              client: '',
              startDate: '',
              endDate: '',
              budget: '',
              status: 'planning',
              priority: 'medium',
              team: []
            });
          }}
          title={editingProject ? 'Edit Project' : 'Add New Project'}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Project Name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter project name"
              required
              icon="🚀"
            />

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter project description"
                required
                rows={3}
                className="input resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Client"
                name="client"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                placeholder="Client name"
                required
                icon="👥"
              />
              <Input
                label="Budget"
                name="budget"
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                placeholder="0"
                required
                icon="💰"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Start Date"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
                icon="📅"
              />
              <Input
                label="End Date"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
                icon="📅"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="input"
                  required
                >
                  {statuses.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="input"
                  required
                >
                  {priorities.map((priority) => (
                    <option key={priority.id} value={priority.id}>
                      {priority.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Team Members</label>
              <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                {teamMembers.map((member) => (
                  <label key={member} className="flex items-center space-x-2">
                  <input
                      type="checkbox"
                      checked={formData.team.includes(member)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, team: [...formData.team, member] });
                        } else {
                          setFormData({ ...formData, team: formData.team.filter(t => t !== member) });
                        }
                      }}
                      className="text-neon-cyan focus:ring-neon-cyan border-dark-400 rounded bg-dark-300"
                    />
                    <span className="text-white text-sm">{member}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                variant="cyber"
                loading={isLoading}
                icon="💾"
                className="flex-1"
              >
                {isLoading ? 'Saving...' : (editingProject ? 'Update Project' : 'Add Project')}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsModalOpen(false)}
                icon="❌"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default AdminProjects; 