'use client';

import {
  CubeIcon,
  CommandLineIcon,
  PlayIcon,
  StopIcon,
  ArrowPathIcon,
  CpuChipIcon,
  ServerIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  BoltIcon,
  ShieldCheckIcon,
  CloudArrowUpIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

export default function DockerContainerPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12">
            <Image 
              src="/logos/docker-mark.svg" 
              alt="Docker" 
              width={48} 
              height={48} 
              className="w-full h-full object-contain" 
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            Docker Container Management
          </h1>
        </div>
        <p className="text-xl text-gray-600">
          Complete Docker container lifecycle management with AI-powered optimization, intelligent scaling, 
          real-time monitoring, and seamless integration with your development workflows.
        </p>
      </div>

      {/* Why RuneSpoke Hub Docker Management */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Advanced Docker Management</h2>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-red-600 text-lg">Traditional Docker Tools</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span className="text-gray-700">Manual container management</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span className="text-gray-700">Static resource allocation</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span className="text-gray-700">Basic monitoring only</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span className="text-gray-700">Separate tools for different tasks</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span className="text-gray-700">No intelligent optimization</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-bold text-green-600 text-lg">RuneSpoke Hub Intelligence</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-gray-700">AI-powered container orchestration</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-gray-700">Dynamic resource optimization</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-gray-700">Comprehensive monitoring and analytics</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-gray-700">Unified platform for entire lifecycle</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-gray-700">Predictive scaling and optimization</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <BoltIcon className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Optimization</h3>
            <p className="text-gray-600 mb-3">
              Machine learning algorithms continuously optimize container resource allocation, scaling decisions, and performance tuning.
            </p>
            <div className="text-sm text-blue-600">Reduces costs by up to 40% while improving performance</div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <ChartBarIcon className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Real-Time Monitoring</h3>
            <p className="text-gray-600 mb-3">
              Comprehensive monitoring of CPU, memory, network, disk I/O, and custom application metrics with intelligent alerting.
            </p>
            <div className="text-sm text-green-600">Advanced analytics and predictive insights</div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <CubeIcon className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Intelligent Scaling</h3>
            <p className="text-gray-600 mb-3">
              Automatic horizontal and vertical scaling based on AI analysis of traffic patterns, resource utilization, and application behavior.
            </p>
            <div className="text-sm text-purple-600">Proactive scaling prevents performance issues</div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <ShieldCheckIcon className="h-5 w-5 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Security & Compliance</h3>
            <p className="text-gray-600 mb-3">
              Automated security scanning, vulnerability assessment, compliance monitoring, and policy enforcement for all containers.
            </p>
            <div className="text-sm text-orange-600">NIST, CIS, and custom security frameworks</div>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect Docker Environment</h3>
                <p className="text-gray-600 mb-4">
                  Connect your local Docker environment or remote Docker hosts. RuneSpoke Hub supports Docker Desktop, Docker Engine, and remote SSH connections.
                </p>
                <Link 
                  href="/containers"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
                >
                  <CubeIcon className="h-4 w-4" />
                  Open Container Dashboard
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold shrink-0">2</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Deploy Your First Container</h3>
                <p className="text-gray-600 mb-4">
                  Use the web interface to deploy containers with AI-optimized configurations, or import existing Docker Compose files.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Quick Deploy Options:</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• <strong>Web UI:</strong> Visual container deployment with form-based configuration</li>
                    <li>• <strong>Docker Compose:</strong> Import existing docker-compose.yml files</li>
                    <li>• <strong>Template Library:</strong> Pre-configured templates for popular applications</li>
                    <li>• <strong>AI Suggestions:</strong> Let AI recommend optimal configurations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold shrink-0">3</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Enable AI Optimization</h3>
                <p className="text-gray-600 mb-4">
                  Turn on AI-powered optimization features to automatically improve performance, reduce costs, and enhance security.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-1">Performance Optimization</h4>
                    <p className="text-blue-800 text-sm">CPU, memory, and I/O tuning based on workload patterns</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-900 mb-1">Cost Optimization</h4>
                    <p className="text-green-800 text-sm">Resource right-sizing and intelligent scheduling</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold shrink-0">4</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Monitor & Scale</h3>
                <p className="text-gray-600 mb-4">
                  Use the monitoring dashboard to track container health, performance metrics, and resource utilization in real-time.
                </p>
                <Link 
                  href="/monitoring"
                  className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                >
                  <ChartBarIcon className="h-4 w-4" />
                  View Monitoring Dashboard →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Container Management Operations */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Container Management Operations</h2>
        
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <p className="text-gray-600">
              Complete container lifecycle management through the RuneSpoke Hub interface:
            </p>
          </div>
          
          <div className="divide-y divide-gray-200">
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <PlayIcon className="h-5 w-5 text-green-600" />
                Container Deployment
              </h3>
              <p className="text-gray-600 mb-2">
                Deploy single containers or multi-container applications with AI-optimized configurations and intelligent resource allocation.
              </p>
              <div className="text-sm text-green-600">Supports Docker images from any registry (Docker Hub, ECR, GCR, etc.)</div>
            </div>
            
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <CpuChipIcon className="h-5 w-5 text-blue-600" />
                Resource Management
              </h3>
              <p className="text-gray-600 mb-2">
                Dynamic CPU, memory, and storage allocation with AI-driven optimization based on workload analysis and performance metrics.
              </p>
              <div className="text-sm text-blue-600">Automatic resource scaling and right-sizing recommendations</div>
            </div>
            
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <ServerIcon className="h-5 w-5 text-purple-600" />
                Network & Storage
              </h3>
              <p className="text-gray-600 mb-2">
                Advanced networking with service discovery, load balancing, and persistent storage management with backup automation.
              </p>
              <div className="text-sm text-purple-600">Custom networks, volumes, and secrets management</div>
            </div>
            
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <ShieldCheckIcon className="h-5 w-5 text-orange-600" />
                Security & Compliance
              </h3>
              <p className="text-gray-600 mb-2">
                Automated security scanning, vulnerability patching, access control, and compliance monitoring with policy enforcement.
              </p>
              <div className="text-sm text-orange-600">Runtime protection and anomaly detection</div>
            </div>
            
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <CommandLineIcon className="h-5 w-5 text-indigo-600" />
                Logs & Debugging
              </h3>
              <p className="text-gray-600 mb-2">
                Centralized logging, real-time log streaming, interactive container shells, and AI-powered troubleshooting assistance.
              </p>
              <div className="text-sm text-indigo-600">Log aggregation, searching, and intelligent error detection</div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">AI-Enhanced Features</h2>
        
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <BoltIcon className="h-5 w-5 text-purple-600" />
              Predictive Scaling
            </h3>
            <p className="text-gray-600 mb-3">
              AI analyzes historical usage patterns, traffic forecasts, and application behavior to predict scaling needs before bottlenecks occur.
            </p>
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-medium text-purple-900 mb-2">Scaling Intelligence:</h4>
              <ul className="text-purple-800 text-sm space-y-1">
                <li>• Traffic pattern analysis and forecasting</li>
                <li>• Seasonal and time-based scaling predictions</li>
                <li>• Application-specific performance modeling</li>
                <li>• Cost-aware scaling decisions</li>
                <li>• Multi-dimensional resource optimization</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <ChartBarIcon className="h-5 w-5 text-blue-600" />
              Performance Analytics
            </h3>
            <p className="text-gray-600 mb-3">
              Deep performance analysis with AI-powered insights, bottleneck detection, and optimization recommendations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-1">Real-Time Metrics</h4>
                <p className="text-blue-800 text-sm">CPU, memory, I/O, network, and custom application metrics</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-1">AI Insights</h4>
                <p className="text-blue-800 text-sm">Anomaly detection, trend analysis, and performance recommendations</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <ClockIcon className="h-5 w-5 text-green-600" />
              Intelligent Automation
            </h3>
            <p className="text-gray-600 mb-3">
              Automated container lifecycle management with AI-driven decisions for updates, restarts, scaling, and maintenance tasks.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm text-gray-700">Auto-healing containers</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span className="text-sm text-gray-700">Intelligent rolling updates</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span className="text-sm text-gray-700">Proactive maintenance scheduling</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Examples */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Integration Examples</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-3">CI/CD Integration</h3>
            <p className="text-gray-600 mb-4">
              Seamlessly integrate with your existing CI/CD pipelines for automated container builds, testing, and deployments.
            </p>
            <div className="flex items-center gap-4">
              <Image src="/logos/github-mark.svg" alt="GitHub Actions" width={24} height={24} className="w-6 h-6 object-contain" />
              <Image src="/logos/gitlab.svg" alt="GitLab CI" width={24} height={24} className="w-6 h-6 object-contain" />
              <Image src="/logos/jenkins.svg" alt="Jenkins" width={24} height={24} className="w-6 h-6 object-contain" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Cloud Deployments</h3>
            <p className="text-gray-600 mb-4">
              Deploy containers across multiple cloud providers with unified management and AI-powered optimization.
            </p>
            <div className="flex items-center gap-4">
              <Image src="/logos/aws.svg" alt="AWS" width={24} height={24} className="w-6 h-6 object-contain" />
              <Image src="/logos/microsoft-azure.svg" alt="Azure" width={24} height={24} className="w-6 h-6 object-contain" />
              <Image src="/logos/google-cloud.svg" alt="Google Cloud" width={24} height={24} className="w-6 h-6 object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-indigo-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to Start Container Management?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/containers"
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg p-4 transition-colors"
          >
            <h3 className="font-semibold mb-1">Open Container Dashboard</h3>
            <p className="text-indigo-100 text-sm">Start managing your Docker containers now</p>
          </Link>
          
          <Link 
            href="/docs/integrations/cloud-providers"
            className="bg-white border border-indigo-200 rounded-lg p-4 hover:bg-indigo-50 transition-colors"
          >
            <h3 className="font-semibold text-indigo-900 mb-1">Cloud Integration</h3>
            <p className="text-indigo-700 text-sm">Connect cloud providers for deployment</p>
          </Link>
        </div>
      </section>
    </div>
  );
}