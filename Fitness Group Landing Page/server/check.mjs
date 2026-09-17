/**
 * Credential check / test-send for the Fit Explorers notification API.
 *
 *   node server/check.mjs          # show which providers are configured
 *   node server/check.mjs --send   # also send a live test to the admin
 *
 * Reads credentials from `.env` (see env.example).
 * Also available as: npm run notify:check / npm run notify:test
 */

import "./env.mjs";
import { ADMIN_EMAIL, ADMIN_WHATSAPP } from "./app.mjs";
import { describeProviders, sendEmail, sendWhatsApp } from "./notify.mjs";

const shouldSend = process.argv.includes("--send");
const providers = describeProviders();

console.log("Fit Explorers notification configuration\n");
console.log(`  Admin email       : ${ADMIN_EMAIL}`);
console.log(`  Admin WhatsApp    : ${ADMIN_WHATSAPP}`);
console.log(`  Email provider    : ${providers.email}`);
console.log(`  WhatsApp provider : ${providers.whatsapp}`);

const missing = [];
if (providers.email === "dry-run") {
  missing.push("email (SMTP_* / RESEND_API_KEY / SENDGRID_API_KEY)");
}
if (providers.whatsapp === "dry-run") {
  missing.push("WhatsApp (TWILIO_* / WHATSAPP_WEBHOOK_URL)");
}
if (missing.length) {
  console.log(`\nNot configured yet (will dry-run): ${missing.join(", ")}`);
  console.log("Copy env.example to .env and fill in the values.");
}

if (!shouldSend) {
  console.log("\nRun `node server/check.mjs --send` to send a live test to the admin.");
  process.exit(0);
}

const text = [
  "Fit Explorers notification test",
  "",
  "If you received this, your contact form auto-notifications are working.",
  `Sent: ${new Date().toISOString()}`,
].join("\n");

console.log("\nSending test notification…");
const [email, whatsapp] = await Promise.all([
  sendEmail({
    to: ADMIN_EMAIL,
    subject: "[Fit Explorers] Notification test",
    text,
  }),
  sendWhatsApp({ to: ADMIN_WHATSAPP, text }),
]);

console.log(`  email    : ${email.status} (${email.provider}) ${email.error ?? ""}`);
console.log(
  `  whatsapp : ${whatsapp.status} (${whatsapp.provider}) ${whatsapp.error ?? ""}`,
);

const failed = [email, whatsapp].filter((result) => result.status === "failed");
if (failed.length) {
  console.error(
    "\n[x] Some channels failed. Check the messages above and your .env credentials.",
  );
  process.exit(1);
}
if (email.status === "dry-run" || whatsapp.status === "dry-run") {
  console.warn(
    "\n[!] Dry-run: no real message was sent for the channels marked dry-run.",
  );
}
console.log("\n[ok] Test complete.");
