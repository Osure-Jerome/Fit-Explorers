import { useState, type CSSProperties, type FormEvent } from "react"
import { ACTIVITIES, CONTACT } from "@/config/site"
import { buildContactLink } from "@/lib/contact"
import type { ContactChannel } from "@/types/content"

const INPUT_STYLE: CSSProperties = {
  background: "rgba(13,30,58,0.55)",
  borderColor: "rgba(27,94,166,0.35)",
}

const inputClass =
  "w-full px-4 py-3 rounded-lg text-sm text-white outline-none transition-colors placeholder-white/30 border focus:border-white/40"

const DEFAULT_MESSAGE =
  "Hi Fit Explorers! I'd love to join the crew and start moving together. When is the next session?"

export default function JoinMessageForm() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [interest, setInterest] = useState("")
  const [message, setMessage] = useState(DEFAULT_MESSAGE)
  const [error, setError] = useState("")
  const [hint, setHint] = useState("")

  const handleSend = (channel: ContactChannel) => {
    if (!name.trim()) {
      setError("Please tell us your name so the admin knows who's saying hi.")
      return
    }
    if (!message.trim()) {
      setError("Please leave a short message so the admin can help you out.")
      return
    }
    setError("")

    const url = buildContactLink(channel, {
      name: name.trim(),
      phone: phone.trim() || undefined,
      interest: interest.trim(),
      message: message.trim(),
    })

    if (channel === "whatsapp") {
      window.open(url, "_blank", "noopener,noreferrer")
      setHint("WhatsApp is opening with your message ready — just hit send.")
    } else {
      window.location.href = url
      setHint(
        "Your email app is opening with a message addressed to our admin.",
      )
    }
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleSend("email")
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl p-6 md:p-8 shadow-xl"
      style={{ background: "var(--color-navy-mid)" }}
    >
      <h3
        className="font-black uppercase text-white text-2xl mb-1"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Message the Admin
      </h3>
      <p className="text-xs mb-6" style={{ color: "var(--color-muted)" }}>
        Tell us about yourself — then send it by email or WhatsApp.
      </p>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="join-name"
            className="block text-xs font-semibold uppercase tracking-wider mb-2 text-white/70"
          >
            Your name *
          </label>
          <input
            id="join-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Achieng Otieno"
            className={inputClass}
            style={INPUT_STYLE}
          />
        </div>

        <div>
          <label
            htmlFor="join-phone"
            className="block text-xs font-semibold uppercase tracking-wider mb-2 text-white/70"
          >
            Phone / WhatsApp (optional)
          </label>
          <input
            id="join-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. +254 7XX XXX XXX"
            className={inputClass}
            style={INPUT_STYLE}
          />
        </div>

        <div>
          <label
            htmlFor="join-interest"
            className="block text-xs font-semibold uppercase tracking-wider mb-2 text-white/70"
          >
            What interests you?
          </label>
          <select
            id="join-interest"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className={inputClass}
            style={INPUT_STYLE}
          >
            <option value="">Anything & everything</option>
            {ACTIVITIES.map((act) => (
              <option key={act.label} value={act.label}>
                {act.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="join-message"
            className="block text-xs font-semibold uppercase tracking-wider mb-2 text-white/70"
          >
            Your message *
          </label>
          <textarea
            id="join-message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${inputClass} resize-none`}
            style={INPUT_STYLE}
          />
        </div>
      </div>

      {error && (
        <p className="mt-4 text-sm" style={{ color: "var(--color-orange)" }}>
          {error}
        </p>
      )}
      {hint && <p className="mt-4 text-sm text-white/70">{hint}</p>}

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          className="flex-1 px-5 py-3.5 rounded-full font-semibold uppercase tracking-widest text-xs transition-all hover:opacity-90 cursor-pointer"
          style={{ background: "var(--color-orange)", color: "white" }}
        >
          ✉ Email Admin
        </button>
        <button
          type="button"
          onClick={() => handleSend("whatsapp")}
          className="flex-1 px-5 py-3.5 rounded-full font-semibold uppercase tracking-widest text-xs transition-all hover:opacity-90 cursor-pointer"
          style={{ background: "#25D366", color: "#062b1a" }}
        >
          WhatsApp Admin
        </button>
      </div>

      <p
        className="mt-5 text-xs leading-relaxed"
        style={{ color: "var(--color-muted)" }}
      >
        Sends to {CONTACT.email} or {CONTACT.whatsappDisplay}. No signup, no
        fees — your email or WhatsApp app will open with everything ready.
      </p>
    </form>
  )
}
