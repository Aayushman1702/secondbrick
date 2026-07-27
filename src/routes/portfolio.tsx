import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { MapPin, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { HorizontalProjects } from "@/components/HorizontalProjects";
import { getStoredProjects } from "@/lib/contentStore";
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

type Project = {
  img: string;
  name: string;
  location: string;
  status: "Ongoing" | "Upcoming" | "Completed";
  config: string;
  description: string;
};

const defaultProjects: Project[] = [
  {
    img: project1,
    name: "Coastal Retreat",
    location: "Alibaug, Maharashtra",
    status: "Upcoming",
    config: "3 & 4 BHK Villas",
    description: "Sea-facing luxury villas on the Alibaug coastline with private pools and curated landscaping.",
  },
  {
    img: project2,
    name: "Urban Skyline Residences",
    location: "Vile Parle, Mumbai",
    status: "Ongoing",
    config: "2, 3 & 4 BHK",
    description: "Landmark redevelopment tower with premium amenities and skyline vistas.",
  },
  {
    img: project3,
    name: "Nawander Township",
    location: "Pune, Maharashtra",
    status: "Completed",
    config: "Township — 1200+ Units",
    description: "Master-planned township with tree-lined avenues, schools, retail and healthcare.",
  },
  {
    img: project1,
    name: "Palm Grove Estate",
    location: "Alibaug, Maharashtra",
    status: "Upcoming",
    config: "Plotted Development",
    description: "Curated plots within a gated coastal community — investment-grade land parcels.",
  },
  {
    img: project2,
    name: "Marine Heights",
    location: "Bandra, Mumbai",
    status: "Ongoing",
    config: "3 & 4 BHK Sky Homes",
    description: "Redefined vertical living with double-height decks and full-floor residences.",
  },
  {
    img: project3,
    name: "Nawander Institutional Campus",
    location: "Latur, Maharashtra",
    status: "Completed",
    config: "Institutional",
    description: "A 15-acre educational campus designed for scale, light and long-term use.",
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

  const allProjects = dynamicProjects;
  const filter = active === "ongoing" ? "Ongoing" : active === "upcoming" ? "Upcoming" : "Completed";
  const filtered = allProjects.filter((p) => p.status === filter);

  return (
    <>
      {/* HERO */}
      <section className="pt-28 md:pt-36 pb-8 bg-secondary/40">
        <div className="container-x max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="rule-line" />
            <span className="eyebrow">Portfolio</span>
          </div>
          <h1 className="font-serif">
            Featured <em className="italic text-brick">Developments</em>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Explore our signature projects that reflect our expertise across residential,
            commercial, and infrastructure sectors.
          </p>
        </div>
      </section>

      {/* FEATURED CARDS SLIDER (HOME PAGE LANDMARK ANIMATION) */}
      <section className="py-6 md:py-8 bg-cream overflow-hidden">
        <HorizontalProjects />
      </section>

      {/* TABS */}
      <section className="section-y">
        <div className="container-x">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-14 border-b border-border pb-4">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`px-5 py-3 text-[12px] tracking-[0.2em] uppercase transition-all relative ${
                  active === t.id ? "text-brick" : "text-cocoa/60 hover:text-cocoa"
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
                  key={p.name}
                  className="group bg-[#FBF1E9] border border-[#6D0D12]/15 rounded-none overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-sm"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.name}
                      width={1200}
                      height={900}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 bg-brick text-cream text-[10px] tracking-[0.24em] uppercase px-3 py-1.5">
                      {p.status}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="eyebrow">{p.config}</div>
                    <h3 className="mt-2 font-serif text-2xl text-cocoa">{p.name}</h3>
                    <div className="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" />
                      {p.location}
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                      {p.description}
                    </p>
                    <Link
                      to="/inquire"
                      className="mt-5 inline-flex items-center gap-2 text-[11px] tracking-[0.24em] uppercase text-brick hover:gap-3 transition-all"
                    >
                      Inquire <ArrowUpRight className="w-3.5 h-3.5" />
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
