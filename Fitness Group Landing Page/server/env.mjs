/**
 * Loads `.env` into process.env for the notification API.
 *
 * Importing this module for its side effect (before reading any config) makes
 * provider credentials available in BOTH run modes:
 *   1. Standalone server (`node server/index.mjs`)
 *   2. The API mounted inside the Vite dev server
 *
 * Uses Node's built-in `process.loadEnvFile` (Node >= 20.12) so there is no
 * dotenv dependency. Existing process.env values always win.
 */

import { existsSync } from "node:fs";
import path from "node:path";

const explicit = process.env.ENV_FILE;
const envPath = explicit
  ? path.resolve(process.cwd(), explicit)
  : path.resolve(process.cwd(), ".env");

if (existsSync(envPath) && typeof process.loadEnvFile === "function") {
  try {
    process.loadEnvFile(envPath);
    console.log(`[notify] Loaded environment from ${path.relative(process.cwd(), envPath) || ".env"}`);
  } catch (error) {
    console.warn(`[notify] Failed to load ${envPath}: ${error.message}`);
  }
}
