// components/Header.tsx
import Link from 'next/link';
import { cosmic, hasStatus, getSiteSettings } from '@/lib/cosmic';
import type { NavigationItem } from '@/types';
import HeaderClient from './HeaderClient';

// Server-side data fetching function
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

// Server component that fetches data and passes it to client component
export default async function Header() {
  const [navigation, siteSettings] = await Promise.all([
    getNavigationData(),
    getSiteSettings(),
  ]);

  return <HeaderClient navigation={navigation} siteSettings={siteSettings} />;
}