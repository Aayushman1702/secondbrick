import { Link } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { getStoredProjects } from "@/lib/contentStore";
import project1 from "@/assets/project-1.jpg";

export function HorizontalProjects() {
  const [hover, setHover] = useState<number | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const loadProjects = () => {
      const stored = getStoredProjects()
        .filter((p) => p.featuredOnHomepage !== false)
        .map((p, idx) => ({
          id: p.id,
          img: p.featuredImage || project1,
          name: p.title,
          location: p.location || "Maharashtra",
          status: p.status || "Ongoing",
          n: idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`,
        }));
      setProjectsList(stored);
    };

    loadProjects();
    window.addEventListener("content_store_updated", loadProjects);
    return () => window.removeEventListener("content_store_updated", loadProjects);
  }, []);

  const displayProjects = projectsList.length > 0 ? projectsList : [];
  const count = displayProjects.length;
  const hasHover = hover !== null;

  const checkScroll = () => {
    if (!scroller.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scroller.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scroller.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      el?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [displayProjects]);

  const handleScroll = (dir: "left" | "right") => {
    if (!scroller.current) return;
    const containerWidth = scroller.current.clientWidth;
    const scrollAmount = containerWidth * 0.75;
    scroller.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full px-6 md:px-16">
      <div
        ref={scroller}
        className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scroll-smooth
          [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-cocoa/5
          [&::-webkit-scrollbar-thumb]:bg-brick/40"
      >
        {displayProjects.map((p, i) => {
          const isHover = hover === i;

          // Grand luxury card sizing: always maintain large, impactful card dimensions (3 cards per view on desktop)
          let desktopWidth = "calc((100% - 48px) / 3)";
          if (count === 1) {
            desktopWidth = "100%";
          } else if (count === 2) {
            if (hasHover) {
              desktopWidth = isHover ? "calc((100% - 24px) * 0.60)" : "calc((100% - 24px) * 0.40)";
            } else {
              desktopWidth = "calc((100% - 24px) / 2)";
            }
          } else {
            // 3, 4, 5+ projects: always keep full-size grand cards (3 per view)
            if (hasHover) {
              desktopWidth = isHover ? "calc((100% - 48px) * 0.48)" : "calc((100% - 48px) * 0.26)";
            } else {
              desktopWidth = "calc((100% - 48px) / 3)";
            }
          }

          return (
            <Link
              key={p.id || i}
              to="/project/$id"
              params={{ id: p.id }}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className="relative shrink-0 overflow-hidden group transition-[width,transform] duration-700 ease-[cubic-bezier(.65,.05,.36,1)]
                h-[70vh] max-h-[640px] rounded-none snap-start
                w-[82vw] sm:w-[45vw] lg:w-[var(--desktop-w)]"
              style={{
                ["--desktop-w" as any]: desktopWidth,
              }}
            >
              <img
                src={p.img}
                alt={p.name}
                loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out ${isHover ? "scale-105" : "scale-100"}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cocoa/95 via-cocoa/30 to-transparent" />

              {/* Corner architectural marks */}
              <div className="absolute top-5 left-5 right-5 flex items-start justify-between text-cream">
                <span className="text-[10px] tracking-[0.3em] uppercase opacity-80">{p.n}</span>
                <span className={`text-[10px] tracking-[0.24em] uppercase px-3 py-1 border ${
                  p.status === "Ongoing" ? "border-cream/70 bg-cream/10" :
                  p.status === "Completed" ? "border-cream/40" :
                  "bg-cream text-brick border-cream"
                }`}>
                  {p.status}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-7 text-cream">
                <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl leading-tight text-cream drop-shadow-sm">{p.name}</h3>
                <div className="text-sm text-cream/80 mt-2">{p.location}</div>

                <div className={`overflow-hidden transition-all duration-500 ${isHover ? "max-h-20 opacity-100 mt-6" : "max-h-0 opacity-0 mt-0"}`}>
                  <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.24em] uppercase border-b border-cream pb-1">
                    View Project <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between text-[11px] tracking-[0.28em] uppercase text-cocoa/60">
        <div className="flex items-center gap-4">
          <span className="lg:hidden">Drag or scroll →</span>
          <span className="hidden lg:inline">{count <= 5 ? "Hover to expand" : "Drag or scroll →"}</span>
        </div>

        <div className="flex items-center gap-4">
          {count > 5 && (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleScroll("left")}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className={`p-2 border transition-all ${
                  canScrollLeft
                    ? "border-cocoa/30 hover:bg-brick hover:text-cream hover:border-brick cursor-pointer text-cocoa"
                    : "border-cocoa/10 opacity-30 cursor-not-allowed text-cocoa/30"
                }`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll("right")}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                className={`p-2 border transition-all ${
                  canScrollRight
                    ? "border-cocoa/30 hover:bg-brick hover:text-cream hover:border-brick cursor-pointer text-cocoa"
                    : "border-cocoa/10 opacity-30 cursor-not-allowed text-cocoa/30"
                }`}
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
          <span>{count} projects</span>
        </div>
      </div>
    </div>
  );
}
