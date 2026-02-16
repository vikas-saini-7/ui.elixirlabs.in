import Sidebar from "@/components/layout/Sidebar";
import {
  OnThisPage,
  EditOnGitHubButton,
  AdPlaceholder,
} from "@/components/docs/AsideRight";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Left Sidebar */}
      <aside className="
        hidden md:flex
        fixed left-0 top-16
        h-[calc(100vh-4rem)]
        w-64
        border-r border-dashed border-sidebar-border
        bg-background
        z-30
      ">
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <Sidebar />
        </div>
      </aside>

      {/* Right Sidebar */}
      <aside className="
        hidden xl:flex
        fixed right-0 top-16
        h-[calc(100vh-4rem)]
        w-72
        border-l border-dashed border-sidebar-border
        bg-background/80 backdrop-blur
        z-30
      ">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <OnThisPage />
          <AdPlaceholder />
          <EditOnGitHubButton url="https://github.com/elixir-labs-global/ui.elixirlabs.in" />
        </div>
      </aside>

      {/* Main Content */}
      <main
        className="
          min-h-screen
          pt-10
          px-6
          md:pl-76
          xl:pr-80
        "
      >
        <div className="mx-auto w-full max-w-4xl">
          {children}
        </div>
      </main>
    </div>
  );
}
