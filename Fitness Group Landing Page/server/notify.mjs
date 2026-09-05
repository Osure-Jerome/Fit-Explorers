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
 *     - otherwise: DRY-RUN (logged only)
 *
 *   WHATSAPP (priority order)
 *     - Twilio WhatsApp Cloud API     TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN,
 *                                     TWILIO_WHATSAPP_FROM
 *     - Generic webhook               WHATSAPP_WEBHOOK_URL
 *     - otherwise: DRY-RUN (logged only)
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

  // 3) No provider configured — dry run so local flows stay testable.
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
      const from = process.env.TWILIO_WHATSAPP_FROM;
      if (!from) throw new Error("TWILIO_WHATSAPP_FROM is not configured");
      const body = new URLSearchParams({
        To: `whatsapp:+${to}`,
        From: from,
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
      if (!response.ok) {
        throw new Error(`Twilio responded with status ${response.status}`);
      }
      return { status: "sent", provider: "twilio" };
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
    `[whatsapp:dry-run] Would send WhatsApp to whatsapp:+${to}\n\n${text}`,
  );
  return { status: "dry-run", provider: "none", to };
}
