# Contributing to ElixirLabs UI

Thank you for your interest in contributing to ElixirLabs UI! We welcome contributions from everyone, whether you're fixing bugs, adding components, improving documentation, or suggesting new features.

## 🎯 Ways to Contribute

### 1. Writing Documentation (Great for Beginners!)

Documentation is crucial for making our components accessible. You can:
- Document existing components
- Improve existing documentation
- Add usage examples
- Fix typos and clarify explanations

**→ See [Writing Documentation Guide](docs/guides/writing-documentation.md)**

### 2. Creating Components

Add new components to the library following our design principles and patterns.

**→ See [Component Creation Guide](docs/guides/creating-components.md)**

### 3. Improving Examples

- Add new usage examples
- Create real-world demos
- Improve existing examples

## 📋 Development Setup

### Prerequisites

- Node.js 18+ (20+ recommended)
- npm, yarn, or pnpm
- Git

### Setup Steps

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/ui.elixirlabs.in.git
   cd ui.elixirlabs.in
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:3000`

4. **Watch registry changes** (optional, for component development)
   ```bash
   npm run registry:watch
   ```

### Project Structure

```
ui.elixirlabs.in/
├── registry/                    # Component source & metadata
│   ├── config.json             # Registry configuration
│   └── components/             # Component definitions
│       └── [component-name]/
│           ├── component.tsx   # Component implementation
│           ├── config.json     # Component metadata
│           └── examples/       # Usage examples
├── scripts/                     # Build scripts
│   ├── build-registry.mjs      # Build registry
│   ├── validate-registry.mjs   # Validate components
│   └── new-component.mjs       # Scaffold new component
├── src/
│   ├── components/             # React components
│   ├── content/docs/           # Documentation content
│   └── app/                    # Next.js pages
└── public/
    └── r/                      # Built registry (generated)
```

## 📝 How to Document a Component

### Quick Start

1. **Create documentation file**
   ```bash
   npm run new:component
   # Follow the prompts to generate component + docs
   ```

2. **Or manually create**: `src/content/docs/components/[component-name].mdx`

3. **Use the template structure**:
   - Component preview
   - Installation instructions (CLI & Manual)
   - Usage examples
   - Props table
   - Additional examples

### Documentation Requirements

Every component MUST have:
- [ ] Clear description
- [ ] Installation instructions
- [ ] At least 2 usage examples
- [ ] Complete props table
- [ ] Accessibility notes (if applicable)

**Example**: See [`src/content/docs/components/on-this-page.mdx`](src/content/docs/components/on-this-page.mdx)

## 🎨 How to Create a Component

### Step-by-Step Guide

1. **Use the scaffolding tool**
   ```bash
   npm run new:component
   ```
   
   This creates:
   - Component file
   - Configuration file
   - Documentation template
   - Example files

2. **Implement your component**
   
   Edit `registry/components/[name]/component.tsx`:
   ```tsx
   "use client";
   
   import * as React from "react";
   import { cn } from "@/lib/utils";
   
   export interface MyComponentProps {
     // Your props
   }
   
   export const MyComponent = React.forwardRef<
     HTMLDivElement,
     MyComponentProps
   >(({ className, ...props }, ref) => {
     return (
       <div ref={ref} className={cn("", className)} {...props} />
     );
   });
   
   MyComponent.displayName = "MyComponent";
   ```

3. **Update configuration**
   
   Edit `registry/components/[name]/config.json`:
   - Add correct dependencies
   - Set appropriate category
   - Update tags and metadata

4. **Build the registry**
   ```bash
   npm run build:registry
   ```

5. **Test locally**
   - Install via CLI: `npx shadcn@latest add http://localhost:3000/r/[name].json`
   - Or manually copy from `public/r/[name].json`

### Component Guidelines

**Naming Conventions:**
- PascalCase for component names: `MyComponent`
- kebab-case for file names: `my-component.tsx`
- Descriptive, not generic: `DataTable` not `Table2`

**Code Standards:**
- TypeScript required
- Props should have TypeScript interfaces
- Use `React.forwardRef` for DOM components
- Include JSDoc comments for props
- Follow existing patterns

**Styling:**
- Use Tailwind CSS utilities
- Support className prop for customization
- Use `cn()` utility for class merging
- Avoid inline styles unless necessary

## 🔄 Pull Request Process

### Before Submitting

1. **Validate your changes**
   ```bash
   npm run validate:registry
   ```

2. **Build the registry**
   ```bash
   npm run build:registry
   ```

3. **Test the component**
   - Check it renders correctly
   - Test all props and variants
   - Verify accessibility

### Submitting a PR

1. **Create a feature branch**
   ```bash
   git checkout -b feat/add-tooltip-component
   # or
   git checkout -b docs/button-documentation
   # or
   git checkout -b fix/tabs-accessibility
   ```

2. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add Tooltip component"
   # or
   git commit -m "docs: add Button component documentation"
   # or
   git commit -m "fix: improve Tabs keyboard navigation"
   ```
   
   **Commit Message Format:**
   - `feat:` - New component or feature
   - `docs:` - Documentation changes
   - `fix:` - Bug fixes
   - `refactor:` - Code refactoring
   - `test:` - Adding tests
   - `chore:` - Maintenance tasks

3. **Push and create PR**
   ```bash
   git push origin your-branch-name
   ```
   Then create a PR on GitHub

### PR Checklist

- [ ] Component follows naming conventions
- [ ] Config.json is complete and valid
- [ ] Documentation is complete
- [ ] At least 2 examples provided
- [ ] Props table is filled
- [ ] Accessibility considerations noted
- [ ] Registry builds without errors
- [ ] No breaking changes (or clearly documented)

## 💡 Tips for Great Contributions

### For Absolute Beginners

- **You DON'T need to be a coding expert!** Documentation contributions are highly valuable
- **Start small**: Fix a typo, improve an example, add a use case
- **Ask questions**: Use GitHub Discussions or create an issue
- **Learn by example**: Check existing components and documentation

### Writing Style (Documentation)

- Use active voice: "Create a button" not "A button can be created"
- Be concise but clear
- Assume reader has intermediate React knowledge
- Always provide working code examples
- Use proper code highlighting in examples

### Component Design

- **Accessibility first**: Support keyboard navigation, screen readers, ARIA attributes
- **Composable**: Components should work well together
- **Flexible**: Allow customization without sacrificing simplicity
- **Documented**: Every prop should have a clear purpose

## 🐛 Reporting Bugs

Found a bug? Help us fix it!

1. **Check existing issues** to avoid duplicates
2. **Create a new issue** with:
   - Clear title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser/environment info

## 💬 Questions?

- **GitHub Discussions**: For questions and ideas
- **GitHub Issues**: For bugs and feature requests
- **Documentation**: Check existing docs first

## 📜 Code of Conduct

Be respectful, inclusive, and professional. We're building a welcoming community for everyone.

## 🙏 Thank You!

Your contributions make ElixirLabs UI better for everyone. We appreciate your time and effort!

---

**Need Help?** Don't hesitate to ask! We're here to help you contribute successfully.
