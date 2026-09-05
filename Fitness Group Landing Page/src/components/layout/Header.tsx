import { useState } from "react"
import { CONTACT, NAV_LINKS, SITE } from "@/config/site"
import { scrollToId } from "@/lib/scroll"

function slugify(label: string): string {
  return label.toLowerCase().replace(/\s+/g, "-")
}

/** Resolves a nav label (incl. CTA) to its scroll target section id. */
function sectionIdFor(label: string): string {
  return label === "Join Now" ? "join-us" : slugify(label)
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNav = (label: string) => {
    scrollToId(sectionIdFor(label))
    setMenuOpen(false)
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-3"
        style={{
          background:
            "linear-gradient(to bottom, rgba(13,30,58,0.97) 0%, transparent 100%)",
        }}
      >
        {/* Logo + wordmark */}
        <div className="flex items-center gap-3">
          <img
            src={SITE.logo}
            alt="Fit Explorers Logo"
            className="w-11 h-11 rounded-full object-cover"
          />
          <span
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-white)",
            }}
            className="text-2xl font-black tracking-widest uppercase hidden sm:block"
          >
            Fit <span style={{ color: "var(--color-orange)" }}>Explorers</span>
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => handleNav(link)}
              className="text-sm font-medium tracking-wider uppercase text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => handleNav("Join Now")}
            className="px-5 py-2 text-sm font-semibold uppercase tracking-wider rounded-full transition-all hover:opacity-90 cursor-pointer"
            style={{
              background: "var(--color-orange)",
              color: "var(--color-white)",
            }}
          >
            Join Now
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white text-2xl cursor-pointer"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
          style={{ background: "var(--color-navy)" }}
        >
          {[...NAV_LINKS, "Join Now"].map((link) => (
            <button
              key={link}
              onClick={() => handleNav(link)}
              className="text-3xl font-black uppercase tracking-widest cursor-pointer"
              style={{
                fontFamily: "var(--font-display)",
                color: link === "Join Now" ? "var(--color-orange)" : "white",
              }}
            >
              {link}
            </button>
          ))}

          {/* Contact quick actions inside the mobile menu */}
          <div className="mt-6 flex flex-col items-center gap-3 text-sm">
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-white/60 hover:text-white transition-colors"
            >
              {CONTACT.email}
            </a>
            <a
              href={`https://wa.me/${CONTACT.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
            >
              {CONTACT.whatsappDisplay}
            </a>
          </div>
        </div>
      )}
    </>
  )
}
