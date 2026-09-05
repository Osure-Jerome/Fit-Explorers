import type { IncomingMessage, ServerResponse } from "node:http";

/** Admin email inbox used by the notification API. */
export declare const ADMIN_EMAIL: string;

/** Admin WhatsApp number (dialable, no + prefix) used by the API. */
export declare const ADMIN_WHATSAPP: string;

/**
 * Handles /api/contact and /api/health requests.
 * Resolves `true` if the request was handled (a response was written),
 * `false` if it should be passed to the next middleware.
 */
export declare function handleNotifyRequest(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<boolean>;
