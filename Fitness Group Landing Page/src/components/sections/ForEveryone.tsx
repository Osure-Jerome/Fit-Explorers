import { IMAGES } from "@/config/site"

export default function ForEveryone() {
  return (
    <section
      id="for-everyone"
      className="relative overflow-hidden py-28 px-6 md:px-16"
      style={{ background: "var(--color-navy-mid)" }}
    >
      <div
        className="absolute -right-32 -top-32 w-96 h-96 rounded-full opacity-10"
        style={{ background: "var(--color-blue)" }}
      />
      <div
        className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full opacity-10"
        style={{ background: "var(--color-orange)" }}
      />

      <div className="relative max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p
            className="text-xs font-semibold tracking-[0.3em] uppercase mb-3"
            style={{ color: "var(--color-orange)" }}
          >
            No Barriers
          </p>
          <h2
            className="font-black uppercase text-white mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              lineHeight: 1.05,
            }}
          >
            Fitness for
            <br />
            <span style={{ color: "var(--color-orange)" }}>
              Absolutely
              <br />
              Everyone
            </span>
          </h2>
          <p
            className="text-base leading-relaxed mb-5"
            style={{ color: "var(--color-muted)" }}
          >
            We believe movement is for every human — no fitness requirement, no
            judgment. Whether you're a first-time walker or a seasoned
            marathoner, this crew has a spot for you.
          </p>
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--color-muted)" }}
          >
            We go at our own pace and we look after each other. That's the deal.
          </p>
        </div>

        <div className="relative">
          <img
            src={IMAGES.founder}
            alt="Fit Explorers members smiling and moving together"
            className="w-full rounded-2xl object-cover"
            style={{ height: "420px" }}
          />
          <div
            className="absolute -bottom-4 -left-4 px-5 py-4 rounded-xl shadow-xl"
            style={{ background: "var(--color-orange)" }}
          >
            <p
              className="font-black text-3xl text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              All Welcome
            </p>
            <p className="text-xs font-semibold uppercase tracking-wider mt-0.5 text-white/80">
              No exceptions
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
