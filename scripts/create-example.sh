#!/bin/bash

# Script to create a new example app with all boilerplate
# Usage: ./scripts/create-example.sh <app-name>

if [ -z "$1" ]; then
  echo "Usage: ./scripts/create-example.sh <app-name>"
  exit 1
fi

APP_NAME=$1
APP_DIR="packages/examples/$APP_NAME"

if [ -d "$APP_DIR" ]; then
  echo "Error: $APP_DIR already exists"
  exit 1
fi

echo "Creating example app: $APP_NAME"

# Create directory structure
mkdir -p "$APP_DIR/src"

# Create package.json
cat > "$APP_DIR/package.json" << 'EOF'
{
  "name": "APP_NAME_PLACEHOLDER",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@edadma/bloomui": "workspace:*",
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.1.17",
    "@types/react": "^19.2.2",
    "@types/react-dom": "^19.2.2",
    "@vitejs/plugin-react": "^5.1.0",
    "daisyui": "^5.5.5",
    "tailwindcss": "^4.1.17",
    "typescript": "~5.9.3",
    "vite": "^7.2.2"
  }
}
EOF

sed -i "s/APP_NAME_PLACEHOLDER/$APP_NAME/g" "$APP_DIR/package.json"

# Create vite.config.ts
cat > "$APP_DIR/vite.config.ts" << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
EOF

# Create tsconfig.json
cat > "$APP_DIR/tsconfig.json" << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}
EOF

# Create tailwind.config.js
cat > "$APP_DIR/tailwind.config.js" << 'EOF'
import daisyui from 'daisyui'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../bloomui/src/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [daisyui],
  daisyui: {
    themes: ['light', 'dark'],
  },
}
EOF

# Create index.html
TITLE=$(echo $APP_NAME | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++)sub(/./,toupper(substr($i,1,1)),$i)}1')

cat > "$APP_DIR/index.html" << EOF
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>$TITLE</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF

# Create src/index.css
cat > "$APP_DIR/src/index.css" << 'EOF'
@config "../tailwind.config.js";
@import "tailwindcss";
@plugin "daisyui" {
  themes: all;
}
EOF

# Create src/main.tsx
cat > "$APP_DIR/src/main.tsx" << 'EOF'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
EOF

# Create src/vite-env.d.ts
cat > "$APP_DIR/src/vite-env.d.ts" << 'EOF'
/// <reference types="vite/client" />
EOF

# Create src/App.tsx
cat > "$APP_DIR/src/App.tsx" << EOF
import { Navbar, ThemeController } from '@edadma/bloomui'

function App() {
  return (
    <>
      <Navbar
        className="bg-base-100 shadow-lg"
        start={<a className="text-xl font-bold">$TITLE</a>}
        end={<ThemeController.Swap />}
      />

      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">$TITLE</h1>
          <p>Start building your example here...</p>
        </div>
      </div>
    </>
  )
}

export default App
EOF

echo "✓ Created $APP_DIR"
echo ""
echo "Next steps:"
echo "  1. cd $APP_DIR"
echo "  2. Edit src/App.tsx"
echo "  3. pnpm install (from root)"
echo "  4. pnpm --filter $APP_NAME dev"
