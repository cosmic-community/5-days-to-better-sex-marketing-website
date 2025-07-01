import type { Testimonial, HomepageContent } from '@/types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  content: HomepageContent | null;
}

export default function TestimonialsSection({ testimonials, content }: TestimonialsSectionProps) {
  if (testimonials.length === 0) {
    return null;
  }

  const testimonialsContent = content?.metadata?.testimonials_section;

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {testimonialsContent?.heading || "Real Stories from Real Couples"}
          </h2>
          <p className="text-lg text-muted-foreground">
            {testimonialsContent?.subheading || "See how our program has transformed relationships just like yours"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-muted rounded-xl p-6 border border-border">
              <div className="flex items-center mb-4">
                {testimonial.metadata?.star_rating && (
                  <div className="flex text-accent-orange mr-3">
                    {Array.from({ length: testimonial.metadata.star_rating }, (_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </div>
                )}
              </div>
              
              <blockquote className="text-foreground mb-4 leading-relaxed">
                "{testimonial.metadata?.quote}"
              </blockquote>
              
              <div className="flex items-center">
                {testimonial.metadata?.image && (
                  <img 
                    src={`${testimonial.metadata.image.imgix_url}?w=48&h=48&fit=crop&auto=format,compress`}
                    alt={testimonial.metadata?.name || 'Customer'}
                    width="48"
                    height="48"
                    className="rounded-full mr-3"
                  />
                )}
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.metadata?.name}
                  </div>
                  {testimonial.metadata?.relationship_context && (
                    <div className="text-sm text-muted-foreground">
                      {testimonial.metadata.relationship_context}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}