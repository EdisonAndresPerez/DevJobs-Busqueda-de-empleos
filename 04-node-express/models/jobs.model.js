import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import DEFAULT_CONFIG from "../config.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rawJobs = JSON.parse(
  readFileSync(path.join(__dirname, "..", "jobs.json"), "utf8"),
);

const MAX_LIMIT = DEFAULT_CONFIG.MAX_LIMIT;

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

export function getJobs(filters = {}, pagination = {}) {
  const { technology, nivel, modalidad, text } = filters;
  const {
    limit = DEFAULT_CONFIG.LIMIT_PAGINATION,
    offset = DEFAULT_CONFIG.DEFAULT_OFFSET,
  } = pagination;

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

  return { total, data, limit: limitNumber, offset: offsetNumber };
}

export function getJobById(id) {
  return jobs.find((job) => job.id === id);
}

export function createJob({ titulo, empresa, ubicacion, descripcion, data }) {
  const newJob = {
    id: crypto.randomUUID(),
    titulo,
    empresa,
    ubicacion,
    descripcion,
    data,
  };

  jobs.push(newJob);

  return newJob;
}
