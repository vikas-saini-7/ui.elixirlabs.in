import { NextResponse } from "next/server";
import { generateDocsNavigation } from "@/lib/navigation";

export async function GET() {
  try {
    const navigation = await generateDocsNavigation();
    
    // Transform to the format expected by DocsMenu
    const formattedNavigation = navigation.map((section) => ({
      label: section.title,
      items: section.items.map((item) => ({
        label: item.title,
        href: item.href,
      })),
    }));

    return NextResponse.json({ navigation: formattedNavigation });
  } catch (error) {
    console.error("Error generating navigation:", error);
    return NextResponse.json(
      { error: "Failed to generate navigation" },
      { status: 500 }
    );
  }
}
