import { CONTACT, SITE } from "@/config/site"

export default function Footer() {
  return (
    <footer
      className="py-10 px-6 md:px-16 border-t"
      style={{
        background: "var(--color-navy)",
        borderColor: "rgba(27,94,166,0.2)",
      }}
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={SITE.logo}
            alt="Fit Explorers"
            className="w-9 h-9 rounded-full object-cover"
          />
          <span
            style={{ fontFamily: "var(--font-display)" }}
            className="text-xl font-black tracking-widest uppercase text-white"
          >
            Fit <span style={{ color: "var(--color-orange)" }}>Explorers</span>
          </span>
        </div>
        <p
          className="text-xs tracking-wider uppercase text-center"
          style={{ color: "var(--color-muted)" }}
        >
          Fitness for all. Every pace. Every week.
        </p>
        <p className="text-xs" style={{ color: "var(--color-muted)" }}>
          © {new Date().getFullYear()} Fit Explorers
        </p>
      </div>

      {/* Contact channel quick links */}
      <div
        className="max-w-5xl mx-auto mt-8 pt-6 flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-2 border-t"
        style={{ borderColor: "rgba(27,94,166,0.2)" }}
      >
        <a
          href={`mailto:${CONTACT.email}`}
          className="text-xs tracking-wide hover:text-white transition-colors"
          style={{ color: "var(--color-muted)" }}
        >
          ✉ {CONTACT.email}
        </a>
        <a
          href={`https://wa.me/${CONTACT.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs tracking-wide hover:text-white transition-colors"
          style={{ color: "var(--color-muted)" }}
        >
          WhatsApp {CONTACT.whatsappDisplay}
        </a>
      </div>
    </footer>
  )
}
