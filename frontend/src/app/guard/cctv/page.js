'use client';
import React, { useState, useEffect } from 'react';

export default function CCTVDashboard() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black py-4 px-4 font-mono">
      
      {/* Header bar */}
      <div className="flex justify-between items-center bg-gray-900 border border-gray-800 p-4 rounded-xl mb-4 shadow-2xl">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse mr-3"></div>
          <h1 className="text-xl font-bold text-white tracking-widest uppercase">Security Command Center</h1>
          <span className="ml-4 px-2 py-0.5 bg-gray-800 text-gray-400 text-xs rounded border border-gray-700">AI-ENABLED</span>
        </div>
        <div className="flex items-center space-x-6 text-sm text-gray-400">
          <span className="tabular-nums font-bold text-white">{time.toLocaleTimeString()}</span>
          <span>{time.toLocaleDateString()}</span>
          <a href="/" className="px-4 py-1.5 bg-gray-800 hover:bg-gray-700 text-white rounded border border-gray-700 transition-colors">Exit</a>
        </div>
      </div>

      {/* Grid of Cameras */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Cam 1: Main Gate ANPR */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden relative group aspect-video flex items-center justify-center">
          <div className="absolute top-3 left-3 bg-black/60 px-2 py-1 text-xs text-white z-10 flex items-center">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse mr-2"></span> CAM_01_MAIN_GATE
          </div>
          {/* Fake Video Feed */}
          <div className="w-full h-full bg-slate-800 animate-pulse flex items-center justify-center opacity-50 relative">
            <span className="text-slate-600">No Signal / Analyzing</span>
            {/* Fake AI Overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-32 border-2 border-green-500/50 rounded flex flex-col justify-end">
               <span className="bg-green-500/80 text-black text-[10px] font-bold px-1 w-fit">VEHICLE DETECTED (MH01-XX-1234)</span>
            </div>
          </div>
        </div>

        {/* Cam 2: Clubhouse */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden relative group aspect-video flex items-center justify-center">
          <div className="absolute top-3 left-3 bg-black/60 px-2 py-1 text-xs text-white z-10 flex items-center">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse mr-2"></span> CAM_02_CLUBHOUSE
          </div>
          <div className="w-full h-full bg-slate-800 animate-pulse flex items-center justify-center opacity-40">
             <div className="absolute top-1/4 right-1/4 w-12 h-32 border-2 border-blue-500/50 rounded flex flex-col justify-end">
               <span className="bg-blue-500/80 text-white text-[10px] font-bold px-1 w-fit">PERSON (98%)</span>
            </div>
          </div>
        </div>

        {/* Cam 3: Basement Parking */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden relative group aspect-video flex items-center justify-center">
          <div className="absolute top-3 left-3 bg-black/60 px-2 py-1 text-xs text-white z-10 flex items-center">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse mr-2"></span> CAM_03_BASEMENT_B1
          </div>
          <div className="w-full h-full bg-slate-800 animate-pulse flex items-center justify-center opacity-60">
             <div className="absolute inset-x-8 bottom-8 h-20 border-2 border-yellow-500/30 rounded flex flex-col justify-end">
               <span className="bg-yellow-500/80 text-black text-[10px] font-bold px-1 w-fit">UNAUTHORIZED PARKING DETECTED</span>
            </div>
          </div>
        </div>

        {/* Cam 4: Lobby Tower A */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden relative group aspect-video flex items-center justify-center">
          <div className="absolute top-3 left-3 bg-black/60 px-2 py-1 text-xs text-white z-10 flex items-center">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse mr-2"></span> CAM_04_TOWER_A_LOBBY
          </div>
          <div className="w-full h-full bg-slate-800 animate-pulse flex items-center justify-center opacity-30">
          </div>
        </div>

        {/* Cam 5: Swimming Pool */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden relative group aspect-video flex items-center justify-center">
          <div className="absolute top-3 left-3 bg-black/60 px-2 py-1 text-xs text-white z-10 flex items-center">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse mr-2"></span> CAM_05_POOL_AREA
          </div>
          <div className="w-full h-full bg-slate-800 animate-pulse flex items-center justify-center opacity-40">
             <span className="text-slate-600">OFFLINE - MAINTENANCE</span>
          </div>
        </div>

        {/* Cam 6: Back Gate */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden relative group aspect-video flex items-center justify-center">
          <div className="absolute top-3 left-3 bg-black/60 px-2 py-1 text-xs text-white z-10 flex items-center">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse mr-2"></span> CAM_06_BACK_GATE
          </div>
          <div className="w-full h-full bg-slate-800 animate-pulse flex items-center justify-center opacity-50">
          </div>
        </div>

      </div>
    </div>
  );
}
