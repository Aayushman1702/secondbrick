import { useEffect, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "sb_concierge_v1";

const steps = [
  {
    label: "Profile",
    q: "What best describes you?",
    options: ["First Home Buyer", "Investor", "Redevelopment Owner", "Commercial Buyer", "Just Exploring"],
  },
  {
    label: "Location",
    q: "Preferred location",
    options: ["Mumbai", "Pune", "Latur", "Alibaug"],
  },
  {
    label: "Budget",
    q: "Interested budget",
    options: ["Below 1 Cr", "1–3 Cr", "3 Cr+", "Skip"],
  },
] as const;

export function EntryConcierge() {
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    const t = window.setTimeout(() => {
      if (!localStorage.getItem(STORAGE_KEY)) setOpen(true);
    }, 900);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = (saved?: Record<string, string>) => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(saved ?? answers)); } catch {}
    setOpen(false);
  };

  const pick = (val: string) => {
    const key = steps[i].label.toLowerCase();
    const next = { ...answers, [key]: val };
    setAnswers(next);
    if (i < steps.length - 1) setI(i + 1);
    else close(next);
  };

  if (!open) return null;
  const s = steps[i];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-[fade-in_0.5s_ease-out]">
      <div className="absolute inset-0 bg-cocoa/60 backdrop-blur-xl" onClick={() => close()} />
      <div className="relative w-full max-w-xl bg-cream border border-brick/15 shadow-[0_50px_120px_-40px_rgba(61,40,34,0.55)] animate-[scale-in_0.5s_ease-out]">
        <button
          onClick={() => close()}
          aria-label="Close"
          className="absolute top-5 right-5 p-1.5 text-cocoa/60 hover:text-brick transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="px-10 pt-14 pb-10">
          <div className="flex items-center gap-3 mb-8">
            <span className="rule-line" />
            <span className="eyebrow">Welcome to Second Brick</span>
          </div>

          <div className="min-h-[280px]">
            <div className="text-[10px] tracking-[0.3em] uppercase text-brick/70 mb-4">
              0{i + 1} — 0{steps.length} · {s.label}
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-cocoa leading-tight">
              {s.q}
            </h2>

            <div className="mt-8 flex flex-col divide-y divide-border/70 border-y border-border/70">
              {s.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => pick(opt)}
                  className="group flex items-center justify-between py-4 text-left text-cocoa hover:text-brick transition-colors"
                >
                  <span className="font-serif text-lg">{opt}</span>
                  <span className="text-xs tracking-[0.24em] uppercase text-cocoa/40 group-hover:text-brick group-hover:translate-x-1 transition-all">
                    Select →
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between text-[11px] tracking-[0.24em] uppercase text-cocoa/50">
            <div className="flex items-center gap-2">
              {steps.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-px w-8 transition-all ${idx <= i ? "bg-brick" : "bg-cocoa/20"}`}
                />
              ))}
            </div>
            <button onClick={() => close()} className="hover:text-brick transition-colors">
              Enter Website →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
