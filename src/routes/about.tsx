import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { Timeline } from "@/components/Timeline";
import { ValuesRadial } from "@/components/ValuesRadial";
import heroAbout from "@/assets/hero-about.jpg";

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
    name: "Ar. Maheshkumar Nawander",
    group: "Nawander Group",
    role: "Design Principal",
    bio: "Deep expertise in architectural planning and design, shaping Nawander Group's townships and institutional developments over 15+ years.",
    initials: "MN",
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
  { c: "Mumbai", coord: "19.0760° N  72.8777° E", focus: "Coastal & redevelopment", n: "01" },
  { c: "Pune", coord: "18.5204° N  73.8567° E", focus: "Township & residential", n: "02" },
  { c: "Latur", coord: "18.4088° N  76.5604° E", focus: "Emerging growth market", n: "03" },
  { c: "Alibaug", coord: "18.6414° N  72.8722° E", focus: "Coastal luxury", n: "04" },
];

function About() {
  const [activeCity, setActiveCity] = useState(0);

  return (
    <>
      {/* HERO — editorial cinematic */}
      <section className="relative pt-40 pb-24 md:pt-52 md:pb-32 overflow-hidden bg-cream">
        <img
          src={heroAbout}
          alt="Interior with arched windows"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream/70 to-cream" />
        <div className="absolute top-24 right-6 md:right-10 v-text text-brick">— Chapter One / About</div>
        <div className="container-x relative">
          <div className="text-[10px] tracking-[0.35em] uppercase text-brick mb-6">— About / 001</div>
          <h1 className="font-serif reveal-x" style={{ fontSize: "clamp(3rem, 8vw, 6rem)", lineHeight: 0.95 }}>
            Two Legacies.
            <br />
            <em className="italic text-brick">One shared vision.</em>
          </h1>
          <p className="mt-10 text-lg leading-relaxed text-muted-foreground max-w-2xl">
            Second Brick combines the expertise of PRO-DEV and Nawander Group to deliver
            exceptional real estate experiences through innovation, integrity, and long-term
            commitment.
          </p>
        </div>
      </section>

      {/* STORY — vertical timeline */}
      <section id="story" className="section-y bg-secondary/40 relative overflow-hidden">
        <div className="container-x">
          <div className="text-center mb-16">
            <div className="text-[10px] tracking-[0.35em] uppercase text-brick mb-4">— 02 / Our Story</div>
            <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}>
              A story written <em className="italic text-brick">brick by brick</em>.
            </h2>
          </div>
          <Timeline />
        </div>
      </section>

      {/* LEADERSHIP — magazine profiles */}
      <section className="section-y">
        <div className="container-x">
          <div className="grid lg:grid-cols-12 gap-10 mb-20">
            <div className="lg:col-span-5">
              <div className="text-[10px] tracking-[0.35em] uppercase text-brick mb-4">— 03 / Leadership</div>
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

      {/* VALUES — interactive radial */}
      <section id="values" className="section-y bg-cocoa text-cream relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="container-x relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-[10px] tracking-[0.35em] uppercase text-cream/60 mb-4">— 04 / Values</div>
              <h2 className="font-serif text-cream" style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", lineHeight: 1.05 }}>
                Principles that shape
                <br />
                every <em className="italic">square foot</em>.
              </h2>
              <p className="mt-8 text-cream/70 max-w-md text-lg leading-relaxed">
                Eight commitments that hold every project together — from the first sketch
                to the day residents receive their keys.
              </p>
            </div>
            <ValuesRadial />
          </div>
        </div>
      </section>

      {/* PRESENCE */}
      <section id="presence" className="section-y">
        <div className="container-x">
          <div className="mb-16">
            <div className="text-[10px] tracking-[0.35em] uppercase text-brick mb-4">— 05 / Presence</div>
            <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}>
              Rooted in cities that
              <br />
              <em className="italic text-brick">shape India</em>'s real estate story.
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-14">
            <div className="lg:col-span-5 space-y-1">
              {cities.map((city, i) => (
                <button
                  key={city.c}
                  onMouseEnter={() => setActiveCity(i)}
                  onClick={() => setActiveCity(i)}
                  className={`group w-full text-left border-b border-border py-6 flex items-baseline gap-6 transition-all ${activeCity === i ? "border-brick" : ""}`}
                >
                  <span className={`text-[10px] tracking-[0.3em] uppercase ${activeCity === i ? "text-brick" : "text-cocoa/40"}`}>{city.n}</span>
                  <div className="flex-1">
                    <div className={`font-serif text-4xl transition-colors ${activeCity === i ? "text-brick italic" : "text-cocoa"}`}>{city.c}</div>
                    <div className="text-sm text-muted-foreground mt-1">{city.focus}</div>
                  </div>
                  <span className={`text-[10px] tracking-[0.28em] uppercase transition-opacity ${activeCity === i ? "opacity-100 text-brick" : "opacity-40"}`}>
                    {city.coord}
                  </span>
                </button>
              ))}
            </div>

            <div className="lg:col-span-7 relative aspect-[4/5] bg-cocoa overflow-hidden grain">
              <svg viewBox="0 0 400 500" className="absolute inset-0 w-full h-full text-cream/25">
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
              <div className="absolute bottom-6 left-6 text-cream/60 text-[10px] tracking-[0.3em] uppercase">
                Maharashtra, India
              </div>
              <div className="absolute top-6 right-6 text-cream/60 text-[10px] tracking-[0.3em] uppercase">
                Presence Map · 01
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
