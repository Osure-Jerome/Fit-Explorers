/** Shared domain types for the Fit Explorers site content. */

export type Activity = {
  day: string
  label: string
  description: string
  icon: string
  image: string
  alt: string
}

export type Stat = {
  value: string
  label: string
}

export type ScheduleRow = {
  day: string
  time: string
  event: string
  note: string
}

/** How a visitor wants to reach the Fit Explorers admin. */
export type ContactChannel = "email" | "whatsapp"

/** Details collected from a visitor who wants to join / say hello. */
export type JoinMessage = {
  name: string
  phone?: string
  interest: string
  message: string
}
