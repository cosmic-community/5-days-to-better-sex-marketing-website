import Link from 'next/link';
import type { HomepageContent } from '@/types';

interface CTASectionProps {
  content: HomepageContent | null;
}

export default function CTASection({ content }: CTASectionProps) {
  const ctaContent = content?.metadata?.cta_section;
  
  const defaultStats = [
    {
      number: "2,000+",
      label: "Couples Transformed"
    },
    {
      number: "4.9★",
      label: "Average Rating"
    },
    {
      number: "30-Day",
      label: "Money-Back Guarantee"
    }
  ];

  const stats = ctaContent?.stats || defaultStats;

  return (
    <section className="py-20 bg-gradient-to-r from-accent-orange to-accent-green relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {ctaContent?.heading || "Love Better. Feel Closer. Start Here."}
          </h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            {ctaContent?.subheading || "Join thousands of couples who have already discovered the joy of deeper intimacy. Your journey to better connection starts today."}
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl font-bold mb-2">{stat.number}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link 
              href={ctaContent?.primary_button?.link || "#course"}
              className="bg-white text-accent-orange px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200 hover:scale-105 shadow-lg"
            >
              {ctaContent?.primary_button?.text || "🚀 Start Your 5-Day Journey"}
            </Link>
            <Link 
              href={ctaContent?.secondary_button?.link || "/faq"}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-accent-orange transition-all duration-200"
            >
              {ctaContent?.secondary_button?.text || "💭 Have Questions?"}
            </Link>
          </div>
          
          <div className="text-center space-y-2">
            <p className="text-sm opacity-75">
              {ctaContent?.guarantee_text || "✓ 30-day money-back guarantee • ✓ Secure checkout • ✓ Privacy protected"}
            </p>
            <p className="text-xs opacity-60">
              {ctaContent?.security_text || "Secure payment processing by Kajabi • SSL encrypted"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}