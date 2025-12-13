// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react({
      include: ['**/components/**/*.tsx'],
    }),
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
      head: [
        {
          tag: 'script',
          content: `document.addEventListener('DOMContentLoaded',()=>{if(location.pathname.startsWith('/components/'))document.body.classList.add('component-page')})`,
        },
      ],
      sidebar: [
        {
          label: 'Start Here',
          items: [
            { label: 'Getting Started', slug: 'getting-started' },
            { label: 'Manual Setup', slug: 'manual-setup' },
          ],
        },
        {
          label: 'Components',
          items: [
            { label: 'Button', slug: 'components/button' },
          ],
        },
      ],
    }),
  ],
});
