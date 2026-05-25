# Stitch i9ja Frontend

A minimalist Nigerian community platform built with Next.js, React, TypeScript, and Tailwind CSS.

## Project Structure

```
frontend/
├── app/                    # Next.js app directory (pages, layouts)
├── components/             # Reusable React components
├── styles/                 # Global styles and design system
├── public/                 # Static assets
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── next.config.js          # Next.js configuration
```

## Getting Started

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build

```bash
npm run build
npm start
```

## Design System

The project uses a custom design system based on the Nigerian Community Minimalism specification:

- **Primary Color**: `#00386c` (Trust Blue)
- **Success Color**: `#00A562` (Nigeria Green)
- **Typography**: Inter font family
- **Spacing**: 1.5rem gutters, 3rem section padding
- **Border Radius**: 1rem for cards, 0.5rem for inputs
- **Responsive**: Mobile-first approach (< 768px, 768px-1024px, > 1024px)

## Components

### Navbar
- Fixed top navigation with logo and menu
- Responsive mobile menu
- Sign In/Up buttons

### HeroSection
- Main headline and value proposition
- Trust badges
- Search bar
- CTA buttons

### StatsSection
- Display key metrics
- Shows platform scale

### FeaturedSection
- Three main feature cards (Jobs, Courses, Forums)
- Card-based layout with descriptions

### Footer
- Multi-column footer layout
- Links to resources and company pages
- Social media links

## Colors

All colors are defined in `tailwind.config.js` for consistency:

- Primary: `#00386c`
- Secondary (Green): `#006d40`
- Tertiary (Gold): `#4e3200`
- Surfaces: Various greys for light/dark modes
- Status colors: Success, Error, Warning

## Contributing

Keep the code structure clean and organized. Add new components to the `/components` folder and new pages to the `/app` folder. Follow the existing code style and naming conventions.
