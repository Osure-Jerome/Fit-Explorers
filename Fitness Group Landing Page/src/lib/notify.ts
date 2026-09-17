import type { JoinMessage } from "@/types/content";

/** Delivery status returned by the server for one notification channel. */
export type ChannelStatus = "sent" | "dry-run" | "failed";

export type ChannelResult = {
  status: ChannelStatus;
  provider: string;
  /** Present when status is "failed". */
  error?: string;
  /** Present for dry-runs — shows where the message would have gone. */
  to?: string;
};

export type NotifyChannels = {
  email: ChannelResult;
  whatsapp: ChannelResult;
};

export type NotifyResponse = {
  ok: boolean;
  message?: string;
  error?: string;
  channels?: NotifyChannels;
  admin?: { email: string; whatsapp: string };
};

/**
 * API base URL. Empty by default = same origin (`/api/contact`), which is
 * what the Vite dev server provides. Point it at your deployed API for
 * production via the `VITE_API_BASE_URL` env var if needed.
 */
const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/+$/, "");

/**
 * Submits a join/contact message to the admin notification API.
 * The server delivers it to the admin's email and WhatsApp directly —
 * no mail or messaging app is opened on the visitor's device.
 */
export async function submitToAdmin(
  details: JoinMessage,
): Promise<NotifyResponse> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details),
    });
  } catch {
    throw new Error(
      "Could not reach the notification service. Please check your connection and try again.",
    );
  }

  let data: NotifyResponse | null = null;
  try {
    data = (await response.json()) as NotifyResponse;
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(
      data?.error || `Something went wrong (${response.status}). Please try again.`,
    );
  }

  return data ?? { ok: true };
}
