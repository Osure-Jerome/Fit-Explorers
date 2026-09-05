import { IMAGES } from "@/config/site"
import { scrollToId } from "@/lib/scroll"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Dark band only at bottom so text is readable — faces stay visible */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(13,30,58,0.92) 0%, rgba(13,30,58,0.45) 45%, rgba(13,30,58,0.15) 100%)",
        }}
      />
      <img
        src={IMAGES.gang}
        alt="Fit Explorers crew together at night after a session"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 20%" }}
      />

      {/* Orange bottom accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1.5 z-20"
        style={{ background: "var(--color-orange)" }}
      />

      <div className="relative z-20 px-6 md:px-16 pb-20 md:pb-28 max-w-5xl">
        <p
          className="text-xs font-semibold tracking-[0.3em] uppercase mb-4"
          style={{ color: "var(--color-orange)" }}
        >
          Community · Fitness · Adventure
        </p>
        <h1
          className="font-black uppercase leading-none mb-6 text-white"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.5rem, 10vw, 8rem)",
            letterSpacing: "-0.01em",
          }}
        >
          Move Together.
          <br />
          Go Further.
        </h1>
        <p className="text-lg md:text-xl text-white/80 max-w-xl mb-10 font-light leading-relaxed">
          A fitness community open to everyone. Hills, trails, walks, hikes —
          whatever your pace, there's a place for you here.
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => scrollToId("join-us")}
            className="px-8 py-4 font-semibold uppercase tracking-widest text-sm rounded-full transition-all hover:opacity-90 hover:scale-105 cursor-pointer"
            style={{ background: "var(--color-orange)", color: "white" }}
          >
            Join the Crew
          </button>
          <button
            onClick={() => scrollToId("activities")}
            className="px-8 py-4 font-semibold uppercase tracking-widest text-sm rounded-full border border-white/40 text-white hover:border-white transition-all cursor-pointer"
          >
            See Activities
          </button>
        </div>
      </div>
    </section>
  )
}
