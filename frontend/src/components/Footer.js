'use client';
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 px-6 py-4">
      <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600 space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <span className="font-semibold text-gray-900">© 2024 Society Management</span>
          <span className="text-gray-400 hidden sm:inline">|</span>
          <span className="hover:text-indigo-600 cursor-pointer transition-colors text-xs sm:text-sm">Privacy</span>
          <span className="hover:text-indigo-600 cursor-pointer transition-colors text-xs sm:text-sm">Terms</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-green-600 font-medium text-xs">Online</span>
          </div>
          <span className="text-gray-500 text-xs">v2.0</span>
        </div>
      </div>
    </footer>
  );
}
