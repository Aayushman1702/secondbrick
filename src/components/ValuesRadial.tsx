import { useState } from "react";

const values = [
  {
    t: "Transparency",
    d: "Open communication and honest transactions across every engagement.",
  },
  {
    t: "Quality",
    d: "Uncompromising standards in materials, craft and finish.",
  },
  {
    t: "Leadership",
    d: "Setting benchmarks the wider industry can follow.",
  },
  {
    t: "Communities",
    d: "Building neighborhoods, not just addresses.",
  },
  {
    t: "Responsibility",
    d: "Development that answers to environment and society.",
  },
  {
    t: "Inclusivity",
    d: "Homes and workplaces that welcome everyone.",
  },
  {
    t: "Future",
    d: "Anticipating how people will live, work and gather next.",
  },
  {
    t: "Sustainability",
    d: "Long-life buildings with a light long-term footprint.",
  },
];

export function ValuesRadial() {
  const [active, setActive] = useState<number | null>(null);

  // Radius for placing labels
  const R = 170;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[640px]">
      {/* Concentric Rings */}
      <svg
        viewBox="0 0 500 500"
        className="absolute inset-0 w-full h-full text-cream/25"
      >
        <circle
          cx="250"
          cy="250"
          r="240"
          fill="none"
          stroke="currentColor"
          strokeDasharray="2 6"
        />
        <circle
          cx="250"
          cy="250"
          r="180"
          fill="none"
          stroke="currentColor"
        />
        <circle
          cx="250"
          cy="250"
          r="120"
          fill="none"
          stroke="currentColor"
        />
        <line
          x1="250"
          y1="10"
          x2="250"
          y2="490"
          stroke="currentColor"
          strokeDasharray="2 6"
        />
        <line
          x1="10"
          y1="250"
          x2="490"
          y2="250"
          stroke="currentColor"
          strokeDasharray="2 6"
        />
      </svg>

      {/* Center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div
            className="eyebrow"
            style={{ color: "var(--cream)" }}
          >
            EST. 2024
          </div>

          <div className="mt-2 font-serif text-4xl text-cream">
            Our Values
          </div>

          <div className="mt-3 text-xs text-cream/60 max-w-[180px] mx-auto leading-relaxed">
            {active !== null
              ? values[active].d
              : "Hover a principle to explore"}
          </div>
        </div>
      </div>

      {/* Orbit Labels */}
      {values.map((v, i) => {
        const angle =
          (i / values.length) * Math.PI * 2 - Math.PI / 2;

        return (
          <button
            key={v.t}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            className={`absolute transition-all duration-500 ${
              active === i
                ? "text-brick"
                : "text-cream/85 hover:text-cream"
            }`}
            style={{
              left: "50%",
              top: "50%",
              transform: `
                translate(-50%, -50%)
                translate(${Math.cos(angle) * R}px, ${
                Math.sin(angle) * R
              }px)
              `,
            }}
          >
            <div className="flex flex-col items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  active === i
                    ? "bg-brick scale-150"
                    : "bg-cream/60"
                }`}
              />

              <span
                className={`font-serif italic whitespace-nowrap text-lg md:text-xl transition-all duration-300 ${
                  active === i ? "scale-110" : ""
                }`}
              >
                {v.t}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}