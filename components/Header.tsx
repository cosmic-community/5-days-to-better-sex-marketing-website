// components/Header.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { cosmic, hasStatus, getSiteSettings } from '@/lib/cosmic';
import type { NavigationItem } from '@/types';

// Move the async data fetching to a separate function
async function getNavigationData() {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'navigation',
        'metadata.navigation_group': 'header'
      })
      .props(['id', 'title', 'metadata'])
      .sort('metadata.order');
    return response.objects as NavigationItem[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      // Return fallback navigation items when no content exists in Cosmic
      return [
        {
          id: 'temp-1',
          slug: 'about',
          title: 'About',
          type_slug: 'navigation',
          created_at: '',
          modified_at: '',
          metadata: {
            label: 'About',
            url: '/about',
            link_type: 'internal',
            navigation_group: 'header',
            order: 1
          }
        },
        {
          id: 'temp-2',
          slug: 'course',
          title: 'Course',
          type_slug: 'navigation',
          created_at: '',
          modified_at: '',
          metadata: {
            label: 'Course',
            url: '#course',
            link_type: 'internal',
            navigation_group: 'header',
            order: 2
          }
        },
        {
          id: 'temp-3',
          slug: 'testimonials',
          title: 'Testimonials',
          type_slug: 'navigation',
          created_at: '',
          modified_at: '',
          metadata: {
            label: 'Testimonials',
            url: '#testimonials',
            link_type: 'internal',
            navigation_group: 'header',
            order: 3
          }
        }
      ] as NavigationItem[];
    }
    throw error;
  }
}

interface HeaderProps {
  navigation: NavigationItem[];
  siteSettings: any;
}

function HeaderClient({ navigation, siteSettings }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50); // Trigger transition after 50px of scrolling
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check initial scroll position
    handleScroll();

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const siteName = siteSettings?.metadata?.site_name || 'Hello Love Co.';
  const logo = siteSettings?.metadata?.logo;

  return (
    <header 
      className={`
        sticky top-0 z-50 transition-all duration-500 ease-in-out
        ${isScrolled 
          ? 'bg-white shadow-lg backdrop-blur-sm border-b border-gray-100' 
          : 'bg-gradient-to-br from-primary/50 to-muted border-b border-primary/20'
        }
      `}
    >
      {/* Gradient overlay for consistency with hero - only when not scrolled */}
      {!isScrolled && (
        <div className="absolute inset-0 bg-gradient-to-r from-accent-orange/5 to-accent-green/5"></div>
      )}
      
      <div className="container relative z-10">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            {logo?.imgix_url ? (
              <img 
                src={`${logo.imgix_url}?w=240&h=60&fit=max&auto=format,compress`}
                alt={siteName}
                width="120"
                height="30"
                className="h-8 w-auto transition-all duration-500"
              />
            ) : (
              <div className={`text-2xl font-bold transition-colors duration-500 ${
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
                className={`font-medium transition-all duration-500 hover:scale-105 ${
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
              className={`font-medium transition-all duration-500 hover:scale-105 ${
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
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent-orange/50 ${
                isScrolled
                  ? 'bg-accent-orange text-white hover:bg-accent-orange/90 shadow-md'
                  : 'bg-accent-orange text-white hover:bg-accent-orange/90'
              }`}
            >
              Get Started
            </Link>
            
            {/* Mobile menu button */}
            <button className={`md:hidden p-2 transition-all duration-500 ${
              isScrolled 
                ? 'text-gray-700 hover:text-accent-orange' 
                : 'text-foreground hover:text-accent-orange'
            }`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default async function Header() {
  const [navigation, siteSettings] = await Promise.all([
    getNavigationData(),
    getSiteSettings(),
  ]);

  return <HeaderClient navigation={navigation} siteSettings={siteSettings} />;
}