import type { HomepageContent } from '@/types';

interface GuaranteeSectionProps {
  content: HomepageContent | null;
}

export default function GuaranteeSection({ content }: GuaranteeSectionProps) {
  const guaranteeContent = content?.metadata?.guarantee_section;
  
  const defaultGuarantees = [
    {
      icon: "💰",
      title: "30-Day Money-Back Guarantee",
      description: "If you don't feel more connected after completing the course, we'll refund every penny. No questions asked."
    },
    {
      icon: "🔒",
      title: "Privacy Protected",
      description: "Your information is completely secure. We never share your data, and all materials are accessed privately."
    },
    {
      icon: "♾️",
      title: "Lifetime Access",
      description: "Access your course materials forever. Relationships evolve, and you can revisit the content anytime."
    },
    {
      icon: "👥",
      title: "Inclusive & Judgment-Free",
      description: "Designed for all couples, regardless of age, gender, orientation, or relationship history."
    }
  ];

  const defaultTestimonialQuotes = [
    {
      quote: "I was honestly skeptical at first, but this course completely changed how my partner and I connect.",
      name: "Sarah M.",
      context: "Married 8 years"
    },
    {
      quote: "We almost didn't try it because we thought our relationship was 'fine.' Best decision we ever made.",
      name: "Alex & Jordan",
      context: "Together 3 years"
    },
    {
      quote: "I never thought we could feel this close again after having kids. This course gave us our spark back.",
      name: "Maria L.",
      context: "Parent of two"
    }
  ];

  const guarantees = guaranteeContent?.guarantees || defaultGuarantees;
  const testimonialQuotes = guaranteeContent?.testimonial_quotes || defaultTestimonialQuotes;

  return (
    <section className="py-20 bg-gradient-to-br from-accent-green/5 to-accent-orange/5">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {guaranteeContent?.heading || "Your Investment Is Protected"}
          </h2>
          <p className="text-lg text-muted-foreground">
            {guaranteeContent?.subheading || "We're so confident in this course that we guarantee your satisfaction. Here's why thousands of couples trust us:"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {guarantees.map((guarantee, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-border shadow-sm">
              <div className="text-3xl mb-4">{guarantee.icon}</div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {guarantee.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {guarantee.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 border border-border shadow-lg">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            {guaranteeContent?.testimonial_quotes_heading || "\"I Was Skeptical, But...\""}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonialQuotes.map((testimonial, index) => (
              <div key={index} className="text-center">
                <blockquote className="text-foreground italic mb-4 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="text-sm">
                  <div className="font-semibold text-accent-orange">{testimonial.name}</div>
                  <div className="text-muted-foreground">{testimonial.context}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-accent-orange/10 to-accent-green/10 rounded-xl p-8 max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-foreground mb-4">
              {guaranteeContent?.ready_section?.heading || "Ready to Take the First Step?"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {guaranteeContent?.ready_section?.description || "If you don't feel more connected in 5 days, email us and we'll make it right. That's our promise to you."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                {guaranteeContent?.ready_section?.button_text || "Start Your Journey Today"}
              </button>
              <a href={`mailto:${guaranteeContent?.ready_section?.contact_email || 'support@hilove.co'}`} className="btn-secondary">
                {guaranteeContent?.ready_section?.contact_text || "Questions? Contact Support"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}