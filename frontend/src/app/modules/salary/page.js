'use client';
import React, { useState, useEffect } from 'react';
import { DollarSign, Plus, Edit, Trash2, Search, Calendar, User, Wallet, TrendingUp, CheckCircle, Clock } from 'lucide-react';

export default function SalaryManagement() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const [salaryRecords, setSalaryRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMonth, setFilterMonth] = useState('all');
  const [filterYear, setFilterYear] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const [formData, setFormData] = useState({
    staff_id: '',
    staff_name: '',
    designation: '',
    department: '',
    basic_salary: '',
    hra: '',
    da: '',
    other_allowances: '',
    gross_salary: '',
    pf_deduction: '',
    esi_deduction: '',
    tds_deduction: '',
    other_deductions: '',
    total_deductions: '',
    net_salary: '',
    payment_date: '',
    month: '',
    year: '',
    payment_status: 'pending',
    payment_mode: '',
    bank_account: '',
    notes: ''
  });

  useEffect(() => {
    fetchSalaryRecords();
  }, []);

  const fetchSalaryRecords = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/salary-records`);
      if (res.ok) {
        const data = await res.json();
        setSalaryRecords(data);
      } else {
        // Fallback to localStorage if API fails
        const storedRecords = localStorage.getItem('society_salary_records');
        if (storedRecords) {
          setSalaryRecords(JSON.parse(storedRecords));
        }
      }
    } catch (err) {
      console.error('Error fetching salary records:', err);
      // Fallback to localStorage
      const storedRecords = localStorage.getItem('society_salary_records');
      if (storedRecords) {
        setSalaryRecords(JSON.parse(storedRecords));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData(prev => {
      const updated = { ...prev, [e.target.name]: e.target.value };
      
      // Calculate gross salary
      const basic = parseFloat(updated.basic_salary) || 0;
      const hra = parseFloat(updated.hra) || 0;
      const da = parseFloat(updated.da) || 0;
      const other = parseFloat(updated.other_allowances) || 0;
      updated.gross_salary = (basic + hra + da + other).toFixed(2);
      
      // Calculate total deductions
      const pf = parseFloat(updated.pf_deduction) || 0;
      const esi = parseFloat(updated.esi_deduction) || 0;
      const tds = parseFloat(updated.tds_deduction) || 0;
      const otherDed = parseFloat(updated.other_deductions) || 0;
      updated.total_deductions = (pf + esi + tds + otherDed).toFixed(2);
      
      // Calculate net salary
      updated.net_salary = (parseFloat(updated.gross_salary) - parseFloat(updated.total_deductions)).toFixed(2);
      
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingRecord ? `${API_BASE}/api/salary-records/${editingRecord.id}` : `${API_BASE}/api/salary-records`;
      const method = editingRecord ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        await fetchSalaryRecords();
        setShowForm(false);
        setEditingRecord(null);
        setFormData({
          staff_id: '', staff_name: '', designation: '', department: '',
          basic_salary: '', hra: '', da: '', other_allowances: '',
          gross_salary: '', pf_deduction: '', esi_deduction: '',
          tds_deduction: '', other_deductions: '', total_deductions: '',
          net_salary: '', payment_date: '', month: '', year: '',
          payment_status: 'pending', payment_mode: '', bank_account: '', notes: ''
        });
        alert(editingRecord ? 'Salary record updated successfully!' : 'Salary record added successfully!');
      } else {
        // Fallback to localStorage if backend fails
        const storedRecords = JSON.parse(localStorage.getItem('society_salary_records') || '[]');
        if (editingRecord) {
          const updatedRecords = storedRecords.map(r => r.id === editingRecord.id ? { ...formData, id: editingRecord.id } : r);
          localStorage.setItem('society_salary_records', JSON.stringify(updatedRecords));
        } else {
          const newRecord = { ...formData, id: storedRecords.length + 1, created_at: new Date().toISOString() };
          localStorage.setItem('society_salary_records', JSON.stringify([newRecord, ...storedRecords]));
        }
        await fetchSalaryRecords();
        setShowForm(false);
        setEditingRecord(null);
        setFormData({
          staff_id: '', staff_name: '', designation: '', department: '',
          basic_salary: '', hra: '', da: '', other_allowances: '',
          gross_salary: '', pf_deduction: '', esi_deduction: '',
          tds_deduction: '', other_deductions: '', total_deductions: '',
          net_salary: '', payment_date: '', month: '', year: '',
          payment_status: 'pending', payment_mode: '', bank_account: '', notes: ''
        });
        alert(editingRecord ? 'Salary record updated successfully (saved locally)!' : 'Salary record added successfully (saved locally)!');
      }
    } catch (err) {
      console.error('Error saving salary record:', err);
      // Fallback to localStorage
      const storedRecords = JSON.parse(localStorage.getItem('society_salary_records') || '[]');
      if (editingRecord) {
        const updatedRecords = storedRecords.map(r => r.id === editingRecord.id ? { ...formData, id: editingRecord.id } : r);
        localStorage.setItem('society_salary_records', JSON.stringify(updatedRecords));
      } else {
        const newRecord = { ...formData, id: storedRecords.length + 1, created_at: new Date().toISOString() };
        localStorage.setItem('society_salary_records', JSON.stringify([newRecord, ...storedRecords]));
      }
      await fetchSalaryRecords();
      setShowForm(false);
      setEditingRecord(null);
      setFormData({
        staff_id: '', staff_name: '', designation: '', department: '',
        basic_salary: '', hra: '', da: '', other_allowances: '',
        gross_salary: '', pf_deduction: '', esi_deduction: '',
        tds_deduction: '', other_deductions: '', total_deductions: '',
        net_salary: '', payment_date: '', month: '', year: '',
        payment_status: 'pending', payment_mode: '', bank_account: '', notes: ''
      });
      alert(editingRecord ? 'Salary record updated successfully (saved locally)!' : 'Salary record added successfully (saved locally)!');
    }
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setFormData({
      staff_id: record.staff_id,
      staff_name: record.staff_name,
      designation: record.designation,
      department: record.department,
      basic_salary: record.basic_salary,
      hra: record.hra,
      da: record.da,
      other_allowances: record.other_allowances,
      gross_salary: record.gross_salary,
      pf_deduction: record.pf_deduction,
      esi_deduction: record.esi_deduction,
      tds_deduction: record.tds_deduction,
      other_deductions: record.other_deductions,
      total_deductions: record.total_deductions,
      net_salary: record.net_salary,
      payment_date: record.payment_date,
      month: record.month,
      year: record.year,
      payment_status: record.payment_status,
      payment_mode: record.payment_mode,
      bank_account: record.bank_account,
      notes: record.notes
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this salary record?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/salary-records/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchSalaryRecords();
        alert('Salary record deleted successfully!');
      } else {
        // Fallback to localStorage if backend fails
        const storedRecords = JSON.parse(localStorage.getItem('society_salary_records') || '[]');
        const updatedRecords = storedRecords.filter(r => r.id !== id);
        localStorage.setItem('society_salary_records', JSON.stringify(updatedRecords));
        await fetchSalaryRecords();
        alert('Salary record deleted successfully (saved locally)!');
      }
    } catch (err) {
      console.error('Error deleting salary record:', err);
      // Fallback to localStorage
      const storedRecords = JSON.parse(localStorage.getItem('society_salary_records') || '[]');
      const updatedRecords = storedRecords.filter(r => r.id !== id);
      localStorage.setItem('society_salary_records', JSON.stringify(updatedRecords));
      await fetchSalaryRecords();
      alert('Salary record deleted successfully (saved locally)!');
    }
  };

  const handleMarkPaid = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/salary-records/${id}/mark-paid`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payment_status: 'paid' })
      });
      if (res.ok) {
        await fetchSalaryRecords();
        alert('Salary marked as paid!');
      } else {
        // Fallback to localStorage if backend fails
        const storedRecords = JSON.parse(localStorage.getItem('society_salary_records') || '[]');
        const updatedRecords = storedRecords.map(r => r.id === id ? { ...r, payment_status: 'paid' } : r);
        localStorage.setItem('society_salary_records', JSON.stringify(updatedRecords));
        await fetchSalaryRecords();
        alert('Salary marked as paid (saved locally)!');
      }
    } catch (err) {
      console.error('Error marking as paid:', err);
      // Fallback to localStorage
      const storedRecords = JSON.parse(localStorage.getItem('society_salary_records') || '[]');
      const updatedRecords = storedRecords.map(r => r.id === id ? { ...r, payment_status: 'paid' } : r);
      localStorage.setItem('society_salary_records', JSON.stringify(updatedRecords));
      await fetchSalaryRecords();
      alert('Salary marked as paid (saved locally)!');
    }
  };

  const filteredRecords = salaryRecords.filter(record => {
    const matchesSearch = record.staff_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.staff_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.designation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMonth = filterMonth === 'all' || record.month === filterMonth;
    const matchesYear = filterYear === 'all' || record.year === filterYear;
    const matchesStatus = filterStatus === 'all' || record.payment_status === filterStatus;
    return matchesSearch && matchesMonth && matchesYear && matchesStatus;
  });

  // Calculate monthly summary
  const monthlySummary = {};
  salaryRecords.forEach(record => {
    const key = `${record.month}-${record.year}`;
    if (!monthlySummary[key]) {
      monthlySummary[key] = {
        month: record.month,
        year: record.year,
        totalGross: 0,
        totalNet: 0,
        totalDeductions: 0,
        recordCount: 0,
        paidCount: 0
      };
    }
    monthlySummary[key].totalGross += parseFloat(record.gross_salary || 0);
    monthlySummary[key].totalNet += parseFloat(record.net_salary || 0);
    monthlySummary[key].totalDeductions += parseFloat(record.total_deductions || 0);
    monthlySummary[key].recordCount += 1;
    if (record.payment_status === 'paid') monthlySummary[key].paidCount += 1;
  });

  const months = [...new Set(salaryRecords.map(r => r.month))];
  const years = [...new Set(salaryRecords.map(r => r.year))];

  const totalGrossSalary = salaryRecords.reduce((sum, r) => sum + parseFloat(r.gross_salary || 0), 0);
  const totalNetSalary = salaryRecords.reduce((sum, r) => sum + parseFloat(r.net_salary || 0), 0);
  const totalDeductions = salaryRecords.reduce((sum, r) => sum + parseFloat(r.total_deductions || 0), 0);

  const getStatusColor = (status) => {
    switch(status) {
      case 'paid': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Wallet size={24} className="text-white" />
              </div>
              Salary Management
            </h1>
            <p className="text-gray-500 mt-2 text-sm">Monthly staff salary records and payments</p>
          </div>
          <button 
            onClick={() => { setEditingRecord(null); setFormData({ staff_id: '', staff_name: '', designation: '', department: '', basic_salary: '', hra: '', da: '', other_allowances: '', gross_salary: '', pf_deduction: '', esi_deduction: '', tds_deduction: '', other_deductions: '', total_deductions: '', net_salary: '', payment_date: '', month: '', year: '', payment_status: 'pending', payment_mode: '', bank_account: '', notes: '' }); setShowForm(true); }}
            className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Plus size={18} /> Add Salary Record
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 sm:p-6 rounded-2xl border border-emerald-100">
            <div className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-1">{salaryRecords.length}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Total Records</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-2xl border border-blue-100">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">₹{totalGrossSalary.toLocaleString()}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Total Gross Salary</div>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-rose-50 p-4 sm:p-6 rounded-2xl border border-red-100">
            <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-1">₹{totalDeductions.toLocaleString()}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Total Deductions</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-teal-50 p-4 sm:p-6 rounded-2xl border border-green-100">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">₹{totalNetSalary.toLocaleString()}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Total Net Salary</div>
          </div>
        </div>

        {/* Monthly Summary Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar size={20} className="text-emerald-600" />
            Monthly Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.values(monthlySummary).length === 0 ? (
              <div className="col-span-full p-8 text-center text-gray-500">No monthly data available</div>
            ) : (
              Object.values(monthlySummary).map((summary, idx) => (
                <div key={idx} className="bg-gradient-to-br from-gray-50 to-slate-50 p-4 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-900">{summary.month} {summary.year}</h3>
                    <span className="text-xs text-gray-500">{summary.paidCount}/{summary.recordCount} Paid</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Gross Salary:</span>
                      <span className="font-bold text-gray-900">₹{summary.totalGross.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Deductions:</span>
                      <span className="font-bold text-red-600">₹{summary.totalDeductions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Net Salary:</span>
                      <span className="font-bold text-green-600">₹{summary.totalNet.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by staff name, ID, or designation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="all">All Months</option>
              {months.map(month => <option key={month} value={month}>{month}</option>)}
            </select>
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="all">All Years</option>
              {years.map(year => <option key={year} value={year}>{year}</option>)}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1400px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Staff</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Designation</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Basic</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Allowances</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Gross</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Deductions</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Net Salary</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Month/Year</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr><td colSpan="10" className="p-8 text-center text-gray-500">Loading...</td></tr>
                ) : filteredRecords.length === 0 ? (
                  <tr><td colSpan="10" className="p-8 text-center text-gray-500">No salary records found</td></tr>
                ) : (
                  filteredRecords.map(record => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                          <User size={14} className="text-emerald-600" />
                          {record.staff_name}
                        </div>
                        <div className="text-xs text-gray-500">{record.staff_id}</div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900">{record.designation}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm font-bold text-gray-900">₹{parseFloat(record.basic_salary || 0).toLocaleString()}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900">
                        <div className="text-xs">HRA: ₹{parseFloat(record.hra || 0).toLocaleString()}</div>
                        <div className="text-xs">DA: ₹{parseFloat(record.da || 0).toLocaleString()}</div>
                        <div className="text-xs">Other: ₹{parseFloat(record.other_allowances || 0).toLocaleString()}</div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm font-bold text-blue-600">₹{parseFloat(record.gross_salary || 0).toLocaleString()}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900">
                        <div className="text-xs">PF: ₹{parseFloat(record.pf_deduction || 0).toLocaleString()}</div>
                        <div className="text-xs">ESI: ₹{parseFloat(record.esi_deduction || 0).toLocaleString()}</div>
                        <div className="text-xs">TDS: ₹{parseFloat(record.tds_deduction || 0).toLocaleString()}</div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm font-bold text-green-600">₹{parseFloat(record.net_salary || 0).toLocaleString()}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900">{record.month} {record.year}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getStatusColor(record.payment_status)}`}>{record.payment_status}</span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <div className="flex gap-2">
                          {record.payment_status === 'pending' && (
                            <button onClick={() => handleMarkPaid(record.id)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Mark as Paid">
                              <CheckCircle size={16} />
                            </button>
                          )}
                          <button onClick={() => handleEdit(record)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                            <Edit size={16} />
                          </button>
                          <button onClick={() => handleDelete(record.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold">{editingRecord ? 'Edit Salary Record' : 'Add Salary Record'}</h2>
                <button onClick={() => setShowForm(false)} className="text-gray-500 text-2xl">✕</button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">Staff ID *</label>
                    <input type="text" name="staff_id" required value={formData.staff_id} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Staff Name *</label>
                    <input type="text" name="staff_name" required value={formData.staff_name} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Designation *</label>
                    <input type="text" name="designation" required value={formData.designation} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Department *</label>
                    <input type="text" name="department" required value={formData.department} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Basic Salary (₹) *</label>
                    <input type="number" step="0.01" name="basic_salary" required value={formData.basic_salary} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">HRA (₹)</label>
                    <input type="number" step="0.01" name="hra" value={formData.hra} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">DA (₹)</label>
                    <input type="number" step="0.01" name="da" value={formData.da} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Other Allowances (₹)</label>
                    <input type="number" step="0.01" name="other_allowances" value={formData.other_allowances} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div className="sm:col-span-2 bg-gray-50 p-4 rounded-xl">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-bold mb-2">Gross Salary (₹)</label>
                        <input type="text" name="gross_salary" value={formData.gross_salary} readOnly className="w-full px-4 py-2 border rounded-xl bg-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2">Total Deductions (₹)</label>
                        <input type="text" name="total_deductions" value={formData.total_deductions} readOnly className="w-full px-4 py-2 border rounded-xl bg-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2">Net Salary (₹)</label>
                        <input type="text" name="net_salary" value={formData.net_salary} readOnly className="w-full px-4 py-2 border rounded-xl bg-white font-bold text-green-600" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">PF Deduction (₹)</label>
                    <input type="number" step="0.01" name="pf_deduction" value={formData.pf_deduction} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">ESI Deduction (₹)</label>
                    <input type="number" step="0.01" name="esi_deduction" value={formData.esi_deduction} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">TDS Deduction (₹)</label>
                    <input type="number" step="0.01" name="tds_deduction" value={formData.tds_deduction} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Other Deductions (₹)</label>
                    <input type="number" step="0.01" name="other_deductions" value={formData.other_deductions} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Month *</label>
                    <select name="month" required value={formData.month} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl">
                      <option value="">Select Month</option>
                      <option value="January">January</option>
                      <option value="February">February</option>
                      <option value="March">March</option>
                      <option value="April">April</option>
                      <option value="May">May</option>
                      <option value="June">June</option>
                      <option value="July">July</option>
                      <option value="August">August</option>
                      <option value="September">September</option>
                      <option value="October">October</option>
                      <option value="November">November</option>
                      <option value="December">December</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Year *</label>
                    <input type="number" name="year" required value={formData.year} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" placeholder="e.g., 2024" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Payment Date *</label>
                    <input type="date" name="payment_date" required value={formData.payment_date} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Payment Status *</label>
                    <select name="payment_status" required value={formData.payment_status} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl">
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Payment Mode</label>
                    <select name="payment_mode" value={formData.payment_mode} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl">
                      <option value="">Select Mode</option>
                      <option value="bank_transfer">Bank Transfer</option>
                      <option value="cash">Cash</option>
                      <option value="cheque">Cheque</option>
                      <option value="upi">UPI</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold mb-2">Bank Account</label>
                    <input type="text" name="bank_account" value={formData.bank_account} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" placeholder="Account Number" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold mb-2">Notes</label>
                    <textarea name="notes" rows="2" value={formData.notes} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl resize-none" placeholder="Additional notes..."></textarea>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 pt-4">
                  <button type="button" onClick={() => setShowForm(false)} className="flex-1 px-6 py-3 bg-gray-100 rounded-xl">Cancel</button>
                  <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl font-bold">{editingRecord ? 'Update Record' : 'Add Record'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
