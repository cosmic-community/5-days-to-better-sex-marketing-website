// app/testimonials/page.tsx
import { cosmic, hasStatus } from '@/lib/cosmic';
import type { Metadata } from 'next';

interface TestimonialMetadata {
  quote: string;
  name: string;
  image?: {
    url: string;
    imgix_url: string;
  };
  relationship_context?: string;
  featured: boolean;
  star_rating?: number;
}

interface Testimonial {
  id: string;
  slug: string;
  title: string;
  metadata: TestimonialMetadata;
}

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'testimonials' })
      .props(['id', 'title', 'slug', 'metadata'])
      .sort('-metadata.star_rating,title')
      .depth(1);
    return response.objects as Testimonial[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw error;
  }
}

export const metadata: Metadata = {
  title: 'Testimonials | Hi Love',
  description: 'Read what couples are saying about the 5 Days to Better Sex course. Real stories from real people who transformed their relationships.',
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { metadata } = testimonial;
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      {/* Star Rating */}
      {metadata.star_rating && (
        <div className="mb-4">
          <StarRating rating={metadata.star_rating} />
        </div>
      )}
      
      {/* Quote */}
      <blockquote className="text-gray-700 text-lg leading-relaxed mb-6">
        "{metadata.quote}"
      </blockquote>
      
      {/* Author Info */}
      <div className="flex items-center space-x-4">
        {metadata.image?.imgix_url && (
          <img
            src={`${metadata.image.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
            alt={metadata.name}
            width="60"
            height="60"
            className="rounded-full object-cover"
          />
        )}
        <div>
          <div className="font-semibold text-gray-900 text-lg">
            {metadata.name}
          </div>
          {metadata.relationship_context && (
            <div className="text-gray-600">
              {metadata.relationship_context}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  // Separate featured and regular testimonials
  const featuredTestimonials = testimonials.filter(t => t.metadata.featured);
  const regularTestimonials = testimonials.filter(t => !t.metadata.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/50 to-muted py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-orange/5 to-accent-green/5"></div>
        
        <div className="container relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            What Couples Are Saying
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto">
            Real stories from real people who transformed their relationships with our 5-day course
          </p>
        </div>
      </section>

      {/* Featured Testimonials */}
      {featuredTestimonials.length > 0 && (
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Featured Stories
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTestimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Testimonials */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            {featuredTestimonials.length > 0 ? 'More Success Stories' : 'Success Stories'}
          </h2>
          
          {testimonials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No testimonials available at the moment. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(featuredTestimonials.length > 0 ? regularTestimonials : testimonials).map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-accent-orange to-accent-green">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Write Your Own Success Story?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of couples who have already transformed their relationships with our proven 5-day course.
          </p>
          <a
            href="#course"
            className="inline-flex items-center px-8 py-4 bg-white text-accent-orange font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            Start Your Journey Today
          </a>
        </div>
      </section>
    </div>
  );
}