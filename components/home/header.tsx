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
                width={isScrolled ? 80 : 140}
                height={isScrolled ? 80 : 140}
                className={`transition-all duration-300 ${
                  isScrolled ? 'h-20 w-20' : 'h-32 w-32'
                }`}
              />
            </Link>
          </div>
          <div className="flex items-center space-x-8 text-gray-300">
            <span>Documentation Coming Soon</span>
            <span>•</span>
            <span>Contact: hello@runespoke.ai</span>
          </div>
        </div>
      </div>
    </header>
  );
}