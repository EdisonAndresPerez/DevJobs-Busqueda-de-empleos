import express from "express";
import jobs from "./jobs.json" with { type: "json" };

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

//GET para obtener todos los trabajos
app.get("/get-jobs", async (req, res) => {
  const { limit = 10, technology, text, title, level, offset = 0 } = req.query;

  console.log(text, technology);
  let filteredJobs = jobs;
  if (text) {
    const searchText = text.toLowerCase();
    filteredJobs = filteredJobs.filter(
      (job) =>
        job.titulo.toLocaleLowerCase().includes(searchText) ||
        job.descripcion.toLowerCase().includes(searchText),
    );
  }

  if (technology) {
    filteredJobs = filteredJobs.filter((job) =>
      job.data.technology.includes(technology.toLowerCase()),
    );
  }

  return res.json(filteredJobs);
});

// GET con parametros para obtener un solo trabajo por id
app.get("/get-single-job/:id", (req, res) => {
  const { id } = req.params;
  const numberId = Number(id);

  return res.json({
    job: {
      id: numberId,
      title: "Desarrollador Frontend",
      description: "Desarrollador con experiencia en React y Angular",
      location: "Ciudad de México",
      salary: 60000,
    },
  });
});

//Crear ruta opcional
app.get("/a{b}cd", (req, res) => {
  return res.send("Ruta con parametro opcional");
});

app.get("/ab*cd", (req, res) => {
  return res.send("Ruta con comodin");
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
