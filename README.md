# Small Business Website Starter (Next.js + Prisma)

**Purpose.** Personal project to build production-grade websites for small businesses: fast, reliable, easy to administer.

**What it is.** A minimal, opinionated starter with public pages (Home/Services/Contact), an admin panel (manage services & site settings, view leads), and a validated lead form that stores data in a SQL database.

---

## Highlights
- **UX & Admin:** clean UI, simple password-based admin (ready to swap to NextAuth).
- **Data layer:** PostgreSQL + Prisma with schema & migrations (seed data included).
- **Performance:** SSR + ISR (`revalidate`), parallel DB queries, asset-light Tailwind UI.
- **Reliability:** typed data access, environment-based config, ready for Vercel deploy.
- **Compliance-minded:** EU region database (Neon) → fits typical GDPR/DSGVO needs.

---

## Tech Stack
- **Frontend/App:** Next.js 15 (App Router), TypeScript, Tailwind CSS  
- **Backend:** Next.js Server Components & Server Actions, API routes  
- **Database/ORM:** PostgreSQL (Neon) + Prisma  
- **Validation:** zod + react-hook-form (lead form)  
- **DX:** path alias `@/*`, strict TS config, Prisma migrations

---

## Architecture at a Glance
- Routes under `src/app` (`/`, `/services`, `/contact`, `/admin/*`, `/api/lead`)
- Data models in `prisma/schema.prisma` (`SiteSetting`, `Service`, `Testimonial`, `Lead`)
- DB client in `src/lib/prisma.ts`; lightweight auth cookie helpers in `src/lib/auth.ts`
- Admin uses server actions for submit + redirects; public pages use SSR/ISR

---

## What I did / Learned
- Defined pragmatic data models and wired Prisma migrations & seeding
- Built a small admin with secure server actions and cookie handling
- Tuned server rendering (parallel queries, incremental revalidation)
- Prepared the project for cloud deployment (Vercel + Neon, env-driven config)

---

## Roadmap
- NextAuth (email magic link) & roles
- Anti-spam (rate limiting / Turnstile)
- File uploads (S3/R2) and image handling
- SEO add-ons (`robots.ts`, `sitemap.ts`, richer metadata)
- Monitoring (Sentry) and uptime checks

---

## Quick Run (dev)
```bash
npm install
# Prisma schema & seed (dev DB or SQLite)
npx prisma migrate dev --name init
npm run db:seed
npm run dev


Open http://localhost:3000 • Admin: /admin/login (password from .env)

Production is set up for Vercel (EU region) with prisma migrate deploy && next build.


Focus: end-to-end Next.js delivery for small businesses — UX → data → deploy; reliability first.

