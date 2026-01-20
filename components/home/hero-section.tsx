'use client';

import { motion } from 'framer-motion';
import { useEmailModal } from '@/contexts/email-modal-context';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  const { openModal } = useEmailModal();

  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-50/80 via-indigo-50/80 to-purple-50/80 backdrop-blur-sm">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Beta Badge - Centered */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring" }}
          className="flex justify-center mb-8"
        >
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full font-bold text-lg shadow-lg">
            BETA LAUNCHING SOON
          </div>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
        >
          The Complete AI-Powered
          <span className="text-blue-600"> Development Platform</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
        >
          Connect your entire development ecosystem with RuneSpoke Hub. From IDE extensions and AI chat assistants to cloud provider management and advanced automation workflows - everything your team needs is unified in one intelligent platform. Featuring 20+ integrations, multi-AI support, and enterprise-grade security.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center"
        >
          <button
            onClick={() => openModal('Get Early Access')}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center group cursor-pointer"
          >
            Get Early Access
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Beta Features - More sophisticated presentation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-3">Join hundreds of developers already on the waitlist</p>
          <div className="flex flex-wrap justify-center gap-8 text-base font-medium text-gray-700">
            <span>No Platform Markup</span>
            <span className="text-gray-400">•</span>
            <span>All Major IDEs</span>
            <span className="text-gray-400">•</span>
            <span>Enterprise Security</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}