// importar modulo de http
import { createServer } from "node:http";

//indiar el puerto
const PORT = 3000;

//crear el servidor
const server = createServer((peticion, respuesta) => {
  //configurar la respuesta
  console.log("Petición recibida", peticion.url, peticion.method);
});


server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});