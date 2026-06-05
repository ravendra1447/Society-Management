'use client';
import React, { useState, useEffect } from 'react';
import { Package, Plus, Edit, Trash2, Search, Filter, ArrowUpDown } from 'lucide-react';

export default function InventoryManagement() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const [formData, setFormData] = useState({
    item_name: '',
    category: '',
    quantity: '',
    unit: '',
    min_stock: '',
    location: '',
    supplier: '',
    purchase_date: '',
    expiry_date: '',
    unit_price: '',
    total_value: '',
    status: 'in-stock'
  });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/inventory`);
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (err) {
      console.error('Error fetching inventory:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Calculate total value when unit price or quantity changes
    if (name === 'unit_price' || name === 'quantity') {
      const unitPrice = name === 'unit_price' ? value : formData.unit_price;
      const quantity = name === 'quantity' ? value : formData.quantity;
      if (unitPrice && quantity) {
        setFormData(prev => ({ ...prev, total_value: (parseFloat(unitPrice) * parseFloat(quantity)).toFixed(2) }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingItem ? `${API_BASE}/api/inventory/${editingItem.id}` : `${API_BASE}/api/inventory`;
      const method = editingItem ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        await fetchInventory();
        setShowForm(false);
        setEditingItem(null);
        setFormData({
          item_name: '', category: '', quantity: '', unit: '', min_stock: '',
          location: '', supplier: '', purchase_date: '', expiry_date: '',
          unit_price: '', total_value: '', status: 'in-stock'
        });
        alert(editingItem ? 'Item updated successfully!' : 'Item added successfully!');
      }
    } catch (err) {
      console.error('Error saving item:', err);
      alert('Error saving item. Please try again.');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      item_name: item.item_name,
      category: item.category,
      quantity: item.quantity,
      unit: item.unit,
      min_stock: item.min_stock,
      location: item.location,
      supplier: item.supplier,
      purchase_date: item.purchase_date,
      expiry_date: item.expiry_date,
      unit_price: item.unit_price,
      total_value: item.total_value,
      status: item.status
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/inventory/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setItems(items.filter(item => item.id !== id));
        alert('Item deleted successfully!');
      }
    } catch (err) {
      console.error('Error deleting item:', err);
      alert('Error deleting item. Please try again.');
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = [...new Set(items.map(item => item.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Package size={24} className="text-white" />
              </div>
              Inventory Management
            </h1>
            <p className="text-gray-500 mt-2 text-sm">Track and manage society inventory items</p>
          </div>
          <button 
            onClick={() => { setEditingItem(null); setFormData({ item_name: '', category: '', quantity: '', unit: '', min_stock: '', location: '', supplier: '', purchase_date: '', expiry_date: '', unit_price: '', total_value: '', status: 'in-stock' }); setShowForm(true); }}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Plus size={18} /> Add New Item
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 sm:p-6 rounded-2xl border border-emerald-100">
            <div className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-1">{items.length}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Total Items</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-2xl border border-blue-100">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">{items.filter(i => i.status === 'in-stock').length}</div>
            <div className="text-gray-600 text-xs sm:text-sm">In Stock</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 sm:p-6 rounded-2xl border border-yellow-100">
            <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1">{items.filter(i => i.status === 'low-stock').length}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Low Stock</div>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-rose-50 p-4 sm:p-6 rounded-2xl border border-red-100">
            <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-1">{items.filter(i => i.status === 'out-of-stock').length}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Out of Stock</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="all">All Status</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Item Name</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Category</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Quantity</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Unit</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Location</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Supplier</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr><td colSpan="8" className="p-8 text-center text-gray-500">Loading...</td></tr>
                ) : filteredItems.length === 0 ? (
                  <tr><td colSpan="8" className="p-8 text-center text-gray-500">No items found</td></tr>
                ) : (
                  filteredItems.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <div className="text-sm font-medium text-gray-900">{item.item_name}</div>
                        <div className="text-xs text-gray-500">Min: {item.min_stock} {item.unit}</div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900">{item.category}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900">{item.quantity}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900">{item.unit}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900">{item.location}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900">{item.supplier}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.status === 'in-stock' ? 'bg-green-100 text-green-700' :
                          item.status === 'low-stock' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(item)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                            <Edit size={16} />
                          </button>
                          <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
                <h2 className="text-xl sm:text-2xl font-bold">{editingItem ? 'Edit Item' : 'Add New Item'}</h2>
                <button onClick={() => setShowForm(false)} className="text-gray-500 text-2xl">✕</button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">Item Name *</label>
                    <input type="text" name="item_name" required value={formData.item_name} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Category *</label>
                    <input type="text" name="category" required value={formData.category} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" placeholder="e.g., Cleaning, Electrical" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Quantity *</label>
                    <input type="number" name="quantity" required value={formData.quantity} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Unit *</label>
                    <select name="unit" required value={formData.unit} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl">
                      <option value="">Select Unit</option>
                      <option value="pcs">Pieces</option>
                      <option value="kg">Kilograms</option>
                      <option value="liters">Liters</option>
                      <option value="boxes">Boxes</option>
                      <option value="packs">Packs</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Min Stock Level</label>
                    <input type="number" name="min_stock" value={formData.min_stock} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Location</label>
                    <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" placeholder="e.g., Store Room A" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Supplier</label>
                    <input type="text" name="supplier" value={formData.supplier} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Purchase Date</label>
                    <input type="date" name="purchase_date" value={formData.purchase_date} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Expiry Date</label>
                    <input type="date" name="expiry_date" value={formData.expiry_date} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Unit Price</label>
                    <input type="number" step="0.01" name="unit_price" value={formData.unit_price} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Total Value</label>
                    <input type="text" name="total_value" value={formData.total_value} readOnly className="w-full px-4 py-2 border rounded-xl bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Status</label>
                    <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-xl">
                      <option value="in-stock">In Stock</option>
                      <option value="low-stock">Low Stock</option>
                      <option value="out-of-stock">Out of Stock</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 pt-4">
                  <button type="button" onClick={() => setShowForm(false)} className="flex-1 px-6 py-3 bg-gray-100 rounded-xl">Cancel</button>
                  <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold">{editingItem ? 'Update Item' : 'Add Item'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
