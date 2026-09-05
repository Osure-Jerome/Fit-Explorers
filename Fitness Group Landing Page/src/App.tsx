import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Hero from "@/components/sections/Hero"
import Stats from "@/components/sections/Stats"
import Activities from "@/components/sections/Activities"
import ForEveryone from "@/components/sections/ForEveryone"
import Schedule from "@/components/sections/Schedule"
import JoinUs from "@/components/sections/JoinUs"

export default function App() {
  return (
    <div
      className="min-h-full overflow-x-hidden"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <Header />

      <main>
        <Hero />
        <Stats />
        <Activities />
        <ForEveryone />
        <Schedule />
        <JoinUs />
      </main>

      <Footer />
    </div>
  )
}
