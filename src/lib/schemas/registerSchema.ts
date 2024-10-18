import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email({ message: 'Lo format del corric es pas valid' }),
  password: z
    .string()
    .min(6, { message: 'Lo mot de passa deu far 6 caractèrs al minim' }),
});

export const profileSchema = z.object({
  instrument: z.string(),
  description: z.string(),
  department: z.string(),
});

export const combinedRegisterSchema = registerSchema.and(profileSchema);

export type RegisterSchema = z.infer<
  typeof registerSchema & typeof profileSchema
>;
