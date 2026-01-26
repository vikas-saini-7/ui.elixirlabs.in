import fs from "fs";
import path from "path";

const REGISTRY_DIR = path.join(process.cwd(), "registry");
const COMPONENTS_DIR = path.join(REGISTRY_DIR, "components");

export async function validateRegistry() {
  const errors = [];
  const warnings = [];
  let componentCount = 0;

  console.log("🔍 Validating registry...\n");

  // Check registry config exists
  const configPath = path.join(REGISTRY_DIR, "config.json");
  if (!fs.existsSync(configPath)) {
    errors.push("❌ registry/config.json not found");
    return { success: false, errors, warnings, componentCount };
  }

  // Validate registry config
  try {
    const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
    if (!config.name || !config.version) {
      errors.push("❌ registry/config.json missing required fields");
    }
    console.log(`✅ Registry config valid: ${config.name} v${config.version}`);
  } catch (err) {
    errors.push(`❌ Invalid JSON in registry/config.json: ${err.message}`);
    return { success: false, errors, warnings, componentCount };
  }

  // Check components directory exists
  if (!fs.existsSync(COMPONENTS_DIR)) {
    errors.push("❌ registry/components/ directory not found");
    return { success: false, errors, warnings, componentCount };
  }

  // Validate each component
  const componentDirs = fs
    .readdirSync(COMPONENTS_DIR)
    .filter((item) =>
      fs.statSync(path.join(COMPONENTS_DIR, item)).isDirectory()
    );

  for (const componentName of componentDirs) {
    componentCount++;
    const componentDir = path.join(COMPONENTS_DIR, componentName);
    const configPath = path.join(componentDir, "config.json");
    const componentPath = path.join(componentDir, "component.tsx");

    console.log(`\n📦 Validating ${componentName}...`);

    // Check config.json exists
    if (!fs.existsSync(configPath)) {
      errors.push(`❌ ${componentName}: config.json not found`);
      continue;
    }

    // Validate component config
    let config;
    try {
      config = JSON.parse(fs.readFileSync(configPath, "utf8"));

      // Required fields
      const required = ["name", "type", "description", "category", "files"];
      for (const field of required) {
        if (!config[field]) {
          errors.push(`❌ ${componentName}: config.json missing '${field}'`);
        }
      }

      // Check if name matches directory
      if (config.name !== componentName) {
        warnings.push(
          `⚠️  ${componentName}: config name '${config.name}' doesn't match directory name`
        );
      }

      console.log(`  ✅ Config valid`);
    } catch (err) {
      errors.push(
        `❌ ${componentName}: Invalid JSON in config.json - ${err.message}`
      );
      continue;
    }

    // Check component file exists
    if (!fs.existsSync(componentPath)) {
      errors.push(`❌ ${componentName}: component.tsx not found`);
    } else {
      console.log(`  ✅ Component file exists`);
    }

    // Validate dependencies
    if (config.dependencies && config.dependencies.length > 0) {
      const packageJsonPath = path.join(process.cwd(), "package.json");
      const packageJson = JSON.parse(
        fs.readFileSync(packageJsonPath, "utf8")
      );
      const allDeps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
      };

      for (const dep of config.dependencies) {
        if (dep !== "react" && dep !== "react-dom" && !allDeps[dep]) {
          warnings.push(
            `⚠️  ${componentName}: dependency '${dep}' not found in package.json`
          );
        }
      }
      console.log(`  ✅ Dependencies validated`);
    }

    // Check if documentation exists
    const docsPath = path.join(
      process.cwd(),
      "src/content/docs/components",
      `${componentName}.mdx`
    );
    if (!fs.existsSync(docsPath)) {
      if (config.meta?.hasDocumentation) {
        warnings.push(
          `⚠️  ${componentName}: config claims hasDocumentation but file not found`
        );
      } else {
        warnings.push(`⚠️  ${componentName}: missing documentation`);
      }
    } else {
      console.log(`  ✅ Documentation exists`);
    }
  }

  // Summary
  console.log("\n" + "=".repeat(50));
  console.log(`📊 Validation Summary`);
  console.log("=".repeat(50));
  console.log(`Components validated: ${componentCount}`);
  console.log(`Errors: ${errors.length}`);
  console.log(`Warnings: ${warnings.length}`);

  if (errors.length > 0) {
    console.log("\n❌ Errors:");
    errors.forEach((err) => console.log(`  ${err}`));
  }

  if (warnings.length > 0) {
    console.log("\n⚠️  Warnings:");
    warnings.forEach((warn) => console.log(`  ${warn}`));
  }

  const success = errors.length === 0;
  if (success) {
    console.log("\n✅ Validation passed!");
  } else {
    console.log("\n❌ Validation failed!");
  }

  return { success, errors, warnings, componentCount };
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  validateRegistry()
    .then(({ success }) => {
      process.exit(success ? 0 : 1);
    })
    .catch((err) => {
      console.error("Error during validation:", err);
      process.exit(1);
    });
}
