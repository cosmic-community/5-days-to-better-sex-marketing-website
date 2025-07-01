// components/HeaderClient.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import type { NavigationItem } from '@/types';

interface HeaderClientProps {
  navigation: NavigationItem[];
  siteSettings: any;
}

export default function HeaderClient({ navigation, siteSettings }: HeaderClientProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set mounted to true to avoid hydration mismatch
    setIsMounted(true);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const shouldBeScrolled = scrollTop > 50;
      
      if (shouldBeScrolled !== isScrolled) {
        setIsScrolled(shouldBeScrolled);
      }
    };

    // Check initial scroll position
    handleScroll();

    // Add scroll event listener with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);

  // Prevent hydration mismatch by not rendering scroll-dependent styles on first render
  if (!isMounted) {
    return (
      <header className="sticky top-0 z-50 bg-gradient-to-br from-primary/50 to-muted border-b border-primary/20">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-orange/5 to-accent-green/5"></div>
        <div className="container relative z-10">
          <div className="flex items-center justify-between h-16">
            <HeaderContent 
              navigation={navigation} 
              siteSettings={siteSettings} 
              isScrolled={false}
            />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header 
      className={`
        sticky top-0 z-50 transition-all duration-300 ease-in-out
        ${isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-gradient-to-br from-primary/50 to-muted border-b border-primary/20'
        }
      `}
      style={{
        willChange: 'background-color, box-shadow, backdrop-filter'
      }}
    >
      {/* Gradient overlay for consistency with hero - only when not scrolled */}
      {!isScrolled && (
        <div className="absolute inset-0 bg-gradient-to-r from-accent-orange/5 to-accent-green/5"></div>
      )}
      
      <div className="container relative z-10">
        <div className="flex items-center justify-between h-16">
          <HeaderContent 
            navigation={navigation} 
            siteSettings={siteSettings} 
            isScrolled={isScrolled}
          />
        </div>
      </div>
    </header>
  );
}

// Separate component for header content to avoid duplication
function HeaderContent({ 
  navigation, 
  siteSettings, 
  isScrolled 
}: { 
  navigation: NavigationItem[];
  siteSettings: any;
  isScrolled: boolean;
}) {
  const siteName = siteSettings?.metadata?.site_name || 'Hello Love Co.';
  const logo = siteSettings?.metadata?.logo;

  return (
    <>
      <Link href="/" className="flex items-center space-x-2">
        {logo?.imgix_url ? (
          <img 
            src={`${logo.imgix_url}?w=240&h=60&fit=max&auto=format,compress`}
            alt={siteName}
            width="120"
            height="30"
            className="h-8 w-auto transition-all duration-300"
          />
        ) : (
          <div className={`text-2xl font-bold transition-colors duration-300 ${
            isScrolled ? 'text-gray-900' : 'text-foreground'
          }`}>
            💕 {siteName}
          </div>
        )}
      </Link>
      
      <nav className="hidden md:flex items-center space-x-8">
        {navigation.map((item: NavigationItem) => (
          <Link
            key={item.id}
            href={item.metadata?.url || '#'}
            className={`font-medium transition-all duration-300 hover:scale-105 ${
              isScrolled 
                ? 'text-gray-700 hover:text-accent-orange' 
                : 'text-foreground hover:text-accent-orange'
            }`}
            {...(item.metadata?.link_type === 'external' && {
              target: '_blank',
              rel: 'noopener noreferrer'
            })}
          >
            {item.metadata?.label}
          </Link>
        ))}
        <Link 
          href="/blog" 
          className={`font-medium transition-all duration-300 hover:scale-105 ${
            isScrolled 
              ? 'text-gray-700 hover:text-accent-orange' 
              : 'text-foreground hover:text-accent-orange'
          }`}
        >
          Blog
        </Link>
      </nav>
      
      <div className="flex items-center space-x-4">
        <Link 
          href="#course"
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent-orange/50 ${
            isScrolled
              ? 'bg-accent-orange text-white hover:bg-accent-orange/90 shadow-md'
              : 'bg-accent-orange text-white hover:bg-accent-orange/90'
          }`}
        >
          Get Started
        </Link>
        
        {/* Mobile menu button */}
        <button className={`md:hidden p-2 transition-all duration-300 ${
          isScrolled 
            ? 'text-gray-700 hover:text-accent-orange' 
            : 'text-foreground hover:text-accent-orange'
        }`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </>
  );
}