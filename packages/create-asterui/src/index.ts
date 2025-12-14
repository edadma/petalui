#!/usr/bin/env node

import * as p from '@clack/prompts'
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import pc from 'picocolors'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const DAISYUI_THEMES = [
  'light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate',
  'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween', 'garden',
  'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 'wireframe', 'black',
  'luxury', 'dracula', 'cmyk', 'autumn', 'business', 'acid', 'lemonade',
  'night', 'coffee', 'winter', 'dim', 'nord', 'sunset'
]

const THEME_PRESETS = ['light-dark', 'business', 'all']

const ICON_LIBRARIES = [
  { value: '@aster-ui/icons', label: '@aster-ui/icons', hint: 'Heroicons with size tokens', version: '^0.1.0' },
  { value: '@heroicons/react', label: 'Heroicons', hint: '300+ icons, outline/solid', version: '^2.2.0' },
  { value: 'lucide-react', label: 'Lucide', hint: 'popular, 1400+ icons', version: '^0.500.0' },
  { value: 'react-icons', label: 'React Icons', hint: 'multiple icon sets', version: '^5.4.0' },
  { value: '@phosphor-icons/react', label: 'Phosphor', hint: '9000+ icons, 6 weights', version: '^2.1.0' },
  { value: 'none', label: 'None', hint: 'skip icon library' },
]

type PackageManager = 'npm' | 'pnpm' | 'yarn'

interface CliArgs {
  projectName?: string
  language?: 'ts' | 'js'
  themes?: string
  pm?: PackageManager
  help?: boolean
}

function parseArgs(): CliArgs {
  const args = process.argv.slice(2)
  const result: CliArgs = {}

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg === '--help' || arg === '-h') {
      result.help = true
    } else if (arg === '--js') {
      result.language = 'js'
    } else if (arg === '--ts') {
      result.language = 'ts'
    } else if (arg === '--themes' && args[i + 1]) {
      result.themes = args[++i]
    } else if (arg === '--pm' && args[i + 1]) {
      const pm = args[++i]
      if (pm === 'npm' || pm === 'pnpm' || pm === 'yarn') {
        result.pm = pm
      }
    } else if (!arg.startsWith('-') && !result.projectName) {
      result.projectName = arg
    }
  }

  return result
}

function showHelp() {
  console.log(`
${pc.bold('create-asterui')} - Scaffold a new AsterUI project

${pc.bold('Usage:')}
  npm create asterui [project-name] [options]

${pc.bold('Options:')}
  --js              Use JavaScript instead of TypeScript
  --ts              Use TypeScript (default)
  --themes <preset> Theme preset: light-dark, business, all
  --pm <manager>    Package manager: npm, pnpm, yarn
  -h, --help        Show this help message

${pc.bold('Examples:')}
  npm create asterui
  npm create asterui my-app
  npm create asterui my-app --js
  npm create asterui my-app --themes business
  npm create asterui my-app --js --themes all --pm pnpm
`)
}

function detectPackageManager(): PackageManager {
  const userAgent = process.env.npm_config_user_agent || ''
  if (userAgent.includes('pnpm')) return 'pnpm'
  if (userAgent.includes('yarn')) return 'yarn'
  return 'npm'
}

function getRunCommand(pm: PackageManager): string {
  return pm === 'npm' ? 'npm run' : pm
}

async function main() {
  const cliArgs = parseArgs()

  if (cliArgs.help) {
    showHelp()
    process.exit(0)
  }

  console.log()
  p.intro(pc.bgCyan(pc.black(' create-asterui ')))

  const detectedPm = detectPackageManager()

  const options = await p.group(
    {
      projectName: () =>
        cliArgs.projectName
          ? Promise.resolve(cliArgs.projectName)
          : p.text({
              message: 'Project name',
              placeholder: 'my-asterui-app',
              defaultValue: 'my-asterui-app',
              validate: (value) => {
                if (!value) return 'Project name is required'
                if (!/^[a-z0-9-]+$/.test(value)) return 'Project name must be lowercase with hyphens only'
                if (fs.existsSync(value)) return `Directory "${value}" already exists`
              },
            }),

      language: () =>
        cliArgs.language
          ? Promise.resolve(cliArgs.language)
          : p.select({
              message: 'Language',
              options: [
                { value: 'ts', label: 'TypeScript', hint: 'recommended' },
                { value: 'js', label: 'JavaScript' },
              ],
            }),

      themePreset: () =>
        cliArgs.themes && THEME_PRESETS.includes(cliArgs.themes)
          ? Promise.resolve(cliArgs.themes)
          : p.select({
              message: 'Themes',
              options: [
                { value: 'light-dark', label: 'Light/Dark', hint: 'recommended' },
                { value: 'business', label: 'Business/Corporate' },
                { value: 'all', label: 'All themes' },
                { value: 'custom', label: 'Choose specific...' },
              ],
            }),

      customThemes: ({ results }) =>
        results.themePreset === 'custom'
          ? p.multiselect({
              message: 'Select themes',
              options: DAISYUI_THEMES.map((t) => ({ value: t, label: t })),
              initialValues: ['light', 'dark'],
              required: true,
            })
          : Promise.resolve([]),

      packageManager: () =>
        cliArgs.pm
          ? Promise.resolve(cliArgs.pm)
          : p.select({
              message: 'Package manager',
              options: [
                { value: detectedPm, label: detectedPm, hint: 'detected' },
                ...(['npm', 'pnpm', 'yarn'] as const)
                  .filter((pm) => pm !== detectedPm)
                  .map((pm) => ({ value: pm, label: pm })),
              ],
            }),

      optionalDeps: () =>
        p.multiselect({
          message: 'Optional components (require extra dependencies)',
          options: [
            { value: 'chart', label: 'Chart', hint: 'apexcharts' },
            { value: 'qrcode', label: 'QRCode', hint: 'qrcode' },
            { value: 'virtuallist', label: 'VirtualList', hint: '@tanstack/react-virtual' },
          ],
          required: false,
        }),

      iconLibrary: () =>
        p.select({
          message: 'Icon library',
          initialValue: '@aster-ui/icons',
          options: ICON_LIBRARIES,
        }),
    },
    {
      onCancel: () => {
        p.cancel('Operation cancelled.')
        process.exit(0)
      },
    }
  )

  const s = p.spinner()
  s.start('Creating project...')

  const projectDir = path.resolve(process.cwd(), options.projectName)
  const templateDir = path.join(__dirname, '..', 'templates', options.language as string)

  // Create project directory
  fs.mkdirSync(projectDir, { recursive: true })
  fs.mkdirSync(path.join(projectDir, 'src'), { recursive: true })

  // Copy template files
  copyDir(templateDir, projectDir)

  // Generate package.json
  const packageJson = generatePackageJson(
    options.projectName,
    options.language as string,
    options.optionalDeps as string[],
    options.iconLibrary as string
  )
  fs.writeFileSync(path.join(projectDir, 'package.json'), JSON.stringify(packageJson, null, 2))

  // Generate index.css with theme config
  const themes = getThemes(options.themePreset as string, options.customThemes as string[])
  const cssContent = generateCss(themes)
  fs.writeFileSync(path.join(projectDir, 'src', 'index.css'), cssContent)

  s.stop('Project created!')

  const pm = options.packageManager as PackageManager

  // Run install
  s.start('Installing dependencies...')
  await runInstall(pm, projectDir)
  s.stop('Dependencies installed!')

  p.note(
    `cd ${options.projectName}\n${getRunCommand(pm)} dev`,
    'Next steps'
  )

  p.outro(pc.green('Happy coding!'))
}

function runInstall(pm: PackageManager, cwd: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const cmd = pm === 'npm' ? 'npm' : pm
    const args = pm === 'yarn' ? [] : ['install']
    const child = spawn(cmd, args, { cwd, stdio: 'ignore' })
    child.on('close', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`Install failed with code ${code}`))
    })
    child.on('error', reject)
  })
}

function copyDir(src: string, dest: string) {
  const entries = fs.readdirSync(src, { withFileTypes: true })
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true })
      copyDir(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

function generatePackageJson(name: string, language: string, optionalDeps: string[] = [], iconLibrary: string = 'none') {
  const isTs = language === 'ts'

  const pkg: Record<string, unknown> = {
    name,
    private: true,
    version: '0.0.0',
    type: 'module',
    scripts: {
      dev: 'vite',
      build: isTs ? 'tsc -b && vite build' : 'vite build',
      preview: 'vite preview',
    },
    dependencies: {
      asterui: '^0.12.0',
      react: '^19.0.0',
      'react-dom': '^19.0.0',
      'react-hook-form': '^7.0.0',
    } as Record<string, string>,
    devDependencies: {
      '@tailwindcss/vite': '^4.1.0',
      '@vitejs/plugin-react': '^5.1.0',
      daisyui: '^5.0.0',
      tailwindcss: '^4.1.0',
      vite: '^7.0.0',
    } as Record<string, string>,
  }

  // Add icon library
  const deps = pkg.dependencies as Record<string, string>
  if (iconLibrary !== 'none') {
    const iconLib = ICON_LIBRARIES.find(lib => lib.value === iconLibrary)
    if (iconLib && iconLib.version) {
      deps[iconLibrary] = iconLib.version
    }
  }

  // Add optional dependencies
  if (optionalDeps.includes('chart')) {
    deps['apexcharts'] = '^5.0.0'
  }
  if (optionalDeps.includes('qrcode')) {
    deps['qrcode'] = '^1.5.0'
  }
  if (optionalDeps.includes('virtuallist')) {
    deps['@tanstack/react-virtual'] = '^3.0.0'
  }

  if (isTs) {
    const devDeps = pkg.devDependencies as Record<string, string>
    devDeps['typescript'] = '^5.6.0'
    devDeps['@types/react'] = '^19.0.0'
    devDeps['@types/react-dom'] = '^19.0.0'
    if (optionalDeps.includes('qrcode')) {
      devDeps['@types/qrcode'] = '^1.5.0'
    }
  }

  return pkg
}

function getThemes(preset: string, customThemes: string[]): string[] {
  switch (preset) {
    case 'light-dark':
      return ['light', 'dark']
    case 'business':
      return ['corporate', 'business']
    case 'all':
      return []
    case 'custom':
      return customThemes
    default:
      return ['light', 'dark']
  }
}

function generateCss(themes: string[]): string {
  let daisyPlugin: string
  if (themes.length === 0) {
    // All themes
    daisyPlugin = '@plugin "daisyui";'
  } else if (themes.length === 2 && (
    (themes[0] === 'light' && themes[1] === 'dark') ||
    (themes[0] === 'corporate' && themes[1] === 'business')
  )) {
    // Light/dark pair with prefersDark
    daisyPlugin = `@plugin "daisyui" {
  themes: ${themes[0]} --default, ${themes[1]} --prefersDark;
}`
  } else {
    // Custom selection
    daisyPlugin = `@plugin "daisyui" {
  themes: ${themes.join(', ')};
}`
  }

  return `@import "tailwindcss";
${daisyPlugin}
@source "../node_modules/asterui";
`
}

main().catch(console.error)
