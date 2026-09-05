import { STATS } from "@/config/site"

export default function Stats() {
  return (
    <section
      className="py-10 px-6 md:px-16"
      style={{ background: "var(--color-orange)" }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <div
              className="font-black text-5xl md:text-6xl text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {s.value}
            </div>
            <div className="text-xs font-semibold uppercase tracking-widest mt-1 text-white/80">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
