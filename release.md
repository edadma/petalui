# Release Checklist

Follow these steps in order when creating a new release.

## Pre-release Checks

- [ ] Ensure you're on the `main` branch
- [ ] Pull latest changes: `git pull`
- [ ] Ensure working directory is clean: `git status`
- [ ] Verify build passes: `pnpm build`

## Release Steps

### 1. Bump Version

Edit `packages/asterui/package.json` and increment the patch version (e.g., `0.12.58` → `0.12.59`).

### 2. Sync Prefixed Package

```bash
pnpm sync-prefixed
```

This copies the source to the prefixed package and applies the DaisyUI class prefix.

### 3. Verify Build

```bash
pnpm build
```

Ensure there are no TypeScript or build errors.

### 4. Update Changelog

Edit `packages/asterui/CHANGELOG.md` and add an entry for the new version with a summary of changes.

### 4a. Update Docs (if components changed)

If components were added/removed:

**README.md** (root):
- Update component counts ("100+ components", "101 components")

**packages/docs/public/llms.txt**:
- Update component count in the Overview section
- Add/remove components from the appropriate category list

### 5. Commit Changes

```bash
git add -A
git commit -m "Bump version to X.Y.Z"
```

### 6. Push to Remote

```bash
git push
```

### 7. Create GitHub Release

```bash
gh release create vX.Y.Z --title "vX.Y.Z" --notes "Release notes here"
```

Or create via GitHub web UI at https://github.com/edadma/asterui/releases/new

## Post-release

- [ ] Verify the release appears on GitHub
- [ ] Verify npm package is published (if CI handles this)

## Common Issues

### Forgot to update changelog before tagging

If you created a release but forgot the changelog:

1. Update the changelog
2. Commit and push the change
3. Move the tag to the new commit:
   ```bash
   git tag -d vX.Y.Z
   git push origin :refs/tags/vX.Y.Z
   gh release delete vX.Y.Z --yes
   gh release create vX.Y.Z --title "vX.Y.Z" --notes "Release notes"
   ```

### Build fails after version bump

If the build fails, fix the issue before committing. Don't commit a broken build.
