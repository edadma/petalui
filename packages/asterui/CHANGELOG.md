---
title: Changelog
description: All notable changes to AsterUI
---

# Changelog

All notable changes to AsterUI are documented here.


## v0.12.59 (2025-12-22)

### Table Component QA Fixes

- **ConfigProvider Integration**: Table now respects `componentSize` and global `locale` from ConfigProvider
- **DaisyUI Classes**: Added missing `table-md` class, fixed checkbox/radio size scaling

### New Table Props

- `showHeader` - Control header visibility
- `rowClassName` - Custom row styling (string or function)
- `title` / `footer` / `summary` - Render functions for table sections
- `onHeaderRow` - Header row event handlers

### New Column Props

- `className` - Custom class for column cells
- `onCell` / `onHeaderCell` - Custom cell attribute callbacks

### New RowSelection Props

- `columnTitle`, `columnWidth`, `fixed`, `hideSelectAll`, `onSelect`

### New Expandable Props

- `defaultExpandAllRows`, `columnTitle`, `columnWidth`, `expandedRowClassName`, `showExpandColumn`

### Documentation

- Added 4 new Table examples: Title/Footer, Summary Row, Row Class Name, Custom Selection
- Backfilled changelog entries for v0.12.55, v0.12.56, v0.12.57

## v0.12.58 (2025-12-22)

### Bug Fixes

- **Form**: Fix Form.Item to preserve child's original onChange handler, allowing custom onChange handlers on inputs inside Form.Item to work correctly

### New Features

- **Blocks**: Add Signup Form block with password strength meter, password confirmation validation, and terms acceptance
- **Examples**: Add signup-form example demonstrating Form validation patterns

## v0.12.57 (2025-12-22)

### Component Improvements

Added `data-testid` prefix support to 11 components for easier testing:

- **Modal**: TestIds for overlay, content, header, body, footer, close button
- **Dropdown**: TestIds for trigger and menu
- **Pagination**: TestIds for prev/next buttons and page items
- **Tabs**: TestIds for tab list, individual tabs, and panels
- **Popconfirm**: TestIds for trigger, popover, confirm/cancel buttons
- **Upload**: TestIds for dropzone and input
- **DatePicker**: Added ref forwarding, testIds for input and calendar
- **InputNumber**: TestIds for input, increment, and decrement buttons
- **OTPInput**: Indexed testIds for each input field
- **Menu**: TestId for the main menu element
- **Transfer**: TestIds for source list, target list, and move buttons

### Documentation

- Updated API tables for all 11 components with `data-testid` prop

## v0.12.56 (2025-12-21)

### Bug Fixes

- Fix theme color timing issue - use double requestAnimationFrame to ensure CSS fully recalculates before reading theme colors
- ThemeController now properly integrates with ThemeProvider context
- Starter app improvements: uses Hero and Space components

## v0.12.55 (2025-12-21)

### New Features

- **ThemeProvider**: New component for comprehensive theme management
  - System preference detection (`prefers-color-scheme: dark`)
  - localStorage persistence with configurable storage key
  - Cross-tab synchronization
  - Support for any DaisyUI theme
- **SizeProvider**: Renamed `IconSizeContext` to `SizeContext`/`SizeProvider` for clarity
  - Used by Button, CopyButton to propagate size to child icons
  - `useSize` hook for consuming size context

### Documentation

- New **Providers** section in documentation sidebar
- Dedicated pages for ConfigProvider, ThemeProvider, and SizeProvider
- All provider docs available in 5 languages (EN, ES, PT, ZH, FR)

### Breaking Changes

- `IconSizeContext` renamed to `SizeContext`
- `useIconSize` renamed to `useSize` (in @aster-ui/icons)

## v0.12.54 (2025-12-20)

## What's New

### useTheme Hook
- New hook that detects current theme and provides computed colors from DaisyUI CSS variables
- Returns `{ isDark, colors }` with hex values for `background`, `foreground`, `primary`, `primaryContent`
- Useful for canvas-based components that can't use CSS variables directly
- QRCode component now uses theme colors automatically

### Hooks Documentation
- Added dedicated documentation section for all 11 hooks
- Each hook has its own page with examples and API reference

### Components Overview Page
- New `/components` page showing all 80+ components organized by category
- Includes search functionality
- Accessible from sidebar under Components → Overview

### Other Changes
- Sidebar sections now collapse by default (except Start Here, Actions, Hooks)
- Updated responsive.mdx to link to useBreakpoint hook docs
- Added avatar images for docs

## v0.12.52 (2025-12-20)

## Form Component Improvements

- Add `data-testid` support to Form, Form.Item, and Form.ErrorList
- Form.Item propagates testid to label, input, error, and extra elements
- Add Form.List example and documentation
- Document missing `size` prop on Form

## Docs Improvements

- Simplify CSS setup to match standard SPA configuration
- Remove redundant demo.css CLI build
- Faster dev server and builds

## v0.12.51 (2025-12-20)

- Fix color utilities to use inline classes (not prefixed)
- Fix prefixer pseudo-class handling (hover:d-class not d-hover:class)
- Add --prefixed option to create-asterui
- Fix icons-prefixed peer dependency

## v0.12.50 (2025-12-20)

## What's Changed

### Reliable Class Prefixing
- All 102 components now use the `dXxx` naming pattern for DaisyUI classes
- Prefixer script simplified from ~1578 lines to ~260 lines
- Library is now 100% prefixable with a simple regex-based transformation

### Documentation
- Updated component count to 100+
- Deploy now uses the new docs/ package with live examples
- Removed deprecated docs-slclone package

### Other
- Fixed demo area background lightness in docs
- Version bump to 0.12.50

## v0.12.49 (2025-12-16)

Add Command component (command palette)

## v0.12.48 (2025-12-16)

## Changes

- **Docs**: Complete directive-based code extraction for all demo components
- **QRCode**: Fix component not rendering in docs (removed internal loading state bug, use client:only for SSR-incompatible canvas)
- **Descriptions**: Fix label/value text contrast with theme-aware colors

## v0.12.47 (2025-12-15)

Add gap-2 spacing for vertical Checkbox.Group layout

## v0.12.46 (2025-12-15)

## Checkbox QA Fixes

### Component
- Fix className not merged when no children
- Add `aria-checked="mixed"` for indeterminate state (accessibility)
- Add `name` prop to Checkbox.Group for form submission
- Add `data-testid` prefix convention for Group options

### Documentation
- Update examples to use built-in `children` prop for labels
- Add all color variants and xl size to examples
- Document new props: `children`, `name`, `value`, `autoFocus`, `data-testid`
- Fix fragment detection for single-line JSX elements in code display

## v0.12.45 (2025-12-14)

## New Features

### Message Component
- New lightweight feedback component for quick user notifications
- Supports `success`, `error`, `info`, `warning`, `loading` types
- Wrapper around Notification with compact variant
- Props: `key`, `icon`, `className`, `style`, `data-testid`, `duration`, `onClick`, `onClose`
- `MessageManager` class exported for test isolation

## Enhancements

### Tour Component (QA Compliance)
- **Testability**: `data-testid` prop with customizable prefix pattern, `data-state` attribute
- **Code Quality**: `forwardRef` with `TourRef` (goTo, next, prev, close), `className`, `style`, spread props
- **Feature Parity**:
  - `arrow` prop (`boolean | { pointAtCenter }`)
  - `closeIcon`, `disabledInteraction` props
  - `mask` enhanced to support `{ style, color }` object
  - `scrollIntoViewOptions` supports `ScrollIntoViewOptions` object
  - `indicatorsRender`, `actionsRender` for customization
  - `getPopupContainer` for portal target
  - `classNames`/`styles` for semantic structure customization
- **Per-Step Overrides**: `arrow`, `closeIcon`, `mask`, `type`, `scrollIntoViewOptions`
- **Button Customization**: `nextButtonProps`, `prevButtonProps` per step
- **Accessibility**: Focus trap, initial focus management, live region announcements

### Notification Component
- `data-testid` support with customizable prefix
- `key` prop for updating existing notifications
- `icon`, `className`, `style` props

## v0.12.44 (2025-12-14)

### Changed
- Refactor: use React `key` prop instead of `itemKey`/`tabKey` for Dropdown, Menu, ContextMenu, and Tabs components

## v0.12.43 (2025-12-13)

- @aster-ui/icons: Standalone library with inlined SVG paths (no heroicons peer dependency)
- Button: IconSizeContext for automatic icon sizing
- Site demos updated to use @aster-ui/icons

## v0.12.42 (2025-12-13)

Fix: restore static imports for qrcode, apexcharts, @tanstack/react-virtual

## v0.12.41 (2025-12-13)

Revert to static imports for optional peer dependencies (qrcode, apexcharts, @tanstack/react-virtual). Install the peer dep before importing from asterui/chart, asterui/qrcode, or asterui/virtuallist.

## v0.12.40 (2025-12-13)

- Add MissingDependency component for QRCode, Chart, VirtualList
- Gracefully show install instructions when optional peer deps are missing
- Fix dynamic import to handle both ESM and CJS exports

## v0.12.37 (2025-12-13)

QRCode: add whitespace-nowrap and reduce sizes to prevent text wrapping in missing dependency message

## v0.12.36 (2025-12-13)

QRCode: remove horizontal padding in missing dependency message to prevent text wrapping

## v0.12.35 (2025-12-13)

QRCode component now shows a friendly message when the `qrcode` peer dependency is not installed, instead of crashing with an error.

## v0.12.33 (2025-12-13)

## What's Changed

### Drawer Component - Complete QA Audit

**New Props:**
- `afterOpenChange` - Callback after open/close animation completes
- `headerStyle`, `bodyStyle`, `footerStyle`, `rootStyle`, `maskStyle` - Fine-grained styling
- `forceRender` - Pre-render content (keep in DOM when closed)
- `getContainer` - Custom portal container (or `false` to disable portal)
- `push` - Nested drawer offset behavior (`boolean | { distance: number }`)
- `loading` - Show skeleton loading state
- `data-testid` - Test ID with child element prefixes (`-mask`, `-panel`, `-header`, `-close`, `-body`, `-footer`, `-skeleton`)

**Code Quality:**
- Added ref forwarding via `DrawerRef` interface
- Props now spread to root element for extensibility

### SidebarDrawer → ResponsiveDrawer

Renamed and enhanced with:
- `width` prop - Custom sidebar width (default: 320px)
- `responsive` prop - Breakpoint for always-visible sidebar (`sm`/`md`/`lg`/`xl`/`2xl`)
- `contentClassName`, `overlayClassName` props
- Ref forwarding and `data-testid` support

### Documentation

- 8 comprehensive demos for Drawer (basic, placement, footer, extra, sizes, loading, nested, no-mask)
- Test ID reference table
- Ref documentation

## v0.12.32 (2025-12-13)

## Carousel Component Rewrite

Complete rewrite of the Carousel component with full functionality:

- **Autoplay** with configurable `autoplaySpeed` (pauses on hover)
- **Navigation arrows** (prev/next buttons)
- **Dot indicators** with configurable `dotPlacement` (top/bottom/start/end)
- **Fade effect** as alternative to scroll transition
- **Infinite looping** (configurable)
- **Keyboard navigation** (arrow keys)
- **Controlled/uncontrolled modes** (`activeIndex` / `defaultActiveIndex`)
- **Imperative methods** via ref: `goTo()`, `next()`, `prev()`
- **Callbacks**: `beforeChange`, `afterChange`
- **Vertical orientation** (fixed scrolling issue)
- **ARIA attributes** for accessibility
- **data-testid** support with prefixed child elements

## Badge Fix

- Moved `ghost` from `BadgeType` to `BadgeVariant` to correctly match DaisyUI's class structure

## v0.12.31 (2025-12-12)

## Changes

### Breaking Changes
- `Chart`, `QRCode`, and `VirtualList` are now imported from separate entry points:
  ```ts
  import { Chart } from 'asterui/chart'
  import { QRCode } from 'asterui/qrcode'
  import { VirtualList } from 'asterui/virtuallist'
  ```

### Why
- Optional peer dependencies (`apexcharts`, `qrcode`, `@tanstack/react-virtual`) are no longer loaded when importing from the main `asterui` package
- This fixes Vite dev server errors when these optional dependencies aren't installed

### Other
- `react-hook-form` remains a required peer dependency (Form components stay in main bundle)
- Added `create-asterui` CLI scaffolding tool (not yet published to npm)
- Updated documentation for new import paths

## v0.12.30 (2025-12-12)

## ColorPicker Improvements
- Add `forwardRef` for proper ref forwarding
- Add `defaultValue` prop for uncontrolled mode
- Add `showText` prop to display hex value below picker
- Add `allowClear` prop with clear button
- Add `data-testid` support with prefix pattern for child elements
- Add keyboard navigation (arrow keys adjust values, Shift+Arrow for larger steps)
- Add ARIA attributes for accessibility (role="slider", aria-valuetext, etc.)
- Update documentation and examples

## Space Component
- Default to `align="start"` for vertical direction to prevent children from stretching to full width

## v0.12.29 (2025-12-12)

## TimePicker Improvements

### Accessibility
- Added ARIA attributes (aria-haspopup, aria-expanded, role=listbox/option)
- Added keyboard navigation (arrow keys, escape, enter)

### Testability
- Added data-testid support with prefix pattern for child elements

### New Props
- `allowClear` - show clear button when time is selected
- `open` / `onOpenChange` - controlled popup state
- `hourStep`, `minuteStep`, `secondStep` - custom intervals
- `status` - validation status ('error' | 'warning')

### Other
- Added forwardRef support
- Fixed dropdown width
- Updated docs with better examples

## v0.12.28 (2025-12-12)

Rebuild Collapse component with Ant Design API

- Add items prop for array-based panel configuration
- Add accordion, activeKey, defaultActiveKey props  
- Add bordered, ghost, size props
- Add icon prop (arrow/plus/none) for DaisyUI variants
- Add expandIconPlacement prop
- Add ref forwarding and data-testid support
- Add keyboard accessibility (Enter/Space)
- Add aria-expanded and data-state attributes

## v0.12.27 (2025-12-12)

## Fixes

### Descriptions
- Add `items` prop for array-based configuration (Ant Design v5.8.0+ pattern)
- Fix transparent background on value fields (add `bg-base-100`)
- Add `extra` prop for top-right action area
- Add ref forwarding
- Add `data-testid` support
- Add accessibility improvements (scope attributes, role, aria-label)
- Change size values to `sm`/`md`/`lg` for consistency

### List (from previous commit)
- Add `itemLayout`, `loadMore`, `rowKey` props
- Add accessibility (role="list", aria-label, aria-busy)
- Fix background/border styling with DaisyUI classes

### Image (from previous commit)
- Add ref forwarding and keyboard support
- Add accessibility for preview modal
- Fix broken demo images (use picsum.photos)

### Empty (from previous commit)
- Add static image constants (`PRESENTED_IMAGE_DEFAULT`, `PRESENTED_IMAGE_SIMPLE`)
- Add ref forwarding and accessibility
- Remove heroicons dependency from demos

## v0.12.26 (2025-12-11)

## Tag Component QA Audit

### Tag Component
- **Controlled visibility**: Added `visible` prop for controlled visibility management
- **Variants**: Added `variant` prop with `filled`, `outlined`, `soft`, and `dash` options
- **Disabled state**: Added `disabled` prop with proper styling and interaction blocking
- **Link support**: Added `href` and `target` props to render tag as an anchor element
- **Extra large size**: Added `xl` size option
- **Improved accessibility**: 
  - Close button now uses descriptive aria-label ("Remove {label}")
  - Added focus ring styles on close button
  - Added `TagLiveRegion` component for screen reader announcements when tags are removed

### CheckableTag Component
- **Size prop**: Added size support (xs, sm, md, lg, xl)
- **Color prop**: Added color support for all DaisyUI colors
- **Disabled state**: Added `disabled` prop
- **Focus indicators**: Added visible focus ring for keyboard navigation

### Bug Fixes
- Added missing `data-testid` to `CascaderProps` interface
- Added missing `data-testid` to `TreeProps` interface

## v0.12.25 (2025-12-11)

## Tag Component QA Fixes

### Tag & CheckableTag
- Add `forwardRef` for ref forwarding
- Add `data-testid` props with customizable base IDs
- Add keyboard support (Enter/Space) to CheckableTag
- Add `data-state` attribute to CheckableTag for test automation
- Export `TagSize` and `TagColor` types
- Use static class lookup maps (no interpolation)

### Documentation
- Update Tag docs and demos to use `<Space>` component instead of raw divs
- Add QA rule: example code should use AsterUI components

### TreeSelect (from v0.12.24)
- Add `variant` prop (outlined/filled/borderless)
- Add `ghost` prop for transparent background
- Add `maxCount` prop to limit selections
- Add `tagRender` prop for custom tag rendering
- Add `neutral` color option
- Implement `labelInValue` to return {value, label} objects
- Implement `treeIcon` to render node icons
- Add static exports (SHOW_ALL, SHOW_PARENT, SHOW_CHILD)
- Create comprehensive documentation

## v0.12.24 (2025-12-10)

## What's Changed

### Cascader & TreeSelect QA Audit

Complete QA audit of Cascader and TreeSelect components with improvements across accessibility, testability, and feature parity.

#### Cascader
- **Accessibility**: Full keyboard navigation (↑↓←→, Enter, Escape, Home, End), ARIA combobox pattern with `aria-activedescendant`
- **Testability**: Customizable `data-testid` with prefixed child elements, `data-state` attributes
- **New Features**: `multiple`, `changeOnSelect`, `loadData`, `status`, `color`, `maxTagCount`, `fieldNames`, `open`, `onDropdownVisibleChange`, `dropdownRender`, `notFoundContent`
- **Code Quality**: `forwardRef` support, static Tailwind class maps

#### TreeSelect  
- **Accessibility**: Full keyboard navigation, ARIA tree/treeitem pattern with `aria-selected`, `aria-expanded`
- **Testability**: Customizable `data-testid` with prefixed child elements, `data-state` attributes
- **New Features**: `treeCheckStrictly`, `showCheckedStrategy`, `searchValue`, `onSearch`, `filterTreeNode`, `status`, `color`, `maxTagCount`, `maxTagPlaceholder`, `treeLine`, `loadData`, `fieldNames`, `open`, `onDropdownVisibleChange`, `suffixIcon`, `switcherIcon`, `dropdownRender`, `notFoundContent`, `popupClassName`, `xl` size
- **Code Quality**: `forwardRef` support, static Tailwind class maps

#### Tree
- Fixed interpolated checkbox Tailwind classes
- Added customizable `data-testid` via context

**Full Changelog**: https://github.com/edadma/asterui/compare/v0.12.23...v0.12.24

## v0.12.23 (2025-12-10)

## Fixes

- **VirtualList**: Fix gap prop not rendering visual space between items

## v0.12.22 (2025-12-10)

## New Component

- **VirtualList** - Efficiently render large lists by only rendering visible items
  - Wraps @tanstack/react-virtual
  - Supports fixed or variable item heights
  - Simple API: `items`, `height`, `itemHeight`, `renderItem`
  - Optional peer dependency: `@tanstack/react-virtual`

## v0.12.21 (2025-12-09)

## Changes

- **Notification**: Close button now positioned in upper right corner
- **Code**: Fixed TypeScript errors in extractTextFromChildren function

## v0.12.20 (2025-12-09)

### New Features

- **CopyButton**: New component for copying text to clipboard with visual feedback
- **Code**: Add `copyable` prop for built-in copy button support

### Usage

```tsx
// CopyButton standalone
<CopyButton text="Copy me!" showTooltip />

// Code with copyable
<Code copyable>
  <Code.Line prefix="$">npm install asterui</Code.Line>
</Code>
```

## v0.12.19 (2025-12-09)

### Fixes

- **Watermark**: Fix memory leak by properly cleaning up image event handlers
- **Watermark**: Memoize textLines and fontSettings to optimize re-renders
- **Watermark**: Simplify useEffect dependency array

## v0.12.18 (2025-12-08)

## What's New

### Select Component
- Add `status` prop for validation feedback (error/warning)
- Add `floatingLabel` prop for animated floating labels
- Add `addonBefore` and `addonAfter` props for input decorations

### Card Component
- Add `extra` prop for content in header top-right corner
- Add `loading` prop for skeleton loading state
- Add `hoverable` prop for hover shadow effect
- Add `avatar` and `description` props for inline meta layout
- Add `Card.Meta` compound component for avatar + title + description layouts
- Fix `imageFull` overlay (border was breaking CSS grid stacking)

### Documentation
- Fix inline code contrast in dark mode usage tips
- Add examples for all new Card and Select features

## v0.12.17 (2025-12-07)

- Remove Label component (features integrated into Input and Form.Item)
- Add floatingLabel, addonBefore, addonAfter props to Input
- Add floatingLabel, addonBefore, addonAfter props to Form.Item
- Add unstyled prop to Input for use inside styled wrappers
- Fix addon rendering to use proper DaisyUI input group pattern

## v0.12.16 (2025-12-07)

## New Component

### HoverGallery

Reveal multiple images by hovering horizontally - ideal for e-commerce product galleries.

```tsx
import { HoverGallery, Card } from 'asterui'

<Card
  title="Product Name"
  cover={<HoverGallery images={['/front.jpg', '/side.jpg', '/back.jpg']} />}
>
  <p>Hover over the image to see more angles</p>
</Card>
```

- Supports up to 10 images
- Pure CSS hover effect
- Works great with Card's `cover` prop

## v0.12.15 (2025-12-07)

## Button API Refactor

Split the `type` prop into separate `color` and `variant` props for better clarity:

- **`color`**: `primary`, `secondary`, `accent`, `info`, `success`, `warning`, `error`, `neutral`
- **`variant`**: `solid`, `outline`, `dash`, `soft`, `ghost`, `link`

### Before
```tsx
<Button type="primary">Primary</Button>
<Button type="ghost">Ghost</Button>
<Button type="primary" outline>Outline</Button>
```

### After
```tsx
<Button color="primary">Primary</Button>
<Button variant="ghost">Ghost</Button>
<Button color="primary" variant="outline">Outline</Button>
```

## Other Changes

- Added missing examples for `pressed` and `noAnimation` props
- Fixed `htmlType="reset"` not working in Form component
- Updated all demos and documentation to use new Button API

## v0.12.14 (2025-12-07)

## Input Component Enhancements

### New Features
- **allowClear** - Show clear button when input has value
- **prefix/suffix** - Add icons or elements to input
- **status** - Validation status (`error` | `warning`) with automatic `aria-invalid`
- **errorId** - Link to error message via `aria-describedby`
- **onClear** - Callback when clear button is clicked

### Bug Fixes
- Fixed `extractRaw()` mask placeholder bug (was hardcoded `_` instead of using `maskPlaceholder` prop)
- Fixed prefix/suffix icon visibility with proper z-index

### Documentation
- Added examples for allowClear, prefix/suffix, and validation status
- Updated to use Heroicons in examples

## v0.12.13 (2025-12-07)

## Steps Component Enhancements

- Add data-driven pattern with `items` prop
- Add `current` prop for controlled step index (0-based)
- Add `direction` prop (`'horizontal' | 'vertical'`)
- Add `icon` and `description` support for steps
- Add `onChange` callback for click navigation
- Fix off-by-one bug: current step now properly highlighted
- Remove `size` prop (not supported by daisyUI)
- Replace inappropriate example text

## Bug Fixes

- Fix Menu.tsx TypeScript error (Omit title from base type)

## v0.12.12 (2025-12-07)

## Menu Component Improvements

### New Features
- **Size prop**: Added `size` prop with `xs`, `sm`, `md`, `lg`, `xl` variants using daisyUI classes
- **Data-driven pattern**: Added `items` prop for data-driven menus alongside compound pattern
- **MenuItem type**: New `MenuItem` interface for data-driven configuration

### Fixes
- Added `title` as alias for `label` in `Menu.SubMenu` for backwards compatibility
- Updated demos with proper `itemKey` and state management for interactive selection
- Fixed API documentation to match actual component props

### Documentation
- Added data-driven demo example
- Complete API tables for all props including `selectedKeys`, `defaultSelectedKeys`, `openKeys`, `defaultOpenKeys`, `onSelect`, `onOpenChange`
- Documented both compound and data-driven patterns

## v0.12.11 (2025-12-07)

## Changes

### Splitter
- Implement collapsible panels with `collapsible`, `collapsed`, `defaultCollapsed`, and `onCollapse` props
- Add `resizable` prop to disable resizing for specific panels
- Support per-panel `defaultSize` and `size` props
- Add new examples: Collapsible Panels, Non-Resizable Panel

### Space
- Add `split` prop for separator elements between children
- Add `justify` example to documentation

### Removed
- Remove redundant `Stack` component (use `Flex` or `Space` instead)

## v0.12.10 (2025-12-07)

## Changes

### Hero
- Simplified API: removed compound components (Hero.Content, Hero.Overlay)
- New `contentClassName` prop for styling the content wrapper
- New `overlay` boolean prop for background overlay effect

### Masonry
- Rewrote with true masonry layout (shortest-column-first placement)
- Items now flow left-to-right in reading order
- Fixed gap prop to accept any pixel value
- Added interactive Dynamic Items demo

## v0.12.9 (2025-12-07)

## Masonry Component Rewrite

- Rewrote Masonry to use true masonry layout (shortest-column-first placement)
- Items now flow left-to-right in reading order (Pinterest-style)
- Fixed gap prop to accept any pixel value
- Fixed responsive breakpoints to use viewport width
- Added interactive Dynamic Items demo with add/remove functionality
- Updated documentation

## v0.12.8 (2025-12-06)

## Changes

### Footer
- Simplified Basic Footer example (no nav wrapper needed)
- Synced demo code with example code

### Grid
- Added 120-column mode documentation and example
- Added missing API props (cols, justify, align, order)
- Changed default gutter from 0 to 16px
- Fixed gutter calculation using negative margin + padding technique
- Added default span (full width) when not specified

### Flex
- Synced markdown docs with astro examples

## v0.12.7 (2025-12-06)

## What's Changed

### FloatButton.Group Improvements
- Add `mainAction` prop for main action button that replaces trigger when open
- Add `onMainAction` click handler for main action button  
- Add `showClose` prop to show close button when open
- Use DaisyUI's fab classes (`fab`, `fab-flower`, `fab-main-action`, `fab-close`)
- Update demos to use FloatButton.Group component instead of raw HTML

### Dependencies
- Upgrade daisyui to 5.5.8
- Upgrade tailwindcss to 4.1.17

## v0.12.6 (2025-12-06)

## Dropdown Component Enhancements

- **Controlled mode**: Added `open` and `onOpenChange` props for external state control
- **Disabled state**: Added `disabled` prop to prevent dropdown from opening
- **Arrow indicator**: Added `arrow` prop to show pointer from menu to trigger
- **Z-index fix**: Increased z-index to prevent menu being clipped by other elements
- **Documentation**: Fixed prop names (position/align instead of placement), added missing examples

## Site Fixes

- Removed `overflow-hidden` from all component example cards (93 files)
- Fixes floating elements (dropdowns, tooltips, popovers, selects) being clipped in documentation examples

## v0.12.5 (2025-12-06)

## New Features

### Button Component Enhancements
- **icon**: New prop for automatic icon placement with proper spacing
- **iconPosition**: Control icon position (`start` or `end`)
- **danger**: Boolean shorthand for destructive action styling
- **round**: New shape value for pill-shaped buttons

## Bug Fixes
- Fixed link-buttons demo mismatch between docs and implementation

## v0.12.4 (2025-12-06)

## Bug Fixes

- **Mask**: Fix class interpolation issue causing shapes not to display correctly
- **Kbd**: Fix class interpolation issue for size variants
- **Modal**: Add missing `width`, `centered`, and `onClose` props that were documented but not implemented

## v0.12.3 (2025-12-06)

Remove Calendar component (third-party library had CSS theming issues)

## v0.12.2 (2025-12-06)

## New Component

- **Calendar** - Month and week calendar views with DaisyUI theme integration
  - `Calendar.Month` - Full month view with events
  - `Calendar.Week` - Weekly view with time slots
  - Automatic dark/light mode theming
  - Support for events, locales (en, fr), and click callbacks
  - Wraps [@vinctus/calendar](https://github.com/vinctustech/calendar)

## v0.12.1 (2025-12-06)

Form: add advanced features and fix Radio.Group onChange

- Add labelWidth prop to Form for configurable horizontal layout label widths (default 60px)
- Add tooltip, extra, hasFeedback, dependencies, validateTrigger, initialValue, hidden props to Form.Item
- Add Form.ErrorList component for consolidated error display
- Add Form.useForm hook for programmatic form control
- Fix Radio.Group onChange to pass event object with target.value
- Fix field dependencies infinite loop issue
- Update all form examples to use Modal.success instead of console.log

## v0.12.0 (2025-12-05)

## New Components

- **TextRotate** - Animated text that cycles through multiple options with customizable duration
- **Diff** - Side-by-side comparison with interactive resizer

## Improvements

- **Anchor** - Improved scroll spy with bottom detection, working scroll container demos
- **Countdown** - Fixed digit padding with --digits:2, improved callback demo
- **Kbd** - New keyboard key display component

## Changes

- Diff: renamed `item1`/`item2` props to `left`/`right`

## v0.11.0 (2025-12-05)

## Changes

- Add Tour component with spotlight highlighting and step navigation
- Add Tour documentation page with interactive examples
- Refactor Segmented to compound components (Segmented.Item)
- Add OTPInput, Segmented, Tour to README component lists
- Replace inline SVGs with heroicons throughout demos
- Configure tag-based documentation deployment

## New Components

- **Segmented** - Inline toggle for switching between mutually exclusive options
- **Tour** - Guided tour with spotlight highlighting and step navigation

## New Hooks

- **useBreakpoint** - Detect current breakpoint and screen width
- **useClickOutside** - Detect clicks outside an element
- **useClipboard** - Copy text to clipboard
- **useDebounce** - Debounce a value
- **useDisclosure** - Manage open/close state
- **useHover** - Detect hover state
- **useKeyPress** - Detect key presses
- **useLocalStorage** - Persist state to localStorage
- **usePrevious** - Track previous value
- **useWindowSize** - Track window dimensions

## v0.10.3 (2025-12-04)

## Changes

- Rebrand from BloomUI to AsterUI
- Update all URLs to asterui.com
- Update GitHub repository references
- Improve SEO meta tags

## v0.10.2 (2025-12-02)

Fix Input component width handling for flex layouts

- Removed hardcoded w-full from Input component (users add via className when needed)
- Changed bordered handling: only adds border-0 when bordered=false (DaisyUI v5 has borders by default)
- Updated documentation

## v0.10.1 (2025-12-02)

## Responsive Utilities

New components and hook for building responsive layouts:

- **Show** - Conditionally render content based on breakpoint (`above`, `below`, `at`, `between`)
- **Hide** - Conditionally hide content based on breakpoint
- **useBreakpoint** - Hook returning `breakpoint`, `width`, `isAbove()`, `isBelow()`, `isAt()`, `isBetween()`

### Example

```tsx
import { Show, Hide, useBreakpoint } from '@edadma/bloomui'

// Show only on desktop
<Show above="lg">
  <DesktopNav />
</Show>

// Hide on mobile
<Hide below="md">
  <Sidebar />
</Hide>

// Programmatic access
const { breakpoint, isAbove } = useBreakpoint()
```

### Other Changes

- Updated llms.txt with absolute URLs for AI assistant compatibility

## v0.10.0 (2025-12-02)

## What's New

### Form Array-based Validation Rules
Form.Item now supports array-based validation rules for cleaner, more readable validation:

```tsx
<Form.Item
  name="password"
  label="Password"
  rules={[
    { required: true },
    { min: 8, message: 'At least 8 characters' },
    { pattern: /[A-Z]/, message: 'Needs uppercase letter' },
  ]}
>
  <Input type="password" />
</Form.Item>
```

### Landing Page Improvements
- Consistent code blocks with copy buttons
- Icon buttons for npm and GitHub links
- Streamlined content

### Other Changes
- Updated all README examples with login form showcase
- Fully tree-shakable (documented in features)

## v0.9.0 (2025-11-30)

## What's New

- **Code component** - Renamed from CodeMockup, with new `highlight` prop for Code.Line
- **ContextMenu component** - Right-click context menu
- **Countdown component** - Countdown timer display
- **OTPInput component** - One-time password input field

## Breaking Changes

- `CodeMockup` renamed to `Code`
- Removed deprecated `CalendarOld` and `Link` components

## v0.8.3 (2025-11-29)

## New Features

- **Button href support**: Button component now accepts `href` and `target` props. When `href` is provided, the button renders as an anchor element for proper link semantics (following the Ant Design pattern).

## Other Changes

- Added npm and GitHub links to docs navbar
- Updated ButtonPage with Link Buttons example

## v0.8.2 (2025-11-29)

## Fixes

- Fix Progress color variants not detected by Tailwind JIT
- Fix Range color classes using string interpolation
- Fix RadialProgress text color classes using string interpolation  
- Fix Typography line-clamp classes using string interpolation
- Fix Popconfirm button type classes using string interpolation
- Fix CalendarOld badge color classes using string interpolation
- Fix Space component dynamic gap using Tailwind arbitrary values

All components now use explicit class mappings instead of string interpolation, ensuring Tailwind JIT properly detects and includes the classes at build time.

## v0.8.1 (2025-11-29)

## Test-Friendly Component Updates

All components now support prop pass-through for better testing and customization:

### New Features
- **Full HTML attribute support**: All components extend `React.HTMLAttributes` for complete prop forwarding
- **Custom data attributes**: Pass `data-testid` and other `data-*` attributes via rest spread
- **State tracking**: Added `data-state` attributes for testing component states:
  - `Affix`: `data-state="affixed|normal"`
  - `QRCode`: `data-state="loading|expired|active"` 
  - `Result`: `data-status` attribute

### Technical Improvements
- Used `Omit` pattern to avoid TypeScript conflicts with built-in HTML attributes
- Components are now test-friendly like Radix UI and Headless UI
- Enables easier integration with testing libraries (React Testing Library, Playwright, etc.)

### Components Updated
All 80+ components received prop pass-through support.

## v0.8.0 (2025-11-26)

## New Components

- **Affix** - Make elements stick to viewport when scrolling
- **FloatButton** - Floating action button with BackTop variant
- **Chart** - Data visualization with ApexCharts and automatic daisyUI theme integration

## Improvements

- Chart component reads daisyUI CSS variables directly and converts oklch colors to hex
- All new component documentation pages have complete runnable code examples

## v0.7.0 (2025-11-26)

## New Features

- **Input Masking** - Added `mask` prop to Input component for formatted input
  - Use `#` for digits, `A` for letters, `*` for alphanumeric
  - Examples: phone `(###) ###-####`, credit card `#### #### #### ####`, date `##/##/####`
  - Customizable placeholder character with `maskPlaceholder` prop

## New Components (from v0.6.0)

- **Mention** - Input with @mention support for tagging users
- **Splitter** - Resizable split panes for adjustable layouts
- **Mockup Components**:
  - Browser - Browser window mockup with URL bar
  - CodeMockup - Terminal-style code display
  - Phone - iPhone-style phone frame mockup
  - Window - OS-style window frame mockup

## Documentation

- Updated all READMEs with complete component lists
- Added input mask examples to Input documentation

## v0.6.0 (2025-11-25)

## New Components

- **Tree** - Hierarchical tree view with expand/collapse and selection
- **TreeSelect** - Tree selection dropdown for hierarchical data
- **Transfer** - Double-column transfer for moving items between lists

## Improvements

- Updated documentation with self-contained app examples for all new components
- Added version badge to docs navbar
- Clarified Badge vs Tag component usage
- Updated component lists in READMEs

## Full Component List

Now includes 70+ components across General, Actions, Data Entry, Data Display, Layout, Navigation, and Feedback categories.

## v0.5.0 (2025-11-24)

## New Components

- **Cascader** - Hierarchical selection from cascading dropdown columns
  - Multi-column dropdown for nested option selection
  - Click or hover expand trigger modes
  - Custom display render support
  - Multiple sizes (xs, sm, md, lg)
  - Disabled options support
  - Form integration

- **ColorPicker** - Color selection with picker panel and preset swatches
  - HSL-based color picker with visual interface
  - Hue slider for full color spectrum
  - Preset color swatches
  - Configurable modes: swatches only, picker only, or both
  - Form integration with hex value output

## Improvements

- **Modal** - Enhanced accessibility
  - Added aria-labelledby and aria-describedby attributes
  - Focus restoration on close

- **Form.Item** - Improved accessibility
  - Label/input association with htmlFor
  - Error messages linked with aria-describedby
  - aria-invalid state for validation errors

- **Dropdown** - Full keyboard navigation and ARIA support
  - Arrow keys, Enter/Space, Escape, Home/End navigation
  - Proper ARIA roles and states

## Full Changelog

https://github.com/edadma/petalui/compare/v0.4.6...v0.5.0

## v0.4.6 (2025-11-24)

## Improvements

- Make PageLayout text theme-aware by default
  - Added `text-base-content` class to ensure all text automatically adapts to the active DaisyUI theme
  - Component-specific text colors still override this default

## Full Changelog

https://github.com/edadma/petalui/compare/v0.4.5...v0.4.6

## v0.4.4 (2025-11-24)

## Bug Fixes

- Fix React bundling issue by externalizing `react-dom/client`
  - Modal and Notification components were causing React DOM to be bundled with the library
  - This was triggering React internals errors in consuming applications
  - Now properly externalizes `react-dom/client` in the build configuration

## Full Changelog

https://github.com/edadma/petalui/compare/v0.4.3...v0.4.4

## v0.4.3 (2025-11-23)

## Changes

- Enable tree-shaking with `sideEffects: false`
- Make react-hook-form a peer dependency to reduce bundle size and prevent duplicate dependencies

## Breaking Changes

Users now need to install `react-hook-form` as a peer dependency. With npm 7+, this will be installed automatically.

## v0.4.2 (2025-11-23)

## What's New

### Form Component Enhancements
- **Horizontal Layout Support**: Form.Item now supports `layout="horizontal"` for side-by-side label and input positioning with proper spacing (gap-4)
- **Improved Label Spacing**: Vertical layout labels now have better spacing (mb-2) between label and input for improved readability

### InputNumber Improvements
- **Block Prop**: Added `block` prop (defaults to `true`) for explicit width control
  - `block={true}`: Full-width (w-full) - ideal for form layouts
  - `block={false}`: Inline width (inline-block) - similar to Ant Design default
- **Form Integration**: InputNumber now properly fills container width in grid layouts

## Changes
- Form.tsx: Add horizontal layout support and improved label spacing
- InputNumber.tsx: Add block prop for width control
- package.json: Bump version to 0.4.2

Full Changelog: https://github.com/edadma/petalui/compare/v0.4.1...v0.4.2

## v0.4.1 (2025-11-23)

## Bug Fixes

- **Masonry** - Fixed Tailwind JIT compatibility by using static class mappings instead of string interpolation
- **Input** - Fixed `bordered={false}` prop to properly remove borders by adding `border-0` class
- **Documentation** - Fixed Masonry code examples to match rendered output
- **Documentation** - All component pages now use Masonry component for layout consistency

## Documentation

- Added back Responsive Columns example to Masonry documentation
- Refactored 50 documentation pages to use Masonry component

## v0.4.0 (2025-11-23)

## New Components

- **Masonry** - CSS columns-based masonry grid layout component
- **Descriptions** - Display multiple read-only fields in structured layouts with semi-compound API

## Enhancements

- **Avatar** - Simplified API with `src`, `size`, `shape`, and `status` props
- **Avatar.Group** - New component for displaying avatar groups with max overflow count

## Improvements

- Enhanced documentation pages with more examples
- Updated README with new components
- Fixed masonry examples with explicit height control

## v0.3.1 (2025-11-23)

## Features

### Grid System Enhancement

Added optional 120-column grid system alongside the existing 24-column grid for more precise layout control.

**Key improvements:**
- Row component now accepts `cols` prop with values `24` or `120` (defaults to `24`)
- Automatic gutter scaling for 120-column grids maintains consistent visual spacing
- Perfect for layouts requiring 5-column arrangements (e.g., 24/120 = 20% width)
- Fully compatible with existing 24-column grid code

**Example usage:**
```tsx
<Row cols={120} gutter={16}>
  <Col xs={60} md={24}>
    {/* xs: 60/120 = 50% (2 columns on mobile) */}
    {/* md: 24/120 = 20% (5 columns on desktop) */}
  </Col>
</Row>
```

See the job application example for a practical demonstration with a 5-column skills section.

## v0.3.0 (2025-11-23)

## New Features

- **Space Component**: Added new Space layout component for consistent spacing between elements
  - Supports vertical and horizontal direction
  - Five size options: xs, sm, md, lg, xl
  - Custom alignment and wrap options
  
## Updates

- Updated all documentation pages to use Space component
- Updated all example applications to use Space component
- Improved consistency across the entire codebase

## v0.2.0 (2025-11-22)

## Form Component Enhancements

- **Built-in Type Validators**: Added pre-configured validators for email, url, and number fields
- **Form Methods API**: Full programmatic control with `setFieldValue`, `getFieldValue`, `validateFields`, `resetFields`, and more
- **Form.List**: Dynamic field arrays for managing multiple entries (users, items, etc.)
- **Bug Fixes**: Fixed nested field path handling for proper state management

## Demo Improvements

- Replaced all `alert()` calls with Modal and notification components for better UX
- Consistent feedback patterns across all demo pages
- Enhanced notification examples showing callback functionality

## Documentation

- Updated README with all available components
- Added documentation for: Autocomplete, Range, TimePicker, Carousel, Chat, Image, Skeleton, Popconfirm, RadialProgress

## Installation

\`\`\`bash
npm install @edadma/petalui
# or
pnpm add @edadma/petalui
# or
yarn add @edadma/petalui
\`\`\`

View the live demo at: https://edadma.github.io/petalui

## v0.1.1 (2025-11-20)

## PetalUI v0.1.1

### Improvements

**Checkbox Component**
- Added children prop for inline labels - no more manual wrapper divs needed
- New API: `<Checkbox>Label text</Checkbox>`
- Added `Checkbox.Group` for managing multiple checkboxes
- Options prop to auto-generate checkboxes from array
- Cleaner, more intuitive API matching Ant Design pattern

### Example

Before:
```tsx
<div className="flex items-center gap-2">
  <Checkbox />
  <span>Remember me</span>
</div>
```

After:
```tsx
<Checkbox>Remember me</Checkbox>
```

### Demo
View live examples: https://edadma.github.io/petalui

## v0.1.0 (2025-11-20)

## PetalUI v0.1.0

Complete React component library built with DaisyUI and Tailwind CSS.

### Components (38 total)

**Actions (2)**
- Button, Dropdown

**Data Entry (10)**
- Checkbox, Fieldset, FileInput, Form, Input, Label, Radio, Rating, Select, Textarea, Toggle

**Data Display (9)**
- Avatar, Badge, Card, Collapse, List, Stats, Steps, Table, Timeline

**Layout (6)**
- Divider, Drawer, Footer, Grid, Hero, Join

**Navigation (5)**
- Breadcrumbs, Link, Menu, Navbar, Tabs

**Feedback (6)**
- Alert, Loading, Modal, Notification, Progress, Tooltip

### Highlights
- 24-column responsive grid system
- Toast notification system with auto-dismiss
- Imperative Modal and Notification APIs
- Form integration with React Hook Form
- Comprehensive TypeScript support
- All components built on DaisyUI styling

### Demo
View live examples: https://edadma.github.io/petalui

## v0.0.3 (2025-11-19)

## What's New

### Form System
- **Form** component with React Hook Form integration and automatic validation
- **Input** component supporting all HTML input types (text, email, password, number, date, etc.)
- **Checkbox** component with sizes, colors, and indeterminate state support
- Form.Item wrapper with automatic label, validation, and error handling
- No layout shift when validation errors appear/disappear

### Component Improvements
- **Button**: Added `htmlType` prop for submit/button/reset (follows Ant Design pattern)
- **Input**: Added `w-full` by default for proper form layout
- **Menu**: Refactored to composite pattern (Menu.Item, Menu.Title)
- **Dropdown**: Refactored to composite pattern (Dropdown.Trigger, Dropdown.Menu, Dropdown.Item)

### Navigation & Routing
- React Router integration for client-side navigation
- Each component page has its own URL route
- Browser back/forward navigation support
- Organized navigation: Actions, Data Entry, Data Display, Navigation, Feedback

### Documentation
- Updated READMEs with all new components organized by category
- Added Prerequisites section with Tailwind CSS v4 setup instructions
- Form example in usage section
- Comprehensive demo pages for all components

### Components Available
Badge, Button, Card, Checkbox, Drawer, Dropdown, Form, Input, Loading, Menu, Navbar, Table

### Demo
https://edadma.github.io/petalui

