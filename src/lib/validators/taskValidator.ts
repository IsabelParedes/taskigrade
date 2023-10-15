import { z } from "zod";
export const TaskValidator = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  createdById: z.string(),
  initial: z.boolean(),
  colIndex: z.number(),
  description: z.string().nullish(),
});
