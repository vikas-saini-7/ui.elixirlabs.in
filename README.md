# ElixirLabs UI

A modern, minimal, and aesthetic React component library built with Tailwind CSS. Create beautiful interfaces fast with copy-paste components and a powerful CLI.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Components](https://img.shields.io/badge/components-4+-brightgreen.svg)](https://ui.elixirlabs.in)

## ✨ Features

- 🎨 **Beautiful by Default** - Minimal, modern design that looks great out of the box
- 🔧 **Fully Customizable** - Style components your way with Tailwind CSS
- 📦 **Easy Installation** - Add components via CLI or copy-paste
- ♿ **Accessible** - Built with accessibility in mind
- 🚀 **TypeScript** - Full TypeScript support with type definitions
- 📚 **Well Documented** - Comprehensive docs with examples

## 🚀 Quick Start

### Installation

Install a component using the shadcn CLI:

```bash
npx shadcn@latest add https://ui.elixirlabs.in/r/button.json
```

Or manually copy the component code from our [documentation](https://ui.elixirlabs.in).

### Usage

```tsx
import { Button } from "@/components/ui/button";

export default function App() {
  return <Button>Click me</Button>;
}
```

## 📚 Documentation

Visit [ui.elixirlabs.in](https://ui.elixirlabs.in) for:

- Component documentation
- Installation guides
- Usage examples
- API references

## 🛠️ Available Components

- **Navigation**: OnThisPage, Tabs
- **Forms**: Button
- **Utilities**: ScrollArea

[View all components →](https://ui.elixirlabs.in/docs/components)

## 💻 Development

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm

### Setup

```bash
# Clone the repository
git clone https://github.com/elixirlabs/ui.elixirlabs.in.git
cd ui.elixirlabs.in

# Install dependencies
npm install

# Start development server
npm run dev

# Build registry
npm run build:registry

# Validate registry
npm run validate:registry
```

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:registry` - Build component registry
- `npm run validate:registry` - Validate component configs
- `npm run new:component` - Scaffold a new component
- `npm run registry:watch` - Watch registry for changes

## 🤝 Contributing

We welcome contributions! Whether you're fixing bugs, adding components, or improving docs.

**New to open source?** We have beginner-friendly issues tagged with `good-first-issue`.

See [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Development setup
- Component creation guide
- Documentation guide  
- Pull request process

### Quick Contribution Guide

1. **Fork the repository**
2. **Create a component**:
   ```bash
   npm run new:component
   ```
3. **Build and validate**:
   ```bash
   npm run build:registry
   npm run validate:registry
   ```
4. **Submit a PR**

## 📖 Project Structure

```
ui.elixirlabs.in/
├── registry/              # Component source & metadata
│   ├── config.json       # Registry configuration
│   └── components/       # Component definitions
├── scripts/              # Build scripts
│   ├── build-registry.mjs    # Build registry
│   ├── validate-registry.mjs # Validation
│   └── new-component.mjs     # Scaffolding
├── src/
│   ├── content/docs/     # Documentation
│   ├── components/       # Demo components
│   └── app/              # Next.js pages
└── public/
    └── r/                # Built registry (generated)
```

## 🔄 Registry System

ElixirLabs UI uses an automated registry system:

1. **Components** are defined in `registry/components/[name]/`
2. **Configuration** via `config.json` files
3. **Build script** generates JSON files for distribution
4. **Validation** ensures quality and completeness

## 📦 Component Format

Each component includes:
- Component implementation (`.tsx`)
- Configuration metadata (`config.json`)
- Documentation (`.mdx`)
- Usage examples

## 🎯 Roadmap

- [ ] More form components (Input, Select, Checkbox)
- [ ] Layout components (Container, Grid)
- [ ] Feedback components (Alert, Toast)
- [ ] Data display components (Table, Card)
- [ ] Custom CLI tool
- [ ] Component playground

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Inspired by [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Tabler Icons](https://tabler.io/icons)

## 🔗 Links

- [Website](https://ui.elixirlabs.in)
- [Documentation](https://ui.elixirlabs.in/docs)
- [GitHub](https://github.com/elixirlabs/ui)

## 💬 Support

- **Issues**: [GitHub Issues](https://github.com/elixirlabs/ui/issues)
- **Discussions**: [GitHub Discussions](https://github.com/elixirlabs/ui/discussions)

---

Made with ❤️ by [ElixirLabs](https://elixirlabs.in)
