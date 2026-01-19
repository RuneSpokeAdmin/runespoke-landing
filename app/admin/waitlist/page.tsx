'use client';

import { useState } from 'react';

export default function WaitlistAdmin() {
  const [emails, setEmails] = useState<string[]>([]);
  const [secret, setSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchEmails = async () => {
    if (!secret) {
      setError('Please enter the secret key');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/waitlist', {
        headers: {
          'Authorization': `Bearer ${secret}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setEmails(data.emails || []);
      } else {
        setError('Invalid secret key');
      }
    } catch (err) {
      setError('Failed to fetch emails');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Waitlist Admin</h1>

        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex gap-4 mb-4">
            <input
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Enter secret key"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={fetchEmails}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Loading...' : 'Fetch Emails'}
            </button>
          </div>

          {error && (
            <p className="text-red-600 mb-4">{error}</p>
          )}
        </div>

        {emails.length > 0 && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Waitlist Emails ({emails.length})
            </h2>
            <div className="space-y-2">
              {emails.map((email, index) => (
                <div key={index} className="py-2 px-3 bg-gray-50 rounded">
                  {email}
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                const csv = emails.join('\n');
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'waitlist.csv';
                a.click();
              }}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Download CSV
            </button>
          </div>
        )}

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Important Notes:</h3>
          <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
            <li>Current storage is in-memory only (resets on redeploy)</li>
            <li>Check Vercel logs for all signups: Dashboard → Functions → Logs</li>
            <li>Set WAITLIST_SECRET env variable in Vercel for security</li>
            <li>For persistence, enable Supabase or webhook option in the API</li>
          </ul>
        </div>
      </div>
    </div>
  );
}