import apiClient from "./client";
import type { AuthResponse, User } from "@/types";

export const authService = {
  async login(credentials: any): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>("/login", credentials);
    return data;
  },

  async register(userData: any): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>("/register", userData);
    return data;
  },

  async getMe(): Promise<User> {
    const { data } = await apiClient.get<User>("/me");
    return data;
  },
};
