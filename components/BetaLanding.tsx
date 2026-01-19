'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Sparkles, Code, Zap, Shield, Globe, ChevronRight, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function BetaLanding() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { icon: <Code className="w-6 h-6" />, title: 'Universal IDE Integration', desc: 'VS Code, JetBrains, Cursor & more' },
    { icon: <Sparkles className="w-6 h-6" />, title: 'Multi-AI Support', desc: 'Claude, GPT-4, Gemini & local models' },
    { icon: <Zap className="w-6 h-6" />, title: '90% Cost Savings', desc: 'BYOAI approach saves thousands' },
    { icon: <Shield className="w-6 h-6" />, title: 'Enterprise Security', desc: 'OAuth 2.0, SSO, SOC 2 compliant' },
    { icon: <Globe className="w-6 h-6" />, title: '20+ Integrations', desc: 'GitHub, Slack, Linear, Docker & more' },
    { icon: <ChevronRight className="w-6 h-6" />, title: 'Self-Hosted Option', desc: 'Your infrastructure, your control' },
  ];

  return (
    <div className="min-h-screen relative">
      {/* Fixed background logo - clean and simple */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'url(/runespoke-background-logo.png)',
          backgroundSize: '50% auto',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          opacity: 0.15,
        }}
      />

      {/* Content with transparency to show logo */}
      <div className="relative z-10">
        {/* Header */}
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black py-2'
            : 'bg-gradient-to-b from-black to-gray-800 py-4'
        }`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/runespoke-logo.png"
                    alt="RuneSpoke"
                    width={isScrolled ? 80 : 140}
                    height={isScrolled ? 80 : 140}
                    className={`transition-all duration-300 ${
                      isScrolled ? 'h-20 w-20' : 'h-32 w-32'
                    }`}
                  />
                </Link>
              </div>
              <div className="flex items-center space-x-8">
                <span className="text-gray-300">Documentation Coming Soon</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-300">Contact: hello@runespoke.com</span>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <div className="pt-40">
          <section className="relative py-20 bg-gradient-to-br from-blue-50/80 via-indigo-50/80 to-purple-50/80 backdrop-blur-sm">
            {/* Beta Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="absolute top-8 right-8"
            >
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full font-bold text-lg shadow-lg">
                🚀 BETA LAUNCHING SOON
              </div>
            </motion.div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
              >
                The Complete AI-Powered
                <span className="text-blue-600"> Development Platform</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              >
                Connect your entire development ecosystem with RuneSpoke Hub. From IDE extensions and AI chat assistants to cloud provider management and advanced automation workflows - everything your team needs is unified in one intelligent platform.
              </motion.p>

              {/* Email Signup Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="max-w-md mx-auto mb-12"
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
                      className="w-full pl-10 pr-4 py-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50 text-gray-900"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
                    className={`mt-4 text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {message}
                  </motion.p>
                )}
              </motion.div>

              {/* Key Value Props */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-gray-700 font-medium"
              >
                💰 Save 90% vs GitHub Copilot • 🤖 BYOAI (Bring Your Own AI) • 🔒 Self-Hosted Options Available
              </motion.p>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-20 bg-white/90 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-3xl font-bold text-center text-gray-900 mb-12"
              >
                Everything You Need in One Platform
              </motion.h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="bg-white rounded-lg p-6 border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 text-blue-600">
                          {feature.icon}
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{feature.title}</h3>
                        <p className="text-gray-600">{feature.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Coming Soon Section */}
          <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                <h3 className="text-2xl font-bold mb-8 text-gray-900">What's Coming in Beta</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-left max-w-5xl mx-auto">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-bold mb-2 text-gray-900">🤖 Multi-AI Provider Support</h4>
                    <p className="text-sm text-gray-600">Claude 3.5, GPT-4, Gemini Pro, and local models</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-bold mb-2 text-gray-900">💻 IDE Integration</h4>
                    <p className="text-sm text-gray-600">VS Code, Cursor, JetBrains, and terminal support</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-bold mb-2 text-gray-900">📊 Project Management</h4>
                    <p className="text-sm text-gray-600">Built-in Linear/Jira alternative with AI insights</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-bold mb-2 text-gray-900">🔒 Enterprise Ready</h4>
                    <p className="text-sm text-gray-600">Self-hosted, SOC2 compliant, SSO support</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-900 text-white py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <p className="text-lg font-semibold mb-2">RuneSpoke Hub</p>
                <p className="text-gray-400 mb-4">The AI Development Platform That Costs 90% Less</p>
                <p className="text-sm text-gray-500">© 2024 RuneSpoke Hub • Built with Next.js 16 • Powered by AI</p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}