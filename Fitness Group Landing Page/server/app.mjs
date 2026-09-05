/**
 * Shared HTTP handler for the Fit Explorers contact API.
 *
 * It is used in two places:
 *   1. Mounted directly into the Vite dev server (same-origin `/api/*`).
 *   2. Standalone Node server (`node server/index.mjs`) for production.
 */

import {
  composeContactMessage,
  makeContactSubject,
  sendEmail,
  sendWhatsApp,
} from "./notify.mjs";

/** Admin inboxes (overridable via env, defaults match the website config). */
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "osurejerhome@gmail.com";
export const ADMIN_WHATSAPP =
  process.env.ADMIN_WHATSAPP || "254797492910";

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Cache-Control": "no-store",
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > 1_000_000) {
        reject(new Error("Payload too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch {
        reject(new Error("Request body must be valid JSON."));
      }
    });
    req.on("error", reject);
  });
}

async function handleContact(req, res) {
  let payload;
  try {
    payload = await readBody(req);
  } catch (error) {
    return sendJson(res, 400, { ok: false, error: error.message });
  }

  const name = String(payload.name || "").trim();
  const message = String(payload.message || "").trim();
  if (!name || !message) {
    return sendJson(res, 400, {
      ok: false,
      error: "Name and message are required.",
    });
  }

  const details = {
    name,
    message,
    phone: String(payload.phone || "").trim() || undefined,
    interest: String(payload.interest || "").trim() || undefined,
  };

  const text = composeContactMessage(details);
  const subject = makeContactSubject(name);

  const [email, whatsapp] = await Promise.all([
    sendEmail({ to: ADMIN_EMAIL, subject, text }),
    sendWhatsApp({ to: ADMIN_WHATSAPP, text }),
  ]);

  const channels = { email, whatsapp };
  const failed = [email, whatsapp].filter((c) => c.status === "failed");

  if (failed.length === 2) {
    return sendJson(res, 502, {
      ok: false,
      error: "Notification delivery failed on all channels.",
      channels,
    });
  }

  return sendJson(res, 200, {
    ok: true,
    message: "Your message has been delivered to the Fit Explorers admin.",
    channels,
    admin: { email: ADMIN_EMAIL, whatsapp: ADMIN_WHATSAPP },
  });
}

/**
 * Routes /api/health and /api/contact. Returns true if the request was
 * handled (a response was written), false if it should be passed along.
 */
export async function handleNotifyRequest(req, res) {
  const url = req.url || "/";
  const method = req.method || "GET";

  if (method === "OPTIONS") {
    sendJson(res, 204, {});
    return true;
  }
  if (method === "GET" && url === "/api/health") {
    sendJson(res, 200, {
      ok: true,
      service: "fitexplorers-notify",
      adminEmail: ADMIN_EMAIL,
    });
    return true;
  }
  if (method === "POST" && url === "/api/contact") {
    await handleContact(req, res);
    return true;
  }
  return false;
}
