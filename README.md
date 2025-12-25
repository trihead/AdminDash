# AdminDash - Modern ERP Admin Dashboard

A feature-rich, customizable admin dashboard built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4. Designed for enterprise resource planning (ERP) with a focus on data management, analytics, and user experience.

![Version](https://img.shields.io/badge/version-0.1.1-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black)
![React](https://img.shields.io/badge/React-19.2.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🌟 Features

- ✨ **Modern Tech Stack**: Built with the latest versions of Next.js 16 (App Router), React 19, and TypeScript 5.9
- 🎨 **Beautiful UI**: Styled with Tailwind CSS 4 and shadcn/ui components
- 🌓 **Dark Mode**: Full dark mode support with theme persistence
- 📊 **Excel-like Spreadsheet**: AG Grid integration for powerful data management
- 📈 **Interactive Charts**: Data visualization with Recharts
- 🗂️ **Multi-level Navigation**: Expandable sidebar with hierarchical menu structure
- 📱 **Responsive Design**: Mobile-first approach with responsive layouts
- ♿ **Accessible**: Built with accessibility in mind using Radix UI primitives
- 🚀 **Performance**: Optimized with Next.js 16 and Turbopack dev server

## 📦 Tech Stack

### Core Framework
- **Next.js 16.1.1** - React framework with App Router and Turbopack
- **React 19.2.3** - UI library with concurrent features
- **TypeScript 5.9.3** - Type-safe development
- **pnpm** - Fast, disk space efficient package manager

### UI & Styling
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **shadcn/ui** - Re-usable component library (components owned in `/src/components/ui/`)
- **Radix UI** - Headless UI components for accessibility
- **lucide-react** - Icon library
- **class-variance-authority** - CSS class composition
- **tailwind-merge** - Merge Tailwind classes without conflicts
- **tw-animate-css** - Animation utilities

### Data & Visualization
- **AG Grid Community 35.0.0** - Excel-like spreadsheet grid
  - Cell editing, sorting, filtering
  - Keyboard navigation
  - Column management (add, rename, delete, reorder)
  - CSV import/export
  - Row selection and manipulation
- **Recharts 3.6.0** - Interactive charting library
- **date-fns 4.1.0** - Date utility library

### Components & Features
- **react-country-flag 3.1.0** - SVG flag icons for language selector
- **Radix UI Components**:
  - Avatar
  - Dialog
  - Dropdown Menu
  - Popover
  - Scroll Area
  - Separator
  - Slot
  - Tabs

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or 20+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/trihead/AdminDash.git
cd AdminDash
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
pnpm build
pnpm start
```

## 📁 Project Structure

```
admin-dash/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Dashboard home
│   │   ├── spreadsheet/       # Excel-like spreadsheet page
│   │   ├── not-found.tsx      # 404 page
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── layout/            # Layout components (Sidebar, Header, Footer)
│   │   ├── dashboard/         # Dashboard-specific components
│   │   ├── shared/            # Shared components (ThemeProvider, dialogs)
│   │   └── ui/                # shadcn/ui components (owned)
│   └── lib/
│       └── utils.ts           # Utility functions (cn, etc.)
├── public/                     # Static assets
├── .github/
│   └── copilot-instructions.md # AI coding guidelines
└── package.json
```

## 🎨 Key Features

### Dashboard
- **Total Hours Card** - Visual time tracking with gradient design
- **Project Cards** - Track multiple projects with progress bars, team avatars, status badges
- **Revenue Chart** - Interactive line chart with hover tooltips
- **Time Tracker** - Session-based time tracking with play/pause controls
- **Project Status Table** - Paginated table with filtering and sorting

### Spreadsheet Page
- Excel-like data entry with full keyboard navigation
- Add/delete rows and columns dynamically
- Rename columns with simple prompts
- Cell editing with dropdown editors for specific fields
- CSV import/export functionality
- Column sorting, filtering, and resizing
- Dark mode support

### Layout & Navigation
- **Collapsible Sidebar** - Hover-to-expand on desktop, overlay on mobile
- **Multi-level Navigation** - Expandable menu items with sub-navigation
- **Theme Toggle** - Persistent dark/light mode with localStorage
- **Responsive Header** - Icons for weather, language, search, fullscreen, cart, notifications
- **Footer** - Dynamic version display from package.json

## 🛠️ Development

### Available Scripts

```bash
pnpm dev          # Start development server (Turbopack)
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

### Adding shadcn/ui Components

```bash
pnpm dlx shadcn@latest add [component-name]
```

Components are installed to `src/components/ui/` and can be customized directly.

## 🎯 Customization

### Theme Configuration
- Edit `src/components/shared/ThemeProvider.tsx` for theme logic
- Modify `src/app/globals.css` for color variables
- Dark mode classes: `dark:*` in Tailwind

### Sidebar Navigation
- Edit `src/components/layout/Sidebar.tsx` navigation array
- Add new routes in `src/app/[route]/page.tsx`

### Branding
- Company name: Search and replace "iWorx.Pro" in components
- Logo: Update `src/components/layout/Sidebar.tsx` logo section
- Colors: Modify Tailwind theme in `tailwind.config.ts`

## 📝 Dependencies

### Production Dependencies
```json
{
  "@radix-ui/react-avatar": "^1.1.11",
  "@radix-ui/react-dialog": "^1.1.15",
  "@radix-ui/react-dropdown-menu": "^2.1.16",
  "@radix-ui/react-popover": "^1.1.15",
  "@radix-ui/react-scroll-area": "^1.2.10",
  "@radix-ui/react-separator": "^1.1.8",
  "@radix-ui/react-slot": "^1.2.4",
  "@radix-ui/react-tabs": "^1.1.13",
  "ag-grid-community": "^35.0.0",
  "ag-grid-react": "^35.0.0",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "date-fns": "^4.1.0",
  "lucide-react": "^0.562.0",
  "next": "16.1.1",
  "react": "19.2.3",
  "react-country-flag": "^3.1.0",
  "react-dom": "19.2.3",
  "recharts": "^3.6.0",
  "tailwind-merge": "^3.4.0"
}
```

### Development Dependencies
```json
{
  "@tailwindcss/postcss": "^4",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "eslint": "^9",
  "eslint-config-next": "16.1.1",
  "tailwindcss": "^4",
  "tw-animate-css": "^1.4.0",
  "typescript": "^5"
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [AG Grid](https://www.ag-grid.com/) - Data grid solution
- [Recharts](https://recharts.org/) - Charting library
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives

## 📧 Contact

Project Link: [https://github.com/trihead/AdminDash](https://github.com/trihead/AdminDash)

---

Built with ❤️ by [iWorx.Pro](https://iworx.pro)
