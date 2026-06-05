'use client';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '../../../components/Header';

const features = [
  {
    slug: 'secure-access',
    title: 'Secure access',
    icon: '🔐',
    description: 'Visitor management, gate controls, and real-time monitoring for complete peace of mind.',
    detail: 'Secure access gives your society full control of entry and exit, with visitor approvals, digital gate passes, and live monitoring. Every visit is logged and tracked for better accountability and safety.',
    why: 'A safe society builds trust. This feature reduces unauthorized entries, speeds up gate workflows, and lets administrators monitor access in real time.',
    accent: 'from-sky-500 to-indigo-500',
    iconBg: 'bg-sky-100 text-sky-700'
  },
  {
    slug: 'smart-dashboard',
    title: 'Smart dashboard',
    icon: '📊',
    description: 'Real-time analytics, reports, and insights to manage your society efficiently.',
    detail: 'The smart dashboard brings key metrics, occupancy trends, and service updates into one view. It helps administrators make confident decisions using clean charts and quick summaries.',
    why: 'With instant insights, teams can prioritize tasks, monitor performance, and respond faster to issues as they happen.',
    accent: 'from-emerald-500 to-teal-500',
    iconBg: 'bg-emerald-100 text-emerald-700'
  },
  {
    slug: 'resident-portal',
    title: 'Resident portal',
    icon: '👥',
    description: 'Self-service portal for residents to manage complaints, bookings, and notices.',
    detail: 'Residents can easily raise requests, book amenities, and stay updated with community announcements. This portal simplifies daily interactions with a modern self-service experience.',
    why: 'A better resident experience means fewer support calls and stronger community engagement, helping your society stay organized and connected.',
    accent: 'from-violet-500 to-purple-500',
    iconBg: 'bg-violet-100 text-violet-700'
  },
  {
    slug: 'billing-payments',
    title: 'Billing & payments',
    icon: '💳',
    description: 'Automated billing with online payment tracking and invoice generation.',
    detail: 'Billing & payments keeps your society accounts transparent and easy to manage. Residents can view invoices, pay online, and administrators can track collections without manual effort.',
    why: 'Automation reduces billing errors and payment delays, while giving residents a frictionless way to settle dues.',
    accent: 'from-amber-500 to-orange-500',
    iconBg: 'bg-amber-100 text-amber-700'
  },
  {
    slug: 'complaint-management',
    title: 'Complaint management',
    icon: '📋',
    description: 'Streamlined complaint tracking with status updates and resolution workflow.',
    detail: 'Complaint management organizes issues from initial report through resolution. Residents can submit problems, track progress, and receive updates as requests move forward.',
    why: 'A clear workflow speeds up resolution, improves accountability, and makes residents feel heard and supported.',
    accent: 'from-rose-500 to-pink-500',
    iconBg: 'bg-rose-100 text-rose-700'
  },
  {
    slug: 'amenity-booking',
    title: 'Amenity booking',
    icon: '🏊',
    description: 'Easy booking for clubhouse, gym, courts, and event spaces.',
    detail: 'Amenity booking lets residents reserve society facilities in seconds. Availability is shown in real time and bookings are confirmed instantly to avoid conflicts.',
    why: 'This keeps shared spaces organized, maximizes usage, and gives residents a seamless way to schedule activities.',
    accent: 'from-cyan-500 to-sky-500',
    iconBg: 'bg-cyan-100 text-cyan-700'
  }
];

export async function generateStaticParams() {
  return features.slice(0, 3).map((feature) => ({
    slug: feature.slug
  }));
}

export default function FeatureDetailPage({ params }) {
  const feature = features.find((item) => item.slug === params.slug);

  if (!feature) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-cyan-50 text-slate-900">
      <Header onMenuClick={() => {}} />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`rounded-[2rem] border border-slate-200 bg-white p-10 shadow-2xl shadow-slate-300/20`}>            
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-4">
              <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-slate-700 bg-slate-100`}>
                {feature.title}
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                {feature.title}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-600">
                {feature.description}
              </p>
            </div>
            <div className={`inline-flex h-20 w-20 items-center justify-center rounded-3xl ${feature.iconBg} text-4xl shadow-lg`}>
              {feature.icon}
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">What it includes</h2>
              <p className="text-slate-600 leading-7">
                {feature.detail}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Why it matters</h2>
              <p className="text-slate-600 leading-7">
                {feature.why}
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/features" className="inline-flex justify-center rounded-3xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors duration-200">
              Back to features
            </Link>
            <Link href="/" className="inline-flex justify-center rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-colors duration-200">
              Return to home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
