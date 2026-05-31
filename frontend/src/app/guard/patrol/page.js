'use client';
import React, { useState } from 'react';

export default function NightPatrolTracker() {
  const [logs, setLogs] = useState([
    { checkpoint: 'Basement B1 - Pillar A', time: '02:00 AM', status: 'Checked' },
    { checkpoint: 'Tower B Terrace', time: '02:45 AM', status: 'Checked' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleScan = () => {
    setLoading(true);
    setTimeout(() => {
      setLogs([{ checkpoint: 'Main Gate Exit Area', time: new Date().toLocaleTimeString(), status: 'Checked' }, ...logs]);
      setLoading(false);
      alert('Checkpoint Scanned & Logged successfully!');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-900 py-8 px-4 sm:px-6 lg:px-8 font-mono">
      <div className="max-w-md mx-auto">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl shadow-[0_0_20px_rgba(37,99,235,0.5)] mb-4">
            🛡️
          </div>
          <h1 className="text-2xl font-black text-white tracking-widest uppercase">Night Patrol</h1>
          <p className="text-blue-400 mt-2 text-xs">Guard ID: 4092 &bull; Shift: NIGHT</p>
        </div>

        {/* Scan Area */}
        <div className="bg-slate-800 rounded-3xl shadow-2xl border border-slate-700 p-8 flex flex-col items-center justify-center relative overflow-hidden mb-8">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          
          <button 
            onClick={handleScan}
            disabled={loading}
            className="w-48 h-48 bg-slate-900 rounded-full border-4 border-blue-500/30 flex flex-col items-center justify-center shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] hover:border-blue-500 transition-colors group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-2"></div>
            ) : (
               <span className="text-5xl group-hover:scale-110 transition-transform mb-2">📡</span>
            )}
            <span className="text-blue-400 font-bold text-sm tracking-widest uppercase">{loading ? 'Scanning...' : 'TAP NFC'}</span>
            
            {/* Radar Sweep Effect */}
            <div className="absolute w-1/2 h-1/2 bg-blue-500/20 top-0 left-1/2 origin-bottom-left animate-spin rounded-tr-full mix-blend-screen pointer-events-none"></div>
          </button>
          <p className="text-xs text-slate-500 mt-6 text-center">Tap phone on the wall checkpoint to log your location.</p>
        </div>

        {/* Timeline */}
        <div className="bg-slate-800 rounded-3xl shadow-xl border border-slate-700 p-6">
          <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-6 border-b border-slate-700 pb-3 flex justify-between">
            <span>Patrol Log</span>
            <span className="text-blue-400">Total: {logs.length}/10</span>
          </h3>
          <div className="space-y-6">
            {logs.map((log, i) => (
              <div key={i} className="flex relative">
                {/* Timeline line */}
                {i !== logs.length - 1 && <div className="absolute top-6 left-[11px] bottom-[-24px] w-0.5 bg-slate-700"></div>}
                <div className="w-6 h-6 bg-blue-900 border-2 border-blue-500 rounded-full mt-1 mr-4 z-10 flex-shrink-0 flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{log.checkpoint}</h4>
                  <div className="flex items-center mt-1">
                    <span className="text-slate-400 text-xs">{log.time}</span>
                    <span className="mx-2 text-slate-600">&bull;</span>
                    <span className="text-green-400 text-xs font-bold uppercase">{log.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 text-center">
           <a href="/" className="text-slate-500 hover:text-white transition-colors text-sm underline">Exit Patrol Dashboard</a>
        </div>

      </div>
    </div>
  );
}
