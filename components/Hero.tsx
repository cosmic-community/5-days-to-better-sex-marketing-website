import Link from 'next/link';
import type { Product } from '@/types';

interface HeroProps {
  product: Product | null;
}

export default function Hero({ product }: HeroProps) {
  return (
    <section className="bg-gradient-to-br from-primary/50 to-muted py-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Transform Your{' '}
              <span className="text-gradient">
                Intimate Relationship
              </span>{' '}
              in Just 5 Days
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Expert-guided lessons, exercises, and proven techniques from certified sex 
              therapists to help you build deeper intimacy and better communication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href={product?.metadata?.buy_now_link || '#course'}
                className="btn-primary text-center"
              >
                {product?.metadata?.cta_copy || 'Start Your Journey'}
              </Link>
              <Link 
                href="#learn-more"
                className="btn-secondary text-center"
              >
                Learn More
              </Link>
            </div>
            <div className="mt-8 flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <span className="text-accent-orange mr-2">✓</span>
                Expert-designed curriculum
              </div>
              <div className="flex items-center">
                <span className="text-accent-orange mr-2">✓</span>
                Privacy-focused approach
              </div>
              <div className="flex items-center">
                <span className="text-accent-orange mr-2">✓</span>
                Inclusive for all couples
              </div>
            </div>
          </div>
          
          <div className="relative">
            {product?.metadata?.featured_image ? (
              <img 
                src={`${product.metadata.featured_image.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
                alt={product.metadata?.name || 'Course Image'}
                width="600"
                height="600"
                className="rounded-2xl shadow-2xl"
              />
            ) : (
              <div className="w-full h-96 bg-gradient-to-br from-accent-orange/20 to-accent-green/20 rounded-2xl flex items-center justify-center">
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
              <div className="flex items-center space-x-2">
                <div className="flex text-accent-orange">
                  ⭐⭐⭐⭐⭐
                </div>
                <span className="text-sm font-medium">4.9/5 from 2,000+ couples</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}