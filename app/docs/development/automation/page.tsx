'use client';

import {
  BoltIcon,
  CogIcon,
  PlayIcon,
  CodeBracketIcon,
  ClockIcon,
  SparklesIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  BeakerIcon,
  CommandLineIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

export default function DevelopmentAutomationPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <BoltIcon className="h-6 w-6 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            Development Automation
          </h1>
        </div>
        <p className="text-xl text-gray-600">
          Create intelligent workflows that learn and adapt, automating your entire development lifecycle 
          from code commits to production deployments with AI-powered decision making.
        </p>
      </div>

      {/* Why Automation Matters */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Why RuneSpoke Hub Automation?</h2>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-red-600 text-lg">Traditional CI/CD Limitations</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span className="text-gray-700">Static, rule-based workflows</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span className="text-gray-700">Manual configuration for every project</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span className="text-gray-700">No intelligent decision making</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span className="text-gray-700">Separate tools for different stages</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span className="text-gray-700">No context awareness</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-bold text-green-600 text-lg">RuneSpoke Hub Intelligence</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-gray-700">AI learns from your patterns and adapts</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-gray-700">Self-configuring based on code analysis</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-gray-700">Intelligent routing and decision making</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-gray-700">Unified platform for entire lifecycle</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-gray-700">Full project and team context</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Automation Features */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Core Automation Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <SparklesIcon className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">AI Code Reviews</h3>
            <p className="text-gray-600 mb-3">
              Multi-AI code review system using Claude, GPT-4, and Gemini for comprehensive analysis, security scanning, and optimization suggestions.
            </p>
            <div className="text-sm text-blue-600">Supports 50+ programming languages</div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <BeakerIcon className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Intelligent Testing</h3>
            <p className="text-gray-600 mb-3">
              AI-powered test generation, intelligent test selection, and automated test maintenance based on code changes and risk analysis.
            </p>
            <div className="text-sm text-green-600">Reduces test execution time by up to 70%</div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <RocketLaunchIcon className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Smart Deployments</h3>
            <p className="text-gray-600 mb-3">
              AI-driven deployment decisions, automatic rollback on issues, canary deployments, and intelligent traffic routing based on performance metrics.
            </p>
            <div className="text-sm text-purple-600">99.9% deployment success rate</div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <ShieldCheckIcon className="h-5 w-5 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Security Automation</h3>
            <p className="text-gray-600 mb-3">
              Automated security scanning, vulnerability assessment, compliance checking, and intelligent threat detection across your entire stack.
            </p>
            <div className="text-sm text-orange-600">SAST, DAST, dependency scanning, and more</div>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Getting Started with Automation</h2>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold shrink-0">1</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect Your Repository</h3>
                <p className="text-gray-600 mb-4">
                  Start by connecting your GitHub, GitLab, or Bitbucket repository. RuneSpoke Hub will automatically analyze your codebase and suggest optimal workflows.
                </p>
                <Link 
                  href="/docs/integrations/github"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <Image src="/logos/github-mark.svg" alt="GitHub" width={16} height={16} className="w-4 h-4 object-contain" />
                  GitHub Setup Guide →
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold shrink-0">2</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose a Workflow Template</h3>
                <p className="text-gray-600 mb-4">
                  Select from AI-optimized templates or let RuneSpoke Hub create a custom workflow based on your project analysis.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-1">Full Stack Web App</h4>
                    <p className="text-gray-600 text-sm">AI review → Testing → Staging → Production</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-1">API/Microservice</h4>
                    <p className="text-gray-600 text-sm">Code review → API testing → Container deployment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold shrink-0">3</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Configure AI Providers</h3>
                <p className="text-gray-600 mb-4">
                  Set up your preferred AI providers for different automation tasks. RuneSpoke Hub optimizes cost and performance automatically.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Image src="/logos/anthropic-claude.svg" alt="Claude" width={20} height={20} className="w-5 h-5 object-contain" />
                    <span className="text-sm text-gray-700">Claude (reasoning)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image src="/logos/openai-gpt.svg" alt="GPT-4" width={20} height={20} className="w-5 h-5 object-contain" />
                    <span className="text-sm text-gray-700">GPT-4 (complex tasks)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image src="/logos/google-gemini.svg" alt="Gemini" width={20} height={20} className="w-5 h-5 object-contain" />
                    <span className="text-sm text-gray-700">Gemini (speed)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold shrink-0">4</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Test Your First Workflow</h3>
                <p className="text-gray-600 mb-4">
                  Make a test commit or create a pull request to see RuneSpoke Hub automation in action. The AI will learn from every execution.
                </p>
                <Link 
                  href="/automation"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
                >
                  <PlayIcon className="h-4 w-4" />
                  View Automation Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Types */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Workflow Types</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <CodeBracketIcon className="h-5 w-5 text-blue-600" />
              Code Quality Workflows
            </h3>
            <ul className="text-gray-600 space-y-2 text-sm">
              <li>• Multi-AI code review pipeline</li>
              <li>• Automated refactoring suggestions</li>
              <li>• Code style and formatting enforcement</li>
              <li>• Technical debt analysis and tracking</li>
              <li>• Performance optimization recommendations</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <BeakerIcon className="h-5 w-5 text-green-600" />
              Testing Workflows
            </h3>
            <ul className="text-gray-600 space-y-2 text-sm">
              <li>• AI-generated test case creation</li>
              <li>• Intelligent test selection and prioritization</li>
              <li>• Automated test maintenance and updates</li>
              <li>• Visual regression testing</li>
              <li>• Performance and load testing</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <RocketLaunchIcon className="h-5 w-5 text-purple-600" />
              Deployment Workflows
            </h3>
            <ul className="text-gray-600 space-y-2 text-sm">
              <li>• Blue-green and canary deployments</li>
              <li>• Automatic rollback on failure detection</li>
              <li>• Multi-environment promotion pipelines</li>
              <li>• Infrastructure-as-code validation</li>
              <li>• Post-deployment monitoring and alerting</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <ShieldCheckIcon className="h-5 w-5 text-orange-600" />
              Security Workflows
            </h3>
            <ul className="text-gray-600 space-y-2 text-sm">
              <li>• SAST and DAST security scanning</li>
              <li>• Dependency vulnerability monitoring</li>
              <li>• Compliance and audit trail automation</li>
              <li>• Secret detection and rotation</li>
              <li>• Container and infrastructure security</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Advanced Automation Features</h2>
        
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <SparklesIcon className="h-5 w-5 text-purple-600" />
              AI Learning & Adaptation
            </h3>
            <p className="text-gray-600 mb-3">
              RuneSpoke Hub's AI continuously learns from your team's patterns, preferences, and outcomes to optimize workflows automatically.
            </p>
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-medium text-purple-900 mb-2">What the AI learns:</h4>
              <ul className="text-purple-800 text-sm space-y-1">
                <li>• Code patterns and architectural preferences</li>
                <li>• Testing strategies that work best for your codebase</li>
                <li>• Deployment timing and risk tolerance</li>
                <li>• Team review patterns and approval workflows</li>
                <li>• Performance characteristics and optimization opportunities</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <ClockIcon className="h-5 w-5 text-blue-600" />
              Intelligent Scheduling
            </h3>
            <p className="text-gray-600 mb-3">
              AI-powered scheduling that considers resource availability, dependency chains, team schedules, and historical performance data.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-1">Peak Hours Optimization</h4>
                <p className="text-blue-800 text-sm">Schedules resource-intensive tasks during low-traffic periods</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-1">Dependency Management</h4>
                <p className="text-blue-800 text-sm">Automatically sequences tasks based on dependencies and constraints</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <CommandLineIcon className="h-5 w-5 text-green-600" />
              Cross-Platform Integration
            </h3>
            <p className="text-gray-600 mb-3">
              Seamless integration with your existing tools while providing unified intelligence and coordination across platforms.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Image src="/logos/github-mark.svg" alt="GitHub" width={20} height={20} className="w-5 h-5 object-contain" />
                <span className="text-sm text-gray-700">GitHub Actions</span>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/logos/slack-mark.svg" alt="Slack" width={20} height={20} className="w-5 h-5 object-contain" />
                <span className="text-sm text-gray-700">Slack Notifications</span>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/logos/docker-mark.svg" alt="Docker" width={20} height={20} className="w-5 h-5 object-contain" />
                <span className="text-sm text-gray-700">Container Orchestration</span>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/logos/aws.svg" alt="AWS" width={20} height={20} className="w-5 h-5 object-contain" />
                <span className="text-sm text-gray-700">Cloud Deployments</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Best Practices</h2>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-semibold text-yellow-900 mb-4">Automation Success Tips</h3>
          <div className="space-y-3 text-yellow-800">
            <div className="flex items-start gap-2">
              <CheckCircleIcon className="h-5 w-5 text-yellow-600 mt-0.5 shrink-0" />
              <div>
                <strong>Start simple:</strong> Begin with basic workflows and let the AI learn before adding complexity
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircleIcon className="h-5 w-5 text-yellow-600 mt-0.5 shrink-0" />
              <div>
                <strong>Monitor and iterate:</strong> Review automation results and provide feedback to improve AI decisions
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircleIcon className="h-5 w-5 text-yellow-600 mt-0.5 shrink-0" />
              <div>
                <strong>Trust the process:</strong> Let the AI handle routine decisions while focusing on high-value work
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircleIcon className="h-5 w-5 text-yellow-600 mt-0.5 shrink-0" />
              <div>
                <strong>Set clear boundaries:</strong> Define what should be automated vs. what requires human oversight
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-blue-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to Automate Everything?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/automation"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-4 transition-colors"
          >
            <h3 className="font-semibold mb-1">Create Your First Workflow</h3>
            <p className="text-blue-100 text-sm">Start automating your development process now</p>
          </Link>
          
          <Link 
            href="/docs/integrations/github"
            className="bg-white border border-blue-200 rounded-lg p-4 hover:bg-blue-50 transition-colors"
          >
            <h3 className="font-semibold text-blue-900 mb-1">Connect GitHub</h3>
            <p className="text-blue-700 text-sm">Set up repository automation</p>
          </Link>
        </div>
      </section>
    </div>
  );
}