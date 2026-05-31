'use client';
import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, FileText, Clock, Menu, 
  Settings, Search, Filter, ShieldCheck, CarFront, Edit2, Trash2, ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function ParkingModule() {
  const [vehicles] = useState([
    { id: '1', slot: 'P-101', resident: 'Aarav Sharma', flat: 'A-402', plate: 'MH 12 AB 1234', type: 'Car - SUV', make: 'Hyundai Creta', status: 'In' },
    { id: '2', slot: 'P-102', resident: 'Neha Gupta', flat: 'B-105', plate: 'MH 14 XY 9876', type: 'Car - Sedan', make: 'Honda City', status: 'Out' },
    { id: '3', slot: 'P-103', resident: 'Vikram Singh', flat: 'C-301', plate: 'MH 12 CD 5678', type: 'Two Wheeler', make: 'Royal Enfield', status: 'In' },
    { id: '4', slot: 'P-104', resident: 'Priya Desai', flat: 'A-102', plate: 'MH 01 ZQ 4321', type: 'Car - Hatchback', make: 'Maruti Swift', status: 'In' },
    { id: '5', slot: 'P-105', resident: 'Rahul Verma', flat: 'D-504', plate: 'MH 12 ER 1122', type: 'Two Wheeler', make: 'Honda Activa', status: 'Out' }
  ]);

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
            <span className="hidden sm:inline">spacebook.com / admin / parking</span>
            <span className="sm:hidden">Parking</span>
          </span>
        </div>

        <div className="p-4 md:p-8 max-w-[1200px] w-full mx-auto flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-3 tracking-tight">
                <CarFront className="text-slate-600 shrink-0" size={28} />
                Parking & Vehicles
              </h1>
              <p className="text-gray-500 mt-2 text-sm font-medium">Manage parking slots and track resident vehicle entries.</p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <Link href="/admin" className="flex-1 sm:flex-initial px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-sm text-center">
                Back to Admin
              </Link>
              <button className="flex-1 sm:flex-initial px-5 py-2.5 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-900 transition-colors shadow-sm text-sm flex items-center justify-center gap-2">
                Allocate Slot
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-slate-100 to-transparent rounded-bl-full -z-0"></div>
              <p className="text-xs md:text-sm font-medium text-gray-500 relative z-10">Total Slots</p>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 relative z-10">250</div>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-red-50 to-transparent rounded-bl-full -z-0"></div>
              <p className="text-xs md:text-sm font-medium text-gray-500 relative z-10">Occupied</p>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 relative z-10">185</div>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-50 to-transparent rounded-bl-full -z-0"></div>
              <p className="text-xs md:text-sm font-medium text-gray-500 relative z-10">Available</p>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 relative z-10">65</div>
            </div>
            <div className="col-span-2 md:col-span-1 bg-gradient-to-br from-indigo-900 to-indigo-800 p-4 md:p-6 rounded-2xl shadow-sm text-white flex flex-col justify-center">
              <p className="text-xs md:text-sm font-medium text-indigo-200">ANPR Accuracy</p>
              <p className="text-2xl md:text-3xl font-bold mt-1">98.4%</p>
              <p className="text-xs text-indigo-300 mt-1 flex items-center gap-1">Today's scan rate <ArrowRight size={10} /></p>
            </div>
          </div>

          {/* Main Table Area */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Toolbar */}
            <div className="p-4 md:p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-800">Vehicle Directory</h2>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                  <input type="text" placeholder="Search license plate..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all shadow-sm" />
                </div>
                <button className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 shadow-sm transition-colors shrink-0">
                  <Filter size={16} /> <span className="hidden sm:inline">Filter</span>
                </button>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-50">
              {vehicles.map(v => (
                <div key={v.id} className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{v.resident}</p>
                      <p className="text-xs text-gray-500">Flat {v.flat}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${v.status === 'In' ? 'bg-emerald-500 shadow-emerald-500/50 shadow-sm' : 'bg-gray-300'}`}></span>
                      <span className="text-xs font-bold text-gray-500">{v.status === 'In' ? 'Parked' : 'Outside'}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-extrabold text-slate-700 bg-slate-100 px-2 py-1 rounded border border-slate-200">{v.slot}</span>
                      <div className="inline-flex flex-col items-center border-2 border-gray-800 rounded px-1.5 py-0.5 bg-white">
                        <div className="text-[6px] font-bold text-gray-500 tracking-widest uppercase">IND</div>
                        <span className="font-mono text-xs font-bold text-black tracking-wider">{v.plate}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-gray-700">{v.make}</p>
                      <p className="text-[10px] text-gray-400">{v.type}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white border-b border-gray-100 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                    <th className="p-4 pl-6">Slot No</th>
                    <th className="p-4">License Plate</th>
                    <th className="p-4">Owner / Flat</th>
                    <th className="p-4">Vehicle Details</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {vehicles.map(v => (
                    <tr key={v.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="p-4 pl-6">
                        <span className="text-sm font-extrabold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">{v.slot}</span>
                      </td>
                      <td className="p-4">
                        <div className="inline-flex flex-col items-center border-2 border-gray-800 rounded px-2 py-0.5 bg-white shadow-sm">
                           <div className="text-[7px] font-bold text-gray-500 tracking-widest uppercase mb-0.5">IND</div>
                           <span className="font-mono text-sm font-bold text-black tracking-wider">{v.plate}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-bold text-gray-900">{v.resident}</p>
                        <p className="text-xs font-medium text-gray-500">Flat {v.flat}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-semibold text-gray-700">{v.make}</p>
                        <p className="text-xs font-medium text-gray-400">{v.type}</p>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`inline-flex items-center justify-center w-3 h-3 rounded-full shadow-sm ${v.status === 'In' ? 'bg-emerald-500 shadow-emerald-500/50' : 'bg-gray-300'}`} title={v.status === 'In' ? 'Parked Inside' : 'Currently Outside'}>
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="text-slate-400 hover:text-indigo-600 p-1.5 rounded bg-white border border-gray-200 shadow-sm"><Edit2 size={14} /></button>
                          <button className="text-slate-400 hover:text-red-600 p-1.5 rounded bg-white border border-gray-200 shadow-sm"><Trash2 size={14} /></button>
                        </div>
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
