# Fit Explorers — Website

A landing page for **Fit Explorers**, a community fitness group open to everyone.
Whatever your pace — hill repeats, long walks, runs, or hikes — there's a place for
you here.

> **Brand theme:** "Move together. Go further."

## Tech Stack

- **React 19** + **TypeScript 5.7+** (strict mode)
- **Vite 8** — dev server, build tooling, `@` alias for `src/`
- **Tailwind CSS v4** (via the `@tailwindcss/vite` plugin, no config file needed)
- **oxfmt** — code formatter (`pnpm format`)

## Features

- **Sticky header** with desktop nav and a full-screen mobile menu (smooth-scroll to sections).
- **Hero**, **stats band**, **activities grid**, **"For Everyone"** story, and a **weekly schedule**.
- **Join Us section** with two ways to reach the admin:
  - 📧 **Email** the admin — opens the visitor's mail app addressed to `osurejerhome@gmail.com`.
  - 💬 **WhatsApp** — opens a chat with **+254 797 492 910**, message pre-filled.
  - A **"Message the Admin"** form composes a message from name / phone / interest / text and
    hands it off to either channel (email or WhatsApp) with one click.
- **Footer** quick-contact links for email and WhatsApp.

All copy, content data, and the admin contact details live in **one file** —
`src/config/site.ts` — so updating the schedule, activities, or contact info is a single edit.

## Project Structure

```text
.
├── index.html                  # Vite HTML shell (mounts #root, loads /src/main.tsx)
├── package.json                # Scripts + dependencies
├── vite.config.ts              # Vite + React + Tailwind + @ alias + site config
├── tsconfig.json               # Strict TypeScript config
├── AGENTS.md                   # Project guide for agents/contributors
└── src/
    ├── main.tsx                # React entrypoint
    ├── index.css               # Tailwind import + design tokens/fonts
    ├── App.tsx                 # Composes layout components + page sections
    ├── config/
    │   └── site.ts             # ★ Site content + admin contact (email, WhatsApp)
    ├── components/
    │   ├── layout/             # Header (nav + mobile menu), Footer
    │   ├── sections/           # Hero, Stats, Activities, ForEveryone, Schedule, JoinUs
    │   └── join/               # JoinMessageForm (message-the-admin form)
    ├── lib/
    │   ├── scroll.ts           # Smooth scroll to a section id
    │   └── contact.ts          # mailto: / WhatsApp deep-link builders
    ├── types/
    │   └── content.ts          # Shared domain types
    └── assets/images/          # Local images used by the page
```

## Getting Started

**Requirements:** Node.js ≥ 20.19 (the repo pins Node 22 + pnpm 10 in `.mise.toml`).

```bash
# 1. Install dependencies
pnpm install

# 2. Start the dev server (defaults to http://localhost:8443)
pnpm dev

# 3. Production build (outputs to dist/)
pnpm build

# 4. Preview the production build locally
pnpm preview

# 5. Format the code (oxfmt)
pnpm format
```

> If the default port (8443) is busy, override it with `PORT=xxxx pnpm dev`.

### Useful checks

```bash
# Type-check the whole project (no output = clean)
npx tsc --noEmit

# Build + verify it compiles for production
pnpm build
```

## Updating Contact Details

The admin contact is centralised in `src/config/site.ts`:

```ts
export const CONTACT = {
  email: "osurejerhome@gmail.com",      // mailto target
  whatsappNumber: "254797492910",       // dialable format for wa.me links
  whatsappDisplay: "+254 797 492 910",  // shown on the page
} as const;
```

- Email links use `mailto:` (opens the visitor's email app with a composed message).
- WhatsApp links use `https://wa.me/<number>?text=<encoded>` (opens a pre-filled chat).
- Message composition lives in `src/lib/contact.ts`.

## How Email / WhatsApp "Sending" Works

This is a **static frontend — there is no backend**. When a visitor submits the form or
uses a quick link:

- **Email** → their default email app opens with a pre-composed, pre-addressed message to the admin.
- **WhatsApp** → `https://wa.me/254797492910` opens a chat with the message pre-filled.

The admin receives the visitor's real reply address/number automatically. No API keys or
accounts are required.

> Want email delivered automatically without opening a mail client? Add a form-backend
> service (EmailJS, Formspree, Resend) or a small serverless endpoint and point the form at it.

## Deployment

The build is fully static (`pnpm build` → `dist/`). It can be hosted anywhere that serves
static files.

### Netlify
1. Push this folder to a Git repository.
2. On Netlify: **New site from Git** → pick the repo.
3. Build command: `pnpm build` — Publish directory: `dist`

### Vercel
1. Import the project.
2. Framework preset: **Vite** (build `pnpm build`, output `dist`) — Vercel auto-detects it.

### GitHub Pages / generic hosting
1. Run `pnpm build`.
2. Upload the `dist/` folder to your host / GH Pages branch.
3. If deploying under a sub-path (e.g. `https://user.github.io/repo/`), set the public
   base first so asset URLs are correct:

   ```bash
   FIGMA_PUBLIC_URL=/repo-name/ pnpm build
   ```

### Figma Make (this repo's origin tooling)
The repo includes `.figma/make/*` harness scripts used by the Figma Make environment
(e.g. `dev`, `deploy`, `deploy-preview`, `install`). These are platform-managed; normal
development uses the npm scripts above.

## License

© Fit Explorers. Fitness for all. Every pace. Every week.
