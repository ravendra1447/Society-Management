'use client';
import React from 'react';
import Header from '../../components/Header';

export default function PrivacyPolicyPage() {
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
              Privacy Policy
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
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-600 leading-relaxed">
                  Society Management ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our society management platform.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">2. Information We Collect</h2>
                <h3 className="text-xl font-bold text-gray-900 mb-3">2.1 Personal Information</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Name and contact information (email, phone, address)</li>
                  <li>Society and residential details</li>
                  <li>Vehicle information</li>
                  <li>Payment information</li>
                  <li>Visitor information</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">2.2 Usage Information</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Log data and device information</li>
                  <li>Usage patterns and preferences</li>
                  <li>Booking history and complaints</li>
                  <li>Interaction with features and services</li>
                </ul>
              </div>

              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">3. How We Use Your Information</h2>
                <p className="text-gray-600 leading-relaxed mb-4">We use your information to:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Provide and maintain our services</li>
                  <li>Process transactions and payments</li>
                  <li>Send you notifications and updates</li>
                  <li>Improve our services and user experience</li>
                  <li>Comply with legal obligations</li>
                  <li>Prevent fraud and ensure security</li>
                </ul>
              </div>

              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">4. Information Sharing</h2>
                <p className="text-gray-600 leading-relaxed mb-4">We may share your information with:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Your society management and authorized personnel</li>
                  <li>Service providers who assist our operations</li>
                  <li>Payment processors for transaction processing</li>
                  <li>Legal authorities when required by law</li>
                  <li>Third parties with your explicit consent</li>
                </ul>
              </div>

              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">5. Data Security</h2>
                <p className="text-gray-600 leading-relaxed">
                  We implement industry-standard security measures to protect your information, including encryption, secure servers, and access controls. However, no method of transmission over the internet is 100% secure.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">6. Your Rights</h2>
                <p className="text-gray-600 leading-relaxed mb-4">You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Delete your personal information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </div>

              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">7. Cookies</h2>
                <p className="text-gray-600 leading-relaxed">
                  We use cookies and similar technologies to improve your experience, analyze usage, and assist in marketing efforts. You can control cookie settings through your browser preferences.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">8. Third-Party Services</h2>
                <p className="text-gray-600 leading-relaxed">
                  Our platform may contain links to third-party websites. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">9. Changes to This Policy</h2>
                <p className="text-gray-600 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">10. Contact Us</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
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
