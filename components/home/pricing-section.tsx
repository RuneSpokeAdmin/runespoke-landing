'use client';

import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const pricingPlans = [
  {
    id: 'starter',
    name: 'Starter',
    price: { monthly: 29, yearly: 290 },
    description: 'Perfect for individuals and small teams getting started with automation.',
    features: [
      '5 active workflows',
      '1,000 AI requests/month',
      'Basic integrations (GitHub, Slack)',
      'IDE extensions',
      'AI chat assistant',
      'Basic automation workflows',
      'Community support',
      'Email support'
    ],
    popular: false,
    color: 'blue'
  },
  {
    id: 'professional',
    name: 'Professional',
    price: { monthly: 99, yearly: 990 },
    description: 'Ideal for growing teams that need advanced workflow automation.',
    features: [
      '50 active workflows',
      '10,000 AI requests/month',
      'All integrations (20+ services)',
      'Cloud provider management',
      'Container management',
      'Advanced automation',
      'Real-time monitoring',
      'Team collaboration',
      'AI testing & comparison',
      'User invitations & onboarding',
      'Basic user management (up to 50 users)',
      'Priority support',
      'Phone support'
    ],
    popular: true,
    color: 'purple'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: { monthly: 299, yearly: 2990 },
    description: 'For large organizations requiring enterprise-grade features.',
    features: [
      'Unlimited workflows',
      '100,000+ AI requests/month',
      'Custom integrations & APIs',
      'White-label options',
      'Enterprise user management (unlimited users)',
      'Role-based access control (RBAC)',
      'Audit logging & compliance (SOC 2, GDPR)',
      'Session management & analytics',
      'SSO & SAML authentication',
      'Advanced security & compliance',
      'Dedicated support manager',
      'SLA guarantees',
      'Custom deployment',
      'On-premise options',
      '24/7 phone support'
    ],
    popular: false,
    color: 'gold'
  }
];

interface PricingSectionProps {
  isMonthly?: boolean;
  setIsMonthly?: (value: boolean) => void;
}

export function PricingSection({ isMonthly = true, setIsMonthly }: PricingSectionProps) {
  const [localIsMonthly, setLocalIsMonthly] = useState(isMonthly);

  const handleToggle = (value: boolean) => {
    setLocalIsMonthly(value);
    setIsMonthly?.(value);
  };

  return (
    <section id="pricing" className="py-20 bg-white/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your team. All plans include our core features with varying limits and support levels.
          </p>
          
          {/* Pricing Toggle */}
          <div className="flex items-center justify-center mb-8">
            <span className={`mr-3 text-sm font-medium ${localIsMonthly ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => handleToggle(!localIsMonthly)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                localIsMonthly ? 'bg-gray-200' : 'bg-blue-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  localIsMonthly ? 'translate-x-1' : 'translate-x-6'
                }`}
              />
            </button>
            <span className={`ml-3 text-sm font-medium ${!localIsMonthly ? 'text-gray-900' : 'text-gray-500'}`}>
              Yearly
            </span>
            {!localIsMonthly && (
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Save 17%
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl border p-8 shadow-lg ${
                plan.popular
                  ? 'border-purple-200 ring-2 ring-purple-500'
                  : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-purple-500 text-white">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
                <p className="mt-6">
                  <span className="text-4xl font-bold text-gray-900">
                    ${localIsMonthly ? plan.price.monthly : plan.price.yearly}
                  </span>
                  <span className="text-base font-medium text-gray-500">
                    {localIsMonthly ? '/month' : '/year'}
                  </span>
                </p>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckIcon className="flex-shrink-0 w-5 h-5 text-green-500 mt-0.5" />
                    <span className="ml-3 text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link
                  href="/signup"
                  className={`block w-full text-center px-6 py-3 rounded-lg text-sm font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}