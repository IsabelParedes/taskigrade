import { z } from "zod";
export const TaskValidator = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  createdById: z.string(),
  initial: z.boolean(),
  description: z.string().nullish(),
  totalTime: z.number(),
  dueDate: z.number().nullish(),
  priority: z.string().nullish(),
  parentId: z.string().nullable(),
});

export type Task = z.infer<typeof TaskValidator>;
