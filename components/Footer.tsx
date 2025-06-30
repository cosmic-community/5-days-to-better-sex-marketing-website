import Link from 'next/link';
import { cosmic, hasStatus, getSiteSettings } from '@/lib/cosmic';
import type { NavigationItem } from '@/types';

async function getFooterNavigation(): Promise<NavigationItem[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'navigation',
        'metadata.navigation_group': 'footer'
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

async function getLegalNavigation(): Promise<NavigationItem[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'navigation',
        'metadata.navigation_group': 'legal'
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

export default async function Footer() {
  const [footerNav, legalNav, siteSettings] = await Promise.all([
    getFooterNavigation(),
    getLegalNavigation(),
    getSiteSettings(),
  ]);

  const siteName = siteSettings?.metadata?.site_name || 'Hello Love Co.';
  const logo = siteSettings?.metadata?.logo;
  const copyrightText = siteSettings?.metadata?.footer_copyright || `© ${new Date().getFullYear()} ${siteName}. All rights reserved.`;

  return (
    <footer className="bg-accent-dark text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              {logo?.imgix_url ? (
                <img 
                  src={`${logo.imgix_url}?w=240&h=80&fit=max&auto=format,compress`}
                  alt={siteName}
                  width="120"
                  height="40"
                  className="h-10 w-auto"
                />
              ) : (
                <div className="text-2xl font-bold text-white">
                  💕 {siteName}
                </div>
              )}
            </Link>
            <p className="text-gray-300 max-w-md">
              Transform your intimate relationship in just 5 days with expert-guided lessons, 
              exercises, and proven techniques from certified sex therapists.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerNav.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.metadata?.url || '#'}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                    {...(item.metadata?.link_type === 'external' && {
                      target: '_blank',
                      rel: 'noopener noreferrer'
                    })}
                  >
                    {item.metadata?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors duration-200">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            {copyrightText}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {legalNav.map((item) => (
              <Link
                key={item.id}
                href={item.metadata?.url || '#'}
                className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
              >
                {item.metadata?.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}