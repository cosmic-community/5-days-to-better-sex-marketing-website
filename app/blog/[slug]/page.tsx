// app/blog/[slug]/page.tsx
import { cosmic, hasStatus } from '@/lib/cosmic';
import type { BlogPost } from '@/types';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'blog-posts',
      slug: slug
    }).depth(1);
    return response.object as BlogPost;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.metadata?.seo_title || post.metadata?.title || post.title,
    description: post.metadata?.meta_description || post.metadata?.excerpt || 'Read this blog post on relationships and intimacy.',
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const publishedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <article className="py-20 bg-white">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link 
              href="/blog"
              className="text-accent-orange hover:text-accent-orange/80 transition-colors duration-200 mb-6 inline-block"
            >
              ← Back to Blog
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {post.metadata?.title || post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8">
              {post.metadata?.author && (
                <div className="flex items-center">
                  {post.metadata.author.metadata?.image && (
                    <img 
                      src={`${post.metadata.author.metadata.image.imgix_url}?w=40&h=40&fit=crop&auto=format,compress`}
                      alt={post.metadata.author.metadata?.name || post.metadata.author.title}
                      width="40"
                      height="40"
                      className="rounded-full mr-3"
                    />
                  )}
                  <span>By {post.metadata.author.metadata?.name || post.metadata.author.title}</span>
                </div>
              )}
              <span>•</span>
              <span>{publishedDate}</span>
              {post.metadata?.read_time && (
                <>
                  <span>•</span>
                  <span>{post.metadata.read_time} min read</span>
                </>
              )}
            </div>
            
            {post.metadata?.tags && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.metadata.tags.split(',').map((tag, index) => (
                  <span key={index} className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>

          {post.metadata?.featured_image && (
            <div className="mb-12">
              <img 
                src={`${post.metadata.featured_image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
                alt={post.metadata?.title || post.title}
                width="800"
                height="400"
                className="w-full rounded-xl shadow-lg"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            {post.metadata?.content && (
              <div dangerouslySetInnerHTML={{ __html: post.metadata.content }} />
            )}
          </div>

          {post.metadata?.author && (
            <div className="mt-16 p-8 bg-muted rounded-xl">
              <h3 className="text-xl font-semibold text-foreground mb-4">About the Author</h3>
              <div className="flex items-start space-x-4">
                {post.metadata.author.metadata?.image && (
                  <img 
                    src={`${post.metadata.author.metadata.image.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                    alt={post.metadata.author.metadata?.name || post.metadata.author.title}
                    width="80"
                    height="80"
                    className="rounded-full"
                  />
                )}
                <div>
                  <h4 className="font-semibold text-foreground">
                    {post.metadata.author.metadata?.name || post.metadata.author.title}
                  </h4>
                  {post.metadata.author.metadata?.title && (
                    <p className="text-accent-orange font-medium mb-2">
                      {post.metadata.author.metadata.title}
                    </p>
                  )}
                  {post.metadata.author.metadata?.bio && (
                    <div 
                      className="text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: post.metadata.author.metadata.bio }}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}