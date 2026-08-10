import express from "express";
import cors from "cors";
import DEFAULT_CONFIG from "./config.js";


//Iniciar nuestra app
const PORT = process.env.PORT || DEFAULT_CONFIG.PORT;
const app = express();



//Iniciar nuestro servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
  