'use client';
import React, { useState, useEffect } from 'react';

export default function SmartIoTModule() {
  const [waterLevel, setWaterLevel] = useState(85);
  const [dgFuel, setDgFuel] = useState(62);
  const [powerLoad, setPowerLoad] = useState(420);

  // Simulate real-time sensor updates
  useEffect(() => {
    const interval = setInterval(() => {
      setWaterLevel(prev => Math.max(10, Math.min(100, prev + (Math.random() * 2 - 1))));
      setPowerLoad(prev => Math.max(100, Math.min(800, prev + (Math.random() * 20 - 10))));
      setDgFuel(prev => Math.max(0, prev - 0.01)); // slowly burns
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 font-mono text-cyan-50">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight flex items-center">
              <span className="text-cyan-400 mr-3 animate-pulse">⚡</span> 
              IoT Command Center
            </h1>
            <p className="text-slate-400 mt-2 text-sm">Real-time facility telemetry and sensor data.</p>
          </div>
          <a href="/" className="mt-4 sm:mt-0 px-5 py-2.5 bg-slate-900 border border-slate-700 text-slate-300 font-semibold rounded-lg hover:bg-slate-800 transition-colors">
            Exit Terminal
          </a>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Water Tank Level */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors"></div>
            <h3 className="text-slate-400 text-sm uppercase tracking-widest font-bold mb-6 z-10">OHT Water Level</h3>
            <div className="w-48 h-48 rounded-full border-4 border-slate-800 flex items-center justify-center relative overflow-hidden bg-slate-950 z-10">
              <div 
                className="absolute bottom-0 w-full bg-blue-500/80 transition-all duration-1000 ease-in-out" 
                style={{ height: `${waterLevel}%` }}
              >
                <div className="w-full h-2 bg-blue-400 absolute top-0 animate-pulse"></div>
              </div>
              <span className="text-4xl font-black text-white relative z-20 mix-blend-difference">{waterLevel.toFixed(1)}%</span>
            </div>
            <p className="text-xs text-slate-500 mt-6 z-10">Sensor: Ultrasonic &bull; Status: OK</p>
          </div>

          {/* Electricity Grid Load */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-yellow-500/5 group-hover:bg-yellow-500/10 transition-colors"></div>
            <h3 className="text-slate-400 text-sm uppercase tracking-widest font-bold mb-6 z-10">Grid Load</h3>
            <div className="w-48 h-48 rounded-full border-4 border-yellow-500/20 flex items-center justify-center relative z-10">
              <span className="text-5xl font-black text-yellow-400">{powerLoad.toFixed(0)}</span>
              <span className="text-sm text-yellow-500/50 absolute bottom-8 font-bold">kW</span>
            </div>
            <p className="text-xs text-slate-500 mt-6 z-10">Peak: 650 kW &bull; Status: Normal</p>
          </div>

          {/* DG Fuel */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors"></div>
            <h3 className="text-slate-400 text-sm uppercase tracking-widest font-bold mb-6 z-10">DG Set Fuel</h3>
            <div className="w-full h-12 bg-slate-950 rounded-full border border-slate-800 overflow-hidden relative z-10">
              <div 
                className="h-full bg-emerald-500 transition-all duration-1000 ease-in-out" 
                style={{ width: `${dgFuel}%` }}
              ></div>
            </div>
            <span className="text-2xl font-black text-white mt-4 z-10">{dgFuel.toFixed(2)}%</span>
            <p className="text-xs text-slate-500 mt-6 z-10">Est. Runtime: 14h 20m &bull; Sync: Active</p>
          </div>
        </div>
      </div>
    </div>
  );
}
