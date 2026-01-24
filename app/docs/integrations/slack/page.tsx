'use client';

import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  LinkIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
  CogIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

export default function SlackIntegrationPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12">
            <Image 
              src="/logos/slack-mark.svg" 
              alt="Slack" 
              width={48} 
              height={48} 
              className="w-full h-full object-contain" 
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            Slack Integration
          </h1>
        </div>
        <p className="text-xl text-gray-600">
          Connect RuneSpoke Hub with Slack to receive intelligent notifications, control workflows, 
          and interact with your AI assistant directly from your team channels.
        </p>
      </div>

      {/* Benefits */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Connect Slack?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <BellIcon className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Smart Notifications</h3>
            <p className="text-gray-600">
              Get AI-filtered notifications about deployments, issues, and workflow completions directly in your team channels.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <ChatBubbleLeftRightIcon className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Chat with AI Assistant</h3>
            <p className="text-gray-600">
              Interact with your RuneSpoke AI assistant using slash commands, get code reviews, and manage workflows.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <CogIcon className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Workflow Control</h3>
            <p className="text-gray-600">
              Start deployments, approve code reviews, and manage containers directly from Slack using simple commands.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <ShieldCheckIcon className="h-5 w-5 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Team Collaboration</h3>
            <p className="text-gray-600">
              Share AI insights, coordinate deployments, and keep your entire team in sync with development activities.
            </p>
          </div>
        </div>
      </section>

      {/* Setup Steps */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Setup Guide</h2>
        
        <div className="space-y-6">
          {/* Step 1 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold shrink-0">
                1
              </span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Navigate to Integrations
                </h3>
                <p className="text-gray-600 mb-4">
                  In your RuneSpoke Hub dashboard, go to the Integrations page and find the Slack integration card.
                </p>
                <Link 
                  href="/integrations"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <LinkIcon className="h-4 w-4" />
                  Go to Integrations
                </Link>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold shrink-0">
                2
              </span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Authorize RuneSpoke Hub
                </h3>
                <p className="text-gray-600 mb-4">
                  Click "Connect to Slack" and authorize RuneSpoke Hub to access your Slack workspace. 
                  You'll need admin permissions or approval from your Slack admin.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Admin Required</span>
                  </div>
                  <p className="text-yellow-700 text-sm">
                    If you're not a Slack admin, the app will be submitted for approval. Your admin will receive a notification.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold shrink-0">
                3
              </span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Configure Channels
                </h3>
                <p className="text-gray-600 mb-4">
                  Choose which channels should receive notifications for different types of events:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• <strong>General notifications:</strong> #dev-updates or #general</li>
                  <li>• <strong>Deployment alerts:</strong> #deployments</li>
                  <li>• <strong>Issue tracking:</strong> #issues or #bugs</li>
                  <li>• <strong>AI interactions:</strong> #ai-assistant or dedicated channel</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold shrink-0">
                4
              </span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Test the Integration
                </h3>
                <p className="text-gray-600 mb-4">
                  Test your connection by using slash commands or triggering a workflow. You should see a confirmation message.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800">Integration Active</span>
                  </div>
                  <p className="text-green-700 text-sm mt-1">
                    Your Slack workspace is now connected to RuneSpoke Hub!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Commands */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Slash Commands</h2>
        
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <p className="text-gray-600">
              Once connected, you can use these commands in any channel where the RuneSpoke Hub app is installed:
            </p>
          </div>
          
          <div className="divide-y divide-gray-200">
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">/runespoke status</code>
              </h3>
              <p className="text-gray-600">Check the status of your deployments, containers, and workflows</p>
            </div>
            
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">/runespoke deploy [environment]</code>
              </h3>
              <p className="text-gray-600">Trigger a deployment to staging or production</p>
            </div>
            
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">/runespoke ai [question]</code>
              </h3>
              <p className="text-gray-600">Ask your AI assistant anything about your codebase or development process</p>
            </div>
            
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">/runespoke logs [service]</code>
              </h3>
              <p className="text-gray-600">Get recent logs from containers or services</p>
            </div>
            
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">/runespoke workflow run [workflow_name]</code>
              </h3>
              <p className="text-gray-600">Execute a specific automation workflow</p>
            </div>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Troubleshooting</h2>
        
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Commands not working?</h3>
            <ul className="text-gray-600 space-y-1">
              <li>• Make sure the RuneSpoke Hub app is installed in the channel</li>
              <li>• Verify you have the necessary permissions in your Slack workspace</li>
              <li>• Check that your RuneSpoke Hub account is still connected</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Not receiving notifications?</h3>
            <ul className="text-gray-600 space-y-1">
              <li>• Check your notification settings in the RuneSpoke Hub dashboard</li>
              <li>• Ensure the correct channels are configured for different notification types</li>
              <li>• Verify that notifications aren't being filtered by your Slack notification settings</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-blue-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What's Next?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/docs/integrations/github"
            className="bg-white border border-blue-200 rounded-lg p-4 hover:bg-blue-50 transition-colors"
          >
            <h3 className="font-semibold text-blue-900 mb-1">Connect GitHub</h3>
            <p className="text-blue-700 text-sm">Set up repository integration for automated workflows</p>
          </Link>
          
          <Link 
            href="/docs/ai/chat-assistant"
            className="bg-white border border-blue-200 rounded-lg p-4 hover:bg-blue-50 transition-colors"
          >
            <h3 className="font-semibold text-blue-900 mb-1">AI Assistant Setup</h3>
            <p className="text-blue-700 text-sm">Configure your AI assistant for maximum productivity</p>
          </Link>
        </div>
      </section>
    </div>
  );
}