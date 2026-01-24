'use client';

import {
  SparklesIcon,
  CodeBracketIcon,
  CloudIcon,
  BoltIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  CommandLineIcon,
  CubeTransparentIcon,
  ChartBarIcon,
  GlobeAltIcon,
  ServerIcon,
  CpuChipIcon,
  UserGroupIcon,
  BeakerIcon,
  LockClosedIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            RuneSpoke Hub Documentation
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The AI-first development platform that replaces GitHub Copilot, Linear, and your entire dev stack
            with one intelligent solution.
          </p>
        </div>

        {/* Key Value Proposition */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-12 border border-white/20">
          <h2 className="text-3xl font-bold mb-6 text-center">Why RuneSpoke Hub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CurrencyDollarIcon className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">90% Cost Savings</h3>
              <p className="text-gray-300">
                Bring Your Own AI (BYOAI) - Use your Claude, GPT-4, or Gemini API keys directly.
                No platform markup, no subscriptions.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BoltIcon className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">All-in-One Platform</h3>
              <p className="text-gray-300">
                Replace Copilot, Linear, Jira, Jenkins, and dozens of other tools with one unified platform.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <SparklesIcon className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">True AI Integration</h3>
              <p className="text-gray-300">
                Not just code completion - AI drives every aspect from project management to deployment.
              </p>
            </div>
          </div>
        </div>

        {/* Core Features */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* AI Development */}
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-white/30 transition-all">
              <div className="flex items-center mb-4">
                <CpuChipIcon className="h-6 w-6 text-blue-400 mr-3" />
                <h3 className="text-lg font-semibold">Multi-AI Provider Support</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Use Claude 3.5, GPT-4, Gemini, or local LLMs. Switch between models seamlessly.
                Your API keys, your control.
              </p>
            </div>

            {/* IDE Integration */}
            <div className="bg-gradient-to-br from-green-600/20 to-blue-600/20 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-white/30 transition-all">
              <div className="flex items-center mb-4">
                <CodeBracketIcon className="h-6 w-6 text-green-400 mr-3" />
                <h3 className="text-lg font-semibold">Universal IDE Support</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Works with VS Code, Cursor, JetBrains, Vim, and web-based IDEs.
                Real-time collaboration across all platforms.
              </p>
            </div>

            {/* Project Management */}
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-white/30 transition-all">
              <div className="flex items-center mb-4">
                <ChartBarIcon className="h-6 w-6 text-purple-400 mr-3" />
                <h3 className="text-lg font-semibold">AI Project Management</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Replace Linear/Jira with AI-powered issue tracking, sprint planning, and automated workflows.
              </p>
            </div>

            {/* Container Management */}
            <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-white/30 transition-all">
              <div className="flex items-center mb-4">
                <CubeTransparentIcon className="h-6 w-6 text-orange-400 mr-3" />
                <h3 className="text-lg font-semibold">Container Orchestration</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Full Docker & Kubernetes management. Deploy, scale, and monitor containers with AI assistance.
              </p>
            </div>

            {/* Cloud Integration */}
            <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-white/30 transition-all">
              <div className="flex items-center mb-4">
                <CloudIcon className="h-6 w-6 text-cyan-400 mr-3" />
                <h3 className="text-lg font-semibold">Cloud Agnostic</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Deploy to AWS, Azure, GCP, or on-premise. Unified interface for all cloud providers.
              </p>
            </div>

            {/* Security */}
            <div className="bg-gradient-to-br from-red-600/20 to-pink-600/20 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-white/30 transition-all">
              <div className="flex items-center mb-4">
                <ShieldCheckIcon className="h-6 w-6 text-red-400 mr-3" />
                <h3 className="text-lg font-semibold">Enterprise Security</h3>
              </div>
              <p className="text-gray-300 text-sm">
                SOC 2 compliant, end-to-end encryption, SSO support, and air-gapped deployment options.
              </p>
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">20+ Integrations</h2>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                'GitHub', 'GitLab', 'Bitbucket',
                'Slack', 'Discord', 'Teams',
                'AWS', 'Azure', 'GCP',
                'Linear', 'Jira', 'Asana',
                'Docker', 'Kubernetes', 'Terraform',
                'Jenkins', 'CircleCI', 'GitHub Actions',
                'Datadog', 'New Relic', 'Sentry',
                'PostgreSQL', 'MongoDB', 'Redis'
              ].map((service) => (
                <div key={service} className="bg-white/10 rounded-lg px-3 py-2 text-center text-sm hover:bg-white/20 transition-colors">
                  {service}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Workflow Examples */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Real-World Workflows</h2>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <CommandLineIcon className="h-6 w-6 mr-3 text-blue-400" />
                Code Generation & Review
              </h3>
              <p className="text-gray-300 mb-3">
                Generate entire features with natural language. AI reviews PRs, suggests improvements, and auto-fixes issues.
              </p>
              <div className="bg-black/30 rounded-lg p-3 font-mono text-sm">
                <span className="text-green-400">$</span> runespoke create "Add user authentication with OAuth"<br/>
                <span className="text-gray-400">→ Generates complete auth system with tests</span><br/>
                <span className="text-gray-400">→ Creates database migrations</span><br/>
                <span className="text-gray-400">→ Sets up OAuth providers</span><br/>
                <span className="text-gray-400">→ Deploys to staging automatically</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-600/20 to-cyan-600/20 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <BeakerIcon className="h-6 w-6 mr-3 text-green-400" />
                Automated Testing & QA
              </h3>
              <p className="text-gray-300 mb-3">
                AI writes and maintains test suites. Automatically generates edge cases and performance tests.
              </p>
              <div className="bg-black/30 rounded-lg p-3 font-mono text-sm">
                <span className="text-green-400">$</span> runespoke test --ai-generate<br/>
                <span className="text-gray-400">→ Analyzes code coverage gaps</span><br/>
                <span className="text-gray-400">→ Writes missing unit tests</span><br/>
                <span className="text-gray-400">→ Creates integration test scenarios</span><br/>
                <span className="text-gray-400">→ Runs tests across multiple environments</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <ServerIcon className="h-6 w-6 mr-3 text-purple-400" />
                Intelligent Deployment
              </h3>
              <p className="text-gray-300 mb-3">
                AI optimizes deployments, predicts issues, and auto-scales based on traffic patterns.
              </p>
              <div className="bg-black/30 rounded-lg p-3 font-mono text-sm">
                <span className="text-green-400">$</span> runespoke deploy production<br/>
                <span className="text-gray-400">→ Runs pre-deployment checks</span><br/>
                <span className="text-gray-400">→ Optimizes container resources</span><br/>
                <span className="text-gray-400">→ Sets up auto-scaling rules</span><br/>
                <span className="text-gray-400">→ Monitors and rolls back if needed</span>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Comparison */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Cost Comparison</h2>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-red-400">Traditional Stack</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex justify-between">
                    <span>GitHub Copilot Business</span>
                    <span className="font-mono">$19/mo</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Linear/Jira</span>
                    <span className="font-mono">$8/mo</span>
                  </li>
                  <li className="flex justify-between">
                    <span>CI/CD Platform</span>
                    <span className="font-mono">$30/mo</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Monitoring Tools</span>
                    <span className="font-mono">$50/mo</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Other Dev Tools</span>
                    <span className="font-mono">$43/mo</span>
                  </li>
                  <li className="border-t border-white/20 pt-2 flex justify-between font-bold">
                    <span>Total per developer</span>
                    <span className="font-mono text-red-400">$150/mo</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-green-400">RuneSpoke Hub</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex justify-between">
                    <span>Platform Access</span>
                    <span className="font-mono">FREE</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Your AI API costs</span>
                    <span className="font-mono">~$10-20/mo</span>
                  </li>
                  <li className="flex justify-between">
                    <span>All features included</span>
                    <span className="font-mono">✓</span>
                  </li>
                  <li className="flex justify-between">
                    <span>No per-seat pricing</span>
                    <span className="font-mono">✓</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Self-hosted option</span>
                    <span className="font-mono">✓</span>
                  </li>
                  <li className="border-t border-white/20 pt-2 flex justify-between font-bold">
                    <span>Total per developer</span>
                    <span className="font-mono text-green-400">$10-20/mo</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-2xl font-bold text-green-400">
                Save 90%+ compared to traditional tools
              </p>
              <p className="text-gray-300 mt-2">
                For a team of 10 developers, save over $15,000 per year
              </p>
            </div>
          </div>
        </section>

        {/* Getting Started */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Getting Started</h2>
          <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold mb-1">Join the Beta</h3>
                  <p className="text-gray-300">
                    Sign up for early access and get your credentials.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold mb-1">Connect Your AI</h3>
                  <p className="text-gray-300">
                    Add your API keys for Claude, GPT-4, or Gemini. Pay directly, no markup.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold mb-1">Install Extensions</h3>
                  <p className="text-gray-300">
                    Add our extensions to VS Code, Cursor, or your preferred IDE.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold mb-1">Start Building</h3>
                  <p className="text-gray-300">
                    Use natural language to code, deploy, and manage your entire stack.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Development?</h2>
            <p className="text-xl mb-6 text-gray-200">
              Join the beta and be among the first to experience the future of AI-powered development.
            </p>
            <a
              href="/#waitlist"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Join the Beta Waitlist →
            </a>
            <p className="mt-4 text-sm text-gray-200">
              Limited spots available • No credit card required • BYOAI from day one
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}