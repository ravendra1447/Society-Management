'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import AppLayout from '../components/AppLayout';

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('society_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // If user is logged in, show dashboard
  if (user) {
    const role = user.role;
    const canSee = (module) => {
      if (role === 'Admin') return true;
      
      const permissions = {
        'Facility Manager': ['staff', 'vendor', 'stock', 'notices', 'iot', 'maids', 'relocation', 'documents', 'parking', 'fm-daily-work'],
        'Security Guard': ['visitor', 'vehicle', 'vendor', 'cctv', 'maids', 'patrol', 'parking'],
        'Electrician': ['stock', 'complaints', 'iot'],
        'Plumber': ['stock', 'complaints', 'iot'],
        'Housekeeping Supvr': ['staff', 'stock', 'maids'],
        'Resident': ['complaints', 'notices', 'billing', 'amenities', 'classifieds', 'polls', 'visitor', 'sos', 'maids', 'relocation', 'documents', 'forum']
      };

      return permissions[role]?.includes(module) || false;
    };

    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-transparent p-8">
          <div className="text-center opacity-50">
            <span className="text-6xl block mb-4">🏢</span>
            <h1 className="text-3xl font-light text-gray-500 mb-2">Welcome to Society App</h1>
            <p className="text-lg text-gray-400 font-medium">{user?.name || 'Resident'}</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  // If user is not logged in, show landing page
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header onMenuClick={() => {}} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl mb-8 shadow-2xl text-white text-5xl">
              🏢
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6">
              Society Management
              <span className="block bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              Transform your residential community with our intelligent society management system. 
              Streamline operations, enhance security, and build a better connected community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/register')}
                className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Get Started Free →
              </button>
              <button
                onClick={() => router.push('/login')}
                className="px-8 py-4 bg-white text-indigo-600 font-bold text-lg rounded-2xl border-2 border-indigo-500 hover:bg-indigo-50 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Login to Dashboard
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive features designed for modern residential societies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-100 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-3xl">🔐</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Secure Access</h3>
              <p className="text-gray-600 leading-relaxed">
                Advanced security features with visitor management, gate controls, and real-time monitoring for complete peace of mind.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-3xl border border-green-100 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Smart Dashboard</h3>
              <p className="text-gray-600 leading-relaxed">
                Intuitive dashboard with real-time analytics, reports, and insights to manage your society efficiently.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-3xl border border-purple-100 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-3xl">👥</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Resident Portal</h3>
              <p className="text-gray-600 leading-relaxed">
                Self-service portal for residents to manage complaints, bookings, notices, and community activities.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-3xl border border-yellow-100 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Billing & Payments</h3>
              <p className="text-gray-600 leading-relaxed">
                Automated billing system with online payment options, invoice generation, and payment tracking.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 rounded-3xl border border-red-100 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-3xl">📋</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Complaint Management</h3>
              <p className="text-gray-600 leading-relaxed">
                Streamlined complaint tracking and resolution system with automated notifications and status updates.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-8 rounded-3xl border border-cyan-100 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-3xl">🏊</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Amenity Booking</h3>
              <p className="text-gray-600 leading-relaxed">
                Easy online booking for society amenities like clubhouse, pool, gym, and event spaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-extrabold text-white mb-2">500+</div>
              <div className="text-indigo-200 font-semibold">Societies Managed</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold text-white mb-2">50K+</div>
              <div className="text-indigo-200 font-semibold">Happy Residents</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold text-white mb-2">99.9%</div>
              <div className="text-indigo-200 font-semibold">Uptime</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold text-white mb-2">24/7</div>
              <div className="text-indigo-200 font-semibold">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
            Ready to Transform Your Society?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Join hundreds of societies already using our platform to create better communities.
          </p>
          <button
            onClick={() => router.push('/register')}
            className="px-10 py-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Start Your Free Trial
          </button>
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
            <p>© 2024 Society Management. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
