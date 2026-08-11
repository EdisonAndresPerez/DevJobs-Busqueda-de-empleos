// URL base de la API.
// Prioridad:
// 1. Variable de entorno VITE_API_URL (configurable en Vercel).
// 2. En desarrollo (npm run dev) usa el backend local.
// 3. En producción (build) usa el backend desplegado.
const API_BASE_URL =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.DEV
    ? "http://localhost:1234"
    : "https://api-jobs-one.vercel.app");

export const API_JOBS_URL = `${API_BASE_URL}/api/jobs`;
