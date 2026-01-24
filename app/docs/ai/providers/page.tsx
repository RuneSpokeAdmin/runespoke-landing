import Image from 'next/image';
import Link from 'next/link';
import {
  SparklesIcon,
  CpuChipIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  CogIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  BoltIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

export default function AIProvidersDocsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          AI Provider Configuration
        </h1>
        <p className="text-lg text-gray-600">
          Configure and manage AI providers in RuneSpoke Hub. Support for Claude, GPT-4, Gemini, and more with intelligent routing and cost optimization.
        </p>
      </div>

      {/* Quick Overview */}
      <div className="mb-12 p-6 bg-purple-50 rounded-lg border border-purple-200">
        <h2 className="text-xl font-semibold text-purple-900 mb-3">
          BYOAI (Bring Your Own AI)
        </h2>
        <p className="text-purple-800 mb-4">
          RuneSpoke Hub supports multiple AI providers with intelligent routing, cost optimization, and unified API access.
        </p>
        <ul className="space-y-2 text-purple-800">
          <li className="flex items-center gap-2">
            <CheckCircleIcon className="h-4 w-4 text-purple-600" />
            Use your own API keys and credits
          </li>
          <li className="flex items-center gap-2">
            <CheckCircleIcon className="h-4 w-4 text-purple-600" />
            Intelligent model selection and routing
          </li>
          <li className="flex items-center gap-2">
            <CheckCircleIcon className="h-4 w-4 text-purple-600" />
            Cost tracking and optimization
          </li>
          <li className="flex items-center gap-2">
            <CheckCircleIcon className="h-4 w-4 text-purple-600" />
            Fallback and redundancy support
          </li>
        </ul>
      </div>

      {/* Supported Providers */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Supported AI Providers</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Anthropic Claude */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10">
                <Image
                  src="/logos/anthropic-claude.svg"
                  alt="Anthropic Claude"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Anthropic Claude</h3>
                <p className="text-sm text-gray-500">Claude 3.5 Sonnet, Claude 3 Opus</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Advanced reasoning and code generation with excellent instruction following and safety features.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Best for:</span>
                <span className="text-gray-700">Code review, complex reasoning</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Context:</span>
                <span className="text-gray-700">200K tokens</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Cost:</span>
                <span className="text-gray-700">$3-15/1M tokens</span>
              </div>
            </div>
          </div>

          {/* OpenAI GPT */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10">
                <Image
                  src="/logos/openai-gpt.svg"
                  alt="OpenAI GPT"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">OpenAI GPT</h3>
                <p className="text-sm text-gray-500">GPT-4o, GPT-4 Turbo, GPT-3.5</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Powerful language model with excellent general knowledge and coding capabilities.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Best for:</span>
                <span className="text-gray-700">General coding, explanations</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Context:</span>
                <span className="text-gray-700">128K tokens</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Cost:</span>
                <span className="text-gray-700">$2.5-30/1M tokens</span>
              </div>
            </div>
          </div>

          {/* Google Gemini */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10">
                <Image
                  src="/logos/google-gemini.svg"
                  alt="Google Gemini"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Google Gemini</h3>
                <p className="text-sm text-gray-500">Gemini Pro, Gemini Ultra</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Multimodal AI with strong performance on reasoning and code generation tasks.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Best for:</span>
                <span className="text-gray-700">Multimodal, fast inference</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Context:</span>
                <span className="text-gray-700">1M tokens</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Cost:</span>
                <span className="text-gray-700">$1.25-7/1M tokens</span>
              </div>
            </div>
          </div>

          {/* GitHub Copilot */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10">
                <Image
                  src="/logos/github-mark.svg"
                  alt="GitHub Copilot"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">GitHub Copilot</h3>
                <p className="text-sm text-gray-500">Codex-based code completion</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Specialized for code completion and generation with GitHub integration.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Best for:</span>
                <span className="text-gray-700">Code completion, IDE integration</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Context:</span>
                <span className="text-gray-700">8K tokens</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Cost:</span>
                <span className="text-gray-700">$10-19/month</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Configuration Guide */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Configuration Guide</h2>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 1: Add API Keys</h3>
            <p className="text-gray-600 mb-4">
              Configure your AI provider API keys in the RuneSpoke Hub settings.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="text-sm text-gray-700">
{`# Environment Variables
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
GOOGLE_AI_API_KEY=AI...
GITHUB_TOKEN=ghp_...`}
              </pre>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 2: Model Selection</h3>
            <p className="text-gray-600 mb-4">
              Configure which models to use for different tasks.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-medium text-blue-900">Code Generation</h4>
                <p className="text-sm text-blue-700">Claude 3.5 Sonnet</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <h4 className="font-medium text-green-900">Code Review</h4>
                <p className="text-sm text-green-700">GPT-4o</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <h4 className="font-medium text-purple-900">Quick Tasks</h4>
                <p className="text-sm text-purple-700">Gemini Pro</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 3: Routing Rules</h3>
            <p className="text-gray-600 mb-4">
              Set up intelligent routing based on task type, cost, and performance.
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-900">Complex Reasoning</span>
                <span className="text-sm text-gray-600">Claude 3.5 Sonnet → GPT-4o</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-900">Code Completion</span>
                <span className="text-sm text-gray-600">GitHub Copilot → Claude 3.5</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-900">Fast Queries</span>
                <span className="text-sm text-gray-600">Gemini Pro → GPT-3.5</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Features */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Advanced Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <BoltIcon className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Smart Routing</h3>
            </div>
            <p className="text-sm text-gray-600">
              Automatically route requests to the best model based on context, cost, and performance requirements.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Cost Optimization</h3>
            </div>
            <p className="text-sm text-gray-600">
              Track usage and costs across providers. Set budgets and get alerts when limits are reached.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheckIcon className="h-6 w-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Fallback & Redundancy</h3>
            </div>
            <p className="text-sm text-gray-600">
              Configure fallback providers for high availability. Automatic failover when providers are unavailable.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <ChartBarIcon className="h-6 w-6 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-900">Analytics & Monitoring</h3>
            </div>
            <p className="text-sm text-gray-600">
              Detailed analytics on model performance, response times, and cost breakdowns across all providers.
            </p>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Best Practices</h2>
        
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg">
            <div className="p-4 bg-green-50 border-b border-gray-200">
              <h3 className="font-medium text-green-900">Model Selection Tips</h3>
            </div>
            <div className="p-4">
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  Use Claude 3.5 Sonnet for complex code analysis and reasoning tasks
                </li>
                <li className="flex gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  Use GPT-4o for general programming questions and explanations
                </li>
                <li className="flex gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  Use Gemini Pro for fast, cost-effective queries with large context
                </li>
                <li className="flex gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  Use GitHub Copilot for IDE-integrated code completion
                </li>
              </ul>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg">
            <div className="p-4 bg-blue-50 border-b border-gray-200">
              <h3 className="font-medium text-blue-900">Cost Management</h3>
            </div>
            <div className="p-4">
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  Set monthly budgets for each provider
                </li>
                <li className="flex gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  Use cheaper models for simple tasks
                </li>
                <li className="flex gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  Monitor usage patterns and optimize routing
                </li>
                <li className="flex gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  Enable caching for repeated queries
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-lg border border-purple-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Next Steps</h2>
        <p className="text-gray-600 mb-6">
          Now that you understand AI provider configuration, explore these related topics:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/docs/ai/chat-assistant"
            className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-300 transition-colors"
          >
            <SparklesIcon className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-900">AI Chat Assistant</span>
          </Link>
          <Link 
            href="/docs/ai/automation"
            className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-300 transition-colors"
          >
            <CogIcon className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-900">AI Automation</span>
          </Link>
        </div>
      </div>
    </div>
  );
}