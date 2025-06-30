import { cosmic, hasStatus } from '@/lib/cosmic';
import type { BlogPost } from '@/types';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | 5 Days to Better Sex',
  description: 'Expert advice and insights for better relationships, intimacy, and communication.',
};

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'blog-posts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('-created_at');
    return response.objects as BlogPost[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw error;
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="py-20 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Relationship & Intimacy Blog
          </h1>
          <p className="text-xl text-muted-foreground">
            Expert advice and insights for better relationships, communication, and intimacy
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              No posts yet
            </h2>
            <p className="text-muted-foreground">
              Check back soon for expert relationship advice and insights.
            </p>
          </div>
        ) : (
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
                  
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="hover:text-accent-orange transition-colors duration-200"
                    >
                      {post.metadata?.title || post.title}
                    </Link>
                  </h2>
                  
                  {post.metadata?.excerpt && (
                    <p className="text-muted-foreground mb-4">
                      {post.metadata.excerpt}
                    </p>
                  )}
                  
                  {post.metadata?.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.metadata.tags.split(',').map((tag, index) => (
                        <span key={index} className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
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
        )}
      </div>
    </div>
  );
}