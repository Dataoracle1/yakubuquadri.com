// ─────────────────────────────────────────────
//  siteData.ts — Single source of truth for all
//  portfolio content. Edit this file to update
//  the entire site.
// ─────────────────────────────────────────────

import React from 'react';
import { Service, Experience, PortfolioItem, Testimonial, BlogPost, Tag, Stat, SocialLink, FooterColumn } from '../types';

// ── Navigation ────────────────────────────────
export const navLinks = [
  { text: 'Home',       url: 'home' },
  { text: 'Services',   url: 'services' },
  { text: 'Experience', url: 'experience' },
  { text: 'Portfolio',  url: 'portfolio' },
  { text: 'Contact',    url: 'contact' },
];

// ── Hero stats ────────────────────────────────
export const heroStats: Stat[] = [
  { value: '2+', label: 'Years Experience' },
  { value: '5+', label: 'Clients Served' },
];

// ── Services ──────────────────────────────────
export const services: Service[] = [
  {
    icon: React.createElement('svg', { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', stroke: '#ff6b35', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' },
      React.createElement('rect', { x: 5, y: 2, width: 14, height: 20, rx: 2 }),
      React.createElement('line', { x1: 12, y1: 18, x2: 12.01, y2: 18 })
    ),
    title: 'UI/UX Design',
    description: 'Creating user-centered designs that enhance user experience while aligning with business goals.',
  },
  {
    icon: React.createElement('svg', { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', stroke: '#ff6b35', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' },
      React.createElement('rect', { x: 2, y: 3, width: 20, height: 14, rx: 2 }),
      React.createElement('line', { x1: 8, y1: 21, x2: 16, y2: 21 }),
      React.createElement('line', { x1: 12, y1: 17, x2: 12, y2: 21 })
    ),
    title: 'Web Design',
    description: 'Designing beautiful, responsive websites that capture your brand identity and engage visitors.',
  },
  {
    icon: React.createElement('svg', { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', stroke: '#ff6b35', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' },
      React.createElement('path', { d: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' })
    ),
    title: 'Landing Page',
    description: 'Creating high-converting landing pages that drive user action and generate leads.',
  },
];

// ── Experience ────────────────────────────────
export const experiences: Experience[] = [
  {
    date: 'Jan 2022 - Present',
    title: 'Self-Employed',
    company: 'NYC',
    description: 'Working as a freelance consultant advising on web and product design projects.',
    position: 'left',
  },
  {
    date: 'Aug 2018 - Dec 2021',
    title: 'UI/UX Designer',
    company: 'Insightsource',
    description: 'Creating user interfaces and improving user experiences for web and mobile applications.',
    position: 'right',
  },
  {
    date: 'Sep 2015 - Aug 2018',
    title: 'Web Designer',
    company: 'KG Design Studio',
    description: 'Designed responsive websites and digital experiences for various clients.',
    position: 'left',
  },
];

// ── Why Hire stats ────────────────────────────
export const whyHireStats: Stat[] = [
  { value: '5+', label: 'Projects Completed' },
  { value: '5+', label: 'Happy Clients' },
  { value: '2+', label: 'Years Experience' },
];

// ── Portfolio ─────────────────────────────────
export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    image: ' https://pikwy.com/web/6a12d78cef09c27ae8620ec8.jpg',
    title: 'UX/UI Design',
    category: 'Design',
    url: 'https://www.medissan.com'
  },
  {
    id: 2,
    image: 'https://i.postimg.cc/d38Nss43/inkstone.jpg',
    title: 'Landing Page',
    category: 'Design',
    url: 'https://inkstonemediang.vercel.app'
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/326501/pexels-photo-326501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Wireframe',
    category: 'Wireframe',
  },
  {
    id: 4,
    image: 'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Food Express - Food Delivery Solution',
    category: 'App Design',
  },
  {
    id: 5,
    image: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'E-commerce Website',
    category: 'Web Design',
  },
  {
    id: 6,
    image: 'https://images.pexels.com/photos/844127/pexels-photo-844127.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Mobile App UI',
    category: 'App Design',
  },
];

// ── Testimonials ──────────────────────────────
export const testimonials: Testimonial[] = [
  {
    id: 1,
    text: '"Yakubu\'s design approach transformed our product. He truly understands how to blend aesthetics with functionality."',
    author: {
      name: 'James Wilson',
      position: 'CEO, TechStart',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    rating: 5,
  },
  {
    id: 2,
    text: '"Working with Yakubu was a game-changer for our website. His designs are not only beautiful but also highly effective."',
    author: {
      name: 'Sarah Johnson',
      position: 'Marketing Director, Elevate',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    rating: 5,
  },
];

// ── Expertise tags ────────────────────────────
export const tags: Tag[] = [
  { id: 1, name: 'Design',        isActive: true },
  { id: 2, name: 'App Design',    isActive: false },
  { id: 3, name: 'Dashboard',     isActive: false },
  { id: 4, name: 'Wireframe',     isActive: false },
  { id: 5, name: 'User Research', isActive: false },
  { id: 6, name: 'Prototyping',   isActive: false },
];

// ── Blog posts ────────────────────────────────
export const blogPosts: BlogPost[] = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: '12 July 2023',
    title: 'Design Unleashed: Behind the Scenes of UX/UI Magic',
    excerpt: 'A deep dive into the process and principles that make for exceptional UX/UI design.',
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: '5 June 2023',
    title: 'Beyond Aesthetics: Crafting Intuitive UX',
    excerpt: 'Exploring how function and form work together to create intuitive digital experiences.',
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/844127/pexels-photo-844127.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: '28 April 2023',
    title: 'Pixels & Insights: Unveiling the Art of UI Design',
    excerpt: 'How understanding user psychology can transform your design approach.',
  },
];

// ── Social links ──────────────────────────────
// Icons are SVGs — the string-based icons from the original
// won't render in the new Footer. Swap back to strings if
// your Footer renders them differently.
export const socialLinks: SocialLink[] = [
  {
    platform: 'Facebook',
    url: 'https://facebook.com/mhzta.shyne',
    icon: React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'currentColor' },
      React.createElement('path', { d: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' })
    ),
  },
  {
    platform: 'LinkedIn',
    url: '#',
    icon: React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'currentColor' },
      React.createElement('path', { d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' })
    ),
  },
  {
    platform: 'Instagram',
    url: '#',
    icon: React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' },
      React.createElement('rect', { x: 2, y: 2, width: 20, height: 20, rx: 5, ry: 5 }),
      React.createElement('path', { d: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z' }),
      React.createElement('line', { x1: 17.5, y1: 6.5, x2: 17.51, y2: 6.5 })
    ),
  },
  {
    platform: 'Dribbble',
    url: '#',
    icon: React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' },
      React.createElement('circle', { cx: 12, cy: 12, r: 10 }),
      React.createElement('path', { d: 'M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32' })
    ),
  },
];

// ── Footer columns ────────────────────────────
export const footerColumns: FooterColumn[] = [
  {
    title: 'Quick Links',
    links: [
      { text: 'Home',      url: '#home' },
      { text: 'Services',  url: '#services' },
      { text: 'Portfolio', url: '#portfolio' },
      { text: 'Contact',   url: '#contact' },
    ],
  },
  {
    title: 'Contact Info',
    links: [
      { text: 'Lagos, NG',                   url: '#' },
      { text: 'Yakubuquadreal@gmail.com',     url: 'mailto:Yakubuquadreal@gmail.com' },
      { text: '+2347031661604',               url: 'tel:+2347031661604' },
    ],
  },
];