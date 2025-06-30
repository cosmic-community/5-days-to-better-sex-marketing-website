// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type_slug: string;
  created_at: string;
  modified_at: string;
}

// Product interface (singleton)
interface Product extends CosmicObject {
  type_slug: 'product';
  metadata: {
    name?: string;
    description?: string;
    whats_included?: Array<{
      item: string;
      description: string;
    }>;
    price?: string;
    buy_now_link?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    cta_copy?: string;
    benefits?: string[];
  };
}

// CTA Block interface
interface CTABlock extends CosmicObject {
  type_slug: 'cta-blocks';
  metadata: {
    heading?: string;
    subheading?: string;
    button_text?: string;
    button_url?: string;
    background_image?: {
      url: string;
      imgix_url: string;
    };
    background_color?: string;
    name?: string;
  };
}

// Page interface
interface Page extends CosmicObject {
  type_slug: 'pages';
  metadata: {
    title?: string;
    content?: string;
    hero_section?: {
      heading: string;
      subheading: string;
      cta_text: string;
      cta_url: string;
      background_image: string;
      show_hero: boolean;
    };
    seo_title?: string;
    meta_description?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

// FAQ interface
interface FAQ extends CosmicObject {
  type_slug: 'faqs';
  metadata: {
    question?: string;
    answer?: string;
    category?: 'general' | 'course' | 'technical' | 'billing';
    order?: number;
    featured?: boolean;
  };
}

// Navigation interface
interface NavigationItem extends CosmicObject {
  type_slug: 'navigation';
  metadata: {
    label?: string;
    url?: string;
    link_type?: 'internal' | 'external';
    navigation_group?: 'header' | 'footer' | 'legal';
    order?: number;
  };
}

// Visual Roadmap interface
interface RoadmapDay extends CosmicObject {
  type_slug: 'visual-roadmap';
  metadata: {
    day_number?: number;
    title?: string;
    summary?: string;
    icon?: string;
    image?: {
      url: string;
      imgix_url: string;
    };
    key_takeaway?: string;
  };
}

// Author interface
interface Author extends CosmicObject {
  type_slug: 'authors';
  metadata: {
    name?: string;
    bio?: string;
    image?: {
      url: string;
      imgix_url: string;
    };
    title?: string;
    credentials?: string;
    website?: string;
    social_links?: {
      instagram?: string;
      twitter?: string;
      linkedin?: string;
    };
  };
}

// Blog Post interface
interface BlogPost extends CosmicObject {
  type_slug: 'blog-posts';
  metadata: {
    title?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    author?: Author;
    content?: string;
    excerpt?: string;
    tags?: string;
    seo_title?: string;
    meta_description?: string;
    read_time?: number;
  };
}

// Testimonial interface
interface Testimonial extends CosmicObject {
  type_slug: 'testimonials';
  metadata: {
    quote?: string;
    name?: string;
    image?: {
      url: string;
      imgix_url: string;
    };
    relationship_context?: string;
    featured?: boolean;
    star_rating?: number;
  };
}

// API response types
interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards for runtime validation
function isProduct(obj: CosmicObject): obj is Product {
  return obj.type_slug === 'product';
}

function isBlogPost(obj: CosmicObject): obj is BlogPost {
  return obj.type_slug === 'blog-posts';
}

function isTestimonial(obj: CosmicObject): obj is Testimonial {
  return obj.type_slug === 'testimonials';
}

function isPage(obj: CosmicObject): obj is Page {
  return obj.type_slug === 'pages';
}

// Utility types
type OptionalMetadata<T> = Partial<T['metadata']>;

export type {
  CosmicObject,
  Product,
  CTABlock,
  Page,
  FAQ,
  NavigationItem,
  RoadmapDay,
  Author,
  BlogPost,
  Testimonial,
  CosmicResponse,
  OptionalMetadata
};

export {
  isProduct,
  isBlogPost,
  isTestimonial,
  isPage
};