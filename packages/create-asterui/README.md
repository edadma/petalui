# create-asterui

Scaffold a new [AsterUI](https://asterui.com) project with Vite, Tailwind CSS v4, and DaisyUI v5.

## Usage

```bash
npm create asterui
# or
pnpm create asterui
# or
yarn create asterui
```

### With arguments

```bash
npm create asterui my-app
npm create asterui my-app --js
npm create asterui my-app --themes business
npm create asterui my-app --js --themes all --pm pnpm
npm create asterui my-app --optional editor
```

### Options

```
--js              Use JavaScript instead of TypeScript
--ts              Use TypeScript (default)
--prefixed        Use @aster-ui/prefixed with d- prefix for daisyUI
--themes <preset> Theme preset: light-dark, business, all
--pm <manager>    Package manager: npm, pnpm, yarn
--optional <deps> Optional deps: chart,editor,qrcode,virtuallist
-h, --help        Show help message
```

## What it does

- Creates a new Vite + React project
- Configures Tailwind CSS v4 and DaisyUI v5
- Installs AsterUI (or @aster-ui/prefixed with --prefixed) and react-hook-form
- Sets up theme configuration (light/dark, business/corporate, or custom)
- Optionally configures daisyUI class prefix for avoiding conflicts
- Supports TypeScript or JavaScript

## After scaffolding

```bash
cd your-project
npm run dev
```

## Optional components

Some AsterUI components require additional peer dependencies and use separate imports:

```bash
# For Chart component
npm install apexcharts
import { Chart } from 'asterui/chart'  # or '@aster-ui/prefixed/chart'

# For QRCode component
npm install qrcode
import { QRCode } from 'asterui/qrcode'  # or '@aster-ui/prefixed/qrcode'

# For RichTextEditor component
npm install @aster-ui/icons @tiptap/react
import { RichTextEditor } from 'asterui/editor'  # or '@aster-ui/prefixed/editor'

# For VirtualList component
npm install @tanstack/react-virtual
import { VirtualList } from 'asterui/virtuallist'  # or '@aster-ui/prefixed/virtuallist'
```

## Links

- [AsterUI Documentation](https://asterui.com)
- [GitHub](https://github.com/edadma/asterui)
