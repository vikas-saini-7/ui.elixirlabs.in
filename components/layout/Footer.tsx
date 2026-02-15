import React from "react";
import {
  IconHeartFilled,
} from "@tabler/icons-react";
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
              <p className="text-white/60 max-w-md leading-relaxed">
                Build Beautiful UI 10x Faster with our modern, minimal React
                component library. Copy-paste components or use our CLI to
                create stunning interfaces effortlessly.
              </p>
            </div>

            {/* Social Links */}
            {/* <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:border-purple-400/20 hover:bg-purple-500/10 transition-all duration-300"
              >
                <IconBrandTwitter size={18} className="text-white/60" />
              </a>
              <a
                href="https://github.com/elixirlabs/ui"
                className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:border-purple-400/20 hover:bg-purple-500/10 transition-all duration-300"
              >
                <IconBrandGithub size={18} className="text-white/60" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:border-purple-400/20 hover:bg-purple-500/10 transition-all duration-300"
              >
                <IconBrandLinkedin size={18} className="text-white/60" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:border-purple-400/20 hover:bg-purple-500/10 transition-all duration-300"
              >
                <IconMail size={18} className="text-white/60" />
              </a>
            </div> */}
          </div>

          {/* Documentation */}
          <div>
            <h4 className="text-white font-semibold mb-6">Documentation</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/docs/overview/introduction"
                  className="text-white/60 hover:text-purple-400 transition-colors duration-300"
                >
                  Getting Started
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/components"
                  className="text-white/60 hover:text-purple-400 transition-colors duration-300"
                >
                  Components
                </Link>
              </li>
              <li>
                <a
                  href="/docs/installation"
                  className="text-white/60 hover:text-purple-400 transition-colors duration-300"
                >
                  Installation
                </a>
              </li>
              <li>
                <a
                  href="/docs/examples"
                  className="text-white/60 hover:text-purple-400 transition-colors duration-300"
                >
                  Examples
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-white font-semibold mb-6">Community</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-white/60 hover:text-purple-400 transition-colors duration-300"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/elixirlabs/ui/issues"
                  className="text-white/60 hover:text-purple-400 transition-colors duration-300"
                >
                  Report Issues
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/60 hover:text-purple-400 transition-colors duration-300"
                >
                  Contributing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/60 hover:text-purple-400 transition-colors duration-300"
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
            <div className="flex items-center space-x-2 text-white/50">
              <span>©{currentYear} Elixir Labs</span>
            </div>

            <div className="text-center md:text-right text-white/50">
              <span className="flex items-center gap-1">
                Made with
                <IconHeartFilled size={18} className="text-purple-400" />
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
