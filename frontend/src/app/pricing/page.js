'use client';
import React from 'react';
import Header from '../../components/Header';

export default function PricingPage() {
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
              Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, transparent pricing for societies of all sizes
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
                <p className="text-gray-600 mb-6">For small societies</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-extrabold text-gray-900">₹999</span>
                  <span className="text-xl text-gray-600 ml-2">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Up to 50 units</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">Basic security features</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">Visitor management</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">Complaint tracking</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">Notice board</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">Basic reports</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <span className="mr-3">✗</span>
                  <span>Amenity booking</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <span className="mr-3">✗</span>
                  <span>IoT integration</span>
                </li>
              </ul>

              <button className="w-full py-4 bg-gray-100 text-gray-900 font-bold rounded-2xl hover:bg-gray-200 transition-colors">
                Get Started
              </button>
            </div>

            {/* Professional Plan */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl transform scale-105">
              <div className="text-center mb-8">
                <div className="inline-block bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full mb-4">
                  MOST POPULAR
                </div>
                <h3 className="text-2xl font-bold mb-2">Professional</h3>
                <p className="text-indigo-200 mb-6">For growing societies</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-extrabold">₹2,499</span>
                  <span className="text-xl text-indigo-200 ml-2">/month</span>
                </div>
                <p className="text-sm text-indigo-200 mt-2">Up to 200 units</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <span className="text-yellow-400 mr-3">✓</span>
                  <span>All Starter features</span>
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-400 mr-3">✓</span>
                  <span>Amenity booking</span>
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-400 mr-3">✓</span>
                  <span>Billing & payments</span>
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-400 mr-3">✓</span>
                  <span>Staff management</span>
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-400 mr-3">✓</span>
                  <span>Advanced reports</span>
                </li>
                <li className="flex items-center">
                  <span className="text-yellow-400 mr-3">✓</span>
                  <span>Mobile app</span>
                </li>
                <li className="flex items-center text-indigo-300">
                  <span className="mr-3">✗</span>
                  <span>IoT integration</span>
                </li>
              </ul>

              <button className="w-full py-4 bg-white text-indigo-600 font-bold rounded-2xl hover:bg-indigo-50 transition-colors">
                Get Started
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <p className="text-gray-600 mb-6">For large societies</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-extrabold text-gray-900">₹4,999</span>
                  <span className="text-xl text-gray-600 ml-2">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Unlimited units</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">All Professional features</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">IoT integration</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">CCTV integration</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">Custom integrations</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">Dedicated support</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">SLA guarantee</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">On-site training</span>
                </li>
              </ul>

              <button className="w-full py-4 bg-gray-100 text-gray-900 font-bold rounded-2xl hover:bg-gray-200 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Feature Comparison</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Compare all plans side by side
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Starter</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-indigo-600">Professional</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-700">Max Units</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">50</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">200</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">Unlimited</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-700">Security Features</td>
                  <td className="px-6 py-4 text-center text-green-500">✓</td>
                  <td className="px-6 py-4 text-center text-green-500">✓</td>
                  <td className="px-6 py-4 text-center text-green-500">✓</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-700">Visitor Management</td>
                  <td className="px-6 py-4 text-center text-green-500">✓</td>
                  <td className="px-6 py-4 text-center text-green-500">✓</td>
                  <td className="px-6 py-4 text-center text-green-500">✓</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-700">Amenity Booking</td>
                  <td className="px-6 py-4 text-center text-red-500">✗</td>
                  <td className="px-6 py-4 text-center text-green-500">✓</td>
                  <td className="px-6 py-4 text-center text-green-500">✓</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-700">Billing & Payments</td>
                  <td className="px-6 py-4 text-center text-red-500">✗</td>
                  <td className="px-6 py-4 text-center text-green-500">✓</td>
                  <td className="px-6 py-4 text-center text-green-500">✓</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-700">IoT Integration</td>
                  <td className="px-6 py-4 text-center text-red-500">✗</td>
                  <td className="px-6 py-4 text-center text-red-500">✗</td>
                  <td className="px-6 py-4 text-center text-green-500">✓</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-700">CCTV Integration</td>
                  <td className="px-6 py-4 text-center text-red-500">✗</td>
                  <td className="px-6 py-4 text-center text-red-500">✗</td>
                  <td className="px-6 py-4 text-center text-green-500">✓</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-700">Dedicated Support</td>
                  <td className="px-6 py-4 text-center text-red-500">✗</td>
                  <td className="px-6 py-4 text-center text-red-500">✗</td>
                  <td className="px-6 py-4 text-center text-green-500">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Can I change my plan later?</h3>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Is there a free trial?</h3>
              <p className="text-gray-600">Yes, we offer a 14-day free trial on all plans. No credit card required.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-gray-900 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept all major credit cards, debit cards, UPI, and net banking.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Is there a setup fee?</h3>
              <p className="text-gray-600">No, there are no setup fees. You only pay your monthly subscription.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-indigo-200 mb-10">
            Start your free trial today. No credit card required.
          </p>
          <button className="px-10 py-5 bg-white text-indigo-600 font-bold text-xl rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
            Start Free Trial
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
            <p>© 2026 Society Management. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
