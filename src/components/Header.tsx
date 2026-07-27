import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png";

const nav = [
  { label: "Home", to: "/" },
  {
    label: "About",
    to: "/about",
    children: [
      { label: "Our Story", to: "/about", hash: "story" },
      { label: "Our Values", to: "/about", hash: "values" },
      { label: "Our Presence", to: "/about", hash: "presence" },
    ],
  },
  {
    label: "Portfolio",
    to: "/portfolio",
    children: [
      { label: "Past Experience", to: "/portfolio", hash: "past" },
      { label: "Ongoing Projects", to: "/portfolio", hash: "ongoing" },
      { label: "Upcoming Projects", to: "/portfolio", hash: "upcoming" },
    ],
  },
 { label: "Insights", to: "/insights" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "bg-cream/95 backdrop-blur-md border-b border-border shadow-[0_1px_20px_-10px_rgba(61,40,34,0.25)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between h-20">
        <Link to="/" className="flex items-center group py-1" onClick={() => setOpen(false)}>
          <img src={logo} alt="Second Brick — Advise.Assist.Buy.Sell" className="h-10 sm:h-11 w-auto object-contain" />
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {nav.map((item) => (
            <div key={item.label} className="relative group">
              <Link
                to={item.to}
                activeOptions={item.to === "/" ? { exact: true } : undefined}
                className="relative flex items-center gap-1 text-[13px] tracking-[0.14em] uppercase text-cocoa hover:text-brick transition-colors py-2 font-medium"
                activeProps={{
                  className: "text-brick font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-brick after:rounded-full",
                }}
              >
                {item.label}
                {item.children && <ChevronDown className="w-3.5 h-3.5 opacity-60" />}
              </Link>
              {item.children && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300">
                  <div className="bg-cream border border-border shadow-[var(--shadow-card)] min-w-56 py-3">
                    {item.children.map((c) => (
                      <Link
                        key={c.label}
                        to={c.to}
                        hash={c.hash}
                        className="block px-5 py-2.5 text-[13px] text-cocoa hover:bg-secondary hover:text-brick transition-colors"
                        activeProps={{ className: "bg-secondary/70 text-brick font-medium" }}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link to="/inquire" className="btn-primary">
            Inquire
          </Link>
        </div>

        <button
          className="lg:hidden text-cocoa p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-cream border-t border-border">
          <div className="container-x py-6 flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                activeOptions={item.to === "/" ? { exact: true } : undefined}
                onClick={() => setOpen(false)}
                className="py-3 border-b border-border/60 text-sm tracking-[0.14em] uppercase text-cocoa hover:text-brick"
                activeProps={{
                  className: "text-brick font-semibold border-b-2 border-brick",
                }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/inquire"
              onClick={() => setOpen(false)}
              className="btn-primary mt-5 w-full"
            >
              Inquire
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
