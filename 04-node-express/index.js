import express from "express";

const PORT = process.env.PORT || 1234;
const app = express();

app.get("/", (req, res) => {
  return res.send("Hola Mundo, soy edison");
});

app.get("/health", (req, res) => {
  return res.json({
    status: "ok",
    uptime: process.uptime(),
  });
});

app.listen(PORT, () => {
  console.log(`servidor corriendo en el puerto :${PORT}`);
});
app.listen(PORT, () => {
  console.log(`servidor levantado en el puerto http://localhost:${PORT}`);
});

//metodos HTTP: GET, POST, PUT, DELETE, PATCH

//GET: Obtener datos
//  app.get('/usuarios', (req, res) => {
//  res.send('Lista de usuarios');
//  });

//POST: Crear datos
// app.post('/usuarios', (req, res) => {
//   res.send('Usuario creado');
// });

//PUT: Actualizar datos
// app.put('/usuarios/:id', (req, res) => {
//   const { id } = req.params;
//   res.send(`Usuario con id ${id} actualizado`);
// });

//DELETE: Eliminar datos
// app.delete('/usuarios/:id', (req, res) => {
//   const { id } = req.params;
//   res.send(`Usuario con id ${id} eliminado`);
// });
