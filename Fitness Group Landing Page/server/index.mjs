/**
 * Standalone Node server for the Fit Explorers contact API.
 *
 * Run:   node --env-file-if-missing=.env server/index.mjs
 * Script: pnpm api
 *
 * In development the same handler is mounted inside the Vite server, so
 * you only need this when running the API separately (or in production
 * behind a reverse proxy).
 */

import http from "node:http";
import { ADMIN_EMAIL, ADMIN_WHATSAPP, handleNotifyRequest } from "./app.mjs";
import { describeProviders } from "./notify.mjs";

const PORT = Number(process.env.NOTIFY_PORT || 8787);

const server = http.createServer(async (req, res) => {
  const handled = await handleNotifyRequest(req, res);
  if (!handled) {
    res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ ok: false, error: "Not found" }));
  }
});

server.listen(PORT, () => {
  const providers = describeProviders();
  console.log(
    `[notify] Fit Explorers notification API → http://localhost:${PORT}`,
  );
  console.log(`[notify] Admin email → ${ADMIN_EMAIL} (${providers.email})`);
  console.log(`[notify] Admin WhatsApp → ${ADMIN_WHATSAPP} (${providers.whatsapp})`);
  if (providers.email === "dry-run" || providers.whatsapp === "dry-run") {
    console.warn(
      "[notify] One or more channels are in dry-run mode. Add credentials to .env (see env.example).",
    );
  }
});
