'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function QuickStartPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Quick Start Guide
        </h1>
        <p className="text-xl text-gray-600">
          Get up and running with RuneSpoke Hub in just 5 minutes. This guide will walk you through 
          the essential setup steps to start automating your development workflow.
        </p>
      </div>

      {/* Step 1: Account Setup */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Step 1: Account Setup
        </h2>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            You're already logged in!
          </h3>
          <p className="text-blue-700">
            Since you're reading this, your account is set up and ready to go. Let's move on to configuring your first integration.
          </p>
        </div>
      </section>

      {/* Step 2: Connect Your First Integration */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Step 2: Connect Your First Integration
        </h2>
        
        <p className="text-gray-600 mb-6">
          We recommend starting with GitHub since it's central to most development workflows.
        </p>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            <Image
              src="/logos/github-mark.svg"
              alt="GitHub"
              width={32}
              height={32}
              className="mr-3"
            />
            <h3 className="text-lg font-semibold text-gray-900">Connect GitHub</h3>
          </div>
          
          <ol className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
              <span>Go to <Link href="/integrations" className="text-blue-600 hover:text-blue-700 font-medium">Integrations</Link> in the sidebar</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
              <span>Click the <strong>GitHub</strong> card</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
              <span>Click <strong>"Connect GitHub"</strong></span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">4</span>
              <span>Authorize RuneSpoke Hub in the GitHub popup</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">5</span>
              <span>Select which repositories to connect</span>
            </li>
          </ol>

          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 text-sm">
              <strong>✅ Success!</strong> Once connected, you'll see your repositories in the dashboard and can set up automated workflows.
            </p>
          </div>
        </div>
      </section>

      {/* Step 3: Set Up AI Provider */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Step 3: Configure AI Provider
        </h2>
        
        <p className="text-gray-600 mb-6">
          Choose your preferred AI provider to power intelligent features. We recommend starting with Claude.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <Image
              src="/logos/anthropic-claude.svg"
              alt="Claude"
              width={48}
              height={48}
              className="mx-auto mb-3"
            />
            <h4 className="font-semibold text-gray-900 mb-2">Claude</h4>
            <p className="text-sm text-gray-600 mb-3">Best for code analysis and complex reasoning</p>
            <Link 
              href="/docs/ai/providers" 
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
            >
              Setup Guide
            </Link>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <Image
              src="/logos/openai-gpt.svg"
              alt="OpenAI GPT"
              width={48}
              height={48}
              className="mx-auto mb-3"
            />
            <h4 className="font-semibold text-gray-900 mb-2">OpenAI GPT</h4>
            <p className="text-sm text-gray-600 mb-3">Excellent for general assistance and automation</p>
            <Link 
              href="/docs/ai/providers" 
              className="inline-block bg-gray-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors"
            >
              Setup Guide
            </Link>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <Image
              src="/logos/google-gemini.svg"
              alt="Google Gemini"
              width={48}
              height={48}
              className="mx-auto mb-3"
            />
            <h4 className="font-semibold text-gray-900 mb-2">Google Gemini</h4>
            <p className="text-sm text-gray-600 mb-3">Great for documentation and explanations</p>
            <Link 
              href="/docs/ai/providers" 
              className="inline-block bg-gray-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors"
            >
              Setup Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Step 4: Create Your First Workflow */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Step 4: Create Your First Automation
        </h2>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Simple GitHub Notification Workflow
          </h3>
          
          <p className="text-gray-600 mb-4">
            Let's create a workflow that notifies your team when code is pushed to your main branch.
          </p>

          <ol className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
              <span>Go to <Link href="/automation" className="text-blue-600 hover:text-blue-700 font-medium">Automation</Link> in the sidebar</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
              <span>Click <strong>"Create Workflow"</strong></span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
              <span>Choose <strong>"GitHub Push"</strong> as your trigger</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">4</span>
              <span>Add action: <strong>"Send Notification"</strong></span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">5</span>
              <span>Configure your message and save</span>
            </li>
          </ol>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">
              <strong>💡 Pro Tip:</strong> Start simple and expand your workflows as you get more comfortable with the platform.
            </p>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          🎉 You're All Set!
        </h2>
        
        <p className="text-gray-600 mb-6">
          Congratulations! You've completed the quick start setup. Here's what to explore next:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/docs/integrations/slack"
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-2">
              <Image
                src="/logos/slack-mark.svg"
                alt="Slack"
                width={24}
                height={24}
                className="mr-2"
              />
              <h3 className="font-semibold text-gray-900">Connect Slack</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Get team notifications and collaboration features
            </p>
          </Link>

          <Link 
            href="/docs/development/containers"
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-2">
              <Image
                src="/logos/docker-mark.svg"
                alt="Docker"
                width={24}
                height={24}
                className="mr-2"
              />
              <h3 className="font-semibold text-gray-900">Container Management</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Manage Docker containers and deployments
            </p>
          </Link>

          <Link 
            href="/docs/ai/chat-assistant"
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-2">
              <Image
                src="/logos/anthropic-claude.svg"
                alt="AI Assistant"
                width={24}
                height={24}
                className="mr-2"
              />
              <h3 className="font-semibold text-gray-900">AI Chat Assistant</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Learn to use the intelligent assistant effectively
            </p>
          </Link>

          <Link 
            href="/docs/development/automation"
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-2">
              <Image
                src="/logos/automation-icon.svg"
                alt="Automation"
                width={24}
                height={24}
                className="mr-2"
              />
              <h3 className="font-semibold text-gray-900">Advanced Workflows</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Build complex automation workflows
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}