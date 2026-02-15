import React from "react";
import Image from "next/image";
import brandLogo from "@/assets/elixir-ui-logo.svg";
import SearchComponent from "@/components/common/SearchComponent";
import ThemeSwitch from "@/components/common/ThemeSwitch";
import HeaderSocials from "@/components/common/HeaderSocials";
import Link from "next/link";
import { docsNavigation } from "@/lib/docs-navs";

const mainNavigations = [
  {
    label: "Docs",
    href: "/docs",
  },
  {
    label: "Components",
    href: `${docsNavigation[1].items[0].slug}`,
  },
];

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md container mx-auto px-4 h-16 flex items-center justify-between border-b border-dashed">
      {/* left  */}
      <div className="flex items-center gap-8 text-sm">
        <Link href="/" className="flex items-center gap-1">
          <Image className="h-10 w-10" src={brandLogo} alt="elixir-ui-logo" />
          <h1 className="font-heading font-bold text-xl">Elixir UI</h1>
        </Link>
        <div className="text-white/70 bg-gray-500/10 p-1 px-2 rounded-lg border text-xs">
          v1.0.0
        </div>
        <menu className="text-white/70">
          <ul className="flex items-center gap-6">
            {mainNavigations?.map((item, idx) => (
              <Link href={item.href} key={idx}>
                <li>{item.label}</li>
              </Link>
            ))}
          </ul>
        </menu>
      </div>
      {/* right  */}
      <div className="flex items-center gap-3 text-white/70">
        {/* search  */}
        <SearchComponent />
        <span className="border h-5"></span>
        {/* theme  */}
        <ThemeSwitch />
        <span className="border h-5"></span>
        {/* socials  */}
        <HeaderSocials />
      </div>
    </header>
  );
};

export default Header;
