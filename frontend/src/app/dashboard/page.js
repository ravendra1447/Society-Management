'use client';
import React, { useState, useEffect } from 'react';

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState({ staffCount: 0, vendorCount: 0, vehicleCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/dashboard/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch stats", err);
        setLoading(false);
      });
  }, []);

  const liveCards = [
    { title: 'Staff Inside Now', value: loading ? '...' : stats.staffCount, icon: '👷', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { title: 'Vendors Working', value: loading ? '...' : stats.vendorCount, icon: '🛠️', color: 'bg-green-50 text-green-700 border-green-200' },
    { title: 'Vehicles Allowed', value: loading ? '...' : stats.vehicleCount, icon: '🚗', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    { title: 'Visitors Active', value: '8', icon: '🧑‍💼', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { title: 'Pending Approvals', value: '3', icon: '⏳', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
    { title: 'Low Stock Items', value: '12', icon: '⚠️', color: 'bg-red-50 text-red-700 border-red-200' },
    { title: 'Open Complaints', value: '5', icon: '📋', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  ];

  const charts = [
    { name: 'Daily Staff Attendance', type: 'Bar Chart (Last 30 Days)' },
    { name: 'Stock Usage Trend', type: 'Line Chart (By Category)' },
    { name: 'Visitor Purpose', type: 'Pie Chart Breakdown' },
    { name: 'Peak Entry/Exit Hours', type: 'Heatmap (By Day)' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 relative overflow-hidden backdrop-blur-xl gap-4">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
              <span>Live Statistics</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Analytics & Real-Time Dashboard</h1>
            <p className="text-slate-500 mt-2 text-lg">Live overview of your Society Management system</p>
          </div>
          <a href="/" className="relative z-10 px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-indigo-600 transition-colors duration-300 font-semibold shadow-lg shadow-black/10 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </a>
        </header>

        {/* Live Cards Grid */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="text-indigo-500">⚡</span> Live Status
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {liveCards.map((card, idx) => (
              <div key={idx} className={`p-6 rounded-3xl border bg-white ${card.color.replace('bg-', 'hover:bg-').replace('text-', 'text-')} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center relative overflow-hidden group`}>
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-current`}></div>
                <span className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">{card.icon}</span>
                <span className="text-4xl font-black mb-1 text-slate-800 tracking-tight">{card.value}</span>
                <span className="text-sm font-semibold text-slate-500">{card.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Charts Section Placeholder */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="text-purple-500">📈</span> Analytics & Trends
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {charts.map((chart, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] h-72 flex flex-col items-center justify-center hover:border-indigo-200 hover:shadow-xl transition-all duration-300 group cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="w-20 h-20 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                  <span className="text-indigo-500 text-4xl">📊</span>
                </div>
                <h3 className="font-bold text-xl text-slate-800 relative z-10 group-hover:text-indigo-600 transition-colors">{chart.name}</h3>
                <p className="text-slate-500 font-medium mt-2 relative z-10 bg-slate-50 px-4 py-1.5 rounded-full text-sm border border-slate-100">{chart.type}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
