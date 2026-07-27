import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
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
} from "lucide-react";
import { saveBlog } from "@/lib/contentStore";

export const Route = createFileRoute("/admin/upload-insights/blog")({
  component: UploadBlog,
});

function UploadBlog() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

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

  const wordCount = description.trim() ? description.trim().split(/\s+/).length : 0;

  const handlePublish = () => {
    saveBlog({
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
    });

    alert("Blog article published successfully!");
    navigate({ to: "/admin" });
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
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Upload Insights / Blog</h1>
            <p className="text-slate-500 text-xs mt-0.5">Share knowledge and updates through blog posts.</p>
          </div>

          <button
            onClick={() => alert("Draft saved!")}
            className="inline-flex items-center gap-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <Save className="w-4 h-4 text-slate-500" />
            <span>Save as Draft</span>
          </button>
        </div>

        {/* Stepper Navigation */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-between max-w-2xl mx-auto relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
            {[
              { n: 1, label: "Blog Details" },
              { n: 2, label: "Blog Image" },
              { n: 3, label: "SEO (Optional)" },
              { n: 4, label: "Preview & Publish" },
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

          {/* STEP 4: PREVIEW & PUBLISH */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-slate-900">Step 4: Preview & Publish</h2>
                <p className="text-slate-500 text-xs mt-1">Review your article card before publishing to live website.</p>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/40 p-6">
                <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs p-5">
                  <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-slate-100">
                    <img src={featuredImage} alt={title} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-[10px] tracking-widest uppercase font-bold text-blue-600 mb-1">{cat}</div>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight mb-2">{title || "Untitled Article"}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">{excerpt || description}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 pt-3">
                    <span>By {author}</span>
                    <span>{date}</span>
                  </div>
                </div>
              </div>
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
                <span>Publish Article</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
