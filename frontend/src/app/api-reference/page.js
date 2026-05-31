'use client';
import React, { useState } from 'react';
import Header from '../../components/Header';

export default function APIReferencePage() {
  const [activeEndpoint, setActiveEndpoint] = useState('authentication');

  const endpoints = [
    {
      id: 'authentication',
      title: 'Authentication',
      method: 'POST',
      path: '/api/auth/login',
      description: 'Authenticate user and return access token',
      parameters: [
        { name: 'username', type: 'string', required: true, description: 'User username or email' },
        { name: 'password', type: 'string', required: true, description: 'User password' }
      ],
      response: {
        token: 'string',
        user: {
          id: 'string',
          name: 'string',
          email: 'string',
          role: 'string'
        }
      }
    },
    {
      id: 'visitors',
      title: 'Create Visitor',
      method: 'POST',
      path: '/api/visitors',
      description: 'Create a new visitor pass',
      parameters: [
        { name: 'name', type: 'string', required: true, description: 'Visitor full name' },
        { name: 'phone', type: 'string', required: true, description: 'Visitor phone number' },
        { name: 'purpose', type: 'string', required: true, description: 'Purpose of visit' },
        { name: 'expected_time', type: 'datetime', required: false, description: 'Expected arrival time' }
      ],
      response: {
        id: 'string',
        qr_code: 'string',
        status: 'string'
      }
    },
    {
      id: 'bookings',
      title: 'Create Booking',
      method: 'POST',
      path: '/api/bookings',
      description: 'Book a society amenity',
      parameters: [
        { name: 'amenity_id', type: 'string', required: true, description: 'ID of the amenity' },
        { name: 'date', type: 'date', required: true, description: 'Booking date' },
        { name: 'start_time', type: 'time', required: true, description: 'Start time' },
        { name: 'end_time', type: 'time', required: true, description: 'End time' }
      ],
      response: {
        id: 'string',
        amenity: 'string',
        date: 'string',
        status: 'confirmed'
      }
    },
    {
      id: 'complaints',
      title: 'Create Complaint',
      method: 'POST',
      path: '/api/complaints',
      description: 'Lodge a new complaint',
      parameters: [
        { name: 'category', type: 'string', required: true, description: 'Complaint category' },
        { name: 'description', type: 'string', required: true, description: 'Complaint details' },
        { name: 'priority', type: 'string', required: false, description: 'Priority level (low, medium, high)' },
        { name: 'attachments', type: 'array', required: false, description: 'Array of image URLs' }
      ],
      response: {
        id: 'string',
        status: 'pending',
        created_at: 'datetime'
      }
    },
    {
      id: 'bills',
      title: 'Get Bills',
      method: 'GET',
      path: '/api/bills',
      description: 'Retrieve all bills for the user',
      parameters: [],
      response: [
        {
          id: 'string',
          amount: 'number',
          due_date: 'date',
          status: 'string',
          items: 'array'
        }
      ]
    },
    {
      id: 'notices',
      title: 'Get Notices',
      method: 'GET',
      path: '/api/notices',
      description: 'Retrieve society notices and announcements',
      parameters: [
        { name: 'limit', type: 'integer', required: false, description: 'Number of notices to return' },
        { name: 'offset', type: 'integer', required: false, description: 'Pagination offset' }
      ],
      response: [
        {
          id: 'string',
          title: 'string',
          content: 'string',
          created_at: 'datetime',
          priority: 'string'
        }
      ]
    }
  ];

  const activeData = endpoints.find(e => e.id === activeEndpoint);

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
              API Reference
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              RESTful API documentation for integrating with Society Management
            </p>
          </div>
        </div>
      </section>

      {/* API Info */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Base URL</h3>
              <code className="text-sm bg-white px-3 py-2 rounded-lg block">
                https://api.societymanagement.com/v1
              </code>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Authentication</h3>
              <p className="text-sm text-gray-600">Bearer token in Authorization header</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Rate Limit</h3>
              <p className="text-sm text-gray-600">1000 requests per hour</p>
            </div>
          </div>
        </div>
      </section>

      {/* Endpoints */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Endpoints</h3>
                <nav className="space-y-2">
                  {endpoints.map(endpoint => (
                    <button
                      key={endpoint.id}
                      onClick={() => setActiveEndpoint(endpoint.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                        activeEndpoint === endpoint.id
                          ? 'bg-indigo-600 text-white font-semibold'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className={`inline-block px-2 py-1 rounded text-xs font-bold mr-2 ${
                        endpoint.method === 'POST' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                      }`}>
                        {endpoint.method}
                      </span>
                      {endpoint.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              {activeData && (
                <div className="space-y-6">
                  {/* Endpoint Header */}
                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className={`px-4 py-2 rounded-lg text-white font-bold ${
                        activeData.method === 'POST' ? 'bg-green-500' : 'bg-blue-500'
                      }`}>
                        {activeData.method}
                      </span>
                      <code className="text-xl text-gray-900 font-mono">{activeData.path}</code>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{activeData.title}</h2>
                    <p className="text-gray-600">{activeData.description}</p>
                  </div>

                  {/* Parameters */}
                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Parameters</h3>
                    {activeData.parameters.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-3 px-4 font-bold text-gray-900">Name</th>
                              <th className="text-left py-3 px-4 font-bold text-gray-900">Type</th>
                              <th className="text-left py-3 px-4 font-bold text-gray-900">Required</th>
                              <th className="text-left py-3 px-4 font-bold text-gray-900">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {activeData.parameters.map((param, index) => (
                              <tr key={index} className="border-b border-gray-100">
                                <td className="py-3 px-4">
                                  <code className="text-indigo-600 font-mono">{param.name}</code>
                                </td>
                                <td className="py-3 px-4">
                                  <code className="text-gray-600 font-mono">{param.type}</code>
                                </td>
                                <td className="py-3 px-4">
                                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                                    param.required ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                                  }`}>
                                    {param.required ? 'Yes' : 'No'}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-gray-600">{param.description}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-gray-600">No parameters required</p>
                    )}
                  </div>

                  {/* Response */}
                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Response</h3>
                    <pre className="bg-gray-900 text-green-400 p-6 rounded-xl overflow-x-auto text-sm">
                      {JSON.stringify(activeData.response, null, 2)}
                    </pre>
                  </div>

                  {/* Example */}
                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Example Request</h3>
                    <pre className="bg-gray-900 text-blue-400 p-6 rounded-xl overflow-x-auto text-sm">
{`curl -X ${activeData.method} https://api.societymanagement.com/v1${activeData.path} \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(
    Object.fromEntries(
      activeData.parameters.filter(p => p.required).map(p => [p.name, p.type === 'string' ? 'example' : p.type])
    )
  , null, 2)}'`}
                    </pre>
                  </div>
                </div>
              )}
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
