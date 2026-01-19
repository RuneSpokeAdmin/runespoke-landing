'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const integrations = [
  // Development Tools
  { name: 'GitHub', category: 'Version Control', color: 'text-gray-900', logo: '/logos/github-mark.svg' },
  { name: 'GitLab', category: 'Version Control', color: 'text-orange-600', logo: '/logos/gitlab-mark.svg' },
  { name: 'VS Code', category: 'IDE', color: 'text-blue-600', logo: '/logos/vscode-mark.svg' },
  { name: 'JetBrains', category: 'IDE', color: 'text-purple-600', logo: '/logos/jetbrains-mark.svg' },
  { name: 'Docker', category: 'Containers', color: 'text-blue-500', logo: '/logos/docker-mark.svg' },
  
  // Communication & Collaboration
  { name: 'Slack', category: 'Communication', color: 'text-purple-600', logo: '/logos/slack-mark.svg' },
  { name: 'Discord', category: 'Communication', color: 'text-indigo-600', logo: '/logos/discord-mark.svg' },
  { name: 'Notion', category: 'Documentation', color: 'text-gray-900', logo: '/logos/notion-mark.svg' },
  
  // Project Management
  { name: 'Linear', category: 'Project Management', color: 'text-purple-600', logo: '/logos/linear-mark.svg' },
  { name: 'Jira', category: 'Project Management', color: 'text-blue-600', logo: '/logos/jira-mark.svg' },
  { name: 'Confluence', category: 'Documentation', color: 'text-blue-600', logo: '/logos/confluence-mark.svg' },
  
  // Design Tools
  { name: 'Figma', category: 'Design', color: 'text-purple-600', logo: '/logos/figma-mark.svg' },
  
  // Cloud Providers
  { name: 'AWS', category: 'Cloud', color: 'text-orange-500', logo: '/logos/aws-mark.svg' },
  { name: 'Google Cloud', category: 'Cloud', color: 'text-blue-500', logo: '/logos/google-cloud.svg' },
  { name: 'Azure', category: 'Cloud', color: 'text-blue-600', logo: '/logos/azure-mark.svg' },
  
  // Deployment & Infrastructure
  { name: 'Vercel', category: 'Deployment', color: 'text-gray-900', logo: '/logos/vercel-mark.svg' },
  { name: 'Firebase', category: 'Backend', color: 'text-yellow-600', logo: '/logos/firebase-mark.svg' },
  { name: 'Supabase', category: 'Backend', color: 'text-green-600', logo: '/logos/supabase-mark.svg' },
  
  // AI Providers
  { name: 'OpenAI', category: 'AI', color: 'text-green-600', logo: '/logos/openai-gpt.svg' },
  { name: 'Anthropic', category: 'AI', color: 'text-orange-600', logo: '/logos/anthropic-claude.svg' },
  { name: 'Google AI', category: 'AI', color: 'text-blue-500', logo: '/logos/google-gemini.svg' },
  { name: 'Hugging Face', category: 'AI', color: 'text-yellow-500', logo: '/logos/huggingface-mark.svg' }
];

const categories = [
  { name: 'Version Control', color: 'bg-gray-100 text-gray-800' },
  { name: 'IDE', color: 'bg-blue-100 text-blue-800' },
  { name: 'Communication', color: 'bg-purple-100 text-purple-800' },
  { name: 'Project Management', color: 'bg-green-100 text-green-800' },
  { name: 'Documentation', color: 'bg-yellow-100 text-yellow-800' },
  { name: 'Design', color: 'bg-pink-100 text-pink-800' },
  { name: 'Cloud', color: 'bg-orange-100 text-orange-800' },
  { name: 'Deployment', color: 'bg-teal-100 text-teal-800' },
  { name: 'Containers', color: 'bg-blue-100 text-blue-800' },
  { name: 'AI', color: 'bg-indigo-100 text-indigo-800' },
  { name: 'Backend', color: 'bg-red-100 text-red-800' },
  { name: 'Database', color: 'bg-gray-100 text-gray-800' }
];

export function IntegrationsSection() {
  return (
    <section id="integrations" className="py-20 bg-white/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Seamless Integrations
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with {integrations.length}+ tools and services. One platform to rule them all.
          </p>
        </div>

        {/* Categories Overview */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <span
                key={category.name}
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${category.color}`}
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 mb-12">
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group flex flex-col items-center p-4 bg-white/80 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
            >
              {/* Logo Container */}
              <div className="w-12 h-12 mb-3 flex items-center justify-center">
                <motion.div
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.2 }}
                  className="w-10 h-10 flex items-center justify-center"
                >
                  <Image
                    src={integration.logo}
                    alt={`${integration.name} logo`}
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                    onError={(e) => {
                      // Fallback to initials if logo fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.parentElement?.querySelector('.fallback-text');
                      if (fallback) {
                        (fallback as HTMLElement).style.display = 'block';
                      }
                    }}
                  />
                  <span 
                    className={`fallback-text hidden text-sm font-bold ${integration.color}`}
                  >
                    {integration.name.split(' ').map(word => word.charAt(0)).join('').slice(0, 2)}
                  </span>
                </motion.div>
              </div>
              
              {/* Name */}
              <h3 className="text-xs font-medium text-gray-900 text-center mb-1">
                {integration.name}
              </h3>
              
              {/* Category */}
              <p className="text-xs text-gray-500 text-center">
                {integration.category}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Integration Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">One-Click Setup</h3>
            <p className="text-gray-600">Connect your tools in seconds with OAuth authentication and zero configuration.</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Sync</h3>
            <p className="text-gray-600">Keep all your tools synchronized with bidirectional data flow and real-time updates.</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Automation</h3>
            <p className="text-gray-600">Create powerful workflows that span across all your integrated tools and services.</p>
          </div>
        </div>

        {/* Popular Integrations Highlight */}
        <div className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Most Popular Integrations
          </h3>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {['GitHub', 'Slack', 'VS Code', 'Linear', 'AWS', 'Docker', 'Notion', 'OpenAI'].map((name) => {
              const integration = integrations.find(i => i.name === name);
              return (
                <motion.div
                  key={name}
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center px-4 py-2 bg-white/80 rounded-full text-sm font-medium text-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  {integration && (
                    <Image
                      src={integration.logo}
                      alt={`${name} logo`}
                      width={16}
                      height={16}
                      className="w-4 h-4 mr-2 object-contain"
                    />
                  )}
                  {name}
                </motion.div>
              );
            })}
          </div>
          <p className="text-gray-600 mb-6">
            Join thousands of teams already using RuneSpoke to connect their favorite tools
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            View All Integrations
          </motion.button>
        </div>
      </div>
    </section>
  );
}