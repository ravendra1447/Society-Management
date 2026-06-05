'use client';
import React, { useState, useEffect } from 'react';
import { Receipt, Plus, Edit, Trash2, Search, Calendar, TrendingUp, DollarSign, Percent, Building2 } from 'lucide-react';

export default function TDSSummary() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const [tdsRecords, setTdsRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMonth, setFilterMonth] = useState('all');
  const [filterYear, setFilterYear] = useState('all');
  
  const [formData, setFormData] = useState({
    party_name: '',
    party_type: '',
    principal_amount: '',
    tds_amount: '',
    tds_percentage: '',
    payment_date: '',
    month: '',
    year: '',
    category: '',
    pan_number: '',
    notes: ''
  });

  useEffect(() => {
    fetchTDSRecords();
  }, []);

  const fetchTDSRecords = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/tds-records`);
      if (res.ok) {
        const data = await res.json();
        setTdsRecords(data);
      } else {
        // Fallback to localStorage if API fails
        const storedRecords = localStorage.getItem('society_tds_records');
        if (storedRecords) {
          setTdsRecords(JSON.parse(storedRecords));
        }
      }
    } catch (err) {
      console.error('Error fetching TDS records:', err);
      // Fallback to localStorage
      const storedRecords = localStorage.getItem('society_tds_records');
      if (storedRecords) {
        setTdsRecords(JSON.parse(storedRecords));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    
    // Calculate TDS amount when principal or percentage changes
    if (e.target.name === 'principal_amount' || e.target.name === 'tds_percentage') {
      const principal = e.target.name === 'principal_amount' ? e.target.value : formData.principal_amount;
      const percentage = e.target.name === 'tds_percentage' ? e.target.value : formData.tds_percentage;
      if (principal && percentage) {
        const tdsAmount = (parseFloat(principal) * parseFloat(percentage)) / 100;
        setFormData(prev => ({ ...prev, tds_amount: tdsAmount.toFixed(2) }));
      }
    }
    
    // Calculate percentage when principal or TDS amount changes
    if (e.target.name === 'tds_amount' && formData.principal_amount) {
      const percentage = (parseFloat(e.target.value) / parseFloat(formData.principal_amount)) * 100;
      setFormData(prev => ({ ...prev, tds_percentage: percentage.toFixed(2) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingRecord ? `${API_BASE}/api/tds-records/${editingRecord.id}` : `${API_BASE}/api/tds-records`;
      const method = editingRecord ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        await fetchTDSRecords();
        setShowForm(false);
        setEditingRecord(null);
        setFormData({
          party_name: '', party_type: '', principal_amount: '', tds_amount: '',
          tds_percentage: '', payment_date: '', month: '', year: '',
          category: '', pan_number: '', notes: ''
        });
        alert(editingRecord ? 'TDS record updated successfully!' : 'TDS record added successfully!');
      } else {
        // Fallback to localStorage if backend fails
        const storedRecords = JSON.parse(localStorage.getItem('society_tds_records') || '[]');
        if (editingRecord) {
          const updatedRecords = storedRecords.map(r => r.id === editingRecord.id ? { ...formData, id: editingRecord.id } : r);
          localStorage.setItem('society_tds_records', JSON.stringify(updatedRecords));
        } else {
          const newRecord = { ...formData, id: storedRecords.length + 1, created_at: new Date().toISOString() };
          localStorage.setItem('society_tds_records', JSON.stringify([newRecord, ...storedRecords]));
        }
        await fetchTDSRecords();
        setShowForm(false);
        setEditingRecord(null);
        setFormData({
          party_name: '', party_type: '', principal_amount: '', tds_amount: '',
          tds_percentage: '', payment_date: '', month: '', year: '',
          category: '', pan_number: '', notes: ''
        });
        alert(editingRecord ? 'TDS record updated successfully (saved locally)!' : 'TDS record added successfully (saved locally)!');
      }
    } catch (err) {
      console.error('Error saving TDS record:', err);
      // Fallback to localStorage
      const storedRecords = JSON.parse(localStorage.getItem('society_tds_records') || '[]');
      if (editingRecord) {
        const updatedRecords = storedRecords.map(r => r.id === editingRecord.id ? { ...formData, id: editingRecord.id } : r);
        localStorage.setItem('society_tds_records', JSON.stringify(updatedRecords));
      } else {
        const newRecord = { ...formData, id: storedRecords.length + 1, created_at: new Date().toISOString() };
        localStorage.setItem('society_tds_records', JSON.stringify([newRecord, ...storedRecords]));
      }
      await fetchTDSRecords();
      setShowForm(false);
      setEditingRecord(null);
      setFormData({
        party_name: '', party_type: '', principal_amount: '', tds_amount: '',
        tds_percentage: '', payment_date: '', month: '', year: '',
        category: '', pan_number: '', notes: ''
      });
      alert(editingRecord ? 'TDS record updated successfully (saved locally)!' : 'TDS record added successfully (saved locally)!');
    }
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setFormData({
      party_name: record.party_name,
      party_type: record.party_type,
      principal_amount: record.principal_amount,
      tds_amount: record.tds_amount,
      tds_percentage: record.tds_percentage,
      payment_date: record.payment_date,
      month: record.month,
      year: record.year,
      category: record.category,
      pan_number: record.pan_number,
      notes: record.notes
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this TDS record?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/tds-records/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchTDSRecords();
        alert('TDS record deleted successfully!');
      } else {
        // Fallback to localStorage if backend fails
        const storedRecords = JSON.parse(localStorage.getItem('society_tds_records') || '[]');
        const updatedRecords = storedRecords.filter(r => r.id !== id);
        localStorage.setItem('society_tds_records', JSON.stringify(updatedRecords));
        await fetchTDSRecords();
        alert('TDS record deleted successfully (saved locally)!');
      }
    } catch (err) {
      console.error('Error deleting TDS record:', err);
      // Fallback to localStorage
      const storedRecords = JSON.parse(localStorage.getItem('society_tds_records') || '[]');
      const updatedRecords = storedRecords.filter(r => r.id !== id);
      localStorage.setItem('society_tds_records', JSON.stringify(updatedRecords));
      await fetchTDSRecords();
      alert('TDS record deleted successfully (saved locally)!');
    }
  };

  const filteredRecords = tdsRecords.filter(record => {
    const matchesSearch = record.party_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.pan_number?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMonth = filterMonth === 'all' || record.month === filterMonth;
    const matchesYear = filterYear === 'all' || record.year === filterYear;
    return matchesSearch && matchesMonth && matchesYear;
  });

  // Calculate monthly summary
  const monthlySummary = {};
  tdsRecords.forEach(record => {
    const key = `${record.month}-${record.year}`;
    if (!monthlySummary[key]) {
      monthlySummary[key] = {
        month: record.month,
        year: record.year,
        totalPrincipal: 0,
        totalTDS: 0,
        recordCount: 0
      };
    }
    monthlySummary[key].totalPrincipal += parseFloat(record.principal_amount || 0);
    monthlySummary[key].totalTDS += parseFloat(record.tds_amount || 0);
    monthlySummary[key].recordCount += 1;
  });

  const months = [...new Set(tdsRecords.map(r => r.month))];
  const years = [...new Set(tdsRecords.map(r => r.year))];

  const totalPrincipal = tdsRecords.reduce((sum, r) => sum + parseFloat(r.principal_amount || 0), 0);
  const totalTDS = tdsRecords.reduce((sum, r) => sum + parseFloat(r.tds_amount || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
                <Receipt size={24} className="text-white" />
              </div>
              TDS Summary
            </h1>
            <p className="text-gray-500 mt-2 text-sm">Monthly TDS deduction summary by party</p>
          </div>
          <button 
            onClick={() => { setEditingRecord(null); setFormData({ party_name: '', party_type: '', principal_amount: '', tds_amount: '', tds_percentage: '', payment_date: '', month: '', year: '', category: '', pan_number: '', notes: '' }); setShowForm(true); }}
            className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Plus size={18} /> Add TDS Record
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-4 sm:p-6 rounded-2xl border border-teal-100">
            <div className="text-2xl sm:text-3xl font-bold text-teal-600 mb-1">{tdsRecords.length}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Total Records</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-2xl border border-blue-100">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">₹{totalPrincipal.toLocaleString()}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Total Principal</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6 rounded-2xl border border-green-100">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">₹{totalTDS.toLocaleString()}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Total TDS Deducted</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 sm:p-6 rounded-2xl border border-purple-100">
            <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">{totalPrincipal > 0 ? ((totalTDS / totalPrincipal) * 100).toFixed(2) : 0}%</div>
            <div className="text-gray-600 text-xs sm:text-sm">Avg TDS Rate</div>
          </div>
        </div>

        {/* Monthly Summary Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar size={20} className="text-teal-600" />
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
                    <span className="text-xs text-gray-500">{summary.recordCount} records</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Principal:</span>
                      <span className="font-bold text-gray-900">₹{summary.totalPrincipal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">TDS Deducted:</span>
                      <span className="font-bold text-green-600">₹{summary.totalTDS.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">TDS Rate:</span>
                      <span className="font-bold text-teal-600">{summary.totalPrincipal > 0 ? ((summary.totalTDS / summary.totalPrincipal) * 100).toFixed(2) : 0}%</span>
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
                placeholder="Search by party name or PAN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
            <select
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
            >
              <option value="all">All Months</option>
              {months.map(month => <option key={month} value={month}>{month}</option>)}
            </select>
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
            >
              <option value="all">All Years</option>
              {years.map(year => <option key={year} value={year}>{year}</option>)}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Party Name</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Party Type</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">PAN Number</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Principal Amount</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">TDS Amount</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">TDS %</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Month/Year</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Payment Date</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr><td colSpan="9" className="p-8 text-center text-gray-500">Loading...</td></tr>
                ) : filteredRecords.length === 0 ? (
                  <tr><td colSpan="9" className="p-8 text-center text-gray-500">No TDS records found</td></tr>
                ) : (
                  filteredRecords.map(record => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                          <Building2 size={14} className="text-teal-600" />
                          {record.party_name}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900 capitalize">{record.party_type}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900 font-mono">{record.pan_number || '-'}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm font-bold text-gray-900">₹{parseFloat(record.principal_amount || 0).toLocaleString()}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm font-bold text-green-600">₹{parseFloat(record.tds_amount || 0).toLocaleString()}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-700">{record.tds_percentage}%</span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900">{record.month} {record.year}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900">{record.payment_date}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(record)} className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
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
            <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold">{editingRecord ? 'Edit TDS Record' : 'Add TDS Record'}</h2>
                <button onClick={() => setShowForm(false)} className="text-gray-500 text-2xl">✕</button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold mb-2">Party Name *</label>
                    <input type="text" name="party_name" required value={formData.party_name} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" placeholder="Name of the party" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Party Type *</label>
                    <select name="party_type" required value={formData.party_type} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl">
                      <option value="">Select Type</option>
                      <option value="individual">Individual</option>
                      <option value="company">Company</option>
                      <option value="partnership">Partnership Firm</option>
                      <option value="llp">LLP</option>
                      <option value="trust">Trust</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">PAN Number</label>
                    <input type="text" name="pan_number" value={formData.pan_number} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" placeholder="ABCDE1234F" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Principal Amount (₹) *</label>
                    <input type="number" step="0.01" name="principal_amount" required value={formData.principal_amount} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" placeholder="0.00" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">TDS Percentage (%) *</label>
                    <input type="number" step="0.01" name="tds_percentage" required value={formData.tds_percentage} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" placeholder="e.g., 10" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">TDS Amount (₹)</label>
                    <input type="number" step="0.01" name="tds_amount" value={formData.tds_amount} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl bg-gray-50" placeholder="Auto-calculated" readOnly />
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
                    <label className="block text-sm font-bold mb-2">Category</label>
                    <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl">
                      <option value="">Select Category</option>
                      <option value="contractor">Contractor</option>
                      <option value="professional">Professional Fees</option>
                      <option value="rent">Rent</option>
                      <option value="salary">Salary</option>
                      <option value="interest">Interest</option>
                      <option value="dividend">Dividend</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold mb-2">Notes</label>
                    <textarea name="notes" rows="2" value={formData.notes} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl resize-none" placeholder="Additional notes..."></textarea>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 pt-4">
                  <button type="button" onClick={() => setShowForm(false)} className="flex-1 px-6 py-3 bg-gray-100 rounded-xl">Cancel</button>
                  <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-bold">{editingRecord ? 'Update Record' : 'Add Record'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
