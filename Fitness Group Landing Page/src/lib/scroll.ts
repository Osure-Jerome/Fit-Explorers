/** Smoothly scrolls the window to a section by its DOM id. */
export function scrollToId(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}
