# SEO Configuration Guide

This Astro project implements a centralized, type-safe SEO system that supports both global configuration and per-page overrides. All SEO metadata is handled server-side during build and server rendering for optimal search engine indexing.

## Architecture Overview

The SEO system consists of:

1. **Global Configuration** (`src/config/seo.ts`) — Site-wide defaults
2. **Base Layout** (`src/layouts/BaseLayout.astro`) — Renders all meta tags
3. **Page-Level Overrides** — Individual pages can override any global setting

---

## Global SEO Configuration

All site-wide SEO settings are defined in `src/config/seo.ts`:

```typescript
export const seoConfig = {
  siteName: 'Gilets Jaunes 2026',
  title: 'Gilets Jaunes 2026 — Le peuple reprend la parole',
  description: 'Rejoignez le mouvement citoyen Gilets Jaunes 2026. Découvrez notre manifeste et soutenez nos revendications.',
  keywords: ['Gilets Jaunes 2026', 'mouvement citoyen', 'manifeste', 'revendications', 'RIC', 'démocratie'],
  locale: 'fr_FR',
  image: '/og-image.svg',
} as const;
```

### Global Configuration Fields

| Field | Purpose | Example |
|-------|---------|---------|
| `siteName` | Your website or organization name | `'Gilets Jaunes 2026'` |
| `title` | Default page title (appears in browser tab) | `'Gilets Jaunes 2026 — Le peuple reprend la parole'` |
| `description` | Default meta description for search results | `'Rejoignez le mouvement citoyen...'` |
| `keywords` | Array of global keywords for the site | `['Gilets Jaunes 2026', 'mouvement citoyen', ...]` |
| `locale` | Content language and region (for Open Graph) | `'fr_FR'` |
| `image` | Default Open Graph image path | `'/og-image.svg'` |

### Updating Global SEO

Edit `src/config/seo.ts` directly to change site-wide defaults:

```typescript
export const seoConfig = {
  siteName: 'My New Site',
  title: 'My New Site — Tagline here',
  description: 'Updated description for all pages that don\'t override it.',
  keywords: ['keyword1', 'keyword2', 'keyword3'],
  locale: 'en_US',
  image: '/my-og-image.png',
} as const;
```

These values will apply to every page unless that page provides its own overrides.

---

## Per-Page SEO Configuration

Individual pages override global settings by passing props to the `BaseLayout` component.

### Page Frontmatter Type

The `PageFrontmatter` type ensures type safety for per-page SEO:

```typescript
export type PageFrontmatter = {
  title: string;
  description: string;
  keywords?: readonly string[];
  section?: string;
};
```

### Example: Homepage (`src/pages/index.astro`)

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { frontmatter } from '../content/home.md';

// Import or define frontmatter with SEO fields
const frontmatter = {
  title: 'Gilets Jaunes 2026 — Accueil',
  description: 'Rejoignez le mouvement citoyen Gilets Jaunes 2026 en 2026.',
  keywords: ['Gilets Jaunes', '2026', 'mouvement citoyen', 'manifeste', 'RIC'],
};
---

<BaseLayout 
  title={frontmatter.title} 
  description={frontmatter.description} 
  keywords={frontmatter.keywords}
>
  <!-- Page content -->
</BaseLayout>
```

### Example: RIC Page (`src/pages/ric.astro`)

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';

const title = 'Le R.I.C. — Gilets Jaunes 2026';
const description = 'Découvrez le Référendum d\'Initiative Citoyenne et les quatre formes de R.I.C. portées par Gilets Jaunes 2026.';
const keywords = ['RIC', 'Référendum d\'Initiative Citoyenne', 'démocratie', 'participation citoyenne'];
---

<BaseLayout 
  title={title} 
  description={description}
  keywords={keywords}
>
  <!-- Page content -->
</BaseLayout>
```

---

## BaseLayout Component Details

The `BaseLayout` component (`src/layouts/BaseLayout.astro`) handles all SEO meta tag rendering:

```astro
---
import { seoConfig, type PageFrontmatter } from '../config/seo';

interface Props extends Partial<PageFrontmatter> {}

const { 
  title = seoConfig.title, 
  description = seoConfig.description, 
  keywords = seoConfig.keywords 
} = Astro.props;
---

<!doctype html>
<html lang="fr">
  <head>
    <!-- Character encoding -->
    <meta charset="UTF-8" />
    
    <!-- Viewport for responsive design -->
    <meta name="viewport" content="width=device-width" />
    
    <!-- Theme color for browser UI -->
    <meta name="theme-color" content="#09090b" />
    
    <!-- Description for search results -->
    <meta name="description" content={description} />
    
    <!-- Keywords (note: less important for modern SEO, but included) -->
    <meta name="keywords" content={keywords.join(', ')} />
    
    <!-- Open Graph: Social media sharing -->
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content={seoConfig.locale} />
    
    <!-- Page title -->
    <title>{title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

### Meta Tags Rendered

| Meta Tag | Purpose | Source |
|----------|---------|--------|
| `<title>` | Browser tab title; appears in search results | Page or global |
| `<meta name="description">` | Search result snippet | Page or global |
| `<meta name="keywords">` | Search engine keywords (supplementary) | Page or global |
| `<meta property="og:title">` | Social media: post title | Page or global |
| `<meta property="og:description">` | Social media: preview text | Page or global |
| `<meta property="og:type">` | Social media: content type | Always `website` |
| `<meta property="og:locale">` | Social media: language/region | Global |
| `<meta name="viewport">` | Mobile responsiveness | Always set |
| `<meta name="theme-color">` | Browser UI color on mobile | Global |

---

## SEO Best Practices

### 1. Title Tags

- **Length**: 50–60 characters (optimal for search results)
- **Format**: `Page Topic — Site Name` (e.g., `Le R.I.C. — Gilets Jaunes 2026`)
- **Keywords**: Include your target keyword naturally in the title
- **Uniqueness**: Every page should have a unique title

**Good Examples:**
- `Gilets Jaunes 2026 — Accueil`
- `Le R.I.C. — Gilets Jaunes 2026`
- `Manifeste 2026 — Pour le retour à la République`

**Avoid:**
- Keyword stuffing: `Gilets Jaunes 2026 | RIC | Mouvement Citoyen | Démocratie | Manifeste`
- Generic titles: `Home` or `Welcome`
- Duplicate titles across pages

### 2. Meta Descriptions

- **Length**: 150–160 characters (optimal for search results)
- **Action-oriented**: Use words like "Découvrez", "Rejoignez", "Apprenez"
- **Include keywords**: Naturally incorporate your main keywords
- **Unique per page**: Write distinct descriptions for each page

**Good Examples:**
- `Rejoignez le mouvement citoyen Gilets Jaunes 2026. Découvrez notre manifeste et soutenez nos revendications.`
- `Découvrez le Référendum d'Initiative Citoyenne et les quatre formes de R.I.C. portées par Gilets Jaunes 2026.`

**Avoid:**
- Duplicate descriptions
- Keyword stuffing
- Exceeding 160 characters (will be truncated)

### 3. Keywords

- **Quantity**: 5–10 keywords per page (diminishing returns beyond that)
- **Specificity**: Balance broad terms with long-tail keywords
- **Natural language**: Keywords should reflect actual search queries
- **Relevance**: Only use keywords that match your page content

**Good Keyword Sets:**
```typescript
// Homepage
keywords: ['Gilets Jaunes 2026', 'mouvement citoyen', 'manifeste', 'revendications', 'RIC', 'démocratie']

// RIC Page
keywords: ['RIC', 'Référendum d\'Initiative Citoyenne', 'démocratie directe', 'participation citoyenne', 'engagement politique']
```

### 4. Open Graph (Social Media)

Open Graph tags control how your content appears on social media (Facebook, Twitter, LinkedIn, etc.). The system automatically includes:

- `og:title` — Page title
- `og:description` — Meta description
- `og:type` — Content type (always `website`)
- `og:locale` — Language/region

To extend with images, add to `BaseLayout`:

```astro
<meta property="og:image" content={seoConfig.image} />
<meta property="og:image:alt" content="Brief description of the image" />
```

### 5. Content Structure

- Use semantic HTML: `<h1>`, `<h2>`, `<h3>` in logical order
- **One `<h1>` per page**: Should match or align with the page title
- **Descriptive headings**: Use keywords naturally in headings
- **Internal links**: Link related pages using descriptive anchor text

---

## Step-by-Step: Adding a New Page with SEO

### 1. Create the Page File

Create `src/pages/my-page.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout 
  title="My Page Title — Gilets Jaunes 2026"
  description="A brief, keyword-rich description of this page's content."
  keywords={['keyword1', 'keyword2', 'keyword3']}
>
  <h1>My Page Title</h1>
  <!-- Page content -->
</BaseLayout>
```

### 2. Choose Your Title

- Keep it under 60 characters
- Include your main keyword
- End with your brand name

Example: `Nos Revendications — Gilets Jaunes 2026`

### 3. Write the Meta Description

- 150–160 characters
- Include keywords naturally
- Include a call-to-action if relevant

Example: `Découvrez les sept principes fondamentaux et les revendications du mouvement Gilets Jaunes 2026.`

### 4. Define Keywords

- 5–10 most relevant terms
- Mix broad and specific keywords
- Reflect actual page content

Example: `['revendications', 'principes fondamentaux', 'Gilets Jaunes 2026', 'politique', 'démocratie']`

### 5. Validate

- Use Google Search Console to preview how your page appears in search results
- Check Open Graph with [og.facebook.com](https://og.facebook.com)
- Test on mobile (viewport sizing should be correct)

---

## Advanced: Fallback Behavior

If a page does not provide a value, the system falls back to the global default:

```typescript
// In BaseLayout
const { 
  title = seoConfig.title,           // Uses global if not provided
  description = seoConfig.description, // Uses global if not provided
  keywords = seoConfig.keywords       // Uses global if not provided
} = Astro.props;
```

This means you only need to override the fields that differ from the global defaults.

**Example: Minimal Override**

If a page only needs a different title, you can omit `keywords`:

```astro
<BaseLayout 
  title="My Page — Gilets Jaunes 2026"
  description="Custom description"
  {/* keywords will use global defaults */}
>
  <!-- Content -->
</BaseLayout>
```

---

## Type Safety

The system uses TypeScript for compile-time validation. Astro will warn you if you:

- Pass unknown props to `BaseLayout`
- Use incorrect types (e.g., a string instead of an array for `keywords`)

This prevents SEO errors before deployment.

---

## Testing Your SEO

### Google Search Console

1. Add your site to [Google Search Console](https://search.google.com/search-console)
2. Use the "URL Inspection" tool to preview how Google sees your page
3. Check for indexing issues or missing meta tags

### Lighthouse (Chrome DevTools)

1. Open Chrome DevTools → Lighthouse
2. Run an audit with SEO enabled
3. Review recommendations for meta tags, headings, and structure

### Facebook Open Graph Debugger

1. Visit [og.facebook.com](https://og.facebook.com)
2. Enter your page URL
3. Verify title, description, and image appear correctly

### Local Testing

During development, inspect the `<head>` of your page:

```bash
pnpm dev
# Open http://localhost:3000 in your browser
# Right-click → Inspect → Head
```

---

## Common Issues

### Meta Tags Not Appearing

- **Cause**: Props not passed to `BaseLayout`
- **Fix**: Ensure all SEO fields are passed as props

```astro
<!-- ❌ Wrong: No props passed -->
<BaseLayout>
  <h1>My Page</h1>
</BaseLayout>

<!-- ✅ Correct: Props passed -->
<BaseLayout 
  title="My Page"
  description="Description"
>
  <h1>My Page</h1>
</BaseLayout>
```

### Keywords Not Working in Search

- **Cause**: Keywords less impactful in modern SEO; focus on content quality
- **Fix**: Write high-quality, keyword-rich content. Search engines prioritize content over meta keywords

### Social Media Shares Look Bland

- **Cause**: Missing Open Graph image
- **Fix**: Add `og:image` to `BaseLayout` and ensure the image is hosted at a public URL

```astro
<meta property="og:image" content={`${Astro.url.origin}/og-image.svg`} />
```

---

## Summary

| Level | File | Field |
|-------|------|-------|
| Global | `src/config/seo.ts` | `seoConfig.*` |
| Per-Page | `src/pages/*.astro` | Props to `<BaseLayout>` |
| Rendering | `src/layouts/BaseLayout.astro` | `<meta>`, `<title>` tags |

Edit the global config for site-wide changes, override props on individual pages for page-specific customization, and test with Google Search Console and social media debuggers to ensure your SEO is working correctly.
