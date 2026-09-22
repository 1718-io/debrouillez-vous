import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [react()],
  adapter: vercel(),
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
