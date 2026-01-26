import fs from "fs";
import path from "path";

export interface NavItem {
  title: string;
  href: string;
  section?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

/**
 * Automatically generates navigation from registry and docs
 */
export async function generateDocsNavigation(): Promise<NavSection[]> {
  const navigation: NavSection[] = [];

  // Overview section (manual for now)
  navigation.push({
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs/overview/introduction" },
      { title: "Installation", href: "/docs/overview/installation" },
      { title: "Getting Started", href: "/docs/overview/getting-started" },
    ],
  });

  // Auto-generate components section from registry
  try {
    const registryPath = path.join(process.cwd(), "public", "r", "index.json");
    
    if (fs.existsSync(registryPath)) {
      const registryData = JSON.parse(fs.readFileSync(registryPath, "utf8"));
      
      if (registryData.components && Array.isArray(registryData.components)) {
        // Group components by category
        const categories = registryData.categories || {};
        const componentsByCategory: Record<string, NavItem[]> = {};

        // Organize components by category
        registryData.components.forEach((component: any) => {
          const category = component.category || "other";
          
          if (!componentsByCategory[category]) {
            componentsByCategory[category] = [];
          }

          // Check if documentation exists
          const docPath = path.join(
            process.cwd(),
            "src/content/docs/components",
            `${component.name}.mdx`
          );

          if (fs.existsSync(docPath)) {
            componentsByCategory[category].push({
              title: formatComponentName(component.name),
              href: `/docs/components/${component.name}`,
              section: category,
            });
          }
        });

        // Create navigation sections for each category
        Object.entries(componentsByCategory).forEach(([categoryKey, items]) => {
          const categoryInfo = categories[categoryKey];
          navigation.push({
            title: categoryInfo?.label || formatCategoryName(categoryKey),
            items: items.sort((a, b) => a.title.localeCompare(b.title)),
          });
        });
      }
    } else {
      // Fallback: scan docs directory if registry doesn't exist
      const docsPath = path.join(process.cwd(), "src/content/docs/components");
      
      if (fs.existsSync(docsPath)) {
        const files = fs.readdirSync(docsPath).filter(f => f.endsWith(".mdx"));
        
        if (files.length > 0) {
          navigation.push({
            title: "Components",
            items: files.map(file => {
              const name = file.replace(".mdx", "");
              return {
                title: formatComponentName(name),
                href: `/docs/components/${name}`,
              };
            }).sort((a, b) => a.title.localeCompare(b.title)),
          });
        }
      }
    }
  } catch (error) {
    console.error("Error generating navigation:", error);
    
    // Fallback to empty components section
    navigation.push({
      title: "Components",
      items: [],
    });
  }

  return navigation;
}

/**
 * Format component name for display (kebab-case to Title Case)
 */
function formatComponentName(name: string): string {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Format category name for display
 */
function formatCategoryName(category: string): string {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
