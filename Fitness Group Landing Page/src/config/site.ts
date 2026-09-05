import logo from "@/assets/images/Fitexplorers_Logo.jpeg"
import imgHillRepeats from "@/assets/images/Hill_Repeats.jpeg"
import imgSaturdayWalk from "@/assets/images/Saturday_Long_walk.jpeg"
import imgTheGang from "@/assets/images/The_gang.jpeg"
import imgMeetup from "@/assets/images/Meetup.jpeg"
import imgEvents from "@/assets/images/Events.jpeg"
import imgFounder from "@/assets/images/Founder.jpeg"

import type { Activity, ScheduleRow, Stat } from "@/types/content"

/** Central contact details for the Fit Explorers admin. */
export const CONTACT = {
  /** Admin email inbox — receives join requests & messages. */
  email: "osurejerhome@gmail.com",
  /** Admin WhatsApp number in international (dialable) format. */
  whatsappNumber: "254797492910",
  /** Human-friendly display version of the number. */
  whatsappDisplay: "+254 797 492 910",
} as const

export const SITE = {
  name: "Fit Explorers",
  tagline: "Move Together. Go Further.",
  logo,
} as const

export const NAV_LINKS = ["Activities", "For Everyone", "Join Us"] as const

export const ACTIVITIES: Activity[] = [
  {
    day: "Thursday",
    label: "Hill Repeats",
    description:
      "The Custome — our signature Thursday hill session. We attack the incline together, push our limits, and earn every summit.",
    icon: "⛰️",
    image: imgHillRepeats,
    alt: "Fit Explorers members holding the group flag after a hill repeats session",
  },
  {
    day: "Saturday",
    label: "Group Runs & Walks",
    description:
      "Weekends belong to us. Whether you run or walk, Saturdays are for showing up, connecting, and moving at your own pace.",
    icon: "🏃",
    image: imgSaturdayWalk,
    alt: "Fit Explorers members at Maseno University gate on a Saturday long walk",
  },
  {
    day: "Anytime",
    label: "Hiking Adventures",
    description:
      "We explore trails, ridgelines, and peaks across the region. Every hike is a chance to discover a new place and make new friends.",
    icon: "🥾",
    image: imgMeetup,
    alt: "Fit Explorers night meetup and outing",
  },
  {
    day: "Monthly",
    label: "Challenges",
    description:
      "Distance goals, elevation targets, consistency streaks — each month brings a new challenge to keep you fired up and accountable.",
    icon: "🏆",
    image:
      "https://images.unsplash.com/photo-1788283574055-c8f1ee20a8c4?w=700&h=500&fit=crop&auto=format",
    alt: "Group of people hiking together in a challenge",
  },
  {
    day: "Ongoing",
    label: "Public Events",
    description:
      "Get invited to local races, community events, and organised fitness days. We share opportunities so no one misses out.",
    icon: "📅",
    image: imgEvents,
    alt: "Fit Explorers members marching at the Kisumu Breastfeeding Awareness Walk public event",
  },
]

export const STATS: Stat[] = [
  { value: "2×", label: "Weekly sessions" },
  { value: "All", label: "Welcome here" },
  { value: "0", label: "Fitness required" },
  { value: "∞", label: "Good times ahead" },
]

export const SCHEDULE: ScheduleRow[] = [
  {
    day: "Thursday",
    time: "Early morning",
    event: "Hill Repeats — The Custome",
    note: "Signature session",
  },
  {
    day: "Saturday",
    time: "Morning",
    event: "Group Run & Walk",
    note: "All paces welcome",
  },
  {
    day: "Monthly",
    time: "TBA",
    event: "Challenge Drop",
    note: "New goal each month",
  },
  {
    day: "Ongoing",
    time: "As they come",
    event: "Public Event Invites",
    note: "Community races & more",
  },
]

/** Imagery used across the page. */
export const IMAGES = {
  gang: imgTheGang,
  founder: imgFounder,
} as const
