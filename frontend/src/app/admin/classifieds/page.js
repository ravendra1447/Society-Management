'use client';
import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, FileText, Clock, Menu, 
  Settings, Search, Filter, ShieldCheck, ShoppingBag, Tag, Heart, MessageCircle, Plus
} from 'lucide-react';
import Link from 'next/link';

export default function ClassifiedsModule() {
  const [items] = useState([
    { id: '1', title: 'IKEA 3-Seater Sofa', price: '₹12,500', category: 'Furniture', condition: 'Like New', seller: 'Aarav Sharma', flat: 'A-402', date: '2 days ago', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80', status: 'Active' },
    { id: '2', title: 'Hero Gear Bicycle 21-Speed', price: '₹4,000', category: 'Sports', condition: 'Used - Good', seller: 'Neha Gupta', flat: 'B-105', date: '5 hrs ago', image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&q=80', status: 'Active' },
    { id: '3', title: 'LG Washing Machine 7kg', price: '₹8,500', category: 'Appliances', condition: 'Used - Fair', seller: 'Vikram Singh', flat: 'C-301', date: '1 week ago', image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500&q=80', status: 'Sold' },
    { id: '4', title: 'PS5 with 2 Controllers', price: '₹38,000', category: 'Electronics', condition: 'Like New', seller: 'Priya Desai', flat: 'A-102', date: '1 day ago', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&q=80', status: 'Active' },
    { id: '5', title: 'Wooden Study Table', price: '₹2,200', category: 'Furniture', condition: 'Used - Good', seller: 'Rahul Verma', flat: 'D-504', date: '3 days ago', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500&q=80', status: 'Active' }
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
            <span className="hidden sm:inline">spacebook.com / admin / classifieds</span>
            <span className="sm:hidden">Classifieds</span>
          </span>
        </div>

        <div className="p-4 md:p-8 max-w-[1200px] w-full mx-auto flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-3 tracking-tight">
                <ShoppingBag className="text-amber-600 shrink-0" size={28} />
                <span className="hidden sm:inline">Community Marketplace</span>
                <span className="sm:hidden">Marketplace</span>
              </h1>
              <p className="text-gray-500 mt-2 text-sm font-medium">Buy, sell, or rent items exclusively within the society.</p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <Link href="/admin" className="flex-1 sm:flex-initial px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-sm text-center">
                Back to Admin
              </Link>
              <button className="flex-1 sm:flex-initial px-5 py-2.5 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors shadow-sm text-sm flex items-center justify-center gap-2">
                <Plus size={16} /> Post Listing
              </button>
            </div>
          </div>

          {/* Stats & Filters */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-6 md:mb-8 items-start md:items-center justify-between">
            <div className="flex gap-4 w-full md:w-auto">
              <div className="flex-1 md:flex-initial bg-white px-4 md:px-6 py-3 md:py-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3 md:gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-amber-50 flex items-center justify-center"><Tag className="text-amber-600" size={18} /></div>
                <div>
                  <p className="text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider">Active</p>
                  <p className="text-lg md:text-xl font-bold text-gray-900">42</p>
                </div>
              </div>
              <div className="flex-1 md:flex-initial bg-white px-4 md:px-6 py-3 md:py-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3 md:gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-emerald-50 flex items-center justify-center"><ShieldCheck className="text-emerald-600" size={18} /></div>
                <div>
                  <p className="text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider">Sold</p>
                  <p className="text-lg md:text-xl font-bold text-gray-900">128</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-72">
                <Search size={16} className="absolute left-3 top-3 text-gray-400" />
                <input type="text" placeholder="Search items..." className="w-full pl-9 pr-4 py-2.5 text-sm font-medium border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm" />
              </div>
              <button className="flex items-center justify-center w-11 h-11 text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 shadow-sm transition-colors shrink-0">
                <Filter size={18} />
              </button>
            </div>
          </div>

          {/* Marketplace Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {items.map(item => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="relative h-40 sm:h-48 w-full overflow-hidden bg-gray-100">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  {item.status === 'Sold' && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                      <span className="bg-white text-gray-900 font-black tracking-widest uppercase px-4 py-2 rounded-lg transform -rotate-12 shadow-lg text-sm">SOLD OUT</span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <button className="w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-gray-400 hover:text-rose-500 hover:bg-white shadow-sm transition-colors">
                      <Heart size={16} />
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-3 flex gap-2">
                    <span className="bg-black/70 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">{item.category}</span>
                  </div>
                </div>
                
                <div className="p-4 md:p-5">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="text-base md:text-lg font-bold text-gray-900 line-clamp-1">{item.title}</h3>
                    <span className="text-base md:text-lg font-black text-amber-600 shrink-0">{item.price}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3 md:mb-4">
                    <span className="text-[10px] md:text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded">{item.condition}</span>
                    <span className="text-[10px] md:text-xs text-gray-400">• {item.date}</span>
                  </div>

                  <div className="h-px w-full bg-gray-100 mb-3 md:mb-4"></div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center font-bold text-[10px] md:text-xs shadow-sm">
                        {item.seller.charAt(0)}
                      </div>
                      <div>
                        <p className="text-[10px] md:text-xs font-bold text-gray-900">{item.seller}</p>
                        <p className="text-[9px] md:text-[10px] font-medium text-gray-500">Flat {item.flat}</p>
                      </div>
                    </div>
                    
                    <button disabled={item.status === 'Sold'} className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors shadow-sm ${item.status === 'Sold' ? 'bg-gray-100 text-gray-300' : 'bg-gray-900 text-white hover:bg-black'}`}>
                      <MessageCircle size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
