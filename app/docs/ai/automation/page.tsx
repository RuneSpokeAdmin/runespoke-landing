import Image from 'next/image';
import Link from 'next/link';
import {
  SparklesIcon,
  BoltIcon,
  CogIcon,
  ClockIcon,
  CodeBracketIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlayCircleIcon,
  DocumentTextIcon,
  CloudArrowUpIcon,
  BeakerIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';

export default function AIAutomationDocsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          AI-Powered Automation
        </h1>
        <p className="text-lg text-gray-600">
          Leverage artificial intelligence to create smart workflows, intelligent testing, and automated development processes that adapt and improve over time.
        </p>
      </div>

      {/* Quick Overview */}
      <div className="mb-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
        <h2 className="text-xl font-semibold text-blue-900 mb-3">
          Intelligent Automation Beyond Traditional CI/CD
        </h2>
        <p className="text-blue-800 mb-4">
          RuneSpoke Hub's AI automation goes beyond simple rule-based workflows. Our AI agents understand context, make decisions, and continuously optimize your development processes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-center gap-2">
              <CheckCircleIcon className="h-4 w-4 text-blue-600" />
              Context-aware decision making
            </li>
            <li className="flex items-center gap-2">
              <CheckCircleIcon className="h-4 w-4 text-blue-600" />
              Self-improving workflows
            </li>
          </ul>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-center gap-2">
              <CheckCircleIcon className="h-4 w-4 text-blue-600" />
              Natural language configuration
            </li>
            <li className="flex items-center gap-2">
              <CheckCircleIcon className="h-4 w-4 text-blue-600" />
              Predictive problem resolution
            </li>
          </ul>
        </div>
      </div>

      {/* AI Automation Types */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Automation Categories</h2>
        
        <div className="space-y-6">
          {/* Code Intelligence */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <CodeBracketIcon className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">Code Intelligence</h3>
            </div>
            <p className="text-gray-600 mb-4">
              AI-powered code analysis, review, and generation that understands your codebase context.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Smart Code Review</h4>
                <p className="text-sm text-blue-700">
                  AI reviews code for bugs, security issues, and style consistency
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Auto-Documentation</h4>
                <p className="text-sm text-blue-700">
                  Generates comprehensive documentation from code changes
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Refactoring Suggestions</h4>
                <p className="text-sm text-blue-700">
                  Identifies optimization opportunities and suggests improvements
                </p>
              </div>
            </div>
          </div>

          {/* Testing Intelligence */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <BeakerIcon className="h-6 w-6 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-900">Intelligent Testing</h3>
            </div>
            <p className="text-gray-600 mb-4">
              AI-driven test generation, execution, and analysis that adapts to your application changes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Test Generation</h4>
                <p className="text-sm text-green-700">
                  Automatically generates comprehensive test suites for new code
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Flaky Test Detection</h4>
                <p className="text-sm text-green-700">
                  Identifies and fixes unreliable tests using pattern analysis
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Performance Testing</h4>
                <p className="text-sm text-green-700">
                  AI-optimized load testing that simulates realistic user behavior
                </p>
              </div>
            </div>
          </div>

          {/* Deployment Intelligence */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <RocketLaunchIcon className="h-6 w-6 text-purple-600" />
              <h3 className="text-xl font-semibold text-gray-900">Smart Deployments</h3>
            </div>
            <p className="text-gray-600 mb-4">
              AI-orchestrated deployments with risk assessment, rollback decisions, and optimization.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium text-purple-900 mb-2">Risk Assessment</h4>
                <p className="text-sm text-purple-700">
                  Evaluates deployment risks and suggests optimal timing
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium text-purple-900 mb-2">Canary Analysis</h4>
                <p className="text-sm text-purple-700">
                  AI monitors canary deployments and makes rollback decisions
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium text-purple-900 mb-2">Performance Tuning</h4>
                <p className="text-sm text-purple-700">
                  Automatically optimizes application performance post-deployment
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Creating AI Workflows */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Creating AI Workflows</h2>
        
        <div className="space-y-6">
          {/* Natural Language Configuration */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Natural Language Configuration</h3>
            <p className="text-gray-600 mb-4">
              Describe what you want in plain English, and RuneSpoke Hub will create the workflow.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Example: Smart Code Review Workflow</h4>
              <div className="bg-white p-3 rounded border border-gray-200 font-mono text-sm">
                "When a pull request is created, have AI review the code for security vulnerabilities and performance issues. 
                If issues are found, post detailed comments and request changes. 
                If the code looks good, run our test suite and deploy to staging if tests pass."
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Traditional Approach</h4>
                <div className="bg-red-50 p-3 rounded-lg text-sm">
                  <ul className="space-y-1 text-red-700">
                    <li>• Write complex YAML configurations</li>
                    <li>• Define triggers and conditions</li>
                    <li>• Set up webhooks and integrations</li>
                    <li>• Debug workflow failures</li>
                    <li>• Manually maintain and update</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">AI-Powered Approach</h4>
                <div className="bg-green-50 p-3 rounded-lg text-sm">
                  <ul className="space-y-1 text-green-700">
                    <li>• Describe workflow in plain English</li>
                    <li>• AI generates optimal configuration</li>
                    <li>• Automatic integration setup</li>
                    <li>• Self-healing and adaptive</li>
                    <li>• Continuous optimization</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Workflow Examples */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Pre-built AI Workflow Templates</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheckIcon className="h-5 w-5 text-red-600" />
                  <h4 className="font-medium text-gray-900">Security-First Development</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Automatically scans code for vulnerabilities, runs security tests, and ensures compliance.
                </p>
                <div className="text-xs text-gray-500">
                  <strong>Triggers:</strong> Code commits, dependency updates
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <ChartBarIcon className="h-5 w-5 text-blue-600" />
                  <h4 className="font-medium text-gray-900">Performance Optimization</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Monitors performance metrics and automatically optimizes code and infrastructure.
                </p>
                <div className="text-xs text-gray-500">
                  <strong>Triggers:</strong> Performance degradation, deployment
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <DocumentTextIcon className="h-5 w-5 text-green-600" />
                  <h4 className="font-medium text-gray-900">Documentation Sync</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Keeps documentation up-to-date with code changes and generates API docs.
                </p>
                <div className="text-xs text-gray-500">
                  <strong>Triggers:</strong> API changes, new features
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <BoltIcon className="h-5 w-5 text-yellow-600" />
                  <h4 className="font-medium text-gray-900">Intelligent Rollbacks</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Monitors deployment health and automatically rolls back problematic releases.
                </p>
                <div className="text-xs text-gray-500">
                  <strong>Triggers:</strong> Error rate spikes, performance issues
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI vs Traditional Comparison */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Automation vs Traditional CI/CD</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Feature</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Traditional CI/CD</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">RuneSpoke AI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Configuration</td>
                <td className="px-6 py-4 text-sm text-gray-600">Complex YAML/JSON files</td>
                <td className="px-6 py-4 text-sm text-green-600">Natural language descriptions</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Decision Making</td>
                <td className="px-6 py-4 text-sm text-gray-600">Rule-based logic</td>
                <td className="px-6 py-4 text-sm text-green-600">Context-aware AI decisions</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Error Handling</td>
                <td className="px-6 py-4 text-sm text-gray-600">Manual intervention required</td>
                <td className="px-6 py-4 text-sm text-green-600">Self-healing and adaptive</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Optimization</td>
                <td className="px-6 py-4 text-sm text-gray-600">Manual tuning</td>
                <td className="px-6 py-4 text-sm text-green-600">Continuous AI optimization</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Maintenance</td>
                <td className="px-6 py-4 text-sm text-gray-600">Regular updates needed</td>
                <td className="px-6 py-4 text-sm text-green-600">Self-improving workflows</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Monitoring and Analytics */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Workflow Monitoring</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <ChartBarIcon className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Intelligence Analytics</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Track how your AI workflows are performing and improving over time.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Decision accuracy metrics</li>
              <li>• Time saved through automation</li>
              <li>• Error reduction statistics</li>
              <li>• Cost optimization insights</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <BoltIcon className="h-6 w-6 text-yellow-600" />
              <h3 className="text-lg font-semibold text-gray-900">Real-time Adaptation</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Watch as your workflows adapt and improve based on patterns and outcomes.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Learning from failures</li>
              <li>• Optimizing execution paths</li>
              <li>• Adapting to code patterns</li>
              <li>• Improving decision accuracy</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Getting Started with AI Automation</h2>
        
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-blue-600">1</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Connect Your Repository</h3>
              <p className="text-gray-600">
                Link your GitHub, GitLab, or Bitbucket repository to RuneSpoke Hub.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-blue-600">2</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Describe Your Workflow</h3>
              <p className="text-gray-600">
                Use natural language to describe what you want your automation to do.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-blue-600">3</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Review and Deploy</h3>
              <p className="text-gray-600">
                Review the AI-generated workflow and deploy it with one click.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-blue-600">4</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Monitor and Optimize</h3>
              <p className="text-gray-600">
                Watch as your workflow learns and improves automatically over time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg border border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Next Steps</h2>
        <p className="text-gray-600 mb-6">
          Ready to supercharge your development workflow with AI? Explore these resources:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/docs/ai/providers"
            className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
          >
            <SparklesIcon className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-900">Configure AI Providers</span>
          </Link>
          <Link 
            href="/docs/development/automation"
            className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
          >
            <CogIcon className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-900">Development Workflows</span>
          </Link>
        </div>
      </div>
    </div>
  );
}