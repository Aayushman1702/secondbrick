import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, BadgeCheck, Building2, GraduationCap, Hammer, HandHeart, HeartHandshake } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { Counter } from "@/components/Counter";
import { HorizontalProjects } from "@/components/HorizontalProjects";
import { MagneticButton } from "@/components/MagneticButton";
import hero from "@/assets/hero-home.jpg";
import prodevFull from "@/assets/logo-prodev-full.png";
import nawanderLogo from "@/assets/logo-nawander.png";
import { ScrollInterestModal } from "@/components/ScrollInterestModal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Second Brick — Why Invest in Alibaug, The Next Coastal Growth Market" },
      { name: "description", content: "Discover premium coastal, residential and infrastructure developments by Second Brick — a partnership between PRO-DEV and Nawander Group with 30+ years of proven delivery." },
    ],
  }),
  component: Home,
});

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShown(true), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

const promises = [
  { title: "Build With Purpose", description: "Spaces created with intent, meaning and long-term impact.", icon: Hammer },
  { title: "Sustainable by Design", description: "Solar energy and rainwater harvesting integrated into every development.", icon: Building2 },
  { title: "Quality You Can Trust", description: "A commitment to excellence in every detail, built with responsibility.", icon: BadgeCheck },
  { title: "Customer First", description: "Dedicated service and transparent communication focused on your peace of mind.", icon: HandHeart },
  { title: "Communities That Care", description: "Environmentally responsible living designed for people and the planet.", icon: HeartHandshake },
  { title: "Empowered Leadership", description: "Driven by visionary leadership, including award-winning entrepreneur Namrata Malu (2023).", icon: GraduationCap },
];

function Home() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      {/* HERO — layered cinematic */}
      <section className="relative min-h-[100svh] overflow-hidden bg-cocoa grain">
        {/* Parallax image */}
        <div
          className="absolute inset-0"
          style={{ transform: `translateY(${scrollY * 0.25}px) scale(1.08)` }}
        >
          <img src={hero} alt="Alibaug coastline" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-cocoa via-cocoa/40 to-cocoa/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-cocoa/70 via-transparent to-cocoa/50" />
        </div>

        {/* Architectural grid overlay */}
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage:
            "linear-gradient(to right, #FBF1E9 1px, transparent 1px), linear-gradient(to bottom, #FBF1E9 1px, transparent 1px)",
          backgroundSize: "12vw 12vw",
        }} />

        {/* Corner marks */}
        

        


        {/* Content */}
        <div className="container-x relative z-10 min-h-[100svh] flex flex-col justify-end pb-32 pt-40">
          <div className="max-w-3xl reveal-x">
            <h1 className="text-cream font-serif leading-[0.95]" style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}>
              Why Invest in
              <br />
              <em className="italic text-cream/95">Alibaug</em>
            </h1>
            <div className="mt-8 flex items-center gap-4 text-cream/80">
              <span className="w-12 h-px bg-cream/60" />
              <span className="text-[11px] tracking-[0.32em] uppercase">The Next Coastal Growth Market</span>
            </div>
            <div className="mt-12 flex flex-wrap gap-5">
              <MagneticButton as="a" href="/insights" className="btn-primary">
                Read More <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
              
            </div>
          </div>

         
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 text-cream/60 text-[10px] tracking-[0.4em] uppercase z-10">
          <span className="w-8 h-px bg-cream/40 animate-pulse" />
          <span>Scroll to explore</span>
          <span className="w-8 h-px bg-cream/40 animate-pulse" />
        </div>
      </section>

      {/* ABOUT — overlapping typography */}
      <AboutSplit />

      {/* STATS — architectural composition */}


      {/* FEATURED PROJECTS — horizontal luxury gallery */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="container-x mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] tracking-[0.35em] uppercase text-brick">— 03 / Portfolio</span>
            </div>
            <h2 className="font-serif" style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}>
              Landmark <em className="italic text-brick">developments</em>,
              <br />built to endure.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            A curated selection reflecting our commitment to quality construction, thoughtful
            planning and long-term value creation.
          </p>
        </div>
        <HorizontalProjects />
        <div className="container-x mt-12 md:mt-16 text-center">
          <MagneticButton as="a" href="/portfolio" className="btn-outline">
            View Full Portfolio
          </MagneticButton>
        </div>
      </section>

      {/* PROMISES — 04 */}
      <section id="promises" className="py-20 md:py-28 bg-cream relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-[0.04]" />
        <div className="container-x relative">
          <div className="max-w-2xl">
            <div className="text-[10px] tracking-[0.35em] uppercase text-brick mb-4">— 04 / Values</div>
            <h2 className="font-serif text-cocoa" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.05 }}>
              Our <em className="italic text-brick">Promises</em>.
            </h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              The principles that guide how we plan, build and care for every community.
            </p>
          </div>
        </div>
        <div className="container-x relative mt-14">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
            {promises.map(({ title, description, icon: Icon }, index) => (
              <article
                key={`${title}-${index}`}
                className="min-h-[310px] rounded-none border border-cocoa/10 bg-[#F8EDE3] p-7 text-center shadow-sm flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-2.5 hover:shadow-[0_20px_40px_-15px_rgba(61,40,34,0.15)] hover:border-brick/30 hover:bg-[#F2E3D4] group cursor-pointer"
              >
                <div>
                  <Icon className="mx-auto h-14 w-14 text-brick transition-transform duration-300 group-hover:scale-110" strokeWidth={1.45} />
                  <h3 className="mt-6 font-serif text-[1.4rem] leading-[1.08] text-cocoa group-hover:text-brick transition-colors">{title}</h3>
                  <div className="mx-auto mt-5 h-0.5 w-9 bg-brick/80 transition-all duration-300 group-hover:w-14 group-hover:bg-brick" />
                  <p className="mt-5 text-sm leading-[1.4] text-cocoa/75">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-32 bg-cocoa text-cream overflow-hidden grain">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="font-serif text-[28vw] md:text-[16vw] text-cream/[0.03] leading-none select-none">
            Invest
          </div>
        </div>
        <div className="container-x relative text-center max-w-3xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-10 h-px bg-cream/60" />
            <span className="text-[11px] tracking-[0.32em] uppercase text-cream/80">— Next Step</span>
            <span className="w-10 h-px bg-cream/60" />
          </div>
          <h2 className="font-serif text-cream" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", lineHeight: 1.05 }}>
            Ready to invest with <em className="italic">confidence</em>?
          </h2>
          <p className="mt-8 text-cream/75 text-lg max-w-2xl mx-auto">
            Whether you're buying your first property, expanding your portfolio, or seeking
            expert guidance, our team is here to help you make informed decisions.
          </p>
          <div className="mt-12">
            <MagneticButton as="a" href="/inquire" className="btn-ghost">
              Begin the Conversation <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>
          </div>
        </div>
      </section>

      <ScrollInterestModal scrollThreshold={300} />
    </>
  );
}

function AboutSplit() {
  const { ref, shown } = useReveal();
  return (
    <section
      ref={ref}
      className={`relative pt-20 md:pt-28 pb-0 overflow-hidden transition-all duration-1000 ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {/* Content block with centered background watermark */}
      <div className="relative">
        {/* Giant background type - centered behind content */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="font-serif italic text-[24vw] md:text-[18vw] text-brick/[0.05] leading-none select-none">
            Legacy
          </div>
        </div>

        <div className="container-x relative grid lg:grid-cols-12 gap-14 items-start">
          <div className="lg:col-span-5 space-y-10">
            <div>
              <div className="text-[10px] tracking-[0.35em] uppercase text-brick mb-6">— 02 / About</div>
              <h2 className="font-serif" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)", lineHeight: 1.05 }}>
                Two Legacies
                <br />
                <em className="italic text-brick">One Shared Vision</em> 
              </h2>
            </div>

            {/* Logos on the Left */}
            <div className="pt-2">
              <div className="relative grid grid-cols-2 gap-6 items-end text-center max-w-md">
                {/* Center separator dot */}
                <div className="absolute left-1/2 bottom-6 -translate-x-1/2 text-cocoa/40 text-xl font-bold select-none">
                  ·
                </div>

                {/* PRO-DEV */}
                <div className="flex flex-col items-center">
                  <div className="h-14 flex items-center justify-center mb-3">
                    <img
                      src={prodevFull}
                      alt="PRO-DEV"
                      className="h-12 w-auto object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="font-serif text-xl text-cocoa">PRO-DEV</div>
                  <p className="text-xs text-muted-foreground mt-1">Mumbai · Goa</p>
                </div>

                {/* Nawander Group */}
                <div className="flex flex-col items-center">
                  <div className="h-14 flex items-center justify-center mb-3">
                    <img
                      src={nawanderLogo}
                      alt="Nawander logo"
                      className="h-12 w-auto object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="font-serif text-xl text-cocoa">Nawander Group</div>
                  <p className="text-xs text-muted-foreground mt-1">Pune · Latur</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side aligned text & CTA button */}
          <div className="lg:col-span-7 space-y-8 lg:pt-4">
            <p className="text-xl md:text-2xl font-serif italic text-cocoa leading-relaxed">
              "Second Brick is a strategic partnership between PRO-DEV and Nawander Group,
              bringing together decades of collective experience across residential, commercial
              and infrastructure development."
            </p>
            <p className="text-muted-foreground leading-relaxed max-w-xl">
              Our shared commitment to quality, transparency and timely execution enables us
              to deliver projects that create lasting value for investors and homeowners alike.
            </p>
            
            <div className="pt-4 flex justify-start">
              <Link to="/about" className="btn-outline inline-flex px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-sans">
                Learn About Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* STATS BANNER BAR */}
      <div className="mt-20 md:mt-24 bg-[#3D2822] text-[#FBF1E9] py-14 md:py-18 border-y border-[#6D0D12]/20">
        <div className="container-x">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-[#FBF1E9]/15">
            <div className="flex flex-col items-center justify-center p-2">
              <div className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#FBF1E9] tracking-tight">
                <Counter to={30} suffix="+" duration={2000} />
              </div>
              <div className="text-xs sm:text-sm font-sans tracking-wide text-[#FBF1E9]/80 mt-2">
                Years Of Experience
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
              <div className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#FBF1E9] tracking-tight">
                <Counter to={10} suffix="M+" duration={2000} />
              </div>
              <div className="text-xs sm:text-sm font-sans tracking-wide text-[#FBF1E9]/80 mt-2">
                Sq.ft Delivered
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
              <div className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#FBF1E9] tracking-tight">
                <Counter to={40} suffix="+" duration={2000} />
              </div>
              <div className="text-xs sm:text-sm font-sans tracking-wide text-[#FBF1E9]/80 mt-2">
                Projects Completed
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-2 pt-6 md:pt-2">
              <div className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#FBF1E9] tracking-tight">
                <Counter to={10} suffix="K+" duration={2000} />
              </div>
              <div className="text-xs sm:text-sm font-sans tracking-wide text-[#FBF1E9]/80 mt-2">
                Family Served
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

