import { z } from "zod";
export const TaskValidator = z.object({
  title: z.string(),
  status: z.string(),
  createdById: z.string(),
  initial: z.boolean(),
  description: z.string().nullish(),
});
