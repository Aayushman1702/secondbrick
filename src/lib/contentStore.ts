import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import responsibility from "@/assets/responsibility.jpg";

export interface ConnectivityCard {
  label: string;
  desc: string;
}

export interface UspItem {
  title: string;
  desc?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline?: string;
  description: string;
  status: string;
  type: string;
  date: string;
  sqft: string;
  location?: string;
  priceRange?: string;
  reraNumber?: string;
  possessionDate?: string;
  totalUnits?: string;
  architect?: string;
  featuredImage: string;
  galleryImages: string[];
  featuredOnHomepage?: boolean;
  websiteUrl?: string;
  brochurePdf?: string;
  googleMapsLink?: string;
  virtualTourLink?: string;
  videoLink?: string;
  usps?: string[];
  uspTitle?: string;
  uspSubtext?: string;
  uspItems?: UspItem[];
  standardNoteTitle?: string;
  standardNoteDesc?: string;
  locationTitle?: string;
  locationSubtext?: string;
  connectivityPoints?: string[];
  connectivityCards?: ConnectivityCard[];
  createdAt: string;
}

export interface BlogItem {
  id: string;
  title: string;
  description: string;
  date: string;
  writtenBy: "Person" | "Company";
  author: string;
  cat: string;
  featuredImage: string;
  excerpt: string;
  articleUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  createdAt: string;
}

const PROJECTS_KEY = "second_brick_admin_projects";
const BLOGS_KEY = "second_brick_admin_blogs";

const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: "def_proj_1",
    title: "Urban Skyline Residences",
    tagline: "Ultra-Luxury Vertical Living Overlooking Mumbai Skyline",
    description: "Landmark redevelopment tower with premium amenities, high-speed private elevators, expansive sun decks, and panoramic skyline vistas in the heart of Vile Parle.",
    status: "Ongoing",
    type: "Residential",
    date: "2026-02-15",
    sqft: "2,400",
    location: "Vile Parle, Mumbai",
    priceRange: "₹4.50 Cr - ₹8.20 Cr",
    reraNumber: "P51800049281",
    possessionDate: "December 2027",
    totalUnits: "48 Exclusive Units",
    architect: "PRO-DEV Architectural Studio",
    featuredImage: project2,
    galleryImages: [
      project2,
      project1,
      project3,
    ],
    usps: [
      "Full-Floor Sky Residences with 360° Skyline Views",
      "Double-Height Grand Entrance Lobby & Valet",
      "Rooftop Infinity Lap Pool & Sunset Lounge",
      "Advanced EV Fast-Charging Bay for Every Unit",
      "IGBC Platinum Green Building Certification",
      "Automated Smart Home & Biometric Access Control",
    ],
    connectivityPoints: [
      "5 Mins to Western Express Highway",
      "8 Mins to Mumbai International Airport (T2)",
      "3 Mins to Upcoming Metro Line 3 Station",
      "Close Proximity to Top Tier Schools & Hospitals",
    ],
    websiteUrl: "https://secondbrick.in/portfolio",
    brochurePdf: "Urban_Skyline_Executive_Brochure.pdf",
    googleMapsLink: "https://maps.google.com/?q=Vile+Parle+Mumbai",
    virtualTourLink: "https://my.matterport.com/show/?m=sample-vileparle",
    videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    createdAt: new Date().toISOString(),
  },
  {
    id: "def_proj_2",
    title: "Coastal Retreat",
    tagline: "Private Ocean-View Luxury Villas with Curated Landscaping",
    description: "Sea-facing luxury villas on the tranquil Alibaug coastline featuring private temperature-controlled plunge pools, expansive sundecks, and bespoke concierge services.",
    status: "Upcoming",
    type: "Luxury Villa",
    date: "2026-04-01",
    sqft: "4,500",
    location: "Alibaug, Maharashtra",
    priceRange: "₹6.80 Cr - ₹14.50 Cr",
    reraNumber: "P52000038102",
    possessionDate: "March 2028",
    totalUnits: "16 Limited-Edition Villas",
    architect: "Nawander Design Collaborative",
    featuredImage: project1,
    galleryImages: [
      project1,
      project2,
      project3,
    ],
    usps: [
      "Private Heated Plunge Pool & Tropical Sun Decks",
      "Direct Beachfront Access & Private Boardwalk",
      "100% Solar Power & Integrated Rainwater Harvesting",
      "On-demand Private Chef & Estate Concierge",
      "High-Yield Rental Management Program Available",
      "Gated Community with 24/7 Security Patrols",
    ],
    connectivityPoints: [
      "15 Mins to Mandwa Jetty (Speedboat / Ro-Ro to Mumbai)",
      "40 Mins to Upcoming Navi Mumbai International Airport",
      "Connected via New Mumbai Trans Harbour Link (MTHL)",
      "Walking Distance to Awas & Sasawane Beaches",
    ],
    websiteUrl: "https://secondbrick.in/portfolio",
    brochurePdf: "Coastal_Retreat_One_Pager.pdf",
    googleMapsLink: "https://maps.google.com/?q=Alibaug+Maharashtra",
    virtualTourLink: "https://my.matterport.com/show/?m=sample-alibaug",
    videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    createdAt: new Date().toISOString(),
  },
  {
    id: "def_proj_3",
    title: "Nawander Township",
    tagline: "Master-Planned Sustainable Township with Tree-Lined Avenues",
    description: "Integrated sustainable township featuring tree-lined boulevards, international school campus, healthcare facilities, commercial retail spine, and 40+ acres of open green spaces.",
    status: "Completed",
    type: "Township",
    date: "2025-11-20",
    sqft: "12,000",
    location: "Pune, Maharashtra",
    priceRange: "₹85 Lakh - ₹2.40 Cr",
    reraNumber: "P52100029188",
    possessionDate: "Ready for Possession",
    totalUnits: "1,200+ Delivered Homes",
    architect: "Ar. Maheshkumar Nawander",
    featuredImage: project3,
    galleryImages: [
      project3,
      project1,
      project2,
    ],
    usps: [
      "40+ Acres of Dedicated Parkland & Botanical Gardens",
      "Fully Operational ICSE School & Multi-Specialty Clinic",
      "Olympic-Sized Clubhouse, Squash, Tennis & Cricket Turf",
      "Central High-Street Retail & Dining Promenade",
      "Zero-Discharge Green Township with On-site STP",
      "30+ Years Legacy of Proven Nawander Group Delivery",
    ],
    connectivityPoints: [
      "10 Mins to Pune-Mumbai Expressway Junction",
      "15 Mins to Hinjawadi IT Park / Tech Corridors",
      "25 Mins to Pune International Airport",
      "Direct City Bus & Metro Station at Township Gate",
    ],
    websiteUrl: "https://secondbrick.in/portfolio",
    brochurePdf: "Nawander_Township_Executive_Sheet.pdf",
    googleMapsLink: "https://maps.google.com/?q=Pune+Maharashtra",
    virtualTourLink: "https://my.matterport.com/show/?m=sample-pune",
    videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    createdAt: new Date().toISOString(),
  },
];

const INITIAL_BLOGS: BlogItem[] = [
  {
    id: "def_blog_1",
    title: "Mumbai Redevelopment — What Buyers Should Watch in 2026",
    description: "Policy shifts, floor space rules and new corridors that will define value over the next decade.",
    excerpt: "Policy shifts, floor space rules and new corridors that will define value over the next decade.",
    date: "Feb 22, 2026",
    writtenBy: "Company",
    author: "PRO-DEV Editorial",
    cat: "Market Updates",
    featuredImage: project2,
    createdAt: new Date().toISOString(),
  },
  {
    id: "def_blog_2",
    title: "The First-Time Investor's Guide to Township Living",
    description: "What to look for when master-planned communities are your entry point into real estate.",
    excerpt: "What to look for when master-planned communities are your entry point into real estate.",
    date: "Feb 04, 2026",
    writtenBy: "Person",
    author: "Ar. Maheshkumar Nawander",
    cat: "Buying Guide",
    featuredImage: project3,
    createdAt: new Date().toISOString(),
  },
  {
    id: "def_blog_3",
    title: "Building Green — Sustainable Choices That Add Value",
    description: "Small material and design decisions that reduce lifetime costs and increase resale strength.",
    excerpt: "Small material and design decisions that reduce lifetime costs and increase resale strength.",
    date: "Jan 28, 2026",
    writtenBy: "Company",
    author: "Second Brick",
    cat: "Lifestyle",
    featuredImage: responsibility,
    createdAt: new Date().toISOString(),
  },
];

export function getStoredProjects(): ProjectItem[] {
  if (typeof window === "undefined") return INITIAL_PROJECTS;
  try {
    const data = localStorage.getItem(PROJECTS_KEY);
    if (!data) {
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(INITIAL_PROJECTS));
      return INITIAL_PROJECTS;
    }
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_PROJECTS;
  }
}

export function getProjectById(id: string): ProjectItem | undefined {
  const projects = getStoredProjects();
  return projects.find((p) => p.id === id || p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === id.toLowerCase());
}

export function saveProject(project: Omit<ProjectItem, "id" | "createdAt">): ProjectItem {
  const existing = getStoredProjects();
  const newProject: ProjectItem = {
    ...project,
    id: "proj_" + Date.now(),
    createdAt: new Date().toISOString(),
  };
  const updated = [newProject, ...existing];
  if (typeof window !== "undefined") {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("content_store_updated"));
  }
  return newProject;
}

export function updateProject(id: string, projectUpdates: Partial<ProjectItem>): ProjectItem | undefined {
  const existing = getStoredProjects();
  let updatedProject: ProjectItem | undefined;
  const updated = existing.map((p) => {
    if (p.id === id || p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === id.toLowerCase()) {
      updatedProject = { ...p, ...projectUpdates };
      return updatedProject;
    }
    return p;
  });

  if (typeof window !== "undefined" && updatedProject) {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("content_store_updated"));
  }
  return updatedProject;
}

export function getStoredBlogs(): BlogItem[] {
  if (typeof window === "undefined") return INITIAL_BLOGS;
  try {
    const data = localStorage.getItem(BLOGS_KEY);
    if (!data) {
      localStorage.setItem(BLOGS_KEY, JSON.stringify(INITIAL_BLOGS));
      return INITIAL_BLOGS;
    }
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_BLOGS;
  }
}

export function saveBlog(blog: Omit<BlogItem, "id" | "createdAt">): BlogItem {
  const existing = getStoredBlogs();
  const newBlog: BlogItem = {
    ...blog,
    id: "blog_" + Date.now(),
    createdAt: new Date().toISOString(),
  };
  const updated = [newBlog, ...existing];
  if (typeof window !== "undefined") {
    localStorage.setItem(BLOGS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("content_store_updated"));
  }
  return newBlog;
}

export function deleteProject(id: string) {
  const existing = getStoredProjects();
  const updated = existing.filter((p) => p.id !== id);
  if (typeof window !== "undefined") {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("content_store_updated"));
  }
}

export function toggleFeaturedProject(id: string) {
  const existing = getStoredProjects();
  const updated = existing.map((p) => {
    if (p.id === id) {
      const isCurrentlyFeatured = p.featuredOnHomepage !== false;
      return { ...p, featuredOnHomepage: !isCurrentlyFeatured };
    }
    return p;
  });
  if (typeof window !== "undefined") {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("content_store_updated"));
  }
}

export function deleteBlog(id: string) {
  const existing = getStoredBlogs();
  const updated = existing.filter((b) => b.id !== id);
  if (typeof window !== "undefined") {
    localStorage.setItem(BLOGS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("content_store_updated"));
  }
}

const ADMIN_PASS_KEY = "second_brick_admin_pass";
const AUTH_SESSION_KEY = "second_brick_admin_authed";

export function getAdminPassword(): string {
  if (typeof window === "undefined") return "secondbrick2026";
  return localStorage.getItem(ADMIN_PASS_KEY) || "secondbrick2026";
}

export function setAdminPassword(newPass: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(ADMIN_PASS_KEY, newPass);
  }
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(AUTH_SESSION_KEY) === "true";
}

export function loginAdmin(password: string): boolean {
  if (password === getAdminPassword()) {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(AUTH_SESSION_KEY, "true");
    }
    return true;
  }
  return false;
}

export interface HeroSlideItem {
  id: string;
  imageUrl: string;
  overlayTitle: string;
  overlaySubtitle: string;
  overlayButtonText: string;
  overlayButtonLink: string;
}

const HERO_SLIDES_KEY = "second_brick_hero_slides";

const INITIAL_HERO_SLIDES: HeroSlideItem[] = [
  {
    id: "hero_1",
    imageUrl: project1,
    overlayTitle: "Featured Developments",
    overlaySubtitle: "Coastal Luxury & Private Villa Estates · Alibaug",
    overlayButtonText: "Read More",
    overlayButtonLink: "#portfolio-list",
  },
  {
    id: "hero_2",
    imageUrl: project2,
    overlayTitle: "Featured Developments",
    overlaySubtitle: "Landmark Towers & Urban Redevelopment · Mumbai",
    overlayButtonText: "Read More",
    overlayButtonLink: "#portfolio-list",
  },
  {
    id: "hero_3",
    imageUrl: project3,
    overlayTitle: "Featured Developments",
    overlaySubtitle: "Master-Planned Sustainable Townships · Pune",
    overlayButtonText: "Read More",
    overlayButtonLink: "#portfolio-list",
  },
];

export function getStoredHeroSlides(): HeroSlideItem[] {
  if (typeof window === "undefined") return INITIAL_HERO_SLIDES;
  try {
    const data = localStorage.getItem(HERO_SLIDES_KEY);
    if (!data) {
      localStorage.setItem(HERO_SLIDES_KEY, JSON.stringify(INITIAL_HERO_SLIDES));
      return INITIAL_HERO_SLIDES;
    }
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_HERO_SLIDES;
  }
}

export function saveHeroSlide(slide: Omit<HeroSlideItem, "id">): HeroSlideItem {
  const existing = getStoredHeroSlides();
  const newSlide: HeroSlideItem = {
    ...slide,
    id: "hero_" + Date.now(),
  };
  const updated = [newSlide, ...existing];
  if (typeof window !== "undefined") {
    localStorage.setItem(HERO_SLIDES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("content_store_updated"));
  }
  return newSlide;
}

export function deleteHeroSlide(id: string) {
  const existing = getStoredHeroSlides();
  const updated = existing.filter((s) => s.id !== id);
  if (typeof window !== "undefined") {
    localStorage.setItem(HERO_SLIDES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("content_store_updated"));
  }
}

export function logoutAdmin() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
  }
}



