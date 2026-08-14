import { useState, useMemo } from "react";
import { MapPin, Search, Building2, Layers, Award, ArrowUpRight, CheckCircle2, LayoutList, LayoutGrid } from "lucide-react";
import { Link } from "@tanstack/react-router";

export interface PastProject {
  id: string;
  name: string;
  location: string;
  region: "Mumbai & Suburbs" | "Navi Mumbai" | "Thane" | "Goa";
  sqftNumber: number;
  sqftFormatted: string;
  typology: string;
  highlights: string;
}

export const PAST_EXPERIENCE_DATA: PastProject[] = [
  {
    id: "the-address",
    name: "THE ADDRESS",
    location: "Ghatkopar West, Mumbai",
    region: "Mumbai & Suburbs",
    sqftNumber: 2800000,
    sqftFormatted: "28,00,000",
    typology: "Integrated Mega Township & Luxury Residences",
    highlights: "Master-planned mega-scale development redefining central suburban Mumbai living.",
  },
  {
    id: "palm-beach-residency",
    name: "PALM BEACH RESIDENCY",
    location: "Palm Beach Road, Navi Mumbai",
    region: "Navi Mumbai",
    sqftNumber: 2400000,
    sqftFormatted: "24,00,000",
    typology: "Iconic Waterfront High-Rise Towers",
    highlights: "Landmark coastal living address along Navi Mumbai's prestigious corridor.",
  },
  {
    id: "anantam-phase-1",
    name: "ANANTAM PHASE 1",
    location: "Dona Paula, Goa",
    region: "Goa",
    sqftNumber: 500000,
    sqftFormatted: "5,00,000",
    typology: "Exclusive Coastal Luxury Enclave",
    highlights: "Sea-facing premium residences combining Goan serenity with modern architectural elegance.",
  },
  {
    id: "platina",
    name: "PLATINA",
    location: "Thane",
    region: "Thane",
    sqftNumber: 200000,
    sqftFormatted: "2,00,000",
    typology: "Contemporary Urban Residences",
    highlights: "High-connectivity urban residences engineered for modern lifestyle comfort.",
  },
  {
    id: "solitaire",
    name: "SOLITAIRE",
    location: "Thane",
    region: "Thane",
    sqftNumber: 200000,
    sqftFormatted: "2,00,000",
    typology: "Premium Residential Landmark",
    highlights: "Thoughtfully crafted residences with elevated amenities and strategic transit access.",
  },
  {
    id: "crest",
    name: "CREST",
    location: "Vile Parle East, Mumbai",
    region: "Mumbai & Suburbs",
    sqftNumber: 100000,
    sqftFormatted: "1,00,000",
    typology: "Prime Urban Redevelopment Tower",
    highlights: "Signature Western Suburbs redevelopment setting new benchmarks in construction precision.",
  },
  {
    id: "ocean-crest",
    name: "OCEAN CREST",
    location: "Bambolim, Goa",
    region: "Goa",
    sqftNumber: 84000,
    sqftFormatted: "84,000",
    typology: "Boutique Oceanview Residences",
    highlights: "Curated coastal estate overlooking Bambolim bay with bespoke lifestyle amenities.",
  },
];

const MAX_SQFT = 2800000;

export function PastExperienceLedger() {
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [unitMode, setUnitMode] = useState<"sqft" | "lakhs" | "million">("sqft");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  const regions = [
    { label: "All Regions", value: "All", count: PAST_EXPERIENCE_DATA.length },
    { label: "Mumbai & Suburbs", value: "Mumbai & Suburbs", count: 2 },
    { label: "Navi Mumbai", value: "Navi Mumbai", count: 1 },
    { label: "Thane", value: "Thane", count: 2 },
    { label: "Goa", value: "Goa", count: 2 },
  ];

  const filteredProjects = useMemo(() => {
    return PAST_EXPERIENCE_DATA.filter((p) => {
      const matchesRegion = selectedRegion === "All" || p.region === selectedRegion;
      const matchesSearch =
        searchQuery.trim() === "" ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.typology.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRegion && matchesSearch;
    });
  }, [selectedRegion, searchQuery]);

  const formatArea = (sqft: number) => {
    if (unitMode === "lakhs") {
      const lakhs = (sqft / 100000).toFixed(2).replace(/\.00$/, "");
      return `${lakhs} Lakh sq.ft.`;
    }
    if (unitMode === "million") {
      const millions = (sqft / 1000000).toFixed(2).replace(/\.00$/, "");
      return `${millions}M sq.ft.`;
    }
    return `${sqft.toLocaleString("en-IN")} sq.ft.`;
  };

  return (
    <div className="w-full space-y-12">
      {/* 1. TOP METRIC COUNTERS RIBBON */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-[#FBF1E9] border border-[#6D0D12]/20 p-6 relative overflow-hidden group hover:border-brick transition-all duration-300">
          <div className="absolute top-0 right-0 w-16 h-16 bg-brick/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
          <div className="flex items-center gap-2 text-brick mb-2">
            <Building2 className="w-4 h-4" />
            <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-brick">Total Scale</span>
          </div>
          <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cocoa tracking-tight">
            6.28M<span className="text-brick font-normal text-2xl sm:text-3xl">+</span>
          </div>
          <div className="text-xs text-muted-foreground mt-2 font-medium tracking-wide">
            62,84,000 Sq.Ft. Delivered Footprint
          </div>
        </div>

        <div className="bg-[#FBF1E9] border border-[#6D0D12]/20 p-6 relative overflow-hidden group hover:border-brick transition-all duration-300">
          <div className="absolute top-0 right-0 w-16 h-16 bg-brick/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
          <div className="flex items-center gap-2 text-brick mb-2">
            <Layers className="w-4 h-4" />
            <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-brick">Landmarks</span>
          </div>
          <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cocoa tracking-tight">
            7<span className="text-brick font-normal text-2xl sm:text-3xl">+</span>
          </div>
          <div className="text-xs text-muted-foreground mt-2 font-medium tracking-wide">
            Iconic High-Rise & Coastal Deliveries
          </div>
        </div>

        <div className="bg-[#FBF1E9] border border-[#6D0D12]/20 p-6 relative overflow-hidden group hover:border-brick transition-all duration-300">
          <div className="absolute top-0 right-0 w-16 h-16 bg-brick/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
          <div className="flex items-center gap-2 text-brick mb-2">
            <MapPin className="w-4 h-4" />
            <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-brick">Regional Footprint</span>
          </div>
          <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cocoa tracking-tight">
            4
          </div>
          <div className="text-xs text-muted-foreground mt-2 font-medium tracking-wide">
            Mumbai · Navi Mumbai · Thane · Goa
          </div>
        </div>

        <div className="bg-[#FBF1E9] border border-[#6D0D12]/20 p-6 relative overflow-hidden group hover:border-brick transition-all duration-300">
          <div className="absolute top-0 right-0 w-16 h-16 bg-brick/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
          <div className="flex items-center gap-2 text-brick mb-2">
            <Award className="w-4 h-4" />
            <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-brick">Heritage</span>
          </div>
          <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cocoa tracking-tight">
            30<span className="text-brick font-normal text-2xl sm:text-3xl">+</span>
          </div>
          <div className="text-xs text-muted-foreground mt-2 font-medium tracking-wide">
            Years of Execution Excellence
          </div>
        </div>
      </div>

      {/* 2. INTERACTIVE CONTROLS BAR (Region Filters + Search + Unit Switcher) */}
      <div className="bg-secondary/40 border border-border/80 p-4 md:p-5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Region Pills */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {regions.map((r) => {
            const isActive = selectedRegion === r.value;
            return (
              <button
                key={r.value}
                onClick={() => setSelectedRegion(r.value)}
                className={`px-3.5 py-1.5 text-[11px] tracking-[0.16em] uppercase transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "bg-brick text-cream font-bold shadow-sm"
                    : "bg-cream/80 text-cocoa/80 hover:bg-cream hover:text-brick border border-border/60"
                }`}
              >
                <span>{r.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-xs ${isActive ? "bg-cream/20 text-cream" : "bg-cocoa/10 text-cocoa/70"}`}>
                  {r.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right side controls (Search + Unit format toggle + View toggle) */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 text-cocoa/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search past project..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-cream border border-border/80 pl-8 pr-3 py-1.5 text-xs text-cocoa placeholder:text-cocoa/40 focus:outline-none focus:border-brick"
            />
          </div>

          {/* Unit Switcher */}
          <div className="flex items-center bg-cream border border-border/80 p-0.5 text-[10px] tracking-wider uppercase">
            <button
              onClick={() => setUnitMode("sqft")}
              className={`px-2.5 py-1 transition-colors cursor-pointer font-medium ${unitMode === "sqft" ? "bg-brick text-cream" : "text-cocoa/70 hover:text-brick"}`}
              title="Show exact square feet"
            >
              Sq.Ft.
            </button>
            <button
              onClick={() => setUnitMode("lakhs")}
              className={`px-2.5 py-1 transition-colors cursor-pointer font-medium ${unitMode === "lakhs" ? "bg-brick text-cream" : "text-cocoa/70 hover:text-brick"}`}
              title="Show in Indian Lakhs"
            >
              Lakhs
            </button>
            <button
              onClick={() => setUnitMode("million")}
              className={`px-2.5 py-1 transition-colors cursor-pointer font-medium ${unitMode === "million" ? "bg-brick text-cream" : "text-cocoa/70 hover:text-brick"}`}
              title="Show in Millions"
            >
              Millions
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center bg-cream border border-border/80 p-0.5">
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 transition-colors cursor-pointer ${viewMode === "table" ? "bg-brick text-cream" : "text-cocoa/60 hover:text-brick"}`}
              title="Ledger Table View"
              aria-label="Table View"
            >
              <LayoutList className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 transition-colors cursor-pointer ${viewMode === "grid" ? "bg-brick text-cream" : "text-cocoa/60 hover:text-brick"}`}
              title="Card Grid View"
              aria-label="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. MAIN DISPLAY: ARCHITECTURAL LEDGER TABLE */}
      {viewMode === "table" ? (
        <div className="border border-[#6D0D12]/20 bg-cream overflow-x-auto shadow-sm">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="bg-[#3D2822] text-cream border-b border-[#3D2822]">
                <th className="py-4 px-5 text-[10px] tracking-[0.25em] uppercase font-bold text-cream/70 w-16">
                  No.
                </th>
                <th className="py-4 px-6 text-[10px] tracking-[0.25em] uppercase font-bold text-cream">
                  Project Name & Typology
                </th>
                <th className="py-4 px-6 text-[10px] tracking-[0.25em] uppercase font-bold text-cream">
                  Location
                </th>
                <th className="py-4 px-6 text-[10px] tracking-[0.25em] uppercase font-bold text-cream text-right">
                  Area Delivered
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#6D0D12]/10">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-muted-foreground text-sm">
                    No projects found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((p, idx) => {
                  const isMega = p.sqftNumber >= 2000000;

                  return (
                    <tr
                      key={p.id}
                      className="group transition-all duration-200 hover:bg-[#FBF1E9] hover:shadow-[inset_3px_0_0_0_#6D0D12]"
                    >
                      {/* Index */}
                      <td className="py-5 px-5 font-mono text-xs text-brick font-bold opacity-80">
                        {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                      </td>

                      {/* Project Name & Typology */}
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-2">
                          <span className="font-serif text-lg md:text-xl font-bold text-cocoa group-hover:text-brick transition-colors tracking-tight">
                            {p.name}
                          </span>
                          {isMega && (
                            <span className="inline-flex items-center text-[9px] tracking-widest uppercase font-bold px-2 py-0.5 bg-brick/10 text-brick border border-brick/30">
                              Mega Project
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5 font-medium line-clamp-1">
                          {p.typology}
                        </div>
                      </td>

                      {/* Location */}
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-1.5 text-sm text-cocoa font-medium">
                          <MapPin className="w-3.5 h-3.5 text-brick shrink-0" />
                          <span>{p.location}</span>
                        </div>
                        <span className="text-[10px] tracking-wider uppercase text-cocoa/50 mt-0.5 inline-block">
                          {p.region}
                        </span>
                      </td>

                      {/* Total Area */}
                      <td className="py-5 px-6 text-right">
                        <div className="font-serif text-lg md:text-xl font-bold text-cocoa tracking-tight">
                          {formatArea(p.sqftNumber)}
                        </div>
                        <div className="text-[10px] tracking-widest uppercase text-brick font-semibold mt-0.5">
                          Completed & Delivered
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
            {/* Table Footer with Summary Total */}
            <tfoot>
              <tr className="bg-[#3D2822]/5 border-t-2 border-[#6D0D12]/30 text-cocoa">
                <td colSpan={2} className="py-4 px-6 text-xs uppercase tracking-[0.2em] font-bold text-cocoa">
                  Cumulative Track Record Total
                </td>
                <td className="py-4 px-6 text-xs text-cocoa/70 font-medium">
                  {filteredProjects.length} Landmark Deliveries Shown
                </td>
                <td className="py-4 px-6 text-right font-serif text-xl font-bold text-brick">
                  {formatArea(
                    filteredProjects.reduce((acc, curr) => acc + curr.sqftNumber, 0)
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        /* 4. ALTERNATIVE: ARCHITECTURAL GRID VIEW */
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p, idx) => {
            return (
              <div
                key={p.id}
                className="bg-[#FBF1E9] border border-[#6D0D12]/20 p-6 flex flex-col justify-between group hover:border-brick hover:shadow-md transition-all duration-300 relative"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-cocoa/60 mb-3">
                    <span className="font-mono text-brick font-bold tracking-widest">
                      #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                    <span className="text-[10px] tracking-[0.2em] uppercase px-2 py-0.5 border border-cocoa/20">
                      {p.region}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-cocoa group-hover:text-brick transition-colors">
                    {p.name}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-cocoa/80 mt-2 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-brick shrink-0" />
                    <span>{p.location}</span>
                  </div>

                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                    {p.highlights}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#6D0D12]/10 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Area Delivered</div>
                    <div className="font-serif text-xl font-bold text-cocoa mt-0.5">
                      {formatArea(p.sqftNumber)}
                    </div>
                  </div>
                  <span className="text-[10px] tracking-wider uppercase font-bold text-brick px-2 py-1 bg-brick/10">
                    Delivered
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. CREDENTIALS & INQUIRY FOOTNOTE BANNER */}
      <div className="bg-gradient-to-r from-[#3D2822] to-[#2B1B17] text-cream p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1 max-w-xl">
          <div className="flex items-center gap-2 text-cream/80 text-[10px] tracking-[0.25em] uppercase font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#FBF1E9]" />
            Institutional Quality & Proven Delivery Track Record
          </div>
          <h4 className="font-serif text-xl md:text-2xl text-cream font-bold">
            Partner With a Proven Redevelopment & Development Legacy
          </h4>
          <p className="text-xs text-cream/70 leading-relaxed">
            With over 6.28+ Million Sq.Ft. executed across high-density urban nodes and luxury coastal enclaves, Second Brick brings dependable delivery to every landmark.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/inquire"
            className="bg-cream text-brick px-5 py-3 text-xs tracking-[0.2em] uppercase font-bold hover:bg-cream/90 transition-all flex items-center gap-2"
          >
            Inquire With Leadership <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
