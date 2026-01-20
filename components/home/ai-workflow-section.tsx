'use client';

import { CodeBracketIcon, EyeIcon, RocketLaunchIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export function AIWorkflowSection() {
  const workflowSteps = [
    {
      step: 1,
      title: 'Code with AI',
      description: 'AI assists coding with multi-provider intelligence',
      icon: CodeBracketIcon,
      color: 'bg-blue-600',
    },
    {
      step: 2,
      title: 'Auto Review',
      description: 'AI reviews code for bugs, security, and performance',
      icon: EyeIcon,
      color: 'bg-green-600',
    },
    {
      step: 3,
      title: 'Smart Deploy',
      description: 'AI orchestrates testing, building, and deployment',
      icon: RocketLaunchIcon,
      color: 'bg-purple-600',
    },
    {
      step: 4,
      title: 'Monitor & Optimize',
      description: 'AI monitors performance and suggests improvements',
      icon: ChartBarIcon,
      color: 'bg-red-600',
    },
  ];

  const metrics = [
    { value: '20+', label: 'Integrations' },
    { value: '4+', label: 'AI Providers' },
    { value: '24/7', label: 'Automation' },
  ];

  return (
    <section className="py-20 bg-gray-50/80 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100"></div>
      </div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-4">
            <span className="text-lg font-semibold text-blue-600">Superior Development Pipeline</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            AI-enhanced workflow optimization for professional development teams
          </h2>
        </div>

        {/* Workflow Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {workflowSteps.map((step, index) => (
            <div key={step.step} className="relative">
              {/* Connection line (desktop only) */}
              {index < workflowSteps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-8 h-0.5 bg-gray-300 z-0"></div>
              )}
              
              <div className="relative bg-white/80 rounded-xl p-6 shadow-lg border border-gray-200 text-center">
                {/* Step number and icon */}
                <div className="flex flex-col items-center mb-4">
                  <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center mb-3`}>
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-500">STEP {step.step}</span>
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Results Section */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-8">Result: 10x Faster Development</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {metrics.map((metric) => (
              <div key={metric.label}>
                <div className="text-4xl md:text-5xl font-bold mb-2">{metric.value}</div>
                <div className="text-lg opacity-90">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}