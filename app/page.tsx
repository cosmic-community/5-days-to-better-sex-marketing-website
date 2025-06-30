import { cosmic, hasStatus } from '@/lib/cosmic';
import type { Product, BlogPost, Testimonial, RoadmapDay } from '@/types';
import Hero from '@/components/Hero';
import ProductShowcase from '@/components/ProductShowcase';
import VisualRoadmap from '@/components/VisualRoadmap';
import TestimonialsSection from '@/components/TestimonialsSection';
import BlogPreview from '@/components/BlogPreview';
import CTASection from '@/components/CTASection';

async function getProduct(): Promise<Product | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'product',
      slug: 'product'
    });
    return response.object as Product;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'blog-posts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(3);
    return response.objects as BlogPost[];
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
      .find({ 
        type: 'testimonials',
        'metadata.featured': true 
      })
      .props(['id', 'title', 'metadata'])
      .limit(6);
    return response.objects as Testimonial[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw error;
  }
}

async function getRoadmapDays(): Promise<RoadmapDay[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'visual-roadmap' })
      .props(['id', 'title', 'metadata'])
      .sort('metadata.day_number');
    return response.objects as RoadmapDay[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw error;
  }
}

export default async function HomePage() {
  const [product, blogPosts, testimonials, roadmapDays] = await Promise.all([
    getProduct(),
    getBlogPosts(),
    getTestimonials(),
    getRoadmapDays(),
  ]);

  return (
    <div className="min-h-screen">
      <Hero product={product} />
      
      {product && (
        <ProductShowcase product={product} />
      )}
      
      {roadmapDays.length > 0 && (
        <VisualRoadmap days={roadmapDays} />
      )}
      
      {testimonials.length > 0 && (
        <TestimonialsSection testimonials={testimonials} />
      )}
      
      {blogPosts.length > 0 && (
        <BlogPreview posts={blogPosts} />
      )}
      
      <CTASection />
    </div>
  );
}