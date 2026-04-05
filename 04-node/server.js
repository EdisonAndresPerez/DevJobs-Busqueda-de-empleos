// Importamos el módulo HTTP nativo de Node.js
import { createServer } from "node:http";

// Definimos el puerto donde correrá el servidor
//const PORT = 3000;

//la forma comun de usar es llamando la variable de entorno
process.loadEnvFile(); // Carga las variables de entorno desde el archivo .env
const PORT = process.env.PORT || 3000;

/**
 * Creamos el servidor HTTP
 *
 * @param {IncomingMessage} peticion - Contiene la información de la solicitud del cliente (URL, método, headers, etc.)
 * @param {ServerResponse} respuesta - Permite construir y enviar la respuesta al cliente
 */


//Lista de usuarios (simulada)
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];


const server = createServer((peticion, respuesta) => {
  // Definimos el tipo de contenido que se enviará al navegador
  respuesta.setHeader("Content-Type", "text/html");

  if (peticion.url === "/") {
    // Enviamos contenido HTML en partes
    respuesta.write("<h1>Hola Mundo</h1>");
    respuesta.write("<p>Bienvenidos a mi servidor en Node.js</p>");
    respuesta.write(
      "<p>Todo esto sale del bootcamp de midudev. Muchas gracias</p>",
    );
    return respuesta.end();
  } else if (peticion.url === "/user") {
    respuesta.setHeader("Content-Type", "text/html");
    respuesta.write("<h1>Lista de Usuarios</h1>");
    return respuesta.end(JSON.stringify(users));
  } else {
    respuesta.statusCode = 404;

    // Finalizamos la respuesta (obligatorio)
    return respuesta.end("Pagina no encontrada");
  }
});

/**
 * Iniciamos el servidor y lo ponemos a escuchar en el puerto definido
 */
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});














// --watch server.js

//createServer() → crea el servidor
//peticion → lo que llega del cliente (request)
//respuesta → lo que tú envías (response)
//setHeader() → defines cómo se interpreta la respuesta
//write() → envías contenido por partes
//end() → cierras la respuesta (sin esto, se queda colgado 😅)
//listen() → levanta el servidor
