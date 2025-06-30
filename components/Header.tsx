import Link from 'next/link';
import { cosmic, hasStatus } from '@/lib/cosmic';
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
      return [];
    }
    throw error;
  }
}

export default async function Header() {
  const navigation = await getNavigation();

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <img 
              src="https://imgix.cosmicjs.com/your-logo-url?w=120&h=40&fit=crop&auto=format,compress" 
              alt="Hello Love Co." 
              width="120" 
              height="40"
              className="h-10 w-auto"
            />
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
          </div>
        </div>
      </div>
    </header>
  );
}