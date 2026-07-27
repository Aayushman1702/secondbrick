import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import responsibility from "@/assets/responsibility.jpg";

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  status: string;
  type: string;
  date: string;
  sqft: string;
  location?: string;
  featuredImage: string;
  galleryImages: string[];
  featuredOnHomepage?: boolean;
  websiteUrl?: string;
  brochurePdf?: string;
  googleMapsLink?: string;
  virtualTourLink?: string;
  videoLink?: string;
  usps?: string[];
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
    description: "Landmark redevelopment tower with premium amenities and skyline vistas.",
    status: "Ongoing",
    type: "Residential",
    date: "2026-02-15",
    sqft: "2,400",
    location: "Vile Parle, Mumbai",
    featuredImage: project2,
    galleryImages: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: "def_proj_2",
    title: "Coastal Retreat",
    description: "Sea-facing luxury villas on the Alibaug coastline with private pools and curated landscaping.",
    status: "Upcoming",
    type: "Luxury Villa",
    date: "2026-04-01",
    sqft: "4,500",
    location: "Alibaug, Maharashtra",
    featuredImage: project1,
    galleryImages: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: "def_proj_3",
    title: "Nawander Township",
    description: "Master-planned township with tree-lined avenues, schools, retail and healthcare.",
    status: "Completed",
    type: "Township",
    date: "2025-11-20",
    sqft: "12,000",
    location: "Pune, Maharashtra",
    featuredImage: project3,
    galleryImages: [],
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

export function logoutAdmin() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
  }
}



