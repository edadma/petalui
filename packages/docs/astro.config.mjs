// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
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
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: '/demo.css',
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
                { label: 'CopyButton', slug: 'components/copybutton' },
                { label: 'Dropdown', slug: 'components/dropdown' },
                { label: 'FloatButton', slug: 'components/floatbutton' },
              ],
            },
            {
              label: 'Data Display',
              items: [
                { label: 'Avatar', slug: 'components/avatar' },
                { label: 'Badge', slug: 'components/badge' },
                { label: 'Card', slug: 'components/card' },
                { label: 'Carousel', slug: 'components/carousel' },
                { label: 'Chart', link: '/components/chart' },
                { label: 'Chat', slug: 'components/chat' },
                { label: 'Collapse', slug: 'components/collapse' },
                { label: 'Countdown', link: '/components/countdown' },
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
      ],
    }),
  ],
});
