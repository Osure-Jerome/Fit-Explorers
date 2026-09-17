import { useState, type CSSProperties, type FormEvent } from "react";
import { ACTIVITIES, CONTACT } from "@/config/site";
import { submitToAdmin } from "@/lib/notify";

const INPUT_STYLE: CSSProperties = {
  background: "rgba(13,30,58,0.55)",
  borderColor: "rgba(27,94,166,0.35)",
};

const inputClass =
  "w-full px-4 py-3 rounded-lg text-sm text-white outline-none transition-colors placeholder-white/30 border focus:border-white/40";

const DEFAULT_MESSAGE =
  "Hi Fit Explorers! I'd love to join the crew and start moving together. When is the next session?";

type SubmitStatus = "idle" | "sending" | "success" | "error";

export default function JoinMessageForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [statusText, setStatusText] = useState("");

  const resetStatus = () => {
    if (status === "success" || status === "error") setStatus("idle");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      setStatus("error");
      setStatusText("Please tell us your name so the admin knows who's saying hi.");
      return;
    }
    if (!message.trim()) {
      setStatus("error");
      setStatusText("Please leave a short message so the admin can help you out.");
      return;
    }

    setStatus("sending");
    setStatusText("Sending straight to the Fit Explorers admin…");

    try {
      await submitToAdmin({
        name: name.trim(),
        phone: phone.trim() || undefined,
        interest: interest.trim(),
        message: message.trim(),
      });
      setStatus("success");
      setStatusText(
        `Message sent! The admin gets it by email and WhatsApp — expect a reply soon.`,
      );
      setName("");
      setPhone("");
      setInterest("");
      setMessage(DEFAULT_MESSAGE);
    } catch (error) {
      setStatus("error");
      setStatusText(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
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
        Sent instantly to {CONTACT.email} and {CONTACT.whatsappDisplay} — no
        email app or WhatsApp needed on your side.
      </p>

      <div className="space-y-4">
        <div>
          <label htmlFor="join-name" className="block text-xs font-semibold uppercase tracking-wider mb-2 text-white/70">
            Your name *
          </label>
          <input
            id="join-name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              resetStatus();
            }}
            placeholder="e.g. Achieng Otieno"
            className={inputClass}
            style={INPUT_STYLE}
          />
        </div>

        <div>
          <label htmlFor="join-phone" className="block text-xs font-semibold uppercase tracking-wider mb-2 text-white/70">
            Phone / WhatsApp (optional)
          </label>
          <input
            id="join-phone"
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              resetStatus();
            }}
            placeholder="e.g. +254 7XX XXX XXX"
            className={inputClass}
            style={INPUT_STYLE}
          />
        </div>

        <div>
          <label htmlFor="join-interest" className="block text-xs font-semibold uppercase tracking-wider mb-2 text-white/70">
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
          <label htmlFor="join-message" className="block text-xs font-semibold uppercase tracking-wider mb-2 text-white/70">
            Your message *
          </label>
          <textarea
            id="join-message"
            rows={4}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              resetStatus();
            }}
            className={`${inputClass} resize-none`}
            style={INPUT_STYLE}
          />
        </div>
      </div>

      {status === "success" && (
        <p
          className="mt-4 rounded-lg px-4 py-3 text-sm text-white"
          style={{ background: "rgba(37,211,102,0.18)", border: "1px solid rgba(37,211,102,0.45)" }}
        >
          ✓ {statusText}
        </p>
      )}
      {status === "error" && (
        <p
          className="mt-4 rounded-lg px-4 py-3 text-sm text-white"
          style={{ background: "rgba(240,90,40,0.18)", border: "1px solid var(--color-orange)" }}
        >
          {statusText}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full px-5 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all hover:opacity-90 hover:scale-[1.01] disabled:opacity-60 disabled:hover:scale-100 cursor-pointer"
        style={{ background: "var(--color-orange)", color: "white" }}
      >
        {status === "sending" ? "Sending…" : "Send to Admin →"}
      </button>

      <p className="mt-5 text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>
        The admin receives your message automatically by email and WhatsApp. No
        forms to sign, no fees — just say hello.
      </p>
    </form>
  );
}
