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
- **Node.js notification API** — server-side email + WhatsApp delivery (`server/`), Twilio-ready (WhatsApp API + SendGrid email)
- **nodemailer** — SMTP email transport (used only when `SMTP_HOST` is set)

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
        ├── sendEmail()      → SMTP / Resend / SendGrid     →  admin email
        └── sendWhatsApp()   → Twilio / webhook              →  admin WhatsApp
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
│   ├── notify.mjs              # Email (SMTP/Resend/SendGrid) + WhatsApp (Twilio/webhook) senders
│   ├── env.mjs                 # Loads .env for both dev-mounted and standalone modes
│   ├── check.mjs               # Credential check / live test (npm run notify:check)
│   └── index.mjs               # Standalone server entry (npm run api)
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

# 6. Verify notification credentials (after creating .env)
npm run notify:check

# 7. Format the code (oxfmt)
npm run format
```

> If the default port (8443) is busy, override it with `PORT=xxxx npm run dev`.

## Configuring Real Email + WhatsApp Delivery

Notifications are sent by the **server**, so provider credentials never ship to the
browser. Copy the template and fill in **one email** and **one WhatsApp** option —
Twilio can cover both. The server loads `.env` automatically in both dev and standalone
modes (see `server/env.mjs`).

```bash
cp env.example .env
```

### Recommended: Twilio (WhatsApp + Email)

Twilio provides WhatsApp messaging **and** SendGrid email, so one account powers both channels.

**WhatsApp**
1. In the [Twilio Console](https://console.twilio.com) copy your **Account SID** and **Auth Token**.
2. Get a WhatsApp-enabled sender: the **WhatsApp Sandbox** for testing, or an approved number for production.
3. Set:
   ```dotenv
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=your-auth-token
   TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
   ```
   > Trial accounts: the admin's WhatsApp number must join the Twilio sandbox first.

**Email (Twilio SendGrid)**
1. Create a **SendGrid API key** with _Mail Send_ permission.
2. Verify a sender address/domain under **Sender Authentication**.
3. Set:
   ```dotenv
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxx
   MAIL_FROM="Fit Explorers <your-verified-sender@example.com>"
   ```

### Alternatives

| Channel | Provider | Env vars | Notes |
| --- | --- | --- | --- |
| Email | **SMTP** (priority) | `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM` | Gmail app passwords supported (enable 2FA → create an App Password). |
| Email | **Resend** | `RESEND_API_KEY`, `MAIL_FROM` | Free tier at resend.com. |
| Email | **Twilio SendGrid** | `SENDGRID_API_KEY` (or `TWILIO_EMAIL_API_KEY`), `MAIL_FROM` | Included with Twilio. |
| WhatsApp | **Twilio** (priority) | `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_WHATSAPP_FROM` | `whatsapp:+<number>`. |
| WhatsApp | **Webhook** | `WHATSAPP_WEBHOOK_URL` | Green API / 360dialog / custom. Server POSTs `{ to, text }`. |

Priority: **SMTP → Resend → SendGrid** for email, **Twilio → webhook** for WhatsApp.
Channels without credentials fall back to dry-run (message printed to the server log).

### Verify your setup

```bash
npm run notify:check     # shows which providers are detected (sends nothing)
npm run notify:test      # sends a live test to the admin's email + WhatsApp
```

A successful live test prints `sent (twilio)` / `sent (sendgrid)`. Misconfiguration
surfaces the provider's own message (e.g. an unverified sender or an unjoined sandbox).

### Who receives the notifications

Defaults match `src/config/site.ts` and can be overridden in `.env`:

```dotenv
ADMIN_EMAIL=osurejerhome@gmail.com
ADMIN_WHATSAPP=254797492910
```

## Running the API Standalone

In production (or to run the API apart from Vite):

```bash
npm run api          # starts server/index.mjs on :8787 (or NOTIFY_PORT)
```

`server/index.mjs` loads `.env` automatically (via `server/env.mjs`) and serves:

- `GET  /api/health` — liveness + detected providers (`email`, `whatsapp`)
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

> `.env` is **git-ignored** — set `ADMIN_EMAIL`, `ADMIN_WHATSAPP`, and your provider
> credentials as environment variables in the host's dashboard (or an un-tracked `.env`
> on the server). Run `npm run notify:check` on the host to confirm they were picked up.

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
