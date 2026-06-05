'use client';
import React from 'react';
import Header from '../../components/Header';

export default function CookiePolicyPage() {
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
              Cookie Policy
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Last updated: May 31, 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">1. What Are Cookies</h2>
                <p className="text-gray-600 leading-relaxed">
                  Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our Service.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">2. How We Use Cookies</h2>
                <p className="text-gray-600 leading-relaxed mb-4">We use cookies for the following purposes:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                  <li><strong>Performance Cookies:</strong> Help us understand how visitors use our website</li>
                  <li><strong>Functionality Cookies:</strong> Remember your preferences and settings</li>
                  <li><strong>Targeting Cookies:</strong> Deliver relevant advertisements and content</li>
                </ul>
              </div>

              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">3. Types of Cookies We Use</h2>
                <h3 className="text-xl font-bold text-gray-900 mb-3">3.1 Session Cookies</h3>
                <p className="text-gray-600 leading-relaxed">
                  These are temporary cookies that expire when you close your browser. They help maintain your session while you navigate the website.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">3.2 Persistent Cookies</h3>
                <p className="text-gray-600 leading-relaxed">
                  These cookies remain on your device for a set period or until you delete them. They help remember your preferences for future visits.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">3.3 Third-Party Cookies</h3>
                <p className="text-gray-600 leading-relaxed">
                  We may use third-party services that set cookies on your device for analytics, advertising, and other purposes.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">4. Managing Cookies</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You can control and manage cookies in various ways:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Browser settings to accept or reject cookies</li>
                  <li>Cookie consent banner on our website</li>
                  <li>Deleting cookies from your browser</li>
                  <li>Opting out of third-party cookies</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-4">
                  Please note that disabling cookies may affect the functionality of our website and your user experience.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">5. Third-Party Services</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We use the following third-party services that may use cookies:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li><strong>Google Analytics:</strong> For website analytics and usage tracking</li>
                  <li><strong>Payment Gateways:</strong> For secure payment processing</li>
                  <li><strong>Social Media:</strong> For social sharing and login</li>
                  <li><strong>Advertising Networks:</strong> For targeted advertising</li>
                </ul>
              </div>

              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">6. Your Choices</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You have the following options regarding cookies:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Accept all cookies</li>
                  <li>Reject non-essential cookies</li>
                  <li>Manage cookie preferences through our consent banner</li>
                  <li>Opt out of targeted advertising</li>
                </ul>
              </div>

              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">7. Updates to Cookie Policy</h2>
                <p className="text-gray-600 leading-relaxed">
                  We may update this Cookie Policy from time to time to reflect changes in our use of cookies or for legal reasons. We will notify you of any significant changes by posting the updated policy on this page.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">8. Contact Us</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  If you have any questions about our use of cookies, please contact us:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Email: privacy@societymanagement.com</li>
                  <li>Phone: +91 98765 43210</li>
                  <li>Address: 123 Tech Park, Sector 62, Noida, Uttar Pradesh 201309, India</li>
                </ul>
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
