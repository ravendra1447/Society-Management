'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl rounded-[2rem] border border-slate-200/70 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.1)] overflow-hidden">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 p-10 lg:p-12 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(167,139,250,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.12),_transparent_30%)]"></div>
            <div className="relative z-10">
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.25em] text-slate-200 mb-8 inline-block">
                Password Reset
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight mb-4">Forgot your password?</h1>
              <p className="text-slate-300 leading-8">
                Enter your email address and we&apos;ll send you instructions to reset your password safely.
              </p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Need help?</p>
                  <p className="mt-2 text-sm text-slate-300">Reach out via support if you can&apos;t access your account.</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Secure reset</p>
                  <p className="mt-2 text-sm text-slate-300">A reset link will be sent to your registered email immediately.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-10 lg:p-12">
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Reset password</h2>
              <p className="text-slate-500">Enter the email associated with your account.</p>
            </div>

            {submitted ? (
              <div className="rounded-3xl border border-slate-200 bg-emerald-50 p-6">
                <h3 className="text-xl font-semibold text-emerald-900">Email sent</h3>
                <p className="mt-2 text-slate-700">
                  We&apos;ve sent password reset instructions to <strong>{email}</strong>. Check your inbox and follow the link to reset your password.
                </p>
                <Link href="/login" className="mt-6 inline-flex rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors duration-200">
                  Back to login
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email address</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
                    placeholder="you@example.com"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-700 hover:to-violet-700 transition-colors duration-200"
                >
                  Send reset link
                </button>
                <p className="text-center text-sm text-slate-500">
                  Remembered your password?{' '}
                  <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-800">
                    Sign in
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
