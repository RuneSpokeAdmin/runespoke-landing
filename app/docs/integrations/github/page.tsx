'use client';

import {
  CodeBracketIcon,
  BoltIcon,
  ShieldCheckIcon,
  ClipboardDocumentCheckIcon,
  RocketLaunchIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  LinkIcon,
  CommandLineIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

export default function GitHubIntegrationPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12">
            <Image 
              src="/logos/github-mark.svg" 
              alt="GitHub" 
              width={48} 
              height={48} 
              className="w-full h-full object-contain" 
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            GitHub Integration
          </h1>
        </div>
        <p className="text-xl text-gray-600">
          Connect your GitHub repositories to RuneSpoke Hub for automated workflows, AI-powered code reviews, 
          intelligent deployments, and seamless collaboration across your development lifecycle.
        </p>
      </div>

      {/* Why Connect GitHub? */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Connect GitHub?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <BoltIcon className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Automated Workflows</h3>
            <p className="text-gray-600">
              Trigger AI-powered code reviews, testing, and deployments automatically on every push, pull request, and merge.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <ClipboardDocumentCheckIcon className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">AI Code Reviews</h3>
            <p className="text-gray-600">
              Get intelligent code reviews from multiple AI providers (Claude, GPT-4, Gemini) with contextual suggestions and issue detection.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <RocketLaunchIcon className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Smart Deployments</h3>
            <p className="text-gray-600">
              Automatically deploy to staging and production based on branch rules, test results, and AI-validated code quality.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <ShieldCheckIcon className="h-5 w-5 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Security & Compliance</h3>
            <p className="text-gray-600">
              Automated security scanning, dependency updates, and compliance checks with AI-powered vulnerability analysis.
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
                  Install RuneSpoke Hub GitHub App
                </h3>
                <p className="text-gray-600 mb-4">
                  Navigate to the Integrations page and click "Connect to GitHub". You'll be redirected to GitHub to install the RuneSpoke Hub app.
                </p>
                <Link 
                  href="/integrations"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
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
                  Choose Repository Access
                </h3>
                <p className="text-gray-600 mb-4">
                  Select which repositories RuneSpoke Hub can access. You can choose all repositories or select specific ones.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Recommended Permissions</h4>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• <strong>Read access:</strong> Repository contents and metadata</li>
                    <li>• <strong>Write access:</strong> Pull requests, issues, and status checks</li>
                    <li>• <strong>Actions:</strong> Trigger and monitor GitHub Actions</li>
                    <li>• <strong>Webhooks:</strong> Receive repository events</li>
                  </ul>
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
                  Configure Automation Rules
                </h3>
                <p className="text-gray-600 mb-4">
                  Set up automated workflows for different repository events:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">On Push to Main</h4>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• AI code review</li>
                      <li>• Run test suite</li>
                      <li>• Deploy to staging</li>
                      <li>• Security scan</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">On Pull Request</h4>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Multi-AI code review</li>
                      <li>• Automated testing</li>
                      <li>• Merge conflict detection</li>
                      <li>• PR quality scoring</li>
                    </ul>
                  </div>
                </div>
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
                  Make a test commit or create a pull request to verify that RuneSpoke Hub is receiving and processing events correctly.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800">Integration Active</span>
                  </div>
                  <p className="text-green-700 text-sm mt-1">
                    Your GitHub repositories are now connected to RuneSpoke Hub!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Features */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Features</h2>
        
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <p className="text-gray-600">
              Once connected, these features are automatically available for your repositories:
            </p>
          </div>
          
          <div className="divide-y divide-gray-200">
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <BoltIcon className="h-5 w-5 text-purple-600" />
                Multi-AI Code Reviews
              </h3>
              <p className="text-gray-600 mb-2">
                Automatic code reviews from Claude, GPT-4, and Gemini on every pull request with intelligent suggestions.
              </p>
              <div className="text-sm text-purple-600">Supported: TypeScript, Python, Go, Rust, Java, and 50+ languages</div>
            </div>
            
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <RocketLaunchIcon className="h-5 w-5 text-blue-600" />
                Smart Deployments
              </h3>
              <p className="text-gray-600 mb-2">
                Automated deployments to Vercel, AWS, Azure, or GCP based on branch rules and AI-validated quality checks.
              </p>
              <div className="text-sm text-blue-600">Zero-downtime deployments with rollback capabilities</div>
            </div>
            
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <ShieldCheckIcon className="h-5 w-5 text-green-600" />
                Security Scanning
              </h3>
              <p className="text-gray-600 mb-2">
                Automated vulnerability detection, dependency scanning, and security best practices enforcement.
              </p>
              <div className="text-sm text-green-600">SAST, DAST, and dependency vulnerability scanning</div>
            </div>
            
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <CommandLineIcon className="h-5 w-5 text-orange-600" />
                GitHub Actions Integration
              </h3>
              <p className="text-gray-600 mb-2">
                Seamless integration with existing GitHub Actions workflows with AI enhancements and optimization.
              </p>
              <div className="text-sm text-orange-600">Accelerate existing CI/CD pipelines with AI intelligence</div>
            </div>
            
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <ClipboardDocumentCheckIcon className="h-5 w-5 text-indigo-600" />
                Issue Management
              </h3>
              <p className="text-gray-600 mb-2">
                Automatic issue creation from failed tests, security vulnerabilities, and AI-detected code smells.
              </p>
              <div className="text-sm text-indigo-600">Intelligent issue prioritization and assignment</div>
            </div>
          </div>
        </div>
      </section>

      {/* Webhook Events */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Supported Webhook Events</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Repository Events</h3>
            <ul className="text-gray-600 space-y-2 text-sm">
              <li>• <code className="bg-gray-100 px-2 py-1 rounded">push</code> - Code commits to any branch</li>
              <li>• <code className="bg-gray-100 px-2 py-1 rounded">pull_request</code> - PR creation, updates, merges</li>
              <li>• <code className="bg-gray-100 px-2 py-1 rounded">release</code> - Version releases and tags</li>
              <li>• <code className="bg-gray-100 px-2 py-1 rounded">issues</code> - Issue creation and updates</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Workflow Events</h3>
            <ul className="text-gray-600 space-y-2 text-sm">
              <li>• <code className="bg-gray-100 px-2 py-1 rounded">workflow_run</code> - GitHub Actions completion</li>
              <li>• <code className="bg-gray-100 px-2 py-1 rounded">check_run</code> - Status checks and CI results</li>
              <li>• <code className="bg-gray-100 px-2 py-1 rounded">deployment</code> - Deployment status changes</li>
              <li>• <code className="bg-gray-100 px-2 py-1 rounded">security_advisory</code> - Security vulnerabilities</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Troubleshooting</h2>
        
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Webhooks not triggering?</h3>
            <ul className="text-gray-600 space-y-1">
              <li>• Verify the RuneSpoke Hub app is installed on your repository</li>
              <li>• Check that the app has the necessary permissions</li>
              <li>• Ensure webhook URLs are accessible from GitHub</li>
              <li>• Review webhook delivery logs in your GitHub repository settings</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Code reviews not appearing?</h3>
            <ul className="text-gray-600 space-y-1">
              <li>• Check if AI code review is enabled in your automation settings</li>
              <li>• Verify that the pull request meets the minimum requirements for review</li>
              <li>• Ensure sufficient API credits are available for your AI providers</li>
              <li>• Check repository branch protection rules</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Deployments failing?</h3>
            <ul className="text-gray-600 space-y-1">
              <li>• Verify deployment target credentials are configured</li>
              <li>• Check build logs and deployment status in the RuneSpoke Hub dashboard</li>
              <li>• Ensure branch-specific deployment rules are properly configured</li>
              <li>• Review test results - failed tests may block deployments</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-green-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          What's Next?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/docs/development/automation"
            className="bg-white border border-green-200 rounded-lg p-4 hover:bg-green-50 transition-colors"
          >
            <h3 className="font-semibold text-green-900 mb-1">Create Automation Workflows</h3>
            <p className="text-green-700 text-sm">Set up intelligent workflows for your repositories</p>
          </Link>
          
          <Link 
            href="/docs/integrations/slack"
            className="bg-white border border-green-200 rounded-lg p-4 hover:bg-green-50 transition-colors"
          >
            <h3 className="font-semibold text-green-900 mb-1">Connect Slack</h3>
            <p className="text-green-700 text-sm">Get notifications about code reviews and deployments</p>
          </Link>
        </div>
      </section>
    </div>
  );
}