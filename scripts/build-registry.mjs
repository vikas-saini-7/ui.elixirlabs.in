import fs from "fs";
import path from "path";
import prettier from "prettier";
import { validateRegistry } from "./validate-registry.mjs";

const REGISTRY_DIR = path.join(process.cwd(), "registry");
const COMPONENTS_DIR = path.join(REGISTRY_DIR, "components");
const OUT_DIR = path.join(process.cwd(), "public", "r");

function cleanOutputDir() {
  if (fs.existsSync(OUT_DIR)) {
    console.log("🧹 Cleaning existing output...");
    fs.rmSync(OUT_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function processComponents() {
  const components = [];
  const componentDirs = fs
    .readdirSync(COMPONENTS_DIR)
    .filter((item) =>
      fs.statSync(path.join(COMPONENTS_DIR, item)).isDirectory()
    );

  const prettierConfig = (await prettier.resolveConfig(process.cwd())) || {};

  for (const componentName of componentDirs) {
    const componentDir = path.join(COMPONENTS_DIR, componentName);
    const configPath = path.join(componentDir, "config.json");
    const componentPath = path.join(componentDir, "component.tsx");

    console.log(`📦 Processing ${componentName}...`);

    // Read config
    const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

    // Read and format component code
    let componentCode = fs.readFileSync(componentPath, "utf8");

    try {
      componentCode = await prettier.format(componentCode, {
        ...prettierConfig,
        parser: "typescript",
      });
    } catch (err) {
      console.warn(
        `  ⚠️  Prettier formatting failed, using raw content: ${err.message}`
      );
    }

    // Build component entry
    const componentEntry = {
      name: config.name,
      type: config.type,
      description: config.description,
      dependencies: config.dependencies || [],
      devDependencies: config.devDependencies || [],
      registryDependencies: config.registryDependencies || [],
      files: [
        {
          path: `components/ui/${config.name}.tsx`,
          content: componentCode,
          type: config.type,
        },
      ],
      tailwind: config.tailwind || {
        config: {
          theme: {
            extend: {},
          },
        },
      },
      cssVars: config.cssVars || {},
      meta: {
        ...config.meta,
        category: config.category,
        subcategory: config.subcategory || null,
        tags: config.tags || [],
      },
      docs: `https://ui.elixirlabs.in/docs/components/${config.name}`,
      source: `https://github.com/elixirlabs/ui/tree/main/registry/components/${componentName}`,
    };

    // Write individual component JSON
    fs.writeFileSync(
      path.join(OUT_DIR, `${config.name}.json`),
      JSON.stringify(componentEntry, null, 2),
      "utf8"
    );

    console.log(`  ✅ Generated ${config.name}.json`);

    components.push({
      name: config.name,
      type: config.type,
      description: config.description,
      category: config.category,
      tags: config.tags || [],
      version: config.meta?.version || "1.0.0",
      status: config.meta?.status || "stable",
    });
  }

  return components;
}

async function generateIndexFile(components) {
  const configPath = path.join(REGISTRY_DIR, "config.json");
  const registryConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));

  const indexData = {
    $schema: "https://ui.elixirlabs.in/r/schema.json",
    name: registryConfig.name,
    description: registryConfig.description,
    version: registryConfig.version,
    author: registryConfig.author,
    license: registryConfig.license,
    url: registryConfig.registry.url,
    homepage: "https://ui.elixirlabs.in",
    repository: registryConfig.repository,
    generatedAt: new Date().toISOString(),
    categories: registryConfig.categories,
    components: components.sort((a, b) => a.name.localeCompare(b.name)),
  };

  fs.writeFileSync(
    path.join(OUT_DIR, "index.json"),
    JSON.stringify(indexData, null, 2),
    "utf8"
  );

  console.log("✅ Generated index.json");
}

async function generateSchemaFile() {
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
          version: { type: "string" },
          status: { type: "string" },
          category: { type: "string" },
          subcategory: { type: "string" },
          tags: { type: "array", items: { type: "string" } },
          accessibility: { type: "array", items: { type: "string" } },
          hasDocumentation: { type: "boolean" },
          hasTests: { type: "boolean" },
          hasExamples: { type: "boolean" },
          author: {
            type: "object",
            properties: {
              name: { type: "string" },
              url: { type: "string" },
            },
          },
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

  console.log("✅ Generated schema.json");
}

async function buildRegistry() {
  console.log("🚀 Building ElixirLabs UI Registry...\n");

  // Step 1: Validate
  console.log("📋 Step 1: Validation");
  console.log("─".repeat(50));
  const validation = await validateRegistry();

  if (!validation.success) {
    console.error("\n❌ Build aborted due to validation errors");
    process.exit(1);
  }

  // Step 2: Clean output
  console.log("\n📋 Step 2: Preparing Output");
  console.log("─".repeat(50));
  cleanOutputDir();

  // Step 3: Process components
  console.log("\n📋 Step 3: Processing Components");
  console.log("─".repeat(50));
  const components = await processComponents();

  // Step 4: Generate outputs
  console.log("\n📋 Step 4: Generating Registry Files");
  console.log("─".repeat(50));
  await generateIndexFile(components);
  await generateSchemaFile();

  // Summary
  console.log("\n" + "=".repeat(50));
  console.log("✅ Registry Built Successfully!");
  console.log("=".repeat(50));
  console.log(`📦 Components: ${components.length}`);
  console.log(`📁 Output: ${OUT_DIR}`);
  console.log(`🌐 Available at: /r/index.json\n`);
}

buildRegistry().catch((err) => {
  console.error("❌ Build failed:", err);
  process.exit(1);
});
