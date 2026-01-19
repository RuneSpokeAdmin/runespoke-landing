'use client';

import { motion } from 'framer-motion';
import {
  CodeBracketIcon,
  CloudIcon,
  ChatBubbleBottomCenterTextIcon,
  UserGroupIcon,
  ChartBarIcon,
  LinkIcon,
  SparklesIcon,
  ShieldCheckIcon,
  CircleStackIcon,
  BoltIcon,
  PuzzlePieceIcon,
  BeakerIcon,
  DocumentTextIcon,
  RocketLaunchIcon,
  CpuChipIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

const mainFeatures = [
  {
    name: 'Universal IDE & CLI Integration',
    description: 'Extensions for VS Code, JetBrains, Cursor, Claude Code CLI, Google Gemini CLI, and all VS Code-compatible editors seamlessly connect your development environment to the RuneSpoke Dashboard.',
    icon: CodeBracketIcon,
    category: 'Development',
    status: 'active'
  },
  {
    name: 'Multi-AI Provider Support',
    description: 'Leverage Claude Sonnet, GPT-4, Google Gemini, and other AI providers for intelligent automation, code assistance, and workflow optimization.',
    icon: SparklesIcon,
    category: 'AI',
    status: 'active'
  },
  {
    name: 'OAuth & API Integrations',
    description: 'Connect GitHub, Slack, Discord, Linear, Notion, Figma, and 20+ other services with secure OAuth authentication and API integrations.',
    icon: LinkIcon,
    category: 'Integrations',
    status: 'active'
  }
];

const allFeatures = [
  {
    name: 'Cloud Provider Management',
    description: 'Unified interface for AWS, Azure, Google Cloud, Firebase, Hugging Face, Vercel, and other cloud services with automated deployment workflows.',
    icon: CloudIcon,
    category: 'Cloud',
    status: 'active'
  },
  {
    name: 'Container & Docker Management',
    description: 'Full Docker container lifecycle management with real-time monitoring, scaling, and deployment automation.',
    icon: CircleStackIcon,
    category: 'DevOps',
    status: 'active'
  },
  {
    name: 'Advanced Automation Workflows',
    description: 'Create complex automation workflows with triggers, conditions, and actions using our visual workflow builder.',
    icon: BoltIcon,
    category: 'Automation',
    status: 'active'
  },
  {
    name: 'AI Chat Assistant',
    description: 'Context-aware AI assistant available on every page, providing intelligent help and guidance based on your current workflow.',
    icon: ChatBubbleBottomCenterTextIcon,
    category: 'AI',
    status: 'active'
  },
  {
    name: 'Real-time Monitoring & Analytics',
    description: 'Live dashboards showing deployment status, performance metrics, team activity, and system health across all your projects.',
    icon: ChartBarIcon,
    category: 'Monitoring',
    status: 'active'
  },
  {
    name: 'Project & Team Management',
    description: 'Built-in project management with AI-powered insights, team collaboration tools, and automated reporting.',
    icon: UserGroupIcon,
    category: 'Management',
    status: 'active'
  },
  {
    name: 'Security & Compliance',
    description: 'Enterprise-grade security with OAuth 2.0, encrypted credentials, audit logs, SSO, SAML, and SOC 2 compliance.',
    icon: ShieldCheckIcon,
    category: 'Security',
    status: 'active'
  },
  {
    name: 'Custom Integrations & APIs',
    description: 'Build custom integrations with our REST API, webhooks, and SDK. White-label options available for enterprise customers.',
    icon: PuzzlePieceIcon,
    category: 'Platform',
    status: 'active'
  },
  {
    name: 'AI Testing & Comparison',
    description: 'Side-by-side AI model testing and comparison tools to optimize your AI workflows and choose the best providers.',
    icon: BeakerIcon,
    category: 'AI',
    status: 'active'
  },
  {
    name: 'Enterprise User Management',
    description: 'Complete user lifecycle management with CRUD operations, role assignments, and bulk operations for large organizations.',
    icon: UserGroupIcon,
    category: 'Management',
    status: 'active'
  },
  {
    name: 'Role-Based Access Control (RBAC)',
    description: 'Granular permission system with 37+ default permissions, custom roles, and flexible role assignments.',
    icon: ShieldCheckIcon,
    category: 'Security',
    status: 'active'
  },
  {
    name: 'User Invitations & Onboarding',
    description: 'Bulk email-based user invitations with customizable messages and automated onboarding workflows.',
    icon: UserGroupIcon,
    category: 'Management',
    status: 'active'
  },
  {
    name: 'Audit Logging & Compliance',
    description: 'Comprehensive activity tracking with CSV/JSON export capabilities for SOC 2, GDPR, and enterprise compliance.',
    icon: DocumentTextIcon,
    category: 'Security',
    status: 'active'
  },
  {
    name: 'Session Management & Analytics',
    description: 'Real-time user session tracking with device information, location data, and security monitoring.',
    icon: ChartBarIcon,
    category: 'Security',
    status: 'active'
  },
  {
    name: 'MCP (Model Context Protocol) Integration',
    description: 'Native support for Claude\'s MCP protocol enabling direct AI model communication and context sharing across your entire development workflow.',
    icon: CpuChipIcon,
    category: 'AI',
    status: 'new'
  },
  {
    name: 'One-Click Global Deployments',
    description: 'Deploy to multiple cloud providers simultaneously with intelligent geo-distribution and automatic failover capabilities.',
    icon: RocketLaunchIcon,
    category: 'DevOps',
    status: 'new'
  },
  {
    name: 'Cross-Platform Code Sync',
    description: 'Seamlessly sync code changes across VS Code, JetBrains IDEs, Claude Code CLI, and web-based editors in real-time.',
    icon: CodeBracketIcon,
    category: 'Development',
    status: 'new'
  },
  {
    name: 'Universal Web Dashboard',
    description: 'Comprehensive web-based control center accessible from anywhere, providing full platform management capabilities.',
    icon: GlobeAltIcon,
    category: 'Platform',
    status: 'new'
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Complete Platform Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need for modern development, automation, and team collaboration
          </p>
        </div>

        {/* Main Features Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {mainFeatures.map((feature, index) => (
            <motion.div 
              key={feature.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="relative p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <motion.div 
                  className="flex-shrink-0 mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <feature.icon className="h-12 w-12 text-blue-600" />
                </motion.div>
                <div className="absolute top-4 right-4 text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                  {feature.category}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                {/* Green dot indicator */}
                <motion.div 
                  className="mt-4 w-2 h-2 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* All Features Grid - 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allFeatures.map((feature, index) => (
            <motion.div 
              key={feature.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (index * 0.05) + 0.3 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="relative p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300 hover:border-blue-200"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-3">
                  <motion.div 
                    className="flex-shrink-0"
                    whileHover={{ rotate: 15 }}
                    transition={{ duration: 0.2 }}
                  >
                    <feature.icon className="h-8 w-8 text-blue-500" />
                  </motion.div>
                  <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                    feature.status === 'new' 
                      ? 'text-white bg-[#9810fa]' 
                      : 'text-gray-500 bg-gray-100'
                  }`}>
                    {feature.category}
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-lg font-semibold text-gray-900 leading-tight">
                    {feature.name}
                  </h4>
                  {feature.status === 'new' && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: (index * 0.05) + 0.5, type: "spring", stiffness: 500 }}
                      className="text-xs font-bold text-white bg-[#9810fa] px-2 py-1 rounded-full shadow-sm"
                    >
                      NEW
                    </motion.span>
                  )}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed flex-grow">
                  {feature.description}
                </p>
                {/* Status indicator */}
                <div className="flex items-center mt-4">
                  {feature.status === 'new' ? (
                    <>
                      <motion.div 
                        className="w-2 h-2 rounded-full mr-2"
                        style={{ backgroundColor: '#9810fa' }}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      ></motion.div>
                      <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#9810fa', opacity: 0.7 }}></div>
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#9810fa', opacity: 0.4 }}></div>
                    </>
                  ) : (
                    <>
                      <motion.div 
                        className="w-2 h-2 bg-green-500 rounded-full mr-2"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      ></motion.div>
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}