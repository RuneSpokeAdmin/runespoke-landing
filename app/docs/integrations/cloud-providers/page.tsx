import Image from 'next/image';
import Link from 'next/link';
import {
  CloudArrowUpIcon,
  ServerIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  ChartBarIcon,
  CogIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

export default function CloudProvidersDocsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Cloud Provider Integrations
        </h1>
        <p className="text-lg text-gray-600">
          Connect your AWS, Azure, and Google Cloud accounts for seamless deployment and infrastructure management with RuneSpoke Hub.
        </p>
      </div>

      {/* Quick Overview */}
      <div className="mb-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h2 className="text-xl font-semibold text-blue-900 mb-3">
          Why Connect Cloud Providers?
        </h2>
        <ul className="space-y-2 text-blue-800">
          <li className="flex items-center gap-2">
            <CheckCircleIcon className="h-4 w-4 text-blue-600" />
            Deploy applications directly from RuneSpoke Hub
          </li>
          <li className="flex items-center gap-2">
            <CheckCircleIcon className="h-4 w-4 text-blue-600" />
            Monitor infrastructure costs and usage
          </li>
          <li className="flex items-center gap-2">
            <CheckCircleIcon className="h-4 w-4 text-blue-600" />
            Automated scaling and load balancing
          </li>
          <li className="flex items-center gap-2">
            <CheckCircleIcon className="h-4 w-4 text-blue-600" />
            AI-powered cost optimization recommendations
          </li>
        </ul>
      </div>

      {/* Supported Providers */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Supported Providers</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* AWS */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10">
                <Image
                  src="/logos/aws.svg"
                  alt="AWS"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Amazon Web Services</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Deploy to EC2, ECS, Lambda, and more. Full support for AWS services.
            </p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• EC2 Instances</li>
              <li>• ECS & Fargate</li>
              <li>• Lambda Functions</li>
              <li>• S3 Storage</li>
              <li>• RDS Databases</li>
            </ul>
          </div>

          {/* Azure */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10">
                <Image
                  src="/logos/microsoft-azure.svg"
                  alt="Microsoft Azure"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Microsoft Azure</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Deploy to Azure App Service, Container Instances, and AKS clusters.
            </p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• App Service</li>
              <li>• Container Instances</li>
              <li>• AKS (Kubernetes)</li>
              <li>• Azure Functions</li>
              <li>• CosmosDB</li>
            </ul>
          </div>

          {/* Google Cloud */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10">
                <Image
                  src="/logos/google-cloud.svg"
                  alt="Google Cloud"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Google Cloud Platform</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Deploy to Compute Engine, Cloud Run, and GKE with full GCP integration.
            </p>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• Compute Engine</li>
              <li>• Cloud Run</li>
              <li>• GKE (Kubernetes)</li>
              <li>• Cloud Functions</li>
              <li>• BigQuery</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Setup Guide */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Setup Guide</h2>
        
        <div className="space-y-8">
          {/* AWS Setup */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6">
                <Image
                  src="/logos/aws.svg"
                  alt="AWS"
                  width={24}
                  height={24}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">AWS Setup</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-blue-600">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Create IAM User</h4>
                  <p className="text-sm text-gray-600">Create an IAM user with programmatic access and attach the necessary policies.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-blue-600">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Configure Credentials</h4>
                  <p className="text-sm text-gray-600">Add your Access Key ID and Secret Access Key to RuneSpoke Hub.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-blue-600">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Test Connection</h4>
                  <p className="text-sm text-gray-600">Verify the connection and start deploying your applications.</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Required IAM Permissions:</h4>
              <pre className="text-xs text-gray-600 overflow-x-auto">
{`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:*",
        "ecs:*",
        "lambda:*",
        "s3:*",
        "rds:*"
      ],
      "Resource": "*"
    }
  ]
}`}
              </pre>
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
              <ChartBarIcon className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Cost Optimization</h3>
            </div>
            <p className="text-sm text-gray-600">
              AI-powered recommendations to reduce cloud costs and optimize resource usage.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <CpuChipIcon className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Auto Scaling</h3>
            </div>
            <p className="text-sm text-gray-600">
              Intelligent auto-scaling based on traffic patterns and performance metrics.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheckIcon className="h-6 w-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Security Compliance</h3>
            </div>
            <p className="text-sm text-gray-600">
              Automated security scanning and compliance checks for your cloud resources.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <ServerIcon className="h-6 w-6 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-900">Multi-Cloud Support</h3>
            </div>
            <p className="text-sm text-gray-600">
              Deploy across multiple cloud providers with unified management and monitoring.
            </p>
          </div>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Troubleshooting</h2>
        
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h3 className="font-medium text-gray-900">Connection Failed</h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-2">
                If your cloud provider connection fails, check:
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• Credentials are correct and haven't expired</li>
                <li>• IAM user has necessary permissions</li>
                <li>• Network connectivity allows outbound HTTPS</li>
                <li>• API endpoints are accessible from your region</li>
              </ul>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h3 className="font-medium text-gray-900">Deployment Issues</h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-2">
                For deployment problems:
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• Verify resource quotas and limits</li>
                <li>• Check application logs for errors</li>
                <li>• Ensure security groups allow required traffic</li>
                <li>• Validate application configuration and environment variables</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg border border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Next Steps</h2>
        <p className="text-gray-600 mb-6">
          Now that you understand cloud provider integrations, explore these related topics:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/docs/containers/docker"
            className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
          >
            <CogIcon className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-900">Container Management</span>
          </Link>
          <Link 
            href="/docs/development/automation"
            className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
          >
            <CloudArrowUpIcon className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-900">Deployment Automation</span>
          </Link>
        </div>
      </div>
    </div>
  );
}