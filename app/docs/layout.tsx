import AsideLeft from "@/components/docs/AsideLeft";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Left Sidebar */}
      <AsideLeft />

      {/* Main Content */}
      {children}
    </div>
  );
}
