import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email({ message: 'Lo format del corric es pas valid' }),
  password: z
    .string()
    .min(6, { message: 'Lo mot de passa deu far 6 caractèrs al minim' }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
