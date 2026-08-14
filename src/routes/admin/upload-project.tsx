import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  Globe,
  Info,
  MapPin,
  Plus,
  Save,
  Trash2,
  UploadCloud,
  Video,
  FileText,
  Eye,
  Share2,
  Layers,
  ShieldCheck,
} from "lucide-react";
import { saveProject, updateProject, getProjectById, ParameterCard, HeroSpecCard } from "@/lib/contentStore";
import { useEffect } from "react";

export const Route = createFileRoute("/admin/upload-project")({
  component: UploadProject,
});

function UploadProject() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [editId, setEditId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Ongoing");
  const [type, setType] = useState("Residential");
  const [date, setDate] = useState("2026-03-15");
  const [sqft, setSqft] = useState("2,400");
  const [location, setLocation] = useState("Alibaug, Coastal Highway");
  const [priceRange, setPriceRange] = useState("₹4.50 Cr - ₹8.20 Cr");
  const [reraNumber, setReraNumber] = useState("P51800049281");
  const [possessionDate, setPossessionDate] = useState("December 2027");
  const [totalUnits, setTotalUnits] = useState("48 Exclusive Units");
  const [architect, setArchitect] = useState("PRO-DEV Architectural Studio");

  // Top Hero 4 Quick Spec Cards (Fully Editable)
  const [heroSpecCards, setHeroSpecCards] = useState<HeroSpecCard[]>([
    { label: "Total Area", value: "2,400 sq.ft" },
    { label: "Timeline / Possession", value: "December 2027" },
    { label: "Configuration / Typology", value: "48 Exclusive Units" },
    { label: "Price / Valuation", value: "₹4.50 Cr - ₹8.20 Cr" },
  ]);

  // Step 2: Images & Overlay Text Options
  const [featuredImage, setFeaturedImage] = useState<string>("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80");
  const [imageOverlayTitle, setImageOverlayTitle] = useState("Featured Developments");
  const [imageOverlaySubtitle, setImageOverlaySubtitle] = useState("Coastal Luxury & Private Villa Estates · Alibaug");
  const [imageOverlayButtonText, setImageOverlayButtonText] = useState("Read More");
  const [galleryImages, setGalleryImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
  ]);

  // Step 3: Links
  const [websiteUrl, setWebsiteUrl] = useState("https://secondbrick.in/portfolio");
  const [brochurePdf, setBrochurePdf] = useState("Project_Brochure_2026.pdf");
  const [googleMapsLink, setGoogleMapsLink] = useState("https://maps.google.com/?q=Alibaug");
  const [virtualTourLink, setVirtualTourLink] = useState("");
  const [videoLink, setVideoLink] = useState("");

  // Executive Parameters & Key Metrics Cards States (Fully Editable Cards)
  const [parametersEyebrow, setParametersEyebrow] = useState("EXECUTIVE BRIEF");
  const [parametersTitle, setParametersTitle] = useState("Project Parameters & Key Metrics");
  const [parametersSubtext, setParametersSubtext] = useState("Detailed breakdown of zoning, built area, regulatory compliance, and architectural leadership.");
  const [parameterCards, setParameterCards] = useState<ParameterCard[]>([
    {
      id: "card-1",
      title: "Scale & Configuration",
      items: [
        { label: "Built-up Footprint", value: "2,400 sq.ft" },
        { label: "Typology", value: "Residential" },
        { label: "Total Inventory", value: "48 Exclusive Units" },
        { label: "Project Status", value: "Ongoing" },
      ],
    },
    {
      id: "card-2",
      title: "Governance & Delivery",
      items: [
        { label: "RERA Registration", value: "P51800049281" },
        { label: "Delivery Partner", value: "PRO-DEV × Nawander Group" },
        { label: "Design Architect", value: "PRO-DEV Architectural Studio" },
        { label: "Target Handover", value: "December 2027" },
      ],
    },
    {
      id: "card-3",
      title: "Strategic Micro-Market",
      items: [
        { label: "Location", value: "Alibaug, Coastal Highway" },
        { label: "Valuation Range", value: "₹4.50 Cr - ₹8.20 Cr" },
        { label: "Investment Class", value: "Prime Grade-A Capital Growth" },
        { label: "GPS Navigation", value: "Google Maps" },
      ],
    },
  ]);

  // Step 4: USPs, Standard Note & Location Intelligence States
  const [uspTitle, setUspTitle] = useState("Curated USPs & Architectural Amenities");
  const [uspSubtext, setUspSubtext] = useState("Engineered with purpose, sustainability, and enduring value. Every feature has been intentionally planned to maximize lifestyle, security, and capital longevity.");
  const [standardNoteTitle, setStandardNoteTitle] = useState("Second Brick Standard");
  const [standardNoteDesc, setStandardNoteDesc] = useState("Every residential & commercial blueprint adheres to strict structural integrity, rainwater harvesting, and smart energy optimization guidelines.");
  const [locationTitle, setLocationTitle] = useState("Connectivity & Landmark Transit Times");
  const [locationSubtext, setLocationSubtext] = useState("Effortless transit corridors connecting business hubs, coastal retreats, and transport gateways.");

  const [connectivityCards, setConnectivityCards] = useState<{ label: string; desc: string }[]>([
    { label: "Highway Access", desc: "Direct 5-minute link to arterial expressway" },
    { label: "Airport", desc: "Short transit to International Airport corridors" },
    { label: "Transit / Metro", desc: "Rapid connectivity to business & commercial districts" },
    { label: "Coast / Lifestyle", desc: "Proximate to high-end social & recreational hubs" },
  ]);

  const [usps, setUsps] = useState<string[]>([
    "Prime Strategic Micro-Market with Proven Capital Appreciation",
    "Architectural Layout Engineered for High Natural Light & Cross-Ventilation",
    "Gated Private Community with 24/7 Monitored Concierge & Security",
    "100% IGBC Sustainable Green Standards & Rainwater Harvesting",
    "Dedicated High-Speed Electric Vehicle (EV) Charging Infrastructure",
    "Comprehensive 30+ Years Proven Delivery by PRO-DEV & Nawander Group",
  ]);
  const [newUsp, setNewUsp] = useState("");

  // Post-Publish One-Pager Modal State
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdProjectId, setCreatedProjectId] = useState<string>("");
  const [createdProjectTitle, setCreatedProjectTitle] = useState<string>("");
  const [copiedLink, setCopiedLink] = useState(false);

  // Check URL parameters for edit mode
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const targetId = params.get("edit") || params.get("id");
      if (targetId) {
        const found = getProjectById(targetId);
        if (found) {
          setEditId(found.id);
          setTitle(found.title);
          setTagline(found.tagline || "");
          setDescription(found.description);
          setStatus(found.status);
          setType(found.type);
          setDate(found.date);
          setSqft(found.sqft);
          setLocation(found.location || "");
          setPriceRange(found.priceRange || "");
          setReraNumber(found.reraNumber || "");
          setPossessionDate(found.possessionDate || "");
          setTotalUnits(found.totalUnits || "");
          setArchitect(found.architect || "");
          setFeaturedImage(found.featuredImage);
          if (found.galleryImages && found.galleryImages.length > 0) {
            setGalleryImages(found.galleryImages);
          }
          setWebsiteUrl(found.websiteUrl || "");
          setBrochurePdf(found.brochurePdf || "");
          setGoogleMapsLink(found.googleMapsLink || "");
          setVirtualTourLink(found.virtualTourLink || "");
          setVideoLink(found.videoLink || "");
          if (found.heroSpecCards && Array.isArray(found.heroSpecCards) && found.heroSpecCards.length > 0) {
            setHeroSpecCards(
              found.heroSpecCards.map((c) => ({
                label: c.label || "Specification",
                value: c.value || "",
              }))
            );
          }
          if (found.parametersEyebrow) setParametersEyebrow(found.parametersEyebrow);
          if (found.parametersTitle) setParametersTitle(found.parametersTitle);
          if (found.parametersSubtext) setParametersSubtext(found.parametersSubtext);
          if (found.parameterCards && Array.isArray(found.parameterCards) && found.parameterCards.length > 0) {
            setParameterCards(
              found.parameterCards.map((c, i) => ({
                id: c.id || `card-${i}`,
                title: c.title || `Card ${i + 1}`,
                items: Array.isArray(c.items) ? c.items.map((it) => ({ label: it.label || "", value: it.value || "" })) : [],
              }))
            );
          }
          if (found.usps && found.usps.length > 0) {
            setUsps(found.usps);
          }
          if (found.uspTitle) setUspTitle(found.uspTitle);
          if (found.uspSubtext) setUspSubtext(found.uspSubtext);
          if (found.standardNoteTitle) setStandardNoteTitle(found.standardNoteTitle);
          if (found.standardNoteDesc) setStandardNoteDesc(found.standardNoteDesc);
          if (found.locationTitle) setLocationTitle(found.locationTitle);
          if (found.locationSubtext) setLocationSubtext(found.locationSubtext);
          if (found.connectivityCards && found.connectivityCards.length > 0) {
            setConnectivityCards(found.connectivityCards);
          }
        }
      }
    }
  }, []);

  const handleAddUsp = () => {
    if (newUsp.trim() && !usps.includes(newUsp.trim())) {
      setUsps([...usps, newUsp.trim()]);
      setNewUsp("");
    }
  };

  const handleRemoveUsp = (index: number) => {
    setUsps(usps.filter((_, i) => i !== index));
  };

  const handleUspChange = (index: number, newText: string) => {
    const updated = [...usps];
    updated[index] = newText;
    setUsps(updated);
  };

  const handleConnectivityChange = (index: number, field: "label" | "desc", val: string) => {
    const updated = [...connectivityCards];
    updated[index] = { ...updated[index], [field]: val };
    setConnectivityCards(updated);
  };

  const handleAddConnectivityCard = () => {
    setConnectivityCards([
      ...connectivityCards,
      { label: "New Landmark / Hub", desc: "Enter travel time or distance (e.g. 10 Mins to Gateway)" },
    ]);
  };

  const handleRemoveConnectivityCard = (index: number) => {
    setConnectivityCards(connectivityCards.filter((_, i) => i !== index));
  };

  // Parameter Cards Handlers
  const handleAddParameterCard = () => {
    setParameterCards([
      ...parameterCards,
      {
        id: `card-${Date.now()}`,
        title: `Card ${parameterCards.length + 1}`,
        items: [
          { label: "Specification Field", value: "Details" },
          { label: "Secondary Parameter", value: "Value" },
        ],
      },
    ]);
  };

  const handleRemoveParameterCard = (cardIdx: number) => {
    setParameterCards(parameterCards.filter((_, idx) => idx !== cardIdx));
  };

  const handleCardTitleChange = (cardIdx: number, newTitle: string) => {
    const updated = [...parameterCards];
    if (updated[cardIdx]) {
      updated[cardIdx] = { ...updated[cardIdx], title: newTitle };
      setParameterCards(updated);
    }
  };

  const handleAddCardItem = (cardIdx: number) => {
    const updated = [...parameterCards];
    if (updated[cardIdx]) {
      const items = updated[cardIdx].items ? [...updated[cardIdx].items] : [];
      updated[cardIdx] = {
        ...updated[cardIdx],
        items: [...items, { label: "Field Name", value: "Value" }],
      };
      setParameterCards(updated);
    }
  };

  const handleRemoveCardItem = (cardIdx: number, itemIdx: number) => {
    const updated = [...parameterCards];
    if (updated[cardIdx]) {
      const items = (updated[cardIdx].items || []).filter((_, i) => i !== itemIdx);
      updated[cardIdx] = {
        ...updated[cardIdx],
        items,
      };
      setParameterCards(updated);
    }
  };

  const handleCardItemChange = (cardIdx: number, itemIdx: number, field: "label" | "value", val: string) => {
    const updated = [...parameterCards];
    if (updated[cardIdx]) {
      const updatedItems = [...(updated[cardIdx].items || [])];
      if (updatedItems[itemIdx]) {
        updatedItems[itemIdx] = { ...updatedItems[itemIdx], [field]: val };
        updated[cardIdx] = { ...updated[cardIdx], items: updatedItems };
        setParameterCards(updated);
      }
    }
  };

  // Hero Quick Spec 4 Cards Handlers
  const handleHeroSpecChange = (index: number, field: "label" | "value", val: string) => {
    const updated = [...heroSpecCards];
    if (updated[index]) {
      updated[index] = { ...updated[index], [field]: val };
      setHeroSpecCards(updated);
    }
  };

  const handleSyncHeroSpecs = () => {
    setHeroSpecCards([
      { label: "Total Area", value: sqft ? `${sqft} sq.ft` : "2,400 sq.ft" },
      { label: "Timeline / Possession", value: possessionDate || date || "Ready" },
      { label: "Configuration / Typology", value: totalUnits || type || "Residential" },
      { label: "Price / Valuation", value: priceRange || "On Request" },
    ]);
  };

  const handleSyncCardsWithBasicInfo = () => {
    setParameterCards([
      {
        id: "card-1",
        title: "Scale & Configuration",
        items: [
          { label: "Built-up Footprint", value: sqft ? `${sqft} sq.ft` : "2,400 sq.ft" },
          { label: "Typology", value: type || "Residential" },
          { label: "Total Inventory", value: totalUnits || "48 Exclusive Units" },
          { label: "Project Status", value: status || "Ongoing" },
        ],
      },
      {
        id: "card-2",
        title: "Governance & Delivery",
        items: [
          { label: "RERA Registration", value: reraNumber || "Approved / Compliant" },
          { label: "Delivery Partner", value: "PRO-DEV × Nawander Group" },
          { label: "Design Architect", value: architect || "PRO-DEV Architectural Studio" },
          { label: "Target Handover", value: possessionDate || date || "Ready" },
        ],
      },
      {
        id: "card-3",
        title: "Strategic Micro-Market",
        items: [
          { label: "Location", value: location || "Maharashtra" },
          { label: "Valuation Range", value: priceRange || "Available on Application" },
          { label: "Investment Class", value: "Prime Grade-A Capital Growth" },
          { label: "GPS Navigation", value: googleMapsLink ? "Google Maps" : "Prime Corridor" },
        ],
      },
    ]);
  };

  const handleAddGalleryImage = () => {
    const placeholder = `https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80`;
    setGalleryImages([...galleryImages, placeholder]);
  };

  const handleRemoveGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
  };

  const handlePublish = () => {
    const projectPayload = {
      title: title || "New Real Estate Development",
      tagline: tagline || "Architectural excellence and sustainable luxury by Second Brick",
      description: description || "Premium coastal residential and infrastructure project built to high standards.",
      status,
      type,
      date,
      sqft,
      location,
      priceRange,
      reraNumber,
      possessionDate,
      totalUnits,
      architect,
      featuredImage,
      galleryImages,
      websiteUrl,
      brochurePdf,
      googleMapsLink,
      virtualTourLink,
      videoLink,
      heroSpecCards,
      parametersEyebrow,
      parametersTitle,
      parametersSubtext,
      parameterCards,
      usps,
      uspTitle,
      uspSubtext,
      standardNoteTitle,
      standardNoteDesc,
      locationTitle,
      locationSubtext,
      connectivityCards,
    };

    if (editId) {
      updateProject(editId, projectPayload);
      setCreatedProjectId(editId);
      setCreatedProjectTitle(projectPayload.title);
      setShowSuccessModal(true);
    } else {
      const newProj = saveProject(projectPayload);
      setCreatedProjectId(newProj.id);
      setCreatedProjectTitle(newProj.title);
      setShowSuccessModal(true);
    }
  };

  const handleCopyCreatedLink = () => {
    if (typeof window !== "undefined" && createdProjectId) {
      const url = `${window.location.origin}/project/${createdProjectId}`;
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Top Breadcrumb & Draft Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <button
              onClick={() => navigate({ to: "/admin" })}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 mb-2 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </button>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              {editId ? "Edit Project One-Pager" : "Upload Project"}
            </h1>
            <p className="text-slate-500 text-xs mt-0.5">
              {editId ? `Editing details for "${title || editId}" — updates the digital one-pager & brochure immediately.` : "Add a new real estate project and generate its digital one-pager."}
            </p>
          </div>

          <button
            onClick={() => alert("Draft saved locally!")}
            className="inline-flex items-center gap-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4 text-slate-500" />
            <span>Save as Draft</span>
          </button>
        </div>

        {/* Stepper Navigation */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-between max-w-3xl mx-auto relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
            {[
              { n: 1, label: "Basic Information" },
              { n: 2, label: "Images" },
              { n: 3, label: "Links" },
              { n: 4, label: "Cards & USPs" },
              { n: 5, label: "Preview & Publish" },
            ].map(({ n, label }) => {
              const isCompleted = step > n;
              const isActive = step === n;
              return (
                <div key={n} className="relative z-10 flex flex-col items-center group cursor-pointer" onClick={() => setStep(n)}>
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      isCompleted
                        ? "bg-emerald-600 text-white"
                        : isActive
                        ? "bg-[#6D0D12] text-[#FBF1E9] ring-4 ring-[#6D0D12]/20"
                        : "bg-slate-100 text-slate-400 border border-slate-300"
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : n}
                  </div>
                  <span
                    className={`text-[11px] font-medium mt-2 hidden md:inline-block ${
                      isActive ? "text-[#6D0D12] font-bold" : "text-slate-500"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP CONTENT CARDS */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
          {/* STEP 1: BASIC INFORMATION */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-slate-900">Step 1: Basic Information & Executive Parameters</h2>
                <p className="text-slate-500 text-xs mt-1">Fill in the core parameters required to generate your project's digital one-pager & brochure.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Project Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Coastal Solitude Villas"
                    className="w-full bg-slate-50/50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Project Tagline / One-Line Hook</label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="e.g. Ultra-Luxury Ocean-Facing Estates With Private Boardwalks"
                    className="w-full bg-slate-50/50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Project Status *</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-slate-50/50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white"
                  >
                    <option value="Upcoming">Upcoming</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Project Type *</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-slate-50/50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Luxury Villa">Luxury Villa</option>
                    <option value="Township">Township</option>
                    <option value="Plotted Development">Plotted Development</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Executive Project Description *</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide executive summary detailing architectural philosophy, target audience, and scale."
                    className="w-full bg-slate-50/50 border border-slate-300 rounded-lg p-4 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white resize-y"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Square Footage (sq.ft) *</label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={sqft}
                      onChange={(e) => setSqft(e.target.value)}
                      placeholder="e.g. 3,800"
                      className="w-full bg-slate-50/50 border border-slate-300 rounded-lg pl-4 pr-16 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                    <span className="absolute right-3 text-xs text-slate-400 font-medium pointer-events-none">sq.ft</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Location / Micro-Market *</label>
                  <div className="relative flex items-center">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Alibaug, Coastal Highway"
                      className="w-full bg-slate-50/50 border border-slate-300 rounded-lg pl-9 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Price Range / Valuation (Optional)</label>
                  <input
                    type="text"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    placeholder="e.g. ₹5.50 Cr - ₹12.00 Cr"
                    className="w-full bg-slate-50/50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">RERA Registration No. (Optional)</label>
                  <input
                    type="text"
                    value={reraNumber}
                    onChange={(e) => setReraNumber(e.target.value)}
                    placeholder="e.g. P51800049281"
                    className="w-full bg-slate-50/50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs font-mono text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Possession / Completion Timeline</label>
                  <input
                    type="text"
                    value={possessionDate}
                    onChange={(e) => setPossessionDate(e.target.value)}
                    placeholder="e.g. December 2027"
                    className="w-full bg-slate-50/50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Typology / Units Inventory</label>
                  <input
                    type="text"
                    value={totalUnits}
                    onChange={(e) => setTotalUnits(e.target.value)}
                    placeholder="e.g. 24 Exclusive Villas"
                    className="w-full bg-slate-50/50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>
              </div>

              {/* Hero Header 4 Quick Spec Cards (Top 4 Highlight Cards in Hero Banner) */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4 pt-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#6D0D12]" />
                      <span>Hero Header 4 Quick Spec Cards (Editable)</span>
                    </h3>
                    <p className="text-slate-500 text-xs mt-0.5">
                      These 4 cards appear directly in the project hero banner under the title. Rename the labels and change values as desired.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleSyncHeroSpecs}
                    className="text-[11px] font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Sync with Inputs Above
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {heroSpecCards.map((spec, idx) => (
                    <div key={idx} className="bg-white border-2 border-slate-200 hover:border-[#6D0D12]/40 p-3.5 rounded-xl space-y-2 shadow-2xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#6D0D12]/10 text-[#6D0D12] px-2 py-0.5 rounded">
                        Hero Card {idx + 1}
                      </span>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-500 mb-0.5">Card Label</label>
                        <input
                          type="text"
                          value={spec.label || ""}
                          onChange={(e) => handleHeroSpecChange(idx, "label", e.target.value)}
                          placeholder="e.g. Total Area"
                          className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-800 font-semibold focus:outline-none focus:border-blue-600 focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-500 mb-0.5">Card Value</label>
                        <input
                          type="text"
                          value={spec.value || ""}
                          onChange={(e) => handleHeroSpecChange(idx, "value", e.target.value)}
                          placeholder="e.g. 2,400 sq.ft"
                          className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-900 font-bold focus:outline-none focus:border-blue-600 focus:bg-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: IMAGES */}
          {step === 2 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-base font-bold text-slate-900">Step 2: Images</h2>
                <p className="text-slate-500 text-xs mt-1">Upload project images. You can upload multiple images for gallery.</p>
              </div>

              {/* Featured Image & Text Overlay Block */}
              <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-6 space-y-6">
                <div className="flex items-center gap-2 border-b border-slate-200/80 pb-3">
                  <Eye className="w-4 h-4 text-[#6D0D12]" />
                  <h3 className="text-sm font-bold text-slate-900">Image & Text Overlay Options</h3>
                </div>

                <div className="grid lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-7 space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Image URL / Local File *</label>
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={featuredImage}
                          onChange={(e) => setFeaturedImage(e.target.value)}
                          placeholder="Paste image URL (e.g. https://... or /src/assets/...)"
                          className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2 text-xs font-mono text-slate-800 focus:outline-none focus:border-blue-600"
                        />
                        <div className="flex items-center gap-2 pt-0.5">
                          <span className="text-[11px] text-slate-400 font-medium">— OR —</span>
                          <label className="cursor-pointer inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors">
                            <UploadCloud className="w-3.5 h-3.5 text-[#6D0D12]" />
                            <span>Choose Local Image File</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (evt) => {
                                    if (evt.target?.result) {
                                      setFeaturedImage(evt.target.result as string);
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Text Written Over Image (Main Title)</label>
                      <input
                        type="text"
                        value={imageOverlayTitle}
                        onChange={(e) => setImageOverlayTitle(e.target.value)}
                        placeholder="e.g. Featured Developments"
                        className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-xs font-serif font-bold text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle / Tag Written Over Image</label>
                      <input
                        type="text"
                        value={imageOverlaySubtitle}
                        onChange={(e) => setImageOverlaySubtitle(e.target.value)}
                        placeholder="e.g. Coastal Luxury & Private Villa Estates · Alibaug"
                        className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Button Text Written Over Image</label>
                      <input
                        type="text"
                        value={imageOverlayButtonText}
                        onChange={(e) => setImageOverlayButtonText(e.target.value)}
                        placeholder="e.g. Read More"
                        className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  {/* Live Interactive Overlay Preview Card */}
                  <div className="lg:col-span-5">
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Live Preview</label>
                    <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-slate-300 bg-slate-900 group shadow-md">
                      <img src={featuredImage} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <div className="text-[9px] uppercase tracking-widest text-white/80 font-mono">{location}</div>
                        <div className="font-serif text-sm font-bold leading-snug">{title || "Untitled Project"}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gallery Images */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Project Gallery Showcase</h3>
                  <button
                    type="button"
                    onClick={handleAddGalleryImage}
                    className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs px-3 py-1.5 rounded-lg border border-slate-300 font-medium transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Gallery Image</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {galleryImages.map((img, i) => (
                    <div key={i} className="relative aspect-video rounded-lg overflow-hidden border border-slate-200 group bg-slate-100">
                      <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryImage(i)}
                        className="absolute top-1.5 right-1.5 p-1 bg-red-600/90 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                        title="Delete image"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: LINKS */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-slate-900">Step 3: External Links & Media</h2>
                <p className="text-slate-500 text-xs mt-1">Connect your project with external resources, brochures, and maps.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Project Website URL</label>
                  <div className="relative flex items-center">
                    <Globe className="w-4 h-4 text-slate-400 absolute left-3" />
                    <input
                      type="text"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      placeholder="https://secondbrick.in/portfolio"
                      className="w-full bg-slate-50/50 border border-slate-300 rounded-lg pl-9 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Brochure Document File</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={brochurePdf}
                      onChange={(e) => setBrochurePdf(e.target.value)}
                      placeholder="e.g. Project_Executive_Brochure.pdf"
                      className="flex-1 bg-slate-50/50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Google Maps Link</label>
                  <div className="relative flex items-center">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3" />
                    <input
                      type="text"
                      value={googleMapsLink}
                      onChange={(e) => setGoogleMapsLink(e.target.value)}
                      placeholder="https://maps.google.com/?q=Alibaug"
                      className="w-full bg-slate-50/50 border border-slate-300 rounded-lg pl-9 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Virtual Tour 360° Link</label>
                  <div className="relative flex items-center">
                    <Eye className="w-4 h-4 text-slate-400 absolute left-3" />
                    <input
                      type="text"
                      value={virtualTourLink}
                      onChange={(e) => setVirtualTourLink(e.target.value)}
                      placeholder="https://my.matterport.com/show/?m=..."
                      className="w-full bg-slate-50/50 border border-slate-300 rounded-lg pl-9 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">YouTube / Video Walkthrough Link</label>
                  <div className="relative flex items-center">
                    <Video className="w-4 h-4 text-slate-400 absolute left-3" />
                    <input
                      type="text"
                      value={videoLink}
                      onChange={(e) => setVideoLink(e.target.value)}
                      placeholder="https://youtube.com/watch?v=..."
                      className="w-full bg-slate-50/50 border border-slate-300 rounded-lg pl-9 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: CARDS, PARAMETERS & USPS */}
          {step === 4 && (
            <div className="space-y-8">
              {/* Part 0A: Hero Header 4 Quick Spec Cards (Top 4 Highlight Cards in Hero Banner) */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#6D0D12]" />
                      <span>Top Hero Header 4 Quick Spec Cards (Hero Highlights)</span>
                    </h2>
                    <p className="text-slate-500 text-xs mt-0.5">
                      These 4 cards appear directly in the project hero banner under the title. Rename the labels and change values freely.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleSyncHeroSpecs}
                    className="text-[11px] font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Auto-Sync with Basic Info
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {heroSpecCards.map((spec, idx) => (
                    <div key={idx} className="bg-white border-2 border-slate-200 hover:border-[#6D0D12]/40 p-3.5 rounded-xl space-y-2 shadow-2xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#6D0D12]/10 text-[#6D0D12] px-2 py-0.5 rounded">
                        Hero Card {idx + 1}
                      </span>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-500 mb-0.5">Card Label</label>
                        <input
                          type="text"
                          value={spec.label || ""}
                          onChange={(e) => handleHeroSpecChange(idx, "label", e.target.value)}
                          placeholder="e.g. Total Area"
                          className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-800 font-semibold focus:outline-none focus:border-blue-600 focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-500 mb-0.5">Card Value</label>
                        <input
                          type="text"
                          value={spec.value || ""}
                          onChange={(e) => handleHeroSpecChange(idx, "value", e.target.value)}
                          placeholder="e.g. 2,400 sq.ft"
                          className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-900 font-bold focus:outline-none focus:border-blue-600 focus:bg-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Part 0B: Project Parameters & Key Metrics Cards (Fully Editable Cards & Content) */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#6D0D12]" />
                      <span>Project Parameters & Key Metrics Cards (Executive Brief Cards)</span>
                    </h2>
                    <p className="text-slate-500 text-xs mt-0.5">
                      Rename card titles, customize what fields appear inside each card, or add brand new cards.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSyncCardsWithBasicInfo}
                      className="text-[11px] font-medium text-slate-600 bg-white hover:bg-slate-100 border border-slate-300 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                      title="Reset / Auto-fill cards with current basic information"
                    >
                      Auto-Fill with Basic Info
                    </button>
                    <button
                      type="button"
                      onClick={handleAddParameterCard}
                      className="text-[11px] font-bold text-[#FBF1E9] bg-[#6D0D12] hover:bg-[#550a0e] px-3 py-1.5 rounded-lg inline-flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add New Card</span>
                    </button>
                  </div>
                </div>

                {/* Section Title & Subtitle */}
                <div className="grid sm:grid-cols-3 gap-3 bg-white p-3.5 rounded-lg border border-slate-200">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-600 mb-1">Section Eyebrow</label>
                    <input
                      type="text"
                      value={parametersEyebrow}
                      onChange={(e) => setParametersEyebrow(e.target.value)}
                      placeholder="EXECUTIVE BRIEF"
                      className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-600 mb-1">Section Heading</label>
                    <input
                      type="text"
                      value={parametersTitle}
                      onChange={(e) => setParametersTitle(e.target.value)}
                      placeholder="Project Parameters & Key Metrics"
                      className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-600 mb-1">Section Subtext</label>
                    <input
                      type="text"
                      value={parametersSubtext}
                      onChange={(e) => setParametersSubtext(e.target.value)}
                      placeholder="Detailed breakdown of zoning, built area..."
                      className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                {/* Parameter Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
                  {parameterCards.map((card, cardIdx) => (
                    <div
                      key={card.id || cardIdx}
                      className="bg-white border-2 border-slate-200 hover:border-[#6D0D12]/40 rounded-xl p-4 space-y-3 shadow-xs transition-all relative flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        {/* Card Header & Title Rename */}
                        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                          <span className="text-[10px] font-bold tracking-wider uppercase bg-[#6D0D12]/10 text-[#6D0D12] px-2 py-0.5 rounded">
                            Card {cardIdx + 1}
                          </span>
                          {parameterCards.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveParameterCard(cardIdx)}
                              className="text-slate-400 hover:text-red-600 p-1 rounded transition-colors cursor-pointer"
                              title="Delete this entire card"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">
                            Card Title (Rename Card)
                          </label>
                          <input
                            type="text"
                            value={card.title}
                            onChange={(e) => handleCardTitleChange(cardIdx, e.target.value)}
                            placeholder="e.g. Scale & Configuration"
                            className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                          />
                        </div>

                        {/* Fields inside the card */}
                        <div className="space-y-2 pt-1">
                          <label className="block text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                            Card Content Fields ({(card.items || []).length})
                          </label>
                          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                            {(card.items || []).map((item, itemIdx) => (
                              <div key={itemIdx} className="flex items-center gap-1.5 bg-slate-50 p-2 rounded border border-slate-200 group">
                                <div className="flex-1 space-y-1">
                                  <input
                                    type="text"
                                    value={item.label || ""}
                                    onChange={(e) => handleCardItemChange(cardIdx, itemIdx, "label", e.target.value)}
                                    placeholder="Field Label (e.g. Built-up Footprint)"
                                    className="w-full text-[11px] font-semibold text-slate-700 bg-white border border-slate-200 rounded px-1.5 py-0.5 focus:outline-none focus:border-blue-600"
                                  />
                                  <input
                                    type="text"
                                    value={item.value || ""}
                                    onChange={(e) => handleCardItemChange(cardIdx, itemIdx, "value", e.target.value)}
                                    placeholder="Field Value (e.g. 2,400 sq.ft)"
                                    className="w-full text-[11px] text-slate-900 bg-white border border-slate-200 rounded px-1.5 py-0.5 focus:outline-none focus:border-blue-600"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveCardItem(cardIdx, itemIdx)}
                                  className="text-slate-400 hover:text-red-600 p-1 opacity-60 group-hover:opacity-100 transition-all cursor-pointer"
                                  title="Delete field"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Add field button inside card */}
                      <button
                        type="button"
                        onClick={() => handleAddCardItem(cardIdx)}
                        className="mt-3 w-full py-1.5 text-center text-[11px] font-semibold text-[#6D0D12] bg-[#6D0D12]/5 hover:bg-[#6D0D12]/10 border border-[#6D0D12]/20 rounded transition-colors inline-flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Field to this Card</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Part 1: USPs & Architectural Amenities */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">Curated USPs & Architectural Amenities</h2>
                    <p className="text-slate-500 text-xs mt-0.5">Customize the section title, descriptive summary, and amenity items.</p>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#6D0D12]/10 text-[#6D0D12] px-2 py-0.5 rounded">
                    Development Highlights
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Section Title</label>
                    <input
                      type="text"
                      value={uspTitle}
                      onChange={(e) => setUspTitle(e.target.value)}
                      placeholder="Curated USPs & Architectural Amenities"
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Section Subtext</label>
                    <input
                      type="text"
                      value={uspSubtext}
                      onChange={(e) => setUspSubtext(e.target.value)}
                      placeholder="Engineered with purpose, sustainability, and enduring value..."
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                {/* Add & Edit USPs */}
                <div className="space-y-2.5 pt-2">
                  <label className="block text-xs font-bold text-slate-700">Project USPs & Highlights List</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newUsp}
                      onChange={(e) => setNewUsp(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddUsp())}
                      placeholder="Type a new USP (e.g. Infinity Lap Pool, 100% Solar Power, Dedicated Concierge)"
                      className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                    />
                    <button
                      type="button"
                      onClick={handleAddUsp}
                      className="bg-[#6D0D12] hover:bg-[#550a0e] text-[#FBF1E9] font-medium text-xs px-4 py-2 rounded-lg inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add USP</span>
                    </button>
                  </div>

                  <div className="space-y-2 pt-2">
                    {usps.map((u, i) => (
                      <div key={i} className="flex items-center gap-2 bg-white border border-slate-200 p-2 rounded-lg">
                        <span className="text-xs font-bold text-[#6D0D12] w-5 text-center">{i + 1}.</span>
                        <input
                          type="text"
                          value={u}
                          onChange={(e) => handleUspChange(i, e.target.value)}
                          className="flex-1 text-xs text-slate-800 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-600 focus:outline-none px-1 py-0.5"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveUsp(i)}
                          className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                          title="Delete USP"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Part 2: Second Brick Standard Note */}
                <div className="border-t border-slate-200/80 pt-4 space-y-3">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Second Brick Standard Note Box</h3>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-1">
                      <label className="block text-xs font-bold text-slate-700 mb-1">Badge Title</label>
                      <input
                        type="text"
                        value={standardNoteTitle}
                        onChange={(e) => setStandardNoteTitle(e.target.value)}
                        placeholder="Second Brick Standard"
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">Standard Description</label>
                      <input
                        type="text"
                        value={standardNoteDesc}
                        onChange={(e) => setStandardNoteDesc(e.target.value)}
                        placeholder="Every residential & commercial blueprint adheres to strict structural integrity..."
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Part 3: Location Intelligence & Connectivity */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">Location Intelligence & Landmark Transit Times</h2>
                    <p className="text-slate-500 text-xs mt-0.5">Edit transit titles and travel times for airports, expressways, and lifestyle hubs.</p>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                    Micro-Market Gateways
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Section Title</label>
                    <input
                      type="text"
                      value={locationTitle}
                      onChange={(e) => setLocationTitle(e.target.value)}
                      placeholder="Connectivity & Landmark Transit Times"
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Section Subtext</label>
                    <input
                      type="text"
                      value={locationSubtext}
                      onChange={(e) => setLocationSubtext(e.target.value)}
                      placeholder="Effortless transit corridors connecting business hubs, coastal retreats, and transport gateways."
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                {/* Connectivity Cards Grid Editor */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-700">Transit Gateway Cards ({connectivityCards.length})</label>
                    <button
                      type="button"
                      onClick={handleAddConnectivityCard}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#6D0D12] hover:underline cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Transit Card</span>
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {connectivityCards.map((card, i) => (
                      <div key={i} className="bg-white border border-slate-200 p-3.5 rounded-lg space-y-2 relative group">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6D0D12]">Card {i + 1}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveConnectivityCard(i)}
                            className="text-slate-400 hover:text-red-600 p-0.5 cursor-pointer"
                            title="Remove card"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-500 font-semibold mb-0.5">Gateway Label</label>
                          <input
                            type="text"
                            value={card.label}
                            onChange={(e) => handleConnectivityChange(i, "label", e.target.value)}
                            placeholder="e.g. Highway Access, Airport, Metro"
                            className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-800 font-semibold focus:outline-none focus:border-blue-600"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-500 font-semibold mb-0.5">Transit Distance / Description</label>
                          <input
                            type="text"
                            value={card.desc}
                            onChange={(e) => handleConnectivityChange(i, "desc", e.target.value)}
                            placeholder="e.g. Direct 5-minute link to arterial expressway"
                            className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: PREVIEW & ONE-PAGER GENERATION */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#6D0D12]" />
                    <span>Step 5: Executive One-Pager Live Preview & Generation</span>
                  </h2>
                  <p className="text-slate-500 text-xs mt-0.5">
                    This is the executive presentation sheet that will be automatically generated for investors, buyers, and partners.
                  </p>
                </div>
                <span className="bg-[#6D0D12]/10 text-[#6D0D12] font-bold text-[10px] uppercase px-2.5 py-1 rounded-full">
                  One-Pager Ready
                </span>
              </div>

              {/* LIVE ONE-PAGER SHEET SIMULATION */}
              <div className="border-2 border-[#6D0D12]/20 bg-[#FBF1E9] p-6 sm:p-8 space-y-6 text-[#3D2822] shadow-lg">
                {/* Header preview */}
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#6D0D12]/15 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="bg-[#6D0D12] text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider">
                        {status}
                      </span>
                      <span className="text-xs font-semibold text-[#6D0D12] uppercase tracking-wider">{type}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#3D2822] mt-1">{title || "Untitled Project"}</h3>
                    <p className="text-xs text-[#3D2822]/80 mt-1 max-w-xl italic">{tagline || description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest">RERA REGISTRATION</div>
                    <div className="text-xs font-mono font-bold text-[#6D0D12]">{reraNumber || "Approved / Compliant"}</div>
                  </div>
                </div>

                {/* Main visual & metrics grid */}
                <div className="grid md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-5 aspect-[4/3] overflow-hidden border border-[#6D0D12]/20 shadow-md">
                    <img src={featuredImage} alt={title} className="w-full h-full object-cover" />
                  </div>

                  <div className="md:col-span-7 space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {(heroSpecCards && heroSpecCards.length > 0
                        ? heroSpecCards
                        : [
                            { label: "Total Area", value: `${sqft} sq.ft` },
                            { label: "Timeline", value: possessionDate || date },
                            { label: "Location", value: location },
                            { label: "Price / Valuation", value: priceRange },
                          ]
                      ).map((c, idx) => (
                        <div key={idx} className="bg-white p-2.5 border border-[#6D0D12]/10">
                          <div className="text-[9px] uppercase text-slate-500 font-semibold">{c.label}</div>
                          <div className="font-serif font-bold text-[#3D2822] mt-0.5">{c.value}</div>
                        </div>
                      ))}
                    </div>

                    <p className="text-xs text-[#3D2822]/80 leading-relaxed pt-1 line-clamp-3">
                      {description}
                    </p>
                  </div>
                </div>

                {/* Executive Parameters Cards Preview */}
                {parameterCards && parameterCards.length > 0 && (
                  <div className="pt-4 border-t border-[#6D0D12]/15 space-y-3">
                    <div className="text-xs font-bold text-[#3D2822] uppercase tracking-wider font-serif">
                      {parametersTitle || "Project Parameters & Key Metrics"}
                    </div>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {parameterCards.map((card, i) => (
                        <div key={i} className="bg-white border border-[#6D0D12]/15 p-3 space-y-2">
                          <div className="text-[11px] font-bold text-[#6D0D12] uppercase tracking-wider font-serif">
                            {card.title}
                          </div>
                          <ul className="text-[11px] space-y-1 text-[#3D2822]/80">
                            {(card.items || []).map((it, idx) => (
                              <li key={idx} className="flex justify-between border-b border-slate-100 pb-0.5">
                                <span className="text-slate-500">{it.label}:</span>
                                <span className="font-semibold text-[#3D2822] text-right ml-1">{it.value}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* USPs Preview */}
                {usps.length > 0 && (
                  <div className="pt-4 border-t border-[#6D0D12]/15 space-y-3">
                    <div className="flex justify-between items-baseline">
                      <div className="text-xs font-bold text-[#3D2822] uppercase tracking-wider font-serif">
                        {uspTitle || "Curated USPs & Architectural Amenities"}
                      </div>
                      <span className="text-[10px] text-slate-500 italic">{standardNoteTitle}</span>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {usps.map((u, i) => (
                        <div key={i} className="bg-white border border-[#6D0D12]/15 p-2 text-xs font-medium text-[#3D2822] flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#6D0D12] shrink-0" />
                          <span>{u}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Location Intelligence Preview */}
                {connectivityCards.length > 0 && (
                  <div className="pt-4 border-t border-[#6D0D12]/15 space-y-2">
                    <div className="text-xs font-bold text-[#3D2822] uppercase tracking-wider font-serif">
                      {locationTitle || "Connectivity & Landmark Transit Times"}
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
                      {connectivityCards.map((c, i) => (
                        <div key={i} className="bg-white border border-[#6D0D12]/15 p-2.5 space-y-0.5">
                          <div className="text-[10px] font-bold text-[#6D0D12] uppercase tracking-wider">{c.label}</div>
                          <div className="text-[11px] text-[#3D2822] font-medium leading-snug">{c.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                Back
              </button>
            ) : (
              <button
                type="button"
                onClick={() => navigate({ to: "/admin" })}
                className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="bg-[#6D0D12] hover:bg-[#550a0e] text-[#FBF1E9] font-medium text-xs px-6 py-2.5 rounded-lg inline-flex items-center gap-2 transition-colors shadow-2xs cursor-pointer"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePublish}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-8 py-3 rounded-none inline-flex items-center gap-2 transition-colors shadow-md cursor-pointer uppercase tracking-wider"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Publish & Generate One-Pager</span>
              </button>
            )}
          </div>
        </div>

        {/* POST-PUBLISH SUCCESS & ONE-PAGER MODAL */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-slate-900/75 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 text-center">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200 shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h3 className="text-xl font-serif font-bold text-slate-900">Project One-Pager Generated!</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  "<span className="font-semibold text-slate-800">{createdProjectTitle}</span>" is now published and its dedicated digital one-pager is ready to share with clients & investors.
                </p>
              </div>

              {/* Action grid */}
              <div className="space-y-3 pt-2">
                <Link
                  to="/project/$id"
                  params={{ id: createdProjectId }}
                  className="w-full bg-[#6D0D12] hover:bg-[#550a0e] text-[#FBF1E9] font-bold text-xs py-3 px-4 rounded-none flex items-center justify-center gap-2 shadow-md uppercase tracking-wider"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Project One-Pager</span>
                </Link>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleCopyCreatedLink}
                    className="bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold text-xs py-2.5 px-3 rounded-none flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5 text-[#6D0D12]" />
                    <span>{copiedLink ? "Link Copied!" : "Copy Link"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      navigate({ to: "/admin" });
                    }}
                    className="bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold text-xs py-2.5 px-3 rounded-none flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
