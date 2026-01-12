import axiosInstance from '../axios';
import type { ApiResponse, SearchUsersRequest, User } from '@/types';

export const userApi = {
  // Search users
  searchUsers: (params: SearchUsersRequest) => {
    return axiosInstance.get<any, ApiResponse<User[]>>('/user/search', { params });
  },

  // Delete user
  deleteUser: (id: number) => {
    return axiosInstance.post<any, ApiResponse<boolean>>('/user/delete', { id });
  },
};
