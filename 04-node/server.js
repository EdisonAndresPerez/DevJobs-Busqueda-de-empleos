// Importamos el módulo HTTP nativo de Node.js
import { createServer } from "node:http";

// Definimos el puerto donde correrá el servidor
//const PORT = 3000;


//la forma comun de usar es llamando la variable de entorno
process.loadEnvFile() // Carga las variables de entorno desde el archivo .env
const PORT = process.env.PORT || 3000;

/**
 * Creamos el servidor HTTP
 * 
 * @param {IncomingMessage} peticion - Contiene la información de la solicitud del cliente (URL, método, headers, etc.)
 * @param {ServerResponse} respuesta - Permite construir y enviar la respuesta al cliente
 */
const server = createServer((peticion, respuesta) => {

    // Definimos el tipo de contenido que se enviará al navegador
    respuesta.setHeader("Content-Type", "text/html");

    // Enviamos contenido HTML en partes
    respuesta.write("<h1>Hola Mundo</h1>");
    respuesta.write("<p>Bienvenidos a mi servidor en Node.js</p>");
    respuesta.write("<p>Todo esto sale del bootcamp de midudev. Muchas gracias</p>");


    // Finalizamos la respuesta (obligatorio)
    respuesta.end();

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
