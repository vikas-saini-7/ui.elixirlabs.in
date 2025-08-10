import fs from "fs";
import path from "path";
import prettier from "prettier";

const SRC_DIR = path.join(process.cwd(), "src", "registry");
const OUT_DIR = path.join(process.cwd(), "public", "registry");

function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

async function generate() {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  const prettierConfig = (await prettier.resolveConfig(process.cwd())) || {};

  const files = fs.readdirSync(SRC_DIR).filter((f) => f.endsWith(".tsx"));

  for (const file of files) {
    const filePath = path.join(SRC_DIR, file);
    let content = fs.readFileSync(filePath, "utf8");

    try {
      // Await the async format function
      content = await prettier.format(content, {
        ...prettierConfig,
        parser: "typescript",
      });
    } catch (err) {
      console.warn(`⚠️ Prettier failed on ${file}, using raw content.`);
    }

    const name = toKebabCase(file.replace(".tsx", ""));

    const json = {
      name,
      dependencies: ["react"],
      files: [
        {
          path: `components/ui/${name}.tsx`,
          content,
        },
      ],
    };

    fs.writeFileSync(
      path.join(OUT_DIR, `${name}.json`),
      JSON.stringify(json, null, 2),
      "utf8"
    );

    console.log(`✅ Generated ${name}.json`);
  }
}

generate();
