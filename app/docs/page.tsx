'use client';

import {
  RocketLaunchIcon,
  SparklesIcon,
  CodeBracketIcon,
  CloudIcon,
  BoltIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function DocsHomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to RuneSpoke Hub!
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Welcome to <strong>RuneSpoke Hub</strong> - the revolutionary AI-first development platform 
          that's revolutionizing how teams build, deploy, and manage software. We're not just another 
          development tool - we're the GitHub Copilot killer, Linear/Jira replacement, and unified 
          platform that puts AI at the center of everything.
        </p>
      </div>

      {/* What Makes RuneSpoke Hub Revolutionary */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          What Makes RuneSpoke Hub Revolutionary?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <SparklesIcon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-First Development</h3>
            <p className="text-gray-600">
              Every feature is enhanced with AI - from code completion to deployment automation.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <BoltIcon className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Unified Platform</h3>
            <p className="text-gray-600">
              Replace multiple tools with one intelligent platform that connects everything.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <CodeBracketIcon className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Developer-Friendly</h3>
            <p className="text-gray-600">
              Built by developers, for developers. Integrates seamlessly with your existing workflow.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Start Options */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Get Started
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link 
            href="/docs/quick-start"
            className="bg-blue-50 border border-blue-200 rounded-lg p-6 hover:bg-blue-100 transition-colors"
          >
            <div className="flex items-center mb-3">
              <RocketLaunchIcon className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-blue-900">Quick Start Guide</h3>
            </div>
            <p className="text-blue-700">
              Get up and running with RuneSpoke Hub in just 5 minutes. Perfect for new users.
            </p>
          </Link>

          <Link 
            href="/docs/platform-overview"
            className="bg-green-50 border border-green-200 rounded-lg p-6 hover:bg-green-100 transition-colors"
          >
            <div className="flex items-center mb-3">
              <CloudIcon className="h-6 w-6 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold text-green-900">Platform Overview</h3>
            </div>
            <p className="text-green-700">
              Take a guided tour to understand how everything fits together.
            </p>
          </Link>
        </div>
      </section>

      {/* Key Features */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Key Features
        </h2>
        
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Development</h3>
            <p className="text-gray-600">
              Smart code completion, automated testing, intelligent debugging, and AI-driven insights.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Universal Integrations</h3>
            <p className="text-gray-600">
              Connect GitHub, Slack, Discord, Linear, AWS, Azure, and 20+ other services seamlessly.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Container Management</h3>
            <p className="text-gray-600">
              Full Docker and Kubernetes lifecycle management with real-time monitoring.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Intelligent Automation</h3>
            <p className="text-gray-600">
              Create workflows that adapt and learn, making your development process smarter over time.
            </p>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Next Steps
        </h2>
        <div className="space-y-3">
          <div className="flex items-center">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">1</span>
            <Link href="/docs/quick-start" className="text-blue-600 hover:text-blue-700 font-medium">
              Complete the Quick Start Guide
            </Link>
          </div>
          <div className="flex items-center">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">2</span>
            <Link href="/docs/integrations/slack" className="text-blue-600 hover:text-blue-700 font-medium">
              Connect your first integration (Slack recommended)
            </Link>
          </div>
          <div className="flex items-center">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">3</span>
            <Link href="/docs/ai/chat-assistant" className="text-blue-600 hover:text-blue-700 font-medium">
              Set up your AI assistant
            </Link>
          </div>
          <div className="flex items-center">
            <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">4</span>
            <Link href="/docs/development/automation" className="text-blue-600 hover:text-blue-700 font-medium">
              Create your first automation workflow
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}