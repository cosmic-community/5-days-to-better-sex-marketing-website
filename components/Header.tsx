import Link from 'next/link';
import { cosmic, hasStatus, getSiteSettings } from '@/lib/cosmic';
import type { NavigationItem } from '@/types';

async function getNavigation(): Promise<NavigationItem[]> {
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

export default async function Header() {
  const [navigation, siteSettings] = await Promise.all([
    getNavigation(),
    getSiteSettings(),
  ]);

  const siteName = siteSettings?.metadata?.site_name || 'Hello Love Co.';
  const logo = siteSettings?.metadata?.logo;

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            {logo?.imgix_url ? (
              <img 
                src={`${logo.imgix_url}?w=240&h=60&fit=max&auto=format,compress`}
                alt={siteName}
                width="120"
                height="30"
                className="h-8 w-auto"
              />
            ) : (
              <div className="text-2xl font-bold text-accent-orange">
                💕 {siteName}
              </div>
            )}
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.id}
                href={item.metadata?.url || '#'}
                className="text-foreground hover:text-accent-orange transition-colors duration-200 font-medium"
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
              className="text-foreground hover:text-accent-orange transition-colors duration-200 font-medium"
            >
              Blog
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link 
              href="#course"
              className="btn-primary"
            >
              Get Started
            </Link>
            
            {/* Mobile menu button - you can implement mobile menu later */}
            <button className="md:hidden p-2 text-foreground hover:text-accent-orange">
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