
//leer ficheros con node
import {readFile} from 'node:fs/promises'


//leer un fichero
//
const contenido = await readFile('./archivoLeer.txt', 'utf-8')
console.log(contenido)