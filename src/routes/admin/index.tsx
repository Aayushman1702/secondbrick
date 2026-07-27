import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Building2, Lightbulb, ArrowRight, FileText, CheckCircle2, Trash2, ExternalLink, Star } from "lucide-react";
import { getStoredProjects, getStoredBlogs, deleteProject, deleteBlog, toggleFeaturedProject } from "@/lib/contentStore";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    setProjects(getStoredProjects());
    setBlogs(getStoredBlogs());

    const handleUpdate = () => {
      setProjects(getStoredProjects());
      setBlogs(getStoredBlogs());
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

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">
            Welcome back, Admin User 👋 <br />
            Manage your real estate content efficiently.
          </p>
        </div>

        {/* Action Cards */}
        <div>
          <h2 className="text-sm font-semibold text-slate-700 mb-4">
            What would you like to do?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 1: Upload Project */}
            <div className="bg-white border border-slate-200 rounded-none p-8 text-center flex flex-col items-center shadow-2xs hover:border-[#6D0D12]/30 transition-all">
              <div className="w-16 h-16 rounded-full bg-[#FBF1E9] text-[#6D0D12] flex items-center justify-center mb-5 border border-[#6D0D12]/10">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-serif font-bold text-slate-900">Upload Project</h3>
              <p className="text-slate-500 text-xs mt-2 max-w-xs leading-relaxed">
                Add new real estate projects with details, images, USPs and more.
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
          </div>
        </div>

        {/* MANAGE & DELETE PUBLISHED PROJECTS */}
        <div className="bg-white border border-slate-200 rounded-none p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Manage Published Projects</h3>
              <p className="text-slate-400 text-xs mt-0.5">View, feature, and delete real estate projects.</p>
            </div>
            <Link to="/portfolio" target="_blank" className="text-xs text-[#6D0D12] hover:underline flex items-center gap-1 font-semibold">
              <span>View Portfolio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {projects.length === 0 ? (
            <div className="text-xs text-slate-400 py-4 text-center">
              No dynamic projects added yet. Click "Upload Project" above to create one.
            </div>
          ) : (
            <div className="space-y-2.5">
              {projects.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200/60 rounded-none text-xs hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <img src={p.featuredImage} alt={p.title} className="w-12 h-10 object-cover rounded-none border border-slate-200" />
                    <div>
                      <div className="font-bold text-slate-900">{p.title}</div>
                      <div className="text-slate-500 text-[11px] mt-0.5">
                        <span className="font-semibold text-[#6D0D12]">{p.status}</span> · {p.type} · {p.location || "Maharashtra"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleFeaturedProject(p.id)}
                      className={`p-2 rounded-lg border ${p.featuredOnHomepage !== false ? "bg-[#6D0D12]/10 border-[#6D0D12]/30 text-[#6D0D12]" : "bg-white border-slate-200 text-slate-400"}`}
                      title={p.featuredOnHomepage !== false ? "Remove from Homepage" : "Feature on Homepage"}
                    >
                      <Star className={`w-4 h-4 ${p.featuredOnHomepage !== false ? "fill-[#6D0D12]" : ""}`} />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(p.id, p.title)}
                      className="inline-flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-3 py-1.5 rounded-lg text-xs transition-colors border border-red-200"
                      title="Delete project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MANAGE & DELETE PUBLISHED ARTICLES / BLOGS */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
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
                <div key={b.id} className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200/60 rounded-xl text-xs hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <img src={b.featuredImage} alt={b.title} className="w-12 h-10 object-cover rounded-lg border border-slate-200" />
                    <div>
                      <div className="font-bold text-slate-900">{b.title}</div>
                      <div className="text-slate-500 text-[11px] mt-0.5">
                        <span className="font-semibold text-purple-600">{b.cat}</span> · By {b.author} ({b.date})
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteBlog(b.id, b.title)}
                    className="inline-flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 font-semibold px-3 py-1.5 rounded-lg text-xs transition-colors border border-red-200"
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
    </AdminLayout>
  );
}

