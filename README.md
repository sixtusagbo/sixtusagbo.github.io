# sixtusagbo.dev

Personal portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Features

- Responsive design with mobile-first approach
- Dark theme with custom color palette
- Animated page transitions and interactions
- SEO optimized with Open Graph and Twitter cards
- Project portfolio with technology filtering
- Blog section with search and tag filtering
- Experience timeline with certifications

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── blog/              # Blog pages
│   ├── projects/          # Projects page
│   ├── resume/            # Experience page
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   └── layout/            # Navigation and Footer
└── config/                # Data and constants
    ├── constants.ts       # Skills, social links, blog posts, etc.
    └── projects.ts        # Project data
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## License

All rights reserved.
