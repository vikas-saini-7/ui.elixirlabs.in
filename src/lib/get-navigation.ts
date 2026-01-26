import fs from "fs";
import path from "path";

export interface NavItem {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export type NavigationItem = NavItem | NavGroup;

/**
 * Get navigation data synchronously for server components
 */
export function getDocsNavigation(): NavigationItem[] {
  const navigation: NavigationItem[] = [];

  // Getting Started section
  navigation.push({
    label: "Getting Started",
    items: [
      { label: "Introduction", href: "/docs/overview/introduction" },
      { label: "Installation", href: "/docs/overview/installation" },
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
              label: formatComponentName(component.name),
              href: `/docs/components/${component.name}`,
            });
          }
        });

        // Create navigation sections for each category
        Object.entries(componentsByCategory).forEach(([categoryKey, items]) => {
          const categoryInfo = categories[categoryKey];
          navigation.push({
            label: categoryInfo?.label || formatCategoryName(categoryKey),
            items: items.sort((a, b) => a.label.localeCompare(b.label)),
          });
        });
      }
    }
  } catch (error) {
    console.error("Error generating navigation:", error);
  }

  return navigation;
}

function formatComponentName(name: string): string {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatCategoryName(category: string): string {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
