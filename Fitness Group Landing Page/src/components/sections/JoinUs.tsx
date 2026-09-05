import { CONTACT } from "@/config/site"
import JoinMessageForm from "@/components/join/JoinMessageForm"

export default function JoinUs() {
  return (
    <section
      id="join-us"
      className="py-28 px-6 md:px-16"
      style={{ background: "var(--color-blue)" }}
    >
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-3 text-white/60">
            Ready to move?
          </p>
          <h2
            className="font-black uppercase leading-none mb-6 text-white"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 7vw, 6rem)",
            }}
          >
            Join the
            <br />
            <span style={{ color: "var(--color-orange)" }}>Explorers</span>
          </h2>
          <p className="text-base leading-relaxed mb-2 text-white/80">
            Getting started is simple. Message the admin on WhatsApp or email
            and we'll get you added to the group. First session is on us — just
            show up.
          </p>
          <p className="text-sm font-medium text-white/60">
            No fees to join, no experience needed — just say hello.
          </p>

          {/* Quick direct channels */}
          <div className="mt-8 flex flex-col gap-4">
            <a
              href={`https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(
                "Hi Fit Explorers! I'd love to join the crew. When is the next session?",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 p-6 rounded-2xl transition-all hover:scale-[1.02] group"
              style={{ background: "var(--color-navy)" }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "#25D366" }}
              >
                <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <div
                  className="font-black uppercase text-xl text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  WhatsApp
                </div>
                <div className="text-sm text-white/50">
                  {CONTACT.whatsappDisplay}
                </div>
              </div>
              <div className="ml-auto text-white/30 group-hover:text-white transition-colors text-xl">
                →
              </div>
            </a>

            <a
              href={`mailto:${CONTACT.email}?subject=${encodeURIComponent("Joining Fit Explorers")}`}
              className="flex items-center gap-5 p-6 rounded-2xl transition-all hover:scale-[1.02] group"
              style={{ background: "var(--color-navy-mid)" }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "rgba(240,90,40,0.2)" }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ color: "var(--color-orange)" }}
                >
                  <path
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <div
                  className="font-black uppercase text-xl text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Email Us
                </div>
                <div className="text-sm text-white/50">{CONTACT.email}</div>
              </div>
              <div className="ml-auto text-white/30 group-hover:text-white transition-colors text-xl">
                →
              </div>
            </a>
          </div>
        </div>

        {/* Composed message form -> admin email / WhatsApp */}
        <JoinMessageForm />
      </div>
    </section>
  )
}
