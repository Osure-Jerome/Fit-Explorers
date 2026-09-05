import { CONTACT } from "@/config/site"
import type { ContactChannel, JoinMessage } from "@/types/content"

/** Plain-text message body composed from the visitor's join details. */
export function composeJoinMessage({
  name,
  phone,
  interest,
  message,
}: JoinMessage): string {
  const lines = [
    `Hi Fit Explorers! My name is ${name}.`,
    interest ? `I'm interested in: ${interest}.` : "",
    message ? `\n${message}\n` : "",
    phone ? `You can reach me back on: ${phone}` : "",
    "\n— Sent from the Fit Explorers website.",
  ]
  return lines.filter(Boolean).join("\n")
}

/**
 * Builds a mailto: link that opens the visitor's email app with a
 * message pre-composed and addressed to the Fit Explorers admin.
 */
export function buildEmailLink(details: JoinMessage): string {
  const subject = details.name
    ? `Joining Fit Explorers — ${details.name}`
    : "Joining Fit Explorers"
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(composeJoinMessage(details))}`
}

/**
 * Builds a WhatsApp deep link that opens a chat with the Fit
 * Explorers admin number, pre-filled with the composed message.
 */
export function buildWhatsAppLink(details: JoinMessage): string {
  const text = composeJoinMessage(details)
  return `https://wa.me/${CONTACT.whatsappNumber}${
    text ? `?text=${encodeURIComponent(text)}` : ""
  }`
}

/** Returns the right outbound destination for a chosen channel. */
export function buildContactLink(
  channel: ContactChannel,
  details: JoinMessage,
): string {
  return channel === "email"
    ? buildEmailLink(details)
    : buildWhatsAppLink(details)
}
