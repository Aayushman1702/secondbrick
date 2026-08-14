import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { getStoredBlogs } from "@/lib/contentStore";
import { ArrowUpRight } from "lucide-react";
import heroInsights from "@/assets/hero-insights.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import responsibility from "@/assets/responsibility.jpg";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights & Updates — Second Brick Blog" },
      { name: "description", content: "Real estate knowledge, market trends and investment insights from Second Brick — a PRO-DEV × Nawander Group partnership." },
      { property: "og:title", content: "Second Brick — Insights & Updates" },
      { property: "og:description", content: "Real estate knowledge, market trends and investment insights." },
    ],
  }),
  component: Insights,
});

const categories = ["All", "Investment", "Market Updates", "Buying Guide", "Project News", "Lifestyle"];

const defaultPosts = [
  {
    id: "1",
    img: project2,
    cat: "Market Updates",
    title: "Mumbai Redevelopment — What Buyers Should Watch in 2026",
    excerpt: "Policy shifts, floor space rules and new corridors that will define value over the next decade.",
    author: "PRO-DEV Editorial",
    date: "Feb 22, 2026",
    articleUrl: "https://economictimes.indiatimes.com",
  },
  {
    id: "2",
    img: project3,
    cat: "Buying Guide",
    title: "The First-Time Investor's Guide to Township Living",
    excerpt: "What to look for when master-planned communities are your entry point into real estate.",
    author: "Ar. Maheshkumar Nawander",
    date: "Feb 04, 2026",
    articleUrl: "",
  },
  {
    id: "3",
    img: responsibility,
    cat: "Lifestyle",
    title: "Building Green — Sustainable Choices That Add Value",
    excerpt: "Small material and design decisions that reduce lifetime costs and increase resale strength.",
    author: "Second Brick",
    date: "Jan 28, 2026",
    articleUrl: "",
  },
  {
    id: "4",
    img: project2,
    cat: "Project News",
    title: "Urban Skyline Residences Reaches Structural Completion",
    excerpt: "A milestone update from our Vile Parle site — timelines, finishes and possession outlook.",
    author: "PRO-DEV",
    date: "Jan 10, 2026",
    articleUrl: "",
  },
  {
    id: "5",
    img: project1,
    cat: "Investment",
    title: "How to Evaluate a Second-Home Investment",
    excerpt: "A practical framework for weighing yield, appreciation, usage and holding costs.",
    author: "Namrata Malu",
    date: "Dec 18, 2025",
    articleUrl: "",
  },
];

function Insights() {
  const [active, setActive] = useState("All");
  const [dynamicBlogs, setDynamicBlogs] = useState<any[]>([]);

  useEffect(() => {
    const stored = getStoredBlogs().map((b) => ({
      id: b.id,
      img: b.featuredImage || "",
      cat: b.cat || "Investment",
      title: b.title,
      excerpt: b.excerpt || b.description,
      author: b.author || "Second Brick Editorial",
      date: b.date || "2026",
      articleUrl: b.articleUrl || "",
    }));
    setDynamicBlogs(stored);

    const handleUpdate = () => {
      const updated = getStoredBlogs().map((b) => ({
        id: b.id,
        img: b.featuredImage || "",
        cat: b.cat || "Investment",
        title: b.title,
        excerpt: b.excerpt || b.description,
        author: b.author || "Second Brick Editorial",
        date: b.date || "2026",
        articleUrl: b.articleUrl || "",
      }));
      setDynamicBlogs(updated);
    };

    window.addEventListener("content_store_updated", handleUpdate);
    return () => window.removeEventListener("content_store_updated", handleUpdate);
  }, []);

  const allPosts = dynamicBlogs;
  const filtered = active === "All" ? allPosts : allPosts.filter((p) => p.cat === active);

  return (
    <>
      {/* HERO */}
      <section className="relative pt-28 md:pt-36 pb-10 overflow-hidden bg-cream">
        <img
          src={heroInsights}
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
            {filtered.map((p) => {
              const targetUrl = p.articleUrl?.trim();
              const hasExternalLink = Boolean(targetUrl);

              const cardContent = (
                <div className="h-full flex flex-col justify-between">
                  <div>
                    {p.img && p.img.trim() !== "" && (
                      <div className="aspect-[4/3] overflow-hidden mb-5 bg-secondary relative">
                        <img
                          src={p.img}
                          alt={p.title}
                          width={1200}
                          height={900}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="eyebrow">{p.cat}</div>
                      {hasExternalLink ? (
                        <span className="inline-flex items-center gap-1 text-[10px] tracking-wider uppercase font-semibold text-brick">
                          <span>External Article</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] tracking-wider uppercase font-semibold text-brick">
                          <span>Read More</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                    <h3 className="mt-3 font-serif text-2xl text-cocoa leading-tight group-hover:text-brick transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.excerpt}</p>
                  </div>
                  <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-cream/50">
                    <span>{p.author}</span>
                    <span>{p.date}</span>
                  </div>
                </div>
              );

              if (hasExternalLink) {
                return (
                  <a
                    key={p.id || p.title}
                    href={targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group cursor-pointer block p-5 rounded-none bg-[#FBF1E9] border border-[#6D0D12]/15 hover:bg-[#F5E6D8] transition-all hover:shadow-sm"
                  >
                    {cardContent}
                  </a>
                );
              }

              return (
                <Link
                  key={p.id || p.title}
                  to="/insights/$id"
                  params={{ id: p.id }}
                  className="group cursor-pointer block p-5 rounded-none bg-[#FBF1E9] border border-[#6D0D12]/15 hover:bg-[#F5E6D8] transition-all hover:shadow-sm"
                >
                  {cardContent}
                </Link>
              );
            })}
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

