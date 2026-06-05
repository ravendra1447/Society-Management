'use client';
import React, { useEffect, useState } from 'react';

export default function FMDailyWorkPage() {
  const [tasks, setTasks] = useState([]);
  const [dailyReadings, setDailyReadings] = useState([]);
  const [helpdeskTickets, setHelpdeskTickets] = useState([]);
  const [hkAttendance, setHkAttendance] = useState([]);
  const [moveLogs, setMoveLogs] = useState([]);
  const [staffLogs, setStaffLogs] = useState([]);

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
  const [imagePreview, setImagePreview] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  // Helper: fallback setter
  const normalizeTask = (task) => ({
    id: task.id,
    date: task.date,
    workTitle: task.workTitle || task.work_title,
    description: task.description,
    assignedStaff: task.assignedStaff || task.assigned_staff,
    status: task.status,
    priority: task.priority,
    completionTime: task.completionTime || task.completion_time,
    remarks: task.remarks,
    photoUpload: task.photoUpload || task.photo_data
  });

  const normalizeTicket = (ticket) => ({
    id: ticket.id,
    ticketId: ticket.ticketId || ticket.ticket_id,
    status: ticket.status,
    remark: ticket.remark,
    date: ticket.date || ticket.report_date
  });

  const normalizeAttendance = (record) => ({
    staff_name: record.staff_name,
    attendance_date: record.attendance_date,
    status: record.status,
    remarks: record.remarks
  });

  const normalizeMoveLog = (log) => ({
    id: log.id,
    type: log.type,
    flat: log.flat,
    move_date: log.move_date,
    note: log.note
  });

  const fetchOrFallback = async (url, setter, storageKey, mapper = (item) => item) => {
    let data = null;
    try {
      const r = await fetch(url);
      if (r.ok) {
        data = await r.json();
      }
    } catch (e) {
      data = null;
    }

    if (Array.isArray(data)) {
      const mapped = data.map(mapper);
      setter(mapped);
      localStorage.setItem(storageKey, JSON.stringify(mapped));
      return;
    }

    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const cached = JSON.parse(stored);
        if (Array.isArray(cached)) {
          setter(cached);
          return;
        }
      } catch (e) {}
    }

    setter([]);
  };

  useEffect(() => {
    (async () => {
      await fetchOrFallback(`${API_BASE}/api/fm/tasks`, setTasks, 'fm_daily_tasks', normalizeTask);
      await fetchOrFallback(`${API_BASE}/api/complaints`, setHelpdeskTickets, 'fm_helpdesk_tickets', (c) => ({
        id: c.id,
        ticketId: `#${c.id}`,
        status: c.status,
        remark: c.description,
        date: c.createdAt ? new Date(c.createdAt).toLocaleDateString() : new Date().toLocaleDateString(),
        raised_by: c.raised_by,
        category: c.category,
        title: c.title
      }));
      await fetchOrFallback(`${API_BASE}/api/staff`, setStaffLogs, 'fm_staff_logs');
      
      // Load move logs from localStorage (relocation module uses local state)
      const storedMoveLogs = localStorage.getItem('relocation_requests');
      if (storedMoveLogs) {
        try {
          setMoveLogs(JSON.parse(storedMoveLogs));
        } catch (e) {
          setMoveLogs([]);
        }
      }
    })();
  }, []);

  // persist local changes as well
  useEffect(() => localStorage.setItem('fm_helpdesk_tickets', JSON.stringify(helpdeskTickets)), [helpdeskTickets]);
  useEffect(() => localStorage.setItem('fm_move_logs', JSON.stringify(moveLogs)), [moveLogs]);

  const convertFileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });

  const compressImage = async (file, maxDimension = 1200, quality = 0.7) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let { width, height } = img;

          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((maxDimension * height) / width);
              width = maxDimension;
            } else {
              width = Math.round((maxDimension * width) / height);
              height = maxDimension;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (!blob) return reject(new Error('Image compression failed.'));
              const compressedFile = new File([blob], file.name, { type: 'image/jpeg' });
              resolve(compressedFile);
            },
            'image/jpeg',
            quality
          );
        };
        img.onerror = () => reject(new Error('Unable to load image for compression.'));
        img.src = reader.result;
      };
      reader.onerror = () => reject(new Error('Unable to read file for compression.'));
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressedFile = await compressImage(file, 1200, 0.7);
      setFormData(prev => ({ ...prev, photoUpload: compressedFile }));

      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error('Image compression failed', error);
      setFormData(prev => ({ ...prev, photoUpload: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let photoBase64 = null;
    if (formData.photoUpload) photoBase64 = await convertFileToBase64(formData.photoUpload);

    const payload = {
      date: formData.date,
      work_title: formData.workTitle,
      description: formData.description,
      assigned_staff: formData.assignedStaff,
      status: formData.status,
      priority: formData.priority,
      completion_time: formData.completionTime,
      remarks: formData.remarks,
      photo_data: photoBase64
    };

    try {
      const response = await fetch(`${API_BASE}/api/fm/tasks`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const createdTask = await response.json();
      if (response.ok) {
        setTasks(prev => [normalizeTask(createdTask), ...prev]);
      } else {
        console.error('FM task save failed', createdTask);
        alert('Task could not be saved to the database.');
      }
    } catch (e) {
      console.error('FM task save error', e);
      alert('Unable to save FM task. Check your backend connection.');
    }

    setFormData({ date: new Date().toISOString().split('T')[0], workTitle: '', description: '', assignedStaff: '', status: 'pending', priority: 'medium', completionTime: '', remarks: '', photoUpload: null });
    setImagePreview(null);
    setShowForm(false);
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus, completionTime: newStatus === 'completed' ? new Date().toLocaleTimeString() : t.completionTime } : t));
  };

  const handleDelete = (taskId) => setTasks(prev => prev.filter(t => t.id !== taskId));

  const downloadCSV = () => {
    const headers = ['Date','Work Title','Description','Assigned Staff','Status','Priority','Completion Time','Remarks'];
    const rows = tasks.map(t => [t.date, t.workTitle, t.description, t.assignedStaff, t.status, t.priority, t.completionTime || '-', (t.remarks||'')].map(v => `"${String(v).replace(/"/g,'""')}"`).join(','));
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `fm_daily_work_${new Date().toISOString().split('T')[0]}.csv`; a.click(); URL.revokeObjectURL(url);
  };

  const downloadPDF = () => {
    const printContent = `FM Daily Work - ${new Date().toLocaleDateString()}\n\n` + tasks.map(t => `${t.date} | ${t.workTitle} | ${t.assignedStaff} | ${t.status}`).join('\n');
    const w = window.open('', '_blank'); w.document.write(`<pre>${printContent}</pre>`); w.document.close(); w.print();
  };

  const filteredTasks = tasks.filter(task => (filterStatus === 'all' || task.status === filterStatus) && (filterPriority === 'all' || task.priority === filterPriority));

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">FM Daily Work Details</h1>
          <p className="text-gray-600 mt-1 text-sm">Track daily work completed by Facility Manager</p>
        </div>
        <button onClick={() => setShowForm(true)} className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg w-full sm:w-auto">+ Add New Task</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-2xl border border-blue-100">
          <div className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-1">{tasks.length}</div>
          <div className="text-gray-600 text-xs sm:text-sm">Total Tasks</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6 rounded-2xl border border-green-100">
          <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">{tasks.filter(t=>t.status==='completed').length}</div>
          <div className="text-gray-600 text-xs sm:text-sm">Completed</div>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 sm:p-6 rounded-2xl border border-yellow-100">
          <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1">{tasks.filter(t=>t.status==='in-progress').length}</div>
          <div className="text-gray-600 text-xs sm:text-sm">In Progress</div>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-rose-50 p-4 sm:p-6 rounded-2xl border border-red-100">
          <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-1">{tasks.filter(t=>t.status==='pending').length}</div>
          <div className="text-gray-600 text-xs sm:text-sm">Pending</div>
        </div>
      </div>

      <div className="flex overflow-x-auto space-x-2 sm:space-x-4 mb-6 border-b border-gray-200 pb-2">
        <button onClick={() => setActiveTab('tasks')} className={`px-4 py-2 font-semibold whitespace-nowrap ${activeTab==='tasks' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600'}`}>Tasks</button>
        <button onClick={() => setActiveTab('reports')} className={`px-4 py-2 font-semibold whitespace-nowrap ${activeTab==='reports' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600'}`}>Reports</button>
        <button onClick={() => setActiveTab('fm')} className={`px-4 py-2 font-semibold whitespace-nowrap ${activeTab==='fm' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600'}`}>FM Hub</button>
      </div>

      {activeTab === 'tasks' && (
        <>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-6">
            <select value={filterStatus} onChange={(e)=>setFilterStatus(e.target.value)} className="px-4 py-2 border rounded-xl w-full sm:w-auto">
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <select value={filterPriority} onChange={(e)=>setFilterPriority(e.target.value)} className="px-4 py-2 border rounded-xl w-full sm:w-auto">
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Date</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Work Title</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Assigned Staff</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Priority</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Photo</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Completion Time</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredTasks.map(task => (
                    <tr key={task.id} className="hover:bg-gray-50">
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900">{task.date}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <div className="text-sm font-medium text-gray-900">{task.workTitle}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{task.description}</div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900">{task.assignedStaff}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <select value={task.status} onChange={(e)=>handleStatusChange(task.id, e.target.value)} className={`px-3 py-1 rounded-full text-xs font-bold ${task.status==='completed' ? 'bg-green-100 text-green-800' : task.status==='in-progress' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${task.priority==='high' ? 'bg-red-100 text-red-800' : task.priority==='medium' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>{task.priority}</span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        {task.photoUpload ? <img src={task.photoUpload} alt="task" className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg" /> : <span className="text-gray-400 text-sm">No photo</span>}
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900">{task.completionTime || '-'}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm">
                        <button onClick={()=>handleDelete(task.id)} className="text-red-600 hover:text-red-800 font-semibold">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredTasks.length === 0 && (<div className="text-center py-12 text-gray-500">No tasks found</div>)}
          </div>
        </>
      )}

      {activeTab === 'reports' && (
        <div className="space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Reports</h3>
              <p className="text-sm text-slate-500">Download summary exports and review daily FM metrics.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={downloadCSV} className="px-6 py-3 bg-indigo-600 text-white rounded-xl">📊 Download CSV</button>
              <button onClick={downloadPDF} className="px-6 py-3 bg-red-600 text-white rounded-xl">📄 Download PDF</button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Daily FM Report</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-blue-600">{tasks.length}</div>
                <div className="text-sm text-gray-600">Total Tasks Today</div>
              </div>
              <div className="bg-green-50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-green-600">{tasks.filter(t=>t.status==='completed').length}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="bg-red-50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-red-600">{tasks.filter(t=>t.priority==='high' && t.status!=='completed').length}</div>
                <div className="text-sm text-gray-600">High Priority Pending</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200">
                <div className="text-xs uppercase text-slate-400 tracking-[0.18em] mb-2">Task Distribution</div>
                <div className="text-3xl font-bold text-slate-900">{tasks.length}</div>
                <div className="text-sm text-slate-500 mt-2">Total FM tasks tracked</div>
              </div>
              <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200">
                <div className="text-xs uppercase text-slate-400 tracking-[0.18em] mb-2">Pending Work</div>
                <div className="text-3xl font-bold text-amber-600">{tasks.filter(t=>t.status==='pending').length}</div>
                <div className="text-sm text-slate-500 mt-2">Tasks still pending</div>
              </div>
              <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200">
                <div className="text-xs uppercase text-slate-400 tracking-[0.18em] mb-2">Completed Ratio</div>
                <div className="text-3xl font-bold text-emerald-600">{tasks.length ? Math.round((tasks.filter(t=>t.status==='completed').length / tasks.length) * 100) : 0}%</div>
                <div className="text-sm text-slate-500 mt-2">Completion percentage</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
              <div className="text-sm text-slate-500 uppercase tracking-[0.24em] mb-3">Latest Tasks</div>
              <div className="space-y-3">
                {tasks.slice(0, 4).map((task) => (
                  <div key={task.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="font-semibold text-slate-900">{task.workTitle}</div>
                    <div className="text-xs text-slate-500">{task.assignedStaff} • {task.status}</div>
                  </div>
                ))}
                {tasks.length === 0 && <div className="text-sm text-slate-500">No tasks available yet.</div>}
              </div>
            </div>
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
              <div className="text-sm text-slate-500 uppercase tracking-[0.24em] mb-3">FM Hub Overview</div>
              <div className="space-y-2 text-sm text-slate-600">
                <div>Helpdesk Tickets: {helpdeskTickets.length}</div>
                <div>Staff Attendance: {staffLogs.length}</div>
                <div>Active Staff: {staffLogs.filter(log => !log.out_time).length}</div>
                <div>Move Logs: {moveLogs.length}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'fm' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dailyReadings.length > 0 ? dailyReadings.map(r => (
              <div key={r.asset} className="bg-slate-50 p-6 rounded-3xl shadow-sm border border-slate-200">
                <div className="text-sm uppercase text-slate-400 mb-3">Daily Readings</div>
                <div className="flex items-center justify-between"><div><div className="text-xl font-bold">{r.asset}</div><div className="text-sm text-slate-500">{r.note}</div></div><div className="text-3xl font-extrabold">{r.value}</div></div>
              </div>
            )) : (
              <div className="col-span-2 bg-slate-50 p-6 rounded-3xl shadow-sm border border-slate-200">
                <div className="text-sm uppercase text-slate-400 mb-3">Daily Readings</div>
                <div className="text-slate-500">No daily readings recorded yet</div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1.75fr_1fr] gap-4 sm:gap-6">
            <div className="bg-white rounded-3xl shadow-lg border p-6">
              <div className="flex items-start justify-between mb-6"><div><h3 className="text-2xl font-bold">Helpdesk Tickets</h3><p className="text-sm text-slate-500 mt-1">Latest FM support requests</p></div><div className="text-right"><div className="text-xs text-slate-400">Total</div><div className="text-3xl font-bold text-indigo-600">{helpdeskTickets.length}</div></div></div>
              <div className="space-y-4">
                {helpdeskTickets.length > 0 ? helpdeskTickets.slice(0, 5).map(ticket => (
                  <div key={ticket.id} className="rounded-3xl p-5 bg-slate-50 border">
                    <div className="flex items-center justify-between"><div><div className="font-semibold">{ticket.ticketId} - {ticket.title}</div><div className="text-xs text-slate-500">{ticket.raised_by} • {ticket.date}</div></div><span className={`px-3 py-1 rounded-full text-[11px] font-semibold ${
                      ticket.status === 'Open' ? 'bg-red-100 text-red-700' : 
                      ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                    }`}>{ticket.status}</span></div>
                    {ticket.remark && <p className="mt-3 text-sm text-slate-600">{ticket.remark}</p>}
                  </div>
                )) : (
                  <div className="text-center py-8 text-slate-500">No helpdesk tickets found. Add complaints from the Helpdesk module.</div>
                )}
              </div>
            </div>

            <div className="grid grid-rows-[1fr_1fr_1fr] gap-4 sm:gap-6">
              <div className="bg-white rounded-3xl shadow-lg border p-6">
                <div className="flex items-start justify-between mb-4"><div><h3 className="text-xl font-bold">Staff Attendance</h3><p className="text-sm text-slate-500 mt-1">Staff presence overview</p></div><div className="text-right"><div className="text-xs text-slate-400">Active</div><div className="text-2xl font-bold">{staffLogs.filter(log => !log.out_time).length}</div></div></div>
                <div className="space-y-4">
                  {staffLogs.length > 0 ? staffLogs.slice(0, 4).map(log => (
                    <div key={log.id} className="rounded-3xl p-4 bg-slate-50 border"><div className="font-semibold">{log.staff_name}</div><div className="text-xs text-slate-500 mt-1">{log.role} • {log.shift_type}</div><div className="mt-2 text-xs text-slate-500">In: {new Date(log.in_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} {log.out_time ? `• Out: ${new Date(log.out_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : '• Working'}</div></div>
                  )) : (
                    <div className="text-sm text-slate-500">No staff attendance records. Clock in staff from the Staff module.</div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-lg border p-6">
                <div className="flex items-start justify-between mb-4"><div><h3 className="text-xl font-bold">Staff In/Out</h3><p className="text-sm text-slate-500 mt-1">Live staff attendance from database</p></div><div className="text-right"><div className="text-xs text-slate-400">Total</div><div className="text-2xl font-bold">{staffLogs.length}</div></div></div>
                <div className="space-y-4">
                  {staffLogs.length > 0 ? staffLogs.slice(0, 4).map(log => (
                    <div key={log.id} className="rounded-3xl p-4 bg-slate-50 border"><div className="font-semibold">{log.staff_name}</div><div className="text-xs text-slate-500 mt-1">{log.role} • {log.shift_type}</div><div className="mt-2 text-xs text-slate-500">In: {new Date(log.in_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div></div>
                  )) : (
                    <div className="text-sm text-slate-500">No staff attendance records yet.</div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-lg border p-6">
                <div className="flex items-start justify-between mb-4"><div><h3 className="text-xl font-bold">Move In / Move Out</h3><p className="text-sm text-slate-500 mt-1">Latest residential movements</p></div><div className="text-right"><div className="text-xs text-slate-400">Records</div><div className="text-2xl font-bold">{moveLogs.length}</div></div></div>
                <div className="space-y-3">
                  {moveLogs.length > 0 ? moveLogs.slice(0, 4).map(log => (
                    <div key={log.id} className="rounded-3xl p-4 bg-slate-50 border flex items-center justify-between"><div><div className="font-semibold">{log.type}</div><div className="text-sm text-slate-500">{log.flat} • {log.date}</div></div><span className={`px-3 py-1 rounded-full text-xs font-semibold ${log.type === 'Move In' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>{log.type}</span></div>
                  )) : (
                    <div className="text-sm text-slate-500">No move logs found. Add from Relocation module.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6"><h2 className="text-xl sm:text-2xl font-bold">Add New Task</h2><button onClick={()=>setShowForm(false)} className="text-gray-500 text-2xl">✕</button></div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-bold mb-2">Date</label><input type="date" required value={formData.date} onChange={(e)=>setFormData({...formData, date: e.target.value})} className="w-full px-4 py-2 border rounded-xl"/></div>
                <div><label className="block text-sm font-bold mb-2">Priority</label><select value={formData.priority} onChange={(e)=>setFormData({...formData, priority: e.target.value})} className="w-full px-4 py-2 border rounded-xl"><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select></div>
              </div>
              <div><label className="block text-sm font-bold mb-2">Work Title</label><input type="text" required value={formData.workTitle} onChange={(e)=>setFormData({...formData, workTitle: e.target.value})} className="w-full px-4 py-2 border rounded-xl"/></div>
              <div><label className="block text-sm font-bold mb-2">Description</label><textarea rows="3" required value={formData.description} onChange={(e)=>setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border rounded-xl resize-none"/></div>
              <div><label className="block text-sm font-bold mb-2">Assigned Staff</label><input type="text" required value={formData.assignedStaff} onChange={(e)=>setFormData({...formData, assignedStaff: e.target.value})} className="w-full px-4 py-2 border rounded-xl"/></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label className="block text-sm font-bold mb-2">Status</label><select value={formData.status} onChange={(e)=>setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2 border rounded-xl"><option value="pending">Pending</option><option value="in-progress">In Progress</option><option value="completed">Completed</option></select></div><div><label className="block text-sm font-bold mb-2">Completion Time</label><input type="time" value={formData.completionTime} onChange={(e)=>setFormData({...formData, completionTime: e.target.value})} className="w-full px-4 py-2 border rounded-xl"/></div></div>
              <div><label className="block text-sm font-bold mb-2">Remarks</label><textarea rows="2" value={formData.remarks} onChange={(e)=>setFormData({...formData, remarks: e.target.value})} className="w-full px-4 py-2 border rounded-xl resize-none"/></div>
              <div><label className="block text-sm font-bold mb-2">Photo Upload</label><input type="file" accept="image/*" onChange={handleImageChange} className="w-full"/>{imagePreview && <div className="mt-3"><img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-xl"/></div>}</div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 pt-4"><button type="button" onClick={()=>setShowForm(false)} className="flex-1 px-6 py-3 bg-gray-100 rounded-xl">Cancel</button><button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl">Add Task</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
