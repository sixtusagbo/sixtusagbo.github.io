# sixtusagbo.dev

Personal portfolio website and blog built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: MongoDB (Mongoose)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Features

- Responsive design with mobile-first approach
- Dark theme with custom color palette
- Animated page transitions and interactions
- Project portfolio with technology filtering
- Experience timeline with certifications
- Database-backed blog with markdown content, server-side search, tag filtering, and pagination
- Admin panel at `/admin` with markdown editor, live preview, and publish workflow
- SEO: per-post metadata and canonicals, dynamic OG images, JSON-LD structured data, sitemap, robots, RSS feed
- On-demand revalidation: publishing from the admin updates the static pages instantly

## Project Structure

```
src/
├── app/
│   ├── (site)/            # Public site (shares Navigation/Footer layout)
│   │   ├── blog/          # Blog listing and post pages
│   │   ├── projects/      # Projects page
│   │   ├── resume/        # Experience page
│   │   └── page.tsx       # Home page
│   ├── admin/             # Admin panel (login + protected dashboard)
│   ├── api/               # Route handlers (view counter)
│   ├── rss.xml/           # RSS feed
│   ├── sitemap.ts         # Sitemap
│   └── robots.ts          # Robots rules
├── components/            # Reusable UI components
│   ├── blog/              # Blog UI (cards, filters, pagination, sharing)
│   ├── admin/             # Admin UI (editor, nav, tables)
│   └── layout/            # Navigation and Footer
├── lib/                   # DB connection, models, queries, auth, markdown
└── config/                # Data and constants
scripts/
└── migrate-medium.ts      # One-off Medium-to-blog migration
```

## Development

```bash
# Install dependencies
npm install

# Configure environment (see .env.example)
cp .env.example .env.local

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment variables

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string (local mongod or Atlas) |
| `AUTH_SECRET` | Secret for signing admin session tokens (`openssl rand -hex 32`) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Admin panel credentials |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name (optional, enables admin image upload) |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Cloudinary unsigned upload preset (optional) |

### Migrating Medium posts

```bash
npx tsx scripts/migrate-medium.ts
```

Pulls every post from the Medium RSS feed, downloads images into
`public/images/blog/<slug>/`, converts the HTML to markdown, and upserts
posts by slug (safe to re-run).

## License

All rights reserved.
