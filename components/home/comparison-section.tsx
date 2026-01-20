'use client';

import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const competitors = [
  { name: 'RuneSpoke', isUs: true },
  { name: 'GitHub Actions', isUs: false },
  { name: 'GitLab CI/CD', isUs: false },
  { name: 'Jenkins', isUs: false },
  { name: 'CircleCI', isUs: false }
];

const features = [
  {
    category: 'AI Integration',
    items: [
      { feature: 'Multi-AI Provider Support', runespoke: true, github: false, gitlab: false, jenkins: false, circleci: false },
      { feature: 'AI-Powered Code Review', runespoke: true, github: false, gitlab: false, jenkins: false, circleci: false },
      { feature: 'Intelligent Workflow Optimization', runespoke: true, github: false, gitlab: false, jenkins: false, circleci: false },
      { feature: 'AI Chat Assistant', runespoke: true, github: false, gitlab: false, jenkins: false, circleci: false }
    ]
  },
  {
    category: 'Platform Features',
    items: [
      { feature: 'Visual Workflow Builder', runespoke: true, github: false, gitlab: true, jenkins: false, circleci: false },
      { feature: 'Real-time Monitoring', runespoke: true, github: true, gitlab: true, jenkins: true, circleci: true },
      { feature: 'Multi-Cloud Support', runespoke: true, github: true, gitlab: true, jenkins: true, circleci: true },
      { feature: 'Container Management', runespoke: true, github: true, gitlab: true, jenkins: true, circleci: true }
    ]
  },
  {
    category: 'Integrations',
    items: [
      { feature: 'IDE Extensions (VS Code, JetBrains)', runespoke: true, github: false, gitlab: false, jenkins: false, circleci: false },
      { feature: 'Slack/Discord Integration', runespoke: true, github: true, gitlab: true, jenkins: true, circleci: true },
      { feature: 'Project Management Tools', runespoke: true, github: true, gitlab: true, jenkins: true, circleci: true },
      { feature: 'Custom API Integrations', runespoke: true, github: true, gitlab: true, jenkins: true, circleci: true }
    ]
  },
  {
    category: 'Enterprise Features',
    items: [
      { feature: 'SSO/SAML Integration', runespoke: true, github: true, gitlab: true, jenkins: true, circleci: true },
      { feature: 'Audit Logging', runespoke: true, github: true, gitlab: true, jenkins: true, circleci: true },
      { feature: 'Role-Based Access Control', runespoke: true, github: true, gitlab: true, jenkins: true, circleci: true },
      { feature: 'White-label Options', runespoke: true, github: false, gitlab: false, jenkins: false, circleci: false }
    ]
  }
];

export function ComparisonSection() {
  const getFeatureValue = (item: any, competitor: string) => {
    switch (competitor) {
      case 'RuneSpoke': return item.runespoke;
      case 'GitHub Actions': return item.github;
      case 'GitLab CI/CD': return item.gitlab;
      case 'Jenkins': return item.jenkins;
      case 'CircleCI': return item.circleci;
      default: return false;
    }
  };

  return (
    <section id="comparison" className="py-20 bg-white/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How RuneSpoke Compares
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See why RuneSpoke is the most comprehensive platform for modern development teams
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Header */}
            <div className="grid grid-cols-6 gap-4 mb-8">
              <div className="col-span-1">
                <div className="h-12 flex items-center">
                  <span className="text-sm font-medium text-gray-500">Features</span>
                </div>
              </div>
              {competitors.map((competitor) => (
                <div key={competitor.name} className="col-span-1">
                  <div className={`h-12 flex items-center justify-center rounded-lg ${
                    competitor.isUs 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    <span className="text-sm font-medium">{competitor.name}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature Categories */}
            {features.map((category) => (
              <div key={category.category} className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {category.category}
                </h3>
                
                {category.items.map((item, index) => (
                  <div key={index} className="grid grid-cols-6 gap-4 py-3 border-b border-gray-200">
                    <div className="col-span-1">
                      <span className="text-sm text-gray-600">{item.feature}</span>
                    </div>
                    {competitors.map((competitor) => (
                      <div key={competitor.name} className="col-span-1 flex justify-center">
                        {getFeatureValue(item, competitor.name) ? (
                          <CheckIcon className={`h-5 w-5 ${
                            competitor.isUs ? 'text-blue-600' : 'text-green-500'
                          }`} />
                        ) : (
                          <XMarkIcon className="h-5 w-5 text-gray-300" />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Join thousands of developers who've made the switch to RuneSpoke
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Start Free Trial
              </button>
              <button className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white/80 hover:bg-gray-50">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}