'use client';
import React, { useState } from 'react';
import Header from '../../components/Header';

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState('getting-started');

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: '🚀',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h3>
            <p className="text-gray-600 leading-relaxed">
              Society Management is a comprehensive platform designed to streamline residential society operations. 
              This documentation will guide you through setting up and using all features of the platform.
            </p>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Account Setup</h3>
            <ol className="list-decimal list-inside space-y-3 text-gray-600">
              <li>Click on the Register button in the header</li>
              <li>Fill in your personal details (name, email, phone)</li>
              <li>Enter your society information</li>
              <li>Create a secure password</li>
              <li>Verify your email through the confirmation link</li>
              <li>Log in to access your dashboard</li>
            </ol>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Dashboard Overview</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              The dashboard is your central hub for managing all society operations. Key sections include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li><strong>Visitor Management:</strong> Add and manage visitors</li>
              <li><strong>Amenity Booking:</strong> Book society facilities</li>
              <li><strong>Complaints:</strong> Lodge and track complaints</li>
              <li><strong>Billing:</strong> View and pay bills</li>
              <li><strong>Notices:</strong> View society announcements</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'security',
      title: 'Security Features',
      icon: '🔐',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Visitor Management</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              The visitor management system allows you to control who enters your society premises.
            </p>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Adding a Visitor</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Go to Visitor Management in your dashboard</li>
              <li>Click "Add Visitor"</li>
              <li>Enter visitor details (name, phone, purpose)</li>
              <li>Set expected arrival time</li>
              <li>Submit to generate QR code</li>
            </ol>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Pre-approved Visitors</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              For frequent visitors, you can create a pre-approved list:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Add visitors to your pre-approved list</li>
              <li>Set validity period for each visitor</li>
              <li>Visitors can enter without prior approval</li>
              <li>Manage and remove visitors as needed</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Vehicle Management</h3>
            <p className="text-gray-600 leading-relaxed">
              Register your vehicles for seamless entry and exit tracking. 
              Add vehicle details including registration number, type, and parking slot.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'amenities',
      title: 'Amenity Booking',
      icon: '📅',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Booking Facilities</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Book society amenities like clubhouse, pool, gym, and event spaces online.
            </p>
            <h4 className="text-xl font-bold text-gray-900 mb-3">How to Book</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Navigate to Amenity Booking</li>
              <li>Select the facility you want to book</li>
              <li>Choose your preferred date and time</li>
              <li>Review booking details</li>
              <li>Confirm booking</li>
            </ol>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Booking Rules</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Maximum booking duration: 4 hours per session</li>
              <li>Advance booking: Up to 7 days</li>
              <li>Cancellation: Up to 24 hours before</li>
              <li>No-show policy: May affect future bookings</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Viewing Bookings</h3>
            <p className="text-gray-600 leading-relaxed">
              All your bookings are listed in the Amenity Booking section. 
              You can view upcoming bookings, past history, and cancel bookings if needed.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'billing',
      title: 'Billing & Payments',
      icon: '💰',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Viewing Bills</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Access all your society bills in the Billing section:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Monthly maintenance charges</li>
              <li>Parking fees</li>
              <li>Amenity usage charges</li>
              <li>Other miscellaneous charges</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Making Payments</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Select the bill you want to pay</li>
              <li>Choose payment method</li>
              <li>Complete payment</li>
              <li>Download receipt</li>
            </ol>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Payment Methods</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              We support multiple payment methods:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Credit/Debit Cards</li>
              <li>UPI (Unified Payments Interface)</li>
              <li>Net Banking</li>
              <li>Wallets (Paytm, PhonePe, etc.)</li>
              <li>Auto-pay setup for recurring payments</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Payment History</h3>
            <p className="text-gray-600 leading-relaxed">
              View your complete payment history including dates, amounts, and payment methods. 
              Download receipts for any past payment.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'complaints',
      title: 'Complaint Management',
      icon: '📋',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Lodging a Complaint</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Report issues to society management for quick resolution:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Go to Complaints section</li>
              <li>Click "New Complaint"</li>
              <li>Select category (electrical, plumbing, etc.)</li>
              <li>Describe the issue in detail</li>
              <li>Attach photos if applicable</li>
              <li>Submit complaint</li>
            </ol>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Tracking Status</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Track your complaint through these stages:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li><strong>Pending:</strong> Complaint submitted, awaiting review</li>
              <li><strong>In Progress:</strong> Being worked on by maintenance team</li>
              <li><strong>Resolved:</strong> Issue has been fixed</li>
              <li><strong>Closed:</strong> Complaint completed and verified</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Response Time</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Emergency issues: Within 4 hours</li>
              <li>High priority: Within 24 hours</li>
              <li>Normal priority: Within 48 hours</li>
              <li>Low priority: Within 72 hours</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'mobile-app',
      title: 'Mobile App',
      icon: '📱',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Downloading the App</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              The Society Management mobile app is available for both iOS and Android:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>iOS: Download from App Store</li>
              <li>Android: Download from Google Play Store</li>
              <li>Search for "Society Management"</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">App Features</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              The mobile app offers all web features plus:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Push notifications for updates</li>
              <li>QR code generation for visitors</li>
              <li>Offline mode for basic features</li>
              <li>Biometric login support</li>
              <li>Quick access to frequently used features</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">App Requirements</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>iOS: Version 12.0 or later</li>
              <li>Android: Version 8.0 or later</li>
              <li>Stable internet connection</li>
              <li>50MB free storage space</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

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
              Documentation
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive guides to help you get the most out of Society Management
            </p>
          </div>
        </div>
      </section>

      {/* Documentation Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Contents</h3>
                <nav className="space-y-2">
                  {sections.map(section => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                        activeSection === section.id
                          ? 'bg-indigo-600 text-white font-semibold'
                          : 'text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <span className="mr-2">{section.icon}</span>
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                {sections.find(s => s.id === activeSection)?.content}
              </div>
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
