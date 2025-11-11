import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  // --- State ---
  user: null,         // Will hold user data (or null if not logged in)
  isLoading: false,  // Start as true; we'll check for a logged-in user on app boot

  // --- Actions ---
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
}));