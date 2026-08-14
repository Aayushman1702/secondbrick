import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  Building2,
  Lightbulb,
  ArrowRight,
  FileText,
  CheckCircle2,
  Trash2,
  ExternalLink,
  Star,
  Image,
  Plus,
  Eye,
  UploadCloud,
  Edit,
  Phone,
  Mail,
  MessageSquare,
  Download,
  Check,
  Search,
  Users,
  Inbox,
} from "lucide-react";
import {
  getStoredProjects,
  getStoredBlogs,
  deleteProject,
  deleteBlog,
  toggleFeaturedProject,
  toggleFeaturedBlog,
  getStoredHeroSlides,
  saveHeroSlide,
  deleteHeroSlide,
  getStoredInquiries,
  updateInquiryStatus,
  deleteInquiry,
  InquiryItem,
} from "@/lib/contentStore";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [heroSlides, setHeroSlides] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [inquiryFilter, setInquiryFilter] = useState<"All" | "New" | "Contacted">("All");
  const [inquirySearch, setInquirySearch] = useState("");

  // Modal State for Image + Overlay Text
  const [showAddHeroModal, setShowAddHeroModal] = useState(false);
  const [newHeroImageUrl, setNewHeroImageUrl] = useState("");
  const [newHeroTitle, setNewHeroTitle] = useState("Featured Developments");
  const [newHeroSubtitle, setNewHeroSubtitle] = useState("Coastal Luxury & Private Villa Estates · Alibaug");
  const [newHeroBtnText, setNewHeroBtnText] = useState("Read More");

  useEffect(() => {
    setProjects(getStoredProjects());
    setBlogs(getStoredBlogs());
    setHeroSlides(getStoredHeroSlides());
    setInquiries(getStoredInquiries());

    const handleUpdate = () => {
      setProjects(getStoredProjects());
      setBlogs(getStoredBlogs());
      setHeroSlides(getStoredHeroSlides());
      setInquiries(getStoredInquiries());
    };
    window.addEventListener("content_store_updated", handleUpdate);
    return () => window.removeEventListener("content_store_updated", handleUpdate);
  }, []);

  const handleToggleInquiryStatus = (id: string, current: string) => {
    const nextStatus = current === "New" ? "Contacted" : "New";
    updateInquiryStatus(id, nextStatus);
  };

  const handleDeleteInquiry = (id: string, name: string) => {
    if (confirm(`Remove inquiry record from ${name}?`)) {
      deleteInquiry(id);
    }
  };

  const handleExportCSV = () => {
    if (inquiries.length === 0) {
      alert("No inquiries to export.");
      return;
    }
    const headers = ["ID", "Date", "Name", "Phone", "Email", "City", "Source", "Reference", "Message", "Status"];
    const rows = inquiries.map((inq) => [
      inq.id,
      inq.date,
      `"${(inq.name || "").replace(/"/g, '""')}"`,
      `"${inq.phone || ""}"`,
      `"${inq.email || ""}"`,
      `"${(inq.city || "").replace(/"/g, '""')}"`,
      `"${inq.source || ""}"`,
      `"${(inq.projectOrArticleTitle || "").replace(/"/g, '""')}"`,
      `"${(inq.message || "").replace(/"/g, '""')}"`,
      inq.status,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SecondBrick_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteProject = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"? This will remove it from the portfolio page.`)) {
      deleteProject(id);
    }
  };

  const handleDeleteBlog = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete article "${title}"? This will remove it from the insights page.`)) {
      deleteBlog(id);
    }
  };

  const handleDeleteHeroSlide = (id: string) => {
    if (confirm("Remove this hero banner image and its overlay text?")) {
      deleteHeroSlide(id);
    }
  };

  const handleAddHeroSlideSubmit = () => {
    if (!newHeroImageUrl.trim()) {
      alert("Please provide an image URL!");
      return;
    }
    saveHeroSlide({
      imageUrl: newHeroImageUrl.trim(),
      overlayTitle: newHeroTitle.trim() || "Featured Developments",
      overlaySubtitle: newHeroSubtitle.trim() || "Luxury Real Estate",
      overlayButtonText: newHeroBtnText.trim() || "Read More",
      overlayButtonLink: "#portfolio-list",
    });

    setNewHeroImageUrl("");
    setShowAddHeroModal(false);
    alert("Hero Image and Overlay Text saved successfully!");
  };

  const unreadInquiriesCount = (inquiries || []).filter((i) => i.status === "New").length;
  const filteredInquiries = (inquiries || []).filter((inq) => {
    if (inquiryFilter !== "All" && inq.status !== inquiryFilter) return false;
    if (inquirySearch.trim()) {
      const q = inquirySearch.toLowerCase();
      return (
        (inq.name || "").toLowerCase().includes(q) ||
        (inq.phone || "").toLowerCase().includes(q) ||
        (inq.email || "").toLowerCase().includes(q) ||
        (inq.city || "").toLowerCase().includes(q) ||
        (inq.source || "").toLowerCase().includes(q) ||
        (inq.projectOrArticleTitle || "").toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">
            Welcome back, Admin User 👋 <br />
            Manage your real estate content, hero images, and overlay text efficiently.
          </p>
        </div>

        {/* Action Cards */}
        <div>
          <h2 className="text-sm font-semibold text-slate-700 mb-4">
            What would you like to do?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1: Upload Project */}
            <div className="bg-white border border-slate-200 rounded-none p-8 text-center flex flex-col items-center shadow-2xs hover:border-[#6D0D12]/30 transition-all">
              <div className="w-16 h-16 rounded-full bg-[#FBF1E9] text-[#6D0D12] flex items-center justify-center mb-5 border border-[#6D0D12]/10">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-serif font-bold text-slate-900">Upload Project</h3>
              <p className="text-slate-500 text-xs mt-2 max-w-xs leading-relaxed">
                Add new real estate projects with details, USPs, and automatic One-Pager generation.
              </p>
              <Link
                to="/admin/upload-project"
                className="mt-6 bg-[#6D0D12] hover:bg-[#550a0e] text-[#FBF1E9] font-medium text-xs px-6 py-3 rounded-none inline-flex items-center gap-2 transition-colors shadow-2xs"
              >
                <span>Go to Upload Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 2: Upload Insights */}
            <div className="bg-white border border-slate-200 rounded-none p-8 text-center flex flex-col items-center shadow-2xs hover:border-[#6D0D12]/30 transition-all">
              <div className="w-16 h-16 rounded-full bg-[#FBF1E9] text-[#6D0D12] flex items-center justify-center mb-5 border border-[#6D0D12]/10">
                <Lightbulb className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-serif font-bold text-slate-900">Upload Insights</h3>
              <p className="text-slate-500 text-xs mt-2 max-w-xs leading-relaxed">
                Add blogs or external articles to share insights and updates.
              </p>
              <Link
                to="/admin/upload-insights/blog"
                className="mt-6 bg-[#6D0D12] hover:bg-[#550a0e] text-[#FBF1E9] font-medium text-xs px-6 py-3 rounded-none inline-flex items-center gap-2 transition-colors shadow-2xs"
              >
                <span>Go to Upload Insights</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 3: Project One-Pagers */}
            <div className="bg-[#FAF4EE] border border-[#6D0D12]/25 rounded-none p-8 text-center flex flex-col items-center shadow-2xs hover:border-[#6D0D12] transition-all">
              <div className="w-16 h-16 rounded-full bg-[#6D0D12] text-[#FBF1E9] flex items-center justify-center mb-5 shadow-sm">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-serif font-bold text-slate-900">Project One-Pagers</h3>
              <p className="text-slate-600 text-xs mt-2 max-w-xs leading-relaxed">
                Every project has an executive one-pager & digital brochure ready to view, share, or print.
              </p>
              <Link
                to="/portfolio"
                target="_blank"
                className="mt-6 bg-slate-900 hover:bg-black text-white font-medium text-xs px-6 py-3 rounded-none inline-flex items-center gap-2 transition-colors shadow-2xs"
              >
                <span>Browse All One-Pagers</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* CLIENT INQUIRIES & LEADS INBOX */}
        <div className="bg-white border border-slate-200 rounded-none p-6 space-y-5 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                  <Inbox className="w-5 h-5 text-[#6D0D12]" />
                  <span>Client Inquiries & Leads Inbox</span>
                </h3>
                {unreadInquiriesCount > 0 && (
                  <span className="px-2 py-0.5 bg-red-600 text-white text-[10px] font-bold rounded-full animate-pulse">
                    {unreadInquiriesCount} New
                  </span>
                )}
              </div>
              <p className="text-slate-500 text-xs mt-1">
                Real-time inquiries submitted from website contact forms, Project One-Pagers, Blog One-Pagers, and interest popups.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                to="/admin/leads"
                className="px-3.5 py-2 bg-[#6D0D12] hover:bg-[#52090D] text-[#FBF1E9] text-xs font-semibold rounded-none inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <span>Open Full Leads Manager</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={handleExportCSV}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-semibold rounded-none inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Export all inquiries to CSV / Excel"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV ({inquiries.length})</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics & Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/75 p-3 border border-slate-200">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setInquiryFilter("All")}
                className={`px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  inquiryFilter === "All"
                    ? "bg-[#6D0D12] text-white shadow-xs"
                    : "bg-white text-slate-600 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                All ({inquiries.length})
              </button>
              <button
                onClick={() => setInquiryFilter("New")}
                className={`px-3 py-1.5 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  inquiryFilter === "New"
                    ? "bg-red-600 text-white shadow-xs"
                    : "bg-white text-red-700 hover:bg-red-50 border border-red-200"
                }`}
              >
                <span>New / Uncontacted</span>
                <span className="px-1.5 py-0.2 bg-black/20 text-white text-[10px] rounded-full">
                  {unreadInquiriesCount}
                </span>
              </button>
              <button
                onClick={() => setInquiryFilter("Contacted")}
                className={`px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  inquiryFilter === "Contacted"
                    ? "bg-emerald-700 text-white shadow-xs"
                    : "bg-white text-emerald-800 hover:bg-emerald-50 border border-emerald-200"
                }`}
              >
                Contacted ({inquiries.filter((i) => i.status === "Contacted").length})
              </button>
            </div>

            {/* Search Box */}
            <div className="relative min-w-[220px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={inquirySearch}
                onChange={(e) => setInquirySearch(e.target.value)}
                placeholder="Search leads by name, phone, project..."
                className="w-full bg-white border border-slate-300 pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {/* Inquiries Table */}
          {filteredInquiries.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-slate-200 bg-slate-50/50">
              <Inbox className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <div className="text-xs font-bold text-slate-700">No inquiries found in this view</div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                New leads submitted by buyers across your website will appear here in real time.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto border border-slate-200">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100 text-slate-700 text-[11px] uppercase tracking-wider font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Prospect Details</th>
                    <th className="py-3 px-4">Source & Interest</th>
                    <th className="py-3 px-4">Notes / Query</th>
                    <th className="py-3 px-4">Received</th>
                    <th className="py-3 px-4 text-right">Quick Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredInquiries.map((inq) => {
                    const rawPhone = (inq.phone || "").replace(/[^0-9]/g, "");
                    const isNew = inq.status === "New";

                    return (
                      <tr
                        key={inq.id}
                        className={`hover:bg-slate-50/80 transition-colors ${
                          isNew ? "bg-red-50/30" : "bg-white"
                        }`}
                      >
                        {/* Status Toggle */}
                        <td className="py-3.5 px-4 align-top">
                          <button
                            onClick={() => handleToggleInquiryStatus(inq.id, inq.status)}
                            className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider cursor-pointer border transition-all inline-flex items-center gap-1 ${
                              isNew
                                ? "bg-red-100 text-red-800 border-red-300 hover:bg-red-200"
                                : "bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200"
                            }`}
                            title="Click to toggle status"
                          >
                            {isNew ? (
                              <>
                                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                                <span>New</span>
                              </>
                            ) : (
                              <>
                                <Check className="w-3 h-3 text-emerald-700" />
                                <span>Contacted</span>
                              </>
                            )}
                          </button>
                        </td>

                        {/* Prospect Details */}
                        <td className="py-3.5 px-4 align-top space-y-1">
                          <div className="font-bold text-slate-900 text-sm">{inq.name}</div>
                          <div className="flex flex-col gap-0.5 text-[11px] text-slate-600">
                            {inq.phone && (
                              <span className="font-mono text-slate-800 font-semibold">{inq.phone}</span>
                            )}
                            {inq.email && (
                              <span className="text-slate-500 truncate max-w-[200px]">{inq.email}</span>
                            )}
                            {inq.city && (
                              <span className="text-slate-400 italic">City: {inq.city}</span>
                            )}
                          </div>
                        </td>

                        {/* Source & Reference */}
                        <td className="py-3.5 px-4 align-top space-y-1">
                          <span className="inline-block px-2 py-0.5 bg-[#6D0D12]/10 text-[#6D0D12] font-bold text-[10px] uppercase tracking-wider border border-[#6D0D12]/20">
                            {inq.source}
                          </span>
                          {inq.projectOrArticleTitle && (
                            <div className="font-serif text-xs text-slate-800 font-semibold line-clamp-2">
                              {inq.projectOrArticleTitle}
                            </div>
                          )}
                        </td>

                        {/* Notes / Message */}
                        <td className="py-3.5 px-4 align-top max-w-xs">
                          <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                            {inq.message || "—"}
                          </p>
                        </td>

                        {/* Timestamp */}
                        <td className="py-3.5 px-4 align-top text-[11px] text-slate-500 font-mono whitespace-nowrap">
                          {inq.date}
                        </td>

                        {/* Quick Contact & Delete Actions */}
                        <td className="py-3.5 px-4 align-top text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Call */}
                            {inq.phone && (
                              <a
                                href={`tel:${rawPhone}`}
                                title={`Call ${inq.name}`}
                                className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>
                            )}

                            {/* WhatsApp */}
                            {inq.phone && (
                              <a
                                href={`https://api.whatsapp.com/send?phone=${rawPhone}&text=${encodeURIComponent(
                                  `Hello ${inq.name}, thank you for reaching out to Second Brick regarding ${
                                    inq.projectOrArticleTitle || "our real estate portfolio"
                                  }. How can we assist you?`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={`WhatsApp ${inq.name}`}
                                className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                              </a>
                            )}

                            {/* Email */}
                            {inq.email && (
                              <a
                                href={`mailto:${inq.email}?subject=${encodeURIComponent(
                                  `Second Brick Inquiry: ${inq.projectOrArticleTitle || "Real Estate Advisory"}`
                                )}`}
                                title={`Email ${inq.name}`}
                                className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-colors"
                              >
                                <Mail className="w-3.5 h-3.5" />
                              </a>
                            )}

                            {/* Delete */}
                            <button
                              onClick={() => handleDeleteInquiry(inq.id, inq.name)}
                              title="Delete inquiry"
                              className="p-1.5 bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-200 transition-colors cursor-pointer ml-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* HERO BANNER IMAGES & OVERLAY TEXT MANAGER */}
        <div className="bg-white border border-slate-200 rounded-none p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Image className="w-4 h-4 text-[#6D0D12]" />
                <span>Hero Banner Images & Overlay Text Manager</span>
              </h3>
              <p className="text-slate-400 text-xs mt-0.5">Upload hero images and specify exact titles, subtitles & button text written over each image.</p>
            </div>
            <button
              onClick={() => setShowAddHeroModal(true)}
              className="bg-[#6D0D12] text-[#FBF1E9] px-4 py-2.5 text-xs font-semibold rounded-none inline-flex items-center gap-1.5 hover:bg-[#550a0e] transition-colors shadow-2xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Image + Overlay Text</span>
            </button>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {heroSlides.map((slide) => (
              <div key={slide.id} className="relative aspect-[16/10] rounded-none overflow-hidden border border-slate-200 bg-slate-900 group shadow-2xs">
                <img src={slide.imageUrl} alt={slide.overlayTitle} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
                <button
                  onClick={() => handleDeleteHeroSlide(slide.id)}
                  className="absolute top-2 right-2 p-1.5 bg-red-600/90 text-white rounded-none opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 z-20"
                  title="Remove Slide"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <div className="absolute bottom-3 left-3 right-3 text-white z-10 space-y-0.5">
                  <div className="text-[9px] uppercase tracking-widest text-white/80 font-mono truncate">{slide.overlaySubtitle}</div>
                  <div className="font-serif text-sm font-bold leading-snug truncate">{slide.overlayTitle}</div>
                  <div className="pt-1">
                    <span className="inline-block bg-[#6D0D12] text-white px-2 py-0.5 text-[9px] uppercase font-bold tracking-wider">
                      {slide.overlayButtonText || "Read More"} ↗
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MANAGE PROJECTS & ACCESS ONE-PAGERS */}
        <div className="bg-white border border-slate-200 rounded-none p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#6D0D12]" />
                <span>Projects & Executive One-Pagers Manager</span>
              </h3>
              <p className="text-slate-500 text-xs mt-0.5">
                Every project has an executive one-pager & digital brochure ready. Click <span className="font-bold text-[#6D0D12]">"View One-Pager 📄"</span> to preview or share it with buyers.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/admin/upload-project" className="bg-[#6D0D12] text-[#FBF1E9] px-3.5 py-1.5 text-xs font-semibold rounded-none inline-flex items-center gap-1 hover:bg-[#550a0e] transition-colors shadow-2xs">
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </Link>
              <Link to="/portfolio" target="_blank" className="text-xs text-[#6D0D12] hover:underline flex items-center gap-1 font-semibold">
                <span>View Portfolio</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {projects.length === 0 ? (
            <div className="text-xs text-slate-400 py-4 text-center">
              No dynamic projects added yet. Click "Upload Project" above to create one.
            </div>
          ) : (
            <div className="space-y-2.5">
              {projects.map((p) => (
                <div key={p.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-slate-50 border border-slate-200/60 rounded-none text-xs hover:border-slate-300 transition-colors gap-3">
                  <div className="flex items-center gap-3">
                    <img src={p.featuredImage} alt={p.title} className="w-14 h-11 object-cover rounded-none border border-slate-200" />
                    <div>
                      <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        <span>{p.title}</span>
                        {p.featuredOnHomepage !== false && (
                          <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.2 rounded font-medium">Hero Featured</span>
                        )}
                      </div>
                      <div className="text-slate-500 text-[11px] mt-0.5">
                        <span className="font-semibold text-[#6D0D12]">{p.status}</span> · {p.type} · {p.location || "Maharashtra"} · {p.sqft || "N/A"} sq.ft
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    {/* View One-Pager Link */}
                    <Link
                      to="/project/$id"
                      params={{ id: p.id }}
                      target="_blank"
                      className="inline-flex items-center gap-1.5 bg-[#6D0D12] hover:bg-[#550a0e] text-[#FBF1E9] font-bold px-3 py-1.5 text-xs transition-colors shadow-2xs"
                      title="Open Executive One-Pager in new tab"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>One-Pager</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </Link>

                    {/* Edit Project One-Pager Button */}
                    <Link
                      to="/admin/upload-project"
                      search={{ edit: p.id }}
                      className="inline-flex items-center gap-1 bg-white hover:bg-slate-100 text-slate-700 font-semibold px-2.5 py-1.5 text-xs transition-colors border border-slate-300"
                      title="Edit project details and one-pager"
                    >
                      <Edit className="w-3.5 h-3.5 text-slate-500" />
                      <span>Edit</span>
                    </Link>

                    {/* Feature on homepage toggle */}
                    <button
                      onClick={() => toggleFeaturedProject(p.id)}
                      className={`p-1.5 border cursor-pointer ${p.featuredOnHomepage !== false ? "bg-[#6D0D12]/10 border-[#6D0D12]/30 text-[#6D0D12]" : "bg-white border-slate-200 text-slate-400"}`}
                      title={p.featuredOnHomepage !== false ? "Featured in Slider (Click to unfeature)" : "Click to feature in Hero slider"}
                    >
                      <Star className={`w-4 h-4 ${p.featuredOnHomepage !== false ? "fill-[#6D0D12]" : ""}`} />
                    </button>

                    {/* Delete project button */}
                    <button
                      onClick={() => handleDeleteProject(p.id, p.title)}
                      className="inline-flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-2.5 py-1.5 text-xs transition-colors border border-red-200 cursor-pointer"
                      title="Delete project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MANAGE & DELETE PUBLISHED ARTICLES / BLOGS */}
        <div className="bg-[#FFFFFF] border border-slate-200 rounded-none p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Manage Published Insights & Blogs</h3>
              <p className="text-slate-400 text-xs mt-0.5">View and delete blog posts published to the live insights page.</p>
            </div>
            <Link to="/insights" target="_blank" className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-medium">
              <span>View Insights</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {blogs.length === 0 ? (
            <div className="text-xs text-slate-400 py-4 text-center">
              No dynamic blog posts added yet. Click "Upload Insights" above to post an article.
            </div>
          ) : (
            <div className="space-y-2.5">
              {blogs.map((b) => {
                const isExternal = Boolean(b.articleUrl?.trim());
                return (
                  <div key={b.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-slate-50 border border-slate-200/60 rounded-none text-xs hover:border-slate-300 transition-colors gap-3">
                    <div className="flex items-center gap-3">
                      <img src={b.featuredImage} alt={b.title} className="w-14 h-11 object-cover border border-slate-200" />
                      <div>
                        <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                          <span>{b.title}</span>
                          {b.featuredOnHomepage !== false && (
                            <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.2 rounded font-medium flex items-center gap-1">
                              <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                              <span>Homepage Slideshow</span>
                            </span>
                          )}
                        </div>
                        <div className="text-slate-500 text-[11px] mt-0.5">
                          <span className="font-semibold text-[#6D0D12]">{b.cat}</span> · By {b.author} ({b.date})
                          {isExternal && <span className="ml-1.5 text-blue-600 font-medium">(External Link)</span>}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      {/* View One-Pager / External Link */}
                      {isExternal ? (
                        <a
                          href={b.articleUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-3 py-1.5 text-xs transition-colors border border-slate-300"
                          title="Open external article link"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Link</span>
                        </a>
                      ) : (
                        <Link
                          to="/insights/$id"
                          params={{ id: b.id }}
                          target="_blank"
                          className="inline-flex items-center gap-1.5 bg-[#6D0D12] hover:bg-[#550a0e] text-[#FBF1E9] font-bold px-3 py-1.5 text-xs transition-colors shadow-2xs"
                          title="Open Executive One-Pager in new tab"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>One-Pager</span>
                          <ExternalLink className="w-3 h-3 opacity-70" />
                        </Link>
                      )}

                      {/* Edit Blog / One-Pager */}
                      {!isExternal && (
                        <Link
                          to="/admin/upload-insights/blog"
                          search={{ edit: b.id }}
                          className="inline-flex items-center gap-1 bg-white hover:bg-slate-100 text-slate-700 font-semibold px-2.5 py-1.5 text-xs transition-colors border border-slate-300"
                          title="Edit blog post & One-Pager"
                        >
                          <Edit className="w-3.5 h-3.5 text-slate-500" />
                          <span>Edit</span>
                        </Link>
                      )}

                      {/* Feature on homepage slideshow toggle */}
                      <button
                        onClick={() => toggleFeaturedBlog(b.id)}
                        className={`p-1.5 border cursor-pointer transition-colors ${
                          b.featuredOnHomepage !== false
                            ? "bg-amber-50 border-amber-300 text-amber-600"
                            : "bg-white border-slate-200 text-slate-300 hover:text-amber-500 hover:border-amber-200"
                        }`}
                        title={
                          b.featuredOnHomepage !== false
                            ? "Featured in Homepage Slideshow (Click to unfeature)"
                            : "Click star to feature on Homepage Slideshow"
                        }
                      >
                        <Star className={`w-4 h-4 ${b.featuredOnHomepage !== false ? "fill-amber-500 text-amber-500" : ""}`} />
                      </button>

                      {/* Delete button */}
                      <button
                        onClick={() => handleDeleteBlog(b.id, b.title)}
                        className="inline-flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-2.5 py-1.5 text-xs transition-colors border border-red-200 cursor-pointer"
                        title="Delete blog post"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* MODAL: ADD HERO IMAGE + OVERLAY TEXT */}
      {showAddHeroModal && (
        <div className="fixed inset-0 bg-slate-900/65 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 p-6 sm:p-8 max-w-xl w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Add New Image + Overlay Text</h3>
              <button onClick={() => setShowAddHeroModal(false)} className="text-slate-400 hover:text-slate-700 text-sm font-bold">✕</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Image URL / Local File *</label>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={newHeroImageUrl}
                    onChange={(e) => setNewHeroImageUrl(e.target.value)}
                    placeholder="Paste image URL (e.g. https://...)"
                    className="w-full bg-slate-50 border border-slate-300 px-3.5 py-2 text-xs font-mono text-slate-800 focus:outline-none focus:border-blue-600"
                  />
                  <div className="flex items-center gap-2 pt-0.5">
                    <span className="text-[11px] text-slate-400 font-medium">— OR —</span>
                    <label className="cursor-pointer inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 px-3 py-1.5 rounded-none text-xs font-semibold transition-colors">
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
                                setNewHeroImageUrl(evt.target.result as string);
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
                <label className="block text-xs font-bold text-slate-700 mb-1">Main Text Written Over Image (Title) *</label>
                <input
                  type="text"
                  value={newHeroTitle}
                  onChange={(e) => setNewHeroTitle(e.target.value)}
                  placeholder="e.g. Featured Developments"
                  className="w-full bg-slate-50 border border-slate-300 px-3.5 py-2 text-xs font-serif font-bold text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle / Location Tag Written Over Image</label>
                <input
                  type="text"
                  value={newHeroSubtitle}
                  onChange={(e) => setNewHeroSubtitle(e.target.value)}
                  placeholder="e.g. Coastal Luxury & Private Villa Estates · Alibaug"
                  className="w-full bg-slate-50 border border-slate-300 px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Button Text Written Over Image</label>
                <input
                  type="text"
                  value={newHeroBtnText}
                  onChange={(e) => setNewHeroBtnText(e.target.value)}
                  placeholder="e.g. Read More"
                  className="w-full bg-slate-50 border border-slate-300 px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* Live Preview */}
              {newHeroImageUrl && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Live Image + Overlay Text Preview</label>
                  <div className="relative aspect-[16/9] w-full rounded-none overflow-hidden bg-slate-900 border border-slate-300">
                    <img src={newHeroImageUrl} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
                    <div className="absolute bottom-4 left-4 right-4 text-white z-10 space-y-1">
                      <div className="text-[9px] uppercase tracking-widest text-white/80 font-mono">{newHeroSubtitle || "Subtitle / Tag"}</div>
                      <div className="font-serif text-lg font-bold text-white">{newHeroTitle || "Main Title"}</div>
                      <div className="pt-1">
                        <span className="inline-block bg-[#6D0D12] text-white px-3 py-1 text-[10px] uppercase font-bold">
                          {newHeroBtnText || "Read More"} ↗
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowAddHeroModal(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                onClick={handleAddHeroSlideSubmit}
                className="bg-[#6D0D12] text-cream px-5 py-2 text-xs font-semibold rounded-none hover:bg-[#550a0e]"
              >
                Save Image + Overlay Text
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

