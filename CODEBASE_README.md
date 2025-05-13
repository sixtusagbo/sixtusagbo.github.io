# Codebase Analysis: Personal Portfolio Website

## Project Overview

This is a personal portfolio website built with React, TypeScript, and Tailwind CSS. It showcases projects, skills, experience, and blog posts with a clean, modern design featuring a gradient background with glass-morphism UI elements.

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **TypeScript**: Strict typing throughout the application
- **Linting**: ESLint

## Project Structure

```
sixtusagbo.github.io/
├── public/               # Static assets
├── src/                  # Source code
│   ├── components/       # Reusable UI components
│   ├── config/           # Configuration and constants
│   ├── pages/            # Page components
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
├── .env                  # Environment variables
├── tailwind.config.js    # Tailwind configuration
├── vite.config.ts        # Vite configuration
└── package.json          # Dependencies and scripts
```

## Key Components

### App.tsx
- Main application component with routing setup
- Manages navigation and theme state
- Implements responsive navigation for mobile and desktop
- Dark mode toggle functionality

### BlogPostCard.tsx
- Displays individual blog posts in a card format
- Features:
  - Image thumbnail with hover effects
  - Primary tag display
  - External link shortcut
  - Date and read time information
  - Excerpt preview
  - Additional tags with overflow handling
  - Framer Motion animations

### Blog.tsx
- Blog page with advanced filtering capabilities
- Features:
  - Search functionality for titles and excerpts
  - Tag-based filtering with multi-select
  - Multiple sorting options (newest, oldest, alphabetical)
  - Responsive layout with collapsible filters panel on mobile
  - Empty state handling for no results
  - Optimized rendering with useMemo hooks

## Data Management

All content is centralized in `src/config/constants.ts`, which includes:

- Skills data (categorized)
- Social links
- Navigation items
- Blog posts
- Experience/work history
- Education information
- Certifications

## Style and Design

- **Theme**:
  - Light Mode: Dark purplish-blue gradient (from-purple-900 via-blue-900 to-black)
  - Dark Mode: Deeper purplish-blue gradient (from-dark-purple-950 via-dark-blue-950 to-black)
- **UI Elements**: 
  - Glass-morphism effect using backdrop-blur and semi-transparent backgrounds
  - Card-based layouts for content pieces
  - Subtle animations for enhanced user experience
  - Consistent border and rounded corner treatment

## Code Patterns

- **React Hooks**:
  - useState for local component state
  - useMemo for computed values
  - useEffect for side effects and event listeners
- **TypeScript**: Proper interface definitions for props and data structures
- **Data Filtering**: Efficient filtering and sorting of content (e.g., blog posts)
- **Responsive Design**: Mobile-first approach with Tailwind's responsive classes
- **Animation**: Framer Motion for entrance animations and transitions

## Features

- Responsive design for all device sizes
- Dark mode support with persistent toggle
- Smooth page transitions and element animations
- Comprehensive blog with filtering and search functionality
- Project showcase
- Resume/experience timeline
- Contact information and social links

## Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Future Enhancement Opportunities

- Add pagination for blog posts when collection grows
- Implement dynamic content loading from a CMS
- Add a contact form with serverless function integration
- Integrate analytics to track visitor engagement
- Implement a newsletter subscription feature
- Add project filtering similar to blog filtering
