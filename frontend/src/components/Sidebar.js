'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Sidebar({ isOpen, setIsOpen }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('society_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const role = user?.role || 'Resident';
  
  const canSee = (module) => {
    if (role === 'Admin') return true;
    
    let modules = user?.assigned_modules;
    if (typeof modules === 'string') {
      try {
        modules = JSON.parse(modules);
      } catch (e) {
        modules = [];
      }
    }
    
    if (modules && Array.isArray(modules)) {
      return modules.includes(module);
    }
    return false;
  };

  const menuItems = [
    { icon: '🔐', label: 'Admin Panel', path: '/admin', module: 'admin_panel' },
    { icon: '👤', label: 'Profile', path: '/admin#password', module: 'admin_panel' },
    { icon: '', label: 'Staff Attendance', path: '/modules/staff', module: 'staff' },
    { icon: '🛠️', label: 'Vendor Gate Pass', path: '/modules/vendor', module: 'vendor' },
    { icon: '📦', label: 'Material IN/OUT', path: '/modules/stock', module: 'stock' },
    { icon: '🚶', label: 'Visitor Management', path: '/modules/visitor', module: 'visitor' },
    { icon: '🚗', label: 'Vehicle ANPR', path: '/modules/vehicle', module: 'vehicle' },
    { icon: '📢', label: 'Notices & Events', path: '/modules/notices', module: 'notices' },
    { icon: '📋', label: 'Helpdesk', path: '/modules/complaints', module: 'complaints' },
    { icon: '💰', label: 'Maintenance Bills', path: '/modules/billing', module: 'billing' },
    { icon: '🎾', label: 'Book Amenities', path: '/modules/amenities', module: 'amenities' },
    { icon: '🛒', label: 'Classifieds', path: '/modules/classifieds', module: 'classifieds' },
    { icon: '💬', label: 'Community Forum', path: '/modules/forum', module: 'forum' },
    { icon: '🚨', label: 'Emergency SOS', path: '/modules/sos', module: 'sos' },
    { icon: '⚡', label: 'Smart IoT Meters', path: '/modules/iot', module: 'iot' },
    { icon: '🧹', label: 'Domestic Helps', path: '/modules/maids', module: 'maids' },
    { icon: '🚚', label: 'Relocation Gatepass', path: '/modules/relocation', module: 'relocation' },
    { icon: '📄', label: 'Society Documents', path: '/modules/documents', module: 'documents' },
    { icon: '�', label: 'FM Daily Work', path: '/modules/fm-daily-work', module: 'fm-daily-work' },
    { icon: '�📹', label: 'AI CCTV Feed', path: '/guard/cctv', module: 'cctv' },
    { icon: '🛡️', label: 'Night Patrol', path: '/guard/patrol', module: 'patrol' },
    { icon: '🅿️', label: 'Parking Slots', path: '/guard/parking', module: 'parking' },
  ];

  const filteredItems = menuItems.filter(item => {
    if (item.module === 'admin_panel') return role === 'Admin';
    return canSee(item.module);
  });

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`fixed inset-y-0 left-0 z-50 lg:static flex flex-col bg-gradient-to-b from-white via-gray-50 to-white text-gray-600 transition-all duration-300 ease-in-out shadow-xl ${isOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0 lg:w-72'} h-screen flex-shrink-0 border-r border-gray-200`}>
        
        {/* Mobile Header (Only shows on small screens when open) */}
        <div className="lg:hidden flex items-center justify-between p-5 shrink-0 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-xl">🏢</span>
            </div>
            <span className="font-bold text-gray-800 text-lg">Society App</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Logo Section */}
        <div className="hidden lg:flex flex-col shrink-0 px-6 py-5">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-2xl">🏢</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800 tracking-tight">Society App</h2>
              <p className="text-xs text-gray-500 font-medium">Management System</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-6 overflow-y-auto overflow-x-hidden scrollbar-hide">
          <div className="px-4 space-y-2">
            {filteredItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  router.push(item.path);
                  if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                    setIsOpen(false);
                  }
                }}
                className={`w-full px-4 py-3 flex items-center rounded-xl transition-all duration-200 group relative ${
                  pathname === item.path
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/30'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800 hover:shadow-md'
                }`}
              >
                <span className="text-sm font-medium whitespace-nowrap">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </nav>

        {/* User Footer */}
        <div className="p-5 shrink-0 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg ring-1 ring-blue-500/20">
              <span className="text-white font-bold text-sm">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">{user?.name || 'Loading...'}</p>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide truncate">{role}</p>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
}
