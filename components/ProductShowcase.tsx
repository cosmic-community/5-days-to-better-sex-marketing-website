import Link from 'next/link';
import type { Product } from '@/types';

interface ProductShowcaseProps {
  product: Product;
}

export default function ProductShowcase({ product }: ProductShowcaseProps) {
  const whatsIncluded = product.metadata?.whats_included || [];
  const benefits = product.metadata?.benefits || [];

  return (
    <section id="learn-more" className="py-20 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {product.metadata?.name || 'What You\'ll Get'}
          </h2>
          {product.metadata?.description && (
            <div 
              className="text-lg text-muted-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product.metadata.description }}
            />
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8">What's Included</h3>
            <div className="space-y-6">
              {whatsIncluded.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-accent-orange rounded-full flex items-center justify-center mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{item.item}</h4>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8">Benefits You'll Experience</h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <span className="text-accent-green text-lg">🌟</span>
                  <p className="text-muted-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-accent-orange/10 to-accent-green/10 rounded-2xl p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-4xl font-bold text-foreground mb-2">
              {product.metadata?.price || '$97'}
            </div>
            <p className="text-muted-foreground mb-6">
              One-time payment • Lifetime access • 30-day money-back guarantee
            </p>
            <Link 
              href={product.metadata?.buy_now_link || '#'}
              className="btn-primary inline-block"
              target="_blank"
              rel="noopener noreferrer"
            >
              {product.metadata?.cta_copy || 'Start Your Journey Today'}
            </Link>
            <p className="text-sm text-muted-foreground mt-4">
              Secure checkout powered by Kajabi
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}