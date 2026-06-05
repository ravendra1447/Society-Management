'use client';
import React from 'react';
import Header from '../../components/Header';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header onMenuClick={() => {}} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
              Features
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage your society efficiently
            </p>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Security & Access Control</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced security features to keep your community safe
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-100 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-3xl">🚪</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Gate Management</h3>
              <p className="text-gray-600 leading-relaxed">
                Digital gate passes, visitor logging, and real-time entry/exit tracking for complete security monitoring.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-3xl border border-green-100 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-3xl">👥</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Visitor Management</h3>
              <p className="text-gray-600 leading-relaxed">
                Pre-approved visitor lists, digital invitations, and instant notifications when visitors arrive.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-3xl border border-purple-100 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-3xl">🚗</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Vehicle Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Complete vehicle registry with parking slot management and automated entry/exit logging.
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-3xl border border-yellow-100 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-3xl">📹</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">CCTV Integration</h3>
              <p className="text-gray-600 leading-relaxed">
                Live camera feeds, recording management, and incident reporting with video evidence.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-3xl border border-red-100 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-3xl">🚨</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">SOS Alerts</h3>
              <p className="text-gray-600 leading-relaxed">
                Emergency alert system with instant notifications to security and management teams.
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-8 rounded-3xl border border-cyan-100 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-3xl">🔐</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Access Control</h3>
              <p className="text-gray-600 leading-relaxed">
                Role-based access control with customizable permissions for different user types.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resident Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Resident Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Self-service portal for residents
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-3xl">📝</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Complaints</h3>
              <p className="text-gray-600 leading-relaxed">
                Lodge and track complaints with photo uploads, status updates, and resolution notifications.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-3xl">📅</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Amenity Booking</h3>
              <p className="text-gray-600 leading-relaxed">
                Book clubhouse, pool, gym, and other amenities online with real-time availability.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Billing & Payments</h3>
              <p className="text-gray-600 leading-relaxed">
                View bills, make payments online, download invoices, and track payment history.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-3xl">📢</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Notices & Announcements</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive society notices, announcements, and important updates with push notifications.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-3xl">🏠</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Help Desk</h3>
              <p className="text-gray-600 leading-relaxed">
                Submit service requests for maintenance, repairs, and other household services.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Community Forum</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with neighbors, discuss community issues, and participate in polls and surveys.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Admin & Management</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Powerful tools for society administrators
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-100 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Dashboard</h3>
              <p className="text-gray-600 leading-relaxed">
                Real-time analytics, reports, and insights to monitor society operations at a glance.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-3xl border border-green-100 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-3xl">👨‍💼</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Staff Management</h3>
              <p className="text-gray-600 leading-relaxed">
                Manage staff attendance, duties, schedules, and performance tracking efficiently.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-3xl border border-purple-100 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-3xl">📦</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Inventory Management</h3>
              <p className="text-gray-600 leading-relaxed">
                Track stock, supplies, and equipment with automated reorder alerts and usage reports.
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-3xl border border-yellow-100 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-3xl">📋</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Vendor Management</h3>
              <p className="text-gray-600 leading-relaxed">
                Manage vendors, contracts, payments, and service quality ratings in one place.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-3xl border border-red-100 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-3xl">📈</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Reports & Analytics</h3>
              <p className="text-gray-600 leading-relaxed">
                Generate detailed reports on finances, operations, security, and resident activities.
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-8 rounded-3xl border border-cyan-100 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-3xl">⚙️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">IoT Integration</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect smart devices, sensors, and automation systems for intelligent society management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-xl">🏢</span>
                </div>
                <span className="text-xl font-bold">Society Management</span>
              </div>
              <p className="text-gray-400">
                Making residential communities smarter, safer, and more connected.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="/features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="/pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/help-center" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="/documentation" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="/api-reference" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="/status" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2026 Society Management. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
