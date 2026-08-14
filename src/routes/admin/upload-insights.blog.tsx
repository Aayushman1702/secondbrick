import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  ArrowLeft,
  ArrowRight,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Check,
  CheckCircle2,
  Save,
  UploadCloud,
  FileText,
  Eye,
  ExternalLink,
  Edit3,
  Sparkles,
  LayoutGrid,
  ArrowUpRight,
} from "lucide-react";
import { saveBlog, updateBlog, getBlogById } from "@/lib/contentStore";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/admin/upload-insights/blog")({
  component: UploadBlog,
});

function UploadBlog() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [editId, setEditId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<"onepager" | "card">("onepager");

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("2026-03-12");
  const [writtenBy, setWrittenBy] = useState<"Person" | "Company">("Person");
  const [author, setAuthor] = useState("Namrata Malu");
  const [cat, setCat] = useState("Investment");

  // Step 2: Blog Image
  const [featuredImage, setFeaturedImage] = useState<string>(
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
  );
  const [excerpt, setExcerpt] = useState("");

  // Step 3: SEO
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const editParam = params.get("edit");
      if (editParam) {
        setEditId(editParam);
        const existing = getBlogById(editParam);
        if (existing) {
          setTitle(existing.title || "");
          setDescription(existing.description || "");
          setDate(existing.date || "2026-03-12");
          setWrittenBy(existing.writtenBy || "Person");
          setAuthor(existing.author || "Namrata Malu");
          setCat(existing.cat || "Investment");
          setFeaturedImage(existing.featuredImage || "");
          setExcerpt(existing.excerpt || "");
          setSeoTitle(existing.seoTitle || "");
          setSeoDescription(existing.seoDescription || "");
          setSeoKeywords(existing.seoKeywords || "");
        }
      }
    }
  }, []);

  const wordCount = description.trim() ? description.trim().split(/\s+/).length : 0;

  const handlePublish = () => {
    const blogData = {
      title: title || "New Real Estate Insights Article",
      description: description || "Market trends and strategic guidance for coastal & residential property investors.",
      date,
      writtenBy,
      author: author || "Second Brick Editorial",
      cat,
      featuredImage,
      excerpt: excerpt || description.slice(0, 140) + "...",
      seoTitle,
      seoDescription,
      seoKeywords,
    };

    if (editId) {
      updateBlog(editId, blogData);
      alert("Blog article and One-Pager updated successfully!");
    } else {
      saveBlog(blogData);
      alert("Blog article published successfully!");
    }

    navigate({ to: "/admin" });
  };

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Top Breadcrumb & Actions */}
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
              {editId ? "Edit Blog / Insights One-Pager" : "Upload Insights / Blog"}
            </h1>
            <p className="text-slate-500 text-xs mt-0.5">
              {editId ? `Editing article: "${title || editId}"` : "Share knowledge, analysis and updates through executive blog one-pagers."}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {editId && (
              <Link
                to="/insights/$id"
                params={{ id: editId }}
                target="_blank"
                className="inline-flex items-center gap-1.5 bg-[#6D0D12] hover:bg-[#52090D] text-[#FBF1E9] text-xs font-semibold px-4 py-2 transition-colors shadow-2xs"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View One-Pager</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </Link>
            )}

            <button
              onClick={() => alert("Draft saved!")}
              className="inline-flex items-center gap-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <Save className="w-4 h-4 text-slate-500" />
              <span>Save Draft</span>
            </button>
          </div>
        </div>

        {/* Stepper Navigation */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-between max-w-2xl mx-auto relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
            {[
              { n: 1, label: "Blog Details" },
              { n: 2, label: "Blog Image" },
              { n: 3, label: "SEO (Optional)" },
              { n: 4, label: "One-Pager Preview & Edit" },
            ].map(({ n, label }) => {
              const isCompleted = step > n;
              const isActive = step === n;
              return (
                <div
                  key={n}
                  className="relative z-10 flex flex-col items-center cursor-pointer"
                  onClick={() => setStep(n)}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      isCompleted
                        ? "bg-emerald-600 text-white"
                        : isActive
                        ? "bg-blue-600 text-white ring-4 ring-blue-100"
                        : "bg-slate-100 text-slate-400 border border-slate-300"
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : n}
                  </div>
                  <span
                    className={`text-[11px] font-medium mt-2 hidden md:inline-block ${
                      isActive ? "text-blue-600 font-bold" : "text-slate-500"
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
          {/* STEP 1: BLOG DETAILS */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-slate-900">Step 1: Blog Details</h2>
                <p className="text-slate-500 text-xs mt-1">Add basic information about your blog.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Blog Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter blog title"
                    className="w-full bg-slate-50/50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Category *</label>
                  <select
                    value={cat}
                    onChange={(e) => setCat(e.target.value)}
                    className="w-full bg-slate-50/50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white"
                  >
                    <option value="Investment">Investment</option>
                    <option value="Market Updates">Market Updates</option>
                    <option value="Buying Guide">Buying Guide</option>
                    <option value="Project News">Project News</option>
                    <option value="Lifestyle">Lifestyle</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Short Excerpt (Grid Card Preview Only)
                  </label>
                  <input
                    type="text"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Enter a 1-2 sentence summary for the Insights grid card preview..."
                    className="w-full bg-slate-50/50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    This preview summary appears only on the Insights listing grid card. It will not appear on the full One-Pager reader.
                  </span>
                </div>

                {/* Rich Text Editor Block */}
                <div className="md:col-span-2 space-y-1">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Blog Description *</label>
                  <div className="border border-slate-300 rounded-lg overflow-hidden bg-white">
                    {/* Rich Text Toolbar matching screenshot */}
                    <div className="bg-slate-50 border-b border-slate-200 px-3 py-2 flex flex-wrap items-center gap-2 text-slate-600">
                      <select className="bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-700 focus:outline-none">
                        <option>Paragraph</option>
                        <option>Heading 1</option>
                        <option>Heading 2</option>
                      </select>

                      <div className="h-4 w-px bg-slate-300 mx-1" />

                      <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-700 font-bold" title="Bold">
                        <Bold className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-700 italic" title="Italic">
                        <Italic className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-700 underline" title="Underline">
                        <Underline className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-700 line-through" title="Strikethrough">
                        <Strikethrough className="w-3.5 h-3.5" />
                      </button>

                      <div className="h-4 w-px bg-slate-300 mx-1" />

                      <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-700" title="Bullet List">
                        <List className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-700" title="Numbered List">
                        <ListOrdered className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-700" title="Blockquote">
                        <Quote className="w-3.5 h-3.5" />
                      </button>

                      <div className="h-4 w-px bg-slate-300 mx-1" />

                      <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-700" title="Link">
                        <LinkIcon className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-700" title="Image">
                        <ImageIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <textarea
                      rows={6}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Write blog description here..."
                      className="w-full p-4 text-xs text-slate-800 focus:outline-none resize-y"
                    />

                    <div className="bg-slate-50 border-t border-slate-200 px-4 py-1.5 text-[10px] text-slate-400 text-right font-medium">
                      Words: {wordCount}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Blog Date *</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-50/50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700">Written By *</label>
                  <div className="flex items-center gap-6 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                      <input
                        type="radio"
                        name="writtenBy"
                        checked={writtenBy === "Person"}
                        onChange={() => setWrittenBy("Person")}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span>Person</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                      <input
                        type="radio"
                        name="writtenBy"
                        checked={writtenBy === "Company"}
                        onChange={() => setWrittenBy("Company")}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span>Company</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Author / Person Name *</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Enter author name"
                    className="w-full bg-slate-50/50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">Name of the person who wrote this blog.</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: BLOG IMAGE */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-slate-900">Step 2: Blog Image</h2>
                <p className="text-slate-500 text-xs mt-1">Upload cover image or paste an image URL, then write a short summary excerpt.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Cover Image URL</label>
                <input
                  type="url"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  placeholder="Paste image URL (e.g. https://images.unsplash.com/...)"
                  className="w-full bg-slate-50/50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 mb-2"
                />
                <span className="text-[10px] text-slate-400">Or drag and drop an image file below:</span>
              </div>

              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div className="aspect-[16/10] rounded-xl overflow-hidden border border-slate-200 bg-slate-100 relative group">
                  <img src={featuredImage} alt="Cover Preview" className="w-full h-full object-cover" />
                </div>

                <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-8 text-center cursor-pointer transition-colors flex flex-col items-center justify-center bg-slate-50/50 min-h-[200px]">
                  <UploadCloud className="w-8 h-8 text-blue-600 mb-2" />
                  <div className="text-xs font-bold text-slate-800">Click to upload blog cover image</div>
                  <div className="text-[10px] text-slate-400 mt-1">Recommended: 1200x800px (Max 5MB)</div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Short Excerpt (Summary)</label>
                <textarea
                  rows={3}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Enter 1-2 sentence preview summary for grid card display..."
                  className="w-full bg-slate-50/50 border border-slate-300 rounded-lg p-3 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>
          )}

          {/* STEP 3: SEO */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-slate-900">Step 3: SEO Optimization (Optional)</h2>
                <p className="text-slate-500 text-xs mt-1">Enhance search engine visibility for this article.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Meta Title</label>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder="Custom SEO Title"
                    className="w-full bg-slate-50/50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Meta Description</label>
                  <textarea
                    rows={3}
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    placeholder="Search engine snippet description..."
                    className="w-full bg-slate-50/50 border border-slate-300 rounded-lg p-3 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Keywords</label>
                  <input
                    type="text"
                    value={seoKeywords}
                    onChange={(e) => setSeoKeywords(e.target.value)}
                    placeholder="real estate, investment, redevelopment, luxury villas"
                    className="w-full bg-slate-50/50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: PREVIEW (ONE-PAGER & GRID CARD) & LIVE EDIT */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#6D0D12]/10 text-[#6D0D12] text-[10px] font-bold tracking-wider uppercase mb-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Live Interactive Preview</span>
                  </div>
                  <h2 className="text-base font-bold text-slate-900">Step 4: Preview & Final Polish</h2>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Toggle between the full One-Pager reader and the Insights grid card view before publishing.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Mode Switcher: One-Pager vs Grid Card */}
                  <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50">
                    <button
                      type="button"
                      onClick={() => setPreviewMode("onepager")}
                      className={`px-3 py-1.5 text-xs font-semibold rounded flex items-center gap-1.5 transition-all ${
                        previewMode === "onepager" ? "bg-white text-slate-900 shadow-xs border border-slate-200" : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5 text-[#6D0D12]" />
                      <span>One-Pager View</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewMode("card")}
                      className={`px-3 py-1.5 text-xs font-semibold rounded flex items-center gap-1.5 transition-all ${
                        previewMode === "card" ? "bg-white text-slate-900 shadow-xs border border-slate-200" : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      <LayoutGrid className="w-3.5 h-3.5 text-[#6D0D12]" />
                      <span>Grid Card View</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick in-place editor drawer */}
              <div className="bg-slate-50 border border-slate-200 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5 text-[#6D0D12]" />
                    <span>Quick Edit Live Fields (Updates in Real-Time):</span>
                  </span>
                  <span className="text-[11px] text-slate-400">Click any previous step to edit full settings</span>
                </div>
                <div className="grid sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">Headline Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Article Title..."
                      className="w-full bg-white border border-slate-300 px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 font-serif"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">Card Excerpt (Grid Only)</label>
                    <input
                      type="text"
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="Short summary for grid card..."
                      className="w-full bg-white border border-slate-300 px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 italic"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">Author Byline</label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="Author Name..."
                      className="w-full bg-white border border-slate-300 px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">Category</label>
                    <select
                      value={cat}
                      onChange={(e) => setCat(e.target.value)}
                      className="w-full bg-white border border-slate-300 px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                    >
                      <option value="Investment">Investment</option>
                      <option value="Market Updates">Market Updates</option>
                      <option value="Buying Guide">Buying Guide</option>
                      <option value="Project News">Project News</option>
                      <option value="Lifestyle">Lifestyle</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 1. FULL ONE-PAGER PREVIEW */}
              {previewMode === "onepager" && (
                <div className="border border-slate-300 shadow-md overflow-hidden bg-slate-900/5 p-3 sm:p-6">
                  <div className="bg-[#FBF1E9] text-[#3D2822] shadow-2xl overflow-y-auto max-h-[75vh] w-full border border-[#6D0D12]/20">
                    {/* Top Bar inside preview */}
                    <div className="sticky top-0 z-20 bg-[#FBF1E9]/95 backdrop-blur-xs border-b border-[#6D0D12]/15 px-4 py-3 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 font-semibold text-[#6D0D12] text-[11px] uppercase tracking-wider">
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back to Insights</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 border border-[#6D0D12]/20 text-[#6D0D12] text-[10px] uppercase font-bold tracking-wider">
                          Share
                        </span>
                        <span className="px-2 py-1 border border-[#6D0D12]/20 text-[#6D0D12] text-[10px] uppercase font-bold tracking-wider">
                          Print
                        </span>
                        <span className="px-3 py-1 bg-[#6D0D12] text-[#FBF1E9] text-[10px] uppercase font-bold tracking-wider">
                          Inquire
                        </span>
                      </div>
                    </div>

                    {/* Body inside preview */}
                    <div className="p-6 sm:p-10 space-y-8">
                      {/* Header */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-xs uppercase font-bold text-[#6D0D12] tracking-wider">
                          <span className="px-2.5 py-0.5 bg-[#6D0D12]/10 border border-[#6D0D12]/20">{cat}</span>
                          <span>·</span>
                          <span>{date}</span>
                          <span>·</span>
                          <span>{Math.max(1, Math.ceil((description.split(/\s+/).length || 1) / 180))} Min Read</span>
                        </div>

                        <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-[#3D2822] leading-tight font-medium">
                          {title || "Untitled Real Estate Insights Article"}
                        </h1>

                        {/* Author Line */}
                        <div className="flex items-center justify-between border-y border-[#6D0D12]/15 py-3 text-xs">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#6D0D12] text-[#FBF1E9] flex items-center justify-center font-serif text-sm font-bold">
                              {(author || "SB").slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-bold text-[#3D2822] uppercase tracking-wider">{author || "Second Brick Editorial"}</div>
                              <div className="text-[10px] text-cocoa/65">Second Brick Advisory & Research</div>
                            </div>
                          </div>
                          <div className="hidden sm:flex items-center">
                            <img src={logo} alt="Second Brick" className="h-7 w-auto object-contain" />
                          </div>
                        </div>
                      </div>

                      {/* Featured Image */}
                      {featuredImage && (
                        <div className="aspect-[16/9] overflow-hidden border border-[#6D0D12]/20 bg-cocoa/10">
                          <img src={featuredImage} alt="Cover Preview" className="w-full h-full object-cover" />
                        </div>
                      )}

                      {/* Article Text Content */}
                      <div className="max-w-4xl mx-auto space-y-4 pt-2 text-sm sm:text-base leading-relaxed text-[#3D2822]/90">
                        {description ? (
                          description.split("\n\n").map((para, idx) => (
                            <p key={idx} className="leading-relaxed">
                              {idx === 0 && para.length > 20 ? (
                                <>
                                  <span className="float-left text-4xl font-serif text-[#6D0D12] pr-2 font-bold leading-none select-none">
                                    {para[0]}
                                  </span>
                                  {para.slice(1)}
                                </>
                              ) : (
                                para
                              )}
                            </p>
                          ))
                        ) : (
                          <p className="text-slate-400 italic">
                            Your full article content entered in Step 1 will render here with elegant typography, paragraph breaks, and drop caps.
                          </p>
                        )}

                        <div className="pt-6 border-t border-[#6D0D12]/20 font-serif italic text-xl text-[#6D0D12]">
                          — {author || "Second Brick"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. GRID LISTING CARD PREVIEW */}
              {previewMode === "card" && (
                <div className="border border-slate-200 rounded-xl p-8 sm:p-12 bg-slate-50/60 flex flex-col items-center justify-center space-y-6">
                  <div className="text-center max-w-sm">
                    <div className="text-[10px] uppercase font-bold tracking-widest text-[#6D0D12]">
                      — Insights Grid Card Appearance
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      This is how your post will look on the main <span className="font-semibold text-slate-800">/insights</span> listing page.
                    </div>
                  </div>

                  <div className="w-full max-w-md bg-[#FBF1E9] border border-[#6D0D12]/20 p-5 shadow-sm transition-all hover:shadow-md">
                    {featuredImage && (
                      <div className="aspect-[4/3] overflow-hidden mb-5 bg-cocoa/10 relative">
                        <img
                          src={featuredImage}
                          alt={title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="eyebrow">{cat}</div>
                      <span className="inline-flex items-center gap-1 text-[10px] tracking-wider uppercase font-semibold text-brick">
                        <span>Read More</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                    <h3 className="mt-3 font-serif text-2xl text-cocoa leading-tight">
                      {title || "Untitled Real Estate Insights Article"}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {excerpt || description}
                    </p>
                    <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-cream/50">
                      <span>{author || "Second Brick Editorial"}</span>
                      <span>{date}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs px-6 py-2.5 rounded-lg transition-colors"
              >
                Back
              </button>
            ) : (
              <button
                type="button"
                onClick={() => navigate({ to: "/admin" })}
                className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs px-6 py-2.5 rounded-lg transition-colors"
              >
                Cancel
              </button>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-6 py-2.5 rounded-lg inline-flex items-center gap-2 transition-colors"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePublish}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-8 py-2.5 rounded-lg inline-flex items-center gap-2 transition-colors shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{editId ? "Update Article & One-Pager" : "Publish Article"}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
