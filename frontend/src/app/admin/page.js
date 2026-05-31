'use client';
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, FileText, Clock, Menu as MenuIcon, 
  Settings, UsersRound, HardHat, Wrench, Home,
  ArrowRight, ShieldCheck, Activity, UserPlus, Briefcase,
  Megaphone, AlertTriangle, Package, PieChart, Plus, BellRing,
  Wallet, CalendarDays, CarFront, ShoppingBag, ShieldAlert,
  TrendingUp, Eye, Search, RefreshCw, ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function AdminMenu() {
  const [stats, setStats] = useState({ activeStaff: 0, totalStaff: 0, gateEntries: 0, totalUsers: 0, pendingApprovals: 0 });
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [activities, setActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  const formatActivityDate = (timestamp) => {
    if (!timestamp) return 'Just now';
    const d = new Date(timestamp);
    if (isNaN(d.getTime())) return 'Recently';
    const now = new Date();
    const diffMs = now - d;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
  };

  const refreshData = () => {
    setLoading(true);
    Promise.all([
      fetch('http://localhost:5000/api/dashboard/stats').then(res => res.json()),
      fetch('http://localhost:5000/api/dashboard/activity').then(res => res.json())
    ]).then(([statsData, actData]) => {
      setStats(statsData);
      setActivities(Array.isArray(actData) ? actData : []);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  };

  useEffect(() => {
    // Get logged-in user
    const storedUser = localStorage.getItem('society_user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Invalid user data', e);
      }
    }
    refreshData();

    // Check for password hash in URL
    if (typeof window !== 'undefined' && window.location.hash === '#password') {
      setShowPasswordModal(true);
    }
  }, []);

  const modules = [
    {
      id: "users",
      title: "User Management",
      desc: "Create & manage system accounts, roles & permissions",
      href: "/admin/users",
      icon: <UsersRound size={24} />,
      iconColor: "text-indigo-600",
      bg: "bg-gradient-to-br from-indigo-50 to-indigo-100/50",
      borderHover: "hover:border-indigo-300 hover:shadow-indigo-100",
      badge: stats.totalUsers ? `${stats.totalUsers} Users` : null,
      allowedRoles: ['Admin']
    },
    {
      id: "staff",
      title: "Staff Management",
      desc: "Add staff, assign roles, track attendance & shifts",
      href: "/admin/staff",
      icon: <HardHat size={24} />,
      iconColor: "text-blue-600",
      bg: "bg-gradient-to-br from-blue-50 to-blue-100/50",
      borderHover: "hover:border-blue-300 hover:shadow-blue-100",
      badge: stats.activeStaff ? `${stats.activeStaff} Active` : null,
      allowedRoles: ['Admin', 'Manager', 'Security']
    },
    {
      id: "vendor",
      title: "Vendor Management",
      desc: "Register companies & track service visits",
      href: "/admin/vendor",
      icon: <Wrench size={24} />,
      iconColor: "text-orange-600",
      bg: "bg-gradient-to-br from-orange-50 to-orange-100/50",
      borderHover: "hover:border-orange-300 hover:shadow-orange-100",
      allowedRoles: ['Admin', 'Manager', 'Security']
    },
    {
      id: "resident",
      title: "Resident Directory",
      desc: "Register owners, tenants & manage invitations",
      href: "/admin/resident",
      icon: <Home size={24} />,
      iconColor: "text-emerald-600",
      bg: "bg-gradient-to-br from-emerald-50 to-emerald-100/50",
      borderHover: "hover:border-emerald-300 hover:shadow-emerald-100",
      allowedRoles: ['Admin', 'Manager']
    },
    {
      id: "notices",
      title: "Notice Board",
      desc: "Broadcast announcements & community alerts",
      href: "/modules/notices",
      icon: <Megaphone size={24} />,
      iconColor: "text-yellow-600",
      bg: "bg-gradient-to-br from-yellow-50 to-yellow-100/50",
      borderHover: "hover:border-yellow-300 hover:shadow-yellow-100",
      allowedRoles: ['Admin', 'Manager']
    },
    {
      id: "complaints",
      title: "Complaints Desk",
      desc: "Manage and resolve resident tickets",
      href: "/modules/complaints",
      icon: <AlertTriangle size={24} />,
      iconColor: "text-red-600",
      bg: "bg-gradient-to-br from-red-50 to-red-100/50",
      borderHover: "hover:border-red-300 hover:shadow-red-100",
      badge: stats.pendingApprovals ? `${stats.pendingApprovals} Open` : null,
      allowedRoles: ['Admin', 'Manager', 'Staff']
    },
    {
      id: "inventory",
      title: "Inventory & Assets",
      desc: "Track society equipment and stock levels",
      href: "/modules/stock",
      icon: <Package size={24} />,
      iconColor: "text-cyan-600",
      bg: "bg-gradient-to-br from-cyan-50 to-cyan-100/50",
      borderHover: "hover:border-cyan-300 hover:shadow-cyan-100",
      allowedRoles: ['Admin', 'Manager']
    },
    {
      id: "polls",
      title: "Polls & Surveys",
      desc: "Gather resident feedback & voting",
      href: "/modules/polls",
      icon: <PieChart size={24} />,
      iconColor: "text-fuchsia-600",
      bg: "bg-gradient-to-br from-fuchsia-50 to-fuchsia-100/50",
      borderHover: "hover:border-fuchsia-300 hover:shadow-fuchsia-100",
      allowedRoles: ['Admin', 'Manager']
    },
    {
      id: "billing",
      title: "Billing & Accounting",
      desc: "Manage maintenance fees and invoices",
      href: "/modules/billing",
      icon: <Wallet size={24} />,
      iconColor: "text-teal-600",
      bg: "bg-gradient-to-br from-teal-50 to-teal-100/50",
      borderHover: "hover:border-teal-300 hover:shadow-teal-100",
      allowedRoles: ['Admin', 'Manager']
    },
    {
      id: "facilities",
      title: "Facility Booking",
      desc: "Manage clubhouse, pool & amenity bookings",
      href: "/admin/facilities",
      icon: <CalendarDays size={24} />,
      iconColor: "text-pink-600",
      bg: "bg-gradient-to-br from-pink-50 to-pink-100/50",
      borderHover: "hover:border-pink-300 hover:shadow-pink-100",
      allowedRoles: ['Admin', 'Manager', 'Resident']
    },
    {
      id: "parking",
      title: "Parking & Vehicles",
      desc: "Allocate slots & track resident vehicles",
      href: "/admin/parking",
      icon: <CarFront size={24} />,
      iconColor: "text-slate-600",
      bg: "bg-gradient-to-br from-slate-50 to-slate-100/50",
      borderHover: "hover:border-slate-300 hover:shadow-slate-100",
      allowedRoles: ['Admin', 'Manager', 'Security']
    },
    {
      id: "security",
      title: "Gate Security",
      desc: "Monitor live visitor logs and gate entries",
      href: "/admin/security",
      icon: <ShieldAlert size={24} />,
      iconColor: "text-rose-600",
      bg: "bg-gradient-to-br from-rose-50 to-rose-100/50",
      borderHover: "hover:border-rose-300 hover:shadow-rose-100",
      badge: stats.gateEntries ? `${stats.gateEntries} Today` : null,
      allowedRoles: ['Admin', 'Manager', 'Security']
    },
    {
      id: "classifieds",
      title: "Community Classifieds",
      desc: "Buy, sell, or rent within the society",
      href: "/admin/classifieds",
      icon: <ShoppingBag size={24} />,
      iconColor: "text-amber-600",
      bg: "bg-gradient-to-br from-amber-50 to-amber-100/50",
      borderHover: "hover:border-amber-300 hover:shadow-amber-100",
      allowedRoles: ['Admin', 'Manager', 'Resident']
    }
  ];

  // Dynamic Module filtering based on assigned_modules from database
  const visibleModules = modules.filter(mod => {
    if (!currentUser) return false;
    
    // Use the dynamic array from the backend if available
    let modules = currentUser.assigned_modules;
    if (typeof modules === 'string') {
      try { modules = JSON.parse(modules); } catch (e) { modules = []; }
    }
    if (modules && Array.isArray(modules)) {
      return modules.includes(mod.id);
    }
    
    // Fallback logic for backward compatibility
    if (currentUser?.role === 'Admin') return true;
    return mod.allowedRoles?.includes(currentUser?.role) || false;
  });

  // Filter by search
  const filteredModules = visibleModules.filter(mod => 
    !searchQuery || 
    mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mod.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statCards = [
    { 
      label: 'Gate Entries', 
      value: stats.gateEntries, 
      suffix: 'Today',
      icon: <Activity size={20} />,
      color: 'from-indigo-500 to-indigo-600',
      lightBg: 'bg-indigo-50',
      textColor: 'text-indigo-600'
    },
    { 
      label: 'Active Staff', 
      value: stats.activeStaff, 
      suffix: `/ ${stats.totalStaff}`,
      icon: <Briefcase size={20} />,
      color: 'from-blue-500 to-blue-600',
      lightBg: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    { 
      label: 'Total Users', 
      value: stats.totalUsers || 0, 
      suffix: 'Accounts',
      icon: <UsersRound size={20} />,
      color: 'from-emerald-500 to-emerald-600',
      lightBg: 'bg-emerald-50',
      textColor: 'text-emerald-600'
    },
    { 
      label: 'Open Tickets', 
      value: stats.pendingApprovals || 0, 
      suffix: 'Pending',
      icon: <AlertTriangle size={20} />,
      color: 'from-amber-500 to-amber-600',
      lightBg: 'bg-amber-50',
      textColor: 'text-amber-600'
    }
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 min-h-screen bg-gray-50/50">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                <ShieldCheck className="text-white" size={22} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                  Admin Control Panel
                </h1>
                <p className="text-gray-500 text-sm font-medium">
                  Welcome back, <span className="text-indigo-600 font-bold">{currentUser?.name || 'Admin'}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-3 w-full lg:w-auto">
            <button 
              onClick={refreshData}
              className="px-4 py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-sm text-sm flex items-center gap-2"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
            </button>
            <Link 
              href="/admin/users"
              className="flex-1 lg:flex-initial px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200 text-sm flex items-center justify-center gap-2"
            >
              <UserPlus size={16} /> Create User
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {statCards.map((card, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-5 md:p-6 group">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl ${card.lightBg} flex items-center justify-center ${card.textColor} group-hover:scale-110 transition-transform`}>
                  {card.icon}
                </div>
                <TrendingUp size={14} className="text-green-500" />
              </div>
              <div className="text-3xl md:text-4xl font-black text-gray-900 mb-1">
                {loading ? <span className="inline-block w-12 h-8 bg-gray-100 rounded animate-pulse"></span> : card.value}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500">{card.label}</span>
                <span className="text-xs text-gray-400">{card.suffix}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex flex-col xl:flex-row gap-6">
          
          {/* Module Grid */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-gray-900">Management Modules</h2>
                <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full">
                  {filteredModules.length} Available
                </span>
              </div>
              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search modules..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredModules.length === 0 ? (
                <div className="col-span-full p-12 text-center bg-white rounded-2xl border border-gray-100">
                  <div className="text-4xl mb-4">🔍</div>
                  <p className="text-gray-500 font-medium">No modules found.</p>
                  <p className="text-gray-400 text-sm mt-1">Try a different search or check your permissions.</p>
                </div>
              ) : (
                filteredModules.map((mod, i) => (
                <Link 
                  href={mod.href} 
                  key={i}
                  className={`${mod.bg} p-5 rounded-2xl shadow-sm border border-gray-100/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group flex flex-col relative overflow-hidden ${mod.borderHover}`}
                >
                  {/* Badge */}
                  {mod.badge && (
                    <span className="absolute top-4 right-4 px-2.5 py-1 bg-white/80 backdrop-blur-sm text-xs font-bold text-gray-700 rounded-full border border-gray-200/50 shadow-sm">
                      {mod.badge}
                    </span>
                  )}
                  <div className={`w-12 h-12 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center mb-4 shadow-sm border border-white ${mod.iconColor} group-hover:scale-110 transition-transform`}>
                    {mod.icon}
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-1.5 group-hover:text-gray-800 transition-colors">{mod.title}</h3>
                  <p className="text-sm text-gray-500 mb-5 flex-1 leading-relaxed">{mod.desc}</p>
                  <div className="flex items-center text-sm font-semibold text-gray-500 group-hover:text-gray-900 transition-colors">
                    Open Module 
                    <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              )))
              }
            </div>
          </div>

          {/* Right Sidebar - Activity Feed */}
          <div className="w-full xl:w-[340px] shrink-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Live Activity</h2>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-semibold text-green-600">Live</span>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="space-y-5">
                {activities.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-3xl mb-3">📭</div>
                    <p className="text-sm text-gray-500 font-medium">No recent activity</p>
                    <p className="text-xs text-gray-400 mt-1">Activities will appear here in real-time</p>
                  </div>
                ) : activities.map((act, idx) => (
                  <div key={act.id} className="flex gap-3 relative group">
                    {idx !== activities.length - 1 && (
                      <div className="absolute left-4 top-9 bottom-[-20px] w-px bg-gray-100"></div>
                    )}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-transform group-hover:scale-110 ${
                      act.type === 'visitor' ? 'bg-emerald-100 text-emerald-600' :
                      act.type === 'complaint' ? 'bg-red-100 text-red-600' :
                      act.type === 'invoice' ? 'bg-orange-100 text-orange-600' :
                      act.type === 'user' ? 'bg-purple-100 text-purple-600' :
                      'bg-indigo-100 text-indigo-600'
                    }`}>
                      {act.type === 'visitor' ? <UserPlus size={14} /> :
                       act.type === 'complaint' ? <AlertTriangle size={14} /> :
                       act.type === 'invoice' ? <FileText size={14} /> :
                       act.type === 'user' ? <UsersRound size={14} /> :
                       <BellRing size={14} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 font-semibold">{act.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">{act.desc}</p>
                      <p className="text-[11px] text-gray-400 mt-1.5 font-medium">
                        {formatActivityDate(act.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-5 py-2.5 bg-gray-50 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                <Eye size={14} /> View Full Logs
              </button>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 text-white">
              <h3 className="font-bold text-sm mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link href="/admin/users" className="flex items-center gap-3 px-3 py-2.5 bg-white/10 rounded-xl hover:bg-white/20 transition-colors text-sm">
                  <UserPlus size={16} className="text-indigo-400" />
                  <span>Create New User</span>
                </Link>
                <Link href="/admin/staff" className="flex items-center gap-3 px-3 py-2.5 bg-white/10 rounded-xl hover:bg-white/20 transition-colors text-sm">
                  <HardHat size={16} className="text-blue-400" />
                  <span>Add Staff Member</span>
                </Link>
                <Link href="/modules/notices" className="flex items-center gap-3 px-3 py-2.5 bg-white/10 rounded-xl hover:bg-white/20 transition-colors text-sm">
                  <Megaphone size={16} className="text-yellow-400" />
                  <span>Post Announcement</span>
                </Link>
                <Link href="/modules/complaints" className="flex items-center gap-3 px-3 py-2.5 bg-white/10 rounded-xl hover:bg-white/20 transition-colors text-sm">
                  <AlertTriangle size={16} className="text-red-400" />
                  <span>View Complaints</span>
                </Link>
                <button 
                  onClick={() => setShowPasswordModal(true)}
                  className="flex items-center gap-3 px-3 py-2.5 bg-white/10 rounded-xl hover:bg-white/20 transition-colors text-sm w-full"
                >
                  <Settings size={16} className="text-gray-400" />
                  <span>Change Password</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-gray-900">Change Password</h2>
              <button 
                onClick={() => setShowPasswordModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                &times;
              </button>
            </div>
            <form className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Current Password
                </label>
                <input 
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-gray-800 font-medium"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  New Password
                </label>
                <input 
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-gray-800 font-medium"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Confirm New Password
                </label>
                <input 
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-gray-800 font-medium"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-5 py-3 text-gray-500 hover:text-gray-700 font-bold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert('Password change functionality requires backend API integration');
                    setShowPasswordModal(false);
                  }}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
