import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';

const deployTarget = process.env.DEPLOY_TARGET || 'docker';

const adapters = {
  vercel: vercel(),
  docker: node({ mode: 'standalone' }),
};

export default defineConfig({
  integrations: [react()],
  adapter: adapters[deployTarget],
  // Keep the generated HTML compact in production without changing the source markdown.
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
    build: {
      target: 'es2022',
      minify: 'esbuild',
      cssMinify: 'esbuild',
      sourcemap: false,
    },
  },
  site: 'https://giletsjaunes2026.fr',
  output: 'server',
});
