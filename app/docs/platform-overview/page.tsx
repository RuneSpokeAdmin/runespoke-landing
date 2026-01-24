'use client';

import {
  CubeIcon,
  BoltIcon,
  CloudIcon,
  CodeBracketIcon,
  PuzzlePieceIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  CommandLineIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

export default function PlatformOverviewPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Platform Overview
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Understanding RuneSpoke Hub's architecture, core components, and how everything 
          fits together to create the ultimate AI-powered development platform.
        </p>
      </div>

      {/* Architecture Overview */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Architecture Overview
        </h2>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <p className="text-gray-600 mb-4">
            RuneSpoke Hub is built on a modern, microservices architecture that puts AI at the center. 
            Unlike traditional development platforms, every component is designed to be AI-enhanced and interconnected.
          </p>
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Key Architectural Principles</h3>
            <ul className="text-blue-800 space-y-1">
              <li>• AI-First: Every feature leverages multiple AI providers</li>
              <li>• Unified: Single platform replaces multiple tools</li>
              <li>• Extensible: Easy to add new integrations and providers</li>
              <li>• Secure: Enterprise-grade security and privacy controls</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Core Components */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Core Components
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <BoltIcon className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Engine</h3>
            <p className="text-gray-600 mb-3">
              Multi-provider AI orchestration with Claude, GPT-4, Gemini, and local models.
            </p>
            <Link href="/docs/ai/chat-assistant" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              Learn more →
            </Link>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <PuzzlePieceIcon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Integration Hub</h3>
            <p className="text-gray-600 mb-3">
              Universal connector for GitHub, Slack, Discord, Linear, AWS, and 20+ services.
            </p>
            <Link href="/docs/integrations/slack" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Learn more →
            </Link>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <CubeIcon className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Container Engine</h3>
            <p className="text-gray-600 mb-3">
              Full Docker, Compose, and Kubernetes lifecycle management with AI optimization.
            </p>
            <Link href="/docs/containers/docker" className="text-green-600 hover:text-green-700 text-sm font-medium">
              Learn more →
            </Link>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <CommandLineIcon className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Automation Engine</h3>
            <p className="text-gray-600 mb-3">
              Intelligent workflows that learn and adapt, making development processes smarter.
            </p>
            <Link href="/docs/development/automation" className="text-orange-600 hover:text-orange-700 text-sm font-medium">
              Learn more →
            </Link>
          </div>
        </div>
      </section>

      {/* How It All Works Together */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          How It All Works Together
        </h2>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</span>
              Developer Interaction
            </h3>
            <p className="text-gray-600 ml-10">
              You interact with RuneSpoke Hub through the web interface, AI chat assistant, or integrations like Slack and Discord.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</span>
              AI Processing
            </h3>
            <p className="text-gray-600 ml-10">
              Your requests are intelligently routed to the best AI provider based on task type, cost, and performance requirements.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">3</span>
              Unified Execution
            </h3>
            <p className="text-gray-600 ml-10">
              Actions are executed across your connected services - GitHub, containers, deployments, notifications - all coordinated by AI.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">4</span>
              Continuous Learning
            </h3>
            <p className="text-gray-600 ml-10">
              The platform learns from every interaction, continuously optimizing workflows, costs, and recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* Why RuneSpoke Hub vs Alternatives */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Why RuneSpoke Hub vs Alternatives
        </h2>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-red-600 mb-3">Traditional Approach</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• GitHub Copilot for AI (single provider)</li>
                <li>• Linear/Jira for project management</li>
                <li>• Slack/Discord for communication</li>
                <li>• Separate CI/CD tools</li>
                <li>• Manual container management</li>
                <li>• Disconnected workflows</li>
              </ul>
              <div className="mt-4 text-sm text-red-600 font-medium">
                Result: Tool fragmentation, context switching, inefficiency
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-green-600 mb-3">RuneSpoke Hub Approach</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Multi-AI orchestration (best of all providers)</li>
                <li>• Built-in Linear/Jira replacement</li>
                <li>• Native Slack/Discord integration</li>
                <li>• AI-powered automation workflows</li>
                <li>• Intelligent container orchestration</li>
                <li>• Unified, context-aware platform</li>
              </ul>
              <div className="mt-4 text-sm text-green-600 font-medium">
                Result: Unified experience, AI-enhanced everything, massive productivity gains
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-blue-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to Dive Deeper?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/docs/quick-start"
            className="bg-white border border-blue-200 rounded-lg p-4 hover:bg-blue-50 transition-colors"
          >
            <h3 className="font-semibold text-blue-900 mb-1">Quick Start Guide</h3>
            <p className="text-blue-700 text-sm">Get hands-on experience in 5 minutes</p>
          </Link>
          
          <Link 
            href="/docs/integrations/slack"
            className="bg-white border border-blue-200 rounded-lg p-4 hover:bg-blue-50 transition-colors"
          >
            <h3 className="font-semibold text-blue-900 mb-1">Integration Setup</h3>
            <p className="text-blue-700 text-sm">Connect your first service</p>
          </Link>
        </div>
      </section>
    </div>
  );
}