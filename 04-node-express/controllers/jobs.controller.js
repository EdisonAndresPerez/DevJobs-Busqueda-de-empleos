import { getJobs, getJobById, createJob } from "../models/jobs.model.js";

export const getJobsHandler = (req, res) => {
  const { technology, nivel, modalidad, text, limit, offset } = req.query;

  const result = getJobs(
    { technology, nivel, modalidad, text },
    { limit, offset },
  );

  return res.json({
    total: result.total,
    limit: result.limit,
    offset: result.offset,
    results: result.data.length,
    data: result.data,
  });
};

export const getJobByIdHandler = (req, res) => {
  const { id } = req.params;
  const job = getJobById(id);

  if (!job) {
    return res.status(404).json({ error: "Oferta no encontrada" });
  }

  return res.json(job);
};

export const createJobHandler = (req, res) => {
  const newJob = createJob(req.body);

  return res.status(201).json(newJob);
};
