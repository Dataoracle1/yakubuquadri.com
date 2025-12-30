import { Service, Experience, PortfolioItem, Testimonial, BlogPost, Tag, Stat, SocialLink, FooterColumn } from '../types';

export const navLinks = [
  { text: 'Home', url: 'home' },
  { text: 'Services', url: 'services' },
  { text: 'Experience', url: 'experience' },
  { text: 'Portfolio', url: 'portfolio' },
  { text: 'Contact', url: 'contact' }
];

export const heroStats: Stat[] = [
  { value: '2+', label: 'Years Experience' },
  { value: '5+', label: 'Clients Served' }
];

export const services: Service[] = [
  {
    icon: '📱',
    title: 'UI/UX Design',
    description: 'Creating user-centered designs that enhance user experience while aligning with business goals.'
  },
  {
    icon: '🖥️',
    title: 'Web Design',
    description: 'Designing beautiful, responsive websites that capture your brand identity and engage visitors.'
  },
  {
    icon: '🚀',
    title: 'Landing Page',
    description: 'Creating high-converting landing pages that drive user action and generate leads.'
  }
];

export const experiences: Experience[] = [
  {
    date: 'Jan 2022 - Present',
    title: 'Self-Employed',
    company: 'NYC',
    description: 'Working as a freelance consultant advising on web and product design projects.',
    position: 'left'
  },
  {
    date: 'Aug 2018 - Dec 2021',
    title: 'UI/UX Designer',
    company: 'Insightsource',
    description: 'Creating user interfaces and improving user experiences for web and mobile applications.',
    position: 'right'
  },
  {
    date: 'Sep 2015 - Aug 2018',
    title: 'Web Designer',
    company: 'KG Design Studio',
    description: 'Designed responsive websites and digital experiences for various clients.',
    position: 'left'
  }
];

export const whyHireStats: Stat[] = [
  { value: '5+', label: 'Projects Completed' },
  { value: '5+', label: 'Happy Clients' },
  { value: '2+', label: 'Years Experience' }
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'UX/UI Design',
    category: 'Design'
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Landing Page',
    category: 'Design'
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/326501/pexels-photo-326501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Wireframe',
    category: 'Wireframe'
  },
  {
    id: 4,
    image: 'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Food Express - Food Delivery Solution',
    category: 'App Design'
  },
  {
    id: 5,
    image: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'E-commerce Website',
    category: 'Web Design'
  },
  {
    id: 6,
    image: 'https://images.pexels.com/photos/844127/pexels-photo-844127.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Mobile App UI',
    category: 'App Design'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    text: '"Yakubu\'s design approach transformed our product. He truly understands how to blend aesthetics with functionality."',
    author: {
      name: 'James Wilson',
      position: 'CEO, TechStart',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    rating: 5
  },
  {
    id: 2,
    text: '"Working with Yakubu was a game-changer for our website. His designs are not only beautiful but also highly effective."',
    author: {
      name: 'Sarah Johnson',
      position: 'Marketing Director, Elevate',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    rating: 5
  }
];

export const tags: Tag[] = [
  { id: 1, name: 'Design', isActive: true },
  { id: 2, name: 'App Design', isActive: false },
  { id: 3, name: 'Dashboard', isActive: false },
  { id: 4, name: 'Wireframe', isActive: false },
  { id: 5, name: 'User Research', isActive: false },
  { id: 6, name: 'Prototyping', isActive: false }
];

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: '12 July 2023',
    title: 'Design Unleashed: Behind the Scenes of UX/UI Magic',
    excerpt: 'A deep dive into the process and principles that make for exceptional UX/UI design.'
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: '5 June 2023',
    title: 'Beyond Aesthetics: Crafting Intuitive UX',
    excerpt: 'Exploring how function and form work together to create intuitive digital experiences.'
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/844127/pexels-photo-844127.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    date: '28 April 2023',
    title: 'Pixels & Insights: Unveiling the Art of UI Design',
    excerpt: 'How understanding user psychology can transform your design approach.'
  }
];

export const socialLinks: SocialLink[] = [
  { platform: 'Facebook', url: 'https://facebook.com/mhzta.shyne', icon: 'f' },
  { platform: 'LinkedIn', url: '#', icon: 'in' },
  { platform: 'Instagram', url: '#', icon: 'ig' },
  { platform: 'Dribbble', url: '#', icon: 'dr' }
];

export const footerColumns: FooterColumn[] = [
  {
    title: 'Quick Links',
    links: [
      { text: 'Home', url: '#home' },
      { text: 'Services', url: '#services' },
      { text: 'Portfolio', url: '#portfolio' },
      { text: 'Contact', url: '#contact' },
      { text: 'Blog', url: '#' }
    ]
  },
  {
    title: 'Contact Info',
    links: [
      { text: 'Lagos, NG', url: '#' },
      { text: 'Yakubuquadreal@gmail.com', url: 'mailto:Yakubuquadreal@gmail.com' },
      { text: '+2347031661604', url: 'tel:+2347031661604' }
    ]
  }
];