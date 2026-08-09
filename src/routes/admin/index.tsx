import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Building2, Lightbulb, ArrowRight, FileText, CheckCircle2, Trash2, ExternalLink, Star, Image, Plus, Eye, UploadCloud, Edit } from "lucide-react";
import { getStoredProjects, getStoredBlogs, deleteProject, deleteBlog, toggleFeaturedProject, getStoredHeroSlides, saveHeroSlide, deleteHeroSlide } from "@/lib/contentStore";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [heroSlides, setHeroSlides] = useState<any[]>([]);

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

    const handleUpdate = () => {
      setProjects(getStoredProjects());
      setBlogs(getStoredBlogs());
      setHeroSlides(getStoredHeroSlides());
    };
    window.addEventListener("content_store_updated", handleUpdate);
    return () => window.removeEventListener("content_store_updated", handleUpdate);
  }, []);

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
              {blogs.map((b) => (
                <div key={b.id} className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200/60 rounded-none text-xs hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <img src={b.featuredImage} alt={b.title} className="w-12 h-10 object-cover border border-slate-200" />
                    <div>
                      <div className="font-bold text-slate-900">{b.title}</div>
                      <div className="text-slate-500 text-[11px] mt-0.5">
                        <span className="font-semibold text-purple-600">{b.cat}</span> · By {b.author} ({b.date})
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteBlog(b.id, b.title)}
                    className="inline-flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-3 py-1.5 text-xs transition-colors border border-red-200"
                    title="Delete blog post"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              ))}
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

