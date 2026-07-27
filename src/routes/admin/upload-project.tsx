import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  Globe,
  Info,
  MapPin,
  Plus,
  Save,
  Trash2,
  UploadCloud,
  Video,
  FileText,
  Eye,
} from "lucide-react";
import { saveProject } from "@/lib/contentStore";

export const Route = createFileRoute("/admin/upload-project")({
  component: UploadProject,
});

function UploadProject() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Ongoing");
  const [type, setType] = useState("Residential");
  const [date, setDate] = useState("2026-03-15");
  const [sqft, setSqft] = useState("2,400");
  const [location, setLocation] = useState("Alibaug, Coastal Highway");

  // Step 2: Images
  const [featuredImage, setFeaturedImage] = useState<string>("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80");
  const [galleryImages, setGalleryImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
  ]);

  // Step 3: Links
  const [websiteUrl, setWebsiteUrl] = useState("https://secondbrick.in/portfolio");
  const [brochurePdf, setBrochurePdf] = useState("Project_Brochure_2026.pdf");
  const [googleMapsLink, setGoogleMapsLink] = useState("https://maps.google.com/?q=Alibaug");
  const [virtualTourLink, setVirtualTourLink] = useState("");
  const [videoLink, setVideoLink] = useState("");

  // Step 4: USPs & Amenities
  const [usps, setUsps] = useState<string[]>([
    "Sea-facing Luxury Deck",
    "Solar Power Integrated",
    "24/7 Security & Concierge",
    "Infinity Pool",
  ]);
  const [newUsp, setNewUsp] = useState("");

  const handleAddUsp = () => {
    if (newUsp.trim() && !usps.includes(newUsp.trim())) {
      setUsps([...usps, newUsp.trim()]);
      setNewUsp("");
    }
  };

  const handleRemoveUsp = (index: number) => {
    setUsps(usps.filter((_, i) => i !== index));
  };

  const handleAddGalleryImage = () => {
    const placeholder = `https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80`;
    setGalleryImages([...galleryImages, placeholder]);
  };

  const handleRemoveGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
  };

  const handlePublish = () => {
    saveProject({
      title: title || "New Real Estate Development",
      description: description || "Premium coastal residential and infrastructure project built to high standards.",
      status,
      type,
      date,
      sqft,
      location,
      featuredImage,
      galleryImages,
      websiteUrl,
      brochurePdf,
      googleMapsLink,
      virtualTourLink,
      videoLink,
      usps,
    });

    alert("Project published successfully!");
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
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Upload Project</h1>
            <p className="text-slate-500 text-xs mt-0.5">Add a new real estate project</p>
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
          <div className="flex items-center justify-between max-w-3xl mx-auto relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
            {[
              { n: 1, label: "Basic Information" },
              { n: 2, label: "Images" },
              { n: 3, label: "Links" },
              { n: 4, label: "USPs (Amenities)" },
              { n: 5, label: "Preview & Publish" },
            ].map(({ n, label }) => {
              const isCompleted = step > n;
              const isActive = step === n;
              return (
                <div key={n} className="relative z-10 flex flex-col items-center group cursor-pointer" onClick={() => setStep(n)}>
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      isCompleted
                        ? "bg-emerald-600 text-white"
                        : isActive
                        ? "bg-[#6D0D12] text-[#FBF1E9] ring-4 ring-[#6D0D12]/20"
                        : "bg-slate-100 text-slate-400 border border-slate-300"
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : n}
                  </div>
                  <span
                    className={`text-[11px] font-medium mt-2 hidden md:inline-block ${
                      isActive ? "text-[#6D0D12] font-bold" : "text-slate-500"
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
          {/* STEP 1: BASIC INFORMATION */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-slate-900">Step 1: Basic Information</h2>
                <p className="text-slate-500 text-xs mt-1">Fill in the basic details of your project.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Project Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter project title"
                    className="w-full bg-slate-50/50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Project Status *</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-slate-50/50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white"
                  >
                    <option value="Upcoming">Upcoming</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Project Description *</label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter project description"
                    className="w-full bg-slate-50/50 border border-slate-300 rounded-lg p-4 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white resize-y"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Project Type *</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-slate-50/50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Luxury Villa">Luxury Villa</option>
                    <option value="Township">Township</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Project Date *</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-slate-50/50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Square Footage (sq.ft) *</label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={sqft}
                      onChange={(e) => setSqft(e.target.value)}
                      placeholder="Enter square footage"
                      className="w-full bg-slate-50/50 border border-slate-300 rounded-lg pl-4 pr-16 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                    <span className="absolute right-3 text-xs text-slate-400 font-medium pointer-events-none">sq.ft</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Project Location (Optional)</label>
                  <div className="relative flex items-center">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter project location"
                      className="w-full bg-slate-50/50 border border-slate-300 rounded-lg pl-9 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: IMAGES */}
          {step === 2 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-base font-bold text-slate-900">Step 2: Images</h2>
                <p className="text-slate-500 text-xs mt-1">Upload project images. You can upload multiple images for gallery.</p>
              </div>

              {/* Featured Image Block */}
              <div className="grid lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8 space-y-3">
                  <label className="block text-xs font-bold text-slate-700">Featured Image *</label>
                  <p className="text-slate-400 text-[11px]">This will be the cover image of your project.</p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 items-center">
                    <div className="aspect-[16/10] rounded-xl overflow-hidden border border-slate-200 bg-slate-100 relative group">
                      <img src={featuredImage} alt="Featured cover" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="text-white text-xs font-medium">Cover Image</span>
                      </div>
                    </div>

                    <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-6 text-center cursor-pointer transition-colors flex flex-col items-center justify-center aspect-[16/10] bg-slate-50/50">
                      <UploadCloud className="w-8 h-8 text-blue-600 mb-2" />
                      <div className="text-xs font-bold text-slate-800">Click to upload</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">or drag and drop</div>
                      <div className="text-[9px] text-slate-400 mt-2 font-mono">JPG, PNG, WEBP (Max 5MB)</div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-blue-50/60 border border-blue-100 rounded-xl p-5 text-xs">
                  <div className="flex items-center gap-2 text-blue-700 font-bold mb-2">
                    <Info className="w-4 h-4" />
                    <span>Image Tips</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-600 text-[11px] list-disc pl-4 leading-relaxed">
                    <li>Use high quality images</li>
                    <li>Recommended size: 1920x1080px</li>
                    <li>Supported formats: JPG, PNG, WEBP</li>
                    <li>Max file size: 5MB per image</li>
                  </ul>
                </div>
              </div>

              {/* Gallery Images Grid */}
              <div className="space-y-3 pt-6 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700">Gallery Images</label>
                <p className="text-slate-400 text-[11px]">Add multiple images to showcase your project.</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {galleryImages.map((imgUrl, i) => (
                    <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 group bg-slate-100">
                      <img src={imgUrl} alt={`Gallery ${i+1}`} className="w-full h-full object-cover" />
                      <div className="absolute top-2 left-2 w-5 h-5 bg-slate-900/70 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {i + 1}
                      </div>
                      <button
                        onClick={() => handleRemoveGalleryImage(i)}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-600 text-white rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={handleAddGalleryImage}
                    className="aspect-[4/3] border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:text-blue-600 transition-colors bg-slate-50/50"
                  >
                    <Plus className="w-6 h-6 mb-1" />
                    <span className="text-xs font-semibold">Add More</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: LINKS */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-slate-900">Step 3: Project Links (Optional)</h2>
                <p className="text-slate-500 text-xs mt-1">Add relevant links for your project.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Website URL</label>
                  <div className="relative flex items-center">
                    <Globe className="w-4 h-4 text-slate-400 absolute left-3" />
                    <input
                      type="text"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      placeholder="https://yourproject.com"
                      className="w-full bg-slate-50/50 border border-slate-300 rounded-lg pl-9 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Brochure (PDF)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={brochurePdf}
                      placeholder="Upload brochure PDF"
                      className="flex-1 bg-slate-50/50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs text-slate-800"
                    />
                    <button
                      type="button"
                      onClick={() => alert("Upload PDF trigger")}
                      className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs px-4 py-2.5 rounded-lg shrink-0"
                    >
                      Upload
                    </button>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">Max file size: 10MB</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Google Maps Link</label>
                  <div className="relative flex items-center">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3" />
                    <input
                      type="text"
                      value={googleMapsLink}
                      onChange={(e) => setGoogleMapsLink(e.target.value)}
                      placeholder="https://maps.google.com/..."
                      className="w-full bg-slate-50/50 border border-slate-300 rounded-lg pl-9 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Virtual Tour Link</label>
                  <div className="relative flex items-center">
                    <Eye className="w-4 h-4 text-slate-400 absolute left-3" />
                    <input
                      type="text"
                      value={virtualTourLink}
                      onChange={(e) => setVirtualTourLink(e.target.value)}
                      placeholder="https://yourproject.com/virtual-tour"
                      className="w-full bg-slate-50/50 border border-slate-300 rounded-lg pl-9 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">YouTube / Video Link</label>
                  <div className="relative flex items-center">
                    <Video className="w-4 h-4 text-slate-400 absolute left-3" />
                    <input
                      type="text"
                      value={videoLink}
                      onChange={(e) => setVideoLink(e.target.value)}
                      placeholder="https://youtube.com/watch?v=..."
                      className="w-full bg-slate-50/50 border border-slate-300 rounded-lg pl-9 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: USPS & AMENITIES */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-slate-900">Step 4: USPs & Amenities</h2>
                <p className="text-slate-500 text-xs mt-1">Add key selling points and highlights of your development.</p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newUsp}
                    onChange={(e) => setNewUsp(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddUsp())}
                    placeholder="Add amenity or USP (e.g. Swimming Pool, Solar Power)"
                    className="flex-1 bg-slate-50/50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                  />
                  <button
                    type="button"
                    onClick={handleAddUsp}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-5 py-2.5 rounded-lg inline-flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {usps.map((u, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-lg text-xs font-semibold"
                    >
                      <span>{u}</span>
                      <button
                        onClick={() => handleRemoveUsp(i)}
                        className="text-blue-400 hover:text-blue-900 p-0.5"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: PREVIEW & PUBLISH */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base font-bold text-slate-900">Step 5: Preview & Publish</h2>
                <p className="text-slate-500 text-xs mt-1">Review your project details before publishing to the live website.</p>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/40 p-6 space-y-6">
                <div className="grid md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-5 aspect-[4/3] rounded-xl overflow-hidden border border-slate-200">
                    <img src={featuredImage} alt={title} className="w-full h-full object-cover" />
                  </div>

                  <div className="md:col-span-7 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                        {status}
                      </span>
                      <span className="text-slate-400 text-xs font-medium">{type}</span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900">{title || "Untitled Project"}</h3>
                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">{description}</p>

                    <div className="flex flex-wrap gap-4 text-xs text-slate-500 pt-2 border-t border-slate-200">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-blue-600" /> {location}</span>
                      <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5 text-blue-600" /> {sqft} sq.ft</span>
                    </div>
                  </div>
                </div>

                {usps.length > 0 && (
                  <div className="pt-4 border-t border-slate-200">
                    <div className="text-xs font-bold text-slate-700 mb-2">Amenities & Highlights</div>
                    <div className="flex flex-wrap gap-2">
                      {usps.map((u, i) => (
                        <span key={i} className="bg-white border border-slate-200 text-slate-700 text-[11px] font-medium px-3 py-1 rounded-md">
                          ✓ {u}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
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

            {step < 5 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="bg-[#6D0D12] hover:bg-[#550a0e] text-[#FBF1E9] font-medium text-xs px-6 py-2.5 rounded-lg inline-flex items-center gap-2 transition-colors shadow-2xs"
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
                <span>Publish Project</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
