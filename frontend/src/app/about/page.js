'use client';
import React from 'react';
import Header from '../../components/Header';

export default function AboutPage() {
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
              About Us
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transforming residential communities through intelligent technology
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded in 2020, Society Management was born from a simple observation: residential communities were struggling with outdated, paper-based processes that made daily operations inefficient and frustrating for everyone involved.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our founders, having experienced these challenges firsthand, set out to create a solution that would modernize society management while keeping it simple and accessible for everyone - from residents to security guards to facility managers.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Today, we're proud to serve over 500 societies across the country, helping them create safer, more efficient, and more connected communities.
              </p>
            </div>
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-12 text-white">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-5xl font-extrabold mb-2">500+</div>
                  <div className="text-indigo-200">Societies</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-extrabold mb-2">50K+</div>
                  <div className="text-indigo-200">Residents</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-extrabold mb-2">4+</div>
                  <div className="text-indigo-200">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-extrabold mb-2">99.9%</div>
                  <div className="text-indigo-200">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-white mb-4">Our Mission</h2>
            <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
              To empower residential communities with intelligent, easy-to-use technology that enhances security, simplifies operations, and fosters better connections among residents.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Security First</h3>
              <p className="text-gray-600 leading-relaxed">
                We prioritize the safety and security of residents above all else, implementing robust security measures in every feature.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-3xl border border-green-100">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Simplicity</h3>
              <p className="text-gray-600 leading-relaxed">
                Complex problems deserve simple solutions. We design intuitive interfaces that anyone can use without training.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-3xl border border-purple-100">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-600 leading-relaxed">
                We believe in building stronger communities. Our platform fosters connection and collaboration among residents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet the people behind Society Management
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                👨‍💼
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Rahul Sharma</h3>
              <p className="text-indigo-600 font-semibold mb-2">CEO & Founder</p>
              <p className="text-gray-600 text-sm">Visionary leader with 15+ years in tech</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                👩‍💻
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Priya Patel</h3>
              <p className="text-indigo-600 font-semibold mb-2">CTO</p>
              <p className="text-gray-600 text-sm">Tech expert specializing in scalable systems</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                👨‍🎨
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Amit Kumar</h3>
              <p className="text-indigo-600 font-semibold mb-2">Head of Design</p>
              <p className="text-gray-600 text-sm">Creating beautiful user experiences</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                👩‍💼
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Neha Singh</h3>
              <p className="text-indigo-600 font-semibold mb-2">Head of Operations</p>
              <p className="text-gray-600 text-sm">Ensuring smooth operations everywhere</p>
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
