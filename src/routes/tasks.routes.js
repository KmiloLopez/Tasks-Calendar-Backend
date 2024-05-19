import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
  getTasksByDate,
  getMonthTasksByDate,
} from "../controllers/tasks.controller.js";
import { authRequired } from "../middlewares/validate.token.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTaskSchema } from "../schemas/task.schema.js";

const router = Router();

router.get("/tasks", authRequired, getTasks);

router.post(
  "/tasks",
  authRequired,
  validateSchema(createTaskSchema),
  createTask
);

router.get("/tasks/:id", authRequired, getTask);

router.put("/tasks/:id", authRequired, updateTask);

router.delete("/tasks/:id", authRequired, deleteTask);

router.get("/tasks/date/:id", authRequired, getTasksByDate);

router.get("/tasks/month/:id", authRequired, getMonthTasksByDate);

export default router;
