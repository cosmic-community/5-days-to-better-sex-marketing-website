import { cosmic, hasStatus, getHomepageContent } from '@/lib/cosmic';
import type { Product, BlogPost, Testimonial, RoadmapDay, Author, FAQ, HomepageContent } from '@/types';
import Hero from '@/components/Hero';
import MeetJustine from '@/components/MeetJustine';
import ProductShowcase from '@/components/ProductShowcase';
import WhoItsFor from '@/components/WhoItsFor';
import VisualRoadmap from '@/components/VisualRoadmap';
import CoursePreview from '@/components/CoursePreview';
import TestimonialsSection from '@/components/TestimonialsSection';
import GuaranteeSection from '@/components/GuaranteeSection';
import FAQPreview from '@/components/FAQPreview';
import BlogPreview from '@/components/BlogPreview';
import CTASection from '@/components/CTASection';

async function getProduct(): Promise<Product | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'product',
      slug: '5-days-to-better-sex-course'
    }).props(['id', 'title', 'slug', 'metadata']).depth(1);
    return response.object as Product;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

async function getJustine(): Promise<Author | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'authors',
      slug: 'justine'
    }).props(['id', 'title', 'slug', 'metadata']).depth(1);
    return response.object as Author;
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

async function getFAQs(): Promise<FAQ[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'faqs',
        'metadata.featured': true 
      })
      .props(['id', 'title', 'metadata'])
      .limit(3);
    return response.objects as FAQ[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw error;
  }
}

export default async function HomePage() {
  const [product, justine, blogPosts, testimonials, roadmapDays, faqs, homepageContent] = await Promise.all([
    getProduct(),
    getJustine(),
    getBlogPosts(),
    getTestimonials(),
    getRoadmapDays(),
    getFAQs(),
    getHomepageContent(),
  ]);

  return (
    <div className="min-h-screen">
      <Hero product={product} content={homepageContent} />
      
      {justine && (
        <MeetJustine author={justine} />
      )}
      
      {product && (
        <ProductShowcase product={product} />
      )}

      <WhoItsFor content={homepageContent} />
      
      {roadmapDays.length > 0 && (
        <VisualRoadmap days={roadmapDays} content={homepageContent} />
      )}

      <CoursePreview />
      
      {testimonials.length > 0 && (
        <TestimonialsSection testimonials={testimonials} content={homepageContent} />
      )}

      <GuaranteeSection content={homepageContent} />

      {faqs.length > 0 && (
        <FAQPreview faqs={faqs} content={homepageContent} />
      )}
      
      {blogPosts.length > 0 && (
        <BlogPreview posts={blogPosts} />
      )}
      
      <CTASection content={homepageContent} />
    </div>
  );
}