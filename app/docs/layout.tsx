'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  BookOpenIcon,
  CodeBracketIcon,
  CloudIcon,
  ChatBubbleBottomCenterTextIcon,
  CogIcon,
  LightBulbIcon,
  ExclamationTriangleIcon,
  RocketLaunchIcon,
  SparklesIcon,
  BoltIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  ClipboardDocumentListIcon,
  FolderIcon,
  ChartBarIcon,
  QuestionMarkCircleIcon,
  LinkIcon,
  ClipboardDocumentIcon,
  CircleStackIcon,
  RectangleGroupIcon,
  CloudArrowUpIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Tasks', href: '/tasks', icon: ClipboardDocumentListIcon },
  { name: 'Issues', href: '/issues', icon: RectangleGroupIcon },
  { name: 'Projects', href: '/projects', icon: FolderIcon },
  { name: 'Deployments', href: '/deployments', icon: RocketLaunchIcon },
  { name: 'Containers', href: '/containers', icon: CircleStackIcon },
  { name: 'AI Test', href: '/ai-test', icon: SparklesIcon },
  { name: 'Automation', href: '/automation', icon: BoltIcon },
  { name: 'Monitoring', href: '/monitoring', icon: ChartBarIcon },
  { name: 'Integrations', href: '/integrations', icon: LinkIcon },
  { name: 'Cloud Providers', href: '/integrations/cloud-providers', icon: CloudArrowUpIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
  { name: 'Documentation', href: '/docs', icon: BookOpenIcon },
  { name: 'How-to Guides', href: '/how-to', icon: ClipboardDocumentIcon },
  { name: 'Help Center', href: '/help', icon: QuestionMarkCircleIcon },
];

interface DocSection {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  articles: DocArticle[];
}

interface DocArticle {
  id: string;
  title: string;
  description: string;
  href: string;
}

const docSections: DocSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'New to RuneSpoke Hub? Start here!',
    icon: RocketLaunchIcon,
    articles: [
      {
        id: 'welcome',
        title: 'Welcome to RuneSpoke Hub',
        description: 'Introduction to the platform and key concepts',
        href: '/docs'
      },
      {
        id: 'quick-start',
        title: 'Quick Start Guide',
        description: 'Get up and running in 5 minutes',
        href: '/docs/quick-start'
      },
      {
        id: 'platform-overview',
        title: 'Platform Overview',
        description: 'Understanding the main components',
        href: '/docs/platform-overview'
      }
    ]
  },
  {
    id: 'integrations',
    title: 'Integrations',
    description: 'Connect your favorite tools and services',
    icon: BoltIcon,
    articles: [
      {
        id: 'connect-slack',
        title: 'Connect Slack',
        description: 'Set up Slack for team notifications',
        href: '/docs/integrations/slack'
      },
      {
        id: 'connect-github',
        title: 'Connect GitHub',
        description: 'Link your repositories for automated workflows',
        href: '/docs/integrations/github'
      },
      {
        id: 'cloud-providers',
        title: 'Cloud Providers',
        description: 'AWS, Azure, GCP deployment integration',
        href: '/docs/integrations/cloud-providers'
      }
    ]
  },
  {
    id: 'ai-features',
    title: 'AI Features',
    description: 'Harness the power of AI in your workflows',
    icon: SparklesIcon,
    articles: [
      {
        id: 'ai-chat-assistant',
        title: 'AI Chat Assistant',
        description: 'Using the intelligent assistant',
        href: '/docs/ai/chat-assistant'
      },
      {
        id: 'ai-providers',
        title: 'AI Providers',
        description: 'Configure Claude, GPT-4, and Gemini',
        href: '/docs/ai/providers'
      },
      {
        id: 'smart-automation',
        title: 'Smart Automation',
        description: 'AI-powered workflow automation',
        href: '/docs/ai/automation'
      }
    ]
  },
  {
    id: 'development',
    title: 'Development',
    description: 'Development tools and workflows',
    icon: CodeBracketIcon,
    articles: [
      {
        id: 'ide-integration',
        title: 'IDE Integration',
        description: 'VS Code, JetBrains, and other editors',
        href: '/docs/development/ide-integration'
      },
      {
        id: 'automation-workflows',
        title: 'Automation Workflows',
        description: 'Create powerful automation workflows',
        href: '/docs/development/automation'
      },
      {
        id: 'container-management',
        title: 'Docker Container Management',
        description: 'Docker and Kubernetes management',
        href: '/docs/containers/docker'
      }
    ]
  }
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 flex-shrink-0">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/runespoke-logo.png"
                  alt="RuneSpoke Hub"
                  width={120}
                  height={32}
                  className="h-8 w-auto"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/docs"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  pathname?.startsWith('/docs')
                    ? 'border-b-2 border-blue-500 text-gray-900'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <BookOpenIcon className="h-4 w-4 mr-2" />
                Documentation
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                <HomeIcon className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
              <Link
                href="/containers"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                <CircleStackIcon className="h-4 w-4 mr-2" />
                Containers
              </Link>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-600"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  href="/docs"
                  className="block px-3 py-2 text-base font-medium rounded-md bg-blue-50 text-blue-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <BookOpenIcon className="h-5 w-5 mr-3" />
                    Documentation
                  </div>
                </Link>
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <HomeIcon className="h-5 w-5 mr-3" />
                    Dashboard
                  </div>
                </Link>
                <Link
                  href="/containers"
                  className="block px-3 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <CircleStackIcon className="h-5 w-5 mr-3" />
                    Containers
                  </div>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Layout */}
      <div className="flex" style={{ height: 'calc(100vh - 4rem)' }}>
        {/* Documentation Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex-shrink-0">
          <div className="h-full overflow-y-auto">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Documentation</h1>
              <p className="text-gray-600 text-sm">
                Everything you need to know about RuneSpoke Hub
              </p>
            </div>

            <nav className="px-6 pb-6">
              {docSections.map((section) => (
                <div key={section.id} className="mb-8">
                  <div className="flex items-center mb-4">
                    <section.icon className="h-5 w-5 text-blue-600 mr-2" />
                    <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{section.description}</p>
                  
                  <ul className="space-y-2">
                    {section.articles.map((article) => {
                      const isActive = pathname === article.href;
                      return (
                        <li key={article.id}>
                          <Link
                            href={article.href}
                            className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                              isActive
                                ? 'bg-blue-50 text-blue-700 font-medium'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                          >
                            {article.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-8 py-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}