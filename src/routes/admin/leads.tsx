import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  Inbox,
  Download,
  Phone,
  Mail,
  MessageSquare,
  Search,
  Check,
  Trash2,
  Plus,
  ArrowRight,
  ExternalLink,
  Users,
  Clock,
  CheckCircle2,
  X,
  Filter,
  Eye,
} from "lucide-react";
import {
  getStoredInquiries,
  updateInquiryStatus,
  deleteInquiry,
  saveInquiry,
  InquiryItem,
} from "@/lib/contentStore";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/admin/leads")({
  head: () => ({
    meta: [
      { title: "Client Inquiries & Leads Inbox — Admin Portal" },
      { name: "description", content: "Real-time client inquiries and leads management." },
    ],
  }),
  component: AdminLeadsPage,
});

function AdminLeadsPage() {
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [filterStatus, setFilterStatus] = useState<"All" | "New" | "Contacted" | "Archived">("All");
  const [sourceFilter, setSourceFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Modal State: View Lead Details
  const [selectedLead, setSelectedLead] = useState<InquiryItem | null>(null);

  // Modal State: Add Manual Lead
  const [showAddModal, setShowAddModal] = useState(false);
  const [manualName, setManualName] = useState("");
  const [manualPhone, setManualPhone] = useState("");
  const [manualEmail, setManualEmail] = useState("");
  const [manualCity, setManualCity] = useState("");
  const [manualProject, setManualProject] = useState("");
  const [manualMessage, setManualMessage] = useState("");
  const [manualSource, setManualSource] = useState("Direct Phone Call");

  useEffect(() => {
    setInquiries(getStoredInquiries());

    const handleUpdate = () => {
      setInquiries(getStoredInquiries());
    };
    window.addEventListener("content_store_updated", handleUpdate);
    return () => window.removeEventListener("content_store_updated", handleUpdate);
  }, []);

  const handleToggleStatus = (id: string, current: string) => {
    const nextStatus = current === "New" ? "Contacted" : "New";
    updateInquiryStatus(id, nextStatus);
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead({ ...selectedLead, status: nextStatus as any });
    }
  };

  const handleSetStatus = (id: string, status: "New" | "Contacted" | "Archived") => {
    updateInquiryStatus(id, status);
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead({ ...selectedLead, status });
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove inquiry record for ${name}?`)) {
      deleteInquiry(id);
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead(null);
      }
    }
  };

  const handleAddManualLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName.trim() || !manualPhone.trim()) {
      alert("Please provide at least a name and contact phone number.");
      return;
    }

    saveInquiry({
      name: manualName.trim(),
      phone: manualPhone.trim(),
      email: manualEmail.trim(),
      city: manualCity.trim(),
      projectOrArticleTitle: manualProject.trim(),
      message: manualMessage.trim(),
      source: manualSource,
      status: "New",
    });

    setManualName("");
    setManualPhone("");
    setManualEmail("");
    setManualCity("");
    setManualProject("");
    setManualMessage("");
    setShowAddModal(false);
    alert("New lead added to inbox!");
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

  // Metrics
  const totalCount = inquiries.length;
  const newCount = inquiries.filter((i) => i.status === "New").length;
  const contactedCount = inquiries.filter((i) => i.status === "Contacted").length;

  // Filtered List
  const filteredInquiries = inquiries.filter((inq) => {
    if (filterStatus !== "All" && inq.status !== filterStatus) return false;
    if (sourceFilter !== "All" && inq.source !== sourceFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        (inq.name || "").toLowerCase().includes(q) ||
        (inq.phone || "").toLowerCase().includes(q) ||
        (inq.email || "").toLowerCase().includes(q) ||
        (inq.city || "").toLowerCase().includes(q) ||
        (inq.source || "").toLowerCase().includes(q) ||
        (inq.projectOrArticleTitle || "").toLowerCase().includes(q) ||
        (inq.message || "").toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <AdminLayout>
      <div className="space-y-8 pb-12">
        {/* TOP HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-serif font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Inbox className="w-6 h-6 text-[#6D0D12]" />
                <span>Client Inquiries & Leads Inbox</span>
              </h1>
              {newCount > 0 && (
                <span className="px-2.5 py-0.5 bg-red-600 text-white text-xs font-bold rounded-full animate-pulse">
                  {newCount} New
                </span>
              )}
            </div>
            <p className="text-slate-500 text-xs mt-1">
              Live inquiries stream from Project One-Pagers, Blog One-Pagers, Homepage popups, and direct contact forms.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-[#6D0D12] hover:bg-[#52090D] text-[#FBF1E9] px-4 py-2 text-xs font-bold rounded-none inline-flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Manual Lead</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-4 py-2 text-xs font-bold rounded-none inline-flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
              title="Download all leads as CSV spreadsheet"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* METRICS CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 p-5 shadow-2xs">
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Total Leads Received</div>
            <div className="font-serif text-3xl font-bold text-slate-900 mt-1">{totalCount}</div>
            <div className="text-[11px] text-slate-500 mt-1">All recorded inquiries</div>
          </div>

          <div className="bg-red-50/50 border border-red-200 p-5 shadow-2xs">
            <div className="text-[10px] uppercase font-bold tracking-wider text-red-600 flex items-center justify-between">
              <span>Action Required</span>
              {newCount > 0 && <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />}
            </div>
            <div className="font-serif text-3xl font-bold text-red-900 mt-1">{newCount}</div>
            <div className="text-[11px] text-red-700 mt-1">Awaiting advisor response</div>
          </div>

          <div className="bg-emerald-50/50 border border-emerald-200 p-5 shadow-2xs">
            <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-700">Contacted / In Progress</div>
            <div className="font-serif text-3xl font-bold text-emerald-900 mt-1">{contactedCount}</div>
            <div className="text-[11px] text-emerald-700 mt-1">Client discussion ongoing</div>
          </div>

          <div className="bg-white border border-slate-200 p-5 shadow-2xs">
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Live Sync Status</div>
            <div className="font-serif text-xl font-bold text-[#6D0D12] mt-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Active Real-Time</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Direct from web touchpoints</div>
          </div>
        </div>

        {/* CONTROLS BAR: SEARCH & FILTERS */}
        <div className="bg-white border border-slate-200 p-4 shadow-2xs space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Status Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setFilterStatus("All")}
                className={`px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  filterStatus === "All"
                    ? "bg-[#6D0D12] text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                All ({totalCount})
              </button>
              <button
                onClick={() => setFilterStatus("New")}
                className={`px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  filterStatus === "New"
                    ? "bg-red-600 text-white shadow-xs"
                    : "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
                }`}
              >
                <span>New / Uncontacted</span>
                <span className="px-1.5 py-0.2 bg-black/20 text-white text-[10px] rounded-full">
                  {newCount}
                </span>
              </button>
              <button
                onClick={() => setFilterStatus("Contacted")}
                className={`px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  filterStatus === "Contacted"
                    ? "bg-emerald-700 text-white shadow-xs"
                    : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200"
                }`}
              >
                Contacted ({contactedCount})
              </button>
            </div>

            {/* Right side: Source filter & Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="bg-white border border-slate-300 px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
              >
                <option value="All">All Sources</option>
                <option value="Project One-Pager">Project One-Pager</option>
                <option value="Blog One-Pager">Blog One-Pager</option>
                <option value="Contact Page (/inquire)">Contact Page (/inquire)</option>
                <option value="Homepage Interest Popup">Homepage Interest Popup</option>
                <option value="Direct Phone Call">Direct Phone Call</option>
              </select>

              <div className="relative min-w-[240px]">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, phone, project..."
                  className="w-full bg-white border border-slate-300 pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* LEADS DATA TABLE */}
        <div className="bg-white border border-slate-200 shadow-2xs overflow-hidden">
          {filteredInquiries.length === 0 ? (
            <div className="text-center py-16 p-6">
              <Inbox className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-serif text-lg text-slate-800 font-bold">No Inquiries Found</h3>
              <p className="text-slate-400 text-xs mt-1 max-w-sm mx-auto">
                No client leads matched your selected filters. Reset filters or log a manual inquiry.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100 text-slate-700 text-[11px] uppercase tracking-wider font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Prospect Info</th>
                    <th className="py-3.5 px-4">Touchpoint / Source</th>
                    <th className="py-3.5 px-4">Inquiry / Note</th>
                    <th className="py-3.5 px-4">Received</th>
                    <th className="py-3.5 px-4 text-right">Quick Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredInquiries.map((inq) => {
                    const rawPhone = (inq.phone || "").replace(/[^0-9]/g, "");
                    const isNew = inq.status === "New";

                    return (
                      <tr
                        key={inq.id}
                        className={`hover:bg-slate-50 transition-colors ${
                          isNew ? "bg-red-50/20" : "bg-white"
                        }`}
                      >
                        {/* Status Toggle */}
                        <td className="py-4 px-4 align-top">
                          <button
                            onClick={() => handleToggleStatus(inq.id, inq.status)}
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

                        {/* Prospect Info */}
                        <td className="py-4 px-4 align-top space-y-1">
                          <div className="font-serif text-sm font-bold text-slate-900 flex items-center gap-2">
                            <span>{inq.name}</span>
                            <button
                              onClick={() => setSelectedLead(inq)}
                              className="text-[10px] text-blue-600 hover:underline font-sans font-normal"
                            >
                              (View Dossier)
                            </button>
                          </div>
                          <div className="flex flex-col gap-0.5 text-[11px]">
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

                        {/* Touchpoint / Source */}
                        <td className="py-4 px-4 align-top space-y-1">
                          <span className="inline-block px-2 py-0.5 bg-[#6D0D12]/10 text-[#6D0D12] font-bold text-[10px] uppercase tracking-wider border border-[#6D0D12]/20">
                            {inq.source}
                          </span>
                          {inq.projectOrArticleTitle && (
                            <div className="font-serif text-xs text-slate-800 font-semibold line-clamp-2">
                              {inq.projectOrArticleTitle}
                            </div>
                          )}
                        </td>

                        {/* Inquiry / Note */}
                        <td className="py-4 px-4 align-top max-w-xs">
                          <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                            {inq.message || "—"}
                          </p>
                        </td>

                        {/* Timestamp */}
                        <td className="py-4 px-4 align-top text-[11px] text-slate-500 font-mono whitespace-nowrap">
                          {inq.date}
                        </td>

                        {/* Quick Contact & Actions */}
                        <td className="py-4 px-4 align-top text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Call */}
                            {inq.phone && (
                              <a
                                href={`tel:${rawPhone}`}
                                title={`Call ${inq.name}`}
                                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
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
                                className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors"
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
                                className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-colors"
                              >
                                <Mail className="w-3.5 h-3.5" />
                              </a>
                            )}

                            {/* View Dossier */}
                            <button
                              onClick={() => setSelectedLead(inq)}
                              title="View full lead record"
                              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => handleDelete(inq.id, inq.name)}
                              title="Delete inquiry"
                              className="p-2 bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-200 transition-colors cursor-pointer ml-1"
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

        {/* MODAL: VIEW LEAD DOSSIER */}
        {selectedLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-[#FBF1E9] border border-[#6D0D12]/30 max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-[#3D2822]">
              <button
                onClick={() => setSelectedLead(null)}
                className="absolute top-4 right-4 text-cocoa/60 hover:text-cocoa transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1 border-b border-[#6D0D12]/15 pb-4">
                <div className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#6D0D12]">
                  — Lead Dossier Record
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#3D2822]">
                  {selectedLead.name}
                </h3>
                <div className="text-xs text-cocoa/70 flex items-center gap-2">
                  <span>Received: {selectedLead.date}</span>
                  <span>·</span>
                  <span className="font-semibold text-[#6D0D12]">{selectedLead.source}</span>
                </div>
              </div>

              {/* Lead Details Grid */}
              <div className="grid sm:grid-cols-2 gap-4 bg-white p-4 border border-[#6D0D12]/15 text-xs">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Contact Phone</div>
                  <div className="font-mono text-sm font-bold text-slate-900 mt-0.5">{selectedLead.phone || "—"}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Email Address</div>
                  <div className="text-slate-800 mt-0.5 truncate">{selectedLead.email || "—"}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Location / City</div>
                  <div className="text-slate-800 mt-0.5">{selectedLead.city || "—"}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Current Status</div>
                  <div className="mt-0.5">
                    <span className={`inline-block px-2 py-0.5 font-bold uppercase text-[10px] ${
                      selectedLead.status === "New" ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800"
                    }`}>
                      {selectedLead.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Reference & Inquiry Notes */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Inquiry Message / Request:
                </div>
                <div className="bg-white border border-[#6D0D12]/15 p-4 text-xs text-slate-800 leading-relaxed max-h-40 overflow-y-auto">
                  {selectedLead.message || "No specific notes provided by prospect."}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-2 border-t border-[#6D0D12]/15 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleStatus(selectedLead.id, selectedLead.status)}
                    className="px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-none cursor-pointer"
                  >
                    Mark as {selectedLead.status === "New" ? "Contacted" : "New"}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {selectedLead.phone && (
                    <a
                      href={`https://api.whatsapp.com/send?phone=${selectedLead.phone.replace(/[^0-9]/g, "")}&text=${encodeURIComponent(
                        `Hello ${selectedLead.name}, thank you for contacting Second Brick regarding ${
                          selectedLead.projectOrArticleTitle || "our luxury portfolio"
                        }. How may we assist your investment requirements?`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#25D366] hover:bg-[#1ebd5a] text-white text-xs font-bold rounded-none flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Client</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: LOG MANUAL LEAD */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-[#FBF1E9] border border-[#6D0D12]/30 max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-[#3D2822]">
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4 text-cocoa/60 hover:text-cocoa transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1 border-b border-[#6D0D12]/15 pb-4">
                <div className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#6D0D12]">
                  — Offline / Walk-in Lead
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#3D2822]">
                  Log New Client Inquiry
                </h3>
                <p className="text-xs text-cocoa/70">
                  Record buyer inquiries received via direct phone call, WhatsApp, or office visit.
                </p>
              </div>

              <form onSubmit={handleAddManualLeadSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Prospect Full Name *</label>
                  <input
                    type="text"
                    required
                    value={manualName}
                    onChange={(e) => setManualName(e.target.value)}
                    placeholder="e.g. Anand Mahindra"
                    className="w-full bg-white border border-slate-300 p-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#6D0D12]"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={manualPhone}
                      onChange={(e) => setManualPhone(e.target.value)}
                      placeholder="+91 98..."
                      className="w-full bg-white border border-slate-300 p-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#6D0D12]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={manualEmail}
                      onChange={(e) => setManualEmail(e.target.value)}
                      placeholder="client@company.com"
                      className="w-full bg-white border border-slate-300 p-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#6D0D12]"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">City / Region</label>
                    <input
                      type="text"
                      value={manualCity}
                      onChange={(e) => setManualCity(e.target.value)}
                      placeholder="Mumbai / Pune / Dubai..."
                      className="w-full bg-white border border-slate-300 p-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#6D0D12]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Lead Source</label>
                    <select
                      value={manualSource}
                      onChange={(e) => setManualSource(e.target.value)}
                      className="w-full bg-white border border-slate-300 p-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#6D0D12]"
                    >
                      <option value="Direct Phone Call">Direct Phone Call</option>
                      <option value="Office Walk-in / Reception">Office Walk-in / Reception</option>
                      <option value="WhatsApp Direct">WhatsApp Direct</option>
                      <option value="Broker / Referral Partner">Broker / Referral Partner</option>
                      <option value="Private Investor Network">Private Investor Network</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Project or Property Interest</label>
                  <input
                    type="text"
                    value={manualProject}
                    onChange={(e) => setManualProject(e.target.value)}
                    placeholder="e.g. Coastal Villa Estates · Alibaug"
                    className="w-full bg-white border border-slate-300 p-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#6D0D12]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Inquiry Notes / Specific Requirements</label>
                  <textarea
                    rows={3}
                    value={manualMessage}
                    onChange={(e) => setManualMessage(e.target.value)}
                    placeholder="E.g., Client requested 3-BHK villa quotation and site inspection for this Saturday..."
                    className="w-full bg-white border border-slate-300 p-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#6D0D12]"
                  />
                </div>

                <div className="pt-3 border-t border-[#6D0D12]/15 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-slate-300 text-xs text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#6D0D12] hover:bg-[#52090D] text-[#FBF1E9] px-6 py-2 text-xs font-bold cursor-pointer"
                  >
                    Save Lead
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
