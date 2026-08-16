import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useFavoriteStore } from "./favoriteStore";

interface User {
  name: string;
  lastName: string;
  email: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;

  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      //estado
      isLoggedIn: false,
      user: null,

      //acciones
      login: (user) =>
        set({
          isLoggedIn: true,
          user,
        }),

      logout: () => {
        // Limpiamos los favoritos al cerrar sesión
        useFavoriteStore.getState().clearFavorites();
        set({
          isLoggedIn: false,
          user: null,
        });
      },
    }),
    {
      name: "auth-storage", // nombre de la clave en localStorage
    },
  ),
);
