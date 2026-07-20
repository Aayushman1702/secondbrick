import { useEffect, useState } from "react";

export function PageLoader() {
  const [gone, setGone] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const t1 = window.setTimeout(() => setGone(true), 1500);
    const t2 = window.setTimeout(() => setHide(true), 2100);
    return () => { window.clearTimeout(t1); window.clearTimeout(t2); };
  }, []);

  if (hide) return null;

  return (
    <div
      className={`fixed inset-0 z-[110] flex items-center justify-center bg-cream transition-opacity duration-700 ${gone ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      aria-hidden={gone}
    >
      <div className="relative w-40 h-40">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <style>{`
              .sb-line { stroke: #6D0D12; stroke-width: 1.2; fill: none; stroke-dasharray: 400; stroke-dashoffset: 400; animation: dash 1.2s cubic-bezier(.65,.05,.36,1) forwards; }
              .sb-line.d2 { animation-delay: .15s; }
              .sb-line.d3 { animation-delay: .3s; }
              .sb-fill { opacity: 0; animation: fill 0.6s ease-out 1s forwards; }
              @keyframes dash { to { stroke-dashoffset: 0; } }
              @keyframes fill { to { opacity: 1; } }
            `}</style>
          </defs>
          {/* Architectural frame */}
          <rect className="sb-line" x="20" y="20" width="160" height="160" />
          <line className="sb-line d2" x1="20" y1="100" x2="180" y2="100" />
          <line className="sb-line d2" x1="100" y1="20" x2="100" y2="180" />
          <circle className="sb-line d3" cx="100" cy="100" r="42" />
          <text className="sb-fill" x="100" y="115" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="42" fill="#3D2822">SB</text>
        </svg>
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] uppercase text-cocoa/60">
          Second Brick
        </div>
      </div>
    </div>
  );
}
