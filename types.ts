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

// Site Settings interface
interface SiteSettings extends CosmicObject {
  type_slug: 'site-settings';
  metadata: {
    site_name?: string;
    logo?: {
      url: string;
      imgix_url: string;
    };
    footer_copyright?: string;
    tagline?: string;
    description?: string;
    primary_color?: string;
    secondary_color?: string;
    accent_color?: string;
    contact_email?: string;
    contact_phone?: string;
    social_links?: {
      instagram?: string;
      twitter?: string;
      facebook?: string;
      linkedin?: string;
    };
  };
}

// Homepage Content interface
interface HomepageContent extends CosmicObject {
  type_slug: 'homepage-content';
  metadata: {
    hero_section?: {
      badge_text: string;
      main_heading: string;
      subheading: string;
      learn_more_text: string;
      features: Array<{
        icon: string;
        text: string;
      }>;
      review_badge: {
        rating: string;
        text: string;
      };
    };
    who_its_for?: {
      heading: string;
      subheading: string;
      description: string;
      audiences: Array<{
        icon: string;
        title: string;
        description: string;
      }>;
      not_sure_section: {
        heading: string;
        description: string;
      };
    };
    roadmap_section?: {
      heading: string;
      subheading: string;
    };
    testimonials_section?: {
      heading: string;
      subheading: string;
    };
    guarantee_section?: {
      heading: string;
      subheading: string;
      guarantees: Array<{
        icon: string;
        title: string;
        description: string;
      }>;
      testimonial_quotes_heading: string;
      testimonial_quotes: Array<{
        quote: string;
        name: string;
        context: string;
      }>;
      ready_section: {
        heading: string;
        description: string;
        button_text: string;
        contact_text: string;
        contact_email: string;
      };
    };
    faq_section?: {
      heading: string;
      subheading: string;
      more_questions: {
        heading: string;
        description: string;
        view_all_text: string;
        ask_question_text: string;
        contact_email: string;
      };
      default_faqs: Array<{
        question: string;
        answer: string;
      }>;
    };
    cta_section?: {
      heading: string;
      subheading: string;
      stats: Array<{
        number: string;
        label: string;
      }>;
      primary_button: {
        text: string;
        link: string;
      };
      secondary_button: {
        text: string;
        link: string;
      };
      guarantee_text: string;
      security_text: string;
    };
  };
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
interface CosmicResponse<T extends CosmicObject> {
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

function isSiteSettings(obj: CosmicObject): obj is SiteSettings {
  return obj.type_slug === 'site-settings';
}

function isHomepageContent(obj: CosmicObject): obj is HomepageContent {
  return obj.type_slug === 'homepage-content';
}

// Utility types with proper constraints
type OptionalMetadata<T extends CosmicObject> = Partial<T['metadata']>;

// Helper function to safely access metadata with proper type constraints
function getMetadataProperty<T extends CosmicObject, K extends keyof T['metadata']>(
  obj: T,
  key: K
): T['metadata'][K] | undefined {
  if (obj.metadata && typeof obj.metadata === 'object') {
    return obj.metadata[key as string];
  }
  return undefined;
}

export type {
  CosmicObject,
  SiteSettings,
  HomepageContent,
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
  isPage,
  isSiteSettings,
  isHomepageContent,
  getMetadataProperty
};