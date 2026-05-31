'use client';
import React from 'react';
import Header from '../../components/Header';

export default function TermsOfServicePage() {
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
              Terms of Service
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
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  By accessing or using Society Management ("the Service"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the Service.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">2. Description of Service</h2>
                <p className="text-gray-600 leading-relaxed">
                  Society Management provides a comprehensive platform for residential society management, including visitor management, amenity booking, complaint tracking, billing, and other related services. We reserve the right to modify, suspend, or discontinue the Service at any time without prior notice.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">3. User Accounts</h2>
                <h3 className="text-xl font-bold text-gray-900 mb-3">3.1 Account Registration</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>You must provide accurate and complete information</li>
                  <li>You are responsible for maintaining account security</li>
                  <li>You must notify us of unauthorized access</li>
                  <li>You are responsible for all activities under your account</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">3.2 Account Termination</h3>
                <p className="text-gray-600 leading-relaxed">
                  We reserve the right to suspend or terminate your account at any time for violation of these terms or for any other reason at our sole discretion.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">4. User Responsibilities</h2>
                <p className="text-gray-600 leading-relaxed mb-4">As a user, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Use the Service for lawful purposes only</li>
                  <li>Not interfere with the Service's operation</li>
                  <li>Not attempt to gain unauthorized access</li>
                  <li>Not transmit viruses or malicious code</li>
                  <li>Not harass, abuse, or harm other users</li>
                  <li>Not violate any applicable laws or regulations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">5. Privacy Policy</h2>
                <p className="text-gray-600 leading-relaxed">
                  Your use of the Service is also governed by our Privacy Policy, which describes how we collect, use, and protect your information. Please review our Privacy Policy carefully.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">6. Payment Terms</h2>
                <h3 className="text-xl font-bold text-gray-900 mb-3">6.1 Subscription Fees</h3>
                <p className="text-gray-600 leading-relaxed">
                  Certain features of the Service may require payment of subscription fees. All fees are non-refundable unless otherwise specified.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">6.2 Billing</h3>
                <p className="text-gray-600 leading-relaxed">
                  You agree to provide accurate billing information and authorize us to charge your chosen payment method for the selected subscription plan.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mb-3 mt-6">6.3 Cancellation</h3>
                <p className="text-gray-600 leading-relaxed">
                  You may cancel your subscription at any time. Cancellation will take effect at the end of the current billing period.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">7. Intellectual Property</h2>
                <p className="text-gray-600 leading-relaxed">
                  All content, features, and functionality of the Service are owned by Society Management and are protected by international copyright, trademark, and other intellectual property laws. You may not reproduce, modify, or distribute any content without our express written permission.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">8. Limitation of Liability</h2>
                <p className="text-gray-600 leading-relaxed">
                  To the fullest extent permitted by law, Society Management shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">9. Indemnification</h2>
                <p className="text-gray-600 leading-relaxed">
                  You agree to indemnify and hold harmless Society Management from any claims arising from your use of the Service or violation of these terms.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">10. Governing Law</h2>
                <p className="text-gray-600 leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in Noida, Uttar Pradesh.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">11. Changes to Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new terms on this page. Your continued use of the Service after such modifications constitutes acceptance of the new terms.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">12. Contact Information</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Email: legal@societymanagement.com</li>
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
            <p>© 2024 Society Management. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
