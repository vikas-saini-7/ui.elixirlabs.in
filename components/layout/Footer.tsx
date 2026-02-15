import React from "react";
import { IconHeartFilled } from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";

import brandLogo from "@/assets/elixir-ui-logo.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" border-t border-dashed border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Link href="/" className="flex items-center gap-1 mb-4 w-fit">
                <Image
                  className="h-12 w-12 mr-4"
                  src={brandLogo}
                  alt="elixir-ui-logo"
                />
                <h1 className="font-heading font-bold text-xl">Elixir UI</h1>
              </Link>
              <p className="text-white/60 max-w-md leading-relaxed text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Explicabo, quasi. Lorem, ipsum dolor.
              </p>
            </div>
          </div>

          {/* Documentation */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-base">
              Documentation
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/docs/overview/introduction"
                  className="text-white/60 hover:text-white transition-colors duration-300 text-base"
                >
                  Getting Started
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/components"
                  className="text-white/60 hover:text-white transition-colors duration-300 text-base"
                >
                  Components
                </Link>
              </li>
              <li>
                <a
                  href="/docs/installation"
                  className="text-white/60 hover:text-white transition-colors duration-300 text-base"
                >
                  Installation
                </a>
              </li>
              <li>
                <a
                  href="/docs/examples"
                  className="text-white/60 hover:text-white transition-colors duration-300 text-base"
                >
                  Examples
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-white font-semibold mb-6 text-base">
              Community
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-white/60 hover:text-white transition-colors duration-300 text-base"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/elixirlabs/ui/issues"
                  className="text-white/60 hover:text-white transition-colors duration-300 text-base"
                >
                  Report Issues
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/60 hover:text-white transition-colors duration-300 text-base"
                >
                  Contributing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/60 hover:text-white transition-colors duration-300 text-base"
                >
                  Changelog
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-white/50 text-base">
              <span>
                ©{currentYear} Elixir UI &#8226;  {" "} powered by{" "}
                <a
                  href="https://elixirlabs.in"
                  target="_blank"
                  className="italic text-white/70"
                >
                  Elixir Labs
                </a>{" "}
              </span>
            </div>

            <div className="text-center md:text-right text-white/50 text-base">
              <span className="flex items-center gap-1">
                Made with
                <IconHeartFilled size={18} className="text-red-500" />
                <span>for developer community</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
