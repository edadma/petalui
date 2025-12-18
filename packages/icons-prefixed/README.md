# @aster-ui/icons

Icon library for AsterUI with size tokens. Built from [Heroicons](https://heroicons.com).

## Installation

```bash
npm install @aster-ui/icons asterui
```

## Usage

```tsx
import { ArrowUpTrayIcon, CheckIcon, TrashIcon } from '@aster-ui/icons'

// Default size (md = 20px)
<ArrowUpTrayIcon />

// Size tokens
<ArrowUpTrayIcon size="xs" />  // 12px
<ArrowUpTrayIcon size="sm" />  // 16px
<ArrowUpTrayIcon size="md" />  // 20px (default)
<ArrowUpTrayIcon size="lg" />  // 24px
<ArrowUpTrayIcon size="xl" />  // 28px

// Explicit pixel size
<ArrowUpTrayIcon size={18} />

// Custom styling
<ArrowUpTrayIcon className="text-primary" />
```

## Variants

Outline icons are exported from the main entry point. For solid icons:

```tsx
import { ArrowUpTrayIcon } from '@aster-ui/icons/solid'
```

## With AsterUI Button

Icons automatically match the Button's size:

```tsx
import { Button } from 'asterui'
import { ArrowUpTrayIcon } from '@aster-ui/icons'

// Icon automatically sized to match button
<Button size="sm" icon={<ArrowUpTrayIcon />}>Upload</Button>
<Button size="lg" icon={<ArrowUpTrayIcon />}>Upload</Button>

// Override with explicit size
<Button size="lg" icon={<ArrowUpTrayIcon size="sm" />}>Upload</Button>
```

## Size Tokens

| Token | Pixels |
|-------|--------|
| xs    | 12px   |
| sm    | 16px   |
| md    | 20px   |
| lg    | 24px   |
| xl    | 28px   |

## Credits

Icons are derived from [Heroicons](https://heroicons.com) by the makers of Tailwind CSS, licensed under the [MIT License](https://github.com/tailwindlabs/heroicons/blob/master/LICENSE).

## License

ISC
