import React from "react";
import Image from "next/image";
import brandLogo from "@/assets/elixir-ui-logo.svg";
import SearchComponent from "@/components/common/SearchComponent";
import ThemeSwitch from "@/components/common/ThemeSwitch";
import HeaderSocials from "@/components/common/HeaderSocials";
import Link from "next/link";

const mainNavigations = [
  {
    label: "Docs",
    href: "/docs/introduction",
  },
  {
    label: "Examples",
    href: "/examples",
  },
  {
    label: "Showcase",
    href: "/showcase",
  },
];

const Header: React.FC = () => {
  return (
    <header className="container mx-auto px-4 h-[64px] flex items-center justify-between border-b">
      {/* left  */}
      <div className="flex items-center gap-8 text-sm">
        <Link href="/" className="flex items-center gap-1">
          <Image className="h-10 w-10" src={brandLogo} alt="elixir-ui-logo" />
          <h1 className="font-heading font-bold text-xl">Elixir UI</h1>
        </Link>
        <div className="text-white/70">v1.0.0</div>
        <menu className="text-white/70">
          <ul className="flex items-center gap-6">
            {mainNavigations.map((item, idx) => (
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
