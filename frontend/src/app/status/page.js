'use client';
import React from 'react';
import Header from '../../components/Header';

export default function StatusPage() {
  const services = [
    {
      name: 'API Services',
      status: 'operational',
      uptime: '99.99%',
      description: 'Core API endpoints for all platform features'
    },
    {
      name: 'Web Application',
      status: 'operational',
      uptime: '99.95%',
      description: 'Main web application and dashboard'
    },
    {
      name: 'Mobile App API',
      status: 'operational',
      uptime: '99.98%',
      description: 'API endpoints for mobile applications'
    },
    {
      name: 'Database',
      status: 'operational',
      uptime: '99.99%',
      description: 'Primary database cluster'
    },
    {
      name: 'Authentication Service',
      status: 'operational',
      uptime: '100%',
      description: 'User authentication and authorization'
    },
    {
      name: 'Payment Gateway',
      status: 'operational',
      uptime: '99.97%',
      description: 'Payment processing and billing'
    },
    {
      name: 'Notification Service',
      status: 'degraded',
      uptime: '99.90%',
      description: 'Push notifications and email alerts'
    },
    {
      name: 'File Storage',
      status: 'operational',
      uptime: '99.99%',
      description: 'Document and image storage'
    }
  ];

  const incidents = [
    {
      id: 1,
      title: 'Notification Service Delay',
      status: 'investigating',
      date: 'May 31, 2026',
      description: 'We are currently investigating delays in push notification delivery. Some users may experience delayed notifications.',
      updates: [
        { time: '10:30 AM', message: 'Investigating the issue with notification service' },
        { time: '10:15 AM', 'message': 'Identified potential cause in message queue' }
      ]
    },
    {
      id: 2,
      title: 'Scheduled Maintenance',
      status: 'completed',
      date: 'May 28, 2026',
      description: 'Scheduled database maintenance completed successfully.',
      updates: [
        { time: '2:00 AM', message: 'Maintenance completed successfully' },
        { time: '1:00 AM', message: 'Maintenance in progress' }
      ]
    },
    {
      id: 3,
      title: 'API Latency Issues',
      status: 'resolved',
      date: 'May 25, 2026',
      description: 'Experienced increased API response times due to high traffic. Issue has been resolved.',
      updates: [
        { time: '4:30 PM', message: 'Issue resolved' },
        { time: '3:00 PM', message: 'Investigating increased latency' }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'operational':
        return 'bg-green-500';
      case 'degraded':
        return 'bg-yellow-500';
      case 'outage':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'operational':
        return 'Operational';
      case 'degraded':
        return 'Degraded Performance';
      case 'outage':
        return 'Service Outage';
      default:
        return 'Unknown';
    }
  };

  const getIncidentStatusColor = (status) => {
    switch(status) {
      case 'investigating':
        return 'bg-yellow-100 text-yellow-800';
      case 'identified':
        return 'bg-orange-100 text-orange-800';
      case 'monitoring':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
            <div className="inline-flex items-center space-x-3 mb-6">
              <span className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-green-600 font-bold text-lg">All Systems Operational</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
              System Status
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real-time status of all Society Management services
            </p>
          </div>
        </div>
      </section>

      {/* Overall Status */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-3xl p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Overall System Status</h2>
                <p className="text-gray-600">All services are running normally</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-extrabold text-green-600 mb-1">99.97%</div>
                <div className="text-sm text-gray-600">Uptime (30 days)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Status */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Service Status</h2>
            <p className="text-xl text-gray-600">
              Current status of all platform services
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{service.name}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`w-3 h-3 ${getStatusColor(service.status)} rounded-full`}></span>
                    <span className="text-sm font-semibold text-gray-700">{getStatusText(service.status)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Uptime (30 days)</span>
                  <span className="font-bold text-gray-900">{service.uptime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Incidents */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Recent Incidents</h2>
            <p className="text-xl text-gray-600">
              Past incidents and their resolution status
            </p>
          </div>

          <div className="space-y-6">
            {incidents.map((incident) => (
              <div key={incident.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{incident.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{incident.date}</p>
                    <p className="text-gray-700">{incident.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getIncidentStatusColor(incident.status)}`}>
                    {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                  </span>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-bold text-gray-900 mb-3">Updates</h4>
                  <div className="space-y-2">
                    {incident.updates.map((update, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <span className="text-sm text-gray-500 font-mono">{update.time}</span>
                        <span className="text-sm text-gray-700">{update.message}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Uptime Metrics */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Uptime Metrics</h2>
            <p className="text-xl text-gray-600">
              Historical uptime performance over time
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-4xl font-extrabold text-green-600 mb-2">99.97%</div>
              <div className="text-sm text-gray-600">Last 24 Hours</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-4xl font-extrabold text-green-600 mb-2">99.95%</div>
              <div className="text-sm text-gray-600">Last 7 Days</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-4xl font-extrabold text-green-600 mb-2">99.94%</div>
              <div className="text-sm text-gray-600">Last 30 Days</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-4xl font-extrabold text-green-600 mb-2">99.92%</div>
              <div className="text-sm text-gray-600">Last 90 Days</div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Subscribe to Updates</h2>
          <p className="text-xl text-gray-600 mb-8">
            Get notified about service incidents and maintenance
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-l-2xl focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none"
            />
            <button className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-r-2xl hover:from-indigo-600 hover:to-purple-700 transition-all">
              Subscribe
            </button>
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
