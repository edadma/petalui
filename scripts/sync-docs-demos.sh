#!/bin/bash

# Sync demo files from docs/ to docs-old/
# Copies all *Demo.tsx files and fixes imports for prefixed packages

SRC="packages/docs/src/components"
DEST="packages/docs-old/src/components"

# Find all Demo files in docs
for file in "$SRC"/*Demo.tsx; do
  if [ -f "$file" ]; then
    filename=$(basename "$file")

    # Skip Demo.tsx - it's the wrapper component, not a demo file
    if [ "$filename" = "Demo.tsx" ]; then
      continue
    fi
    echo "Syncing $filename..."

    # Copy the file
    cp "$file" "$DEST/$filename"

    # Fix imports for prefixed packages (only actual import statements, not @example-imports directives)
    sed -i "/^import/s/from 'asterui'/from '@aster-ui\/prefixed'/g" "$DEST/$filename"
    sed -i "/^import/s/from \"asterui\"/from \"@aster-ui\/prefixed\"/g" "$DEST/$filename"
    sed -i "/^import/s/@aster-ui\/icons'/@aster-ui\/icons-prefixed'/g" "$DEST/$filename"
    sed -i "/^import/s/@aster-ui\/icons\"/@aster-ui\/icons-prefixed\"/g" "$DEST/$filename"
    sed -i "/^import/s/@aster-ui\/icons\/solid'/@aster-ui\/icons-prefixed\/solid'/g" "$DEST/$filename"
    sed -i "/^import/s/@aster-ui\/icons\/outline'/@aster-ui\/icons-prefixed\/outline'/g" "$DEST/$filename"
  fi
done

echo "Done! Synced demo files to docs-old/"
