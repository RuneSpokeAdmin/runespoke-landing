'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Sparkles, Code, Zap, Shield, Globe, Check } from 'lucide-react';

export default function BetaLanding() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Thanks! We\'ll notify you when RuneSpoke Hub launches.');
        setEmail('');
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to join waitlist. Please try again.');
    }
  };

  const features = [
    { icon: <Code />, title: 'BYOAI', desc: 'Bring Your Own AI - Use Claude, GPT-4, or Gemini' },
    { icon: <Zap />, title: '90% Cost Savings', desc: 'Save massively vs GitHub Copilot' },
    { icon: <Shield />, title: 'Self-Hosted', desc: 'Your data, your control, your infrastructure' },
    { icon: <Globe />, title: 'Unified Platform', desc: 'All your AI dev tools in one place' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Logo/Brand */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-10 h-10 text-cyan-400" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                RuneSpoke Hub
              </h1>
            </div>
          </div>

          {/* Tagline */}
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            The AI Development Platform
            <span className="block text-3xl md:text-4xl mt-2 text-cyan-400">
              That Costs 90% Less
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 mb-4">
            Your GitHub Copilot Killer • Self-Hosted • BYOAI
          </p>

          {/* Beta Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-block"
          >
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full font-bold text-lg mb-12">
              🚀 BETA LAUNCHING SOON
            </div>
          </motion.div>

          {/* Email Signup Form */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="max-w-md mx-auto mb-16"
          >
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for early access"
                  required
                  disabled={status === 'loading' || status === 'success'}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-bold hover:from-cyan-400 hover:to-blue-500 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {status === 'loading' ? (
                  <span className="flex items-center">
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Joining...
                  </span>
                ) : status === 'success' ? (
                  <span className="flex items-center">
                    <Check className="w-5 h-5 mr-2" />
                    Joined!
                  </span>
                ) : (
                  'Get Early Access'
                )}
              </button>
            </form>

            {message && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}
              >
                {message}
              </motion.p>
            )}
          </motion.div>

          {/* Feature Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur rounded-lg p-6 border border-gray-700 hover:border-cyan-400/50 transition-all"
              >
                <div className="flex justify-center mb-4 text-cyan-400">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* What's Coming */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="max-w-4xl mx-auto"
          >
            <h3 className="text-2xl font-bold mb-8 text-cyan-400">What's Coming in Beta</h3>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                <h4 className="font-bold mb-2">🤖 Multi-AI Provider Support</h4>
                <p className="text-sm text-gray-400">Claude 3.5, GPT-4, Gemini Pro, and local models</p>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                <h4 className="font-bold mb-2">💻 IDE Integration</h4>
                <p className="text-sm text-gray-400">VS Code, Cursor, and terminal support</p>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                <h4 className="font-bold mb-2">📊 Project Management</h4>
                <p className="text-sm text-gray-400">Built-in Linear/Jira alternative</p>
              </div>
              <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                <h4 className="font-bold mb-2">🔒 Enterprise Ready</h4>
                <p className="text-sm text-gray-400">Self-hosted, SOC2 compliant, SSO support</p>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-20 text-sm text-gray-500"
          >
            <p>© 2024 RuneSpoke Hub • Built with Next.js 15 • Powered by AI</p>
            <p className="mt-2">Save 90% on AI development costs • Your data, your control</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}