#!/usr/bin/env python3
"""
Generate individual component documentation files and update llms.txt.
Creates separate .md files in public/docs/ for each component.
"""

import os
import re
from pathlib import Path

COMPONENTS_DIR = Path(__file__).parent.parent / "src" / "pages" / "components"
DOCS_DIR = Path(__file__).parent.parent / "public" / "docs"
LLMS_FILE = Path(__file__).parent.parent / "public" / "llms.txt"
BASE_URL = "https://asterui.com"

# Component categorization
CATEGORIES = {
    "General": ["button", "typography", "link", "tag", "divider"],
    "Layout": ["layout", "grid", "space", "container", "splitter", "stack", "affix", "fieldset"],
    "Navigation": ["menu", "tabs", "breadcrumb", "dropdown", "pagination", "steps", "navbar"],
    "Data Entry": [
        "form", "input", "inputnumber", "textarea", "select", "cascader", "treeselect",
        "autocomplete", "datepicker", "timepicker", "checkbox", "radio", "toggle",
        "range", "rating", "colorpicker", "transfer", "upload", "fileinput", "mention"
    ],
    "Data Display": [
        "table", "list", "card", "collapse", "descriptions", "empty", "image",
        "avatar", "badge", "stat", "timeline", "tree", "tooltip", "popover",
        "carousel", "qrcode", "indicator"
    ],
    "Feedback": [
        "alert", "modal", "drawer", "notification", "popconfirm", "progress",
        "radialprogress", "result", "skeleton", "loading"
    ],
    "Mockups": ["browser", "window", "phone", "code", "chat"],
    "Other": ["hero", "footer", "join", "floatbutton", "themecontroller", "masonry", "chart", "label"]
}

def extract_frontmatter(content: str) -> str:
    """Extract the frontmatter section between --- markers."""
    match = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
    return match.group(1) if match else ""

def extract_examples_array(frontmatter: str) -> list[tuple[str, str, str]]:
    """Extract examples from the examples array format."""
    examples = []
    array_match = re.search(r'const examples\s*=\s*\[(.*?)\];', frontmatter, re.DOTALL)
    if not array_match:
        return examples

    array_content = array_match.group(1)
    example_pattern = r"title:\s*['\"]([^'\"]+)['\"].*?description:\s*['\"]([^'\"]*)['\"].*?code:\s*`(.*?)`"
    matches = re.findall(example_pattern, array_content, re.DOTALL)

    for title, description, code in matches:
        examples.append((title, description, code.strip()))

    return examples

def extract_code_variables(frontmatter: str) -> list[tuple[str, str]]:
    """Extract code example variables from frontmatter (const *Code = `...`)."""
    examples = []
    pattern = r"const\s+(\w+Code)\s*=\s*`(.*?)`;"
    matches = re.findall(pattern, frontmatter, re.DOTALL)
    for name, code in matches:
        display_name = re.sub(r'Code$', '', name)
        display_name = re.sub(r'([A-Z])', r' \1', display_name).strip().title()
        examples.append((display_name, code.strip()))
    return examples

def extract_api_tables(frontmatter: str) -> list[tuple[str, list[dict]]]:
    """Extract API table definitions from frontmatter."""
    tables = []
    pattern = r"const\s+(\w+Api)\s*=\s*\[(.*?)\];"
    matches = re.findall(pattern, frontmatter, re.DOTALL)

    for name, table_content in matches:
        display_name = re.sub(r'Api$', '', name)
        display_name = re.sub(r'([a-z])([A-Z])', r'\1 \2', display_name)
        display_name = display_name[0].upper() + display_name[1:] if display_name else display_name

        rows = []
        obj_pattern = r"\{\s*property:\s*['\"](\w+)['\"],\s*description:\s*['\"]([^'\"]*)['\"],\s*type:\s*([^,}]+?)(?:,\s*default:\s*([^,}]+?))?\s*,?\s*\}"
        obj_matches = re.findall(obj_pattern, table_content, re.DOTALL)

        for match in obj_matches:
            prop = match[0]
            desc = match[1]
            type_val = match[2].strip().strip("'\"")
            default = match[3].strip().strip("'\"") if match[3] else '-'

            rows.append({
                'property': prop,
                'description': desc,
                'type': type_val,
                'default': default if default else '-'
            })

        if rows:
            tables.append((display_name, rows))

    return tables

def extract_title_description(content: str) -> tuple[str, str]:
    """Extract title and description from Layout component usage."""
    title_match = re.search(r'<Layout\s+title="([^"]*)"', content)
    desc_match = re.search(r'description="([^"]*)"', content)
    title = title_match.group(1) if title_match else "Unknown"
    description = desc_match.group(1) if desc_match else ""
    title = re.sub(r'\s*-\s*AsterUI$', '', title)
    return title, description

def format_api_table(name: str, rows: list[dict]) -> str:
    """Format API table as markdown."""
    if not rows:
        return ""

    lines = [f"### {name}\n"]
    lines.append("| Property | Description | Type | Default |")
    lines.append("|----------|-------------|------|---------|")

    for row in rows:
        type_val = row['type'].replace('|', '\\|')
        default = row['default'] if row['default'] else '-'
        lines.append(f"| `{row['property']}` | {row['description']} | `{type_val}` | `{default}` |")

    return '\n'.join(lines)

def process_component(filepath: Path) -> tuple[str, str, str]:
    """Process a single component file and return (filename, title, markdown)."""
    content = filepath.read_text()
    title, description = extract_title_description(content)
    frontmatter = extract_frontmatter(content)

    examples_array = extract_examples_array(frontmatter)
    code_variables = extract_code_variables(frontmatter)
    api_tables = extract_api_tables(frontmatter)

    # Build markdown
    lines = [f"# {title}\n"]
    if description:
        lines.append(f"{description}\n")

    lines.append(f"**Import:** `import {{ {title.replace(' ', '')} }} from '@aster-ui/react'`\n")

    # Add code examples
    if examples_array:
        lines.append("## Examples\n")
        for title_ex, desc, code in examples_array:
            lines.append(f"### {title_ex}\n")
            if desc:
                lines.append(f"{desc}\n")
            lines.append("```tsx")
            lines.append(code)
            lines.append("```\n")
    elif code_variables:
        lines.append("## Examples\n")
        for name, code in code_variables:
            lines.append(f"### {name}\n")
            lines.append("```tsx")
            lines.append(code)
            lines.append("```\n")

    # Add API tables
    if api_tables:
        lines.append("## API\n")
        for name, rows in api_tables:
            lines.append(format_api_table(name, rows))
            lines.append("")

    filename = filepath.stem  # e.g., "button" from "button.astro"
    return filename, title, '\n'.join(lines)

def generate_llms_txt(component_map: dict[str, str]) -> str:
    """Generate the llms.txt content with categorized links."""
    lines = [
        "# AsterUI",
        "",
        "> React component library built on DaisyUI v5 with enterprise-level developer convenience",
        "",
        "## Overview",
        "",
        "AsterUI provides 100+ production-ready React components with:",
        "- Familiar, intuitive API patterns (Form.Item, Table columns, etc.)",
        "- DaisyUI v5 styling and theming",
        "- Full TypeScript support",
        "- Test-friendly attributes (data-testid, data-state, ARIA roles)",
        "- Prop pass-through for custom attributes",
        "",
        "## Installation",
        "",
        "```bash",
        "npm install @aster-ui/react",
        "```",
        "",
        "## Component Documentation",
        "",
    ]

    # Add categorized component links
    for category, components in CATEGORIES.items():
        lines.append(f"### {category}")
        lines.append("")
        for comp in components:
            if comp in component_map:
                title = component_map[comp]
                lines.append(f"- [{title}]({BASE_URL}/docs/{comp}.md)")
        lines.append("")

    # Add usage examples
    lines.extend([
        "## Quick Start",
        "",
        "```tsx",
        "import { Form, Input, Button, Table } from '@aster-ui/react';",
        "",
        "// Form example",
        "<Form onFinish={handleSubmit}>",
        '  <Form.Item name="email" label="Email" rules={[{ required: true, type: \'email\' }]}>',
        "    <Input />",
        "  </Form.Item>",
        '  <Button type="primary" htmlType="submit">Submit</Button>',
        "</Form>",
        "",
        "// Table example",
        "<Table",
        "  columns={[",
        "    { title: 'Name', dataIndex: 'name', sorter: true },",
        "    { title: 'Email', dataIndex: 'email' }",
        "  ]}",
        "  dataSource={users}",
        "  pagination={{ pageSize: 10 }}",
        "/>",
        "```",
        "",
        "## Testing",
        "",
        "All components include:",
        "- `data-testid` attributes",
        "- `data-state` attributes for component state",
        "- Proper ARIA roles and labels",
        "- Predictable DOM structure",
        "- Prop pass-through (`...rest`) for custom attributes",
        "",
        "```tsx",
        "import { render, screen } from '@testing-library/react';",
        "import { Button, Modal } from '@aster-ui/react';",
        "",
        "screen.getByRole('button', { name: 'Submit' });",
        "screen.getByTestId('form-item-email');",
        "expect(screen.getByRole('dialog')).toHaveAttribute('data-state', 'open');",
        "```",
        "",
        "## Links",
        "",
        f"- Website: {BASE_URL}",
        f"- Components: {BASE_URL}/components",
        "- GitHub: https://github.com/edadma/asterui",
        "- npm: https://www.npmjs.com/package/asterui",
        "",
    ])

    return '\n'.join(lines)

def main():
    # Create docs directory
    DOCS_DIR.mkdir(parents=True, exist_ok=True)

    # Get all component files (excluding index.astro)
    component_files = sorted([
        f for f in COMPONENTS_DIR.glob("*.astro")
        if f.name != "index.astro"
    ])

    # Process each component
    component_map = {}  # filename -> title
    for filepath in component_files:
        filename, title, markdown = process_component(filepath)

        # Only write if there's meaningful content
        if len(markdown) > 100:
            doc_path = DOCS_DIR / f"{filename}.md"
            doc_path.write_text(markdown)
            component_map[filename] = title
            print(f"  Created: docs/{filename}.md")

    # Generate llms.txt
    llms_content = generate_llms_txt(component_map)
    LLMS_FILE.write_text(llms_content)

    print(f"\nGenerated {len(component_map)} component docs in public/docs/")
    print(f"Updated public/llms.txt")

if __name__ == "__main__":
    main()
