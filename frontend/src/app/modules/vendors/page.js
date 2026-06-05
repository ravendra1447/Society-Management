'use client';
import React, { useState, useEffect } from 'react';
import { Building2, Plus, Edit, Trash2, Search, Phone, Mail, MapPin, Star, CheckCircle, Clock, DollarSign, FileText } from 'lucide-react';

export default function VendorManagement() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const [formData, setFormData] = useState({
    vendor_name: '',
    company_name: '',
    vendor_type: '',
    category: '',
    contact_person: '',
    phone_number: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    gst_number: '',
    pan_number: '',
    services_provided: '',
    payment_terms: '',
    credit_limit: '',
    bank_name: '',
    account_number: '',
    ifsc_code: '',
    contract_start_date: '',
    contract_end_date: '',
    rating: '',
    status: 'active',
    notes: ''
  });

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/vendors`);
      if (res.ok) {
        const data = await res.json();
        setVendors(data);
      }
    } catch (err) {
      console.error('Error fetching vendors:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingVendor ? `${API_BASE}/api/vendors/${editingVendor.id}` : `${API_BASE}/api/vendors`;
      const method = editingVendor ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        await fetchVendors();
        setShowForm(false);
        setEditingVendor(null);
        setFormData({
          vendor_name: '', company_name: '', vendor_type: '', category: '',
          contact_person: '', phone_number: '', email: '', address: '',
          city: '', state: '', pincode: '', gst_number: '', pan_number: '',
          services_provided: '', payment_terms: '', credit_limit: '',
          bank_name: '', account_number: '', ifsc_code: '',
          contract_start_date: '', contract_end_date: '', rating: '',
          status: 'active', notes: ''
        });
        alert(editingVendor ? 'Vendor updated successfully!' : 'Vendor added successfully!');
      }
    } catch (err) {
      console.error('Error saving vendor:', err);
      alert('Error saving vendor. Please try again.');
    }
  };

  const handleEdit = (vendor) => {
    setEditingVendor(vendor);
    setFormData({
      vendor_name: vendor.vendor_name,
      company_name: vendor.company_name,
      vendor_type: vendor.vendor_type,
      category: vendor.category,
      contact_person: vendor.contact_person,
      phone_number: vendor.phone_number,
      email: vendor.email,
      address: vendor.address,
      city: vendor.city,
      state: vendor.state,
      pincode: vendor.pincode,
      gst_number: vendor.gst_number,
      pan_number: vendor.pan_number,
      services_provided: vendor.services_provided,
      payment_terms: vendor.payment_terms,
      credit_limit: vendor.credit_limit,
      bank_name: vendor.bank_name,
      account_number: vendor.account_number,
      ifsc_code: vendor.ifsc_code,
      contract_start_date: vendor.contract_start_date,
      contract_end_date: vendor.contract_end_date,
      rating: vendor.rating,
      status: vendor.status,
      notes: vendor.notes
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this vendor?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/vendors/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setVendors(vendors.filter(v => v.id !== id));
        alert('Vendor deleted successfully!');
      }
    } catch (err) {
      console.error('Error deleting vendor:', err);
      alert('Error deleting vendor. Please try again.');
    }
  };

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.vendor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.contact_person.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || vendor.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || vendor.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = [...new Set(vendors.map(v => v.category))];

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      case 'suspended': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<Star key={i} size={14} className={i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />);
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                <Building2 size={24} className="text-white" />
              </div>
              Vendor Management
            </h1>
            <p className="text-gray-500 mt-2 text-sm">Manage vendor details and contracts</p>
          </div>
          <button 
            onClick={() => { setEditingVendor(null); setFormData({ vendor_name: '', company_name: '', vendor_type: '', category: '', contact_person: '', phone_number: '', email: '', address: '', city: '', state: '', pincode: '', gst_number: '', pan_number: '', services_provided: '', payment_terms: '', credit_limit: '', bank_name: '', account_number: '', ifsc_code: '', contract_start_date: '', contract_end_date: '', rating: '', status: 'active', notes: '' }); setShowForm(true); }}
            className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Plus size={18} /> Add Vendor
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 sm:p-6 rounded-2xl border border-orange-100">
            <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1">{vendors.length}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Total Vendors</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6 rounded-2xl border border-green-100">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">{vendors.filter(v => v.status === 'active').length}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Active</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-2xl border border-blue-100">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">{vendors.filter(v => v.rating >= 4).length}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Top Rated</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-lime-50 p-4 sm:p-6 rounded-2xl border border-yellow-100">
            <div className="text-2xl sm:text-3xl font-bold text-yellow-600 mb-1">{vendors.filter(v => v.status === 'pending').length}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Pending</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Vendor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full p-8 text-center text-gray-500">Loading...</div>
          ) : filteredVendors.length === 0 ? (
            <div className="col-span-full p-8 text-center text-gray-500">No vendors found</div>
          ) : (
            filteredVendors.map(vendor => (
              <div key={vendor.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl flex items-center justify-center">
                        <Building2 size={24} className="text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{vendor.vendor_name}</h3>
                        <p className="text-sm text-gray-500">{vendor.company_name}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getStatusColor(vendor.status)}`}>{vendor.status}</span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Phone size={14} />
                      {vendor.phone_number}
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={14} />
                      {vendor.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} />
                      {vendor.city}, {vendor.state}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">{getRatingStars(parseInt(vendor.rating) || 0)}</div>
                      <span className="text-xs">({vendor.rating || 0}/5)</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-3 mb-4">
                    <div className="text-xs text-gray-500 mb-1">Services</div>
                    <div className="text-sm text-gray-900 truncate">{vendor.services_provided}</div>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(vendor)} className="flex-1 px-4 py-2 bg-orange-50 text-orange-600 rounded-xl font-bold hover:bg-orange-100 transition-colors flex items-center justify-center gap-2">
                      <Edit size={14} /> Edit
                    </button>
                    <button onClick={() => handleDelete(vendor.id)} className="px-4 py-2 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold">{editingVendor ? 'Edit Vendor' : 'Add New Vendor'}</h2>
                <button onClick={() => setShowForm(false)} className="text-gray-500 text-2xl">✕</button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold mb-2">Vendor Name *</label>
                    <input type="text" name="vendor_name" required value={formData.vendor_name} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Company Name *</label>
                    <input type="text" name="company_name" required value={formData.company_name} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Vendor Type *</label>
                    <select name="vendor_type" required value={formData.vendor_type} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl">
                      <option value="">Select Type</option>
                      <option value="individual">Individual</option>
                      <option value="company">Company</option>
                      <option value="partnership">Partnership Firm</option>
                      <option value="llp">LLP</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Category *</label>
                    <input type="text" name="category" required value={formData.category} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" placeholder="e.g., Electrical, Plumbing, Security" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Contact Person *</label>
                    <input type="text" name="contact_person" required value={formData.contact_person} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Phone Number *</label>
                    <input type="tel" name="phone_number" required value={formData.phone_number} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Email *</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Status *</label>
                    <select name="status" required value={formData.status} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="suspended">Suspended</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold mb-2">Address *</label>
                    <textarea name="address" rows="2" required value={formData.address} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">City *</label>
                    <input type="text" name="city" required value={formData.city} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">State *</label>
                    <input type="text" name="state" required value={formData.state} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Pincode *</label>
                    <input type="text" name="pincode" required value={formData.pincode} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">GST Number</label>
                    <input type="text" name="gst_number" value={formData.gst_number} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" placeholder="22AAAAA0000A1Z5" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">PAN Number</label>
                    <input type="text" name="pan_number" value={formData.pan_number} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" placeholder="ABCDE1234F" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold mb-2">Services Provided *</label>
                    <textarea name="services_provided" rows="2" required value={formData.services_provided} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl resize-none" placeholder="List of services..." />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Payment Terms</label>
                    <input type="text" name="payment_terms" value={formData.payment_terms} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" placeholder="e.g., Net 30 days" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Credit Limit (₹)</label>
                    <input type="number" name="credit_limit" value={formData.credit_limit} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Rating (1-5)</label>
                    <select name="rating" value={formData.rating} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl">
                      <option value="">Select Rating</option>
                      <option value="5">5 - Excellent</option>
                      <option value="4">4 - Good</option>
                      <option value="3">3 - Average</option>
                      <option value="2">2 - Below Average</option>
                      <option value="1">1 - Poor</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Contract Start Date</label>
                    <input type="date" name="contract_start_date" value={formData.contract_start_date} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Contract End Date</label>
                    <input type="date" name="contract_end_date" value={formData.contract_end_date} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Bank Name</label>
                    <input type="text" name="bank_name" value={formData.bank_name} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Account Number</label>
                    <input type="text" name="account_number" value={formData.account_number} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">IFSC Code</label>
                    <input type="text" name="ifsc_code" value={formData.ifsc_code} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" placeholder="ABCD0123456" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold mb-2">Notes</label>
                    <textarea name="notes" rows="2" value={formData.notes} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl resize-none" placeholder="Additional notes..." />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 pt-4">
                  <button type="button" onClick={() => setShowForm(false)} className="flex-1 px-6 py-3 bg-gray-100 rounded-xl">Cancel</button>
                  <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl font-bold">{editingVendor ? 'Update Vendor' : 'Add Vendor'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
