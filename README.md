<!-- README_START -->
# 5 Days to Better Sex - Marketing Website

A modern, responsive marketing website for Hello Love Co.'s flagship program "5 Days to Better Sex." This site is designed to market and sell the program, showcase its benefits, and publish blog content to drive SEO and trust. The design feels human, modern, sex-positive, inclusive, and clean.

## Features

- **Responsive Design**: Mobile-first approach with modern, clean aesthetics
- **Content Management**: Full CMS integration with Cosmic for all content types
- **SEO Optimized**: Built-in SEO fields and meta tag management
- **Blog System**: Complete blog with author profiles and tagging
- **Product Showcase**: Dedicated sections for the course with visual roadmap
- **Social Proof**: Testimonials and reviews integration
- **Lead Capture**: Strategic CTA placement throughout the site
- **Performance**: Optimized images with imgix and fast loading

## Clone this Bucket

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket to get started instantly:

[![Clone this Bucket](https://img.shields.io/badge/Clone%20this%20Bucket-4F46E5?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=hi-love-production)

## Original Prompt

This application was built based on the following request:

> Build a modern, responsive marketing website for "5 Days to Better Sex," the flagship product of Hello Love Co. The site is not for course delivery but to market and sell the program, showcase its benefits, and publish blog content to drive SEO and trust. We'll use Kajabi to host the actual course, but this site should capture leads and sell the product. The design should feel human, modern, sex-positive, inclusive, clean, and inspired by sites like BetterHelp or Modern Fertility.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom theme
- **Content Management**: Cosmic CMS
- **TypeScript**: Full type safety throughout
- **Deployment**: Vercel-ready with environment variables
- **Image Optimization**: imgix integration

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with content bucket

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Create your environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Add your Cosmic credentials to `.env.local`:
   ```
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

5. Run the development server:
   ```bash
   bun dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching Blog Posts with Authors
```typescript
import { cosmic } from '@/lib/cosmic'

const posts = await cosmic.objects
  .find({ type: 'blog-posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1) // Include author data
```

### Getting Product Information
```typescript
const product = await cosmic.objects
  .findOne({ type: 'product', slug: 'product' })
  .props(['id', 'title', 'metadata'])
```

## Cosmic CMS Integration

This application integrates with [Cosmic](https://www.cosmicjs.com) to manage all content. The content model includes:

- **Pages**: Homepage, About, Contact with modular sections
- **Blog Posts**: SEO-optimized articles with author relationships
- **Product**: Course information and pricing
- **Testimonials**: Customer reviews and social proof
- **Authors**: Blog post authors with bios and credentials
- **Navigation**: Flexible navigation management
- **CTAs**: Reusable call-to-action blocks
- **FAQs**: Frequently asked questions
- **Visual Roadmap**: 5-day journey timeline

For detailed API documentation, visit the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically

### Environment Variables for Production
Set these in your hosting platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

The site includes pre-build type checking to prevent deployment failures.
<!-- README_END -->