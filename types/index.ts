// API Response types
export interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
  description?: string;
}

// User types
export interface User {
  id: number;
  username: string;
  userAccount: string;
  avatarUrl: string;
  gender: number;
  phone: string;
  email: string;
  userStatus: number;
  createTime: string;
  userRole: number;
  planetCode: string;
}

// Auth types
export interface LoginRequest {
  userAccount: string;
  userPassword: string;
}

export interface RegisterRequest {
  userAccount: string;
  userPassword: string;
  checkPassword: string;
  planetCode: string;
}

// Search types
export interface SearchUsersRequest {
  username?: string;
}

export interface SearchUsersResponse {
  users: User[];
  total: number;
}
