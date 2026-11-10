'use client';

import { useState } from 'react';

export default function LeadForm({ source = 'hero', dark = false }: { source?: string; dark?: boolean }) {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setState('error');
      setError('Please enter a valid email address.');
      return;
    }
    setState('loading');
    setError('');
    try {
      const res = await fetch('/api/100-ways', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), website, source }),
      });
      if (!res.ok || !(res.headers.get('content-type') ?? '').includes('application/pdf')) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = '100-Ways-to-Make-Money-with-AI.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
      setState('done');
    } catch (err) {
      setState('error');
      setError(err instanceof Error ? err.message : 'Connection error. Please try again.');
    }
  }

  if (state === 'done') {
    return (
      <div role="status" className="rounded-xl border border-green-200 bg-green-50 p-5 text-green-900">
        <p className="font-semibold">Your download has started.</p>
        <p className="mt-1 text-sm">
          Check your Downloads folder for <strong>100-Ways-to-Make-Money-with-AI.pdf</strong>. Nothing happened?{' '}
          <button type="button" onClick={() => setState('idle')} className="underline font-medium">
            Try again
          </button>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-3">
      <label htmlFor={`email-${source}`} className={`block text-sm font-medium ${dark ? 'text-gray-200' : 'text-gray-900'}`}>
        Where should we send it?
      </label>
      <input
        id={`email-${source}`}
        type="email"
        inputMode="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </label>
      </div>
      <button
        type="submit"
        disabled={state === 'loading'}
        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
      >
        {state === 'loading' ? 'Preparing your PDF…' : 'Download the free PDF'}
      </button>
      {state === 'error' && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
      <p className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
        Instant download. You&apos;ll also get the Automation Labs newsletter; unsubscribe anytime.
      </p>
    </form>
  );
}
