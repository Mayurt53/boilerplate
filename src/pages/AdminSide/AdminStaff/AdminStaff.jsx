import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getStaff, addStaff, updateStaff, deleteStaff } from '../../../services/api';

function AdminStaff() {
  const [staff, setStaff] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    hireDate: '',
    salary: '',
    status: 'Active',
    avatar: '👤'
  });
  const [search, setSearch] = useState('');

  useEffect(() => {
    getStaff().then(res => setStaff(res.data)).catch(() => setStaff([]));
  }, []);

  const filtered = staff.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase()) ||
    s.position.toLowerCase().includes(search.toLowerCase())
  );

  const openEdit = (staffMember) => {
    setSelected(staffMember);
    setForm({
      name: staffMember.name || '',
      email: staffMember.email || '',
      phone: staffMember.phone || '',
      position: staffMember.position || '',
      department: staffMember.department || '',
      hireDate: staffMember.hireDate || '',
      salary: staffMember.salary || '',
      status: staffMember.status || 'Active',
      avatar: staffMember.avatar || '👤'
    });
  };

  const openAdd = () => {
    setIsAdding(true);
    setForm({
      name: '',
      email: '',
      phone: '',
      position: '',
      department: '',
      hireDate: '',
      salary: '',
      status: 'Active',
      avatar: '👤'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAdding) {
      addStaff(form).then(res => {
        setStaff([...staff, res.data]);
        setIsAdding(false);
        setForm({
          name: '',
          email: '',
          phone: '',
          position: '',
          department: '',
          hireDate: '',
          salary: '',
          status: 'Active',
          avatar: '👤'
        });
      });
    } else {
      updateStaff(selected.id, form).then(res => {
        setStaff(staff.map(s => s.id === selected.id ? res.data : s));
        setSelected(null);
        setForm({
          name: '',
          email: '',
          phone: '',
          position: '',
          department: '',
          hireDate: '',
          salary: '',
          status: 'Active',
          avatar: '👤'
        });
      });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      deleteStaff(id).then(() => setStaff(staff.filter(s => s.id !== id)));
    }
  };

  const closeModal = () => {
    setSelected(null);
    setIsAdding(false);
    setForm({
      name: '',
      email: '',
      phone: '',
      position: '',
      department: '',
      hireDate: '',
      salary: '',
      status: 'Active',
      avatar: '👤'
    });
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search staff..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-modern w-full md:w-80"
          />
          <button
            onClick={openAdd}
            className="btn-primary px-6 py-2"
          >
            Add Staff
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Avatar</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Email</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Phone</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Position</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Department</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Hire Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Salary</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filtered.map(staffMember => (
              <tr key={staffMember.id}>
                <td className="px-4 py-3">
                  <div className="text-2xl">{staffMember.avatar}</div>
                </td>
                <td className="px-4 py-3 font-semibold text-gray-900">{staffMember.name}</td>
                <td className="px-4 py-3">{staffMember.email}</td>
                <td className="px-4 py-3">{staffMember.phone}</td>
                <td className="px-4 py-3">{staffMember.position}</td>
                <td className="px-4 py-3">{staffMember.department}</td>
                <td className="px-4 py-3">{staffMember.hireDate}</td>
                <td className="px-4 py-3">${staffMember.salary}</td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    staffMember.status === 'Active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {staffMember.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(staffMember)}
                      className="btn-secondary px-3 py-1 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(staffMember.id)}
                      className="btn-danger px-3 py-1 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Staff Modal */}
      {(selected || isAdding) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto"
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl"
              onClick={closeModal}
            >
              ×
            </button>
            <h2 className="text-xl font-bold text-purple-700 mb-6">
              {isAdding ? 'Add New Staff Member' : 'Edit Staff Member'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Avatar</label>
                  <select
                    className="input-modern w-full"
                    value={form.avatar}
                    onChange={e => setForm({ ...form, avatar: e.target.value })}
                  >
                    <option value="👤">👤 Default</option>
                    <option value="👨‍💼">👨‍💼 Male</option>
                    <option value="👩‍💼">👩‍💼 Female</option>
                    <option value="👨‍💻">👨‍💻 Developer</option>
                    <option value="👩‍💻">👩‍💻 Developer</option>
                    <option value="👨‍🎨">👨‍🎨 Designer</option>
                    <option value="👩‍🎨">👩‍🎨 Designer</option>
                    <option value="👨‍🎯">👨‍🎯 Manager</option>
                    <option value="👩‍🎯">👩‍🎯 Manager</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    className="input-modern w-full"
                    value={form.status}
                    onChange={e => setForm({ ...form, status: e.target.value })}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Terminated">Terminated</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                  <input
                    type="text"
                    className="input-modern w-full"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                    placeholder="Full Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    className="input-modern w-full"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    required
                    placeholder="email@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    className="input-modern w-full"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
                  <input
                    type="text"
                    className="input-modern w-full"
                    value={form.position}
                    onChange={e => setForm({ ...form, position: e.target.value })}
                    required
                    placeholder="e.g., Senior Developer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                  <select
                    className="input-modern w-full"
                    value={form.department}
                    onChange={e => setForm({ ...form, department: e.target.value })}
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Product">Product</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hire Date *</label>
                  <input
                    type="date"
                    className="input-modern w-full"
                    value={form.hireDate}
                    onChange={e => setForm({ ...form, hireDate: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Salary *</label>
                  <input
                    type="number"
                    className="input-modern w-full"
                    value={form.salary}
                    onChange={e => setForm({ ...form, salary: e.target.value })}
                    required
                    placeholder="50000"
                    min="0"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
                >
                  {isAdding ? 'Add Staff Member' : 'Update Staff Member'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default AdminStaff; 