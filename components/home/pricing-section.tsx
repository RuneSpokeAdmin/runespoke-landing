'use client';

import { useState } from 'react';
import { CheckIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useEmailModal } from '@/contexts/email-modal-context';

const pricingPlans = [
  {
    id: 'starter',
    name: 'Starter',
    price: { monthly: 'TBD', yearly: 'TBD' },
    betaPrice: 'Free',
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
    color: 'blue'
  },
  {
    id: 'professional',
    name: 'Professional',
    price: { monthly: 'TBD', yearly: 'TBD' },
    betaPrice: 'Free',
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
    color: 'purple'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: { monthly: 'TBD', yearly: 'TBD' },
    betaPrice: 'Free',
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
    color: 'gray'
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
            BETA TESTERS GET EVERYTHING FREE
            <SparklesIcon className="w-4 h-4" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Join the Beta Program - 100% Free Access
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            Beta testers get <span className="font-bold text-green-600">FULL ENTERPRISE ACCESS</span> during beta,
            plus <span className="font-bold text-blue-600">50% OFF FOREVER</span> on any plan after launch
          </p>

          {/* Beta benefits highlight */}
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-4 max-w-2xl mx-auto mb-8">
            <p className="text-sm font-semibold text-purple-900">
              🎁 BETA EXCLUSIVE: Full Enterprise Suite + Lifetime 50% Discount on ALL Plans
            </p>
          </div>

          {/* Billing toggle */}
          <div className="flex items-center justify-center mb-8">
            <span className={`mr-3 ${billingCycle === 'monthly' ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`ml-3 ${billingCycle === 'yearly' ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
              Yearly
              <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                Save 20%
              </span>
            </span>
          </div>
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
              {/* Free during beta badge */}
              <div className="absolute -top-4 right-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                FREE IN BETA
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
                <div className="mb-2">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-green-600">
                      {plan.betaPrice}
                    </span>
                    <span className="ml-2 text-gray-600">during beta</span>
                  </div>
                </div>

                {/* Regular pricing with 50% off */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-500 mb-1">After beta (50% off forever):</p>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-blue-600">
                      $TBD
                    </span>
                    <span className="text-sm text-gray-600 ml-1">
                      /month/user
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Pricing to be announced - Beta testers get 50% off
                  </p>
                </div>

                {/* Enterprise suite notice */}
                {plan.id !== 'enterprise' && (
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-2 mb-4">
                    <p className="text-xs text-purple-800 font-medium">
                      🚀 Beta bonus: Get full Enterprise features during beta!
                    </p>
                  </div>
                )}
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
                onClick={() => openModal('Join Beta Program')}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all cursor-pointer ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Get Free Beta Access
              </button>
            </div>
          ))}
        </div>

        {/* Beta program super benefits */}
        <div className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border-2 border-green-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            🎉 Beta Tester Exclusive Benefits
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">💎</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Full Enterprise Suite</h4>
              <p className="text-sm text-gray-600">Access all Enterprise features during beta, regardless of plan</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">💰</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-1">50% Off Forever</h4>
              <p className="text-sm text-gray-600">Lifetime 50% discount on ANY plan you choose after beta</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">🚀</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Priority Everything</h4>
              <p className="text-sm text-gray-600">First access to new features, priority support, and direct team access</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">🏆</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-1">Founder Status</h4>
              <p className="text-sm text-gray-600">Shape the product roadmap and get recognized as a founding member</p>
            </div>
          </div>
        </div>

        {/* Limited spots notice */}
        <div className="mt-8 text-center">
          <p className="text-lg font-semibold text-red-600">
            ⏰ Limited Beta Spots Available
          </p>
          <p className="text-gray-600 mt-2">
            Join now to lock in your lifetime 50% discount and full Enterprise access
          </p>
        </div>
      </div>
    </section>
  );
}