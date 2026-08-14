import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Bookmark,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  PhoneCall,
  Printer,
  Quote,
  Share2,
  Sparkles,
  User,
  Copy,
  X,
} from "lucide-react";
import { getBlogById, getStoredBlogs, BlogItem, isAdminAuthenticated, saveInquiry } from "@/lib/contentStore";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import logo from "@/assets/logo.png";
import prodevLogo from "@/assets/logo-prodev-full.png";
import nawanderLogo from "@/assets/logo-nawander.png";

export const Route = createFileRoute("/insights_/$id")({
  head: () => ({
    meta: [
      { title: "Executive Insights One-Pager — Second Brick" },
      { name: "description", content: "Executive real estate insights and market analysis by Second Brick (PRO-DEV × Nawander Group)." },
      { property: "og:title", content: "Executive Insights One-Pager — Second Brick" },
      { property: "og:description", content: "Decades of collective experience across residential, commercial and infrastructure development." },
    ],
  }),
  component: BlogOnePager,
});

function BlogOnePager() {
  const { id } = useParams({ from: "/insights_/$id" });
  const [blog, setBlog] = useState<BlogItem | null>(() => {
    return getBlogById(id) || getStoredBlogs()[0] || null;
  });
  const [copiedLink, setCopiedLink] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showInquireModal, setShowInquireModal] = useState(false);
  const [inquireSuccess, setInquireSuccess] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  // Inquire form state
  const [inquireName, setInquireName] = useState("");
  const [inquirePhone, setInquirePhone] = useState("");
  const [inquireEmail, setInquireEmail] = useState("");
  const [inquireMessage, setInquireMessage] = useState("");

  useEffect(() => {
    setIsAuthed(isAdminAuthenticated());
    const loadBlog = () => {
      const found = getBlogById(id);
      if (found) {
        setBlog(found);
      } else {
        const all = getStoredBlogs();
        if (all.length > 0) {
          setBlog(all[0]);
        }
      }
    };

    loadBlog();
    window.addEventListener("content_store_updated", loadBlog);
    return () => window.removeEventListener("content_store_updated", loadBlog);
  }, [id]);

  if (!blog) {
    const fallback = getStoredBlogs()[0];
    if (fallback) {
      setBlog(fallback);
    }
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <FileText className="w-12 h-12 text-[#6D0D12]/40 animate-pulse mb-4" />
        <h2 className="text-xl font-serif font-bold text-slate-800">Loading Article One-Pager...</h2>
        <p className="text-slate-500 text-xs mt-1">Retrieving official real estate insights & editorial.</p>
        <Link to="/insights" className="btn-primary mt-6 text-xs">
          Browse Insights
        </Link>
      </div>
    );
  }

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

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleInquireSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquireName.trim() || !inquirePhone.trim()) {
      alert("Please provide your name and contact phone number.");
      return;
    }
    setInquireSuccess(true);
    saveInquiry({
      name: inquireName.trim(),
      phone: inquirePhone.trim(),
      email: inquireEmail.trim(),
      message: inquireMessage.trim(),
      source: "Blog One-Pager",
      projectOrArticleTitle: blog.title,
    });
    setTimeout(() => {
      setShowInquireModal(false);
      setInquireSuccess(false);
      setInquireName("");
      setInquirePhone("");
      setInquireEmail("");
      setInquireMessage("");
    }, 2800);
  };

  // Estimate read time
  const wordCount = (blog.description || "").split(/\s+/).length;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 180));

  // Author initials
  const authorInitials = (blog.author || "Second Brick")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Related posts
  const otherPosts = getStoredBlogs().filter((b) => b.id !== blog.id).slice(0, 3);

  return (
    <div className="bg-[#FBF1E9] min-h-screen text-[#3D2822] selection:bg-[#6D0D12] selection:text-[#FBF1E9]">
      {/* 1. TOP EXECUTIVE ACTION BAR (STICKY) */}
      <nav className="sticky top-0 z-40 bg-[#FBF1E9]/90 backdrop-blur-md border-b border-[#6D0D12]/15 px-4 sm:px-8 py-3.5 transition-all print:hidden">
        <div className="container-x flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/insights"
              className="inline-flex items-center gap-1.5 text-xs tracking-wider uppercase font-semibold text-[#6D0D12] hover:text-[#3D2822] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Insights</span>
            </Link>
            <span className="hidden sm:inline text-cocoa/30">|</span>
            <span className="hidden sm:inline text-xs font-serif italic text-cocoa/70 truncate max-w-[280px]">
              {blog.title}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleShare}
              title="Share article or copy link"
              className="p-2 sm:px-3 sm:py-1.5 rounded-none border border-[#6D0D12]/20 hover:border-[#6D0D12] bg-[#FBF1E9] text-[#6D0D12] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Share</span>
            </button>

            <button
              onClick={handlePrint}
              title="Print / Save Article One-Pager as PDF"
              className="p-2 sm:px-3 sm:py-1.5 rounded-none border border-[#6D0D12]/20 hover:border-[#6D0D12] bg-[#FBF1E9] text-[#6D0D12] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Print One-Pager</span>
            </button>

            <button
              onClick={() => setShowInquireModal(true)}
              className="px-4 py-1.5 rounded-none bg-[#6D0D12] hover:bg-[#52090D] text-[#FBF1E9] text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ask a Question</span>
            </button>
          </div>
        </div>
      </nav>

      {/* 2. ARTICLE HERO & BYLINE */}
      <main className="container-x max-w-5xl py-10 sm:py-16 space-y-10 sm:space-y-12">
        {/* Header Content */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs tracking-wider uppercase text-cocoa/75">
            <span className="px-2.5 py-1 bg-[#6D0D12] text-[#FBF1E9] font-bold tracking-widest text-[10px]">
              {blog.cat || "Insights"}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#6D0D12]" />
              <span>{blog.date}</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#6D0D12]" />
              <span>{readTimeMinutes} Min Read</span>
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#3D2822] leading-[1.12] tracking-tight font-medium">
            {blog.title}
          </h1>

          {/* Author Byline Block */}
          <div className="pt-4 flex items-center justify-between border-y border-[#6D0D12]/15 py-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#6D0D12] text-[#FBF1E9] flex items-center justify-center font-serif text-base font-bold tracking-tight shadow-sm">
                {authorInitials}
              </div>
              <div>
                <div className="text-xs tracking-wider uppercase font-bold text-[#3D2822]">
                  {blog.author}
                </div>
                <div className="text-[11px] text-cocoa/65">
                  {blog.writtenBy === "Company" ? "Second Brick Advisory & Research" : "Second Brick Leadership Series"}
                </div>
              </div>
            </div>

            <div className="hidden sm:flex items-center">
              <img src={logo} alt="Second Brick" className="h-8 w-auto object-contain" />
            </div>
          </div>
        </section>

        {/* 3. HERO FEATURED IMAGE */}
        {blog.featuredImage && (
          <section className="space-y-2">
            <div className="aspect-[16/9] sm:aspect-[21/10] overflow-hidden rounded-none border border-[#6D0D12]/20 bg-cocoa/5 relative shadow-sm">
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cocoa/30 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="flex items-center justify-between text-[11px] text-cocoa/60 px-1 pt-1 italic">
              <span>Second Brick Executive Insights Series · {blog.cat}</span>
              <span>Official Editorial Release</span>
            </div>
          </section>
        )}

        {/* 4. ARTICLE BODY CONTENT */}
        <section className="max-w-4xl mx-auto pt-4 space-y-8">
          <div className="prose prose-stone max-w-none text-[#3D2822] text-base sm:text-lg leading-relaxed space-y-6">
            {blog.description ? (
              blog.description.split("\n\n").map((para, idx) => (
                <p key={idx} className="leading-relaxed text-[#3D2822]/90">
                  {idx === 0 && para.length > 20 ? (
                    <>
                      <span className="float-left text-5xl font-serif text-[#6D0D12] pr-3 pt-1 font-bold leading-none select-none">
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
              <p className="text-[#3D2822]/90">
                Comprehensive insights and strategic perspectives from Second Brick's leadership team.
              </p>
            )}
          </div>

          {/* Editorial Signature */}
          <div className="pt-8 border-t border-[#6D0D12]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="font-serif text-2xl text-[#6D0D12] italic">— {blog.author}</div>
              <div className="text-xs text-cocoa/70 mt-0.5">Published under Second Brick Advisory Council</div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6D0D12] hover:bg-[#52090D] text-[#FBF1E9] text-xs uppercase tracking-wider font-semibold transition-all shadow-xs cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Article</span>
              </button>
            </div>
          </div>
        </section>

        {/* 5. RELATED INSIGHTS CARDS */}
        {otherPosts.length > 0 && (
          <section className="pt-12 border-t border-[#6D0D12]/20 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] tracking-[0.35em] uppercase text-[#6D0D12] font-bold">— Continue Reading</div>
                <h2 className="font-serif text-3xl text-[#3D2822]">Related Insights</h2>
              </div>
              <Link to="/insights" className="text-xs font-semibold tracking-wider uppercase text-[#6D0D12] hover:underline inline-flex items-center gap-1">
                <span>View All Insights</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {otherPosts.map((post) => (
                <Link
                  key={post.id}
                  to="/insights/$id"
                  params={{ id: post.id }}
                  className="group block bg-[#F8EDE3] border border-[#6D0D12]/15 p-4 transition-all hover:border-[#6D0D12]/50 hover:shadow-md"
                >
                  <div className="aspect-[16/10] overflow-hidden mb-3 bg-cocoa/10">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#6D0D12] mb-1">{post.cat}</div>
                  <h4 className="font-serif text-base text-[#3D2822] line-clamp-2 leading-snug group-hover:text-[#6D0D12] transition-colors">
                    {post.title}
                  </h4>
                  <div className="mt-3 text-[11px] text-cocoa/60 flex items-center justify-between pt-2 border-t border-[#6D0D12]/10">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* MODAL: SHARE ARTICLE */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#FBF1E9] border border-[#6D0D12]/30 max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-cocoa/60 hover:text-cocoa transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#6D0D12]">
                — Share Article One-Pager
              </div>
              <h3 className="font-serif text-2xl text-[#3D2822] leading-tight">
                {blog.title}
              </h3>
            </div>

            {/* Social Share Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {/* WhatsApp */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `*${blog.title}*\n\nRead the full executive insight on Second Brick:\n${typeof window !== "undefined" ? window.location.href : ""}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#075e54] text-xs font-bold transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-[#25D366] text-white flex items-center justify-center font-bold text-xs">
                  W
                </div>
                <span>WhatsApp</span>
              </a>

              {/* LinkedIn */}
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.href : ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 bg-[#0077B5]/10 hover:bg-[#0077B5]/20 border border-[#0077B5]/30 text-[#0077B5] text-xs font-bold transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-[#0077B5] text-white flex items-center justify-center font-bold text-xs">
                  in
                </div>
                <span>LinkedIn</span>
              </a>

              {/* X / Twitter */}
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `${blog.title} — via @SecondBrick`
                )}&url=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.href : ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 bg-black/5 hover:bg-black/10 border border-black/20 text-[#111] text-xs font-bold transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">
                  𝕏
                </div>
                <span>X (Twitter)</span>
              </a>

              {/* Email */}
              <a
                href={`mailto:?subject=${encodeURIComponent(
                  `${blog.title} — Second Brick Executive Insights`
                )}&body=${encodeURIComponent(
                  `I thought you would find this article insightful:\n\n${blog.title}\n\nRead here: ${
                    typeof window !== "undefined" ? window.location.href : ""
                  }`
                )}`}
                className="flex items-center gap-2.5 p-3 bg-[#6D0D12]/10 hover:bg-[#6D0D12]/20 border border-[#6D0D12]/30 text-[#6D0D12] text-xs font-bold transition-all"
              >
                <Mail className="w-5 h-5 text-[#6D0D12]" />
                <span>Email</span>
              </a>
            </div>

            {/* Direct Copy Link Input */}
            <div className="space-y-2 pt-2 border-t border-[#6D0D12]/15">
              <label className="block text-[11px] font-bold text-cocoa/70 uppercase tracking-wider">
                Or Copy Link Directly:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={typeof window !== "undefined" ? window.location.href : ""}
                  className="flex-1 bg-white border border-[#6D0D12]/25 px-3 py-2 text-xs text-cocoa select-all focus:outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 bg-[#6D0D12] hover:bg-[#52090D] text-[#FBF1E9] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: INQUIRE / ASK A QUESTION */}
      {showInquireModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#FBF1E9] border border-[#6D0D12]/30 max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setShowInquireModal(false)}
              className="absolute top-4 right-4 text-cocoa/60 hover:text-cocoa transition-colors cursor-pointer"
            >
              ✕
            </button>

            <div className="space-y-1">
              <div className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#6D0D12]">
                — Second Brick Advisory
              </div>
              <h3 className="font-serif text-2xl text-[#3D2822]">
                Inquire Regarding This Insight
              </h3>
              <p className="text-xs text-cocoa/75">
                Reference: <span className="font-semibold text-cocoa">"{blog.title}"</span>
              </p>
            </div>

            {inquireSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 p-6 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-lg text-emerald-900 font-bold">Inquiry Received</h4>
                <p className="text-xs text-emerald-700">
                  Our executive advisory partner will connect with you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquireSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-cocoa mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={inquireName}
                    onChange={(e) => setInquireName(e.target.value)}
                    placeholder="E.g., Rajesh Sharma"
                    className="w-full bg-white border border-[#6D0D12]/20 px-3.5 py-2 text-xs text-cocoa focus:outline-none focus:border-[#6D0D12]"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-cocoa mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={inquirePhone}
                      onChange={(e) => setInquirePhone(e.target.value)}
                      placeholder="+91 98..."
                      className="w-full bg-white border border-[#6D0D12]/20 px-3.5 py-2 text-xs text-cocoa focus:outline-none focus:border-[#6D0D12]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-cocoa mb-1">Email Address</label>
                    <input
                      type="email"
                      value={inquireEmail}
                      onChange={(e) => setInquireEmail(e.target.value)}
                      placeholder="name@email.com"
                      className="w-full bg-white border border-[#6D0D12]/20 px-3.5 py-2 text-xs text-cocoa focus:outline-none focus:border-[#6D0D12]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-cocoa mb-1">Questions or Specific Notes</label>
                  <textarea
                    rows={3}
                    value={inquireMessage}
                    onChange={(e) => setInquireMessage(e.target.value)}
                    placeholder="E.g., I'd like to discuss investment options..."
                    className="w-full bg-white border border-[#6D0D12]/20 p-3 text-xs text-cocoa focus:outline-none focus:border-[#6D0D12]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowInquireModal(false)}
                    className="px-4 py-2 border border-[#6D0D12]/20 text-xs text-cocoa hover:bg-black/5 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary text-xs py-2 px-6 cursor-pointer"
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
