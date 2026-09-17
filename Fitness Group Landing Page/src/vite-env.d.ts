/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the notification API. Empty = same origin `/api`. */
  readonly VITE_API_BASE_URL?: string;
}
