import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from '@/store/auth';

describe('Auth Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('should initialize with null user and token from localStorage', () => {
        const store = useAuthStore();
        expect(store.user).toBeNull();
        expect(store.isAuthenticated).toBe(false);
    });

    it('should logout correctly', () => {
        const store = useAuthStore();
        store.token = 'fake-token';
        store.logout();
        expect(store.token).toBeNull();
        expect(store.user).toBeNull();
    });
});
