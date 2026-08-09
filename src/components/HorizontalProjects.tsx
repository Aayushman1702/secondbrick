import { Link } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { getStoredProjects } from "@/lib/contentStore";
import project1 from "@/assets/project-1.jpg";

export function HorizontalProjects() {
  const [hover, setHover] = useState<number | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const [projectsList, setProjectsList] = useState<any[]>([]);

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

  return (
    <div className="relative">
      <div
        ref={scroller}
        className="flex gap-6 overflow-x-auto pb-8 px-6 md:px-16 snap-x snap-mandatory scroll-smooth
          [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-cocoa/5
          [&::-webkit-scrollbar-thumb]:bg-brick/40"
      >
        {displayProjects.map((p, i) => {
          const isHover = hover === i;
          return (
            <Link
              key={p.id || i}
              to="/project/$id"
              params={{ id: p.id }}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className={`relative shrink-0 snap-start overflow-hidden group transition-[width,transform] duration-700 ease-[cubic-bezier(.65,.05,.36,1)]
                h-[70vh] max-h-[640px] rounded-none
                ${isHover ? "w-[70vw] md:w-[640px]" : "w-[42vw] md:w-[380px]"}`}
              style={{ minWidth: 280 }}
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
                <h3 className="font-serif text-3xl md:text-4xl leading-tight">{p.name}</h3>
                <div className="text-sm opacity-80 mt-2">{p.location}</div>

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

      <div className="px-6 md:px-16 mt-6 flex items-center justify-between text-[11px] tracking-[0.28em] uppercase text-cocoa/60">
        <span>Drag or scroll →</span>
        <span>{displayProjects.length} projects</span>
      </div>
    </div>
  );
}
