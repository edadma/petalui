/**
 * Capture component screenshots and GIFs for the overview page.
 *
 * Usage:
 *   pnpm add -D playwright
 *   npx playwright install chromium
 *   pnpm dev  # Start dev server first
 *   npx tsx scripts/capture-components.ts [component-name]
 *
 * Examples:
 *   npx tsx scripts/capture-components.ts          # Capture all
 *   npx tsx scripts/capture-components.ts button   # Capture just button
 */

import { chromium } from 'playwright'
import { existsSync, mkdirSync } from 'fs'
import { join } from 'path'

const BASE_URL = process.env.BASE_URL || 'https://asterui.com'
const OUTPUT_DIR = join(import.meta.dirname, '../public/components')

// Components that need GIF capture (animated)
const ANIMATED_COMPONENTS = new Set([
  'carousel',
  'countdown',
  'textrotate',
  'loading',
])

// All components
const COMPONENTS = [
  'button', 'copybutton', 'dropdown', 'floatbutton',
  'avatar', 'badge', 'card', 'carousel', 'chart', 'chat', 'collapse',
  'countdown', 'descriptions', 'diff', 'empty', 'hovergallery', 'image',
  'list', 'virtuallist', 'monthcalendar', 'popover', 'qrcode', 'stat',
  'status', 'table', 'tag', 'timeline', 'tooltip', 'tree', 'weekcalendar',
  'autocomplete', 'cascader', 'checkbox', 'colorpicker', 'datepicker',
  'fieldset', 'fileinput', 'filter', 'form', 'input', 'inputnumber',
  'mention', 'otpinput', 'radio', 'range', 'rating', 'richtexteditor',
  'segmented', 'select', 'textarea', 'timepicker', 'toggle', 'transfer',
  'treeselect', 'upload',
  'alert', 'drawer', 'loading', 'message', 'modal', 'notification',
  'popconfirm', 'progress', 'radialprogress', 'result', 'skeleton',
  'anchor', 'breadcrumb', 'command', 'contextmenu', 'dock', 'menu',
  'navbar', 'pagination', 'responsivedrawer', 'steps', 'tabs',
  'container', 'divider', 'flex', 'footer', 'grid', 'hero', 'join',
  'layout', 'masonry', 'responsive', 'space', 'splitter',
  'affix', 'browser', 'code', 'configprovider', 'kbd', 'mask', 'phone',
  'textrotate', 'themecontroller', 'tour', 'typography', 'watermark', 'window',
]

async function captureComponent(page: any, slug: string) {
  const url = `${BASE_URL}/components/${slug}`
  console.log(`Capturing ${slug}...`)

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 })
    await page.waitForSelector('.demo-area', { timeout: 10000 })

    // Hide the demo area background to get transparent screenshots
    await page.addStyleTag({
      content: `
        .demo-area {
          background: transparent !important;
          background-image: none !important;
          padding: 0 !important;
        }
      `
    })

    // Find the first demo area and get its first child (the actual component)
    const demoArea = await page.$('.demo-area')
    if (!demoArea) {
      console.log(`  No demo area found for ${slug}, skipping`)
      return false
    }

    // Get the first meaningful child element (skip text nodes)
    const component = await demoArea.$(':scope > *')
    if (!component) {
      console.log(`  No component found in demo area for ${slug}, skipping`)
      return false
    }

    const outputPath = join(OUTPUT_DIR, `${slug}.png`)

    // Capture with transparent background
    await component.screenshot({
      path: outputPath,
      type: 'png',
      omitBackground: true,
    })

    console.log(`  ✓ Saved ${slug}.png`)
    return true
  } catch (err: any) {
    console.error(`  ✗ Error capturing ${slug}:`, err.message)
    return false
  }
}

async function captureAnimatedComponent(page: any, slug: string, frames = 20, duration = 2000) {
  const url = `${BASE_URL}/components/${slug}`
  console.log(`Capturing animated ${slug}...`)

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 })
    await page.waitForSelector('.demo-area', { timeout: 10000 })

    await page.addStyleTag({
      content: `
        .demo-area {
          background: transparent !important;
          background-image: none !important;
          padding: 0 !important;
        }
      `
    })

    const demoArea = await page.$('.demo-area')
    if (!demoArea) {
      console.log(`  No demo area found for ${slug}, skipping`)
      return false
    }

    const component = await demoArea.$(':scope > *')
    if (!component) {
      console.log(`  No component found for ${slug}, skipping`)
      return false
    }

    // Capture multiple frames
    const frameDir = join(OUTPUT_DIR, `${slug}-frames`)
    if (!existsSync(frameDir)) {
      mkdirSync(frameDir, { recursive: true })
    }

    const interval = duration / frames
    for (let i = 0; i < frames; i++) {
      await component.screenshot({
        path: join(frameDir, `frame-${String(i).padStart(3, '0')}.png`),
        type: 'png',
        omitBackground: true,
      })
      await page.waitForTimeout(interval)
    }

    console.log(`  ✓ Captured ${frames} frames for ${slug}`)
    console.log(`    Convert to GIF: ffmpeg -framerate 10 -i ${frameDir}/frame-%03d.png -vf "palettegen" palette.png && ffmpeg -framerate 10 -i ${frameDir}/frame-%03d.png -i palette.png -lavfi "paletteuse" ${OUTPUT_DIR}/${slug}.gif`)
    return true
  } catch (err: any) {
    console.error(`  ✗ Error capturing ${slug}:`, err.message)
    return false
  }
}

async function main() {
  const targetComponent = process.argv[2]

  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 800, height: 600 },
  })
  const page = await context.newPage()

  // Set light theme
  await page.addInitScript(() => {
    document.documentElement.setAttribute('data-theme', 'light')
  })

  const componentsToCapture = targetComponent
    ? [targetComponent]
    : COMPONENTS

  let success = 0
  let failed = 0

  for (const slug of componentsToCapture) {
    const isAnimated = ANIMATED_COMPONENTS.has(slug)
    const result = isAnimated
      ? await captureAnimatedComponent(page, slug)
      : await captureComponent(page, slug)

    if (result) success++
    else failed++
  }

  await browser.close()

  console.log(`\nDone! ${success} captured, ${failed} failed`)
  console.log(`Images saved to: ${OUTPUT_DIR}`)
}

main().catch(console.error)
