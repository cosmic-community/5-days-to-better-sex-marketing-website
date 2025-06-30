// components/Hero.tsx
import Link from 'next/link';
import type { Product } from '@/types';

interface HeroProps {
  product: Product | null;
}

export default function Hero({ product }: HeroProps) {
  return (
    <section className="bg-gradient-to-br from-primary/50 to-muted py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-accent-orange/5 to-accent-green/5"></div>
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-4">
              <span className="inline-block bg-accent-orange/10 text-accent-orange px-4 py-2 rounded-full text-sm font-semibold">
                ✨ Transform Your Relationship in 5 Days
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Transform Your{' '}
              <span className="bg-gradient-to-r from-accent-orange to-accent-green bg-clip-text text-transparent">
                Intimate Relationship
              </span>{' '}
              in Just 5 Days
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Expert-guided lessons, exercises, and proven techniques from certified sex 
              therapists to help you build deeper intimacy and better communication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link 
                href={product?.metadata?.buy_now_link || '#course'}
                className="btn-primary text-center group"
              >
                <span className="mr-2">🚀</span>
                {product?.metadata?.cta_copy || 'Start Your Journey'}
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link 
                href="#learn-more"
                className="btn-secondary text-center"
              >
                Learn More
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-accent-orange text-lg">✓</span>
                <span className="text-muted-foreground">Expert-designed curriculum</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-accent-orange text-lg">✓</span>
                <span className="text-muted-foreground">Privacy-focused approach</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-accent-orange text-lg">✓</span>
                <span className="text-muted-foreground">Inclusive for all couples</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            {product?.metadata?.featured_image ? (
              <img 
                src={`${product.metadata.featured_image.imgix_url}?w=1200&h=800&fit=crop&auto=format,compress`}
                alt={product.metadata?.name || 'Course Image'}
                width="600"
                height="400"
                className="rounded-2xl shadow-2xl w-full"
              />
            ) : (
              <div className="w-full h-96 bg-gradient-to-br from-accent-orange/20 to-accent-green/20 rounded-2xl flex items-center justify-center shadow-2xl">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">💕</div>
                  <h3 className="text-xl font-semibold text-foreground">
                    5 Days to Better Sex
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    Transform your relationship
                  </p>
                </div>
              </div>
            )}
            
            <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 border border-border">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-accent-orange mb-1">
                  ⭐⭐⭐⭐⭐
                </div>
                <div className="text-sm font-medium text-foreground">4.9/5 from 2,000+ couples</div>
              </div>
            </div>

            <div className="absolute -top-6 -left-6 bg-accent-green text-white rounded-lg shadow-lg p-3">
              <div className="text-center">
                <div className="font-bold text-lg">$97</div>
                <div className="text-xs opacity-90">One-time payment</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}