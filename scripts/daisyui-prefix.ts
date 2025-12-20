#!/usr/bin/env npx tsx

/**
 * Simplified DaisyUI Class Prefixer
 *
 * This script prefixes DaisyUI classes that are defined as dXxx variables.
 * It's much simpler and more reliable than parsing all string literals.
 *
 * Pattern matched:
 *   const dAlert = 'alert'        -> const dAlert = 'aui-alert'
 *   const dBtnPrimary = 'btn-primary' -> const dBtnPrimary = 'aui-btn-primary'
 *
 * Usage:
 *   npx tsx scripts/daisyui-prefix.ts --prefix "aui-" --dir packages/asterui/src
 *   npx tsx scripts/daisyui-prefix.ts --unprefix "aui-" --dir packages/asterui/src
 *   npx tsx scripts/daisyui-prefix.ts --prefix "aui-" --dir packages/asterui/src --dry-run
 */

import * as fs from "fs";
import * as path from "path";

interface Options {
  prefix: string;
  mode: "prefix" | "unprefix";
  dryRun: boolean;
  verbose: boolean;
}

interface TransformResult {
  file: string;
  changes: Array<{
    line: number;
    before: string;
    after: string;
  }>;
}


/**
 * Transform a single file
 */
function transformFile(filePath: string, options: Options): TransformResult | null {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  const changes: TransformResult["changes"] = [];
  let modified = false;

  const transformedLines = lines.map((line, index) => {
    let newLine = line;

    // Match: const dXxx = 'class-name'
    // Pattern: const followed by space, then d followed by uppercase letter and word chars,
    // then = and a single-quoted string
    const daisyVarPattern = /^(\s*const\s+d[A-Z]\w*\s*=\s*)'([^']+)'(.*)$/;
    const match = line.match(daisyVarPattern);

    if (match) {
      const [, before, value, after] = match;

      if (options.mode === "prefix") {
        if (value.startsWith("--")) {
          // CSS variable: --value → --d-value
          const varName = value.slice(2);
          const prefixWithoutTrailingDash = options.prefix.replace(/-$/, "");
          const prefixedVar = `--${prefixWithoutTrailingDash}-${varName}`;
          if (value !== prefixedVar) {
            newLine = `${before}'${prefixedVar}'${after}`;
          }
        } else {
          // Class name: alert → d-alert, hover:bg-primary → hover:d-bg-primary
          // Handle pseudo-class prefixes (hover:, focus:, group-hover:, etc.)
          const colonIndex = value.lastIndexOf(':');
          if (colonIndex !== -1) {
            const pseudoPrefix = value.slice(0, colonIndex + 1);
            const utility = value.slice(colonIndex + 1);
            if (!utility.startsWith(options.prefix.replace(/-$/, ''))) {
              const prefixedClass = pseudoPrefix + options.prefix + utility;
              newLine = `${before}'${prefixedClass}'${after}`;
            }
          } else if (!value.startsWith(options.prefix)) {
            const prefixedClass = options.prefix + value;
            newLine = `${before}'${prefixedClass}'${after}`;
          }
        }
      } else {
        if (value.startsWith("--")) {
          // CSS variable: --d-value → --value
          const prefixWithoutTrailingDash = options.prefix.replace(/-$/, "");
          const expectedPrefix = `--${prefixWithoutTrailingDash}-`;
          if (value.startsWith(expectedPrefix)) {
            const unprefixedVar = `--${value.slice(expectedPrefix.length)}`;
            newLine = `${before}'${unprefixedVar}'${after}`;
          }
        } else {
          // Class name: d-alert → alert, hover:d-bg-primary → hover:bg-primary
          const colonIndex = value.lastIndexOf(':');
          if (colonIndex !== -1) {
            const pseudoPrefix = value.slice(0, colonIndex + 1);
            const utility = value.slice(colonIndex + 1);
            if (utility.startsWith(options.prefix)) {
              const unprefixedClass = pseudoPrefix + utility.slice(options.prefix.length);
              newLine = `${before}'${unprefixedClass}'${after}`;
            }
          } else if (value.startsWith(options.prefix)) {
            const unprefixedClass = value.slice(options.prefix.length);
            newLine = `${before}'${unprefixedClass}'${after}`;
          }
        }
      }
    }

    if (newLine !== line) {
      modified = true;
      changes.push({
        line: index + 1,
        before: line,
        after: newLine,
      });
    }

    return newLine;
  });

  if (!modified) {
    return null;
  }

  if (!options.dryRun) {
    fs.writeFileSync(filePath, transformedLines.join("\n"), "utf-8");
  }

  return {
    file: filePath,
    changes,
  };
}

/**
 * Recursively find all files matching given extensions
 */
function findFiles(
  dir: string,
  extensions: string[],
  ignore: string[] = ["node_modules", "dist", ".git"]
): string[] {
  const results: string[] = [];

  function walk(currentDir: string) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        if (!ignore.includes(entry.name)) {
          walk(fullPath);
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).slice(1);
        if (extensions.includes(ext)) {
          results.push(fullPath);
        }
      }
    }
  }

  walk(dir);
  return results;
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);

  let prefix = "";
  let mode: "prefix" | "unprefix" = "prefix";
  let dir = ".";
  let dryRun = false;
  let verbose = false;
  const extensions = ["tsx", "ts"];

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--prefix":
        mode = "prefix";
        prefix = args[++i];
        break;
      case "--unprefix":
        mode = "unprefix";
        prefix = args[++i];
        break;
      case "--dir":
        dir = args[++i];
        break;
      case "--dry-run":
        dryRun = true;
        break;
      case "--verbose":
        verbose = true;
        break;
      case "--help":
        console.log(`
Simplified DaisyUI Class Prefixer

This script only prefixes DaisyUI classes defined as dXxx variables:
  const dAlert = 'alert'  ->  const dAlert = 'aui-alert'

Usage:
  npx tsx scripts/daisyui-prefix.ts [options]

Options:
  --prefix <prefix>   Add prefix to classes (e.g., --prefix "aui-")
  --unprefix <prefix> Remove prefix from classes
  --dir <directory>   Directory to process (default: ".")
  --dry-run           Preview changes without writing files
  --verbose           Show detailed output
  --help              Show this help message

Examples:
  npx tsx scripts/daisyui-prefix.ts --prefix "aui-" --dir packages/asterui/src
  npx tsx scripts/daisyui-prefix.ts --unprefix "aui-" --dir packages/asterui/src --dry-run
`);
        process.exit(0);
    }
  }

  if (!prefix) {
    console.error("Error: --prefix or --unprefix is required");
    process.exit(1);
  }

  const options: Options = {
    prefix,
    mode,
    dryRun,
    verbose,
  };

  console.log(`\nSimplified DaisyUI Class ${mode === "prefix" ? "Prefixer" : "Unprefixer"}`);
  console.log(`Prefix: "${prefix}"`);
  console.log(`Directory: ${dir}`);
  console.log(`Mode: ${dryRun ? "DRY RUN" : "WRITE"}\n`);

  const files = findFiles(dir, extensions);
  console.log(`Found ${files.length} files to process\n`);

  let totalChanges = 0;
  let filesChanged = 0;

  for (const file of files) {
    const result = transformFile(file, options);
    if (result) {
      filesChanged++;
      totalChanges += result.changes.length;

      console.log(`${result.file}`);
      if (verbose) {
        for (const change of result.changes) {
          console.log(`  Line ${change.line}:`);
          console.log(`  - ${change.before.trim()}`);
          console.log(`  + ${change.after.trim()}`);
        }
      } else {
        console.log(`  ${result.changes.length} line(s) changed`);
      }
      console.log("");
    }
  }

  console.log("----------------------------------------");
  console.log(`Summary: ${filesChanged} files, ${totalChanges} changes`);
  if (dryRun) {
    console.log("(dry run - no files were modified)");
  }
}

main();
