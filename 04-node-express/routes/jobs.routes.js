import { Router } from "express";
import {
  getJobsHandler,
  getJobByIdHandler,
  createJobHandler,
} from "../controllers/jobs.controller.js";

const jobsRouter = Router();

jobsRouter.get("/", getJobsHandler);
jobsRouter.get("/:id", getJobByIdHandler);
jobsRouter.post("/", createJobHandler);

export default jobsRouter;
