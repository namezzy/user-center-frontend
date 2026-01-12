import axiosInstance from '../axios';
import type { ApiResponse, LoginRequest, RegisterRequest, User } from '@/types';

export const authApi = {
  // User register
  register: (data: RegisterRequest) => {
    return axiosInstance.post<any, ApiResponse<number>>('/user/register', data);
  },

  // User login
  login: (data: LoginRequest) => {
    return axiosInstance.post<any, ApiResponse<User>>('/user/login', data);
  },

  // User logout
  logout: () => {
    return axiosInstance.post<any, ApiResponse<number>>('/user/logout');
  },

  // Get current user info
  getCurrentUser: () => {
    return axiosInstance.get<any, ApiResponse<User>>('/user/current');
  },
};
