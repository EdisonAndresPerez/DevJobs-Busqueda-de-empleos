import app from "./app.js";
import DEFAULT_CONFIG from "./config.js";

const PORT = process.env.PORT || DEFAULT_CONFIG.PORT;

// En Vercel no levantamos un servidor persistente:
// Vercel importa la app y la usa como función serverless.
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

export default app;
