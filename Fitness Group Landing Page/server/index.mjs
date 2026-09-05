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
import { handleNotifyRequest } from "./app.mjs";

const PORT = Number(process.env.NOTIFY_PORT || 8787);

const server = http.createServer(async (req, res) => {
  const handled = await handleNotifyRequest(req, res);
  if (!handled) {
    res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ ok: false, error: "Not found" }));
  }
});

server.listen(PORT, () => {
  console.log(
    `[notify] Fit Explorers notification API → http://localhost:${PORT}`,
  );
});
