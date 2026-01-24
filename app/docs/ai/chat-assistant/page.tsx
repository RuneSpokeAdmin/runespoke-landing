'use client';

import {
  SparklesIcon,
  CodeBracketIcon,
  LightBulbIcon,
  ChatBubbleLeftRightIcon,
  CogIcon,
  ClockIcon,
  CheckCircleIcon,
  BoltIcon,
  CommandLineIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

export default function AIChatAssistantPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <SparklesIcon className="h-6 w-6 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            AI Chat Assistant
          </h1>
        </div>
        <p className="text-xl text-gray-600">
          Your intelligent coding companion that understands your project context, provides smart suggestions, 
          and helps you build better software faster with multi-AI provider intelligence.
        </p>
      </div>

      {/* Why RuneSpoke AI vs GitHub Copilot */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">RuneSpoke AI vs GitHub Copilot</h2>
        
        <div className="bg-gradient-to-r from-red-50 to-green-50 rounded-lg border p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-red-600 text-lg">GitHub Copilot Limitations</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span className="text-gray-700">Single AI provider (OpenAI only)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span className="text-gray-700">Expensive ($10-20/month per user)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span className="text-gray-700">Limited to code completion</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span className="text-gray-700">No offline capability</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span className="text-gray-700">No project-wide context</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span className="text-gray-700">Limited customization</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-bold text-green-600 text-lg">RuneSpoke AI Advantages</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-gray-700">Multi-AI: Claude, GPT-4, Gemini, Local models</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-gray-700">Cost-optimized: Pay per use + FREE local</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-gray-700">Full development lifecycle support</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-gray-700">Full offline support with local models</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-gray-700">Complete project awareness</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-gray-700">Fully customizable and private</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <div className="text-lg font-bold text-green-600">Result: Superior AI assistance at lower cost with complete control</div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <CodeBracketIcon className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Smart Code Completion</h3>
            <p className="text-gray-600 mb-3">
              AI-powered code suggestions from multiple providers with project context awareness and cost optimization.
            </p>
            <div className="text-sm text-blue-600">
              Supports TypeScript, Python, Go, Rust, and 50+ languages
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <ChatBubbleLeftRightIcon className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Conversational AI</h3>
            <p className="text-gray-600 mb-3">
              Ask questions about your codebase, get explanations, debug issues, and receive architecture advice.
            </p>
            <div className="text-sm text-green-600">
              Works across web interface, Slack, and Discord
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <LightBulbIcon className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Intelligent Insights</h3>
            <p className="text-gray-600 mb-3">
              AI analyzes your project patterns, suggests optimizations, identifies potential issues, and recommends improvements.
            </p>
            <div className="text-sm text-purple-600">
              Proactive suggestions based on best practices
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <BoltIcon className="h-5 w-5 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Multi-Provider Intelligence</h3>
            <p className="text-gray-600 mb-3">
              Automatically routes requests to the best AI provider based on task complexity, cost, and performance needs.
            </p>
            <div className="text-sm text-orange-600">
              Claude for reasoning, GPT-4 for complex tasks, Gemini for speed
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Getting Started</h2>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold shrink-0">1</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Access the AI Assistant</h3>
                <p className="text-gray-600 mb-4">
                  Navigate to the AI Assistant page in your RuneSpoke Hub dashboard or use the chat widget available on every page.
                </p>
                <Link 
                  href="/ai-assistant"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
                >
                  <SparklesIcon className="h-4 w-4" />
                  Open AI Assistant
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold shrink-0">2</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Your Mode</h3>
                <p className="text-gray-600 mb-4">
                  Select from different interaction modes based on your current needs:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-1">Chat Mode</h4>
                    <p className="text-gray-600 text-sm">Interactive conversation for questions and guidance</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-1">Code Completion</h4>
                    <p className="text-gray-600 text-sm">Smart code suggestions and auto-completion</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-1">Code Review</h4>
                    <p className="text-gray-600 text-sm">AI-powered code analysis and improvement suggestions</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-1">Debug Assistant</h4>
                    <p className="text-gray-600 text-sm">Help identifying and fixing issues in your code</p>
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
                  Set your preferred AI providers and cost optimization preferences:
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Recommended Settings</h4>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• <strong>Primary:</strong> Claude (best reasoning)</li>
                    <li>• <strong>Secondary:</strong> GPT-4 (complex tasks)</li>
                    <li>• <strong>Fast tasks:</strong> Gemini (speed optimized)</li>
                    <li>• <strong>Offline:</strong> Local CodeLlama (privacy)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Advanced Features</h2>
        
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <CogIcon className="h-5 w-5 text-gray-600" />
              Project Context Awareness
            </h3>
            <p className="text-gray-600 mb-3">
              The AI automatically understands your project structure, dependencies, recent changes, and coding patterns 
              to provide more relevant suggestions.
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">What the AI knows about your project:</h4>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• Programming languages and frameworks used</li>
                <li>• Package dependencies and versions</li>
                <li>• Recent file changes and commit history</li>
                <li>• Code patterns and architecture decisions</li>
                <li>• Active issues and project roadmap</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <CommandLineIcon className="h-5 w-5 text-gray-600" />
              Integration Commands
            </h3>
            <p className="text-gray-600 mb-3">
              Use the AI assistant across your favorite tools with slash commands and integrations:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Slack Integration</h4>
                <code className="text-sm bg-gray-200 px-2 py-1 rounded">/runespoke ai [question]</code>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Discord Integration</h4>
                <code className="text-sm bg-gray-200 px-2 py-1 rounded">!runespoke ai [question]</code>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <ClockIcon className="h-5 w-5 text-gray-600" />
              Cost & Performance Optimization
            </h3>
            <p className="text-gray-600 mb-3">
              RuneSpoke AI automatically optimizes costs and performance by routing requests to the most appropriate provider:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-1">Simple Tasks</h4>
                <p className="text-green-800 text-sm">Routed to Gemini (fast & cheap)</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-1">Complex Reasoning</h4>
                <p className="text-blue-800 text-sm">Routed to Claude (best quality)</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-medium text-purple-900 mb-1">Sensitive Code</h4>
                <p className="text-purple-800 text-sm">Routed to local models</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Best Practices</h2>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-semibold text-yellow-900 mb-4">Tips for Better AI Interactions</h3>
          <div className="space-y-3 text-yellow-800">
            <div className="flex items-start gap-2">
              <CheckCircleIcon className="h-5 w-5 text-yellow-600 mt-0.5 shrink-0" />
              <div>
                <strong>Be specific:</strong> "Optimize this React component for performance" vs "Make this better"
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircleIcon className="h-5 w-5 text-yellow-600 mt-0.5 shrink-0" />
              <div>
                <strong>Provide context:</strong> Include relevant code snippets and explain the problem you're solving
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircleIcon className="h-5 w-5 text-yellow-600 mt-0.5 shrink-0" />
              <div>
                <strong>Use follow-up questions:</strong> Refine suggestions with additional requirements or constraints
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircleIcon className="h-5 w-5 text-yellow-600 mt-0.5 shrink-0" />
              <div>
                <strong>Leverage project context:</strong> Reference existing patterns, "like the user service" or "following our API design"
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-purple-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to Experience the Future of AI Coding?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/ai-assistant"
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg p-4 transition-colors"
          >
            <h3 className="font-semibold mb-1">Start Using AI Assistant</h3>
            <p className="text-purple-100 text-sm">Experience multi-AI intelligence now</p>
          </Link>
          
          <Link 
            href="/docs/integrations/slack"
            className="bg-white border border-purple-200 rounded-lg p-4 hover:bg-purple-50 transition-colors"
          >
            <h3 className="font-semibold text-purple-900 mb-1">Connect Slack</h3>
            <p className="text-purple-700 text-sm">Use AI assistant in your team channels</p>
          </Link>
        </div>
      </section>
    </div>
  );
}