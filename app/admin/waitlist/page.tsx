'use client';

import { useState } from 'react';

export default function WaitlistAdmin() {
  const [emails, setEmails] = useState<string[]>([]);
  const [secret, setSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [storageInfo, setStorageInfo] = useState<{ storage: string; count: number } | null>(null);
  const [deletingEmail, setDeletingEmail] = useState<string | null>(null);

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
        setStorageInfo({
          storage: data.storage || 'Unknown',
          count: data.count || 0
        });
      } else {
        setError('Invalid secret key');
      }
    } catch (err) {
      setError('Failed to fetch emails');
    } finally {
      setLoading(false);
    }
  };

  const deleteEmail = async (email: string) => {
    if (!confirm(`Are you sure you want to delete ${email}?`)) {
      return;
    }

    setDeletingEmail(email);
    try {
      const response = await fetch(`/api/waitlist/${encodeURIComponent(email)}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${secret}`
        }
      });

      if (response.ok) {
        // Remove from local state
        setEmails(emails.filter(e => e !== email));
        if (storageInfo) {
          setStorageInfo({
            ...storageInfo,
            count: storageInfo.count - 1
          });
        }
      } else {
        alert('Failed to delete email');
      }
    } catch (err) {
      alert('Error deleting email');
    } finally {
      setDeletingEmail(null);
    }
  };

  const downloadCSV = () => {
    const csvHeader = 'Email,Date Added\n';
    const csvData = emails.map(email => `${email},${new Date().toISOString()}`).join('\n');
    const csv = csvHeader + csvData;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `runespoke-waitlist-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const deleteAllEmails = async () => {
    if (!confirm(`⚠️ WARNING: This will delete ALL ${emails.length} emails!\n\nAre you ABSOLUTELY sure?`)) {
      return;
    }

    if (!confirm(`FINAL CONFIRMATION: Delete all ${emails.length} emails? This cannot be undone!`)) {
      return;
    }

    setLoading(true);
    let deleted = 0;

    for (const email of emails) {
      try {
        const response = await fetch(`/api/waitlist/${encodeURIComponent(email)}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${secret}`
          }
        });
        if (response.ok) deleted++;
      } catch (err) {
        console.error(`Failed to delete ${email}`);
      }
    }

    alert(`Deleted ${deleted} of ${emails.length} emails`);
    setEmails([]);
    if (storageInfo) {
      setStorageInfo({
        ...storageInfo,
        count: 0
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">RuneSpoke Hub - Waitlist Admin</h1>

          <div className="flex gap-4 mb-4">
            <input
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Enter admin secret key"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              onKeyDown={(e) => e.key === 'Enter' && fetchEmails()}
            />
            <button
              onClick={fetchEmails}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 cursor-pointer"
            >
              {loading ? 'Loading...' : 'View Waitlist'}
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {error}
            </div>
          )}
        </div>

        {storageInfo && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-green-800">Storage Status</h3>
                <p className="text-sm text-green-700">Using: {storageInfo.storage}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-800">{storageInfo.count}</p>
                <p className="text-sm text-green-700">Total Signups</p>
              </div>
            </div>
          </div>
        )}

        {emails.length > 0 && (
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                Email List ({emails.length})
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={downloadCSV}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                  Download CSV
                </button>
                {emails.length > 0 && (
                  <button
                    onClick={deleteAllEmails}
                    disabled={loading}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400 cursor-pointer flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete All
                  </button>
                )}
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="max-h-96 overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        #
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email Address
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {emails.map((email, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                          {index + 1}
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                          {email}
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-center">
                          <button
                            onClick={() => deleteEmail(email)}
                            disabled={deletingEmail === email}
                            className="text-red-600 hover:text-red-900 disabled:opacity-50 cursor-pointer"
                            title="Delete email"
                          >
                            {deletingEmail === email ? (
                              <span className="text-gray-400">Deleting...</span>
                            ) : (
                              <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">ℹ️ System Information</h3>
          <div className="text-sm text-blue-700 space-y-1">
            <p><strong>Primary Storage:</strong> Supabase PostgreSQL (persistent)</p>
            <p><strong>Fallback Storage:</strong> Vercel KV/Upstash Redis</p>
            <p><strong>Backup:</strong> All signups logged in Vercel Functions</p>
            <p><strong>Email Service:</strong> AWS SES (waiting for production approval)</p>
          </div>
          <div className="mt-3 pt-3 border-t border-blue-200">
            <p className="text-sm text-blue-700">
              <strong>Quick Links:</strong>
            </p>
            <ul className="text-sm text-blue-600 space-y-1 mt-1">
              <li>• <a href="https://app.supabase.com/project/hfmxaonbljzffkhdjyvv/editor/29415" target="_blank" rel="noopener" className="underline hover:text-blue-800">View in Supabase Table Editor</a></li>
              <li>• <a href="https://vercel.com" target="_blank" rel="noopener" className="underline hover:text-blue-800">Check Vercel Logs</a></li>
              <li>• <a href="/" className="underline hover:text-blue-800">Back to Home</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}