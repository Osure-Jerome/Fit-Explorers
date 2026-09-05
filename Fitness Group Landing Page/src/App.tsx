import { useState } from "react";
import logo from "./imports/Fitexplorers_Logo.jpeg";
import imgHillRepeats from "./imports/Hill_Repeats.jpeg";
import imgSaturdayWalk from "./imports/Saturday_Long_walk.jpeg";
import imgTheGang from "./imports/The_gang.jpeg";
import imgMeetup from "./imports/Meetup.jpeg";
import imgEvents from "./imports/Events.jpeg";
import imgFounder from "./imports/Founder.jpeg";

const NAV_LINKS = ["Activities", "For Everyone", "Join Us"];

const ACTIVITIES = [
  {
    day: "Thursday",
    label: "Hill Repeats",
    description:
      "The Custome — our signature Thursday hill session. We attack the incline together, push our limits, and earn every summit.",
    icon: "⛰️",
    image: imgHillRepeats,
    alt: "Fit Explorers members holding the group flag after a hill repeats session",
  },
  {
    day: "Saturday",
    label: "Group Runs & Walks",
    description:
      "Weekends belong to us. Whether you run or walk, Saturdays are for showing up, connecting, and moving at your own pace.",
    icon: "🏃",
    image: imgSaturdayWalk,
    alt: "Fit Explorers members at Maseno University gate on a Saturday long walk",
  },
  {
    day: "Anytime",
    label: "Hiking Adventures",
    description:
      "We explore trails, ridgelines, and peaks across the region. Every hike is a chance to discover a new place and make new friends.",
    icon: "🥾",
    image: imgMeetup,
    alt: "Fit Explorers night meetup and outing",
  },
  {
    day: "Monthly",
    label: "Challenges",
    description:
      "Distance goals, elevation targets, consistency streaks — each month brings a new challenge to keep you fired up and accountable.",
    icon: "🏆",
    image:
      "https://images.unsplash.com/photo-1788283574055-c8f1ee20a8c4?w=700&h=500&fit=crop&auto=format",
    alt: "Group of people hiking together in a challenge",
  },
  {
    day: "Ongoing",
    label: "Public Events",
    description:
      "Get invited to local races, community events, and organised fitness days. We share opportunities so no one misses out.",
    icon: "📅",
    image: imgEvents,
    alt: "Fit Explorers members marching at the Kisumu Breastfeeding Awareness Walk public event",
  },
];

const STATS = [
  { value: "2×", label: "Weekly sessions" },
  { value: "All", label: "Welcome here" },
  { value: "0", label: "Fitness required" },
  { value: "∞", label: "Good times ahead" },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-full overflow-x-hidden" style={{ fontFamily: "var(--font-body)" }}>
      {/* NAV */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-3"
        style={{ background: "linear-gradient(to bottom, rgba(13,30,58,0.97) 0%, transparent 100%)" }}
      >
        {/* Logo + wordmark */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Fit Explorers Logo" className="w-11 h-11 rounded-full object-cover" />
          <span
            style={{ fontFamily: "var(--font-display)", color: "var(--color-white)" }}
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
              onClick={() => scrollTo(link.toLowerCase().replace(/\s+/g, "-"))}
              className="text-sm font-medium tracking-wider uppercase text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => scrollTo("join-us")}
            className="px-5 py-2 text-sm font-semibold uppercase tracking-wider rounded-full transition-all hover:opacity-90 cursor-pointer"
            style={{ background: "var(--color-orange)", color: "var(--color-white)" }}
          >
            Join Now
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button className="md:hidden text-white text-2xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
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
              onClick={() => scrollTo(link.toLowerCase().replace(/\s+/g, "-"))}
              className="text-3xl font-black uppercase tracking-widest cursor-pointer"
              style={{
                fontFamily: "var(--font-display)",
                color: link === "Join Now" ? "var(--color-orange)" : "white",
              }}
            >
              {link}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        {/* Dark band only at bottom so text is readable — faces stay visible */}
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to top, rgba(13,30,58,0.92) 0%, rgba(13,30,58,0.45) 45%, rgba(13,30,58,0.15) 100%)" }} />
        <img
          src={imgTheGang}
          alt="Fit Explorers crew together at night after a session"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 20%" }}
        />

        {/* Orange bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 z-20" style={{ background: "var(--color-orange)" }} />

        <div className="relative z-20 px-6 md:px-16 pb-20 md:pb-28 max-w-5xl">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: "var(--color-orange)" }}>
            Community · Fitness · Adventure
          </p>
          <h1
            className="font-black uppercase leading-none mb-6 text-white"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3.5rem, 10vw, 8rem)", letterSpacing: "-0.01em" }}
          >
            Move Together.<br />
            Go Further.
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-xl mb-10 font-light leading-relaxed">
            A fitness community open to everyone. Hills, trails, walks, hikes —
            whatever your pace, there's a place for you here.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo("join-us")}
              className="px-8 py-4 font-semibold uppercase tracking-widest text-sm rounded-full transition-all hover:opacity-90 hover:scale-105 cursor-pointer"
              style={{ background: "var(--color-orange)", color: "white" }}
            >
              Join the Crew
            </button>
            <button
              onClick={() => scrollTo("activities")}
              className="px-8 py-4 font-semibold uppercase tracking-widest text-sm rounded-full border border-white/40 text-white hover:border-white transition-all cursor-pointer"
            >
              See Activities
            </button>
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="py-10 px-6 md:px-16" style={{ background: "var(--color-orange)" }}>
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

      {/* ACTIVITIES */}
      <section id="activities" className="py-24 px-6 md:px-16" style={{ background: "var(--color-navy)" }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: "var(--color-orange)" }}>
            What We Do
          </p>
          <h2
            className="font-black uppercase text-white mb-16"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1 }}
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
                    style={{ background: "linear-gradient(to top, rgba(13,30,58,0.8) 0%, transparent 60%)" }}
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
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                    {act.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOR EVERYONE */}
      <section
        id="for-everyone"
        className="relative overflow-hidden py-28 px-6 md:px-16"
        style={{ background: "var(--color-navy-mid)" }}
      >
        <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full opacity-10" style={{ background: "var(--color-blue)" }} />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full opacity-10" style={{ background: "var(--color-orange)" }} />

        <div className="relative max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: "var(--color-orange)" }}>
              No Barriers
            </p>
            <h2
              className="font-black uppercase text-white mb-6"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1.05 }}
            >
              Fitness for<br />
              <span style={{ color: "var(--color-orange)" }}>Absolutely<br />Everyone</span>
            </h2>
            <p className="text-base leading-relaxed mb-5" style={{ color: "var(--color-muted)" }}>
              We believe movement is for every human — no fitness requirement, no judgment.
              Whether you're a first-time walker or a seasoned marathoner,
              this crew has a spot for you.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--color-muted)" }}>
              We go at our own pace and we look after each other. That's the deal.
            </p>
          </div>

          <div className="relative">
            <img
              src={imgFounder}
              alt="Fit Explorers members smiling and moving together"
              className="w-full rounded-2xl object-cover"
              style={{ height: "420px" }}
            />
            <div
              className="absolute -bottom-4 -left-4 px-5 py-4 rounded-xl shadow-xl"
              style={{ background: "var(--color-orange)" }}
            >
              <p className="font-black text-3xl text-white" style={{ fontFamily: "var(--font-display)" }}>
                All Welcome
              </p>
              <p className="text-xs font-semibold uppercase tracking-wider mt-0.5 text-white/80">
                No exceptions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WEEKLY SCHEDULE */}
      <section className="py-24 px-6 md:px-16" style={{ background: "var(--color-navy)" }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: "var(--color-orange)" }}>
            Weekly Schedule
          </p>
          <h2
            className="font-black uppercase text-white mb-12"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1 }}
          >
            Mark Your Calendar
          </h2>

          <div className="space-y-4">
            {[
              { day: "Thursday", time: "Early morning", event: "Hill Repeats — The Custome", note: "Signature session" },
              { day: "Saturday", time: "Morning", event: "Group Run & Walk", note: "All paces welcome" },
              { day: "Monthly", time: "TBA", event: "Challenge Drop", note: "New goal each month" },
              { day: "Ongoing", time: "As they come", event: "Public Event Invites", note: "Community races & more" },
            ].map((row) => (
              <div
                key={row.day}
                className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-xl transition-colors"
                style={{ border: "1px solid rgba(27,94,166,0.25)", background: "var(--color-navy-mid)" }}
              >
                <div className="w-32 shrink-0">
                  <span
                    className="font-black uppercase text-lg"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-orange)" }}
                  >
                    {row.day}
                  </span>
                </div>
                <div className="text-xs uppercase tracking-widest font-medium w-28 shrink-0" style={{ color: "var(--color-muted)" }}>
                  {row.time}
                </div>
                <div className="flex-1 font-semibold text-white">{row.event}</div>
                <div
                  className="text-xs px-3 py-1 rounded-full font-medium"
                  style={{ background: "rgba(27,94,166,0.2)", color: "var(--color-blue-light)" }}
                >
                  {row.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN CTA */}
      <section id="join-us" className="py-28 px-6 md:px-16" style={{ background: "var(--color-blue)" }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-3 text-white/60">
              Ready to move?
            </p>
            <h2
              className="font-black uppercase leading-none mb-6 text-white"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 7vw, 6rem)" }}
            >
              Join the<br />
              <span style={{ color: "var(--color-orange)" }}>Explorers</span>
            </h2>
            <p className="text-base leading-relaxed mb-2 text-white/80">
              Getting started is simple. Reach out to our admin via WhatsApp or email and we'll
              get you added to the group. First session is on us — just show up.
            </p>
            <p className="text-sm font-medium text-white/60">
              No forms, no fees to join — just say hello.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {/* WhatsApp */}
            <a
              href="https://wa.me/+1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 p-6 rounded-2xl transition-all hover:scale-[1.02] group"
              style={{ background: "var(--color-navy)" }}
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0" style={{ background: "#25D366" }}>
                <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <div className="font-black uppercase text-xl text-white" style={{ fontFamily: "var(--font-display)" }}>
                  WhatsApp
                </div>
                <div className="text-sm text-white/50">Message us to get started</div>
              </div>
              <div className="ml-auto text-white/30 group-hover:text-white transition-colors text-xl">→</div>
            </a>

            {/* Email */}
            <a
              href="mailto:fitexplorers@example.com"
              className="flex items-center gap-5 p-6 rounded-2xl transition-all hover:scale-[1.02] group"
              style={{ background: "var(--color-navy-mid)" }}
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(240,90,40,0.2)" }}>
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--color-orange)" }}>
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div className="font-black uppercase text-xl text-white" style={{ fontFamily: "var(--font-display)" }}>
                  Email Us
                </div>
                <div className="text-sm text-white/50">fitexplorers@example.com</div>
              </div>
              <div className="ml-auto text-white/30 group-hover:text-white transition-colors text-xl">→</div>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="py-10 px-6 md:px-16 border-t"
        style={{ background: "var(--color-navy)", borderColor: "rgba(27,94,166,0.2)" }}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Fit Explorers" className="w-9 h-9 rounded-full object-cover" />
            <span style={{ fontFamily: "var(--font-display)" }} className="text-xl font-black tracking-widest uppercase text-white">
              Fit <span style={{ color: "var(--color-orange)" }}>Explorers</span>
            </span>
          </div>
          <p className="text-xs tracking-wider uppercase text-center" style={{ color: "var(--color-muted)" }}>
            Fitness for all. Every pace. Every week.
          </p>
          <p className="text-xs" style={{ color: "var(--color-muted)" }}>
            © {new Date().getFullYear()} Fit Explorers
          </p>
        </div>
      </footer>
    </div>
  );
}
