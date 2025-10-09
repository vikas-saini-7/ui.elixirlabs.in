import React from "react";
import Link from "next/link";
import {
  IconArrowRight,
  IconBox,
  IconCode,
  IconCopy,
  IconDownload,
  IconFlame,
  IconPalette,
  IconQuote,
  IconRocket,
  IconStar,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import Hero from "@/components/landing/Hero";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Key Features Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-neutral-900/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold mb-4">
              Key Features of <span className="text-purple-500">Elixir UI</span>
              ?
            </h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Built for developers who want to ship beautiful products without
              reinventing the wheel
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <IconFlame className="text-purple-500" size={24} />,
                title: "Lightning Fast Setup",
                description:
                  "Get started in minutes with our CLI tool or copy-paste approach. No complex configurations required.",
              },
              {
                icon: <IconPalette className="text-purple-500" size={24} />,
                title: "Fully Customizable",
                description:
                  "Every component is built to be easily customized. Use Tailwind CSS to make it truly yours.",
              },
              {
                icon: <IconCode className="text-purple-500" size={24} />,
                title: "Developer Experience",
                description:
                  "TypeScript support, excellent documentation, and best practices built-in from day one.",
              },
              {
                icon: <IconBox className="text-purple-500" size={24} />,
                title: "Production Ready",
                description:
                  "Battle-tested components used by hundreds of projects. Accessible, performant, and reliable.",
              },
              {
                icon: <IconCopy className="text-purple-500" size={24} />,
                title: "Copy & Paste",
                description:
                  "Own your code. No heavy dependencies, just clean, readable components you can modify.",
              },
              {
                icon: <IconRocket className="text-purple-500" size={24} />,
                title: "Modern Stack",
                description:
                  "Built with React, TypeScript, Tailwind CSS, and Framer Motion for the best DX.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-6 border border-neutral-800 rounded-xl hover:border-purple-500/30 transition-all duration-300 hover:bg-purple-500/5"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-purple-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Component Gallery Preview */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold mb-4">
              Beautiful Components Out of the Box
            </h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Explore our growing collection of carefully crafted components
            </p>
          </div>

          {/* Component Preview Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                name: "On This Page",
                category: "Navigation",
                preview: "bg-gradient-to-br from-purple-500/20 to-blue-500/20",
              },
              {
                name: "Button",
                category: "Form",
                preview:
                  "bg-gradient-to-br from-green-500/20 to-emerald-500/20",
              },
              {
                name: "Modal",
                category: "Overlay",
                preview: "bg-gradient-to-br from-orange-500/20 to-red-500/20",
              },
              {
                name: "Input",
                category: "Form",
                preview: "bg-gradient-to-br from-blue-500/20 to-purple-500/20",
              },
              {
                name: "Card",
                category: "Layout",
                preview: "bg-gradient-to-br from-pink-500/20 to-purple-500/20",
              },
              {
                name: "Tabs",
                category: "Navigation",
                preview:
                  "bg-gradient-to-br from-yellow-500/20 to-orange-500/20",
              },
            ].map((component, index) => (
              <div
                key={index}
                className="group border border-neutral-800 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300"
              >
                <div
                  className={`w-full h-32 rounded-lg mb-4 ${component.preview} flex items-center justify-center border border-white/10`}
                >
                  <div className="text-center">
                    <div className="w-8 h-8 bg-white/20 rounded mx-auto mb-2"></div>
                    <div className="w-16 h-2 bg-white/20 rounded mx-auto"></div>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors">
                      {component.name}
                    </h3>
                    <p className="text-sm text-neutral-500">
                      {component.category}
                    </p>
                  </div>
                  <IconArrowRight
                    size={16}
                    className="text-neutral-600 group-hover:text-purple-500 transition-colors"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/docs/components/on-this-page">
              <Button variant="outline" size="lg">
                View All Components
                <IconArrowRight size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Real-world Use Cases */}
      {/* <section className="py-20 bg-gradient-to-b from-neutral-900/20 to-transparent">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold mb-4">
              Real-world <span className="text-purple-500">Templates</span>
            </h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              See how Elixir UI components work together in real applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "SaaS Dashboard",
                description:
                  "Complete dashboard template with navigation, charts, and data tables",
                image: "bg-gradient-to-br from-blue-500/10 to-purple-500/10",
                tags: ["Dashboard", "Analytics", "Admin"],
              },
              {
                title: "Landing Page",
                description:
                  "Modern landing page template for showcasing your product",
                image: "bg-gradient-to-br from-green-500/10 to-blue-500/10",
                tags: ["Marketing", "Landing", "Showcase"],
              },
              {
                title: "E-commerce Store",
                description:
                  "Product catalog with shopping cart and checkout flow",
                image: "bg-gradient-to-br from-orange-500/10 to-red-500/10",
                tags: ["E-commerce", "Shopping", "Checkout"],
              },
              {
                title: "Documentation Site",
                description:
                  "Clean documentation template with search and navigation",
                image: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
                tags: ["Docs", "Knowledge", "Support"],
              },
            ].map((template, index) => (
              <div
                key={index}
                className="group border border-neutral-800 rounded-xl overflow-hidden hover:border-purple-500/30 transition-all duration-300"
              >
                <div
                  className={`w-full h-48 ${template.image} flex items-center justify-center border-b border-neutral-800`}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <IconBox size={24} className="text-white/50" />
                    </div>
                    <div className="space-y-2">
                      <div className="w-32 h-2 bg-white/20 rounded mx-auto"></div>
                      <div className="w-24 h-2 bg-white/10 rounded mx-auto"></div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-purple-400 transition-colors">
                    {template.title}
                  </h3>
                  <p className="text-neutral-400 text-sm mb-4">
                    {template.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {template.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-neutral-800 text-neutral-400 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Social Proof */}

      <section className="py-20 bg-gradient-to-b from-neutral-900/20 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          {/* <div className="text-center mb-16">
            <div className="mb-8 text-neutral-400 uppercase flex items-center justify-center space-x-4 text-sm tracking-wider">
              <div className="w-8 h-px bg-neutral-600"></div>
              <span>[</span>
              <h2 className="font-medium">Testimonials</h2>
              <span>]</span>
              <div className="w-8 h-px bg-neutral-600"></div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 font-heading">
              Trusted by Developers
            </h1>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              Join thousands of developers building amazing products with Elixir
              UI
            </p>
          </div> */}

          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold mb-4">
              Trusted by <span className="text-purple-500">Community</span>
            </h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Join thousands of developers building amazing products with Elixir
              UI
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Krishna Mistry",
                role: "Founder & CTO",
                company: "3x@Startups",
                content:
                  "Elixir UI has completely transformed our development workflow. We're shipping features 3x faster and our UI is more consistent than ever. The component quality is outstanding.",
                rating: 5,
                avatar:
                  "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
              },
              {
                name: "Aniket Ghavte",
                role: "Product Engineer",
                company: "Freelancer",
                content:
                  "The copy-paste approach is brilliant. No heavy dependencies, just clean, readable components I can modify as needed. Perfect for rapid and fast prototyping.",
                rating: 5,
                avatar:
                  "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
              },
              {
                name: "Harsh Jha",
                role: "Software Engineer",
                company: "Bynry Inc",
                content:
                  "Finally, a component library that understands design systems. TypeScript support and excellent documentation make collaboration seamless.",
                rating: 5,
                avatar:
                  "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="group bg-neutral-900/60 border border-neutral-800 rounded-2xl p-8 hover:border-purple-500/30 transition-all duration-300 relative overflow-hidden"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-neutral-700 group-hover:text-purple-500/50 transition-colors">
                  <IconQuote size={24} />
                </div>

                {/* Rating */}
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <IconStar
                      key={i}
                      size={16}
                      className="text-purple-400 fill-current"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-neutral-300 leading-relaxed mb-8 text-lg">
                  &quot;{testimonial.content}&quot;
                </p>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full border border-neutral-700"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20"></div>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-neutral-400 text-sm">
                      {testimonial.role} • {testimonial.company}
                    </p>
                  </div>
                </div>

                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
            ))}
          </div>

          {/* Bottom Stats */}
          <div className="mt-16 pt-16 border-t border-neutral-800">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-purple-500 mb-2 font-heading">
                  1000+
                </div>
                <div className="text-neutral-400">Downloads</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-purple-500 mb-2 font-heading">
                  15+
                </div>
                <div className="text-neutral-400">GitHub Stars</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-purple-500 mb-2 font-heading">
                  5+
                </div>
                <div className="text-neutral-400">Components</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-purple-500 mb-2 font-heading">
                  99%
                </div>
                <div className="text-neutral-400">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-b from-purple-500/5 to-transparent">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-5xl font-bold mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-neutral-400 mb-12 max-w-2xl mx-auto">
            Start building beautiful, accessible, and performant React
            components today. Join thousands of developers who trust Elixir UI.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/docs/overview/getting-started">
              <Button
                size="lg"
                className="bg-purple-500 hover:bg-purple-600 text-white px-12"
              >
                <IconDownload size={20} />
                Get Started for Free
              </Button>
            </Link>

            <Link href="/docs/components/on-this-page">
              <Button variant="outline" size="lg" className="px-12">
                Browse Components
                <IconArrowRight size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
