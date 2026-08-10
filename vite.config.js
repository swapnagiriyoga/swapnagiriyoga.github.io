import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Tailwind v4 is configured entirely from CSS (see src/index.css `@theme`),
// so there is no tailwind.config.js — the Vite plugin is all that's needed.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // GitHub Pages serves a project site from /<repo-name>/, so every asset URL
  // needs that prefix or the CSS, JS and images 404. The deploy workflow works
  // the value out from the repo name and passes it in, which keeps this correct
  // whether the repo is `swapnagiri-yoga` or `<user>.github.io`. Local dev and
  // any other host fall back to the root.
  base: process.env.VITE_BASE || '/',
  server: {
    port: 5173,
  },
});
