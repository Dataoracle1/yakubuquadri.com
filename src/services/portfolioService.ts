import api from './api';

// Types
export interface PortfolioItem {
  _id?: string;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  projectUrl?: string;
  github?: string;
  user?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Portfolio services
export const portfolioService = {
  // Get all portfolio items
  getPortfolioItems: async () => {
    const response = await api.get<PortfolioItem[]>('/portfolio');
    return response.data;
  },
  
  // Get portfolio item by ID
  getPortfolioItemById: async (id: string) => {
    const response = await api.get<PortfolioItem>(`/portfolio/${id}`);
    return response.data;
  },
  
  // Create a new portfolio item
  createPortfolioItem: async (portfolioData: Omit<PortfolioItem, '_id'>) => {
    const response = await api.post<PortfolioItem>('/portfolio', portfolioData);
    return response.data;
  },
  
  // Update portfolio item
  updatePortfolioItem: async (id: string, portfolioData: Partial<PortfolioItem>) => {
    const response = await api.put<PortfolioItem>(`/portfolio/${id}`, portfolioData);
    return response.data;
  },
  
  // Delete portfolio item
  deletePortfolioItem: async (id: string) => {
    const response = await api.delete(`/portfolio/${id}`);
    return response.data;
  },
  
  // Get user's portfolio items
  getUserPortfolioItems: async () => {
    const response = await api.get<PortfolioItem[]>('/portfolio/myitems');
    return response.data;
  },
};