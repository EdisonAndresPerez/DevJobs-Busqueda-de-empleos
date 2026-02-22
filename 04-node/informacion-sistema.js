

import os from 'node:os';

// Obtener información del sistema
console.log('Información del sistema:');
console.log(`Sistema operativo: ${os.type()} ${os.release()}`);
console.log(`Arquitectura: ${os.arch()}`);
console.log(`Número de CPUs: ${os.cpus().length}`);
console.log(`Memoria total: ${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB`);
console.log(`Memoria libre: ${(os.freemem() / (1024 ** 3)).toFixed(2)} GB`);
    

