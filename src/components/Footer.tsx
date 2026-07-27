import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";

export function Footer() {
  return (
    <footer className="bg-cocoa text-cream/80 border-t border-cream/10">
      <div className="container-x py-20 grid gap-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="max-w-sm">
          <div className="mb-6">
            <img src={logoWhite} alt="Second Brick — Advise.Assist.Buy.Sell" className="h-11 w-auto object-contain opacity-95" />
          </div>
          <p className="text-sm leading-relaxed text-cream/70">
            A strategic partnership between PRO-DEV and Nawander Group, delivering trusted
            real estate solutions through decades of experience, quality construction, and
            customer-focused service.
          </p>
        </div>

        <div>
          <h4 className="text-cream text-sm tracking-[0.28em] uppercase font-sans font-medium mb-6">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm">
            {[
              { l: "Home", to: "/" },
              { l: "About", to: "/about" },
              { l: "Portfolio", to: "/portfolio" },
             { l: "Insights", to: "/insights" },
              { l: "Inquire", to: "/inquire" },
            ].map((i) => (
              <li key={i.l}>
                <Link to={i.to} className="hover:text-cream transition-colors">
                  {i.l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-cream text-sm tracking-[0.28em] uppercase font-sans font-medium mb-6">
            Offices
          </h4>
          <ul className="space-y-4 text-sm">
            {[
              { c: "Mumbai", a: "301, Zee Square, M G Road, Vile Parle East, Mumbai — 400057" },
              { c: "Pune", a: "Nawander House, 1156 Saifee Street, MG Road, Camp, Pune — 411 001" },
              { c: "Latur", a: "Nawander Complex, Sai Mandir Road, Vishal Nagar, Latur" },
            ].map((o) => (
              <li key={o.c} className="flex gap-3">
                <MapPin className="w-4 h-4 text-brick mt-0.5 shrink-0" />
                <div>
                  <div className="text-cream font-medium">{o.c}</div>
                  <div className="text-cream/60 text-[13px] leading-relaxed mt-1">{o.a}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-cream text-sm tracking-[0.28em] uppercase font-sans font-medium mb-6">
            Contact
          </h4>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3 items-center">
              <Phone className="w-4 h-4 text-brick" />
              <a href="tel:+919004590002" className="hover:text-cream">+91 9004 590 002</a>
            </li>
            <li className="flex gap-3 items-center">
              <Mail className="w-4 h-4 text-brick" />
              <a href="mailto:info@secondbrick.in" className="hover:text-cream">info@secondbrick.in</a>
            </li>
          </ul>
          <Link to="/inquire" className="btn-ghost mt-8 inline-flex">Inquire Now</Link>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-x py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] text-cream/50">
          <p>© 2026 Second Brick. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <p className="tracking-[0.2em] uppercase">PRO-DEV × Nawander Group</p>
            <span className="opacity-30">|</span>
            <Link to="/admin" className="hover:text-cream transition-colors underline underline-offset-2">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
