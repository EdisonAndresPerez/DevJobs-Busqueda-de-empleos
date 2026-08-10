import express from "express";
import rawJobs from "./jobs.json" with { type: "json" };
import DEFAULT_CONFIG from "./config.js";
import cors from "cors";

const PORT = process.env.PORT || DEFAULT_CONFIG.PORT;
const MAX_LIMIT = 1000;

const app = express();
app.use(express.json());
app.use(cors());


// Fuente de verdad en memoria (jobs.json es la persistencia).
let jobs = rawJobs.map(normalizeJob);

function normalizeTechnology(technology) {
  if (Array.isArray(technology))
    return technology.map((t) => String(t).toLowerCase());
  if (typeof technology === "string") return [technology.toLowerCase()];
  return [];
}

function buildContent(job) {
  const tech = job.data.technology.join(", ");

  return {
    description: `${job.descripcion}\n\nÚnete a ${job.empresa} y forma parte de un equipo enfocado en entregar soluciones de calidad. Este puesto ofrece la oportunidad de crecer profesionalmente en un entorno colaborativo.`,
    responsibilities:
      "- Desarrollar, mantener y mejorar las soluciones de la empresa.\n- Colaborar con equipos multidisciplinarios para alcanzar los objetivos del proyecto.\n- Escribir código limpio y documentado siguiendo las mejores prácticas.\n- Participar en reuniones de planificación y retrospectivas del equipo.",
    requirements: `- Experiencia previa en: ${tech || "el área correspondiente"}.\n- Capacidad para trabajar en equipo y buena comunicación.\n- Orientación a resultados y aprendizaje continuo.`,
    about: `${job.empresa} es una empresa que apuesta por la innovación y el talento. Buscamos personas comprometidas con la calidad y con ganas de aportar valor desde el primer día.`,
  };
}

function normalizeJob(job) {
  const data = {
    ...job.data,
    technology: normalizeTechnology(job.data?.technology),
  };

  return {
    ...job,
    data,
    content: buildContent({ ...job, data }),
  };
}

// GET / -> bienvenida
app.get("/", (req, res) => {
  return res.json({
    message: "DevJobs API",
    endpoints: ["/health", "/api/jobs", "/api/jobs/:id"],
  });
});

// GET /health -> estado del servidor
app.get("/health", (req, res) => {
  return res.json({
    status: "ok",
    uptime: process.uptime(),
  });
});

// GET /api/jobs -> lista con filtros y paginación
// Params opcionales: technology (string o separado por comas), nivel, modalidad, text, limit, offset
app.get("/api/jobs", (req, res) => {
  const {
    technology,
    nivel,
    modalidad,
    text,
    limit = DEFAULT_CONFIG.LIMIT_PAGINATION,
    offset = DEFAULT_CONFIG.DEFAULT_OFFSET,
  } = req.query;

  const limitNumber = Math.min(Math.max(Number(limit) || 1, 1), MAX_LIMIT);
  const offsetNumber = Math.max(Number(offset) || 0, 0);

  let filtered = jobs;

  if (text) {
    const query = String(text).toLowerCase();
    filtered = filtered.filter((job) =>
      [
        job.titulo,
        job.empresa,
        job.ubicacion,
        job.descripcion,
        job.content.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }

  if (technology) {
    const wanted = String(technology)
      .toLowerCase()
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    filtered = filtered.filter((job) =>
      job.data.technology.some((t) => wanted.includes(t)),
    );
  }

  if (modalidad) {
    const wanted = String(modalidad).toLowerCase();
    filtered = filtered.filter((job) => job.data.modalidad === wanted);
  }

  if (nivel) {
    const wanted = String(nivel).toLowerCase();
    filtered = filtered.filter((job) => {
      const level = job.data.nivel;
      if (wanted === "mid") return level === "mid" || level === "mid-level";
      return level === wanted;
    });
  }

  const total = filtered.length;
  const data = filtered.slice(offsetNumber, offsetNumber + limitNumber);

  return res.json({
    total,
    limit: limitNumber,
    offset: offsetNumber,
    results: data.length,
    data,
  });
});

// GET /api/jobs/:id -> un solo trabajo
app.get("/api/jobs/:id", (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);

  if (!job) {
    return res.status(404).json({ error: "Oferta no encontrada" });
  }

  return res.json(job);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



// POST crear trabajo
app.post("/api/jobs", (req, res) => {
  const { titulo, empresa, ubicacion, descripcion, data } = req.body;

  const newJobs = {
    id: crypto.randomUUID(),
    titulo,
    empresa,
    ubicacion,
    descripcion,
    data,
  };

  jobs.push(newJobs); // => lo haremos desde la base de datos

  return res.status(201).json(newJobs)
});



