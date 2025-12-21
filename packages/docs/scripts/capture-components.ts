/**
 * Capture component screenshots and GIFs for the overview page.
 *
 * Usage:
 *   pnpm dev  # or use live site
 *   npx tsx scripts/capture-components.ts [component-name]
 *
 * Examples:
 *   npx tsx scripts/capture-components.ts          # Capture all
 *   npx tsx scripts/capture-components.ts button   # Capture just button
 */

import { chromium } from 'playwright'
import { existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import { execSync } from 'child_process'

const BASE_URL = process.env.BASE_URL || 'https://asterui.com'
const OUTPUT_DIR = join(import.meta.dirname, '../public/components')

// Animation config: duration in ms, frames, and playback fps
// The key is to match real animation speed - capture at real-time, play back at real-time
interface AnimationConfig {
  duration: number   // Total capture duration in ms
  frames: number     // Number of frames to capture
  fps: number        // Playback framerate (frames / (duration/1000) for 1:1 speed)
}

const ANIMATED_COMPONENTS: Record<string, AnimationConfig> = {
  // Carousel: autoplaySpeed=2000 (2s per slide), capture 3 slides
  'carousel': { duration: 6000, frames: 30, fps: 5 },
  // Countdown: 1 second per digit, 10fps for smooth + real-time
  'countdown': { duration: 5000, frames: 50, fps: 10 },
  // Loading: continuous spin, 10fps
  'loading': { duration: 2000, frames: 20, fps: 10 },
  // Text rotate: ~2 seconds per text, capture 2 rotations at 30fps
  'textrotate': { duration: 4000, frames: 120, fps: 30 },
}

// Configure which demo to capture and any setup actions
interface DemoConfig {
  demo?: number           // Which demo (1-indexed, default 1)
  selector?: string       // Custom selector instead of demo index
  click?: string          // Selector to click before capturing
  wait?: number           // Extra wait time after click (ms)
  captureArea?: boolean   // Capture the whole demo area (for dropdowns, popovers, etc.)
  padding?: string        // Add padding to demo area (for overflow elements like badges)
  center?: boolean        // Center content in demo area
}

const DEMO_CONFIG: Record<string, DemoConfig> = {
  'badge': { demo: 1, captureArea: true, padding: '1.5rem 0.5rem 0.5rem 0.5rem' },  // BasicDemo with padding for overflow
  'card': { demo: 2 },
  'carousel': { demo: 2 },  // AutoplayDemo with autoplaySpeed={2000}
  'collapse': { click: '.collapse-title' },
  'countdown': { captureArea: true, padding: '0.5rem', center: true },
  // These components have floating elements that are hard to capture cleanly
  // Just show them in their closed/default state
}

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

async function getComponentElement(page: any, slug: string) {
  const config = DEMO_CONFIG[slug] || {}

  // Hide demo area backgrounds, apply custom padding/centering if configured
  const padding = config.padding || '0'
  const centerStyles = config.center ? 'display: flex !important; justify-content: center !important; align-items: center !important;' : ''
  await page.addStyleTag({
    content: `
      .demo-area {
        background: transparent !important;
        background-image: none !important;
        padding: ${padding} !important;
        ${centerStyles}
      }
    `
  })

  let demoArea
  if (config.selector) {
    // Custom selector
    demoArea = await page.$(config.selector)
  } else {
    // Get nth demo area (1-indexed, default 1)
    const index = (config.demo || 1) - 1
    const demoAreas = await page.$$('.demo-area')
    demoArea = demoAreas[index]
  }

  if (!demoArea) return null

  // Click to activate if configured
  if (config.click) {
    const clickTarget = await demoArea.$(config.click)
    if (clickTarget) {
      await clickTarget.click()
      await page.waitForTimeout(config.wait || 300)
    }
  }

  // Return the demo area or its first child based on config
  if (config.captureArea) {
    return demoArea
  }
  return await demoArea.$(':scope > *')
}

async function captureComponent(page: any, slug: string, theme: 'light' | 'dark') {
  const url = `${BASE_URL}/components/${slug}`

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 })
    await page.waitForSelector('.demo-area', { timeout: 10000 })

    // Set theme
    await page.evaluate((t: string) => {
      document.documentElement.setAttribute('data-theme', t)
    }, theme)

    // Wait for theme to apply
    await page.waitForTimeout(100)

    const component = await getComponentElement(page, slug)
    if (!component) {
      return false
    }

    const suffix = theme === 'dark' ? '-dark' : ''
    const outputPath = join(OUTPUT_DIR, `${slug}${suffix}.png`)

    await component.screenshot({
      path: outputPath,
      type: 'png',
      omitBackground: true,
    })

    return true
  } catch (err: any) {
    console.error(`  ✗ Error (${theme}):`, err.message)
    return false
  }
}

async function captureAnimatedComponent(page: any, slug: string, theme: 'light' | 'dark', config: AnimationConfig) {
  const url = `${BASE_URL}/components/${slug}`
  const { duration, frames, fps } = config

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 })
    await page.waitForSelector('.demo-area', { timeout: 10000 })

    // Set theme
    await page.evaluate((t: string) => {
      document.documentElement.setAttribute('data-theme', t)
    }, theme)
    await page.waitForTimeout(100)

    const component = await getComponentElement(page, slug)
    if (!component) {
      return false
    }

    const suffix = theme === 'dark' ? '-dark' : ''
    const frameDir = join(OUTPUT_DIR, `${slug}${suffix}-frames`)
    if (!existsSync(frameDir)) {
      mkdirSync(frameDir, { recursive: true })
    }

    const interval = duration / frames
    const startTime = Date.now()
    for (let i = 0; i < frames; i++) {
      await component.screenshot({
        path: join(frameDir, `frame-${String(i).padStart(3, '0')}.png`),
        type: 'png',
        omitBackground: true,
      })
      await page.waitForTimeout(interval)
    }
    const actualDuration = Date.now() - startTime

    // Calculate fps based on actual elapsed time for 1:1 real-time playback
    const realFps = Math.round(frames / (actualDuration / 1000) * 100) / 100

    // Convert to GIF with calculated fps for real-time playback
    const gifPath = join(OUTPUT_DIR, `${slug}${suffix}.gif`)
    try {
      execSync(`ffmpeg -y -framerate ${realFps} -i "${frameDir}/frame-%03d.png" -vf "palettegen" "${frameDir}/palette.png"`, { stdio: 'pipe' })
      execSync(`ffmpeg -y -framerate ${realFps} -i "${frameDir}/frame-%03d.png" -i "${frameDir}/palette.png" -lavfi "paletteuse" "${gifPath}"`, { stdio: 'pipe' })
      // Clean up frames
      execSync(`rm -rf "${frameDir}"`, { stdio: 'pipe' })
    } catch {
      console.log(`    (ffmpeg not available, frames saved to ${frameDir})`)
    }

    return true
  } catch (err: any) {
    console.error(`  ✗ Error (${theme}):`, err.message)
    return false
  }
}

async function main() {
  const args = process.argv.slice(2).filter(a => !a.startsWith('--'))
  const targetComponent = args[0]
  const darkOnly = process.argv.includes('--dark')
  const lightOnly = process.argv.includes('--light')
  const themes: ('light' | 'dark')[] = darkOnly ? ['dark'] : lightOnly ? ['light'] : ['light', 'dark']

  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 1400, height: 800 },
  })
  const page = await context.newPage()

  const componentsToCapture = targetComponent
    ? [targetComponent]
    : COMPONENTS

  let success = 0
  let failed = 0

  for (const slug of componentsToCapture) {
    const animConfig = ANIMATED_COMPONENTS[slug]

    for (const theme of themes) {
      process.stdout.write(`Capturing ${slug} (${theme})... `)

      const result = animConfig
        ? await captureAnimatedComponent(page, slug, theme, animConfig)
        : await captureComponent(page, slug, theme)

      if (result) {
        console.log('✓')
        success++
      } else {
        console.log('✗')
        failed++
      }
    }
  }

  await browser.close()

  console.log(`\nDone! ${success} captured, ${failed} failed`)
  console.log(`Images saved to: ${OUTPUT_DIR}`)
}

main().catch(console.error)
