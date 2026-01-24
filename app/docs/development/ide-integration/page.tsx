import Image from 'next/image';
import Link from 'next/link';
import {
  CodeBracketIcon,
  CommandLineIcon,
  CpuChipIcon,
  BoltIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClipboardDocumentIcon,
  LinkIcon,
  CogIcon,
  SparklesIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

export default function IDEIntegrationDocsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          IDE Integration
        </h1>
        <p className="text-lg text-gray-600">
          Connect RuneSpoke Hub with your favorite development environments for seamless AI-powered coding, deployment, and automation.
        </p>
      </div>

      {/* Quick Overview */}
      <div className="mb-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h2 className="text-xl font-semibold text-blue-900 mb-3">
          Transform Your Development Environment
        </h2>
        <p className="text-blue-800 mb-4">
          RuneSpoke Hub integrates directly into your IDE, bringing AI assistance, deployment capabilities, and automation right to your fingertips.
        </p>
        <ul className="space-y-2 text-blue-800">
          <li className="flex items-center gap-2">
            <CheckCircleIcon className="h-4 w-4 text-blue-600" />
            AI-powered code completion and generation
          </li>
          <li className="flex items-center gap-2">
            <CheckCircleIcon className="h-4 w-4 text-blue-600" />
            One-click deployment from your editor
          </li>
          <li className="flex items-center gap-2">
            <CheckCircleIcon className="h-4 w-4 text-blue-600" />
            Real-time collaboration and code review
          </li>
          <li className="flex items-center gap-2">
            <CheckCircleIcon className="h-4 w-4 text-blue-600" />
            Integrated container and cloud management
          </li>
        </ul>
      </div>

      {/* Supported IDEs */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Supported Development Environments</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Visual Studio Code */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10">
                <Image
                  src="/logos/vscode.svg"
                  alt="VS Code"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Visual Studio Code</h3>
                <p className="text-sm text-gray-500">Full-featured extension</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Complete RuneSpoke Hub integration with AI assistance, deployment tools, and real-time collaboration.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-green-600">
                <CheckCircleIcon className="h-3 w-3" />
                AI code completion and chat
              </div>
              <div className="flex items-center gap-2 text-xs text-green-600">
                <CheckCircleIcon className="h-3 w-3" />
                Direct deployment from editor
              </div>
              <div className="flex items-center gap-2 text-xs text-green-600">
                <CheckCircleIcon className="h-3 w-3" />
                Container management panel
              </div>
              <div className="flex items-center gap-2 text-xs text-green-600">
                <CheckCircleIcon className="h-3 w-3" />
                Integrated terminal with AI commands
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded font-mono text-xs">
              ext install runespoke-hub.vscode-extension
            </div>
          </div>

          {/* Cursor */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10">
                <Image
                  src="/logos/cursor.svg"
                  alt="Cursor"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Cursor</h3>
                <p className="text-sm text-gray-500">AI-first editor support</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Enhanced AI capabilities for the AI-first code editor with RuneSpoke Hub's advanced models.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-green-600">
                <CheckCircleIcon className="h-3 w-3" />
                Multiple AI model support
              </div>
              <div className="flex items-center gap-2 text-xs text-green-600">
                <CheckCircleIcon className="h-3 w-3" />
                Advanced code reasoning
              </div>
              <div className="flex items-center gap-2 text-xs text-green-600">
                <CheckCircleIcon className="h-3 w-3" />
                Deployment integration
              </div>
              <div className="flex items-center gap-2 text-xs text-green-600">
                <CheckCircleIcon className="h-3 w-3" />
                Cloud resource management
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded font-mono text-xs">
              Install via Cursor Extensions Marketplace
            </div>
          </div>

          {/* JetBrains IDEs */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10">
                <Image
                  src="/logos/jetbrains.svg"
                  alt="JetBrains"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">JetBrains IDEs</h3>
                <p className="text-sm text-gray-500">IntelliJ, PyCharm, WebStorm</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Professional IDE integration with RuneSpoke Hub's AI and deployment capabilities.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-green-600">
                <CheckCircleIcon className="h-3 w-3" />
                Language-specific AI assistance
              </div>
              <div className="flex items-center gap-2 text-xs text-green-600">
                <CheckCircleIcon className="h-3 w-3" />
                Refactoring suggestions
              </div>
              <div className="flex items-center gap-2 text-xs text-green-600">
                <CheckCircleIcon className="h-3 w-3" />
                Debugging integration
              </div>
              <div className="flex items-center gap-2 text-xs text-green-600">
                <CheckCircleIcon className="h-3 w-3" />
                Project-wide analysis
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded font-mono text-xs">
              Install from JetBrains Marketplace
            </div>
          </div>

          {/* Terminal/CLI */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10">
                <Image
                  src="/logos/terminal.svg"
                  alt="Terminal"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Terminal & CLI</h3>
                <p className="text-sm text-gray-500">Command-line interface</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Powerful command-line tools for developers who prefer terminal-based workflows.
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-green-600">
                <CheckCircleIcon className="h-3 w-3" />
                AI-powered CLI commands
              </div>
              <div className="flex items-center gap-2 text-xs text-green-600">
                <CheckCircleIcon className="h-3 w-3" />
                Interactive deployment
              </div>
              <div className="flex items-center gap-2 text-xs text-green-600">
                <CheckCircleIcon className="h-3 w-3" />
                Automation scripting
              </div>
              <div className="flex items-center gap-2 text-xs text-green-600">
                <CheckCircleIcon className="h-3 w-3" />
                Real-time monitoring
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded font-mono text-xs">
              npm install -g @runespoke/cli
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">IDE Integration Features</h2>
        
        <div className="space-y-6">
          {/* AI-Powered Development */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <SparklesIcon className="h-6 w-6 text-purple-600" />
              <h3 className="text-xl font-semibold text-gray-900">AI-Powered Development</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Bring the full power of RuneSpoke Hub's AI directly into your editor.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium text-purple-900 mb-2">Intelligent Code Completion</h4>
                <p className="text-sm text-purple-700">
                  Context-aware suggestions that understand your entire codebase
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium text-purple-900 mb-2">AI Chat Assistant</h4>
                <p className="text-sm text-purple-700">
                  Ask questions about your code and get instant, contextual answers
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium text-purple-900 mb-2">Code Generation</h4>
                <p className="text-sm text-purple-700">
                  Generate functions, classes, and entire modules from descriptions
                </p>
              </div>
            </div>
          </div>

          {/* Deployment Integration */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <RocketLaunchIcon className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">Seamless Deployment</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Deploy your applications directly from your IDE without context switching.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">One-Click Deploy</h4>
                <p className="text-sm text-blue-700">
                  Deploy to any cloud provider with a single command or button click
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Environment Management</h4>
                <p className="text-sm text-blue-700">
                  Switch between dev, staging, and production environments easily
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Real-time Monitoring</h4>
                <p className="text-sm text-blue-700">
                  Monitor deployments and application health from within your IDE
                </p>
              </div>
            </div>
          </div>

          {/* Container Management */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <CpuChipIcon className="h-6 w-6 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-900">Container Integration</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Manage Docker containers and Kubernetes clusters without leaving your editor.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Container Explorer</h4>
                <p className="text-sm text-green-700">
                  Browse, start, stop, and manage containers from a dedicated panel
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Log Streaming</h4>
                <p className="text-sm text-green-700">
                  Stream container logs directly into your IDE's terminal
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Docker Compose</h4>
                <p className="text-sm text-green-700">
                  Manage multi-container applications with integrated Docker Compose support
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Setup Guides */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Setup Guides</h2>
        
        <div className="space-y-6">
          {/* VS Code Setup */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6">
                <Image
                  src="/logos/vscode.svg"
                  alt="VS Code"
                  width={24}
                  height={24}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">VS Code Setup</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-blue-600">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Install Extension</h4>
                  <p className="text-sm text-gray-600 mb-2">Install the RuneSpoke Hub extension from the VS Code Marketplace.</p>
                  <div className="bg-gray-50 p-2 rounded font-mono text-xs">
                    ext install runespoke-hub.vscode-extension
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-blue-600">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Authenticate</h4>
                  <p className="text-sm text-gray-600">Sign in to your RuneSpoke Hub account when prompted.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-blue-600">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Configure AI Models</h4>
                  <p className="text-sm text-gray-600">Select your preferred AI models and configure settings in the extension panel.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CLI Setup */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <CommandLineIcon className="h-6 w-6 text-gray-600" />
              <h3 className="text-xl font-semibold text-gray-900">CLI Setup</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Installation</h4>
                <div className="space-y-2">
                  <div className="bg-white p-2 rounded border border-gray-200 font-mono text-xs">
                    # Install via npm<br/>
                    npm install -g @runespoke/cli
                  </div>
                  <div className="bg-white p-2 rounded border border-gray-200 font-mono text-xs">
                    # Or via curl<br/>
                    curl -sSL https://get.runespokehub.com | sh
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Authentication</h4>
                <div className="bg-white p-2 rounded border border-gray-200 font-mono text-xs">
                  runespoke auth login
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Basic Commands</h4>
                <div className="space-y-1 text-xs font-mono">
                  <div className="text-gray-600"># Deploy current project</div>
                  <div className="bg-white p-2 rounded border border-gray-200">runespoke deploy</div>
                  
                  <div className="text-gray-600 mt-2"># Start AI chat session</div>
                  <div className="bg-white p-2 rounded border border-gray-200">runespoke ai chat</div>
                  
                  <div className="text-gray-600 mt-2"># Manage containers</div>
                  <div className="bg-white p-2 rounded border border-gray-200">runespoke containers list</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Troubleshooting</h2>
        
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h3 className="font-medium text-gray-900">Extension Not Loading</h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-2">
                If the RuneSpoke Hub extension isn't loading properly:
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• Restart your IDE and try again</li>
                <li>• Check that you're signed in to your RuneSpoke Hub account</li>
                <li>• Verify your internet connection</li>
                <li>• Update to the latest extension version</li>
              </ul>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h3 className="font-medium text-gray-900">AI Features Not Working</h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-2">
                If AI features aren't responding:
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• Ensure your AI providers are configured correctly</li>
                <li>• Check your API key limits and quotas</li>
                <li>• Verify your project is indexed properly</li>
                <li>• Try switching to a different AI model</li>
              </ul>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h3 className="font-medium text-gray-900">Deployment Issues</h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-2">
                If deployments are failing:
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• Check your cloud provider credentials</li>
                <li>• Verify your project configuration</li>
                <li>• Review deployment logs for specific errors</li>
                <li>• Ensure your target environment is accessible</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg border border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Next Steps</h2>
        <p className="text-gray-600 mb-6">
          Now that you have RuneSpoke Hub integrated with your IDE, explore these advanced features:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/docs/ai/chat-assistant"
            className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
          >
            <SparklesIcon className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-900">AI Chat Assistant</span>
          </Link>
          <Link 
            href="/docs/development/automation"
            className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
          >
            <BoltIcon className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-900">Development Automation</span>
          </Link>
        </div>
      </div>
    </div>
  );
}