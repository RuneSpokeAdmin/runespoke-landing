'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-black py-2'
        : 'bg-gradient-to-b from-black to-gray-800 py-4'
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/runespoke-logo.png"
                alt="RuneSpoke"
                width={140}
                height={140}
                className={`transition-all duration-300 ${
                  isScrolled
                    ? 'h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20'
                    : 'h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-32 lg:w-32'
                }`}
              />
            </Link>
          </div>
          <div className="hidden sm:flex items-center space-x-4 md:space-x-8 text-gray-300 text-sm md:text-base">
            <span className="hidden md:inline">Documentation Coming Soon</span>
            <span className="hidden md:inline">•</span>
            <span>hello@runespoke.ai</span>
          </div>
        </div>
      </div>
    </header>
  );
}