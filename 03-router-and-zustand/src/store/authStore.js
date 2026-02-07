import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useFavoriteStore } from './favoriteStore';

export const useAuthStore = create(
  persist(
    (set) => ({
      //estado
      isLoggedIn: false,
      
      //acciones
      login: () => set({ isLoggedIn: true }),
      logout: () => {
        // Limpiamos los favoritos al cerrar sesión
        useFavoriteStore.getState().clearFavorites();
        set({ isLoggedIn: false });
      },
    }),
    {
      name: 'auth-storage', // nombre de la clave en localStorage
    }
  )
);