import Sidebar from "@/components/layout/Sidebar";

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <aside className="w-64 border-r border-dashed border-sidebar-border text-sidebar-foreground hidden md:flex flex-col h-[calc(100vh-4rem)] fixed left-0 top-16 z-30 group/sidebar">
        <div className="h-full transition-all">
          <div className="h-full overflow-hidden group-hover/sidebar:overflow-auto">
            <Sidebar />
          </div>
        </div>
      </aside>
      <main className="flex-1 h-full overflow-y-auto p-6 md:p-10 max-w-4xl mx-auto w-full custom-scrollbar ml-0 md:ml-64">
        {children}
      </main>
    </div>
  );
}
