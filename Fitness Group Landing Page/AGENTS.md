# figma-make-app

React + Vite + Tailwind CSS project running inside Figma Make.

## Development Server

A Vite development server is **already running** on `$PORT` (default 8443). You don't need to start it manually.

- Preview URL: The user can access the running app through the preview panel
- Hot reload: Changes to source files are reflected immediately

## Project Structure

This is the canonical project structure. Start with task-relevant files below. Only follow imports or inspect other files when required, when a documented path is missing, or when the repository contradicts this guide.

- `src/main.tsx` - React entrypoint; imports `src/index.css` and mounts `src/App.tsx` into the `#root` element
- `src/App.tsx` - Composes the page layout from layout components and page sections; the usual starting point for UI work
- `src/index.css` - Global CSS entrypoint and Tailwind CSS v4 import
- `src/config/site.ts` - Single source of truth for site content (nav links, activities, schedule, stats, images) and admin contact details (`osurejerhome@gmail.com`, `+254 797 492 910`)
- `src/components/layout/` - Persistent chrome: `Header` (nav + mobile menu) and `Footer`
- `src/components/sections/` - One component per landing-page section (`Hero`, `Stats`, `Activities`, `ForEveryone`, `Schedule`, `JoinUs`)
- `src/components/join/` - `JoinMessageForm`, the join/contact form that auto-submits messages to the admin API
- `src/lib/` - Helpers: `scroll.ts` (smooth scrolling), `contact.ts` (mailto / WhatsApp deep-link builders), and `notify.ts` (POSTs to `/api/contact` for auto-notification)
- `src/types/` - Shared TypeScript domain types (`Activity`, `Stat`, `ScheduleRow`, `JoinMessage`, `ContactChannel`)
- `src/assets/images/` - Local image assets used by the site
- `server/` - Auto-notification API: `app.mjs` (shared `/api/health` + `/api/contact` handler, imports `env.mjs` first), `notify.mjs` (SMTP/Resend/SendGrid email + Twilio/webhook WhatsApp senders + `describeProviders()`), `env.mjs` (loads `.env` via `process.loadEnvFile` for both dev-mounted and standalone modes), `check.mjs` (credential check / `--send` live test), `index.mjs` (standalone Node entry), `app.d.mts` (types for Vite's import)
- `env.example` - Template for `.env` (admin targets + Twilio/SMTP/Resend/SendGrid + WhatsApp keys); copy to `.env`. `.env` is git-ignored and must never be committed
- `index.html` - Vite HTML shell containing the `#root` element and loading `src/main.tsx`
- `package.json` - Project dependencies and the Vite build/development scripts, `api` (standalone server), `notify:check` / `notify:test` (credential check + live test), `typecheck`, and formatting scripts
- `vite.config.ts` - Vite configuration with React, Tailwind CSS v4, and Figma Make plugins, plus the `@` alias for `src` and the notify-API middleware mounted in dev
- `.mise.toml` - Toolchain versions for Node.js and pnpm

> The contact form must NOT open a mail client or WhatsApp app — it POSTs to `/api/contact` and the server delivers email + WhatsApp automatically (see `server/notify.mjs`). `mailto:` / `wa.me` links are only used for the optional direct quick-contact cards.
>
> Credentials live in `.env` (git-ignored), loaded by `server/env.mjs`. Twilio powers both channels: WhatsApp via `TWILIO_ACCOUNT_SID`/`TWILIO_AUTH_TOKEN`/`TWILIO_WHATSAPP_FROM`, email via SendGrid (`SENDGRID_API_KEY`) — alternatives are SMTP, Resend, and a WhatsApp webhook. With no keys, senders fall back to dry-run logging. Verify with `npm run notify:check` / `npm run notify:test`.

## Dependencies

- Runtime: React 19 and React DOM 19
- Server email: nodemailer (SMTP transport in `server/notify.mjs`)
- Styling: Tailwind CSS v4 with the `@tailwindcss/vite` plugin
- Build tooling: Vite 8, TypeScript 5.7, and `@vitejs/plugin-react`
- Formatting: oxfmt

## Styling

This project uses **Tailwind CSS v4** through the `@tailwindcss/vite` plugin configured in `vite.config.ts`. `src/index.css` imports Tailwind with `@import 'tailwindcss';`. Use Tailwind utility classes directly in JSX and put global CSS or Tailwind v4 theme customization in `src/index.css`. This scaffold does not need a Tailwind config file or PostCSS config.

`src/main.tsx` imports `src/index.css`, so global font wiring belongs in `src/index.css`. Keep CSS `@import` statements first, then add any `@font-face` rules and font-family defaults there.

## Code quality

- Use double quotes for strings containing apostrophes (`"We're here to help"`), or escape them in single-quoted strings. An unescaped apostrophe in a single-quoted string breaks the build.
- Ensure JSX tags are closed and braces are balanced.
- Export components as default exports.
