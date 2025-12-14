// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://asterui.com',
  markdown: {
    shikiConfig: {
      themes: {
        light: 'material-theme-lighter',
        dark: 'material-theme-darker',
      },
      defaultColor: false,
    },
  },
  integrations: [
    react({
      include: ['**/components/**/*.tsx'],
    }),
    starlight({
      title: 'AsterUI',
      components: {
        SiteTitle: './src/components/SiteTitle.astro',
      },
      description: 'A React component library built on DaisyUI and Tailwind CSS',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/edadma/asterui' },
        { icon: 'seti:npm', label: 'npm', href: 'https://www.npmjs.com/package/asterui' },
      ],
      customCss: ['./src/styles/custom.css'],
      head: [
        {
          tag: 'link',
          attrs: {
            rel: 'icon',
            href: '/favicon.ico',
          },
        },
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
            {
              label: 'Actions',
              items: [
                { label: 'Button', slug: 'components/button' },
              ],
            },
          ],
        },
      ],
    }),
  ],
});
