import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ArrowLeft, CheckCircle2, Globe, Image as ImageIcon, Loader2, Sparkles, Trash2, X } from "lucide-react";
import { saveBlog } from "@/lib/contentStore";
import project1 from "@/assets/project-1.jpg";

export const Route = createFileRoute("/admin/upload-insights/article-link")({
  component: UploadArticleLink,
});

function UploadArticleLink() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageRemoved, setImageRemoved] = useState(false);
  const [sourceName, setSourceName] = useState("Economic Times Real Estate");
  const [cat, setCat] = useState("Market Updates");
  const [excerpt, setExcerpt] = useState("");
  const [date, setDate] = useState("2026-03-15");

  const [isFetchingMeta, setIsFetchingMeta] = useState(false);
  const [fetchSuccess, setFetchSuccess] = useState(false);

  const activeImage = imageRemoved ? "" : (imageUrl.trim() || project1);

  const handleFetchMetadata = async (targetUrl: string) => {
    if (!targetUrl || !targetUrl.startsWith("http")) return;
    setIsFetchingMeta(true);
    setFetchSuccess(false);

    try {
      const res = await fetch(`https://api.microlink.io?url=${encodeURIComponent(targetUrl)}`);
      const json = await res.json();

      if (json && json.status === "success" && json.data) {
        const meta = json.data;
        if (meta.title) setTitle(meta.title);
        if (meta.image?.url) {
          setImageUrl(meta.image.url);
          setImageRemoved(false);
        }
        if (meta.description) setExcerpt(meta.description);
        if (meta.publisher) setSourceName(meta.publisher);
        setFetchSuccess(true);
      }
    } catch (err) {
      console.warn("Metadata auto-fetch notice", err);
    } finally {
      setIsFetchingMeta(false);
    }
  };

  const handleUrlChange = (newUrl: string) => {
    setUrl(newUrl);
    if (newUrl.startsWith("http://") || newUrl.startsWith("https://")) {
      handleFetchMetadata(newUrl);
    }
  };

  const handleRemoveImage = () => {
    setImageUrl("");
    setImageRemoved(true);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    saveBlog({
      title: title || "External Article Highlight",
      description: excerpt || "External real estate feature and press coverage.",
      date,
      writtenBy: "Company",
      author: sourceName,
      cat,
      featuredImage: activeImage,
      excerpt: excerpt || `Read full coverage on ${sourceName}: ${url}`,
      articleUrl: url,
    });

    alert("External article link added successfully!");
    navigate({ to: "/admin" });
  };

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-4xl mx-auto">
        <div>
          <button
            onClick={() => navigate({ to: "/admin" })}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 mb-2 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Upload Insights / Article (Link)</h1>
          <p className="text-slate-500 text-xs mt-0.5">Paste an article link to automatically import title, image & excerpt.</p>
        </div>

        <form onSubmit={handlePublish} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">External Article URL *</label>
                {isFetchingMeta && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#6D0D12] font-semibold animate-pulse">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Fetching heading & cover image...</span>
                  </span>
                )}
                {fetchSuccess && !isFetchingMeta && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-bold">
                    <Sparkles className="w-3 h-3" />
                    <span>Auto-fetched title & image!</span>
                  </span>
                )}
              </div>
              <div className="relative flex items-center">
                <Globe className="w-4 h-4 text-slate-400 absolute left-3" />
                <input
                  type="url"
                  required
                  value={url}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  placeholder="Paste article link (e.g. https://economictimes.indiatimes.com/...)"
                  className="w-full bg-slate-50/50 border border-slate-300 rounded-lg pl-9 pr-24 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#6D0D12] focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => handleFetchMetadata(url)}
                  className="absolute right-1.5 bg-[#FBF1E9] hover:bg-[#6D0D12] hover:text-[#FBF1E9] text-[#6D0D12] font-bold text-[11px] px-2.5 py-1.5 rounded-md transition-colors border border-[#6D0D12]/20 flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Fetch Info</span>
                </button>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Pasting a URL will automatically extract the headline, featured photo, and publication details.
              </span>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Article Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Article title will auto-fill here when URL is pasted..."
                className="w-full bg-slate-50/50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#6D0D12] focus:bg-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Article Image URL (Optional)</label>
              <div className="relative flex items-center mb-2">
                <ImageIcon className="w-4 h-4 text-slate-400 absolute left-3" />
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    if (e.target.value.trim()) setImageRemoved(false);
                  }}
                  placeholder="Paste embedded image URL (e.g. https://images.unsplash.com/...)"
                  className="w-full bg-slate-50/50 border border-slate-300 rounded-lg pl-9 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>
              <span className="text-[10px] text-slate-400">Paste any image URL embedded in the external article.</span>
            </div>

            {/* Live Card Image Preview with Remove Option */}
            <div className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-bold text-slate-700">Article Image Preview</div>
                {activeImage ? (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-semibold bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-md border border-red-200 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove Image</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setImageRemoved(false)}
                    className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-semibold bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-md border border-blue-200 transition-colors"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Restore Default Image</span>
                  </button>
                )}
              </div>
              {activeImage ? (
                <div className="aspect-[16/9] max-w-sm rounded-lg overflow-hidden border border-slate-300 bg-slate-200 relative group">
                  <img src={activeImage} alt="Article preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full shadow-md transition-colors"
                    title="Remove Image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="aspect-[16/9] max-w-sm rounded-lg border-2 border-dashed border-slate-300 bg-slate-100 flex flex-col items-center justify-center p-6 text-center">
                  <ImageIcon className="w-8 h-8 text-slate-300 mb-2" />
                  <span className="text-xs font-semibold text-slate-500">No Image Attached</span>
                  <span className="text-[10px] text-slate-400 mt-1">This article will display on the live site in clean typography mode without an image card.</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Publication / Source Name</label>
              <input
                type="text"
                value={sourceName}
                onChange={(e) => setSourceName(e.target.value)}
                placeholder="e.g. Economic Times, Financial Express"
                className="w-full bg-slate-50/50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Category *</label>
              <select
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="w-full bg-slate-50/50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
              >
                <option value="Market Updates">Market Updates</option>
                <option value="Project News">Project News</option>
                <option value="Investment">Investment</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Short Excerpt / Headline Quote</label>
              <textarea
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Enter short quote or summary of the article..."
                className="w-full bg-slate-50/50 border border-slate-300 rounded-lg p-3 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate({ to: "/admin" })}
              className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs px-6 py-2.5 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-8 py-2.5 rounded-lg inline-flex items-center gap-2 transition-colors shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Publish Link</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

