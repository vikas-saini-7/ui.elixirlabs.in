interface FrameworkCardProps {
  href: string;
  title: string;
  children?: React.ReactNode;
}

export function FrameworkGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">{children}</div>
  );
}

export function FrameworkCard({ href, title, children }: FrameworkCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-4 border rounded-lg text-center hover:shadow-md hover:scale-105 transition-all duration-200 block"
    >
      {children && <div className="w-8 h-8 mx-auto mb-2">{children}</div>}
      <div className="mt-2 font-medium">{title}</div>
    </a>
  );
}
