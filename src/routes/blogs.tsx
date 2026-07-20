import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, User, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import heroBlogs from "@/assets/hero-blogs.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import responsibility from "@/assets/responsibility.jpg";

export const Route = createFileRoute("/blogs")({
  head: () => ({
    meta: [
      { title: "Insights & Updates — Second Brick Blog" },
      { name: "description", content: "Real estate knowledge, market trends and investment insights from Second Brick — a PRO-DEV × Nawander Group partnership." },
      { property: "og:title", content: "Second Brick — Insights & Updates" },
      { property: "og:description", content: "Real estate knowledge, market trends and investment insights." },
    ],
  }),
  component: Blogs,
});

const categories = ["All", "Investment", "Market Updates", "Buying Guide", "Project News", "Lifestyle"];

const posts = [
  {
    img: project1,
    cat: "Investment",
    title: "Why Alibaug is India's Next Coastal Growth Story",
    excerpt: "Infrastructure upgrades, second-home demand, and shifting lifestyle preferences are quietly rewriting the coastal investment map.",
    author: "Namrata Malu",
    date: "Mar 12, 2026",
    featured: true,
  },
  {
    img: project2,
    cat: "Market Updates",
    title: "Mumbai Redevelopment — What Buyers Should Watch in 2026",
    excerpt: "Policy shifts, floor space rules and new corridors that will define value over the next decade.",
    author: "PRO-DEV Editorial",
    date: "Feb 22, 2026",
  },
  {
    img: project3,
    cat: "Buying Guide",
    title: "The First-Time Investor's Guide to Township Living",
    excerpt: "What to look for when master-planned communities are your entry point into real estate.",
    author: "Ar. Maheshkumar Nawander",
    date: "Feb 04, 2026",
  },
  {
    img: responsibility,
    cat: "Lifestyle",
    title: "Building Green — Sustainable Choices That Add Value",
    excerpt: "Small material and design decisions that reduce lifetime costs and increase resale strength.",
    author: "Second Brick",
    date: "Jan 28, 2026",
  },
  {
    img: project2,
    cat: "Project News",
    title: "Urban Skyline Residences Reaches Structural Completion",
    excerpt: "A milestone update from our Vile Parle site — timelines, finishes and possession outlook.",
    author: "PRO-DEV",
    date: "Jan 10, 2026",
  },
  {
    img: project1,
    cat: "Investment",
    title: "How to Evaluate a Second-Home Investment",
    excerpt: "A practical framework for weighing yield, appreciation, usage and holding costs.",
    author: "Namrata Malu",
    date: "Dec 18, 2025",
  },
];

function Blogs() {
  const [active, setActive] = useState("All");
  const featured = posts.find((p) => p.featured)!;
  const rest = posts.filter((p) => !p.featured);
  const filtered = active === "All" ? rest : rest.filter((p) => p.cat === active);

  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 md:pt-40 pb-20 overflow-hidden">
        <img
          src={heroBlogs}
          alt="Open book with pen in warm light"
          width={1920}
          height={900}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/70 via-cream/85 to-cream" />
        <div className="container-x relative max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="rule-line" />
            <span className="eyebrow">Insights</span>
          </div>
          <h1 className="font-serif">
            Insights & <em className="italic text-brick">Updates</em>
          </h1>
          <p className="mt-6 text-lg text-cocoa/80 max-w-2xl">
            Real estate knowledge, market trends and investment insights — from the desks of
            PRO-DEV & Nawander Group.
          </p>
        </div>
      </section>

      {/* FEATURED ARTICLE */}
      <section className="pb-20">
        <div className="container-x">
          <a href="#featured" className="group grid lg:grid-cols-2 gap-10 items-center bg-cream border border-border overflow-hidden">
            <div className="aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden">
              <img
                src={featured.img}
                alt={featured.title}
                width={1200}
                height={900}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-8 lg:p-14">
              <div className="flex items-center gap-3">
                <span className="text-[10px] tracking-[0.24em] uppercase bg-brick text-cream px-3 py-1.5">Featured</span>
                <span className="eyebrow">{featured.cat}</span>
              </div>
              <h2 className="mt-6 font-serif text-3xl md:text-4xl text-cocoa leading-tight">
                {featured.title}
              </h2>
              <p className="mt-5 text-base text-muted-foreground leading-relaxed">
                {featured.excerpt}
              </p>
              <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {featured.author}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {featured.date}</span>
              </div>
              <div className="mt-8 inline-flex items-center gap-2 text-[11px] tracking-[0.24em] uppercase text-brick group-hover:gap-3 transition-all">
                Read Article <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* CATEGORIES + LIST */}
      <section className="pb-24">
        <div className="container-x">
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-4 py-2 text-[11px] tracking-[0.2em] uppercase border transition-all ${
                  active === c
                    ? "bg-brick text-cream border-brick"
                    : "border-border text-cocoa/70 hover:border-brick hover:text-brick"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p) => (
              <article key={p.title} className="group cursor-pointer">
                <div className="aspect-[4/3] overflow-hidden mb-5">
                  <img
                    src={p.img}
                    alt={p.title}
                    width={1200}
                    height={900}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="eyebrow">{p.cat}</div>
                <h3 className="mt-3 font-serif text-2xl text-cocoa leading-tight group-hover:text-brick transition-colors">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.excerpt}</p>
                <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{p.author}</span>
                  <span>{p.date}</span>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              No articles in this category yet.
            </div>
          )}
        </div>
      </section>

      <section className="section-y bg-secondary/50">
        <div className="container-x text-center max-w-2xl">
          <SectionHeading
            eyebrow="Subscribe"
            title="Get insights, delivered."
            description="A curated newsletter — no noise, just the market intelligence that helps you invest with confidence."
            align="center"
          />
          <form className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-cream border border-border px-5 py-3 text-sm focus:outline-none focus:border-brick"
            />
            <button type="submit" className="btn-primary">Subscribe</button>
          </form>
        </div>
      </section>
    </>
  );
}
