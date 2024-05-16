import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  description: z.string().optional(),
  date: z.string().datetime().optional(),
  priotiry: z.string().optional(),
  time: z.string().optional(),
  timeout: z.string().optional(),
  status: z.boolean().optional(),
});