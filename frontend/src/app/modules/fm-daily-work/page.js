'use client';
import React, { useState, useEffect } from 'react';

export default function FMDailyWorkPage() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('tasks');
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    workTitle: '',
    description: '',
    assignedStaff: '',
    status: 'pending',
    priority: 'medium',
    completionTime: '',
    remarks: '',
    photoUpload: null
  });

  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  // Load tasks from localStorage
  useEffect(() => {
    const storedTasks = localStorage.getItem('fm_daily_tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      // Sample data
      const sampleTasks = [
        {
          id: 1,
          date: '2026-05-31',
          workTitle: 'Garden Maintenance',
          description: 'Water plants and trim hedges in main garden area',
          assignedStaff: 'Rajesh Kumar',
          status: 'completed',
          priority: 'high',
          completionTime: '10:30 AM',
          remarks: 'All tasks completed successfully',
          photoUpload: null
        },
        {
          id: 2,
          date: '2026-05-31',
          workTitle: 'Pool Cleaning',
          description: 'Clean pool filters and check water quality',
          assignedStaff: 'Suresh Singh',
          status: 'in-progress',
          priority: 'medium',
          completionTime: '',
          remarks: 'Filter cleaning in progress',
          photoUpload: null
        },
        {
          id: 3,
          date: '2026-05-31',
          workTitle: 'Security Check',
          description: 'Check all security cameras and gate systems',
          assignedStaff: 'Amit Sharma',
          status: 'pending',
          priority: 'high',
          completionTime: '',
          remarks: '',
          photoUpload: null
        }
      ];
      setTasks(sampleTasks);
      localStorage.setItem('fm_daily_tasks', JSON.stringify(sampleTasks));
    }
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('fm_daily_tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      ...formData
    };
    setTasks([...tasks, newTask]);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      workTitle: '',
      description: '',
      assignedStaff: '',
      status: 'pending',
      priority: 'medium',
      completionTime: '',
      remarks: '',
      photoUpload: null
    });
    setShowForm(false);
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: newStatus, completionTime: newStatus === 'completed' ? new Date().toLocaleTimeString() : '' }
        : task
    ));
  };

  const handleDelete = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const filteredTasks = tasks.filter(task => {
    const statusMatch = filterStatus === 'all' || task.status === filterStatus;
    const priorityMatch = filterPriority === 'all' || task.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Report calculations
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
  const highPriorityTasks = tasks.filter(t => t.priority === 'high' && t.status !== 'completed').length;

  // CSV Download Function
  const downloadCSV = () => {
    const headers = ['Date', 'Work Title', 'Description', 'Assigned Staff', 'Status', 'Priority', 'Completion Time', 'Remarks'];
    const csvContent = [
      headers.join(','),
      ...tasks.map(task => [
        task.date,
        `"${task.workTitle}"`,
        `"${task.description}"`,
        task.assignedStaff,
        task.status,
        task.priority,
        task.completionTime || '-',
        `"${task.remarks || ''}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `fm_daily_work_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // PDF Download Function (using print)
  const downloadPDF = () => {
    const printContent = `
      <html>
        <head>
          <title>FM Daily Work Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #333; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .stats { display: flex; gap: 20px; margin: 20px 0; }
            .stat-box { padding: 15px; background: #f9f9f9; border-radius: 8px; }
            .stat-number { font-size: 24px; font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>FM Daily Work Report</h1>
          <p>Date: ${new Date().toLocaleDateString()}</p>
          <div class="stats">
            <div class="stat-box">
              <div class="stat-number">${tasks.length}</div>
              <div>Total Tasks</div>
            </div>
            <div class="stat-box">
              <div class="stat-number">${completedTasks}</div>
              <div>Completed</div>
            </div>
            <div class="stat-box">
              <div class="stat-number">${inProgressTasks}</div>
              <div>In Progress</div>
            </div>
            <div class="stat-box">
              <div class="stat-number">${pendingTasks}</div>
              <div>Pending</div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Work Title</th>
                <th>Description</th>
                <th>Assigned Staff</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Completion Time</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              ${tasks.map(task => `
                <tr>
                  <td>${task.date}</td>
                  <td>${task.workTitle}</td>
                  <td>${task.description}</td>
                  <td>${task.assignedStaff}</td>
                  <td>${task.status}</td>
                  <td>${task.priority}</td>
                  <td>${task.completionTime || '-'}</td>
                  <td>${task.remarks || ''}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">FM Daily Work Details</h1>
            <p className="text-gray-600 mt-1">Track daily work completed by Facility Manager</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg"
          >
            + Add New Task
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
            <div className="text-3xl font-bold text-indigo-600 mb-1">{tasks.length}</div>
            <div className="text-gray-600 text-sm">Total Tasks</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
            <div className="text-3xl font-bold text-green-600 mb-1">{completedTasks}</div>
            <div className="text-gray-600 text-sm">Completed</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-100">
            <div className="text-3xl font-bold text-orange-600 mb-1">{inProgressTasks}</div>
            <div className="text-gray-600 text-sm">In Progress</div>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-2xl border border-red-100">
            <div className="text-3xl font-bold text-red-600 mb-1">{pendingTasks}</div>
            <div className="text-gray-600 text-sm">Pending</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === 'tasks' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Tasks
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === 'reports' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Reports
          </button>
        </div>

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <>
            {/* Filters */}
            <div className="flex space-x-4 mb-6">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              >
                <option value="all">All Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Tasks List */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Work Title</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Assigned Staff</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Completion Time</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredTasks.map(task => (
                    <tr key={task.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.date}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{task.workTitle}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{task.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.assignedStaff}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={task.status}
                          onChange={(e) => handleStatusChange(task.id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(task.status)}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.completionTime || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleDelete(task.id)}
                          className="text-red-600 hover:text-red-800 font-semibold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredTasks.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No tasks found
                </div>
              )}
            </div>
          </>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            {/* Download Buttons */}
            <div className="flex space-x-4 mb-6">
              <button
                onClick={downloadCSV}
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                📊 Download CSV
              </button>
              <button
                onClick={downloadPDF}
                className="px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                📄 Download PDF
              </button>
            </div>

            {/* Daily FM Report */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Daily FM Report</h3>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">{tasks.length}</div>
                  <div className="text-sm text-gray-600">Total Tasks Today</div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="bg-red-50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-red-600">{highPriorityTasks}</div>
                  <div className="text-sm text-gray-600">High Priority Pending</div>
                </div>
              </div>
            </div>

            {/* Weekly Pending Work */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Weekly Pending Work</h3>
              <div className="space-y-3">
                {tasks.filter(t => t.status !== 'completed').map(task => (
                  <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <div className="font-semibold text-gray-900">{task.workTitle}</div>
                      <div className="text-sm text-gray-600">{task.assignedStaff} • {task.priority} priority</div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </div>
                ))}
                {tasks.filter(t => t.status !== 'completed').length === 0 && (
                  <div className="text-center py-8 text-gray-500">No pending work</div>
                )}
              </div>
            </div>

            {/* Monthly Maintenance Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Monthly Maintenance Summary</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-indigo-50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-indigo-600">{tasks.length}</div>
                  <div className="text-sm text-gray-600">Total Tasks This Month</div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">
                    {tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0}%
                  </div>
                  <div className="text-sm text-gray-600">Completion Rate</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Task Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Add New Task</h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      required
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Priority</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({...formData, priority: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Work Title</label>
                  <input
                    type="text"
                    value={formData.workTitle}
                    onChange={(e) => setFormData({...formData, workTitle: e.target.value})}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    placeholder="Enter work title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent resize-none"
                    placeholder="Enter work description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Assigned Staff</label>
                  <input
                    type="text"
                    value={formData.assignedStaff}
                    onChange={(e) => setFormData({...formData, assignedStaff: e.target.value})}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    placeholder="Enter staff name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Completion Time</label>
                    <input
                      type="time"
                      value={formData.completionTime}
                      onChange={(e) => setFormData({...formData, completionTime: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Remarks</label>
                  <textarea
                    value={formData.remarks}
                    onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent resize-none"
                    placeholder="Enter remarks (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Photo Upload</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({...formData, photoUpload: e.target.files[0]})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all"
                  >
                    Add Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
  );
}
