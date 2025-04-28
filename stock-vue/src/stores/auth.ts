import { defineStore } from 'pinia';
import type { User } from '@/types/user';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || '',
        user: null as User | null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    actions: {
        setToken(token: string) {
            this.token = token;
            localStorage.setItem('token', token);
        },
        setUser(user: User) {
            this.user = user;
        },
        logout() {
            this.token = '';
            this.user = null;
            localStorage.removeItem('token');
        },
    },
}); 