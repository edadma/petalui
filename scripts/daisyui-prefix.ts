#!/usr/bin/env npx tsx

/**
 * DaisyUI Class Prefixer/Unprefixer
 *
 * A script to reliably add or remove prefixes from DaisyUI classes in source files.
 *
 * Usage:
 *   npx tsx scripts/daisyui-prefix.ts --prefix "dui-" --dir packages/asterui/src
 *   npx tsx scripts/daisyui-prefix.ts --unprefix "dui-" --dir packages/asterui/src
 *   npx tsx scripts/daisyui-prefix.ts --prefix "dui-" --dir packages/asterui/src --dry-run
 *
 * Features:
 *   - Only transforms known DaisyUI classes (no false positives)
 *   - Handles responsive prefixes (sm:, md:, lg:, xl:, 2xl:)
 *   - Handles state modifiers (hover:, focus:, active:, etc.)
 *   - Handles string literals, template literals, and object keys
 *   - Dry-run mode to preview changes
 */

import * as fs from "fs";
import * as path from "path";

// Complete list of DaisyUI base classes (without modifiers)
// Generated from DaisyUI 5.5.8 CSS source
const DAISYUI_BASE_CLASSES = new Set([
  // Alert
  "alert",
  "alert-dash",
  "alert-error",
  "alert-horizontal",
  "alert-info",
  "alert-outline",
  "alert-soft",
  "alert-success",
  "alert-vertical",
  "alert-warning",

  // Avatar
  "avatar",
  "avatar-group",
  "avatar-offline",
  "avatar-online",
  "avatar-placeholder",

  // Badge
  "badge",
  "badge-accent",
  "badge-dash",
  "badge-error",
  "badge-ghost",
  "badge-info",
  "badge-lg",
  "badge-md",
  "badge-neutral",
  "badge-outline",
  "badge-primary",
  "badge-secondary",
  "badge-sm",
  "badge-soft",
  "badge-success",
  "badge-warning",
  "badge-xl",
  "badge-xs",

  // Breadcrumbs
  "breadcrumbs",

  // Button
  "btn",
  "btn-accent",
  "btn-active",
  "btn-block",
  "btn-circle",
  "btn-dash",
  "btn-disabled",
  "btn-error",
  "btn-ghost",
  "btn-info",
  "btn-lg",
  "btn-link",
  "btn-md",
  "btn-neutral",
  "btn-outline",
  "btn-primary",
  "btn-secondary",
  "btn-sm",
  "btn-soft",
  "btn-square",
  "btn-success",
  "btn-warning",
  "btn-wide",
  "btn-xl",
  "btn-xs",

  // Card
  "card",
  "card-actions",
  "card-body",
  "card-border",
  "card-dash",
  "card-lg",
  "card-md",
  "card-side",
  "card-sm",
  "card-title",
  "card-xl",
  "card-xs",
  "image-full",

  // Carousel
  "carousel",
  "carousel-center",
  "carousel-end",
  "carousel-horizontal",
  "carousel-item",
  "carousel-start",
  "carousel-vertical",

  // Chat
  "chat",
  "chat-bubble",
  "chat-bubble-accent",
  "chat-bubble-error",
  "chat-bubble-info",
  "chat-bubble-neutral",
  "chat-bubble-primary",
  "chat-bubble-secondary",
  "chat-bubble-success",
  "chat-bubble-warning",
  "chat-end",
  "chat-footer",
  "chat-header",
  "chat-image",
  "chat-start",

  // Checkbox
  "checkbox",
  "checkbox-accent",
  "checkbox-error",
  "checkbox-info",
  "checkbox-lg",
  "checkbox-md",
  "checkbox-neutral",
  "checkbox-primary",
  "checkbox-secondary",
  "checkbox-sm",
  "checkbox-success",
  "checkbox-warning",
  "checkbox-xl",
  "checkbox-xs",

  // Collapse
  "collapse",
  "collapse-arrow",
  "collapse-arrow-end",
  "collapse-close",
  "collapse-content",
  "collapse-open",
  "collapse-plus",
  "collapse-title",

  // Countdown
  "countdown",

  // Diff
  "diff",
  "diff-item-1",
  "diff-item-2",
  "diff-resizer",

  // Divider
  "divider",
  "divider-accent",
  "divider-end",
  "divider-error",
  "divider-horizontal",
  "divider-info",
  "divider-neutral",
  "divider-primary",
  "divider-secondary",
  "divider-start",
  "divider-success",
  "divider-vertical",
  "divider-warning",

  // Dock
  "dock",
  "dock-active",
  "dock-label",
  "dock-lg",
  "dock-md",
  "dock-sm",
  "dock-xl",
  "dock-xs",

  // Drawer
  "drawer",
  "drawer-button",
  "drawer-content",
  "drawer-end",
  "drawer-open",
  "drawer-overlay",
  "drawer-side",
  "drawer-toggle",

  // Dropdown
  "dropdown",
  "dropdown-bottom",
  "dropdown-center",
  "dropdown-close",
  "dropdown-content",
  "dropdown-end",
  "dropdown-hover",
  "dropdown-left",
  "dropdown-open",
  "dropdown-right",
  "dropdown-start",
  "dropdown-top",

  // Fab
  "fab",
  "fab-close",
  "fab-flower",
  "fab-main-action",

  // Fieldset
  "fieldset",
  "fieldset-label",
  "fieldset-legend",

  // File Input
  "file-input",
  "file-input-accent",
  "file-input-error",
  "file-input-ghost",
  "file-input-info",
  "file-input-lg",
  "file-input-md",
  "file-input-neutral",
  "file-input-primary",
  "file-input-secondary",
  "file-input-sm",
  "file-input-success",
  "file-input-warning",
  "file-input-xl",
  "file-input-xs",

  // Filter
  "filter",
  "filter-reset",

  // Floating Label
  "floating-label",

  // Footer
  "footer",
  "footer-center",
  "footer-horizontal",
  "footer-title",
  "footer-vertical",

  // Glass
  "glass",

  // Hero
  "hero",
  "hero-content",
  "hero-overlay",

  // Hover effects
  "hover-3d",
  "hover-gallery",

  // Indicator
  "indicator",
  "indicator-bottom",
  "indicator-center",
  "indicator-end",
  "indicator-item",
  "indicator-middle",
  "indicator-start",
  "indicator-top",

  // Input
  "input",
  "input-accent",
  "input-bordered",
  "input-disabled",
  "input-error",
  "input-ghost",
  "input-info",
  "input-lg",
  "input-md",
  "input-neutral",
  "input-primary",
  "input-secondary",
  "input-sm",
  "input-success",
  "input-warning",
  "input-xl",
  "input-xs",

  // Join
  "join",
  "join-horizontal",
  "join-item",
  "join-vertical",

  // Kbd
  "kbd",
  "kbd-lg",
  "kbd-md",
  "kbd-sm",
  "kbd-xl",
  "kbd-xs",

  // Label
  "label",

  // Link
  "link",
  "link-accent",
  "link-error",
  "link-hover",
  "link-info",
  "link-neutral",
  "link-primary",
  "link-secondary",
  "link-success",
  "link-warning",

  // List
  "list",
  "list-col-grow",
  "list-col-wrap",
  "list-row",

  // Loading
  "loading",
  "loading-ball",
  "loading-bars",
  "loading-dots",
  "loading-infinity",
  "loading-lg",
  "loading-md",
  "loading-ring",
  "loading-sm",
  "loading-spinner",
  "loading-xl",
  "loading-xs",

  // Mask
  "mask",
  "mask-circle",
  "mask-decagon",
  "mask-diamond",
  "mask-half-1",
  "mask-half-2",
  "mask-heart",
  "mask-hexagon",
  "mask-hexagon-2",
  "mask-pentagon",
  "mask-squircle",
  "mask-star",
  "mask-star-2",
  "mask-triangle",
  "mask-triangle-2",
  "mask-triangle-3",
  "mask-triangle-4",

  // Menu
  "menu",
  "menu-active",
  "menu-disabled",
  "menu-dropdown",
  "menu-dropdown-show",
  "menu-dropdown-toggle",
  "menu-focus",
  "menu-horizontal",
  "menu-lg",
  "menu-md",
  "menu-sm",
  "menu-title",
  "menu-vertical",
  "menu-xl",
  "menu-xs",

  // Mockup
  "mockup-browser",
  "mockup-browser-toolbar",
  "mockup-code",
  "mockup-phone",
  "mockup-phone-camera",
  "mockup-phone-display",
  "mockup-window",

  // Modal
  "modal",
  "modal-action",
  "modal-backdrop",
  "modal-bottom",
  "modal-box",
  "modal-end",
  "modal-middle",
  "modal-open",
  "modal-start",
  "modal-toggle",
  "modal-top",

  // Navbar
  "navbar",
  "navbar-center",
  "navbar-end",
  "navbar-start",

  // Progress
  "progress",
  "progress-accent",
  "progress-error",
  "progress-info",
  "progress-neutral",
  "progress-primary",
  "progress-secondary",
  "progress-success",
  "progress-warning",

  // Radial Progress
  "radial-progress",

  // Radio
  "radio",
  "radio-accent",
  "radio-error",
  "radio-info",
  "radio-lg",
  "radio-md",
  "radio-neutral",
  "radio-primary",
  "radio-secondary",
  "radio-sm",
  "radio-success",
  "radio-warning",
  "radio-xl",
  "radio-xs",

  // Range
  "range",
  "range-accent",
  "range-error",
  "range-info",
  "range-lg",
  "range-md",
  "range-neutral",
  "range-primary",
  "range-secondary",
  "range-sm",
  "range-success",
  "range-warning",
  "range-xl",
  "range-xs",

  // Rating
  "rating",
  "rating-half",
  "rating-hidden",
  "rating-lg",
  "rating-md",
  "rating-sm",
  "rating-xl",
  "rating-xs",

  // Rounded (DaisyUI utilities)
  "rounded-box",
  "rounded-field",
  "rounded-selector",
  "rounded-b-box",
  "rounded-b-field",
  "rounded-b-selector",
  "rounded-t-box",
  "rounded-t-field",
  "rounded-t-selector",
  "rounded-l-box",
  "rounded-l-field",
  "rounded-l-selector",
  "rounded-r-box",
  "rounded-r-field",
  "rounded-r-selector",
  "rounded-bl-box",
  "rounded-bl-field",
  "rounded-bl-selector",
  "rounded-br-box",
  "rounded-br-field",
  "rounded-br-selector",
  "rounded-tl-box",
  "rounded-tl-field",
  "rounded-tl-selector",
  "rounded-tr-box",
  "rounded-tr-field",
  "rounded-tr-selector",

  // Select
  "select",
  "select-accent",
  "select-bordered",
  "select-disabled",
  "select-error",
  "select-ghost",
  "select-info",
  "select-lg",
  "select-md",
  "select-neutral",
  "select-primary",
  "select-secondary",
  "select-sm",
  "select-success",
  "select-warning",
  "select-xl",
  "select-xs",

  // Skeleton
  "skeleton",
  "skeleton-text",

  // Stack
  "stack",
  "stack-bottom",
  "stack-end",
  "stack-start",
  "stack-top",

  // Stat
  "stat",
  "stat-actions",
  "stat-desc",
  "stat-figure",
  "stats",
  "stats-horizontal",
  "stats-vertical",
  "stat-title",
  "stat-value",

  // Status
  "status",
  "status-accent",
  "status-error",
  "status-info",
  "status-lg",
  "status-md",
  "status-neutral",
  "status-primary",
  "status-secondary",
  "status-sm",
  "status-success",
  "status-warning",
  "status-xl",
  "status-xs",

  // Steps
  "step",
  "step-accent",
  "step-error",
  "step-icon",
  "step-info",
  "step-neutral",
  "step-primary",
  "steps",
  "step-secondary",
  "steps-horizontal",
  "step-success",
  "steps-vertical",
  "step-warning",

  // Swap
  "swap",
  "swap-active",
  "swap-flip",
  "swap-indeterminate",
  "swap-off",
  "swap-on",
  "swap-rotate",

  // Tab
  "tab",
  "tab-active",
  "tab-content",
  "tab-disabled",
  "tabs",
  "tabs-border",
  "tabs-bottom",
  "tabs-box",
  "tabs-lg",
  "tabs-lift",
  "tabs-md",
  "tabs-sm",
  "tabs-top",
  "tabs-xl",
  "tabs-xs",

  // Table
  "table",
  "table-lg",
  "table-md",
  "table-pin-cols",
  "table-pin-rows",
  "table-sm",
  "table-xl",
  "table-xs",
  "table-zebra",

  // Textarea
  "textarea",
  "textarea-accent",
  "textarea-bordered",
  "textarea-error",
  "textarea-ghost",
  "textarea-info",
  "textarea-lg",
  "textarea-md",
  "textarea-neutral",
  "textarea-primary",
  "textarea-secondary",
  "textarea-sm",
  "textarea-success",
  "textarea-warning",
  "textarea-xl",
  "textarea-xs",

  // Text Rotate
  "text-rotate",

  // Timeline
  "timeline",
  "timeline-box",
  "timeline-compact",
  "timeline-end",
  "timeline-horizontal",
  "timeline-middle",
  "timeline-snap-icon",
  "timeline-start",
  "timeline-vertical",

  // Toast
  "toast",
  "toast-bottom",
  "toast-center",
  "toast-end",
  "toast-middle",
  "toast-start",
  "toast-top",

  // Toggle
  "toggle",
  "toggle-accent",
  "toggle-error",
  "toggle-info",
  "toggle-lg",
  "toggle-md",
  "toggle-neutral",
  "toggle-primary",
  "toggle-secondary",
  "toggle-sm",
  "toggle-success",
  "toggle-warning",
  "toggle-xl",
  "toggle-xs",

  // Tooltip
  "tooltip",
  "tooltip-accent",
  "tooltip-bottom",
  "tooltip-content",
  "tooltip-error",
  "tooltip-info",
  "tooltip-left",
  "tooltip-neutral",
  "tooltip-open",
  "tooltip-primary",
  "tooltip-right",
  "tooltip-secondary",
  "tooltip-success",
  "tooltip-top",
  "tooltip-warning",

  // Validator
  "validator",
  "validator-hint",

  // Calendar (DaisyUI's calendar component)
  "cally",
]);

// DaisyUI CSS custom properties that get set via JavaScript
// These need to be prefixed when they appear in style objects
const DAISYUI_CSS_VARIABLES = new Set([
  // Countdown
  "--value",
  "--digits",
  // Radial Progress
  "--size",
  "--thickness",
]);

// Tailwind responsive prefixes
const RESPONSIVE_PREFIXES = ["sm", "md", "lg", "xl", "2xl"];

// Tailwind state/variant modifiers (non-exhaustive but covers common ones)
const STATE_MODIFIERS = [
  "hover",
  "focus",
  "active",
  "disabled",
  "visited",
  "first",
  "last",
  "odd",
  "even",
  "group-hover",
  "group-focus",
  "focus-within",
  "focus-visible",
  "motion-safe",
  "motion-reduce",
  "dark",
  "print",
  "rtl",
  "ltr",
  "open",
  "checked",
  "indeterminate",
  "placeholder",
  "autofill",
  "required",
  "valid",
  "invalid",
  "in-range",
  "out-of-range",
  "read-only",
  "empty",
  "enabled",
  "default",
  "target",
  "has",
  "is",
  "where",
  "not",
  "before",
  "after",
  "first-letter",
  "first-line",
  "marker",
  "selection",
  "file",
  "backdrop",
  "placeholder-shown",
  "peer-hover",
  "peer-focus",
  "peer-checked",
  "peer-disabled",
  "peer-valid",
  "peer-invalid",
  "aria-checked",
  "aria-disabled",
  "aria-expanded",
  "aria-hidden",
  "aria-pressed",
  "aria-readonly",
  "aria-required",
  "aria-selected",
  "data-active",
  "data-disabled",
  "data-state-open",
  "data-state-closed",
  "supports",
  "max-sm",
  "max-md",
  "max-lg",
  "max-xl",
  "max-2xl",
  "min-sm",
  "min-md",
  "min-lg",
  "min-xl",
  "min-2xl",
  "contrast-more",
  "contrast-less",
  "portrait",
  "landscape",
];

interface TransformOptions {
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
 * Check if a class name is a DaisyUI class (optionally with modifiers)
 */
function isDaisyUIClass(className: string): boolean {
  // Handle responsive and state modifiers
  // e.g., "sm:btn-primary", "hover:btn-ghost", "sm:hover:btn-active"
  const parts = className.split(":");
  const baseClass = parts[parts.length - 1];

  // Check all other parts are valid modifiers
  for (let i = 0; i < parts.length - 1; i++) {
    const modifier = parts[i];
    const isResponsive = RESPONSIVE_PREFIXES.includes(modifier);
    const isState = STATE_MODIFIERS.some(
      (m) => modifier === m || modifier.startsWith(m + "-") || modifier.startsWith(m + "[")
    );
    const isArbitraryVariant = modifier.startsWith("[") && modifier.endsWith("]");
    if (!isResponsive && !isState && !isArbitraryVariant) {
      return false;
    }
  }

  return DAISYUI_BASE_CLASSES.has(baseClass);
}

/**
 * Check if a class name is a prefixed DaisyUI class
 */
function isPrefixedDaisyUIClass(className: string, prefix: string): boolean {
  const parts = className.split(":");
  const baseClass = parts[parts.length - 1];

  // Check all other parts are valid modifiers
  for (let i = 0; i < parts.length - 1; i++) {
    const modifier = parts[i];
    const isResponsive = RESPONSIVE_PREFIXES.includes(modifier);
    const isState = STATE_MODIFIERS.some(
      (m) => modifier === m || modifier.startsWith(m + "-") || modifier.startsWith(m + "[")
    );
    const isArbitraryVariant = modifier.startsWith("[") && modifier.endsWith("]");
    if (!isResponsive && !isState && !isArbitraryVariant) {
      return false;
    }
  }

  // Check if base class starts with prefix and the remainder is a valid DaisyUI class
  if (baseClass.startsWith(prefix)) {
    const unprefixed = baseClass.slice(prefix.length);
    return DAISYUI_BASE_CLASSES.has(unprefixed);
  }

  return false;
}

/**
 * Transform a single class name
 */
function transformClass(className: string, options: TransformOptions): string {
  const { prefix, mode } = options;
  const parts = className.split(":");
  const baseClass = parts[parts.length - 1];

  if (mode === "prefix") {
    if (isDaisyUIClass(className)) {
      parts[parts.length - 1] = prefix + baseClass;
      return parts.join(":");
    }
  } else {
    // unprefix mode
    if (isPrefixedDaisyUIClass(className, prefix)) {
      parts[parts.length - 1] = baseClass.slice(prefix.length);
      return parts.join(":");
    }
  }

  return className;
}

/**
 * Transform all classes in a space-separated class string
 */
function transformClassString(classString: string, options: TransformOptions): string {
  return classString
    .split(/\s+/)
    .map((cls) => transformClass(cls, options))
    .join(" ");
}

/**
 * Transform classes in file content
 * Handles various patterns:
 * - String literals: 'btn', "btn-primary"
 * - Template literals: `btn ${someVar}`
 * - className attributes
 * - Object keys in class mappings
 */
function transformFileContent(content: string, options: TransformOptions): string {
  const { prefix, mode } = options;

  // Build a regex that matches DaisyUI classes
  // We need to be careful to match whole words only
  const classesToMatch =
    mode === "prefix"
      ? Array.from(DAISYUI_BASE_CLASSES)
      : Array.from(DAISYUI_BASE_CLASSES).map((c) => prefix + c);

  // Sort by length (longest first) to avoid partial matches
  classesToMatch.sort((a, b) => b.length - a.length);

  // Create regex pattern for responsive/state prefixes followed by class
  const modifierPattern = `(?:(?:${[...RESPONSIVE_PREFIXES, ...STATE_MODIFIERS].join("|")})\\s*:\\s*)*`;

  let result = content;

  // Process each class
  for (const cls of classesToMatch) {
    // Escape special regex characters in class name
    const escapedClass = cls.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");

    // Pattern to match the class with optional modifiers, ensuring word boundaries
    // Match in various contexts:
    // 1. In string literals (single/double quotes)
    // 2. In template literals
    // 3. As object keys
    // 4. In arrays

    // We use a more sophisticated approach: find string contexts and transform within them

    // Match single-quoted strings
    result = result.replace(
      new RegExp(`'([^']*?)(${modifierPattern})(${escapedClass})([^']*?)'`, "g"),
      (match, before, modifiers, className, after) => {
        const newClass = mode === "prefix" ? prefix + className : className.slice(prefix.length);
        return `'${before}${modifiers}${newClass}${after}'`;
      }
    );

    // Match double-quoted strings
    result = result.replace(
      new RegExp(`"([^"]*?)(${modifierPattern})(${escapedClass})([^"]*?)"`, "g"),
      (match, before, modifiers, className, after) => {
        const newClass = mode === "prefix" ? prefix + className : className.slice(prefix.length);
        return `"${before}${modifiers}${newClass}${after}"`;
      }
    );

    // Match backtick template literals (simpler content, no nested templates)
    result = result.replace(
      new RegExp("`([^`]*?)(${modifierPattern})(${escapedClass})([^`]*?)`", "g"),
      (match, before, modifiers, className, after) => {
        const newClass = mode === "prefix" ? prefix + className : className.slice(prefix.length);
        return `\`${before}${modifiers}${newClass}${after}\``;
      }
    );
  }

  return result;
}

/**
 * Transform classes within a string (content between quotes)
 */
function transformStringContent(str: string, options: TransformOptions): string {
  const { prefix, mode } = options;

  // Build list of classes we're looking for
  const targetClasses =
    mode === "prefix"
      ? Array.from(DAISYUI_BASE_CLASSES)
      : Array.from(DAISYUI_BASE_CLASSES).map((c) => prefix + c);

  // Sort by length descending to match longer classes first
  targetClasses.sort((a, b) => b.length - a.length);

  // Build modifier prefix pattern (responsive + state variants)
  const modifierPrefixes = [...RESPONSIVE_PREFIXES, ...STATE_MODIFIERS];
  const modifierPattern = modifierPrefixes.map((m) => m.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");

  let result = str;

  for (const cls of targetClasses) {
    const escapedClass = cls.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Word boundary pattern for CSS classes:
    // - (?<![a-zA-Z0-9_.-]) - NOT preceded by word char, hyphen, or dot
    //   (dot would indicate method call like .filter() or CSS selector)
    // - ((?:(?:${modifierPattern}):)*) - Optional Tailwind modifiers
    // - (${escapedClass}) - The class name
    // - (?![a-zA-Z0-9_(]) - NOT followed by word char or ( (would be method call)
    // - (?!-[a-zA-Z]) - NOT followed by hyphen+letter (would be longer class)
    const pattern = new RegExp(
      `(?<![a-zA-Z0-9_.-])((?:(?:${modifierPattern}):)*)(${escapedClass})(?![a-zA-Z0-9_(])(?!-[a-zA-Z])`,
      "g"
    );

    result = result.replace(pattern, (match, modifiers, className) => {
      const newClass = mode === "prefix" ? prefix + className : className.slice(prefix.length);
      return modifiers + newClass;
    });
  }

  // Also transform DaisyUI CSS custom properties (e.g., '--value' → '--d-value')
  for (const cssVar of DAISYUI_CSS_VARIABLES) {
    const escapedVar = cssVar.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (mode === "prefix") {
      // Transform --value → --d-value (insert prefix after --)
      const pattern = new RegExp(`(${escapedVar})(?![a-zA-Z0-9-])`, "g");
      result = result.replace(pattern, `--${prefix.replace(/-$/, "")}-${cssVar.slice(2)}`);
    } else {
      // Transform --d-value → --value (remove prefix after --)
      const prefixedVar = `--${prefix.replace(/-$/, "")}-${cssVar.slice(2)}`;
      const escapedPrefixedVar = prefixedVar.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const pattern = new RegExp(`(${escapedPrefixedVar})(?![a-zA-Z0-9-])`, "g");
      result = result.replace(pattern, cssVar);
    }
  }

  return result;
}

/**
 * Find the end of a template literal, handling nested template literals in ${...}
 * Returns the index of the closing backtick, or -1 if not found
 */
function findTemplateLiteralEnd(content: string, startIndex: number): number {
  let i = startIndex + 1; // Skip opening backtick

  while (i < content.length) {
    const char = content[i];

    if (char === '\\') {
      // Escape sequence - skip next char
      i += 2;
      continue;
    }

    if (char === '`') {
      // Found closing backtick
      return i;
    }

    if (char === '$' && content[i + 1] === '{') {
      // Template expression - need to find matching }
      // Handle nested template literals inside the expression
      i += 2; // Skip ${
      let braceDepth = 1;

      while (i < content.length && braceDepth > 0) {
        const exprChar = content[i];

        if (exprChar === '\\') {
          i += 2;
          continue;
        }

        if (exprChar === '{') {
          braceDepth++;
        } else if (exprChar === '}') {
          braceDepth--;
        } else if (exprChar === '`') {
          // Nested template literal - recursively find its end
          const nestedEnd = findTemplateLiteralEnd(content, i);
          if (nestedEnd === -1) return -1;
          i = nestedEnd;
        } else if (exprChar === "'" || exprChar === '"') {
          // String inside expression - skip it
          const quote = exprChar;
          i++;
          while (i < content.length && content[i] !== quote) {
            if (content[i] === '\\') i++;
            i++;
          }
        }

        i++;
      }
      continue;
    }

    i++;
  }

  return -1; // Unclosed template literal
}

/**
 * Find all string literals in content (single, double, and template)
 * Returns array of [startIndex, endIndex, stringContent] tuples
 */
function findAllStrings(content: string): Array<[number, number, string]> {
  const strings: Array<[number, number, string]> = [];
  let i = 0;

  while (i < content.length) {
    const char = content[i];

    // Skip line comments
    if (char === '/' && content[i + 1] === '/') {
      while (i < content.length && content[i] !== '\n') i++;
      continue;
    }

    // Skip block comments
    if (char === '/' && content[i + 1] === '*') {
      i += 2;
      while (i < content.length - 1 && !(content[i] === '*' && content[i + 1] === '/')) i++;
      i += 2;
      continue;
    }

    // Single or double quoted string
    if (char === "'" || char === '"') {
      const quote = char;
      const start = i;
      i++;
      while (i < content.length && content[i] !== quote && content[i] !== '\n') {
        if (content[i] === '\\') i++;
        i++;
      }
      if (content[i] === quote) {
        strings.push([start, i, content.slice(start, i + 1)]);
      }
      i++;
      continue;
    }

    // Template literal
    if (char === '`') {
      const start = i;
      const end = findTemplateLiteralEnd(content, i);
      if (end !== -1) {
        strings.push([start, end, content.slice(start, end + 1)]);
        i = end + 1;
        continue;
      }
    }

    i++;
  }

  return strings;
}

/**
 * Check if a string looks like prose/text (not CSS classes)
 * Heuristic: contains capitalized words (other than at start after space)
 */
function looksLikeProseText(str: string): boolean {
  // If string contains a capital letter after a lowercase letter or space, it's likely prose
  // e.g., "Clear input", "Hello World", "Click Here"
  // But not: "btn btn-primary", "alert-info"
  return /[a-z]\s+[A-Z]|^[A-Z][a-z]/.test(str);
}

/**
 * Process a template literal's inner content, handling ${...} expressions recursively
 */
function processTemplateLiteralInner(inner: string, options: TransformOptions): string {
  let result = '';
  let i = 0;

  while (i < inner.length) {
    if (inner[i] === '\\') {
      // Escape sequence - preserve as-is
      result += inner[i] + (inner[i + 1] || '');
      i += 2;
      continue;
    }

    if (inner[i] === '$' && inner[i + 1] === '{') {
      // Find matching closing brace, handling nested braces and template literals
      let braceCount = 1;
      let j = i + 2;

      while (j < inner.length && braceCount > 0) {
        if (inner[j] === '\\') {
          j += 2;
          continue;
        }
        if (inner[j] === '{') {
          braceCount++;
        } else if (inner[j] === '}') {
          braceCount--;
        } else if (inner[j] === '`') {
          // Nested template literal - find its end
          j++;
          let nestedDepth = 1;
          while (j < inner.length && nestedDepth > 0) {
            if (inner[j] === '\\') {
              j += 2;
              continue;
            }
            if (inner[j] === '`') {
              nestedDepth--;
            } else if (inner[j] === '$' && inner[j + 1] === '{') {
              // Nested expression in nested template - track braces
              let nestedBraces = 1;
              j += 2;
              while (j < inner.length && nestedBraces > 0) {
                if (inner[j] === '\\') j += 2;
                else if (inner[j] === '{') nestedBraces++;
                else if (inner[j] === '}') nestedBraces--;
                else if (inner[j] === '`') {
                  // Recurse for deeply nested templates - just skip to end for now
                  j++;
                  let depth = 1;
                  while (j < inner.length && depth > 0) {
                    if (inner[j] === '\\') j++;
                    else if (inner[j] === '`') depth--;
                    j++;
                  }
                  continue;
                }
                else j++;
              }
              continue;
            }
            j++;
          }
          continue;
        } else if (inner[j] === "'" || inner[j] === '"') {
          // String in expression - skip it
          const quote = inner[j];
          j++;
          while (j < inner.length && inner[j] !== quote) {
            if (inner[j] === '\\') j++;
            j++;
          }
        }
        j++;
      }

      // Extract and recursively process expression content
      const exprContent = inner.slice(i + 2, j - 1);
      const processedExpr = transformFileContentRobust(exprContent, options);
      result += '${' + processedExpr + '}';
      i = j;
    } else {
      // Static part - collect until next ${ or end
      let j = i;
      while (j < inner.length && !(inner[j] === '$' && inner[j + 1] === '{')) {
        if (inner[j] === '\\') j++; // Skip escaped char
        j++;
      }
      const staticPart = inner.slice(i, j);
      if (!looksLikeProseText(staticPart)) {
        result += transformStringContent(staticPart, options);
      } else {
        result += staticPart;
      }
      i = j;
    }
  }

  return result;
}

/**
 * Transform file content - processes single, double, and template strings
 */
function transformFileContentRobust(content: string, options: TransformOptions): string {
  // First pass: identify HTML/JSX attributes to skip (role=, aria-*, etc.)
  const skipAttrPattern = /(?:role|type|id|name|placeholder|title|alt|href|src|for|htmlFor|aria-\w+|data-\w+)\s*=\s*(?:(['"])[^'"]*\1|\{[^}]*\})/g;
  const skipRanges: Array<[number, number]> = [];

  let skipMatch;
  while ((skipMatch = skipAttrPattern.exec(content)) !== null) {
    skipRanges.push([skipMatch.index, skipMatch.index + skipMatch[0].length]);
  }

  const isInSkipRange = (index: number): boolean => {
    return skipRanges.some(([start, end]) => index >= start && index < end);
  };

  // Use the robust string finder instead of regex
  const strings = findAllStrings(content);

  // Process strings in reverse order to maintain correct indices
  let result = content;
  for (let idx = strings.length - 1; idx >= 0; idx--) {
    const [start, end, match] = strings[idx];

    // Skip if this string is part of a skipped attribute
    if (isInSkipRange(start)) {
      continue;
    }

    // Skip if on a line starting with 'export' (type definitions)
    const lineStart = content.lastIndexOf('\n', start) + 1;
    const lineEnd = content.indexOf('\n', start);
    const fullLine = content.slice(lineStart, lineEnd === -1 ? content.length : lineEnd);
    const linePrefix = content.slice(lineStart, start).trimStart();
    if (linePrefix.startsWith('export')) {
      continue;
    }

    // Skip if preceded by patterns that indicate non-CSS contexts
    // Use 1000 chars to capture enough context for multi-line objects with many properties
    const beforeMatch = content.slice(Math.max(0, start - 1000), start);
    if (/(\|\s*|\?\?\s*|testId\s*[=:]\s*|'aria-[^']+'\s*:\s*|'data-[^']+'\s*:\s*|\.?type\??\s*[=:]+\s*|[!=]==?\s*|action\s*:\s*|\$\{\s*)$/.test(beforeMatch)) {
      continue;
    }

    // Skip if followed by | (part of a union type)
    const afterMatch = content.slice(end + 1, Math.min(content.length, end + 10));
    if (/^\s*\|/.test(afterMatch)) {
      continue;
    }

    // Skip if this is a TypeScript type definition line
    // Matches: type X = 'foo' | 'bar', interface { x: 'foo' }, etc.
    if (/^\s*(export\s+)?(type|interface)\s+\w+/.test(fullLine)) {
      continue;
    }

    // Skip if in a type annotation context (after : before = or end)
    // e.g., const x: 'alert' = ..., function(x: 'alert' | 'modal')
    // But NOT ternary operators like: condition ? 'foo' : 'bar'
    // And NOT object literals like: { key: 'value' }
    // className: is special - always followed by class names, always transform
    const isAfterClassName = /className\s*:\s*$/.test(beforeMatch);
    if (!isAfterClassName) {
      const colonBeforeString = beforeMatch.lastIndexOf(':');
      const equalsBeforeString = beforeMatch.lastIndexOf('=');
      const openBraceAfterEquals = equalsBeforeString !== -1 ? beforeMatch.indexOf('{', equalsBeforeString) : -1;
      // Also check for object literals in ternary expressions (? {) or function returns (=> {)
      // Use regex to handle whitespace/newlines between tokens
      const ternaryMatch = beforeMatch.match(/\?\s*\{/g);
      const ternaryBrace = ternaryMatch ? beforeMatch.lastIndexOf(ternaryMatch[ternaryMatch.length - 1]) : -1;
      const arrowMatch = beforeMatch.match(/=>\s*\{/g);
      const arrowBrace = arrowMatch ? beforeMatch.lastIndexOf(arrowMatch[arrowMatch.length - 1]) : -1;
      const returnMatch = beforeMatch.match(/return\s*\{/g);
      const returnBrace = returnMatch ? beforeMatch.lastIndexOf(returnMatch[returnMatch.length - 1]) : -1;
      const latestObjectStart = Math.max(openBraceAfterEquals, ternaryBrace, arrowBrace, returnBrace);
      // If there's a { that starts an object literal before the colon, we're in an object
      const isInObjectLiteral = latestObjectStart !== -1 && latestObjectStart < colonBeforeString;
      if (!isInObjectLiteral && colonBeforeString > equalsBeforeString && colonBeforeString !== -1) {
        // Check if this is a type annotation (no space before colon) vs ternary (space before colon)
        const charBeforeColon = colonBeforeString > 0 ? beforeMatch[colonBeforeString - 1] : '';
        const isTernary = charBeforeColon === ' ' || charBeforeColon === '\t';
        if (!isTernary) {
          continue;
        }
      }
    }

    const quote = match[0];
    const inner = match.slice(1, -1);

    // Skip single-word DaisyUI classes on lines with aria-* object keys
    if (DAISYUI_BASE_CLASSES.has(inner) && /'aria-[^']+'\s*:/.test(fullLine)) {
      continue;
    }

    // Skip single-word strings that look like function arguments
    if (DAISYUI_BASE_CLASSES.has(inner)) {
      const beforeStr = content.slice(Math.max(0, start - 10), start);
      if (/[,(]\s*$/.test(beforeStr)) {
        const contextBefore = content.slice(Math.max(0, start - 50), start);
        const lastBracket = Math.max(contextBefore.lastIndexOf('['), contextBefore.lastIndexOf(']'));
        const lastParen = Math.max(contextBefore.lastIndexOf('('), contextBefore.lastIndexOf(')'));
        if (!(lastBracket > lastParen && contextBefore[lastBracket] === '[')) {
          continue;
        }
      }
    }

    // Skip if looks like prose text
    if (looksLikeProseText(inner)) {
      continue;
    }

    let transformed: string;
    if (quote === '`') {
      // Template literal - use recursive processor
      transformed = '`' + processTemplateLiteralInner(inner, options) + '`';
    } else {
      transformed = quote + transformStringContent(inner, options) + quote;
    }

    // Replace in result
    result = result.slice(0, start) + transformed + result.slice(end + 1);
  }

  return result;
}


/**
 * Process a single file
 */
function processFile(filePath: string, options: TransformOptions): TransformResult | null {
  const content = fs.readFileSync(filePath, "utf-8");
  const transformed = transformFileContentRobust(content, options);

  if (content === transformed) {
    return null;
  }

  // Find line-by-line changes for reporting
  const originalLines = content.split("\n");
  const transformedLines = transformed.split("\n");
  const changes: TransformResult["changes"] = [];

  for (let i = 0; i < originalLines.length; i++) {
    if (originalLines[i] !== transformedLines[i]) {
      changes.push({
        line: i + 1,
        before: originalLines[i],
        after: transformedLines[i],
      });
    }
  }

  if (!options.dryRun) {
    fs.writeFileSync(filePath, transformed, "utf-8");
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

  // Parse arguments
  let prefix = "";
  let mode: "prefix" | "unprefix" = "prefix";
  let dir = ".";
  let dryRun = false;
  let verbose = false;
  let extensions = ["tsx", "ts", "jsx", "js"];

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
      case "--ext":
        extensions = args[++i].split(",");
        break;
      case "--help":
        console.log(`
DaisyUI Class Prefixer/Unprefixer

Usage:
  npx tsx scripts/daisyui-prefix.ts [options]

Options:
  --prefix <prefix>   Add prefix to DaisyUI classes (e.g., --prefix "dui-")
  --unprefix <prefix> Remove prefix from DaisyUI classes (e.g., --unprefix "dui-")
  --dir <directory>   Directory to process (default: ".")
  --dry-run           Preview changes without writing files
  --verbose           Show detailed output
  --ext <extensions>  Comma-separated file extensions (default: "tsx,ts,jsx,js")
  --help              Show this help message

Examples:
  npx tsx scripts/daisyui-prefix.ts --prefix "dui-" --dir packages/asterui/src
  npx tsx scripts/daisyui-prefix.ts --unprefix "dui-" --dir packages/asterui/src --dry-run
`);
        process.exit(0);
    }
  }

  if (!prefix) {
    console.error("Error: --prefix or --unprefix is required");
    process.exit(1);
  }

  const options: TransformOptions = {
    prefix,
    mode,
    dryRun,
    verbose,
  };

  console.log(`\n🌼 DaisyUI Class ${mode === "prefix" ? "Prefixer" : "Unprefixer"}`);
  console.log(`   Prefix: "${prefix}"`);
  console.log(`   Directory: ${dir}`);
  console.log(`   Mode: ${dryRun ? "DRY RUN" : "WRITE"}`);
  console.log("");

  // Find all files
  const files = findFiles(dir, extensions);

  console.log(`Found ${files.length} files to process\n`);

  let totalChanges = 0;
  let filesChanged = 0;

  for (const file of files) {
    const result = processFile(file, options);
    if (result) {
      filesChanged++;
      totalChanges += result.changes.length;

      console.log(`📝 ${result.file}`);
      if (verbose) {
        for (const change of result.changes) {
          console.log(`   Line ${change.line}:`);
          console.log(`   - ${change.before.trim()}`);
          console.log(`   + ${change.after.trim()}`);
        }
      } else {
        console.log(`   ${result.changes.length} line(s) changed`);
      }
      console.log("");
    }
  }

  console.log("────────────────────────────────────────");
  console.log(`Summary: ${filesChanged} files, ${totalChanges} changes`);
  if (dryRun) {
    console.log("(dry run - no files were modified)");
  }
}

main();
