'use client';

import { useState } from 'react';
import { CheckIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useEmailModal } from '@/contexts/email-modal-context';

const pricingPlans = [
  {
    id: 'starter',
    name: 'Starter',
    betaPrice: 'Free during beta',
    originalPrice: '$29/month after beta',
    description: 'Perfect for individuals and small teams getting started.',
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
    color: 'blue',
    betaBadge: '100% OFF'
  },
  {
    id: 'professional',
    name: 'Professional',
    betaPrice: '$49',
    originalPrice: '$99/month after beta',
    description: 'Ideal for growing teams that need advanced automation.',
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
    color: 'purple',
    betaBadge: '50% OFF'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    betaPrice: 'Custom',
    originalPrice: 'Contact sales',
    description: 'For large organizations with specific requirements.',
    features: [
      'Unlimited workflows',
      'Unlimited AI requests',
      'All integrations + custom',
      'Advanced security (SSO, SAML)',
      'Role-based access control',
      'Unlimited users',
      'Custom integrations',
      'White-label options',
      'On-premises deployment',
      'Audit logs & compliance',
      'Dedicated success manager',
      'SLA guarantee'
    ],
    popular: false,
    color: 'gray',
    betaBadge: 'EARLY ACCESS'
  }
];

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const { openModal } = useEmailModal();

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50/50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {/* Beta pricing badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full font-bold text-sm mb-6">
            <SparklesIcon className="w-4 h-4" />
            EXCLUSIVE BETA PRICING
            <SparklesIcon className="w-4 h-4" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Join the Beta Program
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-2">
            Get lifetime discounted pricing as an early adopter
          </p>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            Limited spots available. Lock in your beta pricing before public launch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-8 bg-white shadow-lg border-2 transition-all hover:shadow-xl hover:scale-105 ${
                plan.popular
                  ? 'border-purple-500 ring-4 ring-purple-100'
                  : 'border-gray-200'
              }`}
            >
              {/* Beta discount badge */}
              <div className="absolute -top-4 right-6 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {plan.betaBadge}
              </div>

              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-1 rounded-full text-sm font-semibold">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>

                {/* Beta pricing display */}
                <div className="mb-4">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.betaPrice}
                    </span>
                    {plan.id !== 'enterprise' && (
                      <span className="ml-2 text-gray-600">/month</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 line-through mt-1">
                    {plan.originalPrice}
                  </p>
                </div>

                {/* Beta notice */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 mb-4">
                  <p className="text-xs text-yellow-800 font-medium">
                    🎉 Beta Special: {plan.id === 'starter' ? 'Free forever for beta users' : 'Price locked for life'}
                  </p>
                </div>
              </div>

              <ul className="mb-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => openModal(plan.id === 'enterprise' ? 'Contact Sales' : 'Join Beta')}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.id === 'enterprise' ? 'Contact Sales' : 'Join Beta Program'}
              </button>
            </div>
          ))}
        </div>

        {/* Beta program benefits */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
            Beta Program Benefits
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🚀</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Early Access</h4>
              <p className="text-sm text-gray-600">Be first to use new features and integrations</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💰</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Lifetime Discount</h4>
              <p className="text-sm text-gray-600">Lock in beta pricing forever, never pay full price</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Direct Input</h4>
              <p className="text-sm text-gray-600">Shape the product with your feedback and needs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}