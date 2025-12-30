import api from './api';

// Types
export interface UserCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends UserCredentials {
  name: string;
}

export interface UserData {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

// User services
export const userService = {
  // Register a new user
  register: async (userData: RegisterData) => {
    const response = await api.post<UserData>('/users', userData);
    
    if (response.data) {
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      localStorage.setItem('userToken', response.data.token);
    }
    
    return response.data;
  },
  
  // Login a user
  login: async (credentials: UserCredentials) => {
    const response = await api.post<UserData>('/users/login', credentials);
    
    if (response.data) {
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      localStorage.setItem('userToken', response.data.token);
    }
    
    return response.data;
  },
  
  // Logout a user
  logout: () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('userToken');
  },
  
  // Get user profile
  getProfile: async () => {
    const response = await api.get<Omit<UserData, 'token'>>('/users/profile');
    return response.data;
  },
  
  // Update user profile
  updateProfile: async (userData: Partial<RegisterData>) => {
    const response = await api.put<UserData>('/users/profile', userData);
    
    if (response.data) {
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      localStorage.setItem('userToken', response.data.token);
    }
    
    return response.data;
  },
};