import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Building2,
  MapPin,
  Calendar,
  Layers,
  ArrowUpRight,
  Printer,
  Share2,
  CheckCircle2,
  Download,
  PhoneCall,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Eye,
  Video,
  FileText,
  Clock,
  Compass,
  Car,
  Plane,
  Train,
  Check,
  ExternalLink,
  Edit,
} from "lucide-react";
import { getProjectById, getStoredProjects, ProjectItem, isAdminAuthenticated } from "@/lib/contentStore";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import logo from "@/assets/logo.png";
import prodevLogo from "@/assets/logo-prodev-full.png";
import nawanderLogo from "@/assets/logo-nawander.png";

export const Route = createFileRoute("/project/$id")({
  head: () => ({
    meta: [
      { title: "Executive Project One-Pager — Second Brick" },
      { name: "description", content: "Executive real estate project one-pager by Second Brick (PRO-DEV × Nawander Group)." },
      { property: "og:title", content: "Executive Project One-Pager — Second Brick" },
      { property: "og:description", content: "Decades of collective experience across residential, commercial and infrastructure development." },
    ],
  }),
  component: ProjectOnePager,
});

function ProjectOnePager() {
  const { id } = useParams({ from: "/project/$id" });
  const [project, setProject] = useState<ProjectItem | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showInquireModal, setShowInquireModal] = useState(false);
  const [inquireSuccess, setInquireSuccess] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  // Inquire form state
  const [inquireName, setInquireName] = useState("");
  const [inquirePhone, setInquirePhone] = useState("");
  const [inquireEmail, setInquireEmail] = useState("");
  const [inquireType, setInquireType] = useState("Private Buyer / Investor");

  useEffect(() => {
    setIsAuthed(isAdminAuthenticated());
    const loadProject = () => {
      const found = getProjectById(id);
      if (found) {
        setProject(found);
      } else {
        // Fallback to first available project
        const all = getStoredProjects();
        if (all.length > 0) {
          setProject(all[0]);
        }
      }
    };

    loadProject();
    window.addEventListener("content_store_updated", loadProject);
    return () => window.removeEventListener("content_store_updated", loadProject);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <Building2 className="w-12 h-12 text-[#6D0D12]/40 animate-pulse mb-4" />
        <h2 className="text-xl font-serif font-bold text-slate-800">Loading Project One-Pager...</h2>
        <p className="text-slate-500 text-xs mt-1">Retrieving official architectural & project specs.</p>
        <Link to="/portfolio" className="btn-primary mt-6 text-xs">
          Browse Portfolio
        </Link>
      </div>
    );
  }

  const allImages = [
    project.featuredImage || project1,
    ...(project.galleryImages && project.galleryImages.length > 0 ? project.galleryImages : [project2, project3]),
  ];

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleInquireSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquireSuccess(true);
    setTimeout(() => {
      setInquireSuccess(false);
      setShowInquireModal(false);
      setInquireName("");
      setInquirePhone("");
      setInquireEmail("");
    }, 2800);
  };

  const defaultUsps = [
    "Prime Strategic Micro-Market with Proven Capital Appreciation",
    "Architectural Layout Engineered for High Natural Light & Cross-Ventilation",
    "Gated Private Community with 24/7 Monitored Concierge & Security",
    "100% IGBC Sustainable Green Standards & Rainwater Harvesting",
    "Dedicated High-Speed Electric Vehicle (EV) Charging Infrastructure",
    "Comprehensive 30+ Years Proven Delivery by PRO-DEV & Nawander Group",
  ];

  const uspsToDisplay = project.usps && project.usps.length > 0 ? project.usps : defaultUsps;

  const defaultConnectivity = [
    { icon: Car, label: "Highway Access", desc: "Direct 5-minute link to arterial expressway" },
    { icon: Plane, label: "Airport", desc: "Short transit to International Airport corridors" },
    { icon: Train, label: "Transit / Metro", desc: "Rapid connectivity to business & commercial districts" },
    { icon: Compass, label: "Coast / Lifestyle", desc: "Proximate to high-end social & recreational hubs" },
  ];

  return (
    <div className="bg-[#FBF1E9] text-[#3D2822] min-h-screen selection:bg-[#6D0D12] selection:text-[#FBF1E9] print:bg-white print:text-black">
      {/* PRINT-ONLY HEADER */}
      <div className="hidden print:flex items-center justify-between border-b-2 border-[#6D0D12] pb-4 mb-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Second Brick" className="h-10 w-auto" />
          <div>
            <div className="font-serif font-bold text-lg text-[#6D0D12]">SECOND BRICK</div>
            <div className="text-[9px] uppercase tracking-widest text-slate-600">Executive Real Estate Project One-Pager · PRO-DEV × Nawander Group</div>
          </div>
        </div>
        <div className="text-right text-[10px] text-slate-500">
          <div>RERA: <span className="font-mono font-bold text-slate-800">{project.reraNumber || "Approved"}</span></div>
          <div>secondbrick.in/portfolio</div>
        </div>
      </div>

      {/* EXECUTIVE HERO BANNER */}
      <section className="relative bg-[#3D2822] text-[#FBF1E9] overflow-hidden pt-12 pb-14 sm:pb-20 border-b border-[#6D0D12]/30 print:bg-white print:text-black print:p-0 print:border-none">
        {/* Background ambient lighting */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#3D2822] via-[#3D2822]/90 to-[#6D0D12]/40 pointer-events-none print:hidden" />
        <div
          className="absolute inset-0 opacity-15 pointer-events-none print:hidden bg-cover bg-center mix-blend-overlay"
          style={{ backgroundImage: `url(${project.featuredImage || project1})` }}
        />

        <div className="container-x relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left info column */}
            <div className="lg:col-span-7 space-y-4">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="bg-[#6D0D12] text-[#FBF1E9] px-3 py-1 text-[11px] tracking-[0.2em] uppercase font-bold border border-[#6D0D12]">
                  {project.status || "Ongoing"}
                </span>
                <span className="bg-white/10 text-[#FBF1E9] px-3 py-1 text-[11px] tracking-[0.16em] uppercase font-medium border border-white/20">
                  {project.type || "Residential"}
                </span>
                {project.location && (
                  <span className="text-[#FBF1E9]/80 flex items-center gap-1 text-xs">
                    <MapPin className="w-3.5 h-3.5 text-[#FBF1E9]" />
                    <span>{project.location}</span>
                  </span>
                )}
              </div>

              {/* Title & Tagline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#FBF1E9] leading-[1.08] tracking-tight print:text-black">
                {project.title}
              </h1>

              <p className="text-sm sm:text-base text-[#FBF1E9]/90 font-light leading-relaxed max-w-2xl print:text-slate-800">
                {project.tagline || project.description}
              </p>

              {/* Quick Spec Highlights Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/15 print:border-slate-300">
                <div className="bg-white/5 print:bg-slate-100 p-2.5 border border-white/10 print:border-slate-300">
                  <div className="text-[10px] uppercase tracking-wider text-[#FBF1E9]/60 print:text-slate-500 font-semibold">Total Area</div>
                  <div className="text-sm sm:text-base font-serif font-bold text-[#FBF1E9] print:text-black mt-0.5">{project.sqft} sq.ft</div>
                </div>

                <div className="bg-white/5 print:bg-slate-100 p-2.5 border border-white/10 print:border-slate-300">
                  <div className="text-[10px] uppercase tracking-wider text-[#FBF1E9]/60 print:text-slate-500 font-semibold">Timeline / Possession</div>
                  <div className="text-sm sm:text-base font-serif font-bold text-[#FBF1E9] print:text-black mt-0.5">{project.possessionDate || project.date || "Ready"}</div>
                </div>

                <div className="bg-white/5 print:bg-slate-100 p-2.5 border border-white/10 print:border-slate-300">
                  <div className="text-[10px] uppercase tracking-wider text-[#FBF1E9]/60 print:text-slate-500 font-semibold">Configuration / Typology</div>
                  <div className="text-sm sm:text-base font-serif font-bold text-[#FBF1E9] print:text-black mt-0.5">{project.totalUnits || project.type}</div>
                </div>

                <div className="bg-white/5 print:bg-slate-100 p-2.5 border border-white/10 print:border-slate-300">
                  <div className="text-[10px] uppercase tracking-wider text-[#FBF1E9]/60 print:text-slate-500 font-semibold">Price / Valuation</div>
                  <div className="text-sm sm:text-base font-serif font-bold text-[#FBF1E9] print:text-black mt-0.5">{project.priceRange || "On Request"}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2 print:hidden">
                <button
                  onClick={() => setShowInquireModal(true)}
                  className="bg-[#6D0D12] hover:bg-[#550a0e] text-[#FBF1E9] px-6 py-3 text-xs tracking-[0.2em] uppercase font-bold transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Book Private Presentation</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="bg-white/10 hover:bg-white/20 text-[#FBF1E9] px-5 py-3 text-xs tracking-[0.16em] uppercase font-semibold border border-white/25 transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#FBF1E9]" />
                  <span>Download Project PDF</span>
                </button>
              </div>
            </div>

            {/* Right featured visual card */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-none overflow-hidden border-2 border-white/20 print:border-slate-400 shadow-2xl bg-black">
                <img
                  src={allImages[activeImageIndex] || project.featuredImage || project1}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between text-xs">
                  <span className="font-serif font-medium drop-shadow-md">
                    {project.location || "Maharashtra"} · {project.type}
                  </span>
                  <span className="bg-black/60 backdrop-blur-xs px-2 py-0.5 text-[10px] font-mono border border-white/20">
                    Image {activeImageIndex + 1} of {allImages.length}
                  </span>
                </div>
              </div>

              {/* Visual Thumbnail Strip */}
              {allImages.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1 print:hidden">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImageIndex(i)}
                      className={`relative w-16 h-12 shrink-0 border transition-all cursor-pointer ${
                        activeImageIndex === i ? "border-[#FBF1E9] ring-2 ring-[#6D0D12]" : "border-white/20 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* EXECUTIVE SPECIFICATIONS & METRICS GRID */}
      <section className="section-y border-b border-[#6D0D12]/15 bg-[#FAF4EE] print:bg-white print:py-4">
        <div className="container-x">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="eyebrow">EXECUTIVE BRIEF</div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#3D2822] mt-1">
              Project Parameters & Key Metrics
            </h2>
            <p className="text-xs text-[#3D2822]/70 mt-1">
              Detailed breakdown of zoning, built area, regulatory compliance, and architectural leadership.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Card 1: Typology & Area */}
            <div className="bg-white border border-[#6D0D12]/15 p-6 shadow-2xs space-y-3">
              <div className="w-10 h-10 bg-[#FBF1E9] text-[#6D0D12] flex items-center justify-center border border-[#6D0D12]/20">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif font-bold text-[#3D2822]">Scale & Configuration</h3>
              <ul className="text-xs space-y-2 text-[#3D2822]/80">
                <li className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Built-up Footprint:</span>
                  <span className="font-semibold text-[#3D2822]">{project.sqft} sq.ft</span>
                </li>
                <li className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Typology:</span>
                  <span className="font-semibold text-[#3D2822]">{project.type}</span>
                </li>
                <li className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Total Inventory:</span>
                  <span className="font-semibold text-[#3D2822]">{project.totalUnits || "Exclusive Limited Edition"}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-500">Project Status:</span>
                  <span className="font-semibold text-[#6D0D12]">{project.status}</span>
                </li>
              </ul>
            </div>

            {/* Card 2: Regulatory & Developers */}
            <div className="bg-white border border-[#6D0D12]/15 p-6 shadow-2xs space-y-3">
              <div className="w-10 h-10 bg-[#FBF1E9] text-[#6D0D12] flex items-center justify-center border border-[#6D0D12]/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif font-bold text-[#3D2822]">Governance & Delivery</h3>
              <ul className="text-xs space-y-2 text-[#3D2822]/80">
                <li className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">RERA Registration:</span>
                  <span className="font-mono font-bold text-[#6D0D12]">{project.reraNumber || "Approved / Compliant"}</span>
                </li>
                <li className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Delivery Partner:</span>
                  <span className="font-semibold text-[#3D2822]">PRO-DEV × Nawander Group</span>
                </li>
                <li className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Design Architect:</span>
                  <span className="font-semibold text-[#3D2822]">{project.architect || "PRO-DEV Architecture"}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-500">Target Handover:</span>
                  <span className="font-semibold text-[#3D2822]">{project.possessionDate || project.date || "Ready"}</span>
                </li>
              </ul>
            </div>

            {/* Card 3: Location & Access */}
            <div className="bg-white border border-[#6D0D12]/15 p-6 shadow-2xs space-y-3 sm:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 bg-[#FBF1E9] text-[#6D0D12] flex items-center justify-center border border-[#6D0D12]/20">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-serif font-bold text-[#3D2822]">Strategic Micro-Market</h3>
              <ul className="text-xs space-y-2 text-[#3D2822]/80">
                <li className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Location:</span>
                  <span className="font-semibold text-[#3D2822]">{project.location || "Maharashtra"}</span>
                </li>
                <li className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Valuation Range:</span>
                  <span className="font-semibold text-[#6D0D12]">{project.priceRange || "Available on Application"}</span>
                </li>
                <li className="flex justify-between border-b border-slate-100 pb-1">
                  <span className="text-slate-500">Investment Class:</span>
                  <span className="font-semibold text-[#3D2822]">Prime Grade-A Capital Growth</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-slate-500">GPS Navigation:</span>
                  {project.googleMapsLink ? (
                    <a
                      href={project.googleMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#6D0D12] font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      <span>Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-slate-400">Prime Corridor</span>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CORE USPs & AMENITIES MATRIX */}
      <section className="section-y border-b border-[#6D0D12]/15 print:py-4">
        <div className="container-x">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left overview */}
            <div className="lg:col-span-4 space-y-4">
              <div className="eyebrow">DEVELOPMENT HIGHLIGHTS</div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#3D2822] leading-tight">
                {project.uspTitle || "Curated USPs & Architectural Amenities"}
              </h2>
              <p className="text-xs text-[#3D2822]/80 leading-relaxed">
                {project.uspSubtext || "Engineered with purpose, sustainability, and enduring value. Every feature has been intentionally planned to maximize lifestyle, security, and capital longevity."}
              </p>

              <div className="p-4 bg-[#6D0D12]/5 border-l-3 border-[#6D0D12] space-y-1">
                <div className="text-xs font-bold text-[#6D0D12] uppercase tracking-wider">
                  {project.standardNoteTitle || "Second Brick Standard"}
                </div>
                <p className="text-[11px] text-[#3D2822]/70 leading-relaxed">
                  {project.standardNoteDesc || "Every residential & commercial blueprint adheres to strict structural integrity, rainwater harvesting, and smart energy optimization guidelines."}
                </p>
              </div>
            </div>

            {/* Right USPs Grid */}
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
              {(project.uspItems && project.uspItems.length > 0
                ? project.uspItems
                : uspsToDisplay.map((u) => ({ title: u, desc: "Integrated into baseline development specifications with zero compromises on delivery." }))
              ).map((uspItem, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#6D0D12]/15 p-4.5 flex items-start gap-3.5 shadow-2xs hover:border-[#6D0D12]/40 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-[#6D0D12]/10 text-[#6D0D12] shrink-0 flex items-center justify-center mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#3D2822] font-serif leading-snug">{uspItem.title}</div>
                    {uspItem.desc && (
                      <div className="text-[11px] text-[#3D2822]/60 mt-1 leading-relaxed">
                        {uspItem.desc}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STRATEGIC CONNECTIVITY & LOCATION */}
      <section className="section-y bg-[#FAF4EE] border-b border-[#6D0D12]/15 print:bg-white print:py-4">
        <div className="container-x">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="eyebrow">LOCATION INTELLIGENCE</div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#3D2822] mt-1">
              {project.locationTitle || "Connectivity & Landmark Transit Times"}
            </h2>
            <p className="text-xs text-[#3D2822]/70 mt-1">
              {project.locationSubtext || "Effortless transit corridors connecting business hubs, coastal retreats, and transport gateways."}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(project.connectivityCards && project.connectivityCards.length > 0
              ? project.connectivityCards
              : project.connectivityPoints && project.connectivityPoints.length > 0
              ? project.connectivityPoints.map((point, idx) => ({
                  label: idx === 0 ? "Highway Access" : idx === 1 ? "Airport" : idx === 2 ? "Transit / Metro" : "Coast / Lifestyle",
                  desc: point,
                }))
              : defaultConnectivity.map((c) => ({ label: c.label, desc: c.desc }))
            ).map((item, idx) => {
              const icons = [Car, Plane, Train, Compass];
              const Icon = icons[idx % icons.length];
              return (
                <div key={idx} className="bg-white border border-[#6D0D12]/15 p-5 shadow-2xs space-y-2.5">
                  <div className="w-9 h-9 bg-[#FBF1E9] text-[#6D0D12] flex items-center justify-center border border-[#6D0D12]/20">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#6D0D12]">{item.label}</div>
                  <div className="text-xs font-medium text-[#3D2822] leading-relaxed">{item.desc}</div>
                </div>
              );
            })}
          </div>

          {project.googleMapsLink && (
            <div className="mt-8 text-center print:hidden">
              <a
                href={project.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-xs inline-flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-[#6D0D12]" />
                <span>Open in Google Maps Navigation</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* EXECUTIVE INQUIRY / PRIVATE PRESENTATION SECTION */}
      <section className="section-y bg-[#6D0D12] text-[#FBF1E9] print:hidden">
        <div className="container-x">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#FBF1E9]/70 bg-white/10 px-3 py-1 inline-block border border-white/20">
                DIRECT CONCIERGE ACCESS
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FBF1E9] leading-tight">
                Request Detailed Dossier or Schedule a Site Inspection
              </h2>
              <p className="text-xs sm:text-sm text-[#FBF1E9]/80 max-w-xl leading-relaxed">
                Connect directly with the Second Brick executive team for unit availability, floor plans, pricing schedules, and private on-site viewings.
              </p>

              <div className="flex flex-wrap gap-4 text-xs pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FBF1E9]" />
                  <span>Zero Brokerage / Direct Developer</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FBF1E9]" />
                  <span>RERA Registered & Title Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FBF1E9]" />
                  <span>Private Consultation Available</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#FBF1E9] text-[#3D2822] p-6 sm:p-8 shadow-2xl border border-white/20">
                <h3 className="text-xl font-serif font-bold text-[#3D2822]">Inquire for {project.title}</h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">Fill in your contact details for an immediate response.</p>

                {inquireSuccess ? (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                    <div className="font-serif font-bold text-base">Inquiry Registered!</div>
                    <p className="text-xs text-emerald-700">Our senior concierge team will reach out to you within 2 business hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleInquireSubmit} className="space-y-3.5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={inquireName}
                        onChange={(e) => setInquireName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-white border border-slate-300 px-3.5 py-2 text-xs focus:outline-none focus:border-[#6D0D12]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Phone / WhatsApp *</label>
                        <input
                          type="tel"
                          required
                          value={inquirePhone}
                          onChange={(e) => setInquirePhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full bg-white border border-slate-300 px-3.5 py-2 text-xs focus:outline-none focus:border-[#6D0D12]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Email Address</label>
                        <input
                          type="email"
                          value={inquireEmail}
                          onChange={(e) => setInquireEmail(e.target.value)}
                          placeholder="rahul@domain.com"
                          className="w-full bg-white border border-slate-300 px-3.5 py-2 text-xs focus:outline-none focus:border-[#6D0D12]"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#6D0D12] hover:bg-[#550a0e] text-[#FBF1E9] font-bold text-xs tracking-wider uppercase py-3 transition-colors shadow-md mt-2 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>Submit Official Inquiry</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRINT-ONLY FOOTER SIGN-OFF */}
      <div className="hidden print:block border-t-2 border-[#6D0D12] pt-4 mt-8 text-center text-[10px] text-slate-500">
        <div className="font-serif font-bold text-xs text-[#3D2822]">Second Brick Developments — PRO-DEV × Nawander Group Partnership</div>
        <div className="mt-1">Mumbai Office: Vile Parle · Alibaug Experience Centre · Pune Regional Office</div>
        <div className="text-[9px] text-slate-400 mt-1">
          Disclaimer: Visual representations, layouts, and specifications are conceptual and subject to change under developer discretion and RERA guidelines.
        </div>
      </div>

      {/* POPUP MODAL: INQUIRE / SCHEDULE VISIT */}
      {showInquireModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 print:hidden">
          <div className="bg-[#FBF1E9] border border-[#6D0D12]/20 p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#6D0D12]/10 pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#6D0D12] font-bold">EXECUTIVE CONCIERGE</span>
                <h3 className="text-xl font-serif font-bold text-[#3D2822]">Inquire for {project.title}</h3>
              </div>
              <button
                onClick={() => setShowInquireModal(false)}
                className="text-slate-400 hover:text-slate-800 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {inquireSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <div className="font-serif font-bold text-lg">Inquiry Successfully Sent</div>
                <p className="text-xs text-emerald-700">
                  Thank you! Our investment manager will contact you promptly regarding {project.title}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquireSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={inquireName}
                    onChange={(e) => setInquireName(e.target.value)}
                    placeholder="e.g. Vikram Malhotra"
                    className="w-full bg-white border border-slate-300 px-3.5 py-2 text-xs focus:outline-none focus:border-[#6D0D12]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={inquirePhone}
                      onChange={(e) => setInquirePhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-white border border-slate-300 px-3.5 py-2 text-xs focus:outline-none focus:border-[#6D0D12]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      value={inquireEmail}
                      onChange={(e) => setInquireEmail(e.target.value)}
                      placeholder="vikram@domain.com"
                      className="w-full bg-white border border-slate-300 px-3.5 py-2 text-xs focus:outline-none focus:border-[#6D0D12]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">I Am Inquiring As:</label>
                  <select
                    value={inquireType}
                    onChange={(e) => setInquireType(e.target.value)}
                    className="w-full bg-white border border-slate-300 px-3.5 py-2 text-xs focus:outline-none focus:border-[#6D0D12]"
                  >
                    <option>Private Buyer / End User</option>
                    <option>High Net-Worth Individual (HNWI) Investor</option>
                    <option>Institutional Investor / Family Office</option>
                    <option>Channel Partner / Real Estate Consultant</option>
                  </select>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowInquireModal(false)}
                    className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#6D0D12] hover:bg-[#550a0e] text-[#FBF1E9] font-bold text-xs tracking-wider uppercase px-6 py-2.5 transition-colors cursor-pointer"
                  >
                    Submit Inquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
