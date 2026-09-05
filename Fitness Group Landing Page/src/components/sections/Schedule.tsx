import { SCHEDULE } from "@/config/site"

export default function Schedule() {
  return (
    <section
      className="py-24 px-6 md:px-16"
      style={{ background: "var(--color-navy)" }}
    >
      <div className="max-w-5xl mx-auto">
        <p
          className="text-xs font-semibold tracking-[0.3em] uppercase mb-3"
          style={{ color: "var(--color-orange)" }}
        >
          Weekly Schedule
        </p>
        <h2
          className="font-black uppercase text-white mb-12"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 4rem)",
            lineHeight: 1,
          }}
        >
          Mark Your Calendar
        </h2>

        <div className="space-y-4">
          {SCHEDULE.map((row) => (
            <div
              key={row.day}
              className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-xl transition-colors"
              style={{
                border: "1px solid rgba(27,94,166,0.25)",
                background: "var(--color-navy-mid)",
              }}
            >
              <div className="w-32 shrink-0">
                <span
                  className="font-black uppercase text-lg"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--color-orange)",
                  }}
                >
                  {row.day}
                </span>
              </div>
              <div
                className="text-xs uppercase tracking-widest font-medium w-28 shrink-0"
                style={{ color: "var(--color-muted)" }}
              >
                {row.time}
              </div>
              <div className="flex-1 font-semibold text-white">{row.event}</div>
              <div
                className="text-xs px-3 py-1 rounded-full font-medium"
                style={{
                  background: "rgba(27,94,166,0.2)",
                  color: "var(--color-blue-light)",
                }}
              >
                {row.note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
