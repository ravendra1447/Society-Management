'use client';
import React, { useState } from 'react';
import Header from '../../components/Header';

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      category: 'Getting Started',
      question: 'How do I create an account?',
      answer: 'To create an account, click on the Register button in the header. Fill in your details including name, email, phone number, and society information. You will receive a confirmation email to verify your account.'
    },
    {
      id: 2,
      category: 'Getting Started',
      question: 'How do I log in to my account?',
      answer: 'Click on the Login button in the header. Enter your username or email and password. If you have forgotten your password, click on "Forgot password?" to reset it.'
    },
    {
      id: 3,
      category: 'Security',
      question: 'How do I add a visitor?',
      answer: 'Go to the Visitor Management section in your dashboard. Click on "Add Visitor" and fill in the visitor details including name, phone number, purpose of visit, and expected arrival time. The visitor will receive a QR code for entry.'
    },
    {
      id: 4,
      category: 'Security',
      question: 'How do I pre-approve visitors?',
      answer: 'In the Visitor Management section, you can create a pre-approved visitor list. Add visitors who visit frequently and they will be automatically allowed entry without prior approval each time.'
    },
    {
      id: 5,
      category: 'Amenities',
      question: 'How do I book a facility?',
      answer: 'Navigate to the Amenity Booking section. Select the facility you want to book (clubhouse, pool, gym, etc.), choose your preferred date and time slot, and confirm your booking. You will receive a confirmation notification.'
    },
    {
      id: 6,
      category: 'Amenities',
      question: 'What is the cancellation policy?',
      answer: 'You can cancel your booking up to 24 hours before the scheduled time without any penalty. Cancellations made less than 24 hours before may incur a small fee depending on your society\'s policy.'
    },
    {
      id: 7,
      category: 'Billing',
      question: 'How do I view my bills?',
      answer: 'Go to the Billing section in your dashboard. You can view all your bills, download invoices, and check payment history. Bills are generated monthly and can be paid online.'
    },
    {
      id: 8,
      category: 'Billing',
      question: 'What payment methods are accepted?',
      answer: 'We accept all major credit cards, debit cards, UPI, net banking, and wallet payments. You can also set up auto-pay for automatic bill payments.'
    },
    {
      id: 9,
      category: 'Complaints',
      question: 'How do I lodge a complaint?',
      answer: 'Go to the Complaints section and click on "New Complaint". Select the category, describe the issue, attach photos if needed, and submit. You will receive updates on the status of your complaint.'
    },
    {
      id: 10,
      category: 'Complaints',
      question: 'How do I track my complaint status?',
      answer: 'All your complaints are listed in the Complaints section with their current status (Pending, In Progress, Resolved). You will also receive notifications when there are updates to your complaint.'
    },
    {
      id: 11,
      category: 'Technical',
      question: 'I forgot my password. What should I do?',
      answer: 'Click on "Forgot password?" on the login page. Enter your registered email address, and we will send you a password reset link. Follow the instructions in the email to reset your password.'
    },
    {
      id: 12,
      category: 'Technical',
      question: 'The app is not loading. What should I do?',
      answer: 'First, check your internet connection. Clear your browser cache and cookies. If the problem persists, try using a different browser or contact our support team for assistance.'
    }
  ];

  const categories = [...new Set(faqs.map(faq => faq.category))];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

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
              Help Center
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Find answers to common questions and get help with Society Management
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for help..."
                  className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none text-lg shadow-lg"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <span className="text-2xl text-gray-400">🔍</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Getting Started</h3>
              <p className="text-gray-600 text-sm">Learn the basics of using Society Management</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🔐</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Security</h3>
              <p className="text-gray-600 text-sm">Visitor management and access control</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Amenities</h3>
              <p className="text-gray-600 text-sm">Book facilities and manage reservations</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-100 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Billing</h3>
              <p className="text-gray-600 text-sm">Payments, invoices, and billing help</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Browse our most common questions and answers
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors"
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSearchQuery(category)}
                className="px-4 py-2 bg-white text-gray-700 rounded-full font-semibold border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFaqs.map(faq => (
              <div key={faq.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 text-xs font-bold rounded-full mb-2">
                      {faq.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900">{faq.question}</h3>
                  </div>
                  <span className={`text-2xl transform transition-transform ${expandedFaq === faq.id ? 'rotate-180' : ''}`}>
                    {expandedFaq === faq.id ? '▼' : '▶'}
                  </span>
                </button>
                {expandedFaq === faq.id && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">🔍</span>
              <p className="text-xl text-gray-600">No results found for "{searchQuery}"</p>
              <p className="text-gray-500 mt-2">Try searching for something else</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Still Need Help?</h2>
            <p className="text-xl text-gray-600">
              Can't find what you're looking for? Contact our support team
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📧</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 mb-4">support@societymanagement.com</p>
              <a href="mailto:support@societymanagement.com" className="text-indigo-600 font-semibold hover:text-indigo-800">
                Send Email →
              </a>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📞</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">+91 98765 43210</p>
              <a href="tel:+919876543210" className="text-indigo-600 font-semibold hover:text-indigo-800">
                Call Now →
              </a>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Available 24/7</p>
              <button className="text-indigo-600 font-semibold hover:text-indigo-800">
                Start Chat →
              </button>
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
