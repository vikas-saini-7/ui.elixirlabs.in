"use client";
import {
  IconArrowRight,
  IconBox,
  IconBrandGithub,
  IconStar,
  IconUsers,
} from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Animated Meteor Blobs */}
      <div
        className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, rgba(59, 130, 246, 0.3) 50%, transparent 100%)",
          animation: "meteorMove 30s linear infinite",
        }}
      ></div>

      <div
        className="absolute w-80 h-80 rounded-full opacity-15 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(147, 51, 234, 0.3) 50%, transparent 100%)",
          animation: "meteorMove 30s linear infinite -10s",
        }}
      ></div>

      <div
        className="absolute w-72 h-72 rounded-full opacity-10 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(147, 51, 234, 0.2) 50%, transparent 100%)",
          animation: "meteorMove 30s linear infinite -20s",
        }}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/0 to-transparent"></div>
      <div className="relative">
        <div className="text-center max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 text-sm text-purple-400 mb-8">
            <IconStar size={16} />
            <span>Modern React Components</span>
          </div>

          <h1 className="font-heading text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
            Build Beautiful UI
            <br />
            <span className="text-purple-500">10x Faster</span>
          </h1>

          <p className="text-xl text-neutral-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Elixir UI is a modern, minimal React component library designed to
            save you time and effort. Copy-paste components or use our CLI to
            build stunning interfaces effortlessly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/docs/overview/installation">
              <Button
                size="lg"
                className="bg-purple-500 hover:bg-purple-600 text-white px-8"
              >
                Getting Started
                <IconArrowRight size={20} />
              </Button>
            </Link>

            <Link href="https://github.com" target="_blank">
              <Button variant="outline" size="lg" className="px-8">
                <IconBrandGithub size={20} />
                Star on GitHub
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center justify-center gap-8 text-sm text-neutral-500">
            <div className="flex items-center gap-2">
              <IconUsers size={16} />
              <span>1000+ Downloads</span>
            </div>
            <div className="flex items-center gap-2">
              <IconBox size={16} />
              <span>5+ Components</span>
            </div>
            <div className="flex items-center gap-2">
              <IconStar size={16} />
              <span>MIT License</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes meteorMove {
          0% {
            transform: translate(-400px, -200px);
          }
          100% {
            transform: translate(calc(100vw + 400px), 200px);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
