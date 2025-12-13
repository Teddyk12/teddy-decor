'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState('/images/teddy-decor-logo.svg');

  // Load custom logo from localStorage
  useEffect(() => {
    const savedLogo = localStorage.getItem('customLogo');
    if (savedLogo) {
      setLogoUrl(savedLogo);
    }
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Our Process', href: '/process' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-rose-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-14 h-14 flex-shrink-0">
              <Image
                src={logoUrl}
                alt="Teddy Decor - Creating Unforgettable Moments"
                fill
                className="object-contain transition-transform group-hover:scale-105"
                priority
                unoptimized
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-800 tracking-wide">
                Teddy Decor
              </span>
              <span className="text-xs text-rose-600 font-medium tracking-wider uppercase hidden sm:block">
                Creating Unforgettable Moments
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-gray-700 hover:text-rose-500 font-medium transition-colors rounded-lg hover:bg-rose-50"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/services"
              className="ml-4 px-6 py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium rounded-full hover:shadow-lg hover:scale-105 transition-all"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-rose-50 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-rose-100 bg-white">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:text-rose-500 hover:bg-rose-50 rounded-lg font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/services"
              onClick={() => setIsMenuOpen(false)}
              className="block text-center px-4 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium rounded-lg hover:shadow-lg transition-all"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
