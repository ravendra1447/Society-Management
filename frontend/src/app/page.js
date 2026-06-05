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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-cyan-50 text-slate-900">
      <Header onMenuClick={() => {}} />

      <main className="relative overflow-hidden">
        <div className="absolute -left-16 top-24 w-72 h-72 rounded-full bg-indigo-300/50 blur-3xl" />
        <div className="absolute right-0 top-40 w-80 h-80 rounded-full bg-violet-300/40 blur-3xl" />
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-96 h-96 rounded-full bg-sky-200/40 blur-3xl" />

        <section className="relative pt-8 pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-4 lg:grid-cols-[1.3fr_0.9fr] items-center">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm ring-1 ring-indigo-100">
                  Trusted by 500+ Residential Societies
                </span>

                <div className="space-y-4">
                  <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900">
                    Society Management
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                      Made Simple.
                    </span>
                  </h1>
                  <p className="max-w-2xl text-lg leading-8 text-slate-600">
                    Transform residential communities with an intelligent portal for residents, security teams, staff and society administrators. More control, better communication, and smarter operations in one beautiful platform.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={() => router.push('/register')}
                    className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 text-base font-semibold text-white shadow-xl shadow-indigo-500/20 hover:-translate-y-1 transition-transform duration-300"
                  >
                    Get Started Free
                  </button>
                  <button
                    onClick={() => router.push('/login')}
                    className="inline-flex items-center justify-center rounded-3xl border border-indigo-200 bg-white px-8 py-4 text-lg font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 transition-colors duration-300"
                  >
                    Login to Dashboard
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  <div className="rounded-3xl bg-white/90 p-3.5 shadow-md ring-1 ring-slate-200">
                    <p className="text-3xl font-extrabold text-indigo-600">500+</p>
                    <p className="mt-2 text-sm text-slate-600">Societies</p>
                  </div>
                  <div className="rounded-3xl bg-white/90 p-5 shadow-md ring-1 ring-slate-200">
                    <p className="text-3xl font-extrabold text-cyan-600">50K+</p>
                    <p className="mt-2 text-sm text-slate-600">Residents</p>
                  </div>
                  <div className="rounded-3xl bg-white/90 p-5 shadow-md ring-1 ring-slate-200">
                    <p className="text-3xl font-extrabold text-violet-600">13</p>
                    <p className="mt-2 text-sm text-slate-600">Modules</p>
                  </div>
                  <div className="rounded-3xl bg-white/90 p-5 shadow-md ring-1 ring-slate-200">
                    <p className="text-3xl font-extrabold text-rose-600">99.9%</p>
                    <p className="mt-2 text-sm text-slate-600">Uptime</p>
                  </div>
                </div>
              </div>

              <div className="relative rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-2xl shadow-slate-400/10 backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4 rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-3 text-white shadow-lg">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] opacity-90">Society Dashboard</p>
                    <p className="mt-2 text-2xl font-bold">Live module overview</p>
                  </div>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 text-xl">🏢</span>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3.5">
                    <p className="text-sm text-slate-500">Visitor approvals</p>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-2xl font-semibold text-slate-900">128</p>
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Active</span>
                    </div>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Amenity bookings</p>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-2xl font-semibold text-slate-900">32</p>
                      <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">Today</span>
                    </div>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Pending complaints</p>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-2xl font-semibold text-slate-900">8</p>
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">In progress</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-3xl bg-slate-900 px-4 py-4 text-white">
                  <p className="text-xs uppercase tracking-[0.25em] text-cyan-200">Live summary</p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-3xl font-bold">24/7</p>
                      <p className="text-sm text-slate-300">Support</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold">98%</p>
                      <p className="text-sm text-slate-300">SLA compliance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-500">Complete society toolkit</p>
              <h2 className="mt-4 text-4xl font-extrabold text-slate-900">Comprehensive features for modern societies</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                Built for admins, staff, and residents alike. Everything you need to keep your community running smoothly.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Secure access',
                  icon: '🔐',
                  description: 'Visitor management, gate controls, and real-time monitoring for complete peace of mind.',
                  slug: 'secure-access',
                  accent: 'border-sky-300',
                  iconBg: 'bg-sky-100 text-sky-700',
                  badge: 'bg-sky-50 text-sky-700'
                },
                {
                  title: 'Smart dashboard',
                  icon: '📊',
                  description: 'Real-time analytics, reports, and insights to manage your society efficiently.',
                  slug: 'smart-dashboard',
                  accent: 'border-emerald-300',
                  iconBg: 'bg-emerald-100 text-emerald-700',
                  badge: 'bg-emerald-50 text-emerald-700'
                },
                {
                  title: 'Resident portal',
                  icon: '👥',
                  description: 'Self-service portal for residents to manage complaints, bookings, and notices.',
                  slug: 'resident-portal',
                  accent: 'border-violet-300',
                  iconBg: 'bg-violet-100 text-violet-700',
                  badge: 'bg-violet-50 text-violet-700'
                },
                {
                  title: 'Billing & payments',
                  icon: '💳',
                  description: 'Automated billing with online payment tracking and invoice generation.',
                  slug: 'billing-payments',
                  accent: 'border-amber-300',
                  iconBg: 'bg-amber-100 text-amber-700',
                  badge: 'bg-amber-50 text-amber-700'
                },
                {
                  title: 'Complaint management',
                  icon: '📋',
                  description: 'Streamlined complaint tracking with status updates and resolution workflow.',
                  slug: 'complaint-management',
                  accent: 'border-rose-300',
                  iconBg: 'bg-rose-100 text-rose-700',
                  badge: 'bg-rose-50 text-rose-700'
                },
                {
                  title: 'Amenity booking',
                  icon: '🏊',
                  description: 'Easy booking for clubhouse, gym, courts, and event spaces.',
                  slug: 'amenity-booking',
                  accent: 'border-cyan-300',
                  iconBg: 'bg-cyan-100 text-cyan-700',
                  badge: 'bg-cyan-50 text-cyan-700'
                }
              ].map((feature) => (
                <div
                  key={feature.title}
                  role="button"
                  tabIndex={0}
                  onClick={() => router.push(`/features/${feature.slug}`)}
                  onKeyDown={(event) => event.key === 'Enter' && router.push(`/features/${feature.slug}`)}
                  className={`rounded-[2rem] border border-slate-200 ${feature.accent} border-t-4 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl cursor-pointer`}
                >
                  <div className={`mb-5 inline-flex h-16 w-16 items-center justify-center rounded-3xl ${feature.iconBg} text-3xl`}>
                    {feature.icon}
                  </div>
                  <div className="mb-2 inline-flex rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-[0.2em] text-slate-700 bg-slate-100">
                    {feature.title.split(' ')[0]}
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-7">{feature.description}</p>
                  <p className="mt-5 text-sm font-semibold text-indigo-600">Learn more →</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] items-center">
              <div className="space-y-6">
                <span className="inline-flex rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">Built for enterprise-grade security</span>
                <h2 className="text-4xl font-extrabold text-slate-900">Keep your society safe and compliant</h2>
                <p className="max-w-xl text-lg leading-8 text-slate-600">
                  Protect resident data, manage access, and track every activity with confidence. Our platform is designed for modern societies that need reliability and control.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  'Role-based access control',
                  'Encrypted data storage',
                  'Audit logs & activity tracking',
                  'Multi-society support',
                  '99.9% uptime SLA'
                ].map((item) => (
                  <div key={item} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                    <p className="font-semibold text-slate-900">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-r from-indigo-500 via-violet-600 to-purple-600 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="rounded-[2rem] bg-slate-950/10 border border-white/10 p-10 shadow-2xl shadow-indigo-900/20 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-200">Ready to modernise your society?</p>
              <h2 className="mt-4 text-4xl font-extrabold">Join 500+ societies already using our platform.</h2>
              <p className="mt-4 text-lg text-slate-100 max-w-2xl mx-auto leading-8">Free setup, no credit card required. Start today and give your residents a better experience.</p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => router.push('/register')}
                  className="rounded-full bg-white/10 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-white/10 hover:bg-white/20 transition-colors duration-300"
                >
                  Get started free
                </button>
                <button
                  onClick={() => router.push('/contact')}
                  className="rounded-full border border-white/30 bg-transparent px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-colors duration-300"
                >
                  Request a demo
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 text-slate-200 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
                  🏢
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">Society Management</p>
                  <p className="text-sm text-slate-400">Residential Portal</p>
                </div>
              </div>
              <p className="text-sm text-slate-400">Helping communities stay informed, secure, and connected with a modern society portal.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Quick links</h3>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li><a href="/about" className="hover:text-white">About</a></li>
                <li><a href="/features" className="hover:text-white">Features</a></li>
                <li><a href="/pricing" className="hover:text-white">Pricing</a></li>
                <li><a href="/contact" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li><a href="/help-center" className="hover:text-white">Help Center</a></li>
                <li><a href="/documentation" className="hover:text-white">Documentation</a></li>
                <li><a href="/api-reference" className="hover:text-white">API Reference</a></li>
                <li><a href="/status" className="hover:text-white">Status</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li><a href="/privacy-policy" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="/terms-of-service" className="hover:text-white">Terms of Service</a></li>
                <li><a href="/cookie-policy" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
            © 2026 Society Management. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
