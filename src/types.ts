// ─────────────────────────────────────────────
//  types.ts — Shared TypeScript interfaces
// ─────────────────────────────────────────────

export interface NavLink {
  text: string;
  url: string;
}

// Single Stat interface used for both heroStats and whyHireStats
export interface Stat {
  value: string;
  label: string;
}

export interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Experience {
  title: string;
  company: string;
  date: string;
  description: string;
  position: 'left' | 'right';
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  url?: string;
}

export interface Testimonial {
  id: number;
  text: string;
  author: {
    name: string;
    position: string;
    image: string;
  };
  rating: number;
}

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  url?: string;
}

export interface Tag {
  id: number;
  name: string;
  isActive: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}

export interface FooterColumn {
  title: string;
  links: { text: string; url: string }[];
}