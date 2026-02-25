import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { authService } from "@/api/auth.service";
import type { User } from "@/types";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem("token"));
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => !!token.value);

  async function login(credentials: any) {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await authService.login(credentials);
      localStorage.setItem("token", response.token);
      token.value = response.token;
      user.value = response.user;
    } catch (err: any) {
      error.value = err.response?.data?.message || "Falha ao autenticar";
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function register(userData: any) {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await authService.register(userData);
      localStorage.setItem("token", response.token);
      token.value = response.token;
      user.value = response.user;
    } catch (err: any) {
      error.value = err.response?.data?.message || "Erro ao registrar";
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem("token");
  }

  async function initialize() {
    if (token.value && !user.value) {
      try {
        user.value = await authService.getMe();
      } catch (err) {
        logout();
      }
    }
  }

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    initialize,
  };
}, {
  persist: {
    pick: ["token", "user"],
  }
});
