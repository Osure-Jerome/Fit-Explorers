/**
 * Notification providers for the Fit Explorers contact API.
 *
 * These run server-side so the admin's real email address and WhatsApp
 * number are contacted directly — the visitor never opens their own
 * mail/WhatsApp app.
 *
 * Providers are chosen from environment variables:
 *
 *   EMAIL (priority order)
 *     - SMTP   (Gmail/Outlook/etc.)  SMTP_HOST, SMTP_PORT, SMTP_SECURE,
 *                                     SMTP_USER, SMTP_PASS, MAIL_FROM
 *     - Resend (HTTP API)             RESEND_API_KEY, MAIL_FROM
 *     - Twilio SendGrid (HTTP API)    SENDGRID_API_KEY (or TWILIO_EMAIL_API_KEY),
 *                                     MAIL_FROM
 *     - otherwise: DRY-RUN (logged only)
 *
 *   WHATSAPP (priority order)
 *     - Twilio WhatsApp API           TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN,
 *                                     TWILIO_WHATSAPP_FROM
 *     - Generic webhook               WHATSAPP_WEBHOOK_URL
 *     - otherwise: DRY-RUN (logged only)
 *
 * Use `node server/check.mjs` to see which providers are active, and
 * `node server/check.mjs --send` to send a live test to the admin.
 *
 * See `.env.example` at the project root.
 */

import nodemailer from "nodemailer";

/** Plain-text message body describing a new website contact enquiry. */
export function composeContactMessage({ name, phone, interest, message }) {
  return [
    "Hi Fit Explorers admin,",
    "",
    "A new message just came in from the website:",
    "",
    `Name: ${name}`,
    phone ? `Phone / WhatsApp: ${phone}` : null,
    interest ? `Interested in: ${interest}` : null,
    "",
    "Message:",
    message || "",
    "",
    "— Sent from the Fit Explorers website contact form.",
  ]
    .filter((line) => line !== null && line !== undefined)
    .join("\n");
}

export function makeContactSubject(name) {
  return name
    ? `New Fit Explorers enquiry — ${name}`
    : "New Fit Explorers enquiry";
}

/** Parses `"Name <email@example.com>"` (or a bare email) into SendGrid's `{ name, email }`. */
export function parseFromAddress(value) {
  const match = /^\s*(.*?)\s*<([^>]+)>\s*$/.exec(value || "");
  if (match) return { name: match[1] || undefined, email: match[2] };
  return { email: (value || "").trim() };
}

/** Normalises a phone number to WhatsApp's `whatsapp:+<digits>` format. */
export function toWhatsAppAddress(value) {
  const digits = String(value || "")
    .replace(/^whatsapp:/, "")
    .replace(/^\+/, "");
  return `whatsapp:+${digits}`;
}

/** Reports which provider handles each channel ("dry-run" when none is set). */
export function describeProviders() {
  const email = process.env.SMTP_HOST
    ? "smtp"
    : process.env.RESEND_API_KEY
      ? "resend"
      : process.env.SENDGRID_API_KEY || process.env.TWILIO_EMAIL_API_KEY
        ? "sendgrid"
        : "dry-run";

  const whatsapp =
    process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
      ? "twilio"
      : process.env.WHATSAPP_WEBHOOK_URL
        ? "webhook"
        : "dry-run";

  return { email, whatsapp };
}

/** Sends an email to the admin. Resolves to a delivery report. */
export async function sendEmail({ to, subject, text }) {
  const smtpHost = process.env.SMTP_HOST;

  // 1) SMTP transport (nodemailer) — works with Gmail app passwords etc.
  if (smtpHost) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER || "",
          pass: process.env.SMTP_PASS || "",
        },
      });
      await transporter.sendMail({
        from: process.env.MAIL_FROM || `"Fit Explorers Website" <${to}>`,
        to,
        subject,
        text,
      });
      return { status: "sent", provider: "smtp" };
    } catch (error) {
      return { status: "failed", provider: "smtp", error: error.message };
    }
  }

  // 2) Resend HTTP API
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const from =
        process.env.MAIL_FROM || "Fit Explorers <onboarding@resend.dev>";
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from, to: [to], subject, text }),
      });
      if (!response.ok) {
        throw new Error(`Resend responded with status ${response.status}`);
      }
      return { status: "sent", provider: "resend" };
    } catch (error) {
      return { status: "failed", provider: "resend", error: error.message };
    }
  }

  // 3) Twilio SendGrid email API (Twilio's email product)
  const sendgridKey =
    process.env.SENDGRID_API_KEY || process.env.TWILIO_EMAIL_API_KEY;
  if (sendgridKey) {
    try {
      const from = parseFromAddress(process.env.MAIL_FROM || to);
      const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sendgridKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: to }] }],
          from,
          subject,
          content: [{ type: "text/plain", value: text }],
        }),
      });
      if (!response.ok) {
        const detail = await response.text().catch(() => "");
        throw new Error(
          `SendGrid responded ${response.status}${detail ? `: ${detail.slice(0, 200)}` : ""}`,
        );
      }
      return { status: "sent", provider: "sendgrid" };
    } catch (error) {
      return { status: "failed", provider: "sendgrid", error: error.message };
    }
  }

  // 4) No provider configured — dry run so local flows stay testable.
  console.log(
    `[email:dry-run] Would send email to ${to}\nSubject: ${subject}\n\n${text}`,
  );
  return { status: "dry-run", provider: "none", to };
}

/** Sends a WhatsApp message to the admin. Resolves to a delivery report. */
export async function sendWhatsApp({ to, text }) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  // 1) Twilio WhatsApp Cloud API
  if (accountSid && authToken) {
    try {
      const rawFrom = process.env.TWILIO_WHATSAPP_FROM;
      if (!rawFrom) {
        throw new Error("TWILIO_WHATSAPP_FROM is not configured");
      }
      const body = new URLSearchParams({
        To: toWhatsAppAddress(to),
        From: toWhatsAppAddress(rawFrom),
        Body: text,
      });
      const response = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
        {
          method: "POST",
          headers: {
            Authorization:
              "Basic " +
              Buffer.from(`${accountSid}:${authToken}`).toString("base64"),
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: body.toString(),
        },
      );
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(
          data?.message
            ? `Twilio: ${data.message}`
            : `Twilio responded with status ${response.status}`,
        );
      }
      return { status: "sent", provider: "twilio", sid: data?.sid };
    } catch (error) {
      return { status: "failed", provider: "twilio", error: error.message };
    }
  }

  // 2) Generic webhook provider (e.g. Green API, 360dialog, custom gateway)
  const webhookUrl = process.env.WHATSAPP_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: `whatsapp:+${to}`, text }),
      });
      if (!response.ok) {
        throw new Error(`Webhook responded with status ${response.status}`);
      }
      return { status: "sent", provider: "webhook" };
    } catch (error) {
      return { status: "failed", provider: "webhook", error: error.message };
    }
  }

  // 3) No provider configured — dry run so local flows stay testable.
  console.log(
    `[whatsapp:dry-run] Would send WhatsApp to ${toWhatsAppAddress(to)}\n\n${text}`,
  );
  return { status: "dry-run", provider: "none", to };
}
