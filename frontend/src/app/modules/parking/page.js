'use client';
import React, { useState, useEffect } from 'react';
import { Car, Plus, Edit, Trash2, Search, MapPin, User, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function ParkingManagement() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const [parkingSpots, setParkingSpots] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSpotForm, setShowSpotForm] = useState(false);
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [editingSpot, setEditingSpot] = useState(null);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [activeTab, setActiveTab] = useState('spots');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [spotFormData, setSpotFormData] = useState({
    spot_number: '',
    location: '',
    type: 'general',
    status: 'available',
    floor: '',
    notes: ''
  });

  const [vehicleFormData, setVehicleFormData] = useState({
    vehicle_number: '',
    owner_name: '',
    flat_number: '',
    contact_number: '',
    vehicle_type: 'car',
    spot_id: '',
    parking_type: 'reserved',
    start_date: '',
    end_date: '',
    status: 'active'
  });

  useEffect(() => {
    fetchParkingData();
  }, []);

  const fetchParkingData = async () => {
    try {
      const [spotsRes, vehiclesRes] = await Promise.all([
        fetch(`${API_BASE}/api/parking-spots`),
        fetch(`${API_BASE}/api/parking-vehicles`)
      ]);
      if (spotsRes.ok) setParkingSpots(await spotsRes.json());
      if (vehiclesRes.ok) setVehicles(await vehiclesRes.json());
    } catch (err) {
      console.error('Error fetching parking data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSpotSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingSpot ? `${API_BASE}/api/parking-spots/${editingSpot.id}` : `${API_BASE}/api/parking-spots`;
      const method = editingSpot ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spotFormData)
      });

      if (res.ok) {
        await fetchParkingData();
        setShowSpotForm(false);
        setEditingSpot(null);
        setSpotFormData({ spot_number: '', location: '', type: 'general', status: 'available', floor: '', notes: '' });
        alert(editingSpot ? 'Parking spot updated!' : 'Parking spot added!');
      }
    } catch (err) {
      console.error('Error saving spot:', err);
      alert('Error saving spot. Please try again.');
    }
  };

  const handleVehicleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingVehicle ? `${API_BASE}/api/parking-vehicles/${editingVehicle.id}` : `${API_BASE}/api/parking-vehicles`;
      const method = editingVehicle ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vehicleFormData)
      });

      if (res.ok) {
        await fetchParkingData();
        setShowVehicleForm(false);
        setEditingVehicle(null);
        setVehicleFormData({ vehicle_number: '', owner_name: '', flat_number: '', contact_number: '', vehicle_type: 'car', spot_id: '', parking_type: 'reserved', start_date: '', end_date: '', status: 'active' });
        alert(editingVehicle ? 'Vehicle updated!' : 'Vehicle registered!');
      }
    } catch (err) {
      console.error('Error saving vehicle:', err);
      alert('Error saving vehicle. Please try again.');
    }
  };

  const handleSpotEdit = (spot) => {
    setEditingSpot(spot);
    setSpotFormData({
      spot_number: spot.spot_number,
      location: spot.location,
      type: spot.type,
      status: spot.status,
      floor: spot.floor,
      notes: spot.notes
    });
    setShowSpotForm(true);
  };

  const handleVehicleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setVehicleFormData({
      vehicle_number: vehicle.vehicle_number,
      owner_name: vehicle.owner_name,
      flat_number: vehicle.flat_number,
      contact_number: vehicle.contact_number,
      vehicle_type: vehicle.vehicle_type,
      spot_id: vehicle.spot_id,
      parking_type: vehicle.parking_type,
      start_date: vehicle.start_date,
      end_date: vehicle.end_date,
      status: vehicle.status
    });
    setShowVehicleForm(true);
  };

  const handleSpotDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this parking spot?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/parking-spots/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setParkingSpots(parkingSpots.filter(s => s.id !== id));
        alert('Parking spot deleted!');
      }
    } catch (err) {
      console.error('Error deleting spot:', err);
      alert('Error deleting spot. Please try again.');
    }
  };

  const handleVehicleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this vehicle?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/parking-vehicles/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setVehicles(vehicles.filter(v => v.id !== id));
        alert('Vehicle deleted!');
      }
    } catch (err) {
      console.error('Error deleting vehicle:', err);
      alert('Error deleting vehicle. Please try again.');
    }
  };

  const filteredSpots = parkingSpots.filter(spot => 
    spot.spot_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    spot.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.vehicle_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.owner_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.flat_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSpotStatusColor = (status) => {
    switch(status) {
      case 'available': return 'bg-green-100 text-green-700';
      case 'occupied': return 'bg-red-100 text-red-700';
      case 'reserved': return 'bg-yellow-100 text-yellow-700';
      case 'maintenance': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getVehicleStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      case 'expired': return 'bg-red-100 text-red-700';
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
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Car size={24} className="text-white" />
              </div>
              Parking Management
            </h1>
            <p className="text-gray-500 mt-2 text-sm">Manage parking spots and vehicle registrations</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-4 sm:p-6 rounded-2xl border border-cyan-100">
            <div className="text-2xl sm:text-3xl font-bold text-cyan-600 mb-1">{parkingSpots.length}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Total Spots</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6 rounded-2xl border border-green-100">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">{parkingSpots.filter(s => s.status === 'available').length}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Available</div>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-rose-50 p-4 sm:p-6 rounded-2xl border border-red-100">
            <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-1">{parkingSpots.filter(s => s.status === 'occupied').length}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Occupied</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-2xl border border-blue-100">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">{vehicles.length}</div>
            <div className="text-gray-600 text-xs sm:text-sm">Registered Vehicles</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
          <div className="flex border-b border-gray-200">
            <button onClick={() => setActiveTab('spots')} className={`flex-1 px-6 py-4 font-bold ${activeTab === 'spots' ? 'text-cyan-600 border-b-2 border-cyan-600' : 'text-gray-500'}`}>
              Parking Spots
            </button>
            <button onClick={() => setActiveTab('vehicles')} className={`flex-1 px-6 py-4 font-bold ${activeTab === 'vehicles' ? 'text-cyan-600 border-b-2 border-cyan-600' : 'text-gray-500'}`}>
              Vehicles
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder={activeTab === 'spots' ? 'Search spots...' : 'Search vehicles...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none"
              />
            </div>
            <button 
              onClick={() => activeTab === 'spots' ? setShowSpotForm(true) : setShowVehicleForm(true)}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all flex items-center gap-2"
            >
              <Plus size={18} /> Add {activeTab === 'spots' ? 'Spot' : 'Vehicle'}
            </button>
          </div>
        </div>

        {/* Parking Spots Table */}
        {activeTab === 'spots' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Spot Number</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Location</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Type</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Floor</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loading ? (
                    <tr><td colSpan="6" className="p-8 text-center text-gray-500">Loading...</td></tr>
                  ) : filteredSpots.length === 0 ? (
                    <tr><td colSpan="6" className="p-8 text-center text-gray-500">No parking spots found</td></tr>
                  ) : (
                    filteredSpots.map(spot => (
                      <tr key={spot.id} className="hover:bg-gray-50">
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium text-gray-900">{spot.spot_number}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900 flex items-center gap-1"><MapPin size={12} /> {spot.location}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900 capitalize">{spot.type}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900">{spot.floor || '-'}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getSpotStatusColor(spot.status)}`}>{spot.status}</span>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4">
                          <div className="flex gap-2">
                            <button onClick={() => handleSpotEdit(spot)} className="p-2 text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors">
                              <Edit size={16} />
                            </button>
                            <button onClick={() => handleSpotDelete(spot.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
        )}

        {/* Vehicles Table */}
        {activeTab === 'vehicles' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1200px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Vehicle Number</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Owner</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Flat</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Type</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Parking Type</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Spot</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Valid Period</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-bold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loading ? (
                    <tr><td colSpan="9" className="p-8 text-center text-gray-500">Loading...</td></tr>
                  ) : filteredVehicles.length === 0 ? (
                    <tr><td colSpan="9" className="p-8 text-center text-gray-500">No vehicles found</td></tr>
                  ) : (
                    filteredVehicles.map(vehicle => (
                      <tr key={vehicle.id} className="hover:bg-gray-50">
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium text-gray-900">{vehicle.vehicle_number}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900 flex items-center gap-1"><User size={12} /> {vehicle.owner_name}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900">{vehicle.flat_number}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900 capitalize">{vehicle.vehicle_type}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900 capitalize">{vehicle.parking_type}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900">{vehicle.spot_id || '-'}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-900">
                          <div className="flex items-center gap-1"><Clock size={12} /> {vehicle.start_date}</div>
                          <div className="text-xs text-gray-500">to {vehicle.end_date || 'Permanent'}</div>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getVehicleStatusColor(vehicle.status)}`}>{vehicle.status}</span>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4">
                          <div className="flex gap-2">
                            <button onClick={() => handleVehicleEdit(vehicle)} className="p-2 text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors">
                              <Edit size={16} />
                            </button>
                            <button onClick={() => handleVehicleDelete(vehicle.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
        )}

        {/* Add/Edit Spot Form Modal */}
        {showSpotForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold">{editingSpot ? 'Edit Parking Spot' : 'Add Parking Spot'}</h2>
                <button onClick={() => setShowSpotForm(false)} className="text-gray-500 text-2xl">✕</button>
              </div>
              <form onSubmit={handleSpotSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">Spot Number *</label>
                    <input type="text" name="spot_number" required value={spotFormData.spot_number} onChange={(e) => setSpotFormData({...spotFormData, spot_number: e.target.value})} className="w-full px-4 py-2 border rounded-xl" placeholder="e.g., A-01" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Location *</label>
                    <input type="text" name="location" required value={spotFormData.location} onChange={(e) => setSpotFormData({...spotFormData, location: e.target.value})} className="w-full px-4 py-2 border rounded-xl" placeholder="e.g., Basement 1" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Type *</label>
                    <select name="type" required value={spotFormData.type} onChange={(e) => setSpotFormData({...spotFormData, type: e.target.value})} className="w-full px-4 py-2 border rounded-xl">
                      <option value="general">General</option>
                      <option value="reserved">Reserved</option>
                      <option value="visitor">Visitor</option>
                      <option value="disabled">Disabled</option>
                      <option value="ev">EV Charging</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Status *</label>
                    <select name="status" required value={spotFormData.status} onChange={(e) => setSpotFormData({...spotFormData, status: e.target.value})} className="w-full px-4 py-2 border rounded-xl">
                      <option value="available">Available</option>
                      <option value="occupied">Occupied</option>
                      <option value="reserved">Reserved</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Floor</label>
                    <input type="text" name="floor" value={spotFormData.floor} onChange={(e) => setSpotFormData({...spotFormData, floor: e.target.value})} className="w-full px-4 py-2 border rounded-xl" placeholder="e.g., Ground Floor" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold mb-2">Notes</label>
                    <textarea name="notes" rows="2" value={spotFormData.notes} onChange={(e) => setSpotFormData({...spotFormData, notes: e.target.value})} className="w-full px-4 py-2 border rounded-xl resize-none" placeholder="Additional notes..."></textarea>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 pt-4">
                  <button type="button" onClick={() => setShowSpotForm(false)} className="flex-1 px-6 py-3 bg-gray-100 rounded-xl">Cancel</button>
                  <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-bold">{editingSpot ? 'Update Spot' : 'Add Spot'}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add/Edit Vehicle Form Modal */}
        {showVehicleForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold">{editingVehicle ? 'Edit Vehicle' : 'Register Vehicle'}</h2>
                <button onClick={() => setShowVehicleForm(false)} className="text-gray-500 text-2xl">✕</button>
              </div>
              <form onSubmit={handleVehicleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">Vehicle Number *</label>
                    <input type="text" name="vehicle_number" required value={vehicleFormData.vehicle_number} onChange={(e) => setVehicleFormData({...vehicleFormData, vehicle_number: e.target.value})} className="w-full px-4 py-2 border rounded-xl" placeholder="e.g., MH-01-AB-1234" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Owner Name *</label>
                    <input type="text" name="owner_name" required value={vehicleFormData.owner_name} onChange={(e) => setVehicleFormData({...vehicleFormData, owner_name: e.target.value})} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Flat Number *</label>
                    <input type="text" name="flat_number" required value={vehicleFormData.flat_number} onChange={(e) => setVehicleFormData({...vehicleFormData, flat_number: e.target.value})} className="w-full px-4 py-2 border rounded-xl" placeholder="e.g., A-402" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Contact Number *</label>
                    <input type="tel" name="contact_number" required value={vehicleFormData.contact_number} onChange={(e) => setVehicleFormData({...vehicleFormData, contact_number: e.target.value})} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Vehicle Type *</label>
                    <select name="vehicle_type" required value={vehicleFormData.vehicle_type} onChange={(e) => setVehicleFormData({...vehicleFormData, vehicle_type: e.target.value})} className="w-full px-4 py-2 border rounded-xl">
                      <option value="car">Car</option>
                      <option value="bike">Bike</option>
                      <option value="scooter">Scooter</option>
                      <option value="cycle">Cycle</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Parking Type *</label>
                    <select name="parking_type" required value={vehicleFormData.parking_type} onChange={(e) => setVehicleFormData({...vehicleFormData, parking_type: e.target.value})} className="w-full px-4 py-2 border rounded-xl">
                      <option value="reserved">Reserved</option>
                      <option value="general">General</option>
                      <option value="visitor">Visitor</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Assigned Spot</label>
                    <select name="spot_id" value={vehicleFormData.spot_id} onChange={(e) => setVehicleFormData({...vehicleFormData, spot_id: e.target.value})} className="w-full px-4 py-2 border rounded-xl">
                      <option value="">Select Spot (Optional)</option>
                      {parkingSpots.filter(s => s.status === 'available').map(spot => <option key={spot.id} value={spot.spot_number}>{spot.spot_number} - {spot.location}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Status *</label>
                    <select name="status" required value={vehicleFormData.status} onChange={(e) => setVehicleFormData({...vehicleFormData, status: e.target.value})} className="w-full px-4 py-2 border rounded-xl">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="expired">Expired</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Start Date</label>
                    <input type="date" name="start_date" value={vehicleFormData.start_date} onChange={(e) => setVehicleFormData({...vehicleFormData, start_date: e.target.value})} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">End Date</label>
                    <input type="date" name="end_date" value={vehicleFormData.end_date} onChange={(e) => setVehicleFormData({...vehicleFormData, end_date: e.target.value})} className="w-full px-4 py-2 border rounded-xl" />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 pt-4">
                  <button type="button" onClick={() => setShowVehicleForm(false)} className="flex-1 px-6 py-3 bg-gray-100 rounded-xl">Cancel</button>
                  <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-bold">{editingVehicle ? 'Update Vehicle' : 'Register Vehicle'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
