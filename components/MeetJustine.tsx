// components/MeetJustine.tsx
import type { Author } from '@/types';

interface MeetJustineProps {
  author: Author;
}

export default function MeetJustine({ author }: MeetJustineProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-accent-green/10 to-accent-orange/10">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="mb-6">
                <span className="text-accent-orange font-semibold text-sm uppercase tracking-wide">
                  Meet Your Guide
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
                  {author.metadata?.name}
                </h2>
                <p className="text-lg text-accent-green font-medium">
                  {author.metadata?.title}
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg mb-8">
                <blockquote className="text-xl text-foreground font-medium italic leading-relaxed">
                  "Great sex isn't about being perfect. It's about feeling close, curious, and real together."
                </blockquote>
              </div>

              {author.metadata?.bio && (
                <div 
                  className="text-muted-foreground leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{ __html: author.metadata.bio }}
                />
              )}

              {author.metadata?.credentials && (
                <div className="mt-6 p-4 bg-white/50 rounded-lg border border-accent-orange/20">
                  <h4 className="font-semibold text-foreground mb-2">Credentials</h4>
                  <p className="text-sm text-muted-foreground">{author.metadata.credentials}</p>
                </div>
              )}

              {author.metadata?.social_links && (
                <div className="mt-6 flex space-x-4">
                  {author.metadata.social_links.instagram && (
                    <a 
                      href={`https://instagram.com/${author.metadata.social_links.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-orange hover:text-accent-orange/80 transition-colors"
                    >
                      📷 Instagram
                    </a>
                  )}
                  {author.metadata.social_links.linkedin && (
                    <a 
                      href={`https://linkedin.com/in/${author.metadata.social_links.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-orange hover:text-accent-orange/80 transition-colors"
                    >
                      💼 LinkedIn
                    </a>
                  )}
                  {author.metadata.website && (
                    <a 
                      href={author.metadata.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-orange hover:text-accent-orange/80 transition-colors"
                    >
                      🌐 Website
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className="order-1 lg:order-2">
              {author.metadata?.image ? (
                <div className="relative">
                  <img 
                    src={`${author.metadata.image.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
                    alt={author.metadata?.name || 'Justine'}
                    width="600"
                    height="600"
                    className="rounded-2xl shadow-2xl w-full"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 border border-border">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent-orange">10,000+</div>
                      <div className="text-sm text-muted-foreground">Clinical Hours</div>
                    </div>
                  </div>
                  <div className="absolute -top-6 -right-6 bg-accent-green text-white rounded-lg shadow-lg p-4">
                    <div className="text-center">
                      <div className="text-lg font-bold">AASECT</div>
                      <div className="text-xs">Certified</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-96 bg-gradient-to-br from-accent-orange/20 to-accent-green/20 rounded-2xl flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">👩‍⚕️</div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {author.metadata?.name}
                    </h3>
                    <p className="text-muted-foreground mt-2">
                      Your Expert Guide
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}