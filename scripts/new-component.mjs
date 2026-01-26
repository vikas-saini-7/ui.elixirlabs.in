#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { input, select, confirm } from "@inquirer/prompts";

const REGISTRY_DIR = path.join(process.cwd(), "registry");
const COMPONENTS_DIR = path.join(REGISTRY_DIR, "components");
const DOCS_DIR = path.join(process.cwd(), "src/content/docs/components");

function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\\s+/g, "-")
    .toLowerCase();
}

function toPascalCase(str) {
  return str
    .replace(/(^\w|-\w)/g, (match) => match.replace(/-/, "").toUpperCase());
}

async function createComponent() {
  console.log("🎨 Create New Component\n");

  // Get component details
  const componentNameInput = await input({
    message: "Component name (PascalCase, e.g., MyButton):",
    validate: (value) => {
      if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
        return "Must be PascalCase (e.g., MyButton, AlertDialog)";
      }
      return true;
    },
  });

  const kebabName = toKebabCase(componentNameInput);
  const pascalName = toPascalCase(componentNameInput);

  // Check if component already exists
  const componentDir = path.join(COMPONENTS_DIR, kebabName);
  if (fs.existsSync(componentDir)) {
    console.error(`\\n❌ Component '${kebabName}' already exists!`);
    process.exit(1);
  }

  const description = await input({
    message: "Brief description:",
    default: `A ${pascalName} component`,
  });

  // Load categories from config
  const configPath = path.join(REGISTRY_DIR, "config.json");
  const registryConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));
  const categories = Object.keys(registryConfig.categories);

  const category = await select({
    message: "Select category:",
    choices: categories.map((cat) => ({
      name: registryConfig.categories[cat].label,
      value: cat,
    })),
  });

  const dependencies = await input({
    message: "NPM dependencies (comma-separated, leave empty if none):",
    default: "",
  });

  const withExamples = await confirm({
    message: "Create examples folder?",
    default: true,
  });

  const withDocumentation = await confirm({
    message: "Create documentation file?",
    default: true,
  });

  // Create component directory
  fs.mkdirSync(componentDir, { recursive: true });
  if (withExamples) {
    fs.mkdirSync(path.join(componentDir, "examples"), { recursive: true });
  }

  // Create component.tsx
  const componentTemplate = `"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ${pascalName}Props
  extends React.HTMLAttributes<HTMLDivElement> {
  // Add your props here
}

export const ${pascalName} = React.forwardRef<
  HTMLDivElement,
  ${pascalName}Props
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("", className)}
      {...props}
    >
      {/* Your component content */}
    </div>
  );
});

${pascalName}.displayName = "${pascalName}";
`;

  fs.writeFileSync(
    path.join(componentDir, "component.tsx"),
    componentTemplate,
    "utf8"
  );

  // Create config.json
  const depsArray = dependencies
    ? dependencies.split(",").map((d) => d.trim()).filter(Boolean)
    : [];

  const configData = {
    name: kebabName,
    type: "registry:ui",
    description: description,
    category: category,
    subcategory: null,
    tags: [kebabName],
    files: [
      {
        path: `components/ui/${kebabName}.tsx`,
        type: "registry:ui",
        target: `components/ui/${kebabName}.tsx`,
      },
    ],
    dependencies: depsArray.length > 0 ? depsArray : ["react"],
    devDependencies: [],
    registryDependencies: [],
    tailwind: {
      config: {
        theme: {
          extend: {},
        },
      },
    },
    cssVars: {},
    meta: {
      version: "1.0.0",
      status: "beta",
      accessibility: [],
      hasDocumentation: withDocumentation,
      hasTests: false,
      hasExamples: withExamples,
      author: {
        name: "ElixirLabs",
        url: "https://elixirlabs.in",
      },
    },
  };

  fs.writeFileSync(
    path.join(componentDir, "config.json"),
    JSON.stringify(configData, null, 2),
    "utf8"
  );

  // Create example if requested
  if (withExamples) {
    const exampleTemplate = `import { ${pascalName} } from "@/components/ui/${kebabName}";

export default function ${pascalName}Example() {
  return (
    <${pascalName}>
      Example content
    </${pascalName}>
  );
}
`;
    fs.writeFileSync(
      path.join(componentDir, "examples", "basic.tsx"),
      exampleTemplate,
      "utf8"
    );
  }

  // Create documentation if requested
  if (withDocumentation) {
    const docTemplate = `import { ${pascalName} } from "@/registry/${kebabName}";
import ComponentViewerBox from "../../views/ComponentViewerBox";
import CodeBlock from "../../views/CodeBlock";
import DocsTabs from "../../views/DocsTabs";
import { loadRawFile } from "@/lib/loadRawFile";

export const componentRawCode = loadRawFile("registry/components/${kebabName}/component.tsx");

export const componentToViewCode = \\\`import { ${pascalName} } from "@/components/ui/${kebabName}";

<${pascalName}>
  Example content
</${pascalName}>
\\\`;

<ComponentViewerBox background={false} code={componentToViewCode}>
  <${pascalName}>
    Example content
  </${pascalName}>
</ComponentViewerBox>

## Installation

<DocsTabs 
  cliContent={
    <div>
      <CodeBlock language='bash' code={\\\`npx shadcn@latest add https://ui.elixirlabs.in/r/${kebabName}.json\\\`} />
    </div>
  }
  manualContent={
    <div>
      <p className="mb-4">
        Copy and paste the following code into your project:
      </p>
      <CodeBlock language="tsx" code={componentRawCode || "// Component code not found"} />
    </div>
  }
/>

## Usage

Import the component:

<CodeBlock 
  code={\\\`import { ${pascalName} } from "@/components/ui/${kebabName}";\\\`}
/>

Basic usage:

<CodeBlock 
  code={\\\`<${pascalName}>
  Your content here
</${pascalName}>\\\`}
/>

## Props Table

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | - | Additional CSS classes |
| children | ReactNode | - | Component content |

## Examples

### Basic Example

<ComponentViewerBox code={componentToViewCode}>
  <${pascalName}>
    Basic example
  </${pascalName}>
</ComponentViewerBox>
`;

    fs.mkdirSync(DOCS_DIR, { recursive: true });
    fs.writeFileSync(
      path.join(DOCS_DIR, `${kebabName}.mdx`),
      docTemplate,
      "utf8"
    );
  }

  // Success message
  console.log(`\\n✅ Component '${kebabName}' created successfully!\\n`);
  console.log("📁 Files created:");
  console.log(`  - registry/components/${kebabName}/component.tsx`);
  console.log(`  - registry/components/${kebabName}/config.json`);
  if (withExamples) {
    console.log(`  - registry/components/${kebabName}/examples/basic.tsx`);
  }
  if (withDocumentation) {
    console.log(`  - src/content/docs/components/${kebabName}.mdx`);
  }
  console.log(`\\n📝 Next steps:`);
  console.log(`  1. Edit registry/components/${kebabName}/component.tsx`);
  console.log(`  2. Update registry/components/${kebabName}/config.json`);
  if (withDocumentation) {
    console.log(`  3. Complete docs/components/${kebabName}.mdx`);
  }
  console.log(`  4. Run: npm run build:registry`);
  console.log(``);
}

createComponent().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
