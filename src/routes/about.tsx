import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Gem, Globe2, Handshake, KeyRound, Sparkles } from "lucide-react";
import heroAbout from "@/assets/hero-about.jpg";
import presenceMap from "@/assets/presence-map.png";
import prodevFull from "@/assets/logo-prodev-full.png";
import nawanderLogo from "@/assets/logo-nawander.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Second Brick — Two Legacies. One Shared Vision." },
      { name: "description", content: "Second Brick combines the expertise of PRO-DEV and Nawander Group to deliver exceptional real estate through innovation, integrity and long-term commitment." },
      { property: "og:title", content: "About Second Brick" },
      { property: "og:description", content: "Two legacies. One shared vision — PRO-DEV & Nawander Group." },
    ],
  }),
  component: About,
});

const leaders = [
  {
    name: "Namrata Malu",
    group: "PRO-DEV",
    role: "Principal, Redevelopment",
    bio: "Brings nearly three decades of PRO-DEV's redevelopment experience — quality construction and dependable delivery across Mumbai and Goa.",
    initials: "NM",
  },
  
  {
    name: "Nitinkumar Nawander",
    group: "Nawander Group",
    role: "Execution Lead",
    bio: "Grounds Nawander Group's design ambitions in practical, on-the-ground construction execution across Pune and Latur.",
    initials: "NN",
  },
];

const cities = [
  { c: "Mumbai", focus: "Coastal & redevelopment", n: "01" },
  { c: "Pune", focus: "Township & residential", n: "02" },
  { c: "Latur", focus: "Emerging growth market", n: "03" },
  { c: "Alibaug", focus: "Coastal luxury", n: "04" },
];

const foundations = [
  { title: "National Presence", description: "A thoughtful footprint across Maharashtra, shaped by local insight and long-term commitment.", icon: Globe2 },
  { title: "Iconic Collaborations", description: "Trusted partnerships that bring considered design, exceptional quality and lasting value to life.", icon: Handshake },
  { title: "Hospitality-Driven", description: "Homes and spaces designed around comfort, care and the details that make everyday living exceptional.", icon: KeyRound },
  { title: "Lifestyle Amenities", description: "Curated experiences that create a richer, more connected way to live.", icon: Sparkles },
  { title: "Global Trust", description: "A reputation built on transparency, consistency and a standard that travels well.", icon: Gem },
];

function About() {
  const [activeCity, setActiveCity] = useState(0);

  return (
    <>
      {/* HERO — editorial cinematic */}
      <section className="relative pt-28 pb-12 md:pt-36 md:pb-16 overflow-hidden bg-cream">
        <img
          src={heroAbout}
          alt="Interior with arched windows"
          className="absolute inset-0 w-full h-full object-cover opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream/70 to-cream" />
        <div className="absolute top-24 right-6 md:right-10 v-text text-brick">— Chapter One / About</div>
        <div className="container-x relative">
          <div className="text-[10px] tracking-[0.35em] uppercase text-brick mb-6">— About / 001</div>
         <h1
  className="font-serif reveal-x max-w-5xl"
  style={{
    fontSize: "clamp(2.6rem, 5vw, 4.8rem)",
    lineHeight: 0.92,
    letterSpacing: "-0.03em",
  }}
>
  A partnership built
  <br />
  <em
    className="italic text-brick"
    style={{
      fontSize: "0.96em",
    }}
  >
    experience & excellence.
  </em>
</h1>
          <p className="mt-10 text-lg leading-relaxed text-muted-foreground max-w-2xl">
            Second Brick combines the expertise of PRO-DEV and Nawander Group to deliver
            exceptional real estate experiences through innovation, integrity, and long-term
            commitment.
          </p>
        </div>
      </section>

      {/* HISTORY — two founding companies */}
      <section id="history" className="section-y bg-secondary/40 relative overflow-hidden">
        <div className="container-x">
          <div className="grid lg:grid-cols-12 gap-10 mb-14 lg:items-end">
            <div className="lg:col-span-5">
              <div className="text-[10px] tracking-[0.35em] uppercase text-brick mb-4">02 / Our History</div>
              <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", lineHeight: 1.05 }}>
                Two histories.<br />One shared <em className="italic text-brick">direction</em>.
              </h2>
            </div>
            <p className="lg:col-span-7 text-lg leading-relaxed text-muted-foreground lg:max-w-2xl lg:justify-self-end">
              Second Brick brings together two distinct real estate legacies — each grounded in local knowledge, disciplined execution and a belief in building for the long term.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <article className="group relative overflow-hidden bg-[#2D1E1A] p-8 md:p-10 text-[#FBF1E9] min-h-[320px] rounded-none shadow-lg border border-[#FBF1E9]/10">
              <div className="absolute top-0 right-0 h-32 w-32 border-l border-b border-[#FBF1E9]/15 rounded-bl-full transition-transform duration-500 group-hover:scale-125 pointer-events-none" />
              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold tracking-[0.3em] uppercase text-[#FBF1E9]/90">
                    <span>PRO-DEV</span>
                    <span>EST. 1994</span>
                  </div>
                  <div className="mt-6 mb-4 h-14 flex items-center">
                    <img src={prodevFull} alt="PRO-DEV" className="h-12 w-auto object-contain brightness-125 filter drop-shadow-[0_2px_10px_rgba(255,255,255,0.25)]" />
                  </div>
                  <h3 className="mt-4 font-serif text-3xl md:text-4xl text-[#FBF1E9] font-bold tracking-tight">A legacy of renewal.</h3>
                  <p className="mt-4 max-w-md leading-relaxed text-[#FBF1E9]/90 text-sm md:text-base font-normal">
                    For nearly three decades, PRO-DEV has shaped redevelopment in Mumbai and Goa, creating reliable, well-crafted spaces with a clear focus on quality and delivery.
                  </p>
                </div>
              </div>
            </article>

            <article className="group relative overflow-hidden border border-[#6D0D12]/20 bg-[#FBF1E9] p-8 md:p-10 min-h-[320px] rounded-none shadow-md">
              <div className="absolute bottom-0 left-0 h-32 w-32 border-r border-t border-[#6D0D12]/15 rounded-tr-full transition-transform duration-500 group-hover:scale-125 pointer-events-none" />
              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold tracking-[0.3em] uppercase text-[#6D0D12]">
                    <span>Nawander Group</span>
                    <span>EST. 2005</span>
                  </div>
                  <div className="mt-6 mb-4 h-14 flex items-center">
                    <img src={nawanderLogo} alt="Nawander logo" className="h-12 w-auto object-contain" />
                  </div>
                  <h3 className="mt-4 font-serif text-3xl md:text-4xl text-[#3D2822] font-bold tracking-tight">A vision for growth.</h3>
                  <p className="mt-4 max-w-md leading-relaxed text-[#3D2822]/85 text-sm md:text-base font-normal">
                    Nawander Group has earned its reputation through considered residential and township development across Pune and Latur, combining ambition with practical execution.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* FOUNDATIONS — feature cards */}
      <section className="pt-16 pb-16 md:pt-24 md:pb-20 bg-cream text-cocoa relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-[0.04]" />
        <div className="container-x relative">
          <div className="max-w-xl">
            <div className="text-[10px] tracking-[0.35em] uppercase text-brick mb-4">03 / Our Foundation</div>
            <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.05 }}>The foundation<br />of our <em className="italic text-brick">success</em>.</h2>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {foundations.map(({ title, description, icon: Icon }, index) => (
              <article key={title} className="group relative min-h-[300px] border border-cocoa/15 bg-cream p-6 transition-colors hover:bg-secondary/50">
                <span className="text-[10px] tracking-[0.25em] text-cocoa/45">0{index + 1}</span>
                <div className="mt-8 flex h-11 w-11 items-center justify-center rounded-full bg-brick text-cream shadow-[0_0_24px_rgba(109,13,18,0.3)] transition-transform duration-300 group-hover:-translate-y-1">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="mt-7 font-serif text-xl text-cocoa">{title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-cocoa/65">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP — magazine profiles */}
      <section className="pt-12 pb-20 md:pt-16 md:pb-28">
        <div className="container-x">
          <div className="grid lg:grid-cols-12 gap-10 mb-20">
            <div className="lg:col-span-5">
              <div className="text-[10px] tracking-[0.35em] uppercase text-brick mb-4">— 04 / Leadership</div>
              <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", lineHeight: 1.05 }}>
                The people behind
                <br />
                the <em className="italic text-brick">promise</em>.
              </h2>
            </div>
            <p className="lg:col-span-7 lg:pt-8 text-lg text-muted-foreground leading-relaxed">
              Our leadership brings together experienced professionals with deep knowledge in
              development, construction, planning and customer relations — a collective
              vision that ensures every project is delivered with transparency and quality.
            </p>
          </div>

          <div className="space-y-24">
            {leaders.map((l, i) => (
              <article key={l.name} className={`grid md:grid-cols-12 gap-10 md:gap-16 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div className="md:col-span-5">
                  <div className="relative aspect-[4/5] overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-brick via-brick to-cocoa flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
                      <span className="font-serif text-[10rem] text-cream/95 leading-none">{l.initials}</span>
                    </div>
                    <div className="absolute inset-3 border border-cream/30 pointer-events-none" />
                    <div className="absolute top-4 left-4 text-[10px] tracking-[0.3em] uppercase text-cream/80">
                      Fig. 0{i + 1}
                    </div>
                    <div className="absolute bottom-4 right-4 v-text text-cream/70">{l.group}</div>
                  </div>
                </div>
                <div className="md:col-span-7 md:pl-6">
                  <div className="eyebrow">{l.group}</div>
                  <h3 className="mt-3 font-serif" style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", lineHeight: 1.05 }}>
                    {l.name}
                  </h3>
                  <div className="mt-2 text-cocoa/60 italic font-serif text-lg">{l.role}</div>
                  <div className="mt-6 w-16 h-px bg-brick" />
                  <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-xl">{l.bio}</p>
                  <div className="mt-8 font-serif italic text-2xl text-brick">— {l.initials}.</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PRESENCE — 05 */}
      <section id="presence" className="pt-14 md:pt-20 pb-10 md:pb-14 bg-cocoa text-cream relative overflow-hidden">
        <div className="container-x relative">
          <div className="mb-12 md:mb-14">
            <div className="text-[10px] tracking-[0.35em] uppercase text-cream/80 mb-4">— 06 / Presence</div>
            <h2 className="font-serif text-cream" style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}>
              Rooted in cities that
              <br />
              <em className="italic text-cream">shape India</em>'s real estate story.
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-14 items-center">
            <div className="lg:col-span-5 space-y-1">
              {cities.map((city, i) => (
                <button
                  key={city.c}
                  onMouseEnter={() => setActiveCity(i)}
                  onClick={() => setActiveCity(i)}
                  className={`group w-full text-left border-b py-5 flex items-baseline gap-6 transition-all ${activeCity === i ? "border-cream/60" : "border-cream/15"}`}
                >
                  <span className={`text-[10px] tracking-[0.3em] uppercase ${activeCity === i ? "text-cream font-bold" : "text-cream/40"}`}>{city.n}</span>
                  <div className="flex-1">
                    <div className={`font-serif text-4xl transition-colors ${activeCity === i ? "text-cream italic" : "text-cream/70"}`}>{city.c}</div>
                    <div className="text-sm text-cream/65 mt-1">{city.focus}</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="lg:col-span-7 relative aspect-[4/3] md:aspect-[16/11] lg:w-[calc(100%+3rem)] overflow-hidden lg:translate-x-3 group">
              <img
                src={presenceMap}
                alt="3D map showing Second Brick's location presence across Mumbai, Pune, Latur and Goa"
                className="absolute inset-0 h-full w-full object-contain p-2 drop-shadow-[0_25px_35px_rgba(0,0,0,0.6)] transition-transform duration-700 group-hover:scale-105"
              />
              <svg viewBox="0 0 400 500" className="hidden absolute inset-0 w-full h-full text-cream/25">
                {/* Stylized Maharashtra outline */}
                <path
                  d="M60,180 Q80,120 140,110 Q210,90 260,130 Q320,150 340,220 Q350,280 320,340 Q290,410 210,430 Q140,440 90,400 Q50,340 60,270 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="3 4"
                />
                <path
                  d="M60,180 Q80,120 140,110 Q210,90 260,130 Q320,150 340,220 Q350,280 320,340 Q290,410 210,430 Q140,440 90,400 Q50,340 60,270 Z"
                  fill="#FBF1E9"
                  fillOpacity="0.03"
                />
                {/* Pins */}
                {[
                  { x: 110, y: 250, city: "Mumbai" },
                  { x: 180, y: 260, city: "Pune" },
                  { x: 260, y: 300, city: "Latur" },
                  { x: 95, y: 280, city: "Alibaug" },
                ].map((p, i) => (
                  <g key={p.city}>
                    <circle cx={p.x} cy={p.y} r={activeCity === i ? 14 : 6} fill="none" stroke="#6D0D12" strokeWidth="1" opacity={activeCity === i ? 1 : 0.4} className="transition-all duration-500" />
                    <circle cx={p.x} cy={p.y} r="3" fill="#6D0D12" />
                    <text x={p.x + 16} y={p.y + 4} fontSize="10" fill="#FBF1E9" fillOpacity={activeCity === i ? 1 : 0.6} fontFamily="Jost">{p.city}</text>
                  </g>
                ))}
              </svg>
              <div className="hidden absolute bottom-6 left-6 text-cream/60 text-[10px] tracking-[0.3em] uppercase">
                Maharashtra, India
              </div>
              <div className="hidden absolute top-6 right-6 text-cream/60 text-[10px] tracking-[0.3em] uppercase">
                Presence Map · 01
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
 