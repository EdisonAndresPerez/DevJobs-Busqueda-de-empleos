
//leer ficheros con node
import {readFile} from 'node:fs/promises'
const contenido = await readFile('./archivoLeer.txt', 'utf-8')
console.log(contenido)


//escribir un fichero
import {writeFile} from 'node:fs/promises'
const nuevoContenido = 'Este es el nuevo contenido del archivo'
await writeFile('./archivoEscribir.txt', nuevoContenido, 'utf-8')
console.log('Archivo escrito correctamente')


//crear un nuevo fichero
const contenidoNuevoArchivo = 'Contenido del nuevo archivo'
await writeFile('./nuevoArchivo.txt', contenidoNuevoArchivo, 'utf-8')
console.log('Nuevo archivo creado correctamente')

