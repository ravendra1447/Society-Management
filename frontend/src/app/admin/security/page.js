'use client';
import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, FileText, Clock, Menu, 
  Settings, Search, Filter, ShieldCheck, ShieldAlert, UserCheck, PhoneCall, History
} from 'lucide-react';
import Link from 'next/link';

export default function SecurityModule() {
  const [logs] = useState([
    { id: 'V-8991', name: 'Ramesh Kumar', type: 'Delivery', company: 'Amazon', host: 'A-402', entry: '14:23 PM', exit: null, status: 'Inside' },
    { id: 'V-8990', name: 'Suresh Patil', type: 'Guest', company: '-', host: 'C-301', entry: '13:45 PM', exit: '14:15 PM', status: 'Exited' },
    { id: 'V-8989', name: 'Anita Devi', type: 'Maid', company: 'Daily Help', host: 'B-105', entry: '09:00 AM', exit: '13:30 PM', status: 'Exited' },
    { id: 'V-8988', name: 'Kishan Lal', type: 'Plumber', company: 'UrbanClap', host: 'D-504', entry: '12:10 PM', exit: null, status: 'Inside' },
    { id: 'V-8987', name: 'Zomato Rider', type: 'Delivery', company: 'Zomato', host: 'A-102', entry: '12:05 PM', exit: '12:15 PM', status: 'Exited' }
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
            <span className="hidden sm:inline">spacebook.com / admin / security</span>
            <span className="sm:hidden">Gate Security</span>
          </span>
          <div className="flex items-center gap-2 text-rose-600 font-bold text-[10px] sm:text-xs uppercase tracking-wider animate-pulse">
            <div className="w-2 h-2 rounded-full bg-rose-600"></div> Live Feed
          </div>
        </div>

        <div className="p-4 md:p-8 max-w-[1200px] w-full mx-auto flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-3 tracking-tight">
                <ShieldAlert className="text-rose-600 shrink-0" size={28} />
                Gate Security
              </h1>
              <p className="text-gray-500 mt-2 text-sm font-medium">Real-time visitor logs, pre-approvals, and gate entries.</p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <Link href="/admin" className="flex-1 sm:flex-initial px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-sm text-center">
                Back to Admin
              </Link>
              <button className="flex-1 sm:flex-initial px-5 py-2.5 bg-rose-600 text-white font-semibold rounded-lg hover:bg-rose-700 transition-colors shadow-sm text-sm flex items-center justify-center gap-2">
                <UserCheck size={16} /> New Entry
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-50 to-transparent rounded-bl-full -z-0"></div>
              <p className="text-xs md:text-sm font-medium text-gray-500 relative z-10">Visitors Today</p>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 relative z-10">142</div>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-rose-50 to-transparent rounded-bl-full -z-0"></div>
              <p className="text-xs md:text-sm font-medium text-gray-500 relative z-10 flex items-center gap-2">Inside <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span></span></p>
              <div className="text-2xl md:text-3xl font-bold text-rose-600 mt-2 relative z-10">18</div>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-50 to-transparent rounded-bl-full -z-0"></div>
              <p className="text-xs md:text-sm font-medium text-gray-500 relative z-10">Pre-Approved</p>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 relative z-10">24</div>
            </div>
            <div className="col-span-2 md:col-span-1 bg-gradient-to-br from-rose-900 to-rose-800 p-4 md:p-6 rounded-2xl shadow-sm text-white flex flex-col justify-center relative overflow-hidden">
              <ShieldAlert className="absolute -bottom-4 -right-4 opacity-10 text-white" size={80} />
              <p className="text-xs md:text-sm font-medium text-rose-200">Security Alerts</p>
              <p className="text-2xl md:text-3xl font-bold mt-1">0</p>
              <p className="text-xs text-rose-300 mt-1 font-medium">All clear across 4 gates</p>
            </div>
          </div>

          {/* Main Table Area */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Toolbar */}
            <div className="p-4 md:p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2"><History size={18} className="text-gray-400" /> Recent Visitor Logs</h2>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                  <input type="text" placeholder="Search visitors..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all shadow-sm" />
                </div>
                <button className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 shadow-sm transition-colors shrink-0">
                  <Filter size={16} /> <span className="hidden sm:inline">Filter</span>
                </button>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-50">
              {logs.map(log => (
                <div key={log.id} className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-rose-100 overflow-hidden flex items-center justify-center">
                        <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${log.name}&backgroundColor=f43f5e`} alt={log.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{log.name}</p>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">{log.type}</span>
                      </div>
                    </div>
                    {log.status === 'Inside' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-50 text-rose-600 border border-rose-200">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500"></span>
                        </span>
                        Inside
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-gray-100 text-gray-600 border border-gray-200">Out</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="text-xs font-bold text-gray-900 bg-white border border-gray-200 px-2 py-1 rounded">{log.host}</div>
                      <div>
                        <p className="text-xs text-gray-500">{log.company}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-gray-900 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> {log.entry}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5"><span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span> {log.exit || '--:--'}</p>
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
                    <th className="p-4 pl-6">Pass ID</th>
                    <th className="p-4">Visitor Profile</th>
                    <th className="p-4">Type & Company</th>
                    <th className="p-4">Visiting Flat</th>
                    <th className="p-4">Timestamps</th>
                    <th className="p-4 pr-6 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {logs.map(log => (
                    <tr key={log.id} className="hover:bg-rose-50/30 transition-colors group">
                      <td className="p-4 pl-6 font-mono text-xs font-bold text-gray-500">{log.id}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200 border border-gray-300 overflow-hidden flex items-center justify-center">
                            <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${log.name}&backgroundColor=f43f5e`} alt={log.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">{log.name}</p>
                            <p className="text-[11px] font-medium text-indigo-600 flex items-center gap-1 mt-0.5 cursor-pointer hover:underline">
                              <PhoneCall size={10} /> Contact Host
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{log.type}</span>
                        <p className="text-sm font-medium text-gray-800 mt-1">{log.company}</p>
                      </td>
                      <td className="p-4">
                        <div className="text-sm font-bold text-gray-900 bg-gray-50 border border-gray-200 w-fit px-3 py-1 rounded-md">{log.host}</div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-semibold text-gray-900 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> {log.entry}</p>
                        <p className="text-sm font-medium text-gray-500 flex items-center gap-1.5 mt-1"><span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span> {log.exit || '--:-- --'}</p>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        {log.status === 'Inside' ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-rose-50 text-rose-600 border border-rose-200">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                            </span>
                            In Premises
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 text-xs font-bold rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                            Checked Out
                          </span>
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
