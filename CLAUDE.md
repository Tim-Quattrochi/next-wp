# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands
- `npm run dev` - Start development server with turbo mode
- `npm run build` - Build for production
- `npm run start` - Start production server  
- `npm run lint` - Run ESLint to check code quality

## Architecture Overview

This is a headless WordPress starter using Next.js 15 App Router with TypeScript. Key architectural patterns:

### Data Layer
- All WordPress API interactions go through `lib/wordpress.ts`
- Type definitions in `lib/wordpress.d.ts` define Post, Page, Category, Tag, Author, Media interfaces
- Error handling uses custom `WordPressAPIError` class
- Functions use Next.js cache tags for granular revalidation (e.g., `tags: ['posts', `post-${slug}`]`)

### Routing Structure
- Dynamic routes: `/posts/[slug]`, `/pages/[slug]`
- Archive pages: `/posts`, `/posts/authors`, `/posts/categories`, `/posts/tags`
- API routes: `/api/revalidate` (webhook), `/api/og` (OG images)

### Component Patterns
- Server Components for data fetching with parallel `Promise.all()` calls
- URL-based state management for search and filters
- Debounced search (300ms) with `useSearchParams`
- Pagination with 9 posts per page default

### Revalidation System
- WordPress plugin sends webhooks on content changes
- Next.js endpoint validates webhook secret and calls `revalidateTag()`
- Default cache duration: 1 hour (`revalidate: 3600`)

## Code Style

### TypeScript
- Use strict typing with interfaces defined in `lib/wordpress.d.ts`
- Prefer type annotations over type assertions
- Use type inference when the type is obvious

### Naming Conventions
- React components: PascalCase (e.g., `PostCard.tsx`)
- Functions and variables: camelCase
- Types and interfaces: PascalCase
- Constants: UPPERCASE_SNAKE_CASE for true constants

### File Structure
- Page components: `/app/**/*.tsx`
- Reusable UI components: `/components/**/*.tsx`  
- API and utility functions: `/lib/**/*.ts`
- WordPress data functions must use cache tags for proper revalidation

### Error Handling
- Use `try/catch` blocks for API calls
- Utilize `WordPressAPIError` class for consistent API error handling

## Environment Variables
Required environment variables (see `.env.example`):
- `WORDPRESS_URL` - Full URL of WordPress site
- `WORDPRESS_HOSTNAME` - Domain for image optimization
- `WORDPRESS_WEBHOOK_SECRET` - Secret for webhook validation

## Key Dependencies
- Next.js 15.3.4 with React 19.1.0
- TypeScript 5.8.3 with strict mode
- Tailwind CSS with shadcn/ui components and craft-ds design system
- React Hook Form with Zod validation
- Google Genkit for AI integration (`@genkit-ai/flow`, `@genkit-ai/googleai`, `@genkit-ai/next`)
- Lucide React for icons

## AI Integration Architecture
- Google Genkit flows in `/genkit/` and `/src/genkit/` directories
- AI-powered menu suggestions and client recommendations
- API routes at `/api/ai/test/` for AI functionality
- Configuration in `genkit.config.ts`

## Advanced Data Patterns
### Pagination System
- Server-side pagination via `getPostsPaginated()` function
- Returns both data and pagination metadata (`total`, `totalPages`)
- Optimized for large content sets without fetching all posts

### Cache Tag Hierarchy
- Global: `wordpress`
- Content type: `posts`, `categories`, `tags`, `authors`  
- Individual: `post-123`, `category-456`
- Query-specific: `posts-page-1`, `posts-category-123`

### Search & Filtering
- Debounced search (300ms) with `use-debounce`
- URL-based state management with `useSearchParams`
- Server-side filtering across posts, authors, categories, tags
- Combines search with existing category/tag/author filters

## Configuration Files
- `site.config.ts` - Site metadata and domain configuration
- `menu.config.ts` - Navigation menu definitions
- `next.config.ts` - Image optimization and redirects
- `genkit.config.ts` - Google AI integration setup