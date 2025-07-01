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

interface Product {
  id: string;
  slug: string;
  title: string;
  metadata: {
    name: string;
    description: string;
    whats_included: Array<{
      item: string;
      description: string;
    }>;
    price: string;
    buy_now_link: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    cta_copy: string;
    benefits: string[];
  };
}

interface RoadmapDay {
  id: string;
  slug: string;
  title: string;
  metadata: {
    day_number: number;
    title: string;
    summary: string;
    icon: string;
    image?: {
      url: string;
      imgix_url: string;
    };
    key_takeaway: string;
  };
}

interface Testimonial {
  id: string;
  slug: string;
  title: string;
  metadata: {
    quote: string;
    name: string;
    image?: {
      url: string;
      imgix_url: string;
    };
    relationship_context: string;
    featured: boolean;
    star_rating: number;
  };
}

interface FAQ {
  id: string;
  slug: string;
  title: string;
  metadata: {
    question: string;
    answer: string;
    category: {
      key: string;
      value: string;
    };
    order: number;
    featured: boolean;
  };
}

interface CTABlock {
  id: string;
  slug: string;
  title: string;
  metadata: {
    heading: string;
    subheading: string;
    button_text: string;
    button_url: string;
    background_image?: {
      url: string;
      imgix_url: string;
    };
    background_color: string;
    name: string;
  };
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

async function getProduct(): Promise<Product | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'product' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.object as Product;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

async function getRoadmapDays(): Promise<RoadmapDay[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'visual-roadmap' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('metadata.day_number');
    return response.objects as RoadmapDay[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw error;
  }
}

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'testimonials' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(10);
    return response.objects as Testimonial[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw error;
  }
}

async function getFAQs(): Promise<FAQ[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'faqs' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('metadata.order')
      .limit(6);
    return response.objects as FAQ[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw error;
  }
}

async function getCTABlock(): Promise<CTABlock | null> {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'cta-blocks',
        slug: 'course-hero-cta'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    return response.object as CTABlock;
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
  // Fetch all required data
  const [page, product, roadmapDays, testimonials, faqs, ctaBlock] = await Promise.all([
    getCoursePage(),
    getProduct(),
    getRoadmapDays(),
    getTestimonials(),
    getFAQs(),
    getCTABlock()
  ]);

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
      {product && <ProductShowcase product={product} />}

      {/* Visual Roadmap */}
      <VisualRoadmap days={roadmapDays} content={{
        title: "Your 5-Day Journey",
        subtitle: "Each day builds on the last, creating a comprehensive transformation"
      }} />

      {/* Testimonials */}
      <TestimonialsSection testimonials={testimonials} content={{
        title: "What Couples Are Saying",
        subtitle: "Real results from real relationships"
      }} />

      {/* FAQ Preview */}
      <FAQPreview faqs={faqs} content={{
        title: "Frequently Asked Questions",
        subtitle: "Everything you need to know before starting your journey"
      }} />

      {/* Final CTA */}
      {ctaBlock && <CTASection content={ctaBlock} />}
    </div>
  );
}