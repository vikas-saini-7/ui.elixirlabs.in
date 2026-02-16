import { IconBrandDiscord, IconBrandGithub } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

const socials = [
  {
    icon: <IconBrandGithub size={20} />,
    href: "https://github.com/elixir-labs-global/ui.elixirlabs.in",
  },
  {
    icon: <IconBrandDiscord size={20} />,
    href: "#",
  },
];

const HeaderSocials = () => {
  return (
    <div className="flex items-center gap-2">
      {socials.map((social, index) => (
        <Link
          key={index}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 hover:bg-gray-500/10 rounded cursor-pointer"
        >
          {social.icon}
        </Link>
      ))}
    </div>
  );
};

export default HeaderSocials;
