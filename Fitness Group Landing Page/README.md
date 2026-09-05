# Fit Explorers — Website

A landing page for **Fit Explorers**, a community fitness group open to everyone.
Whatever your pace — hill repeats, long walks, runs, or hikes — there's a place for
you here.

> **Brand theme:** "Move together. Go further."

## Tech Stack

- **React 19** + **TypeScript 5.7+** (strict mode)
- **Vite 8** — dev server, build tooling, `@` alias for `src/`
- **Tailwind CSS v4** (via the `@tailwindcss/vite` plugin, no config file needed)
- **oxfmt** — code formatter (`npm run format`)
- **Node.js notification API** — server-side email + WhatsApp delivery (`server/`)

## Features

- **Sticky header** with desktop nav and a full-screen mobile menu (smooth-scroll to sections).
- **Hero**, **stats band**, **activities grid**, **"For Everyone"** story, and a **weekly schedule**.
- **"Message the Admin" form** — visitors fill in name / phone / interest / message and hit send.
  The message is **delivered automatically** to the admin — no mail or WhatsApp app opens:
  - 📧 an **email is sent straight to** `osurejerhome@gmail.com`
  - 💬 a **WhatsApp message is sent straight to** **+254 797 492 910**
- **Quick direct links** (WhatsApp chat + email) remain on the page for visitors who prefer
  to reach out on their own device.
- **Footer** quick-contact links for email and WhatsApp.

All page copy, content data, and the displayed admin contact details live in **one file** —
`src/config/site.ts` — so updating the schedule, activities, or contact info is a single edit.

## How Auto-Notification Works

```
Visitor fills the form
        │  POST /api/contact
        ▼
Notification API (server/)          (dev: mounted inside Vite · prod: standalone Node server)
        │
        ├── sendEmail()      → SMTP (nodemailer) or Resend  →  admin email
        └── sendWhatsApp()   → Twilio or webhook            →  admin WhatsApp
```

- The frontend only talks to `/api/contact` via `fetch` (see `src/lib/notify.ts`).
- The **server** composes and delivers both notifications, so real provider credentials
  never ship to the browser.
- Delivery is asynchronous and non-blocking for the visitor, with clear success/error
  feedback in the form.
- **No provider keys configured?** The server logs a "dry-run" copy of the email/WhatsApp
  message instead of failing — perfect for local development and testing the full flow.

## Project Structure

```text
.
├── index.html                  # Vite HTML shell (mounts #root, loads /src/main.tsx)
├── package.json                # Scripts + dependencies
├── vite.config.ts              # Vite + React + Tailwind + @ alias + mounts the API in dev
├── tsconfig.json               # Strict TypeScript config
├── env.example                 # Copy to .env for email/WhatsApp provider keys
├── AGENTS.md                   # Project guide for agents/contributors
├── server/                     # Notification API (Node, no framework)
│   ├── app.mjs                 # Shared HTTP handler (/api/health, /api/contact)
│   ├── notify.mjs              # Email (SMTP/Resend) + WhatsApp (Twilio/webhook) senders
│   └── index.mjs               # Standalone server entry (pnpm run api)
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
    │   ├── contact.ts          # mailto: / WhatsApp deep-link builders (direct links)
    │   └── notify.ts           # POSTs the form to /api/contact (auto-notify)
    ├── types/
    │   └── content.ts          # Shared domain types
    └── assets/images/          # Local images used by the page
```

## Getting Started

**Requirements:** Node.js ≥ 20.19 (the repo pins Node 22 + pnpm 10 in `.mise.toml`).

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (defaults to http://localhost:8443)
npm run dev
```

In development the notification API is mounted **inside the Vite server**, so the contact
form works immediately at `http://localhost:8443`. Without provider keys it runs in
dry-run mode — submit the form and watch the terminal print the email/WhatsApp messages
that would be sent to the admin.

```bash
# 3. Production build (outputs to dist/)
npm run build

# 4. Preview the production build locally
npm run preview

# 5. Type-check the project (no output = clean)
npm run typecheck

# 6. Format the code (oxfmt)
npm run format
```

> If the default port (8443) is busy, override it with `PORT=xxxx npm run dev`.

## Configuring Real Email + WhatsApp Delivery

Auto-notification uses server-side providers. No provider is required in development
(dry-run), but to actually reach the admin, copy the template and fill in one email and
one WhatsApp option:

```bash
cp env.example .env
```

### Email (pick one)

| Provider | Env vars | Notes |
| --- | --- | --- |
| **SMTP** (recommended) | `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM` | Works with Gmail app passwords. Enable 2FA on the account → create an App Password. |
| **Resend** | `RESEND_API_KEY`, `MAIL_FROM` | Free tier at resend.com. |

### WhatsApp (pick one)

| Provider | Env vars | Notes |
| --- | --- | --- |
| **Twilio WhatsApp API** | `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_WHATSAPP_FROM` | `TWILIO_WHATSAPP_FROM` is a Twilio-approved WhatsApp number like `whatsapp:+14155238886`. |
| **Webhook** | `WHATSAPP_WEBHOOK_URL` | For Green API / 360dialog / custom gateways. Server POSTs `{ to: "whatsapp:+<number>", text }`. |

### Who receives the notifications

The defaults match `src/config/site.ts` but can be overridden in `.env`:

```dotenv
ADMIN_EMAIL=osurejerhome@gmail.com
ADMIN_WHATSAPP=254797492910
```

When keys are present, submitting the form sends a real email and a real WhatsApp
message to the admin. The server logs every delivery attempt (`sent` / `failed`) with its
provider.

## Running the API Standalone

In production (or to run the API apart from Vite):

```bash
npm run api          # starts server/index.mjs on :8787 (or NOTIFY_PORT)
```

`server/index.mjs` loads `.env` automatically (Node's `--env-file-if-missing`) and serves:

- `GET  /api/health` — liveness check
- `POST /api/contact` — accepts `{ name, phone?, interest?, message }`, delivers to admin

## Updating Contact Details

The contact info shown on the page is centralised in `src/config/site.ts`:

```ts
export const CONTACT = {
  email: "osurejerhome@gmail.com",      // mailto target
  whatsappNumber: "254797492910",       // dialable format for wa.me links
  whatsappDisplay: "+254 797 492 910",  // shown on the page
} as const;
```

The **notification targets** default to the same values in `server/app.mjs` (overridable
in `.env` via `ADMIN_EMAIL` / `ADMIN_WHATSAPP`).

## Deployment

### Option A — Frontend + Node API on one host

Hosts that run a Node process (Render, Railway, Fly.io, a VPS) can serve the built site
**and** the API:

```bash
npm run build        # produce dist/
npm run api          # serve the API; point your reverse proxy /api → the API port
```

### Option B — Static host (Netlify / Vercel / GitHub Pages) + separate API

The frontend is fully static (`npm run build` → `dist/`), but `/api/contact` needs a
Node process. Run the API on any Node host and tell the browser where to find it:

```dotenv
VITE_API_BASE_URL=https://your-notify-api.example.com
```

Then rebuild/redeploy the frontend. Build with the variable set:

```bash
VITE_API_BASE_URL=https://your-notify-api.example.com npm run build
```

- **Netlify:** build command `npm run build`, publish directory `dist`. For a single
  deployable unit, add the handler as a Netlify Function instead of a separate server.
- **Vercel:** framework preset **Vite** (auto-detected). Adapt `server/` to a Vercel
  function (or host the API elsewhere) for `/api/contact`.
- **GitHub Pages / generic host:** upload `dist/`; if hosted under a sub-path set the
  base first: `FIGMA_PUBLIC_URL=/repo-name/ npm run build`.

### Figma Make (this repo's origin tooling)

The repo includes `.figma/make/*` harness scripts used by the Figma Make environment
(e.g. `dev`, `deploy`, `deploy-preview`, `install`). These are platform-managed; normal
development uses the npm scripts above.

## License

© Fit Explorers. Fitness for all. Every pace. Every week.
