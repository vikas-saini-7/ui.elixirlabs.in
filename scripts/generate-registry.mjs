import fs from "fs";
import path from "path";
import prettier from "prettier";

const SRC_DIR = path.join(process.cwd(), "src", "registry");
const OUT_DIR = path.join(process.cwd(), "public", "registry");

// Author and project metadata
const AUTHOR_INFO = {
  name: "ElixirLabs",
  url: "https://elixirlabs.in",
  github: "https://github.com/elixirlabs",
};

const PROJECT_INFO = {
  name: "ElixirLabs UI",
  version: "1.0.0",
  description: "Modern React components built with Tailwind CSS",
  license: "MIT",
};

function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

// Clean and recreate registry directory
function cleanRegistryDir() {
  if (fs.existsSync(OUT_DIR)) {
    console.log("🧹 Cleaning existing registry...");
    fs.rmSync(OUT_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });
  console.log("📁 Generating registry...");
  console.log("------------------------");
}

// Extract dependencies from import statements
function extractDependencies(content) {
  const dependencies = new Set(["react"]);
  const importRegex = /import.*from\s+['"]([^'"]+)['"]/g;
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    // Skip relative imports and built-in modules
    if (!importPath.startsWith(".") && !importPath.startsWith("@/")) {
      dependencies.add(importPath);
    }
  }

  return Array.from(dependencies);
}

// Extract component metadata from JSDoc or comments
function extractMetadata(content, filename) {
  const componentName = filename.replace(".tsx", "");

  // Try to extract description from JSDoc
  const jsdocMatch = content.match(/\/\*\*\s*\n\s*\*\s*(.+?)\s*\n/);
  const description = jsdocMatch
    ? jsdocMatch[1]
    : `A ${componentName} component`;

  // Extract tags/categories (could be from comments or file structure)
  const tags = ["ui", "component"];
  if (content.includes("form") || content.includes("Form")) tags.push("form");
  if (content.includes("button") || content.includes("Button"))
    tags.push("button");
  if (content.includes("input") || content.includes("Input"))
    tags.push("input");
  if (content.includes("dialog") || content.includes("Dialog"))
    tags.push("dialog");

  return { description, tags };
}

async function generate() {
  // Clean registry directory first
  cleanRegistryDir();

  const prettierConfig = (await prettier.resolveConfig(process.cwd())) || {};
  const files = fs.readdirSync(SRC_DIR).filter((f) => f.endsWith(".tsx"));
  const registry = [];

  for (const file of files) {
    const filePath = path.join(SRC_DIR, file);
    let content = fs.readFileSync(filePath, "utf8");

    try {
      content = await prettier.format(content, {
        ...prettierConfig,
        parser: "typescript",
      });
    } catch (err) {
      console.warn(`⚠️ Prettier failed on ${file}, using raw content.`, err);
    }

    const name = toKebabCase(file.replace(".tsx", ""));
    const dependencies = extractDependencies(content);
    const { description, tags } = extractMetadata(content, file);

    const componentEntry = {
      name,
      type: "registry:ui",
      description,
      dependencies,
      devDependencies: [],
      registryDependencies: [],
      files: [
        {
          path: `components/ui/${name}.tsx`,
          content,
          type: "registry:ui",
        },
      ],
      tailwind: {
        config: {
          theme: {
            extend: {},
          },
        },
      },
      cssVars: {},
      meta: {
        importSpecifier: `@/components/ui/${name}`,
        category: tags[0] || "ui",
        subcategory: tags.length > 1 ? tags[1] : null,
        tags,
        author: AUTHOR_INFO,
        version: PROJECT_INFO.version,
        license: PROJECT_INFO.license,
        createdAt: new Date().toISOString(),
      },
      docs: `https://ui.elixirlabs.in/docs/components/${name}`,
      source: `https://github.com/elixirlabs/ui/tree/main/src/registry/${file}`,
    };

    // Write individual component file
    fs.writeFileSync(
      path.join(OUT_DIR, `${name}.json`),
      JSON.stringify(componentEntry, null, 2),
      "utf8"
    );

    registry.push({
      name,
      type: "registry:ui",
      description,
      tags,
      category: tags[0] || "ui",
      author: AUTHOR_INFO.name,
      version: PROJECT_INFO.version,
    });

    console.log(`✅ Generated ${name}.json`);
  }

  // Generate index.json with all components
  const indexData = {
    $schema: "https://ui.elixirlabs.in/registry/schema.json",
    name: PROJECT_INFO.name,
    description: PROJECT_INFO.description,
    version: PROJECT_INFO.version,
    author: AUTHOR_INFO,
    license: PROJECT_INFO.license,
    url: "https://ui.elixirlabs.in/registry",
    homepage: "https://ui.elixirlabs.in",
    repository: {
      type: "git",
      url: "https://github.com/elixirlabs/ui.git",
    },
    generatedAt: new Date().toISOString(),
    components: registry.sort((a, b) => a.name.localeCompare(b.name)),
  };

  fs.writeFileSync(
    path.join(OUT_DIR, "index.json"),
    JSON.stringify(indexData, null, 2),
    "utf8"
  );

  // Generate schema.json for validation
  const schema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    title: "ElixirLabs UI Registry Component",
    description: "Schema for ElixirLabs UI component registry",
    type: "object",
    properties: {
      name: { type: "string" },
      type: {
        type: "string",
        enum: ["registry:ui", "registry:lib", "registry:block"],
      },
      description: { type: "string" },
      dependencies: { type: "array", items: { type: "string" } },
      devDependencies: { type: "array", items: { type: "string" } },
      registryDependencies: { type: "array", items: { type: "string" } },
      files: {
        type: "array",
        items: {
          type: "object",
          properties: {
            path: { type: "string" },
            content: { type: "string" },
            type: { type: "string" },
          },
          required: ["path", "content"],
        },
      },
      meta: {
        type: "object",
        properties: {
          author: {
            type: "object",
            properties: {
              name: { type: "string" },
              url: { type: "string" },
              github: { type: "string" },
            },
            required: ["name"],
          },
          version: { type: "string" },
          license: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
        },
      },
    },
    required: ["name", "type", "files"],
  };

  fs.writeFileSync(
    path.join(OUT_DIR, "schema.json"),
    JSON.stringify(schema, null, 2),
    "utf8"
  );

  console.log("------------------------");
  console.log(`🎉 Generated registry with ${files.length} components`);
}

generate().catch(console.error);
