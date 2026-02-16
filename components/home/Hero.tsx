"use client";
import { Button } from "@/registry/new-york/ui/button";
import {
  IconArrowRight,
  IconBox,
  IconBrandGithub,
  IconStar,
  IconUsers,
} from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden h-[90vh] max-h-[850px]">
      {/* Animated White Meteor Blobs */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 60%, rgba(255,255,255,0.1) 100%)",
          animation: "meteorMove 30s linear infinite",
          left: "-250px",
          top: "-250px",
        }}
      ></div>

      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 60%, rgba(255,255,255,0.1) 100%)",
          animation: "meteorMove 30s linear infinite -10s",
          right: "-200px",
          top: "-200px",
        }}
      ></div>

      <div
        className="absolute w-[350px] h-[350px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 60%, rgba(255,255,255,0.1) 100%)",
          animation: "meteorMove 30s linear infinite -20s",
          left: "-175px",
          bottom: "-175px",
        }}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/0 to-transparent"></div>
      <div className="relative">
        <div className="text-center max-w-8xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm bg-gray-500/10 mb-8">
            <IconStar size={16} />
            <span>Modern React Components</span>
          </div>

          <h1 className="font-heading text-5xl lg:text-8xl font-bold mb-6 ">
            Build Beautiful UI
          </h1>

          <p className="text-xl text-neutral-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam,
            quia maiores. Sapiente obcaecati soluta ab error amet voluptatibus.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/docs">
              <Button size="lg">
                Getting Started
                <IconArrowRight size={20} />
              </Button>
            </Link>

            <Link href="https://github.com/elixir-labs-global/ui.elixirlabs.in" target="_blank">
              <Button variant="outline" size="lg">
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
