import { useEffect, useRef, useState } from "react";

const milestones = [
  { year: "1994", t: "The First Foundation", d: "PRO-DEV begins redevelopment work in Mumbai, laying the groundwork for a legacy of quality." },
  { year: "2005", t: "Expansion Across Maharashtra", d: "Nawander Group establishes master-planned townships across Pune and Latur." },
  { year: "2014", t: "10 Million Sq. Ft. Delivered", d: "A milestone achieved through consistent execution and long-term relationships." },
  { year: "2020", t: "Institutional Developments", d: "Landmark educational and civic projects delivered on time and to specification." },
  { year: "2024", t: "The Second Brick Partnership", d: "Two legacies join forces to shape the next chapter of India's coastal growth." },
];

function Row({ m, i }: { m: typeof milestones[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShown(true), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const flip = i % 2 === 1;
  return (
    <div
      ref={ref}
      className={`relative grid md:grid-cols-2 gap-8 md:gap-16 items-center py-14 transition-all duration-1000 ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div className={`${flip ? "md:order-2 md:text-left" : "md:text-right"} px-6 md:px-0`}>
        <div className="font-serif text-6xl md:text-7xl text-brick leading-none">{m.year}</div>
        <h3 className="mt-4 font-serif text-2xl text-cocoa">{m.t}</h3>
        <p className="mt-3 text-muted-foreground max-w-md md:ml-auto md:mr-0" style={flip ? { marginLeft: 0 } : {}}>{m.d}</p>
      </div>
      <div className={`${flip ? "md:order-1" : ""} relative h-32 md:h-40`}>
        <svg viewBox="0 0 200 100" className="w-full h-full text-brick/40">
          <line x1="0" y1="50" x2="200" y2="50" stroke="currentColor" strokeDasharray="2 5" />
          <circle cx={flip ? 20 : 180} cy="50" r="6" fill="var(--brick)" />
          <circle cx={flip ? 20 : 180} cy="50" r="16" fill="none" stroke="var(--brick)" opacity="0.3" />
        </svg>
      </div>
    </div>
  );
}

export function Timeline() {
  return (
    <div className="relative">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-brick/20 hidden md:block" />
      {milestones.map((m, i) => <Row key={m.year} m={m} i={i} />)}
    </div>
  );
}
