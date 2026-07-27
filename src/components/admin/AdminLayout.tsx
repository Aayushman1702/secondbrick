import { useState, useEffect, type ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import {
  Building2,
  ChevronDown,
  ChevronRight,
  FileText,
  Globe,
  LayoutDashboard,
  Lightbulb,
  LogOut,
  Menu,
  PlusCircle,
  Settings,
  X,
  Bell,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";
import { isAdminAuthenticated, loginAdmin, logoutAdmin } from "@/lib/contentStore";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [insightsMenuOpen, setInsightsMenuOpen] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const location = useLocation();

  useEffect(() => {
    setIsAuthed(isAdminAuthenticated());
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(passwordInput);
    if (success) {
      setIsAuthed(true);
      setAuthError("");
      setPasswordInput("");
    } else {
      setAuthError("Incorrect password. Default is: secondbrick2026");
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthed(false);
  };

  const currentPath = location.pathname;

  const isCurrent = (path: string) => currentPath === path;
  const isParent = (path: string) => currentPath.startsWith(path);

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-[#3D2822] flex items-center justify-center p-4 font-sans text-slate-800 antialiased relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-[#6D0D12]/40 via-[#3D2822] to-black" />

        <div className="relative w-full max-w-md bg-[#FBF1E9] border border-[#6D0D12]/20 shadow-2xl rounded-2xl p-8 sm:p-10 space-y-6">
          <div className="text-center space-y-3">
            <div className="inline-flex p-3 rounded-2xl bg-white border border-[#6D0D12]/15 shadow-2xs mb-1">
              <img src={logo} alt="Second Brick Logo" className="h-10 w-auto" />
            </div>
            <h1 className="text-xl font-serif font-bold tracking-tight text-[#3D2822]">Admin Portal Access</h1>
            <p className="text-[#3D2822]/70 text-xs leading-relaxed">
              Enter your secret password to manage projects, blogs, and site content.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#3D2822] mb-1.5">Admin Password</label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter password..."
                  className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-10 py-3 text-xs text-slate-900 focus:outline-none focus:border-[#6D0D12] transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-lg font-medium text-center">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#6D0D12] hover:bg-[#550a0e] active:bg-[#44080b] text-[#FBF1E9] font-bold text-xs py-3 rounded-lg transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Unlock Admin Portal</span>
            </button>
          </form>

          <div className="pt-4 border-t border-[#3D2822]/10 text-center space-y-1">
            <div className="text-[11px] text-[#3D2822]/60">
              Default password: <span className="font-mono text-[#6D0D12] font-bold bg-white px-1.5 py-0.5 rounded border border-[#6D0D12]/20">secondbrick2026</span>
            </div>
            <div className="text-[10px] text-[#3D2822]/50">You can change this password anytime inside Settings.</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF1E9] flex font-sans text-slate-800 antialiased">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-[#3D2822]/60 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#FAF4EE] border-r border-[#6D0D12]/10 flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          {/* Sidebar Header / Logo */}
          <div className="h-16 px-6 border-b border-[#6D0D12]/10 flex items-center justify-between bg-[#FBF1E9]">
            <Link to="/admin" className="flex items-center gap-3">
              <img src={logo} alt="Second Brick" className="h-8 w-auto object-contain" />
            </Link>
            <button
              className="lg:hidden text-slate-400 hover:text-slate-600 p-1"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-6">
            <div>
              <Link
                to="/admin"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isCurrent("/admin")
                    ? "bg-[#6D0D12] text-[#FBF1E9] font-bold shadow-xs"
                    : "text-[#3D2822]/80 hover:bg-[#6D0D12]/10 hover:text-[#6D0D12]"
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
            </div>

            <div>
              <div className="px-3 text-[10px] font-bold tracking-wider text-[#3D2822]/50 uppercase mb-2">
                CONTENT
              </div>
              <div className="space-y-1">
                {/* Upload Project */}
                <Link
                  to="/admin/upload-project"
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isCurrent("/admin/upload-project")
                      ? "bg-[#6D0D12] text-[#FBF1E9] font-bold shadow-xs"
                      : "text-[#3D2822]/80 hover:bg-[#6D0D12]/10 hover:text-[#6D0D12]"
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Upload Project</span>
                </Link>

                {/* Upload Insights Parent */}
                <div>
                  <button
                    onClick={() => setInsightsMenuOpen(!insightsMenuOpen)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isParent("/admin/upload-insights")
                        ? "text-[#6D0D12] font-bold"
                        : "text-[#3D2822]/80 hover:bg-[#6D0D12]/10 hover:text-[#6D0D12]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Lightbulb className="w-4 h-4" />
                      <span>Upload Insights</span>
                    </div>
                    {insightsMenuOpen ? (
                      <ChevronDown className="w-4 h-4 opacity-60" />
                    ) : (
                      <ChevronRight className="w-4 h-4 opacity-60" />
                    )}
                  </button>

                  {/* Submenu */}
                  {insightsMenuOpen && (
                    <div className="ml-8 mt-1 space-y-1 border-l-2 border-[#6D0D12]/15 pl-3">
                      <Link
                        to="/admin/upload-insights/blog"
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                          isCurrent("/admin/upload-insights/blog")
                            ? "bg-[#6D0D12] text-[#FBF1E9] font-bold"
                            : "text-[#3D2822]/70 hover:text-[#6D0D12] hover:bg-[#6D0D12]/10"
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Blog</span>
                      </Link>
                      <Link
                        to="/admin/upload-insights/article-link"
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                          isCurrent("/admin/upload-insights/article-link")
                            ? "bg-[#6D0D12] text-[#FBF1E9] font-bold"
                            : "text-[#3D2822]/70 hover:text-[#6D0D12] hover:bg-[#6D0D12]/10"
                        }`}
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Article (Link)</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>

        {/* Footer Nav Links */}
        <div className="p-4 border-t border-[#6D0D12]/10 space-y-1 bg-[#FBF1E9]">
          <Link
            to="/admin/settings"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              isCurrent("/admin/settings")
                ? "bg-[#6D0D12] text-[#FBF1E9] font-bold"
                : "text-[#3D2822]/80 hover:bg-[#6D0D12]/10 hover:text-[#6D0D12]"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#3D2822]/80 hover:bg-red-100/80 hover:text-red-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#FBF1E9]">
        {/* TOP NAVBAR */}
        <header className="h-16 bg-[#FAF4EE] border-b border-[#6D0D12]/10 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-[#3D2822] hover:text-[#6D0D12] p-1"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center gap-5">
            {/* View Public Site button */}
            <Link
              to="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#6D0D12] bg-[#F5E6D8] hover:bg-[#6D0D12] hover:text-[#FBF1E9] px-3.5 py-1.5 rounded-md transition-colors border border-[#6D0D12]/15"
            >
              <span>View Public Site</span>
              <Globe className="w-3.5 h-3.5" />
            </Link>

            {/* Notifications */}
            <button className="relative text-[#3D2822]/60 hover:text-[#6D0D12] transition-colors p-1">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#6D0D12] rounded-full" />
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3 pl-3 border-l border-[#6D0D12]/10">
              <div className="w-8 h-8 rounded-full bg-[#6D0D12] text-[#FBF1E9] font-bold text-xs flex items-center justify-center">
                SB
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-[#3D2822] leading-none">Admin User</div>
                <div className="text-[10px] text-[#3D2822]/60 mt-0.5">Second Brick</div>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto bg-[#FBF1E9]">
          {children}
        </main>

        {/* PAGE FOOTER */}
        <footer className="py-4 px-6 md:px-10 border-t border-[#6D0D12]/10 text-xs text-[#3D2822]/60 flex items-center justify-between bg-[#FAF4EE]">
          <div>© 2026 Second Brick. All rights reserved.</div>
          <div>Version 1.0.0</div>
        </footer>
      </div>
    </div>
  );
}
