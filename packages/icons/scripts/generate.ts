import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const srcDir = path.resolve(__dirname, '../src')

// Dynamically get icon names from heroicons package
async function getIconNames(): Promise<string[]> {
  const outlineModule = await import('@heroicons/react/24/outline')
  return Object.keys(outlineModule)
    .filter((name) => name.endsWith('Icon'))
    .sort()
}

const iconNames = await getIconNames()

function generateVariantFile(variant: 'outline' | 'solid'): string {
  const importPath = variant === 'outline' ? '@heroicons/react/24/outline' : '@heroicons/react/24/solid'

  const imports = iconNames.map((name) => `import { ${name} as Hero${name} } from '${importPath}'`).join('\n')

  const exports = iconNames.map((name) => `export const ${name} = createIcon(Hero${name}, '${name}')`).join('\n')

  return `// Auto-generated - do not edit
import { createIcon } from '../createIcon'
${imports}

${exports}
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
fs.writeFileSync(path.join(srcDir, 'outline', `outline.ts`), generateVariantFile('outline'))
fs.writeFileSync(path.join(srcDir, 'solid', `solid.ts`), generateVariantFile('solid'))
fs.writeFileSync(path.join(srcDir, 'outline', 'index.ts'), generateVariantIndex('outline'))
fs.writeFileSync(path.join(srcDir, 'solid', 'index.ts'), generateVariantIndex('solid'))
fs.writeFileSync(path.join(srcDir, 'index.ts'), generateMainIndex())

console.log(`Generated ${iconNames.length} icon wrappers for outline and solid variants`)
