import Link from 'next/link';
import type { BlogPost } from '@/types';

interface BlogPreviewProps {
  posts: BlogPost[];
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-muted">
      <div className="container">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Latest from Our Blog
            </h2>
            <p className="text-lg text-muted-foreground">
              Expert advice and insights for better relationships
            </p>
          </div>
          <Link 
            href="/blog"
            className="btn-secondary"
          >
            View All Posts
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow duration-200">
              {post.metadata?.featured_image && (
                <Link href={`/blog/${post.slug}`}>
                  <img 
                    src={`${post.metadata.featured_image.imgix_url}?w=400&h=240&fit=crop&auto=format,compress`}
                    alt={post.metadata?.title || post.title}
                    width="400"
                    height="240"
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-200"
                  />
                </Link>
              )}
              
              <div className="p-6">
                <div className="flex items-center mb-3 text-sm text-muted-foreground">
                  {post.metadata?.author && (
                    <span>By {post.metadata.author.metadata?.name || post.metadata.author.title}</span>
                  )}
                  {post.metadata?.read_time && (
                    <span className="ml-auto">{post.metadata.read_time} min read</span>
                  )}
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3 line-clamp-2">
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="hover:text-accent-orange transition-colors duration-200"
                  >
                    {post.metadata?.title || post.title}
                  </Link>
                </h3>
                
                {post.metadata?.excerpt && (
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.metadata.excerpt}
                  </p>
                )}
                
                <Link 
                  href={`/blog/${post.slug}`}
                  className="text-accent-orange font-medium hover:text-accent-orange/80 transition-colors duration-200"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}