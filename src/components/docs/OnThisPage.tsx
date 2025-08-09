interface Section {
  //   title: string;
  //   href?: string;
  items?: { title: string; href: string }[];
}

export default function OnThisPage({ sections }: { sections: Section[] }) {
  return (
    <div className="hidden lg:block w-64 text-neutral-300">
      <h2 className="mb-3 text-sm font-semibold text-white">On this page</h2>
      <nav className="space-y-4">
        {sections.map((section, index) => (
          <div key={index}>
            {section.items && (
              <ol className="mt-2 space-y-1 border-l border-neutral-700 pl-4">
                {section.items.map((item, i) => (
                  <li key={i}>
                    <a
                      href={item.href}
                      className="text-sm text-neutral-400 hover:text-white transition"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ol>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
