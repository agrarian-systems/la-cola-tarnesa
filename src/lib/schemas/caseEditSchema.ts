import { z } from 'zod';

export const caseEditSchema = z.object({
  name: z.string().min(3),
  status: z.string().min(1),
});

export type caseEditSchema = z.infer<typeof caseEditSchema>;
