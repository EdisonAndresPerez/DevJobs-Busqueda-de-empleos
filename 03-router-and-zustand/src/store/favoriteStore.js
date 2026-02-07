// Importamos la función create de Zustand para crear el store global
import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Store global para manejar los favoritos (jobs favoritos en este caso)
 * Zustand nos permite manejar estado sin reducers, actions ni boilerplate como Redux.
 *
 * set -> sirve para actualizar el estado
 * get -> sirve para leer el estado actual sin necesidad de React
 */
export const useFavoriteStore = create(
  persist(
    (set, get) => ({
      // ========================
      // 🔹 ESTADO GLOBAL
      // ========================

      /**
       * Lista de IDs marcados como favoritos
       * Ejemplo: [1, 5, 8]
       */
      favorite: [],

      // ========================
      // 🔹 ACCIONES (MUTACIONES)
      // ========================

      clearFavorites: () => set({ favorite: [] }),

      /**
       * Agrega un job a favoritos
       * @param {number | string} jobId - ID del job a guardar
       */
      addFavorite: (jobId) => {
        set((state) => ({
          // Creamos un nuevo array (inmutable) agregando el nuevo ID
          favorite: [...state.favorite, jobId],
        }));
      },

      /**
       * Elimina un job de favoritos
       * @param {number | string} jobId - ID del job a eliminar
       */
      removeFavorite: (jobId) => {
        set((state) => ({
          // Filtramos todos los IDs excepto el que queremos eliminar
          favorite: state.favorite.filter((id) => id !== jobId),
        }));
      },

      /**
       * Verifica si un job está en favoritos
       * @param {number | string} jobId - ID del job a consultar
       * @returns {boolean} true si es favorito, false si no
       */
      isFavorite: (jobId) => {
        return get().favorite.includes(jobId);
      },

      toggleFavorite: (jobId) => {
        const { addFavorite, removeFavorite, isFavorite } = get();
        const isFav = isFavorite(jobId);

        if (isFav) {
          removeFavorite(jobId);
        } else {
          addFavorite(jobId);
        }
      },
    }),
    {
      name: 'favorite-storage', // nombre de la clave en localStorage
    }
  )
);
