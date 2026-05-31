'use client';
import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Download, MoreVertical,
  TrendingUp, FilePlus, Wallet, CheckCircle, Clock, AlertCircle
} from 'lucide-react';

export default function BillingLayout() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);
  const [formData, setFormData] = useState({
    resident_id: '',
    flat: '',
    amount: '',
    due_date: '',
    month: '',
    status: 'Unpaid'
  });

  useEffect(() => {
    // Load invoices from localStorage
    const storedInvoices = localStorage.getItem('society_invoices');
    if (storedInvoices) {
      setInvoices(JSON.parse(storedInvoices));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // Save invoices to localStorage whenever they change
    localStorage.setItem('society_invoices', JSON.stringify(invoices));
  }, [invoices]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateInvoice = async (e) => {
    e.preventDefault();
    try {
      // Save to backend API
      const res = await fetch('http://localhost:5000/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resident_id: formData.resident_id,
          month: formData.month,
          amount: parseFloat(formData.amount),
          due_date: formData.due_date,
          status: formData.status
        })
      });

      let backendData = null;
      if (res.ok) {
        backendData = await res.json();
      }

      // Save to localStorage (works even if backend fails)
      const newInvoice = {
        id: backendData?.id || invoices.length + 1,
        resident_id: formData.resident_id,
        flat: formData.flat,
        amount: parseFloat(formData.amount),
        due_date: formData.due_date,
        month: formData.month,
        status: formData.status,
        created_at: new Date().toISOString()
      };
      setInvoices([newInvoice, ...invoices]);
      setShowNewInvoiceModal(false);
      setFormData({ resident_id: '', flat: '', amount: '', due_date: '', month: '', status: 'Unpaid' });
      alert('Invoice created successfully!');
    } catch (err) {
      console.error(err);
      // Fallback to localStorage only if backend fails
      const newInvoice = {
        id: invoices.length + 1,
        resident_id: formData.resident_id,
        flat: formData.flat,
        amount: parseFloat(formData.amount),
        due_date: formData.due_date,
        month: formData.month,
        status: formData.status,
        created_at: new Date().toISOString()
      };
      setInvoices([newInvoice, ...invoices]);
      setShowNewInvoiceModal(false);
      setFormData({ resident_id: '', flat: '', amount: '', due_date: '', month: '', status: 'Unpaid' });
      alert('Invoice created successfully (saved locally)!');
    }
  };

  const handleExport = () => {
    if (invoices.length === 0) {
      alert('No invoices to export');
      return;
    }
    const csvContent = [
      ['Invoice ID', 'Resident', 'Flat', 'Due Date', 'Month', 'Status', 'Amount'],
      ...invoices.map(inv => [
        inv.id,
        inv.resident_id,
        inv.flat,
        inv.due_date,
        inv.month,
        inv.status,
        inv.amount
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'invoices.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const paidCount = invoices.filter(i => i.status === 'Paid').length;
  const pendingCount = invoices.filter(i => i.status === 'Unpaid').length;
  const failedCount = invoices.filter(i => i.status === 'Overdue').length;

  const getStatusColor = (status) => {
    switch(status) {
      case 'Paid': return 'bg-green-100 text-green-700';
      case 'Unpaid': return 'bg-orange-100 text-orange-700';
      case 'Overdue': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'Paid': return 'Paid';
      case 'Unpaid': return 'Pending';
      case 'Overdue': return 'Overdue';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Wallet size={24} className="text-white" />
              </div>
              Maintenance Bills
            </h1>
            <p className="text-gray-500 mt-2 text-sm">Track and manage society maintenance payments</p>
          </div>
          <button 
            onClick={() => setShowNewInvoiceModal(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all flex items-center gap-2"
          >
            <FilePlus size={18} /> New Invoice
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {/* Paid */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
                <CheckCircle size={24} className="text-white" />
              </div>
              <span className="text-green-600 text-sm font-bold bg-green-50 px-3 py-1 rounded-full">+4.9%</span>
            </div>
            <div className="text-4xl font-black text-gray-900 mb-2">{paidCount}</div>
            <div className="text-sm font-semibold text-gray-500">Paid Invoices</div>
          </div>

          {/* Pending */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                <Clock size={24} className="text-white" />
              </div>
              <span className="text-orange-600 text-sm font-bold bg-orange-50 px-3 py-1 rounded-full">+2.3%</span>
            </div>
            <div className="text-4xl font-black text-gray-900 mb-2">{pendingCount}</div>
            <div className="text-sm font-semibold text-gray-500">Pending Invoices</div>
          </div>

          {/* Overdue */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20">
                <AlertCircle size={24} className="text-white" />
              </div>
              <span className="text-red-600 text-sm font-bold bg-red-50 px-3 py-1 rounded-full">+1.2%</span>
            </div>
            <div className="text-4xl font-black text-gray-900 mb-2">{failedCount}</div>
            <div className="text-sm font-semibold text-gray-500">Overdue Invoices</div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Table Header */}
          <div className="p-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">All Invoices</h2>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search invoices..." 
                  className="w-full pl-10 pr-4 py-2.5 text-sm border-2 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-gray-700 border-2 border-gray-200 rounded-xl hover:bg-gray-50 whitespace-nowrap transition-colors">
                <Filter size={16} /> Filters
              </button>
              <button 
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-gray-700 border-2 border-gray-200 rounded-xl hover:bg-gray-50 whitespace-nowrap transition-colors"
              >
                <Download size={16} /> Export
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-xs font-bold uppercase tracking-wider">
                  <th className="p-4 rounded-tl-lg">Invoice ID</th>
                  <th className="p-4">Resident / Flat</th>
                  <th className="p-4">Due Date</th>
                  <th className="p-4">Month</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 rounded-tr-lg">Amount</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-500">Loading invoices...</td>
                  </tr>
                ) : invoices.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-500">No invoices found.</td>
                  </tr>
                ) : invoices.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="p-4">
                      <span className="font-bold text-gray-800">#{row.id.toString().padStart(4, '0')}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
                          {row.resident_id?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <span className="font-semibold text-gray-900">{row.resident_id || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">{row.due_date ? new Date(row.due_date).toLocaleDateString() : 'N/A'}</td>
                    <td className="p-4 text-gray-600">{row.month || 'N/A'}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1.5 text-xs font-bold rounded-lg ${getStatusColor(row.status)}`}>
                        {getStatusText(row.status)}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-gray-900">₹{Number(row.amount || 0).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
            <span className="font-medium">Page 1 of 10</span>
            <div className="flex gap-2">
              <button className="px-4 py-2 border-2 border-gray-200 rounded-lg hover:bg-gray-50 font-bold text-gray-700 transition-colors">Previous</button>
              <button className="px-4 py-2 border-2 border-gray-200 rounded-lg hover:bg-gray-50 font-bold text-gray-700 transition-colors">Next</button>
            </div>
          </div>
        </div>

        {/* New Invoice Modal */}
        {showNewInvoiceModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <FilePlus size={20} className="text-white" />
                  </div>
                  Create New Invoice
                </h2>
                <button 
                  onClick={() => setShowNewInvoiceModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold transition-colors"
                >
                  &times;
                </button>
              </div>
              <form onSubmit={handleCreateInvoice} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Resident Name
                    </label>
                    <input 
                      type="text"
                      name="resident_id"
                      value={formData.resident_id}
                      onChange={handleInputChange}
                      placeholder="Enter resident name"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-800 font-medium"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Flat Number
                    </label>
                    <input 
                      type="text"
                      name="flat"
                      value={formData.flat}
                      onChange={handleInputChange}
                      placeholder="e.g. A-402"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-800 font-medium"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Amount (₹)
                    </label>
                    <input 
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      placeholder="Enter amount"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-800 font-medium"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Due Date
                    </label>
                    <input 
                      type="date"
                      name="due_date"
                      value={formData.due_date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-800 font-medium"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Month
                    </label>
                    <select
                      name="month"
                      value={formData.month}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-800 font-medium"
                      required
                    >
                      <option value="">Select month</option>
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
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-800 font-medium"
                      required
                    >
                      <option value="Unpaid">Unpaid</option>
                      <option value="Paid">Paid</option>
                      <option value="Overdue">Overdue</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setShowNewInvoiceModal(false)}
                    className="px-6 py-3 text-gray-600 hover:text-gray-800 font-bold rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
                  >
                    Create Invoice
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
