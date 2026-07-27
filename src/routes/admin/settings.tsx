import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Building2, Save, Shield, Bell, User, Lock, CheckCircle2 } from "lucide-react";
import { getAdminPassword, setAdminPassword } from "@/lib/contentStore";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
});

function AdminSettings() {
  const [companyName, setCompanyName] = useState("Second Brick");
  const [contactEmail, setContactEmail] = useState("info@secondbrick.in");
  const [phone, setPhone] = useState("+91 9004 590 002");
  const [notifyInquiries, setNotifyInquiries] = useState(true);
  const [adminName, setAdminName] = useState("Admin User");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.trim()) {
      setAdminPassword(newPassword.trim());
      setNewPassword("");
      setCurrentPassword("");
    }
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Admin Settings</h1>
            <p className="text-slate-500 text-xs mt-0.5">
              Manage website contact details, admin account profile, and notifications.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 bg-[#6D0D12] hover:bg-[#550a0e] text-[#FBF1E9] font-medium text-xs px-5 py-2.5 rounded-lg transition-colors shadow-2xs"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>

        {savedToast && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold px-4 py-3 rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Settings saved successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* SECTION 1: Company Profile */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Company & Brand Profile</h2>
                <p className="text-slate-400 text-[11px]">Primary contact details displayed across site footers and forms.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Company Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-slate-50/50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Primary Contact Email</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full bg-slate-50/50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50/50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Active Markets / Cities</label>
                <input
                  type="text"
                  readOnly
                  value="Mumbai · Pune · Latur · Alibaug"
                  className="w-full bg-slate-100 border border-slate-200 rounded-lg px-4 py-2.5 text-xs text-slate-500 font-medium"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: Admin Profile & Security */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Admin Profile & Security</h2>
                <p className="text-slate-400 text-[11px]">Manage your login profile and password credentials.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Admin Display Name</label>
                <input
                  type="text"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  className="w-full bg-slate-50/50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Admin Role</label>
                <div className="flex items-center gap-2 pt-2">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-slate-800">Super Administrator</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50/50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Leave blank to keep current"
                  className="w-full bg-slate-50/50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: Notification Preferences */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Notification Preferences</h2>
                <p className="text-slate-400 text-[11px]">Configure email alerts for customer inquiries and form submissions.</p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifyInquiries}
                  onChange={(e) => setNotifyInquiries(e.target.checked)}
                  className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                />
                <div>
                  <div className="text-xs font-bold text-slate-800">Email Alerts for Customer Inquiries</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Receive instant email notifications when prospective buyers submit the website inquiry form (/inquire).
                  </p>
                </div>
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#6D0D12] hover:bg-[#550a0e] text-[#FBF1E9] font-bold text-xs px-8 py-3 rounded-lg inline-flex items-center gap-2 transition-colors shadow-2xs"
            >
              <Save className="w-4 h-4" />
              <span>Save All Settings</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
