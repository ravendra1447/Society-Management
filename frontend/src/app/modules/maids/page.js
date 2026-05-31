'use client';
import React, { useState } from 'react';

export default function DomesticHelpsModule() {
  const helps = [
    { name: 'Sita Devi', category: 'Maid', contact: '9876543210', flat: 'Tower A - 402', status: 'Inside' },
    { name: 'Ramesh Kumar', category: 'Driver', contact: '8765432109', flat: 'Tower B - 105', status: 'Outside' },
    { name: 'Sunita', category: 'Cook', contact: '7654321098', flat: 'Tower A - 402', status: 'Inside' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-extrabold text-pink-900">🧹 Domestic Helps Tracker</h1>
            <p className="text-gray-500 mt-2">Track real-time entry/exit of maids, cooks, and drivers.</p>
          </div>
          <a href="/" className="px-5 py-2.5 bg-pink-50 text-pink-700 font-semibold rounded-lg hover:bg-pink-100 transition-colors shadow-sm">
            Dashboard
          </a>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-pink-50 border-b border-pink-100 text-pink-700 text-xs uppercase tracking-wider font-semibold">
                  <th className="p-4">Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Assigned Flat</th>
                  <th className="p-4 text-right">Current Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {helps.map((h, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-bold text-gray-900">{h.name}<div className="text-xs text-gray-500 font-normal">{h.contact}</div></td>
                    <td className="p-4 text-sm text-gray-600">{h.category}</td>
                    <td className="p-4 text-sm font-bold text-gray-700">{h.flat}</td>
                    <td className="p-4 text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        h.status === 'Inside' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {h.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
