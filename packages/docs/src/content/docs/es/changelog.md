---
title: Registro de Cambios
description: Todos los cambios notables de AsterUI
---

# Registro de Cambios

Todos los cambios notables de AsterUI están documentados aquí.


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
