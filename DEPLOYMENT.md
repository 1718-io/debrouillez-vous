# Deployment Guide

This Astro project supports multiple deployment targets with different adapter configurations. Choose the appropriate deployment method based on your infrastructure.

## Deployment Targets

### Vercel Deployment

**Adapter:** `@astrojs/vercel`

For deploying to Vercel, set the environment variable:
```bash
DEPLOY_TARGET=vercel
```

**Build Command:**
```bash
pnpm build
```

**How it works:**
- Uses the Vercel adapter which optimizes for Vercel's serverless platform
- Automatically handles Edge Functions and Serverless Functions
- Best for rapid deployments with minimal infrastructure setup

**Local Testing:**
```bash
DEPLOY_TARGET=vercel pnpm build
pnpm preview
```

---

### Docker Deployment

**Adapter:** `@astrojs/node` with `mode: 'standalone'`

For deploying in Docker or other Node.js environments, set the environment variable:
```bash
DEPLOY_TARGET=docker
```

**Build Command:**
```bash
DEPLOY_TARGET=docker pnpm build
```

**Running the built application:**
```bash
node ./dist/server/entry.mjs
```

**Dockerfile Example:**
```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy built output from previous build stage
COPY dist dist
COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install --prod

EXPOSE 3000

CMD ["node", "./dist/server/entry.mjs"]
```

**Local Testing:**
```bash
DEPLOY_TARGET=docker pnpm build
node ./dist/server/entry.mjs
```

---

## Default Behavior

If `DEPLOY_TARGET` is not set, the build will default to `docker` mode.

## Environment Variables

The build adapter is determined by the `DEPLOY_TARGET` environment variable:
- `vercel` → Uses Vercel adapter
- `docker` → Uses Node.js standalone adapter (default)

## Development

Development mode is unaffected by the `DEPLOY_TARGET` setting and always runs in watch mode:

```bash
pnpm dev
```

This will start the Astro development server on `http://localhost:3000` (or the configured port).

## Production Build

To build for production:

```bash
# For Vercel
DEPLOY_TARGET=vercel pnpm build

# For Docker/Node.js (or use default)
DEPLOY_TARGET=docker pnpm build
```

## Server-Side Rendering (SSR)

Both adapters support server-side rendering. The project is configured with `output: 'server'` in `astro.config.mjs`, which means:
- Routes are rendered on-demand on the server
- Dynamic content is supported
- Supabase integration works seamlessly on the server
