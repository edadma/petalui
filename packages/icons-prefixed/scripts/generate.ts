import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const srcDir = path.resolve(__dirname, '../src')

// Find heroicons in pnpm structure
function findHeroiconsPath(): string {
  const pnpmPath = path.resolve(__dirname, '../../../node_modules/.pnpm')
  const entries = fs.readdirSync(pnpmPath)
  const heroiconsDir = entries.find((e) => e.startsWith('@heroicons+react@'))
  if (!heroiconsDir) throw new Error('Could not find @heroicons/react in node_modules')
  return path.join(pnpmPath, heroiconsDir, 'node_modules/@heroicons/react')
}

const heroiconsPath = findHeroiconsPath()

// Extract path data from heroicons JS file
function extractPaths(jsContent: string): { d: string; fillRule?: string; clipRule?: string }[] {
  const paths: { d: string; fillRule?: string; clipRule?: string }[] = []
  // Match React.createElement("path", { ... })
  const pathRegex = /React\.createElement\("path",\s*\{([^}]+)\}/g
  let match
  while ((match = pathRegex.exec(jsContent)) !== null) {
    const propsStr = match[1]
    const dMatch = propsStr.match(/d:\s*"([^"]+)"/)
    if (dMatch) {
      const pathObj: { d: string; fillRule?: string; clipRule?: string } = { d: dMatch[1] }
      const fillRuleMatch = propsStr.match(/fillRule:\s*"([^"]+)"/)
      const clipRuleMatch = propsStr.match(/clipRule:\s*"([^"]+)"/)
      if (fillRuleMatch) pathObj.fillRule = fillRuleMatch[1]
      if (clipRuleMatch) pathObj.clipRule = clipRuleMatch[1]
      paths.push(pathObj)
    }
  }
  return paths
}

// Check if icon is outline style (has stroke attributes)
function isOutlineStyle(jsContent: string): boolean {
  return jsContent.includes('strokeWidth:') || jsContent.includes('stroke:')
}

// Get icon names from heroicons directory
function getIconNames(variant: 'outline' | 'solid'): string[] {
  const dir = path.join(heroiconsPath, '24', variant)
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.js'))
    .map((f) => f.replace('.js', ''))
    .sort()
}

// Generate a single icon component
function generateIconComponent(name: string, variant: 'outline' | 'solid'): string {
  const filePath = path.join(heroiconsPath, '24', variant, `${name}.js`)
  const content = fs.readFileSync(filePath, 'utf-8')
  const paths = extractPaths(content)
  const isOutline = variant === 'outline'

  const pathElements = paths
    .map((p) => {
      const attrs = [`d="${p.d}"`]
      if (p.fillRule) attrs.push(`fillRule="${p.fillRule}"`)
      if (p.clipRule) attrs.push(`clipRule="${p.clipRule}"`)
      if (isOutline) {
        attrs.push('strokeLinecap="round"')
        attrs.push('strokeLinejoin="round"')
      }
      return `      <path ${attrs.join(' ')} />`
    })
    .join('\n')

  const svgAttrs = isOutline
    ? 'fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"'
    : 'viewBox="0 0 24 24" fill="currentColor"'

  return `export const ${name} = createIcon(
  ({ size, className, style }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      ${svgAttrs}
      className={className}
      style={{ width: size, height: size, ...style }}
      aria-hidden="true"
    >
${pathElements}
    </svg>
  ),
  '${name}'
)`
}

// Generate variant file with all icons
function generateVariantFile(variant: 'outline' | 'solid'): string {
  const iconNames = getIconNames(variant)
  const components = iconNames.map((name) => generateIconComponent(name, variant)).join('\n\n')

  return `// Auto-generated from Heroicons (MIT License)
// https://heroicons.com
import { createIcon } from '../createIcon'

${components}
`
}

function generateMainIndex(): string {
  return `// Auto-generated - do not edit
// Re-exports outline as default
export * from './outline'
export type { IconProps, IconSize } from './types'
export { sizeMap } from './types'
export { IconSizeContext, useIconSize } from './context'
`
}

function generateVariantIndex(variant: 'outline' | 'solid'): string {
  return `// Auto-generated - do not edit
export * from './${variant}'
`
}

// Ensure directories exist
fs.mkdirSync(path.join(srcDir, 'outline'), { recursive: true })
fs.mkdirSync(path.join(srcDir, 'solid'), { recursive: true })

// Generate files
const outlineNames = getIconNames('outline')
const solidNames = getIconNames('solid')

fs.writeFileSync(path.join(srcDir, 'outline', 'outline.tsx'), generateVariantFile('outline'))
fs.writeFileSync(path.join(srcDir, 'solid', 'solid.tsx'), generateVariantFile('solid'))
fs.writeFileSync(path.join(srcDir, 'outline', 'index.ts'), generateVariantIndex('outline'))
fs.writeFileSync(path.join(srcDir, 'solid', 'index.ts'), generateVariantIndex('solid'))
fs.writeFileSync(path.join(srcDir, 'index.ts'), generateMainIndex())

console.log(`Generated ${outlineNames.length} outline and ${solidNames.length} solid icons`)
