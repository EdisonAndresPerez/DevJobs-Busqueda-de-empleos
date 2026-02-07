import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      //estado
      isLoggedIn: false,
      
      //acciones
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),
      clearFavorites: () => set({ favorite: [] }),
    }),
    {
      name: 'auth-storage', // nombre de la clave en localStorage
    }
  )
);