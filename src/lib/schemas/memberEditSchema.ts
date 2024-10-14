import { z } from 'zod';

export const memberEditSchema = z.object({
  name: z.string().min(3, {
    message: 'Le nom est obligatoire et doit faire au moins 3 caractères',
  }),
  description: z.string().min(1, { message: 'La description est obligatoire' }),
  city: z.string().min(1, { message: 'La ville est obligatoire' }),
  country: z.string().min(1, { message: 'Le pays est obligatoire' }),
});

export type MemberEditSchema = z.infer<typeof memberEditSchema>;
