'use client';

import { useState } from 'react';

export default function DebugAuth() {
  const [secret, setSecret] = useState('rs-hub-beta-2024-secure-key');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkAuth = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/debug-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ secret })
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: 'Failed to check' });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Debug Auth Check</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Enter Secret:</label>
            <input
              type="text"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            onClick={checkAuth}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Checking...' : 'Check Secret'}
          </button>

          {result && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>⚠️ Important:</strong> Delete this debug page after resolving the issue!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}