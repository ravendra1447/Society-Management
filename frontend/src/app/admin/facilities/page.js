'use client';
import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, FileText, Clock, Menu, 
  Settings, Search, Filter, Download, Plus, CalendarDays, MapPin, CheckCircle2, XCircle, ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

export default function FacilitiesModule() {
  const [bookings] = useState([
    { id: 'FB-001', resident: 'Aarav Sharma', flat: 'A-402', facility: 'Clubhouse', date: 'Oct 24, 2024', time: '18:00 - 22:00', status: 'Approved' },
    { id: 'FB-002', resident: 'Neha Gupta', flat: 'B-105', facility: 'Swimming Pool', date: 'Oct 25, 2024', time: '07:00 - 08:00', status: 'Pending' },
    { id: 'FB-003', resident: 'Vikram Singh', flat: 'C-301', facility: 'Tennis Court', date: 'Oct 25, 2024', time: '17:00 - 19:00', status: 'Approved' },
    { id: 'FB-004', resident: 'Priya Desai', flat: 'A-102', facility: 'Party Hall', date: 'Oct 26, 2024', time: '19:00 - 23:00', status: 'Rejected' },
    { id: 'FB-005', resident: 'Rahul Verma', flat: 'D-504', facility: 'Badminton Court', date: 'Oct 27, 2024', time: '08:00 - 09:00', status: 'Pending' }
  ]);

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Approved': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Rejected': return 'bg-rose-50 text-rose-700 border-rose-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Approved': return <CheckCircle2 size={14} className="mr-1.5" />;
      case 'Pending': return <Clock size={14} className="mr-1.5" />;
      case 'Rejected': return <XCircle size={14} className="mr-1.5" />;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-[#f8f9fa] font-sans overflow-hidden">
      {/* Sidebar - Hidden on mobile */}
      <aside className="hidden md:flex w-20 bg-[#0a0a0a] flex-col items-center py-6 justify-between flex-shrink-0 z-10">
        <div className="flex flex-col items-center gap-8 w-full">
          <div className="w-10 h-10 bg-[#ff3b30] flex items-center justify-center text-white font-bold rotate-45 mb-4 rounded">
            <div className="flex gap-1 -rotate-45">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          
          <div className="flex flex-col gap-6 w-full items-center">
            <Link href="/dashboard" className="text-gray-400 hover:text-white p-2 rounded-lg transition-colors"><LayoutDashboard size={20} /></Link>
            <Link href="/admin" className="bg-gray-800 text-white p-2 rounded-lg w-10 flex justify-center transition-colors"><ShieldCheck size={20} /></Link>
            <Link href="/modules/billing" className="text-gray-400 hover:text-white p-2 rounded-lg transition-colors"><FileText size={20} /></Link>
            <button className="text-gray-400 hover:text-white p-2 rounded-lg transition-colors"><Clock size={20} /></button>
            <button className="text-gray-400 hover:text-white p-2 rounded-lg transition-colors"><Menu size={20} /></button>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-6">
          <button className="text-gray-400 hover:text-white p-2 rounded-lg transition-colors"><Settings size={20} /></button>
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">A</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto pb-20 md:pb-0">
        <div className="h-14 flex items-center justify-between bg-white border-b border-gray-100 px-4 md:px-6 shrink-0 text-sm text-gray-500 font-medium">
          <span className="flex items-center gap-2">
            <div className="w-3 h-3 border-2 border-gray-400 rounded-sm"></div>
            <span className="hidden sm:inline">spacebook.com / admin / facilities</span>
            <span className="sm:hidden">Facilities</span>
          </span>
        </div>

        <div className="p-4 md:p-8 max-w-[1200px] w-full mx-auto flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-3 tracking-tight">
                <CalendarDays className="text-pink-600 shrink-0" size={28} />
                Facility & Amenity Booking
              </h1>
              <p className="text-gray-500 mt-2 text-sm font-medium">Manage and approve resident bookings for society amenities.</p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <Link href="/admin" className="flex-1 sm:flex-initial px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-sm text-center">
                Back to Admin
              </Link>
              <button className="flex-1 sm:flex-initial px-5 py-2.5 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition-colors shadow-sm text-sm flex items-center justify-center gap-2">
                <Plus size={16} /> Add Facility
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-pink-50 to-transparent rounded-bl-full -z-0"></div>
              <p className="text-xs md:text-sm font-medium text-gray-500 relative z-10">Total Facilities</p>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 relative z-10">8</div>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-50 to-transparent rounded-bl-full -z-0"></div>
              <p className="text-xs md:text-sm font-medium text-gray-500 relative z-10">Active Bookings</p>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 relative z-10">14</div>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-50 to-transparent rounded-bl-full -z-0"></div>
              <p className="text-xs md:text-sm font-medium text-gray-500 relative z-10">Pending Approvals</p>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 relative z-10">5</div>
            </div>
            <div className="col-span-2 md:col-span-1 bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6 rounded-2xl shadow-sm text-white flex flex-col justify-center">
              <p className="text-xs md:text-sm font-medium text-gray-400">Next Event</p>
              <p className="text-base md:text-lg font-bold mt-1">Yoga Class (Clubhouse)</p>
              <p className="text-xs text-gray-400 mt-1">Today, 18:00 PM</p>
            </div>
          </div>

          {/* Main Table Area */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Toolbar */}
            <div className="p-4 md:p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-800">Recent Bookings</h2>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                  <input type="text" placeholder="Search bookings..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all shadow-sm" />
                </div>
                <button className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 shadow-sm transition-colors shrink-0">
                  <Filter size={16} /> <span className="hidden sm:inline">Filter</span>
                </button>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-50">
              {bookings.map(b => (
                <div key={b.id} className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                        {b.resident.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{b.resident}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={10} /> Flat {b.flat}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-bold rounded-md border ${getStatusStyle(b.status)}`}>
                      {getStatusIcon(b.status)}{b.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{b.facility}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{b.date} • {b.time}</p>
                    </div>
                    {b.status === 'Pending' && (
                      <div className="flex gap-2">
                        <button className="text-[10px] font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded">Approve</button>
                        <button className="text-[10px] font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded">Reject</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white border-b border-gray-100 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                    <th className="p-4 pl-6">Booking ID</th>
                    <th className="p-4">Resident</th>
                    <th className="p-4">Facility</th>
                    <th className="p-4">Date & Time</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {bookings.map(b => (
                    <tr key={b.id} className="hover:bg-pink-50/30 transition-colors group">
                      <td className="p-4 pl-6 font-mono text-xs font-bold text-gray-500">{b.id}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                            {b.resident.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">{b.resident}</p>
                            <p className="text-xs font-medium text-gray-500 flex items-center gap-1 mt-0.5">
                              <MapPin size={10} /> Flat {b.flat}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-sm font-semibold text-gray-800 bg-gray-100 px-3 py-1 rounded-md">{b.facility}</span>
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-semibold text-gray-900">{b.date}</p>
                        <p className="text-xs font-medium text-gray-500 mt-0.5">{b.time}</p>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-md border ${getStatusStyle(b.status)}`}>
                          {getStatusIcon(b.status)}
                          {b.status}
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        {b.status === 'Pending' ? (
                          <div className="flex justify-end gap-2">
                            <button className="text-xs font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded transition-colors">Approve</button>
                            <button className="text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded transition-colors">Reject</button>
                          </div>
                        ) : (
                          <button className="text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors">View Details</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0a0a0a] border-t border-gray-800 flex items-center justify-around py-2 px-2 z-50">
        <Link href="/dashboard" className="flex flex-col items-center gap-1 text-gray-400 hover:text-white p-2 transition-colors">
          <LayoutDashboard size={20} />
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link href="/admin" className="flex flex-col items-center gap-1 text-white p-2 transition-colors">
          <ShieldCheck size={20} />
          <span className="text-[10px] font-medium">Admin</span>
        </Link>
        <Link href="/modules/billing" className="flex flex-col items-center gap-1 text-gray-400 hover:text-white p-2 transition-colors">
          <FileText size={20} />
          <span className="text-[10px] font-medium">Billing</span>
        </Link>
        <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-white p-2 transition-colors">
          <Settings size={20} />
          <span className="text-[10px] font-medium">Settings</span>
        </button>
      </nav>
    </div>
  );
}
