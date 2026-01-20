'use client';

import { useState } from 'react';
import { Header } from '@/components/home/header';
import { HeroSection } from '@/components/home/hero-section';
import { FeaturesSection } from '@/components/home/features-section';
import { AIWorkflowSection } from '@/components/home/ai-workflow-section';
import { IntegrationsSection } from '@/components/home/integrations-section';
import { ComparisonSection } from '@/components/home/comparison-section';
import { TestimonialsSection } from '@/components/home/testimonials-section';
import { PricingSection } from '@/components/home/pricing-section';
import { CTASection } from '@/components/home/cta-section';
import { Footer } from '@/components/home/footer';

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Fixed background logo - clean and simple */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'url(/runespoke-background-logo.png)',
          backgroundSize: '50% auto',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          opacity: 0.15,
        }}
      ></div>

      {/* Content with transparency to show logo */}
      <div className="relative z-10">
        <Header />
        <div className="pt-40">
          <HeroSection />
          <FeaturesSection />
          <AIWorkflowSection />
          <IntegrationsSection />
          <ComparisonSection />
          <TestimonialsSection />
          <PricingSection />
          <CTASection />
          <Footer />
        </div>
      </div>
    </div>
  );
}
