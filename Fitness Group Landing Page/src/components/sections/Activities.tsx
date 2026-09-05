import { ACTIVITIES } from "@/config/site"

export default function Activities() {
  return (
    <section
      id="activities"
      className="py-24 px-6 md:px-16"
      style={{ background: "var(--color-navy)" }}
    >
      <div className="max-w-6xl mx-auto">
        <p
          className="text-xs font-semibold tracking-[0.3em] uppercase mb-3"
          style={{ color: "var(--color-orange)" }}
        >
          What We Do
        </p>
        <h2
          className="font-black uppercase text-white mb-16"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            lineHeight: 1,
          }}
        >
          Our Activities
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACTIVITIES.map((act) => (
            <div
              key={act.label}
              className="group relative overflow-hidden rounded-2xl cursor-default transition-transform hover:-translate-y-1"
              style={{ background: "var(--color-navy-mid)" }}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={act.image}
                  alt={act.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(13,30,58,0.8) 0%, transparent 60%)",
                  }}
                />
                <div
                  className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-white"
                  style={{ background: "var(--color-orange)" }}
                >
                  {act.day}
                </div>
              </div>
              <div className="p-6">
                <div className="text-2xl mb-2">{act.icon}</div>
                <h3
                  className="font-black uppercase text-white text-2xl mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {act.label}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-muted)" }}
                >
                  {act.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
