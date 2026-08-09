import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { MapPin, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { getStoredProjects, getStoredHeroSlides } from "@/lib/contentStore";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Second Brick Developments" },
      { name: "description", content: "Explore Second Brick's ongoing, upcoming, and completed real estate projects across Mumbai, Pune, Latur and Alibaug." },
      { property: "og:title", content: "Portfolio — Second Brick" },
      { property: "og:description", content: "Signature residential, commercial and infrastructure developments." },
    ],
  }),
  component: Portfolio,
});

const portfolioSlides = [
  {
    id: 1,
    img: project1,
    titleLine1: "Featured",
    titleLine2: "Developments",
    subtitle: "Coastal Luxury & Private Villa Estates · Alibaug",
  },
  {
    id: 2,
    img: project2,
    titleLine1: "Featured",
    titleLine2: "Developments",
    subtitle: "Landmark Towers & Urban Redevelopment · Mumbai",
  },
  {
    id: 3,
    img: project3,
    titleLine1: "Featured",
    titleLine2: "Developments",
    subtitle: "Master-Planned Sustainable Townships · Pune",
  },
];

function PortfolioHeroSlider() {
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState<any[]>([]);

  useEffect(() => {
    const loadSlides = () => {
      const allProjects = getStoredProjects();
      const starred = allProjects.filter((p) => p.featuredOnHomepage !== false);
      const source = starred.length > 0 ? starred : allProjects;

      setSlides(
        source.map((p) => ({
          id: p.id,
          img: p.featuredImage || project1,
          title: p.title,
          subtitle: `${p.location || "Maharashtra"} · ${p.type} (${p.status})`,
          description: p.description,
          buttonText: "Explore Project",
          buttonLink: "#portfolio-list",
        }))
      );
    };
    loadSlides();

    window.addEventListener("content_store_updated", loadSlides);
    return () => window.removeEventListener("content_store_updated", loadSlides);
  }, []);

  const activeSlides = slides.length > 0 ? slides : [
    {
      id: "def_1",
      img: project1,
      title: "Coastal Retreat",
      subtitle: "Alibaug, Maharashtra · Luxury Villa (Upcoming)",
      description: "Sea-facing luxury villas on the Alibaug coastline with private pools and curated landscaping.",
      buttonText: "Explore Project",
      buttonLink: "#portfolio-list",
    },
    {
      id: "def_2",
      img: project2,
      title: "Urban Skyline Residences",
      subtitle: "Vile Parle, Mumbai · Residential (Ongoing)",
      description: "Landmark redevelopment tower with premium amenities and skyline vistas.",
      buttonText: "Explore Project",
      buttonLink: "#portfolio-list",
    },
    {
      id: "def_3",
      img: project3,
      title: "Nawander Township",
      subtitle: "Pune, Maharashtra · Township (Completed)",
      description: "Master-planned township with tree-lined avenues, schools, retail and healthcare.",
      buttonText: "Explore Project",
      buttonLink: "#portfolio-list",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % activeSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  const prevSlide = () => setCurrent((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % activeSlides.length);

  return (
    <section className="relative min-h-[70svh] overflow-hidden bg-cocoa grain">
      {/* Background images with smooth cross-fade */}
      {activeSlides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <img
            src={slide.img}
            alt={slide.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cocoa via-cocoa/50 to-cocoa/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-cocoa/80 via-cocoa/40 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="container-x relative z-20 min-h-[70svh] flex flex-col justify-end pb-20 pt-28">
        <div className="max-w-2xl space-y-3">
          <div className="flex items-center gap-3 text-cream/90">
            <span className="w-8 h-px bg-[#6D0D12]" />
            <span className="text-[10px] md:text-[11px] tracking-[0.25em] uppercase font-semibold text-cream">
              {activeSlides[current]?.subtitle}
            </span>
          </div>

          <h1 className="text-cream font-serif leading-[1.05]" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)" }}>
            {activeSlides[current]?.title}
          </h1>

          <p className="text-cream/80 text-xs md:text-sm max-w-lg leading-relaxed line-clamp-2">
            {activeSlides[current]?.description}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a href={activeSlides[current]?.buttonLink || "#portfolio-list"} className="btn-primary py-2.5 px-5 text-xs inline-flex items-center gap-2">
              {activeSlides[current]?.buttonText || "Explore Project"} <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Nav Arrow Controls */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-3 text-cream/70 hover:text-cream transition-colors cursor-pointer bg-cocoa/30 hover:bg-cocoa/60 backdrop-blur-sm border border-cream/20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-3 text-cream/70 hover:text-cream transition-colors cursor-pointer bg-cocoa/30 hover:bg-cocoa/60 backdrop-blur-sm border border-cream/20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </section>
  );
}

type Project = {
  id: string;
  img: string;
  name: string;
  location: string;
  status: "Ongoing" | "Upcoming" | "Completed";
  config: string;
  description: string;
};

const defaultProjects: Project[] = [
  {
    id: "def_proj_2",
    img: project1,
    name: "Coastal Retreat",
    location: "Alibaug, Maharashtra",
    status: "Upcoming",
    config: "3 & 4 BHK Luxury Villas",
    description: "Sea-facing luxury villas on the Alibaug coastline with private pools and curated landscaping.",
  },
  {
    id: "def_proj_1",
    img: project2,
    name: "Urban Skyline Residences",
    location: "Vile Parle, Mumbai",
    status: "Ongoing",
    config: "2, 3 & 4 BHK Sky Homes",
    description: "Landmark redevelopment tower with premium amenities and skyline vistas.",
  },
  {
    id: "def_proj_3",
    img: project3,
    name: "Nawander Township",
    location: "Pune, Maharashtra",
    status: "Completed",
    config: "Township — 1200+ Units",
    description: "Master-planned township with tree-lined avenues, schools, retail and healthcare.",
  },
];

const tabs = [
  { id: "ongoing", label: "Ongoing" },
  { id: "upcoming", label: "Upcoming" },
  { id: "past", label: "Past Experience" },
] as const;

type TabId = typeof tabs[number]["id"];

function Portfolio() {
  const [active, setActive] = useState<TabId>("ongoing");
  const [dynamicProjects, setDynamicProjects] = useState<Project[]>([]);

  useEffect(() => {
    const stored = getStoredProjects().map((p) => ({
      id: p.id,
      img: p.featuredImage || project1,
      name: p.title,
      location: p.location || "Maharashtra",
      status: (p.status as any) || "Ongoing",
      config: `${p.type} · ${p.sqft} sq.ft`,
      description: p.description,
    }));
    setDynamicProjects(stored);

    const handleUpdate = () => {
      const updated = getStoredProjects().map((p) => ({
        id: p.id,
        img: p.featuredImage || project1,
        name: p.title,
        location: p.location || "Maharashtra",
        status: (p.status as any) || "Ongoing",
        config: `${p.type} · ${p.sqft} sq.ft`,
        description: p.description,
      }));
      setDynamicProjects(updated);
    };

    window.addEventListener("content_store_updated", handleUpdate);
    return () => window.removeEventListener("content_store_updated", handleUpdate);
  }, []);

  const allProjects = dynamicProjects.length > 0 ? dynamicProjects : defaultProjects;
  const filter = active === "ongoing" ? "Ongoing" : active === "upcoming" ? "Upcoming" : "Completed";
  const filtered = allProjects.filter((p) => p.status === filter);

  return (
    <>
      {/* HERO SLIDER — Home Page Style */}
      <PortfolioHeroSlider />

      {/* TABS */}
      <section id="portfolio-list" className="section-y">
        <div className="container-x">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-14 border-b border-border pb-4">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`px-5 py-3 text-[12px] tracking-[0.2em] uppercase transition-all relative cursor-pointer ${
                  active === t.id ? "text-brick font-bold" : "text-cocoa/60 hover:text-cocoa"
                }`}
              >
                {t.label}
                {active === t.id && (
                  <span className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-brick" />
                )}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-24 text-muted-foreground">
              New projects in this category launching soon.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <article
                  key={p.id || p.name}
                  className="group bg-[#FBF1E9] border border-[#6D0D12]/15 rounded-none overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={p.img}
                        alt={p.name}
                        width={1200}
                        height={900}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className="absolute top-4 left-4 bg-brick text-cream text-[10px] tracking-[0.24em] uppercase px-3 py-1.5 font-bold">
                        {p.status}
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="eyebrow">{p.config}</div>
                      <h3 className="mt-2 font-serif text-2xl text-cocoa font-bold">{p.name}</h3>
                      <div className="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5 text-brick" />
                        {p.location}
                      </div>
                      <p className="mt-4 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {p.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 border-t border-[#6D0D12]/10 flex items-center justify-between gap-4">
                    <Link
                      to="/project/$id"
                      params={{ id: p.id }}
                      className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase text-brick font-bold hover:underline transition-all"
                    >
                      <span>One-Pager</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      to="/inquire"
                      className="text-[10px] tracking-[0.16em] uppercase text-cocoa/70 hover:text-brick font-medium"
                    >
                      Inquire
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-y bg-brick text-cream">
        <div className="container-x text-center max-w-2xl">
          <SectionHeading
            eyebrow="Ready to Explore?"
            title="Find your next investment address."
            align="center"
            invert
          />
          <Link to="/inquire" className="btn-ghost mt-10 inline-flex">Talk to Our Team</Link>
        </div>
      </section>
    </>
  );
}
