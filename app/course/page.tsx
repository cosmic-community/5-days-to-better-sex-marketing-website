// app/course/page.tsx
import { cosmic, hasStatus } from '@/lib/cosmic';
import type { Metadata } from 'next';
import ProductShowcase from '@/components/ProductShowcase';
import VisualRoadmap from '@/components/VisualRoadmap';
import FAQPreview from '@/components/FAQPreview';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';

interface PageMetadata {
  title: string;
  content: string;
  hero_section?: {
    heading: string;
    subheading: string;
    cta_text: string;
    cta_url: string;
    background_image: string;
    show_hero: boolean;
  };
  seo_title?: string;
  meta_description?: string;
  featured_image?: {
    url: string;
    imgix_url: string;
  };
}

interface CoursePage {
  id: string;
  slug: string;
  title: string;
  metadata: PageMetadata;
}

async function getCoursePage(): Promise<CoursePage | null> {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'pages',
        slug: 'course-details'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.object as CoursePage;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCoursePage();
  
  if (!page) {
    return {
      title: '5 Days to Better Sex Course | Hi Love',
      description: '5-day expert-guided course to transform your intimate relationship. Learn communication, pleasure mapping, and connection techniques that really work.',
    };
  }

  return {
    title: page.metadata.seo_title || page.metadata.title || '5 Days to Better Sex Course | Hi Love',
    description: page.metadata.meta_description || '5-day expert-guided course to transform your intimate relationship. Learn communication, pleasure mapping, and connection techniques that really work.',
  };
}

export default async function CoursePage() {
  const page = await getCoursePage();

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600">The course page content could not be loaded.</p>
        </div>
      </div>
    );
  }

  const { metadata } = page;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {metadata.hero_section?.show_hero && (
        <section className="relative bg-gradient-to-br from-primary/50 to-muted py-16 md:py-24">
          {metadata.hero_section.background_image && (
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{
                backgroundImage: `url(${metadata.hero_section.background_image}?w=1920&h=1080&fit=crop&auto=format,compress)`
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-accent-orange/5 to-accent-green/5"></div>
          
          <div className="container relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              {metadata.hero_section.heading}
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto">
              {metadata.hero_section.subheading}
            </p>
            {metadata.hero_section.cta_text && metadata.hero_section.cta_url && (
              <a
                href={metadata.hero_section.cta_url}
                className="inline-flex items-center px-8 py-4 bg-accent-orange text-white font-semibold rounded-lg hover:bg-accent-orange/90 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent-orange/50"
              >
                {metadata.hero_section.cta_text}
              </a>
            )}
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-accent-orange prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-li:text-gray-700"
              dangerouslySetInnerHTML={{ __html: metadata.content }}
            />
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <ProductShowcase />

      {/* Visual Roadmap */}
      <VisualRoadmap />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* FAQ Preview */}
      <FAQPreview />

      {/* Final CTA */}
      <CTASection />
    </div>
  );
}