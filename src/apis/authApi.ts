import { LoginRequest, LoginResponse, User } from '../types/login';
import apiClient from '../utils/apiClient';

export const AuthApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    return await apiClient.post<LoginRequest, LoginResponse>('/auth/login', data);
  },
  getUserInfo: async (userId: string): Promise<User> => {
    return await apiClient.get<User>(`/users/${userId}`);
  },
};
