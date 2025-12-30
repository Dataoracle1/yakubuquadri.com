export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface Experience {
  date: string;
  title: string;
  company: string;
  description: string;
  position: 'left' | 'right';
}

export interface PortfolioItem {
  id: number;
  image: string;
  title: string;
  category: string;
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
  image: string;
  date: string;
  title: string;
  excerpt: string;
}

export interface Tag {
  id: number;
  name: string;
  isActive: boolean;
}

export interface Stat {
  value: string;
  label: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface FooterLink {
  text: string;
  url: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}