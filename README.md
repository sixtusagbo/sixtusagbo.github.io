# My personal portfolio website

This is my personal portfolio website, built using React, TypeScript, and Tailwind CSS. It showcases my projects, skills, and experience in a clean and modern design.

## Development

To run the project locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Building for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

## Project Structure

The project follows a modular architecture for better maintainability and reusability:

- `src/config/constants.ts` - Central configuration for all reusable data like social links, projects, skills, etc.
- `src/components/` - Reusable UI components
- `src/pages/` - Application pages/routes

# Theme

- Light Mode (Default): The original dark purplish-blue gradient (from-purple-900 via-blue-900 to-black)
- Dark Mode: An even darker purplish-blue gradient (from-dark-purple-950 via-dark-blue-950 to-black)

## Features

- Responsive design for all device sizes
- Dark mode support
- Smooth animations using Framer Motion
- TypeScript for type safety
- TailwindCSS for styling
