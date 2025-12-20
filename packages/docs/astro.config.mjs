// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://asterui.com',
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['apexcharts'],
    },
    ssr: {
      external: ['apexcharts', 'qrcode', '@tiptap/react', '@tiptap/starter-kit', '@tanstack/react-virtual'],
    },
  },
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
    sitemap(),
    react({
      include: ['**/components/**/*.tsx'],
      exclude: ['**/scripts/**/*.tsx'],
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
        // SEO meta tags
        {
          tag: 'meta',
          attrs: {
            name: 'keywords',
            content: 'AsterUI, Aster UI, React components, DaisyUI, DaisyUI v5, DaisyUI React, React DaisyUI, DaisyUI component library, React components for DaisyUI, Tailwind CSS v4, Tailwind React, TypeScript UI library, open source component library, React form validation, React modal, React table',
          },
        },
        // Open Graph
        {
          tag: 'meta',
          attrs: {
            property: 'og:type',
            content: 'website',
          },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:site_name',
            content: 'AsterUI',
          },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            content: 'https://asterui.com/logo.png',
          },
        },
        // Twitter Card
        {
          tag: 'meta',
          attrs: {
            name: 'twitter:card',
            content: 'summary',
          },
        },
        {
          tag: 'meta',
          attrs: {
            name: 'twitter:image',
            content: 'https://asterui.com/logo.png',
          },
        },
        // JSON-LD Structured Data
        {
          tag: 'script',
          attrs: {
            type: 'application/ld+json',
          },
          content: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareSourceCode',
            name: 'AsterUI',
            alternateName: ['Aster UI', 'DaisyUI React', 'React DaisyUI Components'],
            description: 'React component library built on DaisyUI v5 with enterprise-level developer convenience. Production-ready, test-friendly, and fully typed.',
            programmingLanguage: ['TypeScript', 'React', 'JavaScript'],
            runtimePlatform: 'Node.js',
            codeRepository: 'https://github.com/edadma/asterui',
            url: 'https://asterui.com',
            license: 'https://opensource.org/licenses/MIT',
            keywords: ['DaisyUI', 'React', 'Tailwind CSS', 'TypeScript', 'UI components', 'form validation', 'modal', 'table'],
          }),
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
            { label: 'Overview', link: '/components' },
            {
              label: 'Actions',
              items: [
                { label: 'Button', slug: 'components/button' },
                { label: 'CopyButton', slug: 'components/copybutton' },
                { label: 'Dropdown', slug: 'components/dropdown' },
                { label: 'FloatButton', slug: 'components/floatbutton' },
              ],
            },
            {
              label: 'Data Display',
              collapsed: true,
              items: [
                { label: 'Avatar', slug: 'components/avatar' },
                { label: 'Badge', slug: 'components/badge' },
                { label: 'Card', slug: 'components/card' },
                { label: 'Carousel', slug: 'components/carousel' },
                { label: 'Chart', link: '/components/chart' },
                { label: 'Chat', slug: 'components/chat' },
                { label: 'Collapse', slug: 'components/collapse' },
                { label: 'Countdown', slug: 'components/countdown' },
                { label: 'Descriptions', slug: 'components/descriptions' },
                { label: 'Diff', slug: 'components/diff' },
                { label: 'Empty', slug: 'components/empty' },
                { label: 'HoverGallery', slug: 'components/hovergallery' },
                { label: 'Image', slug: 'components/image' },
                { label: 'List', slug: 'components/list' },
                { label: 'VirtualList', slug: 'components/virtuallist' },
                { label: 'MonthCalendar', slug: 'components/monthcalendar' },
                { label: 'Popover', slug: 'components/popover' },
                { label: 'QRCode', slug: 'components/qrcode' },
                { label: 'Stat', slug: 'components/stat' },
                { label: 'Status', slug: 'components/status' },
                { label: 'Table', slug: 'components/table' },
                { label: 'Tag', slug: 'components/tag' },
                { label: 'Timeline', slug: 'components/timeline' },
                { label: 'Tooltip', slug: 'components/tooltip' },
                { label: 'Tree', slug: 'components/tree' },
                { label: 'WeekCalendar', slug: 'components/weekcalendar' },
              ],
            },
            {
              label: 'Data Entry',
              collapsed: true,
              items: [
                { label: 'Autocomplete', slug: 'components/autocomplete' },
                { label: 'Cascader', slug: 'components/cascader' },
                { label: 'Checkbox', slug: 'components/checkbox' },
                { label: 'ColorPicker', slug: 'components/colorpicker' },
                { label: 'DatePicker', slug: 'components/datepicker' },
                { label: 'Fieldset', slug: 'components/fieldset' },
                { label: 'FileInput', slug: 'components/fileinput' },
                { label: 'Filter', slug: 'components/filter' },
                { label: 'Form', slug: 'components/form' },
                { label: 'Input', slug: 'components/input' },
                { label: 'InputNumber', slug: 'components/inputnumber' },
                { label: 'Mention', slug: 'components/mention' },
                { label: 'OTPInput', slug: 'components/otpinput' },
                { label: 'Radio', slug: 'components/radio' },
                { label: 'Range', slug: 'components/range' },
                { label: 'Rating', slug: 'components/rating' },
                { label: 'RichTextEditor', slug: 'components/richtexteditor' },
                { label: 'Segmented', slug: 'components/segmented' },
                { label: 'Select', slug: 'components/select' },
                { label: 'Textarea', slug: 'components/textarea' },
                { label: 'TimePicker', slug: 'components/timepicker' },
                { label: 'Toggle', slug: 'components/toggle' },
                { label: 'Transfer', slug: 'components/transfer' },
                { label: 'TreeSelect', slug: 'components/treeselect' },
                { label: 'Upload', slug: 'components/upload' },
              ],
            },
            {
              label: 'Feedback',
              collapsed: true,
              items: [
                { label: 'Alert', slug: 'components/alert' },
                { label: 'Drawer', slug: 'components/drawer' },
                { label: 'Loading', slug: 'components/loading' },
                { label: 'Message', slug: 'components/message' },
                { label: 'Modal', slug: 'components/modal' },
                { label: 'Notification', slug: 'components/notification' },
                { label: 'Popconfirm', slug: 'components/popconfirm' },
                { label: 'Progress', slug: 'components/progress' },
                { label: 'RadialProgress', slug: 'components/radialprogress' },
                { label: 'Result', slug: 'components/result' },
                { label: 'Skeleton', slug: 'components/skeleton' },
              ],
            },
            {
              label: 'Navigation',
              collapsed: true,
              items: [
                { label: 'Anchor', slug: 'components/anchor' },
                { label: 'Breadcrumb', slug: 'components/breadcrumb' },
                { label: 'Command', slug: 'components/command' },
                { label: 'ContextMenu', slug: 'components/contextmenu' },
                { label: 'Dock', slug: 'components/dock' },
                { label: 'Menu', slug: 'components/menu' },
                { label: 'Navbar', slug: 'components/navbar' },
                { label: 'Pagination', slug: 'components/pagination' },
                { label: 'ResponsiveDrawer', slug: 'components/responsivedrawer' },
                { label: 'Steps', slug: 'components/steps' },
                { label: 'Tabs', slug: 'components/tabs' },
              ],
            },
            {
              label: 'Layout',
              collapsed: true,
              items: [
                { label: 'Container', slug: 'components/container' },
                { label: 'Divider', slug: 'components/divider' },
                { label: 'Flex', slug: 'components/flex' },
                { label: 'Footer', slug: 'components/footer' },
                { label: 'Grid', slug: 'components/grid' },
                { label: 'Hero', slug: 'components/hero' },
                { label: 'Join', slug: 'components/join' },
                { label: 'Layout', slug: 'components/layout' },
                { label: 'Masonry', slug: 'components/masonry' },
                { label: 'Responsive', slug: 'components/responsive' },
                { label: 'Space', slug: 'components/space' },
                { label: 'Splitter', slug: 'components/splitter' },
              ],
            },
            {
              label: 'Other',
              collapsed: true,
              items: [
                { label: 'Affix', slug: 'components/affix' },
                { label: 'ConfigProvider', slug: 'components/configprovider' },
                { label: 'Browser', slug: 'components/browser' },
                { label: 'Code', slug: 'components/code' },
                { label: 'Kbd', slug: 'components/kbd' },
                { label: 'Mask', slug: 'components/mask' },
                { label: 'Phone', slug: 'components/phone' },
                { label: 'TextRotate', slug: 'components/textrotate' },
                { label: 'ThemeController', slug: 'components/themecontroller' },
                { label: 'Tour', slug: 'components/tour' },
                { label: 'Typography', slug: 'components/typography' },
                { label: 'Watermark', slug: 'components/watermark' },
                { label: 'Window', slug: 'components/window' },
              ],
            },
          ],
        },
        {
          label: 'Hooks',
          items: [
            { label: 'useBreakpoint', slug: 'hooks/usebreakpoint' },
            { label: 'useClickOutside', slug: 'hooks/useclickoutside' },
            { label: 'useClipboard', slug: 'hooks/useclipboard' },
            { label: 'useDebounce', slug: 'hooks/usedebounce' },
            { label: 'useDisclosure', slug: 'hooks/usedisclosure' },
            { label: 'useHover', slug: 'hooks/usehover' },
            { label: 'useKeyPress', slug: 'hooks/usekeypress' },
            { label: 'useLocalStorage', slug: 'hooks/uselocalstorage' },
            { label: 'usePrevious', slug: 'hooks/useprevious' },
            { label: 'useTheme', slug: 'hooks/usetheme' },
            { label: 'useWindowSize', slug: 'hooks/usewindowsize' },
          ],
        },
      ],
    }),
  ],
});
