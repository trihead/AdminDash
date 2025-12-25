# AdminDash - AI Coding Agent Instructions

## Project Overview
ERP admin dashboard built with Next.js 16 (App Router), React 19, TypeScript 5.9, Tailwind CSS 4, and shadcn/ui. Design follows a specific reference mockup with sidebar, header, footer layout.

## Tech Stack & Versions
- **Next.js 16.1.1** - App Router with Turbopack dev server
- **React 19.2.3** - Latest with concurrent features
- **TypeScript 5.9.3** - Strict mode enabled
- **Tailwind CSS 4.1.18** - Latest v4 with CSS variables
- **shadcn/ui** - Component library (not npm package - components copied to `src/components/ui/`)
- **lucide-react** - Icon library
- **pnpm** - Package manager

## Architecture

### Directory Structure
```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Dashboard home
│   └── globals.css        # Global styles + Tailwind
├── components/
│   ├── layout/            # Layout components (Sidebar, Header, Footer)
│   ├── dashboard/         # Dashboard-specific components
│   ├── ui/                # shadcn/ui components (owned by us)
│   └── shared/            # Reusable components
└── lib/
    └── utils.ts           # cn() utility for class merging
```

### Layout System
- **Three-part layout**: Sidebar (left) + Header (top) + Footer (bottom)
- Main content area fills remaining space
- Sidebar is collapsible with expanded/collapsed states
- Mobile: Sidebar converts to sheet/drawer

## Design Reference
The design is based on a specific screenshot mockup. Key elements:

**Sidebar Navigation:**
- Dashboard (with badge "4")
- Project, Ecommerce sections
- Apps, Widgets, UI Kits (expandable)
- Advanced UI (badge "12+")
- Icons, Misc
- Map & Charts section
- Table & forms (badge "4.2")

**Dashboard Content (to implement):**
- Total Hours card (12H display)
- Project cards (Mobile App, Web Development, Project Beta, Core team)
- Tracker with time sessions
- Project Status table with pagination

**Excluded from design** (marked with red X in mockup):
- Middle area charts/line graphs
- Right sidebar ("Get started", "Today Tasks")

## Key Patterns

### Component Creation
```tsx
// Always use TypeScript with proper types
interface ComponentProps {
  title: string;
  children?: React.ReactNode;
}

export function Component({ title, children }: ComponentProps) {
  return <div>{title}</div>
}
```

### Styling with Tailwind
- Use `cn()` from `@/lib/utils` to merge classes
- Leverage Tailwind's design tokens (spacing, colors)
- Use CSS variables for theming: `hsl(var(--primary))`
- Responsive: `md:`, `lg:` breakpoints

### shadcn/ui Components
- Components are in `src/components/ui/` - you own them
- Customize directly in component files
- Use Radix UI primitives under the hood (accessible by default)
- Import: `import { Button } from "@/components/ui/button"`

### State & Data
- Use React Server Components by default
- Client components: `"use client"` directive at top
- Context for theme and sidebar state
- No external state management library yet

## Development Commands
```bash
pnpm dev          # Start dev server (Turbopack)
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # ESLint check
```

## Customization Features
The dashboard must be customizable:
- Light/dark theme toggle
- Sidebar collapse/expand
- Custom color schemes (future)
- Layout configuration (future)

## Current Progress
- ✅ Project initialized with latest versions
- ✅ shadcn/ui configured with essential components (button, card, table, badge, avatar, dropdown-menu, input, sheet, dialog, tabs, scroll-area, separator)
- ✅ Dependencies installed
- 🔄 Building layout components (Sidebar, Header, Footer)
- ⏳ Dashboard page implementation
- ⏳ Theme system

## Critical Notes
- **Design source of truth**: User-provided screenshot mockup, NOT generic templates
- **Tailwind UI subscription available**: Use as code reference only, adapt to match exact mockup design
- **Mobile-first**: Ensure responsive at all breakpoints
- **Accessibility**: Use semantic HTML, ARIA attributes (shadcn handles most)
- **No capital letters in package names**: Use lowercase with hyphens

## Common Tasks

### Adding a new shadcn component
```bash
pnpm dlx shadcn@latest add [component-name]
```

### Creating a new page
1. Add route in `src/app/[route]/page.tsx`
2. Wrap with dashboard layout
3. Add to sidebar navigation

### Styling patterns
```tsx
// Prefer composition over props
<Card className="p-6">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
</Card>

// Use cn() for conditional classes
<div className={cn("base-class", isActive && "active-class")} />
```

## Troubleshooting
- **Import alias**: Use `@/` for `src/` directory
- **Tailwind not working**: Check `tailwind.config.ts` includes correct paths
- **Type errors**: Ensure `typescript` and `@types/*` packages are up to date
- **Build errors**: Run `pnpm install` to ensure dependencies match lock file
