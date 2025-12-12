// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'AsterUI',
      description: 'A React component library built on DaisyUI and Tailwind CSS',
      logo: {
        light: './src/assets/logo-light.svg',
        dark: './src/assets/logo-dark.svg',
        replacesTitle: true,
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/edadma/asterui' },
        { icon: 'x.com', label: 'X', href: 'https://x.com/AsterUI' },
      ],
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Introduction', slug: '' },
            { label: 'Installation', slug: 'getting-started/installation' },
            { label: 'Quick Start', slug: 'getting-started/quick-start' },
          ],
        },
        {
          label: 'Components',
          items: [
            { label: 'Overview', slug: 'components/overview' },
            { label: 'Button', slug: 'components/button' },
            { label: 'Collapse', slug: 'components/collapse' },
          ],
        },
        {
          label: 'Theming',
          items: [
            { label: 'Overview', slug: 'theming/overview' },
            { label: 'Dark Mode', slug: 'theming/dark-mode' },
            { label: 'Custom Themes', slug: 'theming/custom-themes' },
          ],
        },
      ],
    }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
