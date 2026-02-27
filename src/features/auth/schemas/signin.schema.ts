import { z } from 'zod';

export const signinSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es obligatorio')
    .email('Introduce un email válido'),
  password: z
    .string()
    .min(1, 'La contraseña es obligatoria'),
});

export type SigninFields = z.infer<typeof signinSchema>;
